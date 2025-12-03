import fs from "fs";
import path from "path";

const dataPath = path.join(process.cwd(), "src/data/subjects.json");

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

export function getSubjects(req, res) {
  res.json(readDB());
}

export function addSubject(req, res) {
  const subjects = readDB();
  const { name } = req.body;

  if (!name) return res.status(400).json({ message: "Nome obrigatório" });

  const newSubject = {
    id: subjects.length ? subjects[subjects.length - 1].id + 1 : 1,
    name
  };

  subjects.push(newSubject);
  writeDB(subjects);

  res.status(201).json(newSubject);
}

export function updateSubject(req, res) {
  const subjects = readDB();
  const id = Number(req.params.id);

  const subject = subjects.find(s => s.id === id);
  if (!subject) return res.status(404).json({ message: "Matéria não encontrada" });

  subject.name = req.body.name ?? subject.name;

  writeDB(subjects);
  res.json(subject);
}

export function deleteSubject(req, res) {
  const subjects = readDB().filter(s => s.id !== Number(req.params.id));
  writeDB(subjects);

  res.json({ message: "Matéria removida" });
}