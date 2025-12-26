import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
    try {
        const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
        const session = await getServerSession(authOptions);

        // Get all cookies safely
        const cookies = request.cookies.getAll().map(c => ({ name: c.name, value: c.value.substring(0, 10) + '...' })); // Mask values for partial safety

        return NextResponse.json({
            env: {
                NEXTAUTH_URL: process.env.NEXTAUTH_URL,
                NODE_ENV: process.env.NODE_ENV,
                NEXTAUTH_SECRET_SET: !!process.env.NEXTAUTH_SECRET,
            },
            cookies,
            token: token ? {
                name: token.name,
                email: token.email,
                exp: token.exp,
                iat: token.iat
            } : null,
            session: session ? {
                user: session.user,
                expires: session.expires
            } : null,
            headers: {
                host: request.headers.get('host'),
                'x-forwarded-proto': request.headers.get('x-forwarded-proto'),
            },
            check: {
                hasToken: !!token,
                hasSession: !!session,
            }
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message, stack: error.stack }, { status: 500 });
    }
}
