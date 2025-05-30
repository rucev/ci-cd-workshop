import { errors } from "common"
import 'dotenv/config'

const { FormatError, ExistenceError, AuthError, DuplicityError, ContentError } = errors

const errorHandler = (error, req, res, next) => {
    const response = {}

    //console.error(error)

    if (error instanceof TypeError || error instanceof RangeError || error instanceof FormatError || error instanceof ContentError) {
        response.name = error.name
        response.message = error.message
        res.status(400).send(JSON.stringify(response))
    } else if (error instanceof AuthError) {
        response.name = error.name
        response.message = error.message
        res.status(401).send(JSON.stringify(response))
    } else if (error instanceof ExistenceError) {
        response.name = error.name
        response.message = error.message
        res.status(404).send(JSON.stringify(response))
    } else if (error instanceof DuplicityError) {
        response.name = error.name
        response.message = error.message
        res.status(409).send(JSON.stringify(response))
    } else {
        response.name = 'UnknownError'
        response.message = error.message
        res.status(500).send(JSON.stringify(response))
    }
}

export default errorHandler