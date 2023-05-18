import prisma from "./../../lib/prisma.js";

export default async function handler() {
  try {
    const requests = await prisma.request.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return requests;
  } catch (err) {
    console.error("tetot ada masalah", err);
    return [];
  }
}
