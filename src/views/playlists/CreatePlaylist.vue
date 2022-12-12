<template>

<div>
 
    <form @submit.prevent="handleSubmit">
        <input type="text" placeHolder="Title" v-model="title">

        <input type="textarea" placeholder="Description" v-model="description">

        <label for="">Upload Playlst Cover Image</label>
        <div class="error">{{fileError}}</div>
        <input type="file" @change="handleChange">

        <button class="btn">Create</button>

    </form>
</div>

</template>

<script>
import {ref} from 'vue'
export default {
    setup()
    {
        const title=ref('')
        const description=ref('')
        const file=ref(null)
        const fileError=ref(null)

        const types=['image/png','image/jpeg','image/jpg']

        const handleSubmit=()=> 
        {
            if(file.value)
            {
                console.log(title.value,description.value,file.value)
            }
        }

        const handleChange= (e) =>
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

        return {
                  title,
                  description,
                  handleSubmit,
                  handleChange,
                  fileError
        }
    }
}
</script>

