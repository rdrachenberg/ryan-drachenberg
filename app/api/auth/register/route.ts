import prisma from "@/lib/prisma";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";


type RequestBody = {
    email: string;
    password: string;
}

export async function POST(request: Request) {
    const body: RequestBody = await request.json();

    const userDoesExsist = await prisma.user.findUnique({
        where: {
            email: body.email
        }
    })

    if(userDoesExsist) {
        return NextResponse.json({error: 'User already exsist'}, { status: 400 });

    } else {
        await prisma.user.create({
            data: {
                email: body.email,
                password: await hash(body.password, 10),
            },
        });

        return NextResponse.json({success: true}, { status: 200 })
    }
}