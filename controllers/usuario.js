import Usuario from "../models/usuario.js"
import bcryptjs from "bcryptjs"
import validar from "../middlewares/validar.js"
import subirArchivo from "../helpers/subir-archivo.js"
import { v2 as cloudinary } from 'cloudinary'

const usuario = {
    usuarioMostrar: async (req, res) => {
        try {
            const usuario = await Usuario.find();

            if (!usuario) {
                return res.status(400).json({ msg: "No se encontraron usuarios" })
            }
            res.json({ usuario })

        } catch (error) {
            return res.status(500).json({ msg: "Hable con el WebMaster" })
        }
    },
    usuarioPost: async (req, res) => {
        const { email, password, nombre, apellido, edad, alias, foto, estado, rol } = req.body  /* sirve */

        try {

            const usuario = new Usuario({ email, password, nombre, apellido, edad, alias, foto, estado, rol })
            const salt = bcryptjs.genSaltSync(10)
            usuario.password = bcryptjs.hashSync(password, salt)

            if (!usuario) {
                return res.status(400).json({ msg: "No se pudo registrar el usuario" })
            }
            usuario.save()
            res.json({
                usuario
            })

        } catch (error) {
            return res.status(500).json({ msg: "Hable con el WebMaster" })
        }

    },
    usuarioLogin: async (req, res) => {
        const { email, password } = req.body;

        try {
            const usuario = await Usuario.findOne({ email })
            if (!usuario) {
                return res.status(400).json({
                    msg: "Usuario / Password no son correctos"
                })
            }

            const validPassword = bcryptjs.compareSync(password, usuario.password);
            if (!validPassword) {
                return res.status(400).json({
                    msg: "Usuario / Password no son correctos"
                })
            }

            const token = await validar.generarJWT(usuario.id);
            res.json({
                usuario,
                token
            })

        } catch (error) {
            return res.status(500).json({
                msg: "Hable con el WebMaster"
            })
        }
    },
    usuarioDelete: async (req, res) => {
        const { email } = req.body

        try {
            const usuario = await Usuario.findOneAndDelete({ email });

            if (!usuario) {
                return res.status(400).json({ msg: "No se pudo eliminar al usuario" })
            }
            res.json({
                usuario
            })

        } catch (error) {
            return res.status(500).json({ msg: "Hable con el WebMaster" })
        }
    },
    usuarioPut: async (req, res) => {
        const { id } = req.params
        const { _id, createAt, estado, ...resto } = req.body;

        try {

            const modificar = await Usuario.findByIdAndUpdate(id, resto);

            if (!modificar) {
                return res.status(500).json({ msg: "No se pudo actualizar la informacion del usuario" })
            }
            res.json({
                modificar
            })

        } catch (error) {
            return res.status(500).json({ msg: "Hable con el WebMaster" })
        }
    },
    usuarioGetId: async (req, res) => {
        const { id } = req.body
        try {

            const usuario = await Usuario.findById(id);

            if (!usuario) {
                return res.status(400).json({ msg: "No se encontro al usuario por ID" })
            }
            res.json({ usuario })

        } catch (error) {
            return res.status(500).json({ msg: "Hable con el WebMaster" })
        }

    },
    usuarioActivar: async (req, res) => {
        const { id } = req.params;

        try {

            const usuario = await Usuario.findByIdAndUpdate(id, { estado: 1 })

            if (!usuario) {
                return res.status(400).json({ msg: "No se pudo activar el estado del usuario" })
            }
            res.json({
                usuario
            })

        } catch (error) {
            return res.status(500).json({ msg: "Hable con el WebMaster" })
        }

    },
    usuarioDesactivar: async (req, res) => {
        const { id } = req.params;

        try {
            const usuario = await Usuario.findByIdAndUpdate(id, { estado: 0 })

            if (!usuario) {
                return res.status(400).json({ msg: "No se pudo desactivar el estado del usuario" })
            }
            res.json({
                usuario
            })

        } catch (error) {
            return res.status(500).json({ msg: "Hable con el WebMaster" })
        }

    },
    cargarImagen: async (req, res) => {
        const { id } = req.params;
        try {
            let nombre
            await subirArchivo(req.files, undefined)
                .then(value => nombre = value)
                .catch((err) => console.log(err));

            //persona a la cual pertenece la foto
            let usuario = await Usuario.findById(id);
            if (usuario.foto) {
                const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
                const pathImage = path.join(__dirname, '../uploads/', pelicula.foto);

                if (fs.existsSync(pathImage)) {
                    console.log('Existe archivo');
                    fs.unlinkSync(pathImage)
                }

            }
            usuario = await Usuario.findByIdAndUpdate(id, { foto: nombre })
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
                        let usuario = await Usuario.findById(id);
                        if (usuario.foto) {
                            const nombreTemp = ususario.foto.split('/')
                            const nombreArchivo = nombreTemp[nombreTemp.length - 1] // hgbkoyinhx9ahaqmpcwl jpg
                            const [public_id] = nombreArchivo.split('.')
                            cloudinary.uploader.destroy(public_id)
                        }
                        usuario = await Usuario.findByIdAndUpdate(id, { foto: result.url })
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
            let usuario = await Usuario.findById(id)
            if (usuario.foto) {
                return res.json({ url: usuario.foto })
            }
            res.status(400).json({ msg: 'Falta Imagen' })
        } catch (error) {
            res.status(500).json({ error })
        }
    },
}

export default usuario