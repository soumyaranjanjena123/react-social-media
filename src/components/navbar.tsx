import {Link} from "react-router-dom"

import { auth } from "../config/firebase"

import {useAuthState} from "react-firebase-hooks/auth"

// this package is use for the state of the auth means , if user will signin by diffrent account then it will update the auth value.

import { signOut } from "firebase/auth"

export const Navbar =()=>{

    const [user] =useAuthState(auth)

    const signUseOut = async() =>{

        await signOut(auth)


    }
    

    return(
    
    <div className="navbar">

        <div className="links">

        <Link to={'/'}>Home</Link>


       { !user ? <Link to={'/login'}>login</Link>:<Link to={'/createpost'}>Create Post</Link>}

        </div>

            <div className="user">
                   {/* <p>{auth.currentUser?.displayName}</p> or */}

                { user && (<>
                    <p>{user?.displayName}</p>

                

                  <img src={user?.photoURL || ""} width="40" height= "40"/> 
                  <button onClick={signUseOut}>Log Out</button>
                  </>
                 
                 )}

            </div>


    </div>)
}