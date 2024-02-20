import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    if(path === '/') {
        return NextResponse.next();
    }

    const session = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET
    })
    
    // redirects to login page if the user is NOT signed in
    if(!session && path === '/protected') {
        return NextResponse.redirect(new URL('/login', request.url));
    
        // redirect to authorized pages if already logged in
    } else if(session && (path === '/login' || path === '/register')) { 
        return NextResponse.redirect(new URL('/protected', request.url))
    }

    return NextResponse.next();
}