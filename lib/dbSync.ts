import BlogPostFromDb from "@/lib/blogPostFromDb";
import blogPost from "./blogPost";

export default async function dbSync(){
    const dbPosts = await BlogPostFromDb()
  // console.log(dbPosts);
  const {...posts} = dbPosts.posts;

  let data = {...posts};
  for(const [key, value] of Object.entries(data)) {
    const title = value.title as string;
    const description = value.description as string;
    const date = value.date;
    const code = value.code as string;

    const payload = {
      title: title.split(' ').join('-').toLocaleLowerCase(),
      description,
      date,
      code

    }
    console.log(payload)
    blogPost(payload)
  }
}

