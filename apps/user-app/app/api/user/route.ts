import { getServerSession } from "next-auth"
import { authOptions } from "../../app/lib/auth"
import { NextResponse } from "next/server";

export const GET = async () => {
    const session = await getServerSession(authOptions); // To protect this user route => https://next-auth.js.org/getting-started/example
    if (session.user) {
        return NextResponse.json({
            user: session.user
        })
    }
    return NextResponse.json({
        message: "You are not logged in"
    }, {
        status: 403
    })
}