
import { Request, Response } from 'express'

import { userModel } from '../model/userModel'

export const listUsers = async (req : Request, res : Response) => {
    try {
        const user = await userModel.find().select("-password")
        res.status(200).json({
            message : 'success',
            data : user
        })
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
}

export const readUser = async (req : Request, res : Response) => {
    try {
        const user = await userModel.findOne({ _id : req.body._id}).select('-password')
        if(user) {
            res.status(200).send(user)
        }
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
}

export const editUser = async (req : Request, res : Response) => {
    try {
        const { _id } = req.body
        let user = await userModel.findOneAndUpdate({_id}, req.body)
            if(user) {
                res.status(200).send(user)
            }
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
}

export const deleteUser = async (req : Request, res : Response) => {
    try {
        const { _id } = req.body
        let user = await userModel.findOneAndDelete({ _id })
        if(user) {
            res.status(200).send(user)
        }
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
}

