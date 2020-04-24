const fs = require("fs");
const path = require("path");
const parser = require("csv-parse");
const unidecode = require("unidecode");

const parserOptions = {
  columns: true,
  skip_empty_lines: true,
  trim: true,
};

const parserStream = parser(parserOptions);

const human_readable_id = (str, oid) => {
  let convert_str = (str) =>
    unidecode(str)
      .replace(/\W/g, "_")
      .replace(/\s/g, "_")
      .replace(/_+/g, "_")
      .replace(/^_/, "")
      .replace(/_$/, "")
      .toLowerCase();
  return [convert_str(str || ""), convert_str(oid || "")]
    .filter((item) => item)
    .join("_");
};

const readStream = fs.createReadStream(
  path.resolve(__dirname, "data", "oblasti.csv")
);
const writeStream = fs.createWriteStream(
  path.resolve(__dirname, "data", "cities_ids.json")
);

writeStream.write("[");
readStream.pipe(parserStream);

parserStream.on("readable", () => {
  while (true) {
    const chunk = parserStream.read();

    if (chunk === null) {
      break;
    }

    const { name } = chunk;

    const city = {
      name: name,
      id: human_readable_id(name),
    };

    writeStream.write(JSON.stringify(city));
    writeStream.write(",");
  }
});

parserStream.on("end", () => {
  writeStream.write("]");
});
