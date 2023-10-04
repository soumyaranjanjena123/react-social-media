import { collection, addDoc,query, where,getDocs,deleteDoc, getDoc, doc } from "firebase/firestore"
import { auth, db } from "../../config/firebase"
import { Post as Ipost } from "./main"
import { useAuthState } from "react-firebase-hooks/auth"
import { useEffect, useState } from "react"





interface Props{
    post: Ipost,

}

interface Likes{
    userId: string
    likeId: string
}



export const Post =(props: Props)=>{


    const [likes, setLikes] = useState <Likes[] |  null>(null)

    const {post} = props
    const likesRef = collection(db, "likes")
    const [user] =useAuthState(auth)

    const likesDoc = query(likesRef,where("postId","==", post.id))

    const getLikes = async()=>{
       const data =await  getDocs(likesDoc)

       setLikes(data.docs.map((doc) => ({ userId: doc.data().userId, likeId: doc.id })))
    }


    

    useEffect(()=>{
        getLikes()
    },[])

    const addLike =async ()=>{
        try{
        const newDoc = await addDoc(likesRef, {
           userId: user?.uid,
           postId: post.id

            
        })
        if(user){
            
        setLikes((prev)=> prev
        ? [...prev, { userId: user.uid, likeId: newDoc.id }]
        : [{ userId: user.uid, likeId: newDoc.id }])
    }
        } catch(err){
            console.log(err)
}

    }

    const removeLike = async () => {
        try {
          const likeToDeleteQuery = query(
            likesRef,
            where("postId", "==", post.id),
            where("userId", "==", user?.uid)
          );
    
          const likeToDeleteData = await getDocs(likeToDeleteQuery);
          const likeId = likeToDeleteData.docs[0].id;
          const likeToDelete = doc(db, "likes", likeId);
          await deleteDoc(likeToDelete);
          if (user) {
            setLikes(
              (prev) => prev && prev.filter((like) => like.likeId !== likeId)
            );
          }
        } catch (err) {
          console.log(err);
        }
      };
    
      const hasUserLiked = likes?.find((like) => like.userId === user?.uid);
    
      useEffect(() => {
        getLikes();
      }, []);
    


    return(
        <div>
            <div className="title">
                <h1>{post.title}</h1>

            </div>
            <div className="description">
                <h3>{post.description}</h3>
            </div>

            <div className="username">
                <p>@{post.username}</p>

                <button onClick={hasUserLiked ? removeLike : addLike}>{hasUserLiked?<> &#128078;</> : <>&#128525;</>}</button>
                {likes && <p>Like :{likes?.length}</p>}

            </div>

        </div>
    )
}