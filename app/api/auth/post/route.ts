import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";


type RequestBody = {
    id: string;
    authorId: string;
    title: string;
    description: string; 
    code: string
    
}

export async function POST(request: Request) {
    const body: RequestBody = await request.json();

    const titleDoesExsist = await prisma.post.findUnique({
        where: {
            title: body.title
        }
    })

    if(titleDoesExsist) {
        return NextResponse.json({error: 'Blog post title already exsist'}, { status: 400 });

    } else {
        await prisma.post.create({
            data: {
                authorId: body.authorId,
                title: body.title,
                description: body.description,
                code: body.code
            },
        });

        return NextResponse.json({success: true}, { status: 200 })
    }
}

export async function GET() {
    const posts = await prisma.post.findMany({});
    // console.log(posts);

    if(!posts) {
        return NextResponse.json({error: 'No post in DB'}, { status: 400 });

    } 

    return NextResponse.json({posts}, { status: 200})
    
}