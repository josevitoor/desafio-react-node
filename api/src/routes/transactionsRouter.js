const express = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const transactionsRouter = express.Router();

transactionsRouter.get("/transactions", async (request, response) => {
  try {
    const transaction = await prisma.transactions.findMany();
    return response
      .status(200)
      .json({
        message: "Transactions loaded successfully.",
        transactions: transaction,
      });
  } catch (error) {
    response.status(500).json({ message: "Internal server error." });
  }
});

module.exports = transactionsRouter;
