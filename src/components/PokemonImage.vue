<template>
    <div class="pokemon-container">
        <img 
            :src="pokemonUrl" 
            :style="{ filter: showNewGame ? 'brightness(1)' : 'brightness(0)' }"
            class="fade-in"
        >
    </div>
</template>

<script>
import { defineComponent, ref, watchEffect } from "vue";

    export default defineComponent ({

        name: 'PokemonImage',
        props: {
            pokemonId: Number,
            showNewGame: Boolean
        },
        emits: [],

        setup(props) {
            const pokemonUrl = ref('');

            watchEffect(() => {
                pokemonUrl.value = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${ props.pokemonId }.svg`
            })

            return {
                pokemonUrl
            }
        }
    })

</script>

<style scoped>
    img {
        width: 150px;
        height: 150px;
        -webkit-user-drag: none;
    }

    .pokemon-container {
        margin-top: 2rem;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100vw;
        height: 150px
    }

    .fade-in {
        transition: filter 0.3s ease; 
    }
</style>