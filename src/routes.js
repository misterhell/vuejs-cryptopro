import CheckExtension from './components/CheckExtension.vue'
import CheckExtensionOnClick from './components/CheckExtensionOnClick.vue'
import CertsList from './components/CertsList.vue'
import FrendlyDate from './components/FrendlyDate.vue'

import Err from './components/Err.vue'
import HelloWorld from './components/HelloWorld'

const routes = [
    {
        path: '/',
        component: HelloWorld,
        name: 'Главная'
    },
    {
        path: '/check',
        component: CheckExtension,
        name: 'Проверка на работу плагина'
    },
    {
        path: '/check-click',
        component: CheckExtensionOnClick,
        name: 'Проверка на работу плагина по клику'
    },
    {
        path: '/certs',
        component: CertsList,
        name: 'certsList'
    },

    {
        path: '/frendly-date',
        component: FrendlyDate,
        name: 'FrendlyDate'
    },
    // { path: '/bar', component: Bar }

    { path: '*', component: Err, name: 'err' }
]



export default routes