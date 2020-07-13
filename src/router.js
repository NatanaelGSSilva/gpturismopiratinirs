import Vue from 'vue'
import VueRouter from 'vue-router'
import FormLogin from './components/FormLogin.vue'
import StarterPage from './components/StarterPage.vue'

import TripList from './components/TripList.vue'
import TripCreate from './components/TripCreate.vue'
import TripHistory from './components/TripHistory.vue'
import TripPoint from './components/TripPoint.vue'
import TripConfig from './components/TripConfig.vue'
import GraficoExcursoes from './components/GraficoExcursoes.vue'

import Excursao from './components/Excursao.vue'
import Home from './components/Home.vue'



import Interesse from './components/Interesse.vue'

import Comentarios from './components/Comentarios.vue'
Vue.use(VueRouter)

export default new VueRouter({

    routes: [
        { path: '/', name: '/', component: StarterPage },
        { path: '/Home', name: 'Home', component: Home },

        { path: '/MenuViagem', name: 'MenuViagem', component: TripList },

        { path: '/CriarViagem', name: 'CriarViagem', component: TripCreate },
        { path: '/CriarViagem/:id', name: 'CriarViagemId', component: TripCreate },


        { path: '/Excursao/:id', name: 'Excursao', component: Excursao },
        { path: '/HistoricoViagem', name: 'HistoricoViagem', component: TripHistory },
        { path: '/login', component: FormLogin },
        { path: '/ConfigParadas', name: 'ConfigParadas', component: TripConfig },
        { path: '/Paradas/:id', name: 'MenuParadas', component: TripPoint },


        { path: '/ComentariosViagem', name: 'ComentariosViagem', component: Comentarios },
        { path: '/GraficoExcursoes', name: 'GraficoExcursoes', component: GraficoExcursoes },

        { path: '/InteresseViagem', name: 'InteresseViagem', component: Interesse },
    ]

})