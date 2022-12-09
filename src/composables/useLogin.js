import { projectAuth } from '../firebase/config.js'
import {ref} from 'vue'

const error=ref(null)
const login=async (email,password) => {
       try
       {
            error.value=null
            const res=await projectAuth.signInWithEmailAndPassword(email,password)
            if(!res)
            {
                 throw new Error('Could not complete the Login')
            }
            return res
       }
       catch(err)
       {
         error.value=err.message
         console.log(error.value)
       }
       
}
const useLogin=()=> {
      
      return {
            error,login
      }
}
export default useLogin