import Actor from "../models/actores.js"

const actor = {
    actoresPost : async (req, res) => {
        const { nombre, biografia, foto } = req.body
    
        try {
            const actores = new Actor({ nombre, biografia, foto })
    
            if (!actores) {
                return res.status(400).json({ msg: "No se pudo registrar el actor" })
            }
            actores.save()
            res.json({ actores })
    
        } catch (error) {
            return res.status(500).json({ msg: "Hable con el WebMaster" })
        }
    },
    
    actoresGet : async (req, res) => {
        try {
            const actores = await Actor.find();
    
            if (!actores) {
                return res.status(400).json({ msg: "No se encontro los actores buscados" })
            }
            res.json({ actores })
    
        } catch (error) {
            return res.status(500).json({ msg: "Hable con el WebMaster" })
        }
    },
    
    actoresGetId : async (req, res) => {
        const { id } = req.body
        try{
            const actores = await Actor.findById(id);
            if(!actores){
                return res.status(400).json({msg:"No se encontro lo buscado"})
            }
            res.json({ actores })
    
        }catch(error){
            return res.status(500).json({ msg: "Hable con el WebMaster"})
        }
    },

    actoresPut : async (req, res) => {
        const{id}=req.params
        const{_id,createAt, ...resto}=req.body;
    
        try{
    
            const modificar= await Actor.findByIdAndUpdate(id,resto);
    
            if(!modificar){
                return res.status(500).json({msg:"No se pudo actualizar la informacion del actor"})
            }
            res.json({
                modificar
            })
    
        }catch(error){
            return res.status(500).json({msg:"Hable con el WebMaster"})
        }
    }
}

export default actor