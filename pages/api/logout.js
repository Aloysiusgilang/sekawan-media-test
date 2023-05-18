export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  res.setHeader("Set-Cookie", "token=; HttpOnly; Max-Age=0");
  res.status(200).json({ message: "Logged out successfully" });
}
