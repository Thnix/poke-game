<template>
    <div class="main-container">
        <header>
            <h1>¿Quién es este pokemón?</h1>
        </header>

        <PokemonImage 
            v-if="pokemon"
            :pokemonId="pokemon.id"
            :showNewGame="showNewGame"
        />

        <div class="options-container">
            <button 
                v-for="option in pokemonOptions" 
                :key="option.id"
                @click="pokemonSelected(option.id)"
                class="button-class"
            >
                {{ option.name }}
            </button>
        </div>

        <div class="result-container">
            <template v-if="showNewGame">
                <p 
                    class="result-class"
                    :style="{ color: resultColor }"
                >
                    {{ gameResultMessage }}
                </p>
                <button 
                    @click="newGame" 
                    class="button-class"
                >
                    Nuevo juego
                </button>
            </template>
        </div>
        


        <footer>Desarrollado por Anthony Martínez</footer>
    </div>
</template>

<script>
    import { defineComponent, ref, onMounted } from "vue";
    import PokemonImage from '../components/PokemonImage.vue'
    import pokemonRepository from '../api/pokemonRepository'

    //Component
    export default defineComponent({
        name: 'PokemonPage',
        components: {
            PokemonImage,
        },
        props: {},
        emits: [],

        //Setup
        setup() {
            const pokemonOptions = ref([]);
            const showNewGame = ref(false);
            const gameResultMessage = ref('');
            const pokemon = ref({});
            const resultColor = ref('');

            //Función para obtener las opciones disponibles de pokemón
            const getRamdonOptions = async () => {
                const response = await pokemonRepository.getPokemonOptions();

                if(response.length <= 0){
                    return;
                }

                pokemonOptions.value = response;
                pokemon.value = pokemonOptions.value[Math.floor(Math.random() * (4 - 1) + 1)];
            }

            //Función para comprobar el pokemón seleccionado
            const pokemonSelected = (optionId) => {
                showNewGame.value = !showNewGame.value;
                gameResultMessage.value = optionId === pokemon.value.id ? `Correcto, ${pokemon.value.name}` : `Oops, era ${pokemon.value.name}`;
                resultColor.value = optionId === pokemon.value.id ? 'green' : 'red';
            }

            //Función para reiniciar el juego
            const newGame = async () => {
                showNewGame.value = !showNewGame.value;
                await getRamdonOptions();
            }

            //Obtener las opciones cuando cargue la página
            onMounted(async () => {
                await getRamdonOptions();
            })

            //Retornando los valores necesarios para utilizar en el template
            return {
                pokemonOptions,
                showNewGame,
                gameResultMessage,
                pokemon,
                resultColor,

                pokemonSelected,
                newGame
            }
        }
    })
</script>

<style scoped>
    .main-container {
        display: flex;
        width: 100%;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        gap: 1rem;
        height: 100vh;
    }

    .options-container {
        margin-top:2rem;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        width: 30%;
    }

    .button-class {
        padding: 0.3rem;
        font-weight: bold;
        color: black;
        border-radius: 10px;
        background-color: white;
    }

    .button-class:active{
        transform: scale(1.05);
    }

    .button-class:hover {
        cursor: pointer;
    }

    .result-container {
        margin-top: 1rem;
        height: 100px;
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
    }

    .result-class {
        margin: 0;
        font-size: 2rem;
    }

    footer {
        align-self: flex-end; 
        justify-self: flex-end; 
        margin-right: 1rem; 
    }

</style>