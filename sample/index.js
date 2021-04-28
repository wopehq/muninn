const fs = require("fs");
const config = require("./config.json");

const { parse, validateConfig } = require("../build/index");

async function main() {
  const data = fs.readFileSync(__dirname + "/desktop.html", {
    encoding: "utf-8",
  });

  console.log(typeof data);
  const validationResult = validateConfig(config);
  console.log("validationResult", validationResult);

  console.time("parser");
  const results = parse(config, data);
  console.log(results);
  console.timeEnd("parser");
}

main().catch((err) => {
  console.log("Error:", err);
});
