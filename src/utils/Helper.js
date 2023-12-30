import {  toast } from 'react-toastify';

const helper = {
    toastSuccess: function(message){
        toast.success(message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            }); 
    },
    toastError: function(message){
        toast.error(message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            }); 
    },
    toastInfo: function(message){
        toast.info(message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            }); 
    },
    setLocalStorageWithExpiration: function(key, value, expirationTime = 10*60*1000) {
        // store the value as the object
        // along with the expiry date
        let result  = {
            data : value
        }
    
        if(expirationTime){
        // set the expiry 
        // from the current date
        result.expireTime = Date.now() + expirationTime;
        }
        
        // stringify the result
        // and the data in original storage
        localStorage.setItem(key, JSON.stringify(result));
    },
    getLocalStorageWithExpiration(key) {
        // get the parsed value of the given key
        let result = JSON.parse(localStorage.getItem(key));
        
        // if the key has value
        if(result){ 
            
            // if the entry is expired
            // remove the entry and return null
            if(result.expireTime <= Date.now()){
                window.localStorage.removeItem(key);
                return null;
            }  
            
            // else return the value
            return result.data;
        }
        
        // if the key does not have value
        return null;
    },
    redirectionAtInit(user, currentPagePath) {
        //console.log('🥰 ' , currentPagePath, user.subscription_step)
        if(!user || (currentPagePath !== user.subscription_step)){
            // navigate('/waitinglist')
            document.location.href='/waitinglist'; 
            return false
        }
        console.log('user' , user)
        return true
      }
}

export default helper;
