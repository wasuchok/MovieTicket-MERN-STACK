import { Router } from "express"
const router = Router()

//movies
import { AddMovie, deleteMovie, getAllMovie, getMovieById, updateMovie } from '../../controller/movies'

//Auth
import { Auth } from "../../controller/auth"

router.post('/add-movie', Auth, AddMovie)

router.get('/get-all-movies', Auth, getAllMovie)

router.get('/get-movie-by-id/:id', Auth, getMovieById)

router.put('/update-movie', Auth, updateMovie)

router.post('/delete-movie', Auth, deleteMovie)


export default router;