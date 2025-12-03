import express from "express";
import helmet from "helmet";
import studentsRoutes from "./routes/students.routes.js";
import subjectsRoutes from "./routes/subjects.routes.js";
import fs from "fs";
import path from "path";

const app = express();
app.use(express.json());
app.use(helmet());

const studentsPath = path.join(process.cwd(), "src/data/students.json");
const subjectsPath = path.join(process.cwd(), "src/data/subjects.json");

app.get("/", (req, res) => {
  const students = JSON.parse(fs.readFileSync(studentsPath, "utf8"));
  const subjects = JSON.parse(fs.readFileSync(subjectsPath, "utf8"));

  res.json({
    message: "Bem-vindo ao sistema!",
    students,
    subjects
  });
});

app.use("/students", studentsRoutes);
app.use("/subjects", subjectsRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(` Servidor rodando em: http://localhost:${PORT}`);
});