import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

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
            <h2>
                welcome{user?.username} with mailId {user?.email}
            </h2>
        </main>
    );
};
export default Home;
