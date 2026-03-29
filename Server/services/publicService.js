
const {auth,db} = require("../config/firebaseConfig"); // Firebase Admin SDK
const COLLECTION = "items";
const FOUND_COLLECTION = "foundReports";
const USER_COLLECTION="users";


exports.PublicService = {

 async getItemByToken(token) {
    const snap = await db
      .collection(COLLECTION)
      .where("token", "==", token)
      .limit(1)
      .get();

    if (snap.empty) return null;
    return snap.docs[0].data();
  },

  toPublicView(item) {
    return {
      token: item.token,
      nickname: item.nickname,
      status: item.status,
      verificationQuestion: item.verification?.enabled
        ? item.verification.question
        : null,
      instructions: item.instructions || null, // optional field if you add it
    };
  },
  async getItemOwner(ownerId)
  {
    if (!ownerId) throw new Error("UID is required");
    
    const doc = await db.collection(USER_COLLECTION).doc(ownerId).get();
    return doc.exists ? doc.data() : null;
  },
  
async createFoundReport({ item, token, payload }) {
    const createdAt = new Date().toISOString();
    const docRef = db.collection(FOUND_COLLECTION).doc();

    const report = {
      id: docRef.id,
      itemId: item.id,
      itemToken: token,
      ownerId: item.ownerId,
      finder: {
        name: payload.finder?.name || "",
        email: payload.finder.email,
        phone: payload.finder?.phone || "",
      },
      message: payload.message,
      foundLocationText: payload.foundLocationText || "",
      photoUrl: payload.photoUrl || "",
      verificationAnswer: payload.verificationAnswer || "",
      createdAt,
    };

    await docRef.set(report);

    // Return only non-sensitive data to public client
    return {
      reportId: report.id,
      ok: true,
    };
  },
};
