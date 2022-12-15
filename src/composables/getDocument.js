import {ref, watchEffect} from 'vue'
import {projectFirestore} from '@/firebase/config'

const getDocument=(collection,id)=>{
     const error=ref(null)
     const document=ref(null)

              let documentRef= projectFirestore.collection(collection).doc(id)
             const unsub = documentRef.onSnapshot((doc)=>{

                if(doc.data())  //if exist
                {
                    document.value={...doc.data(), id:doc.id}   //...doc.data() means all data of document
                    error.value=null
                }
                else
                {
                    error.value='That document does not exist'
                }

                  
                  
              },
              (err)=>{
                  error.value="Could not fetch the data"
                  console.log(err.message)
              })

              //problem: after logout and login again,previous snapshot alive,
              //but we want to re initialize snapshot when relog in.
              //for tis we took unsub
              watchEffect((onInvalidate)=>{
                  onInvalidate(()=>unsub())
              })
      

     return { error,document }         
}


export default getDocument