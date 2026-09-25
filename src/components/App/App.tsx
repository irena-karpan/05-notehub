import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import css from "../App/App.module.css";
import NoteList from "../NoteList/NoteList";
import { useState } from "react";
import { createNote, deleteNote, fetchNotes } from "../../services/noteService";
import Pagination from "../Pagination/Pagination";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
import type { NoteTag } from "../../types/note";
import toast, { Toaster } from "react-hot-toast";
import SearchBox from "../SearchBox/SearchBox";
import { useDebouncedCallback } from "use-debounce";
import Loader from "../Loader/Loader";
import UsersError from "../UsersError/UsersError";

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [onModalClose, setOnModalClose] = useState(false);

  const queryClient = useQueryClient();

  const { data, isError, isLoading, isFetching, error } = useQuery({
    queryKey: ["query", searchQuery, currentPage],
    queryFn: () => fetchNotes(searchQuery, currentPage),
    placeholderData: keepPreviousData,
  });

  const createMutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["query", searchQuery, currentPage],
      });
      isModalClose();
    },
    onError: () => {
      toast.error("Something went wrong! Please, try again!");
      isModalClose();
    },
  });

  const handleCreateMutation = (newNote: NoteTag) => {
    createMutation.mutate(newNote);
  };

  const deleteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["query", searchQuery, currentPage],
      });
    },
    onError: () => {
      toast.error("Something went wrong! Please, try again!");
    },
  });

  const handleDeleteMutation = (noteId: string) => {
    deleteMutation.mutate(noteId);
  };

  const handleSearchQuery = useDebouncedCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(event.target.value);
    },
    300,
  );

  const isModalClose = () => setOnModalClose(false);
  const isModalOpen = () => setOnModalClose(true);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={searchQuery} handleChange={handleSearchQuery} />
        {data && data.totalPages > 1 && (
          <Pagination
            totalPages={data.totalPages}
            page={currentPage}
            setPage={setCurrentPage}
          />
        )}
        <button onClick={isModalOpen} className={css.button}>
          Create note +
        </button>
      </header>
      {(isLoading || isFetching) && <Loader />}
      {isError && <UsersError errorMessage={error.message} />}
      {data && data.notes.length > 0 && (
        <NoteList deleteNote={handleDeleteMutation} notes={data.notes} />
      )}
      {onModalClose && (
        <Modal onClose={isModalClose}>
          <NoteForm createNote={handleCreateMutation} onClose={isModalClose} />
        </Modal>
      )}
      <Toaster />
    </div>
  );
}
