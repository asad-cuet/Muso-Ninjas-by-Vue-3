<template>
    <div class="navbar">
        <nav>
            <img src="@/assets/logo.png" alt="">
            <h1><router-link :to="{name:'home'}">Muso Ninjas</router-link></h1>

            <div class="links">
                <div v-if="user">
                    <router-link class="btn" :to="{name:'home'}">Home</router-link>
                    <router-link class="btn" :to="{name:'createPlaylist'}">Create Playlist</router-link>
                    <router-link class="btn" :to="{name:'userplaylists'}">My Playlists</router-link>

                    <span>Hi here,{{ user.displayName }}</span>

                    <button v-if="!isPending" @click="handleClick">Logout</button>
                    <button v-if="isPending" disabled>Logout</button>
                </div>
                <div v-else>
                    <router-link class="btn" :to="{name:'signup'}">Sign Up</router-link>
                    <router-link class="btn" :to="{name:'login'}">Login</router-link>  
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
import useLogout from '@/composables/useLogout'
import getUser from '@/composables/getUser'

import {useRouter} from 'vue-router'

export default {
    setup() 
    {
        const router=useRouter()
        const{ error,logout,isPending }=useLogout()
        const { user } =getUser()

        const handleClick = async() =>
        {
            console.log('log')
            await logout()
            if(!error.value)
            {
                console.log("User Logged Out")
                router.push({name:'login'})
            }
            else
            {
                console.log(error.value)
            }
        }
        return { 
            handleClick, 
            user,
            isPending 
        }

    }
}
</script>

<style scoped>
.navbar {
    padding: 16px 10px;
    margin-bottom:60px;
    background: white;
}

nav {
    display:flex;
    align-items:center;
    max-width: 1200px;
    margin: 0 auto;
}


nav h1 {
    margin-left: 20px;
}

nav .links {
    margin-left: auto;
}
nav .links a,button {
    margin-left: 16px;
    font-size: 14px;
}

nav img {
    max-height: 60px;
} 

span {
    font-size: 14px;
    display: inline-block;
    margin-left: 16px;
    padding-left: 16px;
    border-left: 1px solid #eee;
}
</style>