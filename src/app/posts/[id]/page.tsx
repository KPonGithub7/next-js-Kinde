import prisma from "@/lib/db";
import { notFound } from "next/navigation";
import React from "react";

const Page = async ({ params }: { params: { id: string } }) => {
    const post = await prisma.post.findUnique({
        where: { id: parseInt(params.id) },
    });

    if (!post) {
        notFound();
    }
    return (
        <div className="pt-28 text-center">
            <h1 className="text-5xl font-semibold mb-5">{post.title}</h1>
            <p className="max-w-2xl mx-auto">{post.body}</p>
        </div>
    );
};

export default Page;
