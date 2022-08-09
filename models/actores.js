import  mongoose  from "mongoose";

const actoresSchema = new mongoose.Schema({
    nombre:{
        type:String,
        required:true
    },
    biografia:{
        type:String,
        minLength:8,
        required:true
    },
    foto:{
        type:String,
        default:""
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

export default mongoose.model('Actor',actoresSchema)

