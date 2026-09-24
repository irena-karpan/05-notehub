import axios from "axios";
import type { Note, NoteTag } from "../types/note";

axios.defaults.baseURL = "https://notehub-public.goit.study/api";
axios.defaults.headers.Authorization = `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`;

interface FetchNotesHttpResponce {
  notes: Note[];
}

// interface NewNote {
//   title: string;
//   content: string;
//   tag: string;
// }

export async function fetchNotes(
  search: string,
  page: number,
): Promise<Note[]> {
  const responce = await axios.get<FetchNotesHttpResponce>("/notes", {
    params: {
      search: search,
      page: page,
    },
  });
  return responce.data.notes;
}

export async function createNote(newNoteText: NoteTag) {
  const responce = await axios.post("/notes", newNoteText);
  return responce;
}

export async function deleteNote(noteID: number) {
  const responce = await axios.delete(`/notes${noteID}`);
  return responce;
}
