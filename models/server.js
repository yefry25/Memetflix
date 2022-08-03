import express from "express"
import cors from "cors"
import {dbConnection} from "../database/config.js"
import persona from "../routes/persona.js"
import comentario from "../routes/comentario.js"
import pelicula from "../routes/pelicula.js"
import actores from "../routes/actores.js"
import favoritos from "../routes/favoritos.js"
import fileUpload from "express-fileUpload"

class Server{
    constructor(){
        this.app=express()
        this.middleware()
        this.port=process.env.PORT
        this.conectarBd()
        this.routes()
    }

    routes(){
        this.app.use("/api/persona",persona)
        this.app.use("/api/comentario",comentario)
        this.app.use("/api/pelicula",pelicula)
        this.app.use("/api/actores",actores)
        this.app.use("/api/favoritos",favoritos)
        
    }

    middleware(){
        this.app.use(express.json())
        this.app.use(cors())
        this.app.use(fileUpload({
            useTempFiles:true,
            tempFileDir:'/tmp/',
            createParentPath:true
        }));
    }
    
    async conectarBd(){
        await dbConnection()
    }

    escuchar(){
        this.app.listen(this.port,()=>{
            console.log(`servidor escuchando en el puerto ${this.port}`);
        })
    }
}

export {Server}