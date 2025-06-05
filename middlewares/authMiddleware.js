const adminSecret = process.env.ADMIN_SECRET;

const adminAuthMiddleware = (req, res, next) => {
  const secret = req.headers["x-admin-secret"];
  console.log(`Admin secret: ${secret}`); // Debugging line to check the secret
  console.log(`Expected admin secret: ${adminSecret}`); // Debugging line to check the expected secret
  if (!secret || secret !== adminSecret) {
    return res
      .status(401)
      .json({ message: "Unauthorized: Admin access required" });
  }
  next();
};

module.exports = { adminAuthMiddleware };
