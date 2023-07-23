
import { NextFunction, Request, Response } from 'express'

import bcrypt from 'bcrypt'

import jwt from 'jsonwebtoken'


//types
import { User, createUser, loginUser } from '../types/users'

//models
import { userModel } from '../model/userModel'

export const registerUser = async (req : Request<{}, {}, createUser>, res : Response) => {
    try {
        const { username, email, password } = req.body
        let user = await userModel.findOne({ email })
        if(user) {
            return res.status(200).send("User already registered")
        }

        const salt = await bcrypt.genSalt(10)
        user = new userModel({
            username,
            email,
            password
        })

        user.password = await bcrypt.hash(password, salt)

        await user.save()

        res.status(201).send("User registration")
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
}

export const Login = async (req : Request<{}, {}, loginUser>, res : Response) => {
    try {
        const { email, password } = req.body
        let user = await userModel.findOne({ email })
        if(user) {
            const isMatch = await bcrypt.compare(password, user.password)
            if(!isMatch) {
                return res.status(400).send('Password Invalid!!')
            }

            const payload = {
                user : {
                    _id : user._id,
                    email : user.email,
                    isAdmin : user.isAdmin
                }
            }

            jwt.sign(payload, `${process.env.jwt}`, { expiresIn: 3600 }, (err, token) => {
                if(err) throw err
                res.status(200).json({
                    message: "success",
                    token: token
                })
            })
        } else {
            return res.status(400).send("User Not Found!!!")
        }
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
}

export const Auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers['authtoken'];
  
      if (!token) {
        return res.status(401).send("No token, authorization denied");
      }
  
      const decoded = jwt.verify(`${token}`, `${process.env.jwt}`) as { user: User };

      req.body.user1  = decoded.user;
      next();
    } catch (err) {
      console.log(err);
      res.status(500).send('JWT Expired');
    }
};

export const CheckAdmin = async (req : Request, res: Response, next: NextFunction) => {
    try {
        let user = await userModel.findOne({ _id : req.body.user1._id })
        if(user && user.isAdmin) {
            next()
        } else {
            res.status(403).send('Admin Access Denied')
        }
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
}

export const currentUser = async (req: Request, res: Response) => {
    try {
        const user = await userModel.findOne({ _id : req.body.user1._id }).select("-password")
        if(user) {
            res.status(200).send(user)
        }
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
}
