const hostBaseUri = (typeof window === 'undefined') ? 'http://localhost:8080' : window.location.origin
export default {
    items: [
        // // {
        // //     name: 'Dashboard',
        // //     url: '/dashboard',
        // //     icon: 'icon-speedometer',
        // //     badge: {
        // //         variant: 'info',
        // //         text: 'Stats'
        // //     }
        // // },
        // {
        //     name: 'Events',
        //     url: '/events',
        //     icon: 'icon-list'
        // },
        {
            name: 'Таблиця діти',
            url: '/sensor-records',
            icon: 'icon-list'
        }
        // {
        //     name: 'Configuration',
        //     url: '/config-form',
        //     icon: 'icon-settings'
        // },
        // {
        //     name: 'Documentation',
        //     url: '/development',
        //     icon: 'icon-notebook',
        //     children: [
        //         {
        //             name: 'About',
        //             url: '/about',
        //             icon: 'icon-info'
        //         },
        //         {
        //             name: 'Release Notes',
        //             url: '/release-notes',
        //             icon: 'icon-note'
        //         },
        //         {
        //             name: 'Getting Started',
        //             url: '/getting-started',
        //             icon: 'icon-book-open'
        //         },
        //         {
        //                 name: 'Development',
        //                 url: '/development',
        //                 icon: 'icon-settings'
        //         },
        //         {
        //                 name: 'Android API',
        //                 target: '_blank',
        //                 url: `${hostBaseUri}/private/sdk_api/android/docs/index.html`,
        //                 icon: 'icon-book-open'
        //         },
        //         {
        //                 name: 'iOS API',
        //                 target: '_blank',
        //                 url: `${hostBaseUri}/private/sdk_api/ios/docs/index.html`,
        //                 icon: 'icon-book-open'
        //         },
        //         {
        //                 name: 'REST API',
        //                 target: '_blank',
        //                 url: `${hostBaseUri}/private/rest_api/index.html`,
        //                 icon: 'icon-book-open'
        //         }
        //     ]
        // },
        // {
        //     name: 'Support',
        //     url: '/support',
        //     icon: 'icon-support'
        // }
    ]
}
