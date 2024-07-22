import { NextResponse } from "next/server";
import jwksClient from "jwks-rsa";
import jwt, { JwtPayload } from "jsonwebtoken";
import prisma from "@/lib/db";

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
            const userData = event.data as {
              id: string;
              email: string;
              name: string;
            };
      
            // Insert or update the user in the database
            await prisma.user.upsert({
              where: { id: userData.id },
              update: {
                email: userData.email,
                name: userData.name,
              },
              create: {
                id: userData.id,
                email: userData.email,
                name: userData.name,
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
