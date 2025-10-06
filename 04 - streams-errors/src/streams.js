const fs = require("fs");
const { Transform } = require("stream");
// Укажите путь к входному файлу как аргумент
const inputFile = __dirname + '/inputData/input.txt';
if (!inputFile) {
    console.error("Пожалуйста, укажите путь к входному файлу.");

    process.exit(1);
}
// Трансформирующий поток
class TextProcessor extends Transform {
    constructor() {
        super({
            readableObjectMode: true,
            writableObjectMode: true
        });

        this.wordsMap = new Map();
        this.buffer = '';
    }
    _transform(chunk, encoding, callback) {
        this.buffer += chunk.toString();

        const lines = this.buffer.split("\n");
        this.buffer = lines.pop();

        for (const line of lines) {
            this._processLine(line)
        }

        callback();
    }

    _processLine(line) {
        const words = line
            .toLowerCase()
            .replace(/[^a-zA-Zа-яА-ЯёЁ\s]/g, ' ')
            .split(/\s+/)
            .filter(word => word.length > 0);

        for (const word of words) {
            this.wordsMap.set(word, (this.wordsMap.get(word) ?? 0) + 1);
        }
    }

    _flush(callback) {
        if (this.buffer) {
            this._processLine(this.buffer);
        }

        const sortedWords = Array.from(this.wordsMap.keys()).sort();
        const vector = sortedWords.map(word => this.wordsMap.get(word));

        this.push(JSON.stringify(vector));

        callback();
    }
}
// Чтение, обработка и запись
fs.createReadStream(inputFile, { encoding: "utf-8" })
    .pipe(new TextProcessor())
    .pipe(fs.createWriteStream(__dirname + "/outputData/output_vector.json"));

