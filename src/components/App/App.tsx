import { keepPreviousData, useQuery } from "@tanstack/react-query";
import css from "../App/App.module.css";
import NoteList from "../NoteList/NoteList";
import { useState } from "react";
import { fetchNotes } from "../../services/noteService";

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { data } = useQuery({
    queryKey: ["query", searchQuery, currentPage],
    queryFn: () => fetchNotes(searchQuery, currentPage),
    placeholderData: keepPreviousData,
  });

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        {/* Компонент SearchBox */}
        {/* Пагінація */}
        {/* Кнопка створення нотатки */}
      </header>
      {data && data.length > 0 && <NoteList notes={data} />}
    </div>
  );
}
