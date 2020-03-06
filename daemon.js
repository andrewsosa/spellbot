#!/usr/bin/env node

require("dotenv").config();

const Snoowrap = require("snoowrap");
const { CommentStream } = require("snoostorm");

const client = new Snoowrap({
  userAgent: "5e-spell-bot",
  clientId: process.env.APP_ID,
  clientSecret: process.env.APP_SECRET,
  username: process.env.RDT_USERNAME,
  password: process.env.RDT_PASSWORD,
});

const subreddits = ["dnd", "dndnext", "dndmemes"];

const streams = subreddits.map(
  subreddit =>
    new CommentStream(client, { subreddit, limit: 10, pollTime: 2000 })
);
streams.forEach(stream =>
  stream.on("item", item => {
    console.log(item.author.name, item.body);
  })
);
