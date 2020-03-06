#!/usr/bin/env node

const fetch = require("node-fetch");
const fs = require("fs");
const path = require("path");
const { results } = require("./index.json");

const fileName = index => path.resolve(__dirname, `./spells/${index}.json`);
const checkFile = index => fs.existsSync(fileName(index));

results
  .filter(({ index }) => !checkFile(index))
  .forEach(({ url, index }) =>
    fetch(`http://www.dnd5eapi.co${url}`).then(res =>
      res.body.pipe(fs.createWriteStream(fileName(index)))
    )
  );
