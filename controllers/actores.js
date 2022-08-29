import Actor from "../models/actores.js"
import subirArchivo from "../helpers/subir-archivo.js"
import { v2 as cloudinary } from 'cloudinary'

const actor = {
    actoresPost: async (req, res) => {
        const { nombre, biografia, foto } = req.body
        try {
            const actores = new Actor({ nombre, biografia, foto })
            if (!actores) {
                return res.status(400).json({ msg: "No se pudo registrar el actor" })
            }
            actores.save()
            res.json({ actores })
        } catch (error) {
            return res.status(500).json({ msg: "Hable con el WebMaster" })
        }
    },

    actoresGet: async (req, res) => {
        try {
            const actores = await Actor.find();
            if (!actores) {
                return res.status(400).json({ msg: "No se encontro los actores buscados" })
            }
            res.json({ actores })
        } catch (error) {
            return res.status(500).json({ msg: "Hable con el WebMaster" })
        }
    },

    actoresGetId: async (req, res) => {
        const { id } = req.body
        try {
            const actores = await Actor.findById(id);
            if (!actores) {
                return res.status(400).json({ msg: "No se encontro lo buscado" })
            }
            res.json({ actores })
        } catch (error) {
            return res.status(500).json({ msg: "Hable con el WebMaster" })
        }
    },

    actoresPut: async (req, res) => {
        const { id } = req.params
        const { _id, createAt, ...resto } = req.body;
        try {
            const modificar = await Actor.findByIdAndUpdate(id, resto);
            if (!modificar) {
                return res.status(500).json({ msg: "No se pudo actualizar la informacion del actor" })
            }
            res.json({
                modificar
            })
        } catch (error) {
            return res.status(500).json({ msg: "Hable con el WebMaster" })
        }
    },
    cargarArchivoCloud: async (req, res) => {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_NAME,
            api_key: process.env.CLOUDINARY_KEY,
            api_secret: process.env.CLOUDINARY_SECRET,
            secure: true
        });

        const { id } = req.params;
        try {
            //subir archivo

            const { tempFilePath } = req.files.archivo
            cloudinary.uploader.upload(tempFilePath,
                async function (error, result) {
                    if (result) {
                        let actor = await Actor.findById(id);
                        if (actor.foto) {
                            const nombreTemp = actor.foto.split('/')
                            const nombreArchivo = nombreTemp[nombreTemp.length - 1] // hgbkoyinhx9ahaqmpcwl jpg
                            const [public_id] = nombreArchivo.split('.')
                            cloudinary.uploader.destroy(public_id)
                        }
                        actor = await Actor.findByIdAndUpdate(id, { foto: result.url })
                        //responder
                        res.json({ url: result.url });
                    } else {
                        res.json(error)
                    }
                })
        } catch (error) {
            res.status(400).json({ error, 'general': 'Controlador' })
        }
    },

    mostrarImagenCloud: async (req, res) => {
        const { id } = req.params

        try {
            let actor = await Actor.findById(id)
            if (actor.foto) {
                return res.json({ url: actor.foto })
            }
            res.status(400).json({ msg: 'Falta Imagen' })
        } catch (error) {
            res.status(500).json({ error })
        }
    },
}

export default actor