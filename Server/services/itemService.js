// services/itemService.js
// Handles all Firestore operations related to items, including creation,
// listing, and token assignment. This layer contains business logic and
// validation, keeping controllers thin and focused on HTTP concerns.

const { db } = require("../config/firebaseConfig");
const { TokenService } = require("./tokenService");

const COLLECTION = "items";

exports.ItemService = {
  async createItem(ownerId, payload) {
    if (!payload.nickname || !payload.nickname.trim()) {
      throw new Error("Nickname is required");
    }

    if (
      payload.verification?.enabled &&
      !payload.verification.question?.trim()
    ) {
      throw new Error("Verification question is required when enabled");
    }

    const token = TokenService.generateToken(128);
    const createdAt = new Date().toISOString();

    const docRef = db.collection(COLLECTION).doc();

    const item = {
      id: docRef.id,
      ownerId,
      nickname: payload.nickname.trim(),
      description: payload.description || "",
      photoUrl: payload.photoUrl || "", // now passed from upload API
      verification: payload.verification || { enabled: false },
      token,
      status: "ACTIVE",
      createdAt,
      lastActivityAt: null,
    };

    await docRef.set(item);
    return item;
  },

  async listItems(ownerId) {
    const snap = await db
      .collection(COLLECTION)
      .where("ownerId", "==", ownerId)
      .orderBy("createdAt", "desc")
      .get();

    return snap.docs.map((doc) => doc.data());
  },

  async getItemByIdForOwner(itemId, ownerId) {
    const doc = await db.collection(COLLECTION).doc(itemId).get();
    if (!doc.exists) return null;

    const item = doc.data();
    if (item.ownerId !== ownerId) return null;

    return item;
  },
};