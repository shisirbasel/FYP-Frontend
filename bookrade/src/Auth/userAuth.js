import axios from 'axios';

export default function userAuth (){
    
    const http = axios.create({
        headers: {
            "Content-Type": "application/json"
        }

    });
    return {
        http
    }
  
}
