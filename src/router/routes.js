const routes = [


    {
        path: '/',
        component: () =>
            import ('components/Login')
    },
    {
        path: '/menuPrincipal',
        component: () =>
            import ('layouts/Cabecera.vue'),
        children: [{
            path: '',
            component: () =>
                import ('components/MenuPrincipal')
        }]
    },

    {
        path: '/items/modulo/:modulo',
        component: () =>
            import ('layouts/Cabecera.vue'),
        children: [{
            path: '',
            component: () =>
                import ('components/Items')
        }]
    },
    {
        path: '/perfil/:id_usuario',
        component: () =>
            import ('layouts/Cabecera.vue'),
        children: [{
            path: '',
            component: () =>
                import ('components/Perfil')
        }]
    },
    {
        path: '/editarItem/:id_item',
        component: () =>
            import ('layouts/Cabecera.vue'),
        children: [{
            path: '',
            component: () =>
                import ('components/EditarItem')
        }]
    }

]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
    routes.push({
        path: '*',
        component: () =>
            import ('pages/Error404.vue')
    })
}

export default routes