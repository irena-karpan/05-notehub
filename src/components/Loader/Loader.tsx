import { PuffLoader } from "react-spinners";
import css from "../Loader/Loader.module.css";

export default function Loader() {
  return <PuffLoader color="#f43f5e" className={css.loader} />;
}
