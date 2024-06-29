import { api } from '@/boot/axiosConfig'

export default({

    async getPokemonOptions() {
        try
        {
            const pokemonOptions = [];
            const selectedPokemonIds = new Set();

            const maxNumber = 200;
            const minNumber = 1;
            
            while(pokemonOptions.length < 4){
                const randomInt = Math.floor(Math.random() * (maxNumber - minNumber) + minNumber);
                const pokemonToAdd = await api.get(`${randomInt}`);

                if(!selectedPokemonIds.has(randomInt)){
                    pokemonOptions.push(pokemonToAdd.data);
                    selectedPokemonIds.add(randomInt);
                }
            };

            return pokemonOptions;
        }
        catch(error){
            console.log(error);
            return [];
        }
    }
})