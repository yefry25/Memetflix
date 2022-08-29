import { Router } from "express";
import actor from "../controllers/actores.js"
import { validarCampos } from "../middlewares/middleware.js";
import { check } from "express-validator"
import validar from "../middlewares/validar.js"
import validarArchivo from "../middlewares/validar-archivo.js"
import helpersUsuarios from "../helpers/usuario.js"
import helpersActor from '../helpers/actor.js'

const router = new Router()

router.post('/', [
    validar.validarJWT,
    check('nombre', 'el campo nombre no puede estar vacio').not().isEmpty(),
    check('biografia','el campo biografia no puede estar vacio').not().isEmpty(),
    check('biografia', 'el campo biografia debe ser mayor a 8 caracteres').isLength({ min: 8 }),
    validarCampos
]
,actor.actoresPost)

router.get('/', actor.actoresGet)

router.post('/id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(helpersActor.existeActorById),
    validarCampos
],actor.actoresGetId)

router.put('/:id',[
    validar.validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(helpersUsuarios.existeUsuarioById),
    validarCampos
],actor.actoresPut)

router.post('/uploadinary/:id',[
    validar.validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(helpersActor.existeActorById),
    validarArchivo,
    validarCampos
],actor.cargarArchivoCloud)

router.get('/mostrarImagen/:id',[
    validar.validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(helpersActor.existeActorById),
    validarCampos
],actor.mostrarImagenCloud)

export default router