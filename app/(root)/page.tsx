import { Button } from "@/components/ui/button";
// import { getCurrentUser } from "@/lib/actions/user.actions";
import Link from "next/link";
// import { redirect } from "next/navigation";

// export const dynamic = "force-dynamic";

const Home = async () => {
  // const existingUser = await getCurrentUser();

  // if (!existingUser) {
  //   redirect("/sign-in");
  // }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen gap-4">
      <h1 className="text-center bg-gradient-to-r text-transparent bg-clip-text from-lime-600 via-red-600 to-purple-600 font-extrabold text-6xl">
        Hello World
      </h1>
      <div className="flex flex-row items-center justify-center gap-4">
        <Button asChild>
          <Link href="/sign-up">Sign Up</Link>
        </Button>

        <Button asChild>
          <Link href="/sign-in">Sign In</Link>
        </Button>
      </div>
    </div>
  );
};

export default Home;
