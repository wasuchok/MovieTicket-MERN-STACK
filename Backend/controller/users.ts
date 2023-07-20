
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


