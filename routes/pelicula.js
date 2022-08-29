import {Router} from "express"
import pelicula from "../controllers/pelicula.js"
import { validarCampos } from "../middlewares/middleware.js"
import { check } from "express-validator"
import helpersPeliculas from "../helpers/pelicula.js"
import validarArchivo from "../middlewares/validar-archivo.js"
import validar from "../middlewares/validar.js"

const router=new Router()

router.post('/',[
    validar.validarJWT,
    check('tituloOriginal','el campo titulo Original no puede estar vacio').not().isEmpty(),
    check('tituloEspanol','el campo titulo en español no puede estar vacio').not().isEmpty(),
    check('fechaLanzamiento', 'el campo fecha de lanzamiento no puede estar vacio').not().isEmpty(),
    check('fechaLanzamiento','el campo debe ser formato fecha').isDate(),
    check('genero','el campo genero no puede estar vacio').not().isEmpty(),
    check('sinopsis','el campo sinopsis no puede estar vacio').not().isEmpty(),
    check('sinopsis','el campo sinopsis debe tener minimo 10 caracteres').isLength({min:10}),
    check('director','el campo director no puede estar vacio').not().isEmpty(),
    check('escritor','el campo escritor no puede estar vacio').not().isEmpty(),
    check('repartoPrincipal').custom(helpersPeliculas.existeActor),
    check('estado','el campo estado no puede estar vacio').not().isEmpty(),
    check('idiomaOriginal','el campo idioma original no puede estar vacio').not().isEmpty(),
    check('presupuesto','no puede estar vacio presupuesto').not().isEmpty(),
    check('ingresos','no puede estar vacio ingresos').not().isEmpty(),
    validarCampos
],pelicula.peliculaPost)

router.get('/get',pelicula.peliculaGet)

router.get('/ID',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(helpersPeliculas.existePeliculaById),
    validarCampos
],pelicula.peliculaGetId)

router.get('/Delete',[
    validar.validarJWT,
    check('tituloOriginal').not().isEmpty(),
    validarCampos
],pelicula.peliculaDelete)

router.get('/Nombre',[
    check('titulo').not().isEmpty(),
    validarCampos
],pelicula.peliculaGetNombre)

router.post('/actor',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(helpersPeliculas.existeActor),
    validarCampos
],pelicula.peliculaActores)

router.post('/upload/:id',[
    validar.validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(helpersPeliculas.existePeliculaById), 
    validarArchivo,
    validarCampos
],pelicula.cargarArchivo)

router.post('/uploadinary/:id',[
    validar.validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(helpersPeliculas.existePeliculaById), 
    validarArchivo,
    validarCampos
],pelicula.cargarArchivoCloud)

router.post('/uploadinary/poster/:id',[
    validar.validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(helpersPeliculas.existePeliculaById), 
    validarArchivo,
    validarCampos
],pelicula.cargarArchivoCloudPoster)

router.get('/mostrarImagen/:id',[
    validar.validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(helpersPeliculas.existePeliculaById), 
    validarCampos
],pelicula.mostrarImagenCloud)

router.put('/modificar/:id',[
    validar.validarJWT,
    check('tituloOriginal','el campo titulo Original no puede estar vacio').not().isEmpty(),
    check('tituloEspanol','el campo titulo en español no puede estar vacio').not().isEmpty(),
    check('fechaLanzamiento', 'el campo fecha de lanzamiento no puede estar vacio').not().isEmpty(),
    check('fechaLanzamiento','el campo debe ser formato fecha').isDate(),
    check('genero','el campo genero no puede estar vacio').not().isEmpty(),
    check('sinopsis','el campo sinopsis no puede estar vacio').not().isEmpty(),
    check('sinopsis','el campo sinopsis debe tener minimo 10 caracteres').isLength({min:10}),
    check('director','el campo director no puede estar vacio').not().isEmpty(),
    check('escritor','el campo escritor no puede estar vacio').not().isEmpty(),
    check('repartoPrincipal', 'No es un ID válido').isMongoId(),
    check('repartoPrincipal').custom(helpersPeliculas.existeActor),
    check('estado','el campo estado no puede estar vacio').not().isEmpty(),
    check('idiomaOriginal','el campo idioma original no puede estar vacio').not().isEmpty(),
    check('presupuesto','presupuesto no puede estar vacio').not().isEmpty(),
    check('ingresos','el campo ingresos no puede estar vacio').not().isEmpty(),
    validarCampos
], pelicula.peliculaPut)

export default router