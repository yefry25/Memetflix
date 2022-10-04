import Pelicula from "../models/pelicula.js"
import subirArchivo from "../helpers/subir-archivo.js"
import { v2 as cloudinary } from 'cloudinary'

const pelicula = {

    peliculaPost: async (req, res) => {
        const { tituloOriginal, tituloEspanol, fechaLanzamiento, genero, calificacion, sinopsis, director, escritor, repartoPrincipal, estado, idiomaOriginal, presupuesto, ingresos } = req.body
        try {
            const pelicula = new Pelicula({ tituloOriginal, tituloEspanol, fechaLanzamiento, genero, calificacion, sinopsis, director, escritor, repartoPrincipal, estado, idiomaOriginal, presupuesto, ingresos })

            if (!pelicula) {
                return res.status(400).json({ msg: "No se pudo agregar una nueva pelicula" })
            }

            pelicula.save()
            res.json({ pelicula })

        } catch (error) {
            return res.status(500).json({ msg: "Hable con el WebMaster" })
        }
    },

    peliculaGet: async (req, res) => {
        try {
            const pelicula = await Pelicula.find();

            if (!pelicula) {
                return res.status(400).json({ msg: "No se encontraron peliculas" })
            }
            res.json({ pelicula })

        } catch (error) {
            return res.status(500).json({ msg: "Hable con WebMaster" })
        }

    },

    peliculaGetId: async (req, res) => {
        const { id } = req.body
        try {
            const pelicula = await Pelicula.findById(id);

            if (!pelicula) {
                return res.status(400).json({ msg: "No se encontro la pelicula por el ID buscado" })
            }
            res.json({ pelicula })

        } catch (error) {
            return res.status(500).json({ msg: "Hable con WebMaster" })
        }
    },

    peliculaDelete: async (req, res) => {
        const { id } = req.params
        try {
            const pelicula = await Pelicula.findByIdAndDelete(id)
            if (!pelicula) {
                return res.status(400).json({ msg: "No se pudo eliminar la pelicula" })
            }
            res.json({
                pelicula,
                msg: "acaba de eliminar la pelicula"
            })
        } catch (error) {
            return res.status(500).json({ msg: "Hable con el WebMaster" })
        }
    },

    peliculaGetNombre: async (req, res) => {
        const { titulo } = req.query
        try {
            const pelicula = await Pelicula.find({
                $or: [
                    { tituloOriginal: new RegExp(titulo, "i") },
                    { tituloEspanol: new RegExp(titulo, "i") }
                ]
            });

            if (!pelicula) {
                return res.status(400).json({ msg: "No se encontro la pelicula buscada" })
            }
            res.json({ pelicula })

        } catch (error) {
            return res.status(500).json({ msg: "Hable con el WebMaster" })
        }

    },

    peliculaActores: async (req, res) => {
        const { id } = req.body;
        try {
            const peliculas = await Pelicula.find().where('repartoPrincipal.act').in(id).exec();
            if (!peliculas) {
                return res.status(400).json({ msg: "No se encontro la pelicula por el actor buscado" })
            }
            res.json({
                peliculas
            })
        } catch (error) {
            return res.status(500).json({ msg: "Hable con el WebMaster" })
        }

    },

    cargarArchivo: async (req, res) => {
        const { id } = req.params;
        try {
            let nombre
            await subirArchivo(req.files, undefined)
                .then(value => nombre = value)
                .catch((err) => console.log(err));

            //persona a la cual pertenece la foto
            let pelicula = await Pelicula.findById(id);
            if (pelicula.foto) {
                const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
                const pathImage = path.join(__dirname, '../uploads/', pelicula.foto);

                if (fs.existsSync(pathImage)) {
                    console.log('Existe archivo');
                    fs.unlinkSync(pathImage)
                }

            }

            pelicula = await Pelicula.findByIdAndUpdate(id, { foto: nombre })
            //responder
            res.json({ nombre });
        } catch (error) {
            res.status(400).json({ error, 'general': 'Controlador' })
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
                        let pelicula = await Pelicula.findById(id);
                        if (pelicula.foto) {
                            const nombreTemp = pelicula.foto.split('/')
                            const nombreArchivo = nombreTemp[nombreTemp.length - 1] // hgbkoyinhx9ahaqmpcwl jpg
                            const [public_id] = nombreArchivo.split('.')
                            cloudinary.uploader.destroy(public_id)
                        }
                        pelicula = await Pelicula.findByIdAndUpdate(id, { foto: result.url })
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

    cargarArchivoCloudPoster: async (req, res) => {
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
                        let pelicula = await Pelicula.findById(id);
                        if (pelicula.poster) {
                            const nombreTemp = pelicula.poster.split('/')
                            const nombreArchivo = nombreTemp[nombreTemp.length - 1] // hgbkoyinhx9ahaqmpcwl jpg
                            const [public_id] = nombreArchivo.split('.')
                            cloudinary.uploader.destroy(public_id)
                        }
                        pelicula = await Pelicula.findByIdAndUpdate(id, { poster: result.url })
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
            let pelicula = await Pelicula.findById(id)
            if (pelicula.foto) {
                return res.json({ url: pelicula.foto })
            }
            res.status(400).json({ msg: 'Falta Imagen' })
        } catch (error) {
            res.status(500).json({ error })
        }
    },

    peliculaPut: async (req, res) => {
        const { id } = req.params
        const { _id, createAt, ...resto } = req.body;
        try {
            const modificar = await Pelicula.findByIdAndUpdate(id, resto);

            if (!modificar) {
                return res.status(500).json({ msg: "No se pudo actualizar la informacion de la pelicula" })
            }
            res.json({
                modificar
            })

        } catch (error) {
            return res.status(500).json({ msg: "Hable con el WebMaster" })
        }
    },

}

export default pelicula