// pages/index.jsx (Login)
import { useState } from "react";
import { useRouter } from "next/router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";
import Header from "../components/header";
import Footer from "../components/footer";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  async function handleLogin(e) {
    e.preventDefault();
    if (!email || !password) {
      alert("Preencha todos os campos");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem("@detailsUser", JSON.stringify({
        uid: userCredential.user.uid,
        email: userCredential.user.email,
      }));
      router.push('/admin');
    } catch (error) {
      alert("Erro ao fazer login: " + error.message);
    }
  }

  return (
    <div className="page-container">
      <Header />
      <div className="container">
        <form onSubmit={handleLogin} className="form-control">
          <h2 className="text-center">Login</h2>

          <input
            type="email"
            placeholder="Digite seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="btn btn-primary">Acessar</button>

          <p className="text-center">
            Não tem conta? <a href="/register" className="btn-link">Cadastre-se</a>
          </p>
        </form>
      </div>
      <Footer />

      <style jsx>{`
        .page-container {
          background-color: #111;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          color: #0d47a1;
        }

        .container {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem 1rem;
        }

        .form-control {
          background: #1a1a1a;
          padding: 2rem;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
          width: 100%;
          max-width: 400px;
        }

        input {
          width: 100%;
          padding: 0.75rem;
          margin-bottom: 1rem;
          border: 1px solid #333;
          border-radius: 4px;
          background-color: #2a2a2a;
          color: #fff;
          box-sizing: border-box;
        }

        input:focus {
          outline: none;
          border-color: #0d47a1;
          box-shadow: 0 0 5px rgba(13, 71, 161, 0.3);
        }

        input::placeholder {
          color: #bbb;
        }

        .text-center {
          text-align: center;
          color: #0d47a1;
        }

        .btn-link {
          color: #0d47a1;
          text-decoration: none;
        }

        .btn-link:hover {
          text-decoration: underline;
        }

        .btn-primary {
          background-color: #0d47a1;
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 4px;
          cursor: pointer;
          width: 100%;
          margin-bottom: 1rem;
        }

        .btn-primary:hover {
          background-color: #0a3a8a;
        }
      `}</style>
    </div>
  );
}