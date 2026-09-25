import { keepPreviousData, useQuery } from "@tanstack/react-query";
import css from "../App/App.module.css";
import NoteList from "../NoteList/NoteList";
import { useState } from "react";
import { fetchNotes } from "../../services/noteService";
import Pagination from "../Pagination/Pagination";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [onModalClose, setOnModalClose] = useState(false);

  const { data } = useQuery({
    queryKey: ["query", searchQuery, currentPage],
    queryFn: () => fetchNotes(searchQuery, currentPage),
    placeholderData: keepPreviousData,
  });

  const isModalClose = () => setOnModalClose(false);
  const isModalOpen = () => setOnModalClose(true);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        {/* Компонент SearchBox */}
        {data && data.totalPages > 1 && (
          <Pagination
            totalPages={data.totalPages}
            page={currentPage}
            setPage={setCurrentPage}
          />
        )}

        {/* Кнопка створення нотатки */}
        <button onClick={isModalOpen} className={css.button}>
          Create note +
        </button>
      </header>
      {data && data.notes.length > 0 && <NoteList notes={data.notes} />}
      {onModalClose && (
        <Modal onClose={isModalClose}>
          <NoteForm/>
        </Modal>
      )}
    </div>
  );
}
