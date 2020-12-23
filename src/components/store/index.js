import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

export default new Vuex.Store({

  state: {
    contacts: [],
    token: localStorage.getItem('token') || '',
    status:'',
    user: {}
  },

  mutations:{
    authSuccess(state,token){
      state.token=token;
      state.status='success';
    },
    
    authError(state){
      state.token='';
      state.status='error';
    },
    authLogout(state){
      state.token=''
    },
    setContacts(state,contacts){
        state.contacts=contacts;
    },
    setUsername(state, name) {
      state.user.name = name
    }
  },

  actions: {
      fetchContacts(context){
        axios.get('/contact')
          .then(response=>{
            context.commit('setContacts',response.data.data)
            // this.contacts=response.data.data;
          })

      },
      login(context, payload) {

        return new Promise((resolve,reject)=>{

          axios.post('/login', payload)
            .then((response) => {
              const accessToken = response.data.token;
              console.log(accessToken);
              const name = response.data.name
              context.commit('authSuccess', accessToken)
              context.commit('setUsername', name)
              localStorage.setItem('token', accessToken);
              localStorage.setItem('username', name);
              axios.defaults.headers.common['Authorization'] = "Bearer " + accessToken;
              resolve(response);
            })
            .catch((error) => {
              localStorage.removeItem('token');
              context.commit('authError')
              console.log(error);
              reject(error);
            })

        })
         
      },
      gpexlogin(context, payload) {

        return new Promise((resolve,reject)=>{

          axios.post('/gpexlogin', payload)
            .then((response) => {
              const accessToken = response.data.token;
              console.log(accessToken);
              const name = response.data.name
              context.commit('authSuccess', accessToken)
              context.commit('setUsername', name)
              localStorage.setItem('token', accessToken);
              localStorage.setItem('username', name);
              axios.defaults.headers.common['Authorization'] = "Bearer " + accessToken;
              resolve(response);
            })
            .catch((error) => {
              localStorage.removeItem('token');
              context.commit('authError')
              console.log(error);
              reject(error);
            })

        })
         
      },

      logout(context){
        return new Promise((resolve,reject)=>{
            context.commit('authLogout')
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            delete axios.defaults.headers.common['Authorization'] ;

            resolve();


        })
      }

  },


  getters: {
    isAuthenticated: state => !!state.token,
    authStatus: state => state.status,
    menus:(state,getters)=>{
      if(getters.isAuthenticated){
        return [{
          name: "Logout", route: "Logout"
        }]
      }
      return [
        { name: "Signup", route: "Signup" },
        { name: "Login", route: "Login" },
        { name: "Form1", route: "form1" },
        { name: "form", route: "form" },
        { name: "gpexlogin", route: "gpexlogin" },
      ];
    }
  }




})