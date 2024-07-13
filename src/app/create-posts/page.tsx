import Form from "@/components/Form";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/server";

import React from "react";

const Page = async () => {
    return (
        <main className="pt-20 text-center">
            <h1 className="text-5xl font-semibold mb-5">Create Post</h1>

            <Form />

            <LogoutLink>Log Out</LogoutLink>
        </main>
    );
};

export default Page;
