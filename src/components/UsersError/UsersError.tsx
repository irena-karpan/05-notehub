import css from "../UsersError/UsersError.module.css";
interface UsersErrorProps {
  errorMessage: string;
}

export default function UsersError({ errorMessage }: UsersErrorProps) {
  return <p className={css.error}> {`${errorMessage}. Please try again!`}</p>;
}
