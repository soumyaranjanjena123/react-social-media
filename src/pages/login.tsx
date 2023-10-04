import {auth, provider} from "../config/firebase"

import {signInWithPopup}  from "firebase/auth"


import {useNavigate} from "react-router-dom"


export const Login=()=>{

    const navigate = useNavigate()

const signInWithGoogle =async ()=>{
    const res = await signInWithPopup(auth,provider)


    console.log("user data=====>"+res)

    // signInWithPopup will throw a promise so we use async await


    navigate('/')
}

    return(
    
    
    <div>
        <p>Signin With Gooogle</p>
        <button onClick={signInWithGoogle}>SignIn with Google</button>
    </div>


    )
}