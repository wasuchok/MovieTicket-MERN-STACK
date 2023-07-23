import { Router, Request, Response } from "express"
const router = Router()


//users
import { deleteUser, editUser, listUsers, readUser } from '../../controller/users'

//auth
import { Auth, CheckAdmin, Login, currentUser, registerUser } from "../../controller/auth"


//Users

router.get('/', Auth, CheckAdmin, listUsers)

router.get('/currentUser', Auth, currentUser)

router.post('/editUser', Auth, editUser)

router.post('/readUser', Auth, CheckAdmin, readUser)

router.post('/deleteUser', Auth, CheckAdmin, deleteUser)


//Auth

router.post('/register', registerUser)

router.post('/login', Login)



export default router;