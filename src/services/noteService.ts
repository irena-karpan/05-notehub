import axios from "axios";

axios.defaults.baseURL = "https://notehub-public.goit.study/api/";
axios.defaults.headers.Authorization = `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`;

export function fetchNotes(search, page) {}

export function createNote() {}

export function deleteNote() {}
