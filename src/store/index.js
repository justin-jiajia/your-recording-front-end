import { reactive } from "vue";
export default reactive({
    tittle: '',
    token: localStorage.getItem('token') || ''
});