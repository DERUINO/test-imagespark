import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        users: {
            array: [],
            count: 0,
            current: {
            },
        },
        search: {
            value: '',
            wait: false,
        },
        filter: {
            value: 'desc',
        },
        pages: {
            count: 1,
            current: 1,
            static: 1,
            array: [],
        },
        modal: {
            visible: false,
        }
    },
    mutations: {
        updateUsers(state, users) {
            state.users.array = users.items;
            state.users.count = users.total_count;
            state.pages.current = 1;
            state.search.wait = false;
        },

        updateFilteredUsers(state, users) {
            state.users.array = users.items;
            state.pages.current = 1;
        },

        updatePaginatedUsers(state, res) {
            state.users.array = res.data.items;
            state.pages.current = res.page;
        },

        updateInfoUser(state, res) {
            state.users.current = res;
            state.modal.visible = true;
        },

        closeModal(state) {
            state.users.current = {};
            state.modal.visible = false;
        },

        clearUsers(state) {
            state.users.array = [];
        }
    },
    getters: {
        pagesCount(state) {
            const count = Math.floor((state.users.count / 10) + 1);
            
            state.users.count >= 1000 ? state.pages.static = 100 : state.pages.static = count;

            if (count > 10)
                return state.pages.count = 10;
            else {
                return state.pages.count = count;
            }
        },
    },
    actions: {
        async getUsers(ctx, req) {
            const url = `https://api.github.com/search/users?q=${req.value}+sort:repositories-desc+${req.value}in:login&per_page=10`;

            await fetch(url)
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    console.log(data, url);
                    ctx.commit('updateUsers', data);
                })
        },

        async getFilteredUsers(ctx, req) {
            const url = `https://api.github.com/search/users?q=${req.value}+sort:repositories-${req.type}+${req.value}in:login&per_page=10`;

            await fetch(url)
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    console.log(data, url);
                    ctx.commit('updateFilteredUsers', data);
                })
        },

        async getPaginatedUsers(ctx, req) {
            const url = `https://api.github.com/search/users?q=${req.value}+sort:repositories-${req.type}+${req.value}in:login&page=${req.page}&per_page=10`;

            await fetch(url)
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    console.log(data, url);
                    ctx.commit('updatePaginatedUsers', {data: data, page: req.page});
                })
        },

        async getInfoUser(ctx, req) {
            const url = `https://api.github.com/users/${req.login}`;

            await fetch(url)
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    console.log(data, url);
                    ctx.commit('updateInfoUser', data);
                })
        },
    }
})