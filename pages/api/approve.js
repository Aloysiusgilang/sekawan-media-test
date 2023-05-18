import prisma from "./../../lib/prisma.js";

export default async function handler(req, res) {
  const { requestId, userId, status } = req.body;
  try {
    // update approval status to approved
    const request = await prisma.approval.update({
      where: {
        requestId: requestId,
        userId: userId,
      },
      data: {
        status: status,
      },
    });
  } catch (err) {
    console.error("tetot ada masalah", err);
    return [];
  }
}
