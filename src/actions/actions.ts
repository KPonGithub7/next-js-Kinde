"use server";
import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

//for server actions

export const createPost = async (formData: FormData) => {
    const { isAuthenticated, getUser } = getKindeServerSession();

    if (!(await isAuthenticated())) {
        redirect("/api/auth/login");
    }

    const data = await getUser();

    const title = formData.get("title") as string;
    const body = formData.get("body") as string;
    console.log(title, body);

    await prisma.post.create({
        data: {
            title,
            body,
            author: {
                connect: {
                    id: data?.id,
                },
            },
        },
    });

    revalidatePath("/posts");
};
