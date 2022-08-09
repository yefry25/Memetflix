import {Router} from "express"
import comentario from "../controllers/comentario.js"
import { validarCampos } from "../middlewares/middleware.js"
import { check } from "express-validator"
import validar from "../middlewares/validar.js"
import helpersUsuarios from "../helpers/usuario.js"
import helpersPeliculas from "../helpers/pelicula.js"

const router=new Router()

router.post('/',[
    validar.validarJWT,
    check('Comment','El campo comentario no puede estar vacio').not().isEmpty(),
    check('Comment','El campo comentario debe tener minimo 6 caracteres').isLength({min:6}),
    check('idUsuario', 'No es un ID válido').isMongoId(),
    check('idUsuario').custom(helpersUsuarios.existeUsuarioById),
    check('idPelicula', 'No es un ID válido').isMongoId(),
    check('idPelicula').isMongoId(helpersPeliculas.existePeliculaById),
    validarCampos
],comentario.comentarioPost)

router.get('/get',[
    validar.validarJWT,
    check('idUsuario', 'No es un ID válido').isMongoId(),
    check('idUsuario').custom(helpersUsuarios.existeUsuarioById),
    check('idPelicula', 'No es un ID válido').isMongoId(),
    check('idPelicula').isMongoId(helpersPeliculas.existePeliculaById),
    validarCampos
],comentario.comentarioGet)

router.delete('/delete',[
    validar.validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(helpersPeliculas.existeActor),
    validarCampos
],comentario.comentarioDelete)

router.put('/get',[
    validar.generarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(helpersPeliculas.existeActor),
    validarCampos
],comentario.comentarioPut)

export default router