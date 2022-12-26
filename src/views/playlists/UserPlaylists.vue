<template>
    <div class="user-playlists">
            <h2>My Playlists</h2>
            <div v-if="playlists">
                    <ListView :playlists="playlists"/>
            </div>
            <router-link :to="{name:'createPlaylist'}" class="btn">Creat a new playlist</router-link>
    </div>
</template>
<script>
import ListView from '@/components/ListView'
import getUser from '@/composables/getUser'
import getCollection from '@/composables/getCollection'
export default {
    name:'UserPlaylists',
    components: {ListView},
    setup() {
            const {user}=getUser()
            const {documents:playlists}=getCollection(
                'playlists',
                ['userId','==',user.value.uid]
            )

            return {
                playlists
            }
    }


}
</script>