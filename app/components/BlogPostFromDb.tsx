import toast from "react-hot-toast";


export default async function BlogPostFromDb() {
    
    const rawPost = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    };

    // console.log(rawPost);
    try {
        let post;
        process.env.NODE_ENV === 'development' ? 
            post = await fetch('http://localhost:3000/api/auth/post', rawPost) 
        :
            post = await fetch('https://ryan-drachenberg.vercel.app/api/auth/post', rawPost)
        
        // toast.success('GET DB data successful!')

        return post.json()

    } catch (error) {
        console.log('ERROR Here: ----> ')
        console.log(error);
    }

}