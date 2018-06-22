<template>
        <section id="header">
            <nav class="navbar navbar-expand-sm fixed-top navbar-light bg-light">
                <div class="container-fluid">
                    <ul class="navbar-nav float-left">
                        <li class="nav-item dropdown" v-if="email">
                                <a href="#" class="nav-link dropdown-toggle  text-primary" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <span class="mr-2">{{email}}</span><i class="far fa-user"></i>
                                </a>
                                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                                  <a class="dropdown-item" href="#" @click="logout">Logout</a>
                                </div>
                        </li>
                        <li class="nav-item" v-else>
                            <a href="#" class="nav-link" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i class="far fa-user"></i>
                            </a>
                        </li>
                    </ul>
                    <ul class="navbar-nav navbar-center">
                        <li class="nav-item">
                            <router-link to="/"><span class="float-right">Todo Fancy</span></router-link>
                        </li>
                    </ul>
                </div>
            </nav>
        </section>
</template>
<script>
/* eslint-disable */
import {eventBus} from '../main';

export default {
    name : 'TodoHeader',
    data(){
        return{
            email : null
        }
    },
    methods : {
        logout(){
            let token = localStorage.getItem('curr-token')
            if(token){
                localStorage.removeItem('curr-token')
                localStorage.removeItem('curr-email')
                this.email = null;
                FB.getLoginStatus(function(response){
                    if (response && response.status === 'connected'){
                        FB.logout(function(response){
                            console.log('logout: ', response)
                        });
                  }
                })
                this.$router.push({ name: 'Login' })
            }

        }
    },
    created(){
        this.email = localStorage.getItem('curr-email');
        eventBus.$on('triggerEmail', (email)=>{
            this.email = email
        })
    }
};
</script>

<style scoped>
.navbar-nav.navbar-center {
  font-family: "Pacifico", cursive;
  position: absolute;
  left: 50%;
  /* width: 100%; */
  transform: translatex(-50%);
  font-size: 25px;
  letter-spacing: 0.01em;
}
a.dropdown-item{
    color:#007bff;
}
a.dropdown-item:hover{
    background-color:#007bff;
    color: #fff
}
</style>


