<template>
  <div class="wrapper">
      <Modal />
      <div class="header">
          <div class="users-count"><span class="count">{{ users.count }}</span> Users found</div>
          <div class="search">
            <input type="text" v-model="search.value" @input="searchUsers" placeholder="Введите имя пользователя">
          </div>
          <div class="filter">
              <select v-model="filter.value" @change="filterUsers">
                  <option value="desc">Больше репозиториев</option>
                  <option value="asc">Меньше репозиториев</option>
              </select>
          </div>
      </div>
    <div class="users">
        <div class="user" v-for="(user, userIndex) in users.array" :key="user.id" @click="moreInfo(user.login)">
            <div class="user-head">
                <div class="user-logo">
                    <img :src="user.avatar_url">
                </div>
                <div class="user-login">
                    {{ user.login }}
                </div>
            </div>
            <div class="user-content">

            </div>
        </div>
        <div class="search-wait" v-show="search.wait">Идет поиск...</div>
        <div class="no-results" v-show="users.array.length <= 0 && !search.wait">Ничего не найдено :(</div>
    </div>
    <div class="pagination" v-show="pages.static > 1 && !search.wait && users.array.length > 0">
        <div class="page" v-for="(page, pageIndex) in pagesCount" :key="pageIndex" :class="{ current: pages.current === pageIndex + 1 }" @click="changePage(pageIndex + 1)">
            {{ page }}
        </div>
        <div class="sepparate" v-show="pages.count < pages.static">...</div>
        <div class="page" v-show="pages.count < pages.static" :class="{ current: pages.current === pages.static }" @click="changePage(pages.static)">{{ pages.static }}</div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions, mapMutations, mapState} from 'vuex';
import Modal from '@/components/Modal';

export default {
    name: "Main", 
    components: {
        Modal,
    },
    mounted() {
        //this.getUsers();
    },
    computed: {
        ...mapState([
            'users',
            'search',
            'filter',
            'pages',
        ]),

        ...mapGetters([
            'pagesCount',
        ]),
    },
    methods: {
        ...mapMutations([
            'clearUsers',
        ]),

        ...mapActions([
            'getUsers',
            'getFilteredUsers',
            'getPaginatedUsers',
            'getInfoUser',
        ]),

        searchUsers() {
            if (!this.search.wait && this.search.value) {
                this.search.wait = true;
                this.clearUsers();
                setTimeout(()=> {
                    if (this.search.value)
                        this.getUsers({ value: this.search.value });
                }, 2000);
            } else
                this.clearUsers();
        },

        filterUsers() {
            if (this.search.value) {
                this.getFilteredUsers({
                    value: this.search.value,
                    type: this.filter.value,
                });  
            }
        },

        async changePage(pageIndex) {
            if (this.pages.current !== pageIndex) {
                await this.getPaginatedUsers({
                    value: this.search.value,
                    page: pageIndex,
                    type: this.filter.value,
                });

                window.scrollTo(pageXOffset, 0);
            }
        },

        moreInfo(login) {
            this.getInfoUser({
                login: login,
            });
        }
    }
}
</script>

<style lang="scss" scoped>
    .wrapper {
        max-width: 1140px;
        width: 100%; 
        margin: 0 auto;

        .header {
            display: grid;
            grid-gap: 10px;
            grid-template-columns: auto 1fr auto;
            margin-bottom: 30px;

            .users-count {
                font-weight: bolder;
                margin-top: 3px;

                .count {
                    font-size: 20px;
                }
            }

            .search {
                input {
                    width: 100%;
                    box-sizing: border-box;
                    padding: 6px 10px;
                    border-radius: 4px;
                    font-size: 15px;
                    border: 1px solid rgba(0,0,0,0.2);
                }
            }

            .filter {
                select {
                    padding: 6px 10px;
                    background: #e3e3e3;
                    border-radius: 4px;
                    border: 1px solid rgba(0,0,0,0.2);
                }
            }
        }

        .users {
            width: 100%;

            .user {
                border-bottom: 1px solid rgba(0,0,0,0.15);
                padding: 15px 0;

                &:first-child {
                    border-top: 1px solid rgba(0,0,0,0.15);
                }

                .user-head {
                    display: flex;
                    align-items: center;

                    .user-logo {
                        margin-right: 10px;
                        img {
                            width: 30px;
                            height: 30px;
                            border-radius: 50%;
                        }
                    }

                    .user-login {
                        font-weight: bolder;
                    }
                }
            }
        }

        .pagination {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            margin: 30px 0;

            .page {
                padding: 8px 13px;
                border-radius: 5px;
                font-size: 15px;
                cursor: pointer;
                margin-right: 5px;

                &:hover {
                    background: darkorange;
                }

                &.current {
                    background: darkorange;
                    cursor: default;
                }
            }

            .sepparate {
                padding: 8px 13px;
                margin-right: 5px;
            }
        }
    }
</style>