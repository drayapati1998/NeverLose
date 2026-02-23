// Generates a cryptographically secure, URL-safe token for each item.
// This is used in the public scan URL (/f/{token}).

const crypto = require("crypto");

function generateSecureToken() {
  // 128 bits of entropy (16 bytes) encoded as URL-safe base64.
  return crypto.randomBytes(16).toString("base64url");
}

module.exports = { generateSecureToken };