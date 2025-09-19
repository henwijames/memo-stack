import { motion as Motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router";
import { formatDate } from "@/lib/utils";
import { Button } from "./ui/button";
import { Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { useState } from "react";
import api from "@/lib/axios";
import { toast } from "sonner";

const NoteCard = ({ note, i, setNotes }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = async (e, id) => {
    e.preventDefault();

    try {
      await api.delete(`/notes/${id}`);
      setIsOpen(false);
      setNotes((prev) => prev.filter((note) => note._id !== id));
      toast.success("Note deleted successfully");
    } catch (error) {
      console.log("Error deleting note:", error);
      toast.error("Failed to delete note");
    }
  };

  return (
    <Motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: i * 0.1 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>
            <Link
              to={`/note/${note._id}`}
              className=" hover:underline transition-all ease-in duration-75"
            >
              {note.title}
            </Link>
          </CardTitle>
          <CardDescription>
            {formatDate(new Date(note.createdAt))}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>{note.content}</p>
        </CardContent>
        <CardFooter className={"justify-end"}>
          <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogTrigger asChild>
              <Button
                variant="destructive"
                size="icon"
                className="cursor-pointer"
              >
                <Trash />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Are you sure you want to delete this?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <Button
                  variant={"destructive"}
                  onClick={(e) => handleDelete(e, note._id)}
                >
                  Continue
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardFooter>
      </Card>
    </Motion.div>
  );
};

export default NoteCard;
