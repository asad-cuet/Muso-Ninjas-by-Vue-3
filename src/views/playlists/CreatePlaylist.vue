<template>

<div>
 
    <form @submit.prevent="handleSubmit">
        <input type="text" placeHolder="Title" v-model="title">

        <input type="textarea" placeholder="Description" v-model="description">

        <label for="">Upload Playlst Cover Image</label>
        <div class="error">{{fileError}}</div>
        <input type="file" @change="handleChange">

        <button v-if="!isPending" class="btn">Create</button>
        <button v-else class="btn" disabled>Saving...</button>

    </form>
</div>

</template>

<script>
import {ref} from 'vue'
import useStorage from '@/composables/useStorage'
import useCollection from '@/composables/useCollection'
import getUser from '@/composables/getUser'
import {timestamp} from '@/firebase/config'

import {useRouter} from 'vue-router'

export default {
    setup()
    {
        const router=useRouter()

        const title=ref('')
        const description=ref('')
        const file=ref(null)
        const fileError=ref(null)

        const {user}=getUser()
        const {url,filePath,uploadImage}=useStorage()
        const {error,addDoc}=useCollection('playlists')   //playlists is table name

        const types=['image/png','image/jpeg','image/jpg']

        const isPending=ref(false)


        const handleChange= (e) =>  //verifying image
        {
            const selected = e.target.files[0]   //it's a object. Contain: type, size (KB), name(name.ext) etc
            
            if(selected && types.includes(selected.type))
            {
                file.value=selected
                fileError.value=null
                console.log(selected)

            }
            else
            {
                file.value=null
                fileError.value='Please select an image file'
            }
        }


        const handleSubmit=async()=> 
        {
            if(file.value)  //if image verified
            {
                isPending.value=true
                await uploadImage(file.value)                 //uploading image

                const res=await addDoc({              //adding playlist
                    title:title.value,
                    description:description.value,
                    userId:user.value.uid,
                    userName:user.value.displayName,
                    coverUrl:url.value,
                    filePath:filePath.value,
                    songs:[],
                    createdAt:timestamp()
                })

                isPending.value=false

                if(!error.value)
                {
                    console.log('Playlist Created')
                    console.log('Image Uploaded. Url=',url.value)
                    router.push({name:'playlistDetails',params:{id:res.id}})
                }
            }
        }



        return {
                  title,
                  description,
                  handleSubmit,
                  handleChange,
                  fileError,
                  isPending
        }
    }
}
</script>

