import {ref} from 'vue'
import {projectStorage} from '@/firebase/config'
import getUser from '@/composables/getUser.js'


const {user} =getUser()

const useStorage=()=>
{
    const error=ref(null)
    const url=ref(null)
    const filePath=ref(null)

    const uploadImage=async(file)=>
    {
        filePath.value=`covers/${user.value.uid}/${file.name}`
        const storageREf=projectStorage.ref(filePath.value)

        try {
            const res= await storageREf.put(file)
            url.value=await res.ref.getDownloadURL()
        }
        catch(err) {
            console.log(err.message)
            error.value=err.message
        }
    }


    return {
        error,url,filePath,uploadImage
    }
}

export default useStorage