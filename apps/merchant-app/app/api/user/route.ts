import { NextResponse } from "next/server";
import client from "@repo/db/client";

// const client = new PrismaClient();

export const GET = async() => {
    await client.user.create({
        data: {
            email: "asd",
            name: "adads",
            number: "asdaf",
            password: "pass"
        }
    })
    return NextResponse.json({
        message: "Hi there"
    })
}