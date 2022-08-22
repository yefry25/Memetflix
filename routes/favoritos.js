import {Router} from "express"
import { check } from "express-validator"
import favorito from "../controllers/favoritos.js"
import { validarCampos } from "../middlewares/middleware.js"
import validar from "../middlewares/validar.js"
import helpersUsuarios from "../helpers/usuario.js"
import helpersPeliculas from "../helpers/pelicula.js"

const router=new Router()

router.post('/',[
    validar.validarJWT,
    check('idPelicula', 'No es un ID válido').isMongoId(),
    check('idPelicula').custom(helpersPeliculas.existePeliculaById),
    check('idUsuario', 'No es un ID válido').isMongoId(),
    check('idUsuario').custom(helpersUsuarios.existeUsuarioById),
    validarCampos
],favorito.favoritoPost)

router.get('/',[
    validar.validarJWT
],favorito.favoritoGet)

router.delete('/delete',[
    validar.validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(helpersPeliculas.existePeliculaById),
    validarCampos
],favorito.favoritoDelete)

export default router