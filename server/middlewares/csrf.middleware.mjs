import Tokens from "csrf";

export const tokens = new Tokens();

export const generateCsrfToken = (req, res, next) => {
  if (!req.cookies.csrfSecret) {
    const secret = tokens.secretSync();
    res.cookie("csrfSecret", secret, { httpOnly: true, sameSite: "Strict" });
    req.csrfSecret = secret;
  } else {
    req.csrfSecret = req.cookies.csrfSecret;
  }
  next();
};

export const verifyCsrfToken = (req, res, next) => {
  const secret = req.cookies.csrfSecret;
  const token = req.headers["x-csrf-token"];
  if (!secret || !token || !tokens.verify(secret, token)) {
    return res
      .status(403)
      .json({ status: "error", message: "Invalid CSRF token" });
  }
  next();
};
