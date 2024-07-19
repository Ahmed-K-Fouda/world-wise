import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import PageNav from "../components/pagenav/PageNav";
import { useAuth } from "../contexts/FakeAuthContext";
import Button from "../components/button/Button";

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("ahmed@example.com");
  const [password, setPassword] = useState("qwerty");

  const navigate = useNavigate();
  const { login, isAuthenticated, failed } = useAuth();

  function handleSubmit(e) {
    e.preventDefault();
    if (email && password) login(email, password);
  }

  useEffect(() => {
    if (isAuthenticated) navigate("/app", { replace: true });
  }, [isAuthenticated, navigate]);

  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        {failed && (
          <div className={styles.error}>
            Incorrect email or password. Please try again.
          </div>
        )}
        <div>
          <Button type="primary">Login</Button>
        </div>
      </form>
    </main>
  );
}
