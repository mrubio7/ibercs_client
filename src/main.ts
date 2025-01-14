import { createApp } from 'vue'
import { QuillEditor } from '@vueup/vue-quill'
import './style.css'
import '../node_modules/quill/dist/quill.snow.css'
import App from './App.vue'
import router from './router';

const app = createApp(App);

app.component('QuillEditor', QuillEditor)

app.use(router);

app.mount('#app')