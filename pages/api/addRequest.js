import prisma from "../../lib/prisma";

export default async function handleAddRequest(req, res) {
  try {
    const { createdById, date, status, supirId, transportationId, approvals } =
      req.body;
    console.log("data =", req.body);

    const createdRequest = await prisma.request.create({
      data: {
        createdById,
        date,
        status,
        supirId,
        transportationId,
        approvals: {
          create: approvals.map((approval) => ({
            userId: approval.userId,
            status: approval.status,
          })),
        },
      },
      include: {
        approvals: true,
      },
    });

    res.status(201).json(createdRequest);
  } catch (error) {
    console.error("Failed to create request:", error);
    res.status(500).json({ error: "Failed to create request" });
  }
}
