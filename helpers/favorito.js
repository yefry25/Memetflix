import Favorito from '../models/favoritos.js'

const helperFavorito= {

    favoritoRepetido: async (idPelicula) => {
        repetidos = await Favorito.find()
        if(repetidos){
            for (let i = 0; i < repetidos.length; i++) {
                const element = repetidos[i];
                if(element.idPelicula!=idPelicula){
                    throw new Error(`Ya has agregado esta pelicula como favorito`)
                }
            }
        }
    }
}

export default helperFavorito



