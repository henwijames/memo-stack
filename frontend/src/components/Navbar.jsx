import { PlusIcon } from "lucide-react";
import { Link } from "react-router";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { useUser } from "@/context/UserContext";
import { Skeleton } from "./ui/skeleton";
import ModeToggle from "./ModeToggle";

const Navbar = () => {
  const { user, logout, loading } = useUser();
  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
  };
  return (
    <header className="bg-base-300 border-b border-base-content/10">
      <div className="mx-auto max-w-7xl p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-primary font-mono tracking-tighter">
            MemoStack
          </h1>
          <div className="flex items-center gap-4">
            <Button asChild variant="outline">
              <Link to={"/create"}>
                <PlusIcon />
                <span>New Note</span>
              </Link>
            </Button>
            {loading ? (
              <Skeleton className="h-6 w-32 rounded-md" />
            ) : (
              user && (
                <>
                  <span>Hello, {user.name}</span>
                </>
              )
            )}
            <ModeToggle />
            <Button variant="destructive" size="sm" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
