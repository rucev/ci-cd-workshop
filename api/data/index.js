import { connect, disconnect, Types } from "mongoose"
import { User } from "./models.js"

export const data = {
    User,
    ObjectId: Types.ObjectId,
    connect: (uri) => {
        return connect(uri)
            .catch(error => console.error(error))
            .then(() => {
                console.info(`Connected to Mongo Server ${uri}`)
            })
    },
    disconnect: () => {
        return disconnect()
            .then(console.info('db disconected'))
            .catch(error => console.error(error))
    }
}