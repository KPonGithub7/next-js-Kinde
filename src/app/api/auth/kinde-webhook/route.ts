import { NextResponse } from "next/server";
import jwksClient from "jwks-rsa";
import jwt, { JwtPayload } from "jsonwebtoken";
import prisma from "@/lib/db";

interface userDataType {
    id: string;
    email: string;
    name: string;
}

const client = jwksClient({
    jwksUri: `${process.env.KINDE_ISSUER_URL}/.well-known/jwks.json`,
});

export async function POST(req: Request) {
    try {
        const token = await req.text();

        if (!token) {
            throw new Error("No token provided");
        }

        // Decode the token
        const decodedToken = jwt.decode(token, { complete: true });
        if (!decodedToken || typeof decodedToken === "string") {
            throw new Error("Failed to decode token");
        }

        const { header } = decodedToken;
        const { kid } = header;

        // Verify the token
        const key = await client.getSigningKey(kid);
        const signingKey = key.getPublicKey();
        const event = jwt.verify(token, signingKey) as JwtPayload;

        // Handle various events
        if (event?.type === "user.created" || event?.type === "user.updated") {
            const userData = await event.data;

            if (
                !userData ||
                !userData.id ||
                !userData.email ||
                !userData.first_name
            ) {
                console.error("consoling", userData.user);
                throw new Error("User data is incomplete");
            }

            // Insert or update the user in the database
            await prisma.user.create({
                data: {
                    id: userData.id,
                    email: userData.email,
                    name: userData.first_name,
                },
            });

            console.log(`User ${event.type} event handled:`, userData);
        }
    } catch (err) {
        if (err instanceof Error) {
            console.error(err.message);
            return NextResponse.json({ message: err.message }, { status: 400 });
        }
    }
    return NextResponse.json({ status: 200, statusText: "success" });
}
