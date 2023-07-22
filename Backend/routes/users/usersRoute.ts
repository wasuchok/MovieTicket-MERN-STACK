import { Router, Request, Response } from "express"
const router = Router()


//users
import { editUser, listUsers } from '../../controller/users'

//auth
import { Auth, Login, currentUser, registerUser } from "../../controller/auth"


router.get('/', Auth, listUsers)

router.get('/test', Auth, listUsers)

router.get('/currentUser', Auth, currentUser)

router.post('/editUser', Auth, editUser)

router.post('/register', registerUser)

router.post('/login', Login)



export default router;