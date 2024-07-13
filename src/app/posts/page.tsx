import Link from "next/link";
import React, { Suspense } from "react";
import PostList from "@/components/postList";

const Page = async () => {
    return (
        <div className="text-center pt-32 px-5">
            <h1 className="text-4xl font-bold"> All posts</h1>

            <Suspense fallback="Loading...">
                <PostList />
            </Suspense>
        </div>
    );
};

export default Page;
