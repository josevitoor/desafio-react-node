const express = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const routes = express.Router();

routes.post("/upload", async (request, response) => {
  const transactionsData = request.body;

  const createdTransactions = await Promise.all(
    transactionsData.map(async (transactionData) => {
      const { type, date, product, value, seller } = transactionData;

      const transaction = await prisma.transactions.create({
        data: {
          type,
          date,
          product,
          value,
          seller,
        },
      });

      return transaction;
    })
  );

  return response.status(201).json(createdTransactions);
});

routes.get("/transactions", async (request, response) => {
  const transaction = await prisma.transactions.findMany();
  return response.status(200).json(transaction);
});

module.exports = routes;
