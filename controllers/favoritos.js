import Favorito from "../models/favoritos.js"

const favorito = {
    favoritoPost: async (req, res) => {
        const { idPelicula, idUsuario } = req.body
        try {
            const favorito = new Favorito({ idPelicula, idUsuario })

            if (!favorito) {
                return res.status(400).json({ msg: "No se puedo registrar tu pelicula favorita" })
            }
            favorito.save()
            res.json({ favorito } )
        } catch (error) {
            return res.status(500).json({ msg: "Hable con el WebMaster" })
        }
    },

    favoritoGet: async (req, res) => {
        try {
            const favorito = await Favorito.find()
                .populate("idPelicula", ["tituloOriginal", "tituloEspanol","foto","sinopsis"])
                .populate("idUsuario", ["nombre", "apellido"])

            if(!favorito){
                return res.status(400).json({msg:"No se encontro las peliculas favoritas"})
            }
            res.json({ favorito })

        } catch (error) {
            return res.status(500).json({ msg: "Hble con el WebMaster" })
        }
    },
    
    favoritoDelete: async (req, res) => {
        const { id } = req.body
    
        try{
            const favorito= await Favorito.findOneAndDelete({id})
    
            if(!favorito){
                return res.status(400).json({msg:"No se pudo eliminar la pelicula de tus favoritos"})
            }
            res.json({
                favorito,
                msg: "acaba de eliminar tu pelicula favorita"
            })
    
        }catch(error){
            return res.status(500).json({msg:"Hable con el WebMaster"})
        }
    }
}
export default favorito