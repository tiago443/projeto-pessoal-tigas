import fs from "fs";
import path from "path";

const dataPath = path.join(process.cwd(), "src/data/students.json");

function readDB() {
  try {
    return JSON.parse(fs.readFileSync(dataPath, "utf-8"));
  } catch {
    return [];
  }
}

function writeDB(data: any) {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
}

export function getStudents(req, res) {
  const students = readDB();
  res.json(students);
}

export function getStudent(req, res) {
  const students = readDB();
  const id = Number(req.params.id);

  const student = students.find(s => s.id === id);
  if (!student) return res.status(404).json({ message: "Aluno não encontrado" });

  res.json(student);
}

export function addStudent(req, res) {
  const students = readDB();

  const { name, grades } = req.body;

  if (!name || typeof grades !== "object")
    return res.status(400).json({ message: "Nome e grades obrigatórios" });

  const values = Object.values(grades).map(n => Number(n) || 0);
  const avg = values.length ? values.reduce((a, b) => a + b, 0) / values.length : 0;

  const newStudent = {
    id: students.length ? students[students.length - 1].id + 1 : 1,
    name,
    grades,
    avg
  };

  students.push(newStudent);
  writeDB(students);

  res.status(201).json(newStudent);
}

export function updateStudent(req, res) {
  const students = readDB();
  const id = Number(req.params.id);

  const student = students.find(s => s.id === id);
  if (!student) return res.status(404).json({ message: "Aluno não encontrado" });

  const { name, grades } = req.body;

  if (name) student.name = name;
  if (grades) student.grades = { ...student.grades, ...grades };

  const values = Object.values(student.grades).map(n => Number(n) || 0);
  student.avg = values.length ? values.reduce((a, b) => a + b, 0) / values.length : 0;

  writeDB(students);

  res.json(student);
}

export function deleteStudent(req, res) {
  const students = readDB();
  const id = Number(req.params.id);

  const newList = students.filter(s => s.id !== id);
  writeDB(newList);

  res.json({ message: "Aluno removido" });
}