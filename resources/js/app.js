/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

import VueChatScroll from 'vue-chat-scroll'
Vue.use(VueChatScroll);

import Vue from 'vue';
import Toaster from 'v-toaster'
import 'v-toaster/dist/v-toaster.css'
Vue.use(Toaster, {timeout: 3000})

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i);
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default));

Vue.component('message', require('./components/MessageComponent.vue').default);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: '#app',
    data: {
        message: '',
        typing: false,
        numbOfUsers: 0,
        chat: {
            messages: [],
            users: [],
            colors: [],
            time: [],
        }
    },
    watch: {
        message() {
            Echo.private('chat')
                .whisper('typing', {
                    name: this.message,
                })
        }
    },
    methods: {
        send() {
            if(this.message.length > 0) {
                this.chat.messages.push(this.message);
                this.chat.colors.push('success');
                this.chat.users.push('You');
                this.chat.time.push(this.getTime());

                axios.post(`/send`, {
                    message: this.message,
                    chat: this.chat
                })
                .then(res => {
                    console.log(res);
                    this.message = '';
                })
                .catch(err => {
                    console.log(err);
                })
            }
        },
        getTime() {
            let time = new Date();
            return time.getHours()+':'+time.getMinutes(); 
        },
        getOldMessages() {
            axios.post(`/get-old-messages`)
            .then(res => {
                console.log(res);
                if (res.data !== '') {
                    this.chat = res.data
                }
            })
            .catch(err => {
                console.log(err);
            })
        },
        clear() {
            axios.post(`/clear-messages`)
            .then(res => {
                window.location.reload();
            })
        },
    },
    mounted() {
        this.getOldMessages();

        Echo.private(`chat`)
            .listen('ChatEvent', (e) => {
                this.chat.messages.push(e.message);
                this.chat.users.push(e.user);
                this.chat.colors.push('info');
                this.chat.time.push(this.getTime());

                axios.post(`/save-to-session`, {
                    chat: this.chat
                })
                .then(res => {
                    console.log(res);
                })
                .catch(err => {
                    console.log(err);
                })
            })
            .listenForWhisper('typing', (e) => {
                if (e.name !== '') {
                    this.typing = true;
                } else {
                    this.typing = false;
                }
            })

        Echo.join(`chat`)
            .here((users) => {
                this.numbOfUsers = users.length;
                console.log(users);
            })
            .joining((user) => {
                this.numbOfUsers += 1;
                this.$toaster.success(user.name+' joigned the room')
            })
            .leaving((user) => {
                this.numbOfUsers -= 1;
                this.$toaster.warning(user.name+' left the room')
            })
    }
});
