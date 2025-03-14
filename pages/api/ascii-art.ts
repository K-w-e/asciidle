import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const baseDir = path.join(process.cwd(), "public", "animals");
  const categories = fs.readdirSync(baseDir).filter((name) =>
    fs.statSync(path.join(baseDir, name)).isDirectory()
  );

  if (categories.length === 0) {
    return res.status(500).json({ error: "No categories found" });
  }

  const randomCategory = categories[Math.floor(Math.random() * categories.length)];
  const asciiDir = path.join(baseDir, randomCategory);
  const files = fs.readdirSync(asciiDir).filter((file) => file !== "_.txt");

  if (files.length === 0) {
    return res.status(500).json({ error: "No valid files found" });
  }

  const file = files[Math.floor(Math.random() * files.length)];
  const filePath = path.join(asciiDir, file);
  const content = fs.readFileSync(filePath, "utf-8");
  const [...artLines] = content.split("\n");
  const art = artLines.join("\n");

  const answerFilePath = path.join(asciiDir, "_.txt");
  let answer: string[] = [];
  if (fs.existsSync(answerFilePath)) {
    const answerContent = fs.readFileSync(answerFilePath, "utf-8");
    answer = answerContent.split(/\s+/);
  }

  const asciiArtData = {
    id: path.parse(file).name,
    category: randomCategory,
    art: art,
    answer: answer,
  };

  res.status(200).json(asciiArtData);
}
