import Comentario from "../models/comentario.js"

const comentario = {

    comentarioPost: async (req, res) => {
        const { Comment, idPelicula, idUsuario } = req.body

        try {
            const comentario = new Comentario({ Comment, idPelicula, idUsuario })

            if (!comentario) {
                return res.status(400).json({ msg: "No se puedo registrar el comentario" })
            }
            comentario.save()
            res.json({ comentario })

        } catch (error) {
            return res.status(500).json({ msg: "Hable con WebMaster" })
        }
    },

    comentarioGet: async (req, res) => {
        const { idPelicula, idUsuario } = req.body
        console.log(idPelicula);

        try {
            const comentario = await Comentario.find({ idPelicula, idUsuario })
                .populate("idPelicula", ["tituloOriginal"])
                .populate("idUsuario", ["nombre", "apellido"])
                .populate("Comment", ["Comment"])

            if (!comentario) {
                return res.status(400).json({ msg: "No se encontro lo buscado" })
            }

            res.json({ comentario })
        } catch (error) {
            return res.status(500).json({ msg: "Hable con WebMaster" })
        }
    },

    comentarioDelete: async (req, res) => {
        const { id } = req.body

        try {
            const comentario = await Comentario.findOneAndDelete({ id })

            if (!comentario) {
                return res.status(400).json({ msg: "No se pudo eliminar el comentario de la pelicula" })
            }
            res.json({
                comentario,
                msg: "acaba de eliminar tu comentario"
            })

        } catch (error) {
            return res.status(500).json({ msg: "Hable con el WebMaster" })
        }
    },

    comentarioPut: async (req, res) => {
        const { id } = req.params
        const { _id, createAt, idUsuario, idPelicula, ...resto } = req.body;

        try {
            const modificar = await Comentario.findByIdAndUpdate({ id, resto })

            if (!modificar) {
                return res.status(500).json({ msg: "No se pudo actualizar la informacion de tu comentario" })
            }
            res.json({
                modificar
            })

        } catch (error) {
            return res.status(500).json({ msg: "Hable con el WebMaster" })
        }
    }
}


export default comentario

