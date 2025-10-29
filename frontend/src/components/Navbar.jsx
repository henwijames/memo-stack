import { Menu, PlusIcon } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { useUser } from "@/context/UserContext";
import { Skeleton } from "./ui/skeleton";
import ModeToggle from "./ModeToggle";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useState } from "react";
const Navbar = () => {
  const { user, logout, loading } = useUser();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
  };

  const handleNewNote = () => {
    navigate("/create");
    setIsDrawerOpen(false);
  };
  return (
    <header className="bg-base-300 border-b border-base-content/10">
      <div className="mx-auto max-w-7xl p-4">
        <div className="flex items-center justify-between">
          <h1 className="lg:text-3xl text-lg font-bold text-primary font-mono tracking-tighter">
            MemoStack
          </h1>
          <div className="flex items-center gap-4 ">
            <div className="hidden md:block">
              {loading ? (
                <Skeleton className="h-6 w-32 rounded-md" />
              ) : (
                user && (
                  <>
                    <span>Hello, {user.name}</span>
                  </>
                )
              )}
            </div>
            <Button
              variant="outline"
              className={`hidden md:inline-flex`}
              onClick={handleNewNote}
            >
              <PlusIcon />
              <span>New Note</span>
            </Button>

            <div className="hidden md:block">
              <ModeToggle />
            </div>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleLogout}
              className={`hidden md:inline-flex`}
            >
              Logout
            </Button>
            <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
              <DrawerTrigger asChild>
                <Button variant="outline" className="md:hidden">
                  <Menu />
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle
                    className={`flex justify-between items-center mb-5`}
                  >
                    <span className="lg:text-3xl text-lg font-bold text-primary font-mono tracking-tighter">
                      MemoStack
                    </span>
                    <ModeToggle />
                  </DrawerTitle>
                  <DrawerDescription>
                    <Button
                      variant="outline"
                      className={`w-full mb-2`}
                      onClick={handleNewNote}
                    >
                      <PlusIcon />
                      <span>New Note</span>
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={handleLogout}
                      className={`w-full`}
                    >
                      Logout
                    </Button>
                  </DrawerDescription>
                </DrawerHeader>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
