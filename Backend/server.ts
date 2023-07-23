import express, { Express, Router, Application } from 'express'
import 'dotenv/config'

import { connection } from './config/database'

import fs,{ readdirSync } from 'fs'

import morgan from 'morgan'

import cors from 'cors'

const app: Application = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan("dev"))
app.use(cors())



const port = process.env.PORT


//usersRoute
const User = fs.readdirSync("./routes/users");

User.forEach((file) => {
  const route = require(`./routes/users/${file}`).default;
  app.use("/api/users", route);
});

//moviesRoute
const Movie = fs.readdirSync("./routes/movies")

Movie.forEach((file) => {
  const routeMovie = require(`./routes/movies/${file}`).default;
  app.use("/api/movies", routeMovie);
})





app.listen(5000, () => console.log(`Application is running on port ${port}`))

connection()
