const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
require("dotenv").config({ path: require("path").resolve(__dirname, "../.env") });

const MONGO_URL = process.env.ATLASDB_URL; 

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});
  const dataWithGeometry = initData.data.map((obj) => ({
    ...obj,
    owner: "000000000000000000000000", 
    geometry: {
      type: "Point",
      coordinates: [0, 0], 
    },
  }));
  await Listing.insertMany(dataWithGeometry);
  console.log("data was initialized");
};

initDB();


/*
const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/airhorizon";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});
  await Listing.insertMany(initData.data);
  console.log("data was initialized");
};

initDB();
*/