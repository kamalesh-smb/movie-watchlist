// Run once: npm run seed   (clears movies and inserts sample data)
require('dotenv').config();
const mongoose = require('mongoose');
const Movie = require('./models/Movie');

const movies = [
  { title: 'Inception', genre: 'Sci-Fi, Thriller', year: 2010, rating: 8.8, duration: 148, director: 'Christopher Nolan', description: 'A thief who steals secrets from dreams is offered one last, impossible job.' },
  { title: 'The Dark Knight', genre: 'Action, Crime', year: 2008, rating: 9.0, duration: 152, director: 'Christopher Nolan', description: "Gotham's hero faces a rival who wants to prove order is fragile." },
  { title: 'Interstellar', genre: 'Sci-Fi, Drama', year: 2014, rating: 8.7, duration: 169, director: 'Christopher Nolan', description: 'Explorers travel through a wormhole to find a new home for humanity.' },
  { title: 'Parasite', genre: 'Thriller, Drama', year: 2019, rating: 8.5, duration: 132, director: 'Bong Joon-ho', description: 'A poor family slowly works its way into a wealthy household.' },
  { title: 'Spirited Away', genre: 'Animation, Fantasy', year: 2001, rating: 8.6, duration: 125, director: 'Hayao Miyazaki', description: 'A girl wanders into a spirit world and must work to free her parents.' },
  { title: 'The Godfather', genre: 'Crime, Drama', year: 1972, rating: 9.2, duration: 175, director: 'Francis Ford Coppola', description: 'The aging head of a crime family hands control to his reluctant son.' },
  { title: 'Dune', genre: 'Sci-Fi, Adventure', year: 2021, rating: 8.0, duration: 155, director: 'Denis Villeneuve', description: 'A young heir is pulled into war over a desert planet and its spice.' },
  { title: 'La La Land', genre: 'Romance, Musical', year: 2016, rating: 8.0, duration: 128, director: 'Damien Chazelle', description: 'A musician and an actress chase dreams and each other in Los Angeles.' },
  { title: 'Mad Max: Fury Road', genre: 'Action, Adventure', year: 2015, rating: 8.1, duration: 120, director: 'George Miller', description: 'A desert chase where survival depends on a stolen war rig.' },
  { title: 'Get Out', genre: 'Horror, Thriller', year: 2017, rating: 7.7, duration: 104, director: 'Jordan Peele', description: "A weekend with his girlfriend's family turns deeply unsettling." },
];

mongoose.connect(process.env.MONGO_URI).then(async () => {
  await Movie.deleteMany({});
  await Movie.insertMany(movies);
  console.log(`Seeded ${movies.length} movies`);
  process.exit(0);
}).catch((e) => { console.error(e.message); process.exit(1); });
