import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Note } from "../../types/note";
import css from "../NoteList/NoteList.module.css";
import { deleteNote } from "../../services/noteService";
import toast from "react-hot-toast";

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["query"],
      });
    },
    onError: () => {
      toast.error("Something went wrong! Please, try again!");
    },
  });

  const handleDeleteMutation = (noteId: string) => {
    deleteMutation.mutate(noteId);
  };

  return (
    <ul className={css.list}>
      {notes.map((element) => (
        <li key={element.id} className={css.listItem}>
          <h2 className={css.title}>{element.title}</h2>
          <p className={css.content}>{element.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{element.tag}</span>
            <button
              onClick={() => handleDeleteMutation(element.id)}
              className={css.button}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
