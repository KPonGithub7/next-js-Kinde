import prisma from "@/lib/db";
import Link from "next/link";
import React from "react";

const postList = async () => {
    const posts = await prisma.post.findMany();
    return (
        <ul>
            {posts.map((post) => (
                <li key={post.id}>
                    <Link href={`/posts/${post.id}`}>
                        <p>{post.title}</p>
                    </Link>
                </li>
            ))}
        </ul>
    );
};

export default postList;
