import axios from "axios";
import type { Note, NoteTag } from "../types/note";

axios.defaults.baseURL = "https://notehub-public.goit.study/api/notes";
axios.defaults.headers.Authorization = `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`;

interface FetchNotesResponce {
  notes: Note[];
  totalPages: number;
}

export async function fetchNotes(
  search: string,
  page: number,
): Promise<FetchNotesResponce> {
  const responce = await axios.get<FetchNotesResponce>("", {
    params: {
      search,
      page,
      perPage: 12,
    },
  });
  return responce.data;
}

export async function createNote(newNoteText: NoteTag): Promise<Note> {
  const responce = await axios.post<Note>("", newNoteText);
  return responce.data;
}

export async function deleteNote(noteID: string): Promise<Note> {
  const responce = await axios.delete<Note>(`/${noteID}`);
  return responce.data;
}
