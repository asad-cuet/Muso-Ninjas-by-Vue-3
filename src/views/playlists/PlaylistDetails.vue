<template>
    <div class="error">{{error}}</div>
    <div v-if="playlist" class="playlist-details">

        <div class="playlist-info">
            <div class="cover">
                <img :src="playlist.coverUrl" alt="">
            </div>
            <h2>{{playlist.title}}</h2>
            <p class="username">Created By {{playlist.userName}}</p>
            <p class="description">{{playlist.description}}</p>
            <button v-if="ownership && !isDeleting" @click="handleDelete">Delete Playlist</button>
            <button @click="handleDelete" v-if="ownership && isDeleting" disabled>Deleting</button>
        </div>

        <div class="song-list">
            <div v-if="!playlist.songs.length">No songs have been added to this playlist</div>
            <div v-for="song in playlist.songs" :key="song.id" class="single-song">
                <div class="details">
                        <h3>{{ song.title }}</h3>
                        <p>{{ song.artist }}</p>
                </div>
                <button v-if="ownership" @click="handleClick(song.id)">Delete</button>
            </div>
            <AddSong v-if="ownership" :playlist="playlist"/>
        </div>
    
    </div>
</template>
  
  <script>
  import AddSong from '@/components/AddSong'
  import useDocument from '@/composables/useDocument'
  import getDocument from '@/composables/getDocument'
  import useStorage from '@/composables/useStorage'
  import getUser from '@/composables/getUser'
  import {computed,ref} from 'vue'
  import {useRouter} from 'vue-router'
  export default {
    name: 'HomeView',
    props:['id'],
    setup(props)
    {
        const {user}=getUser()
        const router=useRouter()
        const {error,document:playlist}=getDocument('playlists',props.id)
        const {deleteDoc,updateDoc}=useDocument('playlists',props.id)
        const {deleteImage}=useStorage()
        const isDeleting=ref(false)

        const ownership=computed(()=> {
            return playlist.value && user.value && user.value.uid==playlist.value.userId
        })

        const handleDelete=async()=>
        {
            isDeleting.value=true
            await deleteImage(playlist.value.filePath)
            await deleteDoc()
            router.push({name:'home'})
            
        }


        const handleClick=async(id)=> {
            const songs=playlist.value.songs.filter((song)=> song.id != id ) 
            await updateDoc({songs})
        }

        return {
            error,
            playlist,
            ownership,
            handleDelete,
            isDeleting,
            handleClick
        }

    },
    components: {
        AddSong
    }
  
  }

  </script>

<style scoped>
.playlist-details {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap:80px;
}
.cover {
    overflow:hidden;
    border-radius: 20px;
    position: relative;
    padding: 160px;
}

.cover img {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    min-width: 100%;
    min-height: 100%;
    max-width: 200%;
    max-height: 200%;
}
.playlist-info {
    text-align: center;
}

.playlist-info h2 {
    text-transform: capitalize;
    font-size: 28px;
    margin-top: 20px;
}
.playlist-info p {
    margin-bottom: 20px;
}
.username {
    color: #999;
}
.description {
    text-align: left;
}

.single-song {
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px dashed var(--secondary);
    margin-bottom: 20px;
}

</style>
  