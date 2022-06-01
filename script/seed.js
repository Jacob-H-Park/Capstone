"use strict";

const {
  db,
  models: { User, Restaurant },
} = require("../server/db");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Users
  const users = await Promise.all([
    User.create({
      username: "cody",
      password: "123",
      city: "Brooklyn",
      state: "New York",
    }),
    User.create({
      username: "murphy",
      password: "123",
      city: "Bronx",
      state: "New York",
    }),
  ]);

  const restaurants = await Promise.all([
    Restaurant.create({
      name: "Mcdonalds",
      address: "304 Grand Street",
      category: "Fast Food",
      city: "Brooklyn",
      state: "NY",
      image: "./public/photos/mcdonalds.jpg",
      ranking: 1,
    }),

    Restaurant.create({
      name: "Dominos",
      address: "121 Broadway",
      category: "Fast Food",
      city: "Brooklyn",
      state: "NY",
      image: "./public/photos/dominos.jpg",
      ranking: 2,
    }),
    Restaurant.create({
      name: "Burger King",
      address: "1300 Nostrand Avenue",
      category: "Fast Food",
      city: "Queens",
      state: "NY",
      image: "./public/photos/bk.jpg",
      ranking: 3,
    }),
    Restaurant.create({
      name: "Burger Princess",
      address: "200 Nostrand Avenue",
      category: "Fast Food",
      city: "Bronx",
      state: "NY",
      image: "./public/photos/bk.jpg",
      ranking: 6,
    }),
    Restaurant.create({
      name: "Burger Queen",
      address: "1350 Nostrand Avenue",
      category: "Fast Food",
      city: "Bronx",
      state: "NY",
      image: "./public/photos/bk.jpg",
      ranking: 4,
    }),
    Restaurant.create({
      name: "Burger Prince",
      address: "720 Broadway",
      category: "Pizza",
      city: "Bronx",
      state: "NY",
      image: "./public/photos/bk.jpg",
      ranking: 5,
    }),
  ]);
  console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);

  return {
    users: {
      cody: users[0],
      murphy: users[1],
    },
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
