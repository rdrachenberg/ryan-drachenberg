import toast from "react-hot-toast";

type Props = {
    authorId: string,
    title: string,
    description: string,
    date: Date,
    code: string,
}
export default async function blogPostToDB(data: Props) {
    const {authorId, title, description, date, code} = data;

    const rawPost = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };

    console.log(rawPost);
    try {
        let post;
        process.env.NODE_ENV === 'development' ? 
            post = await fetch('http://localhost:3000/api/auth/post', rawPost) 
        :
            post = await fetch('https://ryan-drachenberg.vercel.app/api/auth/post', rawPost)
        
        toast.success('Post to DB successful!')

    } catch (error) {
        console.log('ERROR Here: ----> ')
        console.log(error);
    }

}