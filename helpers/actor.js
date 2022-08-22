import Actor from '../models/actores.js'

const helpersActor = {
    existeActorById: async (id) => {
        const existe = await Actor.findById(id)
        if (!existe) {
            throw new Error(`El id no existe ${id}`)
        }
    },
}
export default helpersActor