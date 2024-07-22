import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import exp from "constants";

const Home = async () => {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    return (
        <main className="text-center pt-32 px-5">
            <h1 className="text-4xl font-bold"> Home</h1>
            <p className="mt-5 ">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Officia rerum excepturi, qui labore, quisquam pariatur voluptate
                voluptatem ad libero quas velit veniam eum et dolore provident
                minima vitae doloremque quis.
            </p>
        </main>
    );
};

export default Home;
