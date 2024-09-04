"use server"

import { getServerSession, Session } from "next-auth"
import { authOptions } from "../auth"
import prisma from "@repo/db/client";

interface ExtendedSession extends Session {
    user?: {
        name?: string | null;
        email?: string | null;
        image?: string | null;
        id?: string;
    }
}

export default async function createOnRampTransaction(
    provider: string,
    amount: number
){
    const session = await getServerSession(authOptions) as ExtendedSession;
    if (!session?.user || !session.user?.id){
        return {
            message: "Unauthenticated Request"
        }
    }
    const token = (Math.random() * 1000).toString();
    await prisma.onRampTransaction.create({
        data: {
            provider,
            status: "Processing",
            startTime: new Date(),
            token: token,
            userId: Number(session?.user?.id),
            amount: amount * 100
        }
    });
    return {
        message: "Done"
    }
}