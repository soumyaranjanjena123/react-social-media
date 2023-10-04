import {useForm} from "react-hook-form"
import * as yup from "yup"
import {yupResolver} from "@hookform/resolvers/yup"

import {addDoc, collection} from "firebase/firestore"



import {useAuthState} from "react-firebase-hooks/auth"

import { auth,db } from "../../config/firebase"

import {useNavigate} from "react-router-dom"


interface CreateFormData{
    title:string,
    description: string
}

export const CreateForm =()=>{

    const navigate = useNavigate()

    const [user] =useAuthState(auth)

    const schema = yup.object().shape({
        title: yup.string().required("Please add title"),
        description: yup.string().required("Please Add some Description")
    })

    const postsRef = collection(db, "post")


    const {register, handleSubmit, formState:{errors}} = useForm({
        resolver: yupResolver(schema)
    })


    const onCreatePost =async (data:CreateFormData)=>{
        await addDoc(postsRef, {
            // title: data.title,
            // description: data.description, we can use the spread operrator bcz we are getting title and description from the data so we can write like this

            ...data,
            username: user?.displayName,
            ueserId: user?.uid
        })

        navigate("/")
        



        console.log(data)

    }


    return(<form onSubmit={handleSubmit(onCreatePost)}>

        <input placeholder="Title for post" {...register("title")}/>
        <p>{errors.title?.message}</p>
        <textarea placeholder="Description...." {...register("description")}/>
        <p>{errors.description?.message}</p>
        <input type="submit" className="submitForm"/>

    </form>)
}