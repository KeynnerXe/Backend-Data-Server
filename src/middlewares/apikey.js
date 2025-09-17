require("dotenv").config();

function requireApiKey(req, res, next) {
  const key = req.headers["x-api-key"] || req.query.api_key;
  const valid = process.env.WRITEBACK_API_KEY;
  if (valid && key === valid) return next();
  return res.status(401).json({ message: "API key missing or invalid" });
}

module.exports = requireApiKey;
