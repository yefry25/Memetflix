import Usuario from "../models/usuario.js"


const helpersUsuarios = {
    existeUsuarioById: async (id) => {
        const existe = await Usuario.findById(id)

        if (!existe) {
            throw new Error(`El id no existe ${id}`)
        }
    },

    existeEmail:async(email) => {

        const existe = await Usuario.findOne({ email });

        if (existe) {
            throw new Error(`El email ya esta registrado`)
        }
    },

}
export default helpersUsuarios