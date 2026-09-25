import type { Note } from "../../types/note";
import css from "../NoteList/NoteList.module.css";

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  return (
    <ul className={css.list}>
      {notes.map((element) => (
        <li key={element.id} className={css.listItem}>
          <h2 className={css.title}>{element.title}</h2>
          <p className={css.content}>{element.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{element.tag}</span>
            <button className={css.button}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  );
}
