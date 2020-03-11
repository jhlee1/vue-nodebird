module.exports = {
    head: {
        title: 'Nodebird'
    },

    // vue.use로 연결하지 않는 이유 - nuxt는 각 페이지가 독림적으로 나뉘기 때문에 모든 페이지에 vue.use 코드가 들어가야함
    // 중복된 코드를 제거하기위해 nuxt.config.js에서 vuetify설정
    // 실제 node_modules/@nuxtjs/vuetify/lib/templates/plugin.js 를 열어보면 Vue.use(vuetify) 코드가 있는 것을 확인할 수 있
    modules: [
        '@nuxtjs/axios' // Ajax 처리를 위한 package
    ],
    devModules: [
        '@nuxtjs/vuetify'
    ],
    vuetify: {

    }


}


