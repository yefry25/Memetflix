import {Router} from "express"
import {comentarioPost,comentarioGet} from "../controllers/comentario.js"
import { validarCampos } from "../middlewares/middleware.js"
import { check } from "express-validator"
import {validarJWT} from "../middlewares/validar.js"

const router=new Router()

router.post('/',[
    validarJWT,
    check('Comment','no puede estar vacio').not().isEmpty(),
    check('Comment','debe ser menor a 6').isLength({min:6}),
    check('idUsuario').isMongoId(),
    check('idPelicula').isMongoId(),
    validarCampos
],comentarioPost)


router.get('/get',[
    validarJWT,
    validarCampos
],comentarioGet)

export default router