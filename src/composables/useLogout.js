import { projectAuth } from '../firebase/config.js'
import {ref} from 'vue'

const error=ref(null)
const logout=async () => {
      error.value=null
       try
       {
            await projectAuth.signOut()
       }
       catch(err)
       {
         error.value=err.message
         console.log(error.value)
       }
       
}
const useLogout=()=> {
      
      return {
            error,logout
      }
}
export default useLogout