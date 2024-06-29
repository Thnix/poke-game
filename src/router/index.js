import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'pokemonPage',
      component: () => import ('@/pages/PokemonPage.vue')
    },
  ]
})

export default router
