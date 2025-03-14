import type { NextApiRequest, NextApiResponse } from "next";
const figlet = require('figlet');
const fs = require('fs');
const path = require('path');

const fonts = [
    /*'Banner3',
    'Broadway',
    'Nvscript',
    'Bulbhead',
    'Calgphy2',
    'Caligraphy',
    'Peaks',
    'Pawp',
    'Colossal',
    'Computer',
    'Puffy',
    'Roman',
    //'Smkeyboard',
    'Epic',
    'Star Wars',
    'Isometric1',
    'Mono12',
    //'Bigascii12',
    'Pagga',
    //'Bigmono12',
    'Standard',*/
    'Doh',
]

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const wordsFilePath = path.join(process.cwd(), 'public', 'words_alpha.txt');
    const words = fs.readFileSync(wordsFilePath, 'utf-8').split('\n');
    const randomWord = words[Math.floor(Math.random() * words.length)].trim();

    let art = '';
    const randomFont = fonts[Math.floor(Math.random() * fonts.length)];
    console.log(randomFont);
    figlet.text(randomWord, { font: randomFont }, (err: any, data: string) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to generate ASCII art' });
            return;
        }
        art = data;
    });

    const answer = randomWord;

    const asciiArtData = {
        id: 0,
        art: art,
        answer: answer,
    };

    res.status(200).json(asciiArtData);
}
