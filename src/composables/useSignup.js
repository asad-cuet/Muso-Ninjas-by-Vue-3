import { projectAuth } from '@/firebase/config.js'
import {ref} from 'vue'

const error=ref(null)
const isPending=ref(false) 

const signup=async (email,password,displayName) => {
      error.value=null
      isPending.value=true
       try
       {
            
            const res=await projectAuth.createUserWithEmailAndPassword(email,password)
            if(!res)
            {
                 throw new Error('Could not complete the signup')
            }
            
            await res.user.updateProfile({displayName})
            console.log(res.user)
            isPending.value=false
            return res
       }
       catch(err)
       {
         error.value=err.message
         console.log(error.value)
         isPending.value=false
       }
       
}
const useSignup=()=> {
      
      return {
            error,signup,isPending
      }
}
export default useSignup