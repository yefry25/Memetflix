import {Router} from "express"
import { check } from "express-validator"
import usuario from "../controllers/usuario.js"
import { validarCampos } from "../middlewares/middleware.js"
import helpersUsuarios from "../helpers/usuario.js"
import validar from "../middlewares/validar.js"

const router=new Router()

router.post('/',[
    check('email','El campo email no puede estar vacio').not().isEmpty(),
    check('email','solo formato email').isEmail(),
    check('email').custom(helpersUsuarios.existeEmail),
    check('password','el campo password no puede estar vacio').not().isEmpty(),
    check('password','la contraseña no puede tener menos de 8 caracteres').isLength({min:8}),
    check('nombre','no puede quedar vacio el campo nombre').not().isEmpty(),
    check('nombre','el campo nombre no puede sobrepasar de los 25 caracteres').isLength({max:25}),
    check('apellido','el campo apellido no puede estar vacio').not().isEmpty(),
    check('apellido','el campo apellido no puede sobrepasar de los 20 caracteres').isLength({max:20}),
    validarCampos
], usuario.usuarioPost)

router.get('/mostrar',[
    validar.validarJWT
],usuario.usuarioMostrar)

router.post('/login',[
    check('email','El campo email no puede estar vacio').not().isEmpty(),
    check('email','solo formato email').isEmail(),
    check('email').custom(helpersUsuarios.existeEmail),
    check('password','el campo password no puede estar vacio').not().isEmpty(),
    check('password','la contraseña no puede tener menos de 8 caracteres').isLength({min:8}),
    validarCampos,
],usuario.usuarioLogin)

router.delete('/delete',[
    validar.validarJWT,
    check('email','El campo email no puede estar vacio').not().isEmpty(),
    check('email','solo formato email').isEmail(),
    validarCampos
],usuario.usuarioDelete)

router.put('/:id',[
    validar.validarJWT,
    check('email','El campo email no puede estar vacio').not().isEmpty(),
    check('email','solo formato email').isEmail(),
    check('email').custom(helpersUsuarios.existeEmail),
    check('password','el campo password no puede estar vacio').not().isEmpty(),
    check('password','la contraseña no puede tener menos de 8 caracteres').isLength({min:8}),
    check('nombre','no puede quedar vacio el campo nombre').not().isEmpty(),
    check('nombre','el campo nombre no puede sobrepasar de los 25 caracteres').isLength({max:25}),
    check('apellido','el campo apellido no puede estar vacio').not().isEmpty(),
    check('apellido','el campo apellido no puede sobrepasar de los 20 caracteres').isLength({max:20}),
    validarCampos 
],usuario.usuarioPut)

router.get('/buscar',[
    validar.validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(helpersUsuarios.existeUsuarioById),
    validarCampos
],usuario.usuarioGetId)

router.put('/activar/:id',[
    validar.validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(helpersUsuarios.existeUsuarioById),
    validarCampos
],usuario.usuarioActivar)

router.put('/desactivar/:id',[
    validar.validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(helpersUsuarios.existeUsuarioById),
    validarCampos
],usuario.usuarioDesactivar)

router.post('/upload/:id',[
    validar.validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(helpersUsuarios.existeUsuarioById),
    validarCampos
],usuario.cargarImagen)

export default router