const express = require("express");
const routes = require("./routes");

const app = express();

app.use(express.json());
app.use(routes);

app.get("/", (request, response) => {
  return response.json("up");
});

app.listen(3333, () => console.log("Server up in 3333"));
