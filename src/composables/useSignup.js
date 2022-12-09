import { projectAuth } from '../firebase/config.js'
import {ref} from 'vue'

const error=ref(null)
const signup=async (email,password,name) => {
       try
       {
            error.value=null
            const res=await projectAuth.createUserWithEmailAndPassword(email,password)
            if(!res)
            {
                 throw new Error('Could not complete the signup')
            }
            
            await res.user.updateProfile({name})
            console.log(res.user)
            return res
       }
       catch(err)
       {
         error.value=err.message
         console.log(error.value)
       }
       
}
const useSignup=()=> {
      
      return {
            error,signup
      }
}
export default useSignup