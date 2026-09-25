import axios from "axios";
import type { Note, NoteTag } from "../types/note";

axios.defaults.baseURL = "https://notehub-public.goit.study/api";
axios.defaults.headers.Authorization = `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`;

interface FetchNotesResponce {
  notes: Note[];
  totalPages: number;
}

// interface NewNote {
//   title: string;
//   content: string;
//   tag: string;
// }

export async function fetchNotes(
  search: string,
  page: number,
): Promise<FetchNotesResponce> {
  const responce = await axios.get<FetchNotesResponce>("/notes", {
    params: {
      search,
      page,
      perPage: 12,
    },
  });
  return responce.data;
}

export async function createNote(newNoteText: NoteTag) {
  const responce = await axios.post("/note", newNoteText);
  return responce;
}

export async function deleteNote(noteID: number) {
  const responce = await axios.delete(`/notes${noteID}`);
  return responce;
}
