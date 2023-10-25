const express = require("express");
const multer = require("multer");
const { PrismaClient } = require("@prisma/client");
const { parseTransaction, isValidTransaction } = require("../utils/utils");

const prisma = new PrismaClient();

const uploadRouter = express.Router();

const storage = multer.memoryStorage();

const upload = multer({ storage });

uploadRouter.post(
  "/upload",
  upload.single("file"),
  async (request, response) => {
    const file = request.file;
    if (!file) {
      return response.status(400).json({ message: "No files found." });
    }

    const fileContent = file.buffer.toString("utf-8");

    const transactions = fileContent
      .split("\n")
      .map((line) => {
        const [type, date, product, value, seller] = parseTransaction(line);

        if (!isValidTransaction(type, date, product, value, seller)) {
          return null;
        }

        return { type, date, product, value, seller };
      })
      .filter((t) => t !== null);

    try {
      const createdTransactions = await prisma.transactions.createMany({
        data: transactions,
      });

      response.status(201).json({
        message: "Upload successfully completed.",
        transactions: createdTransactions,
      });
    } catch (error) {
      response.status(500).json({ message: "Error when performing upload." });
    }
  }
);

module.exports = uploadRouter;
