const express = require("express");
const multer = require("multer");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const routes = express.Router();

const storage = multer.memoryStorage();

const upload = multer({ storage });

routes.post("/upload", upload.single("file"), async (request, response) => {
  const file = request.file;
  if (!file) {
    return response.status(400).json({ message: "Nenhum arquivo enviado" });
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
      message: "Arquivo enviado com sucesso",
      transactions: createdTransactions,
    });
  } catch (error) {
    response.status(500).json({ message: "Erro ao processar o arquivo" });
  }
});

function parseTransaction(line) {
  const type = parseInt(line.slice(0, 1));
  const date = line.slice(1, 26);
  const product = line.slice(26, 56);
  const value = parseInt(line.slice(56, 66));
  const seller = line.slice(66, 86);

  return [type, date, product, value, seller];
}

function isValidTransaction(type, date, product, value, seller) {
  return (
    !isNaN(type) &&
    date !== "" &&
    product.trim() !== "" &&
    !isNaN(value) &&
    seller.trim() !== ""
  );
}

routes.get("/transactions", async (request, response) => {
  const transaction = await prisma.transactions.findMany();
  return response.status(200).json(transaction);
});

module.exports = routes;
