import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({
    email:{  
      type:String,
      maxLength:25,
      required: true 
    },
    password:{
        type:String,
        required: true,
        minLength:8
    },
    nombre:{
        type:String,
        maxLength:25,
        required: true
    },
    apellido:{
        type:String,
        maxLength:25,
        required: true
    },
    edad:{
        type:Number,
        default:0
    },
    alias:{
        type:String,
        maxLength:8,
        default:"anonymous"    
    },
    foto:{
        type:String,
        default:""
    },
    estado:{
        type:Number,
        default:1
    },
    rol:{
        type:String,
        required:true
    },
    descripcion:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
})

export default mongoose.model('Usuario',usuarioSchema)