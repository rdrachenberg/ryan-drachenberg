'use server'
import fs from 'fs/promises'

type Props = {
    title: string,
    description: string,
    date: Date,
    code: string,
}
export default async function blogPost(data: Props) {
    const {title, description, date, code} = data;
    try {
        const content = `---\ntitle: ${title}\ndescription: ${description}\ndate: ${date}\n---\n${code}`
        
        await fs.writeFile(`content/posts/${title}.mdx`, content)
    } catch (error) {
        console.log('error here ----> ')
        console.log(error);
    }

}
