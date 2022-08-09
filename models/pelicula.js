import mongoose from "mongoose";

const PeliculaSchema = new mongoose.Schema({
    tituloOriginal: {
        type: String,
        required: true
    },
    tituloEspanol: {
        type: String,
        required: true
    },
    fechaLanzamiento: {
        type: Date,
        required: true
    },
    genero: {
        type: String,
        required: true
    },
    calificacion: {
        type: Number,
        default: 0,

    },
    sinopsis: {
        type: String,
        minLength: 10,
        required: true
    },
    director: {
        type: String,
        required: true
    },
    escritor: {
        type: String,
        required: true
    },
    repartoPrincipal: [
        {
            act: {
                type: mongoose.Schema.ObjectId,
                ref: "Actor",
                required: true
            },
            personaje: { 
                type: String, required: true
            },
            rol: { 
                type: String, required: true
            },
        }
    ],
    estado: {
        type: String,
        required: true
    },
    idiomaOriginal: {
        type: String,
        required: true
    },
    presupuesto: {
        type: Number,
        default: 0
    },
    ingresos: {
        type: Number,
        default: 0
    },
    foto: {
        type: String,
        default: ""
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model('Pelicula', PeliculaSchema)