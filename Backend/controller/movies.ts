import { Request, Response } from 'express'

import { movieModel } from '../model/movieModel'

export const AddMovie = async (req : Request, res : Response) => {
    try {
        const { 
            title,
            desc,
            duration,
            genre,
            language,
            releaseDate,
            poster
        } = req.body

        const newMovie = new movieModel({
            title,
            desc,
            duration,
            genre,
            language,
            releaseDate,
            poster
        })

        await newMovie.save()
        res.status(201).send('Movie added successfully')
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
}

export const getAllMovie = async (req : Request, res : Response) => {
    try {
        const AllMovie = await movieModel.find().sort({ createdAt : -1})
        if(AllMovie) {
            res.status(200).send(AllMovie)
        }
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
}

export const getMovieById = async (req : Request, res : Response) => {
    try {
        const movie = await movieModel.findOne({ _id : req.params._id })
        if(movie) {
            res.status(200).send(movie)
        }
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
}

export const updateMovie = async (req : Request, res : Response) => {
    try {
        const { _id } = req.body
        const updateMovie = await movieModel.findOneAndUpdate({ _id }, req.body)

        if(updateMovie) {
            res.status(200).send(updateMovie)
        }
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
}

export const deleteMovie = async (req : Request, res : Response) => {
    try {
        const deleteMovie = await movieModel.findOneAndDelete(req.body.movieId)
        if(deleteMovie) {
            res.status(200).send('Movie deleted successfully')
        }
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
}

