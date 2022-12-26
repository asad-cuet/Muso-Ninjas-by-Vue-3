<template>
    <div class="add-song">

    <button v-if="!showForm" @click="showForm=true">Add Song</button>

    <form v-if="showForm" @submit.prevent="handleSubmit">

    <h4>Add a New Song</h4>

    <input type="text" placeholder="Song Title" required v-model="title">
    <input type="text" placeholder="Artist" required v-model="artist">

    <button v-if="!isPending">Add</button>
    <button v-if="isPending" disabled>Adding</button>

    </form>
        
    </div>
</template>
<script>
import useDocument from '@/composables/useDocument' 
import {ref} from 'vue'
export default {
    name:'AddSong',
    props:['playlist'],
    setup(props) {
        const title=ref(null)
        const artist=ref(null)
        const showForm=ref(false)
        const isPending=ref(false)

        const {updateDoc}=useDocument('playlists',props.playlist.id)

        const handleSubmit=async()=>{
            isPending.value=true
            const newSong={
                title: title.value,
                artist: artist.value,
                id:Math.floor(Math.random()*1000000)
            }
            console.log(newSong)
            await updateDoc({
                songs:[...props.playlist.songs,newSong]
            })
            title.value=null
            artist.value=null
            isPending.value=false

        }

        return {
            title,artist,showForm,handleSubmit,isPending
        }

    }

}
</script>

<style scoped>

.add-song {
    text-align: center;
    margin-top: 40px;
}

from {
    max-width: 100%;
    text-align: left;
}

</style>
