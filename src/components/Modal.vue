<template>
  <div class="modal-wrapper" v-show="modal.visible">
      <div class="modal-bg" @click="closeModal"></div>
      <div class="modal-content">
          <div class="content-logo">
              <img :src="users.current.avatar_url">
          </div>
          <div class="content-name">{{ users.current.name }}</div>
          <div class="content-login">{{ users.current.login }}</div>
          <div class="content-bio">{{ users.current.bio }}</div>
          <div class="content-about">
              <div class="company">{{ users.current.company }}</div>
              <div class="location">{{ users.current.location }}</div>
              <div class="site"><a :href="users.current.blog">{{ users.current.blog }}</a></div>
          </div>
      </div>
  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex';

export default {
    name: "Modal",
    computed: {
        ...mapState([
            'users',
            'modal'
        ]),
    },
    data() {
        return {

        }
    },
    methods: {
        ...mapMutations([
            'closeModal',
        ])
    }
}
</script>

<style scoped lang="scss">
    .modal-wrapper {
        width: 100%;
        height: 100%;
        min-height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 999;
        display: flex;
        

        .modal-bg {
            width: 100%;
            height: 100%;
            min-height: 100vh;
            position: fixed;
            top: 0;
            left: 0;
            background: rgba(0,0,0,0.5);
            z-index: 1;
        }

        .modal-content {
            position: relative;
            z-index: 2;
            margin: auto;
            background: white;
            border-radius: 5px;
            padding: 15px;
            display: inline-block;
            vertical-align: top;
            max-width: 250px;
            width: 100%;

            .content-logo {
                margin-bottom: 15px;
                max-width: 250px;

                img {
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                }
            }

            .content-login {
                font-size: 20px;
                font-weight: 300;
                color: gray;
                margin-bottom: 15px;
            }

            .content-name {
                font-size: 24px;
                font-weight: 800;
            }

            .content-bio {
                display: -webkit-box;
                -webkit-line-clamp: 3;
                -webkit-box-orient: vertical;  
                overflow: hidden;
            }

            .content-about {
                margin-top: 15px;
                .company,
                .site,
                .location {
                    font-size: 14px;
                }

                .site {
                    overflow: hidden;
                    white-space: nowrap;
                }
            }
        }
    }
</style>
