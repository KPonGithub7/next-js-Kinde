"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const navLinks = [
    {
        href: "/",
        lable: "Home",
    },
    {
        href: "/posts",
        lable: "Posts",
    },
    {
        href: "/create-posts",
        lable: "Create posts",
    },
];

const Header = () => {
    const pathName = usePathname();
    return (
        <header className="flex justify-between items-center py-4 px-7 border-b">
            <Link href="/">
                <Image
                    src="/vercel.svg"
                    alt="Vercel Logo"
                    className="dark:invert"
                    width={100}
                    height={24}
                    priority
                />
            </Link>

            <nav>
                <ul className="gap-x-5 flex text-base">
                    {navLinks.map((item) => (
                        <li key={item.href}>
                            <Link
                                className={`${
                                    pathName === item.href
                                        ? "text-zinc-900 font-bold"
                                        : "text-zinc-400"
                                }`}
                                href={item.href}
                            >
                                {item.lable}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
};

export default Header;
