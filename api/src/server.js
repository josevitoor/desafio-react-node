const express = require("express");
const cors = require("cors");
const transactionsRouter = require("./routes/transactionsRouter");
const uploadRouter = require("./routes/uploadRouter");

const app = express();
const port = process.env.PORT || 3333;

app.use(express.json());
app.use(cors());
app.use(transactionsRouter);
app.use(uploadRouter);

app.listen(3333, () => console.log(`Server is running on port ${port}`));
