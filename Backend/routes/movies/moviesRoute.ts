import { Router } from "express"
const router = Router()

//movies
import { AddMovie, deleteMovie, getAllMovie, getMovieById, updateMovie } from '../../controller/movies'

//Auth
import { Auth, CheckAdmin } from "../../controller/auth"

router.post('/add-movie', Auth, CheckAdmin, AddMovie)

router.get('/get-all-movies', Auth, getAllMovie)

router.get('/get-movie-by-id/:_id', Auth, getMovieById)

router.put('/update-movie', Auth, CheckAdmin, updateMovie)

router.post('/delete-movie', Auth, CheckAdmin, deleteMovie)


export default router;