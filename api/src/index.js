import express from "express";
import routes from "./routes/index.js";
import cors from "cors";


const app = express();

app.use(express.json());
app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://zkatz72.github.io"
  ]
}));
app.use("/api", routes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});