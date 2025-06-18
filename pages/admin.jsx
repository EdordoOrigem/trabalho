// pages/admin.jsx
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { auth } from "../lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import AdminContent from "../components/AdminContent";
import Header from "../components/header";
import Footer from "../components/footer";

export default function Admin() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setLoading(false);
      } else {
        router.push("/");
      }
    });

    return () => unsubscribe();
  }, []);

  function handleLogout() {
    signOut(auth);
    router.push("/");
  }

  if (loading) return (
    <div className="page-container">
      <Header />
      <div className="container">
        <p className="loading-text">Carregando...</p>
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
        
        .loading-text {
          color: #0d47a1;
          font-size: 1.2rem;
          text-align: center;
        }
      `}</style>
    </div>
  );
  
  if (!user) return null;

  return (
    <div className="page-container">
      <Header />
      <div className="container">
        <div className="logout-section">
          <button className="btn btn-danger" onClick={handleLogout}>Sair</button>
        </div>
        <AdminContent user={user} />
      </div>
      <Footer />

      <style jsx>{`
        .page-container {
          background-color: #111;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          color: #fff;
        }

        .container {
          flex: 1;
          padding: 2rem 1rem;
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
        }

        .logout-section {
          display: flex;
          justify-content: flex-end;
          margin-bottom: 2rem;
        }

        .btn-danger {
          background-color: #dc3545;
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 4px;
          cursor: pointer;
          font-size: 0.9rem;
        }

        .btn-danger:hover {
          background-color: #c82333;
        }

        /* Estilos globais para elementos dentro da página admin */
        :global(.admin-content) {
          color: #fff;
        }

        /* Estilizar todas as caixas/containers dentro do admin */
        :global(.admin-content > *) {
          background-color: #1a1a1a !important;
          border-radius: 8px;
          padding: 1.5rem;
          margin-bottom: 1rem;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
        }

        /* Estilizar inputs globalmente */
        :global(input) {
          background-color: #2a2a2a !important;
          border: 1px solid #333 !important;
          color: #fff !important;
          padding: 0.5rem !important;
          border-radius: 4px !important;
          box-sizing: border-box !important;
        }

        :global(input::placeholder) {
          color: #bbb !important;
        }

        :global(input:focus) {
          outline: none !important;
          border-color: #0d47a1 !important;
          box-shadow: 0 0 5px rgba(13, 71, 161, 0.3) !important;
        }

        /* Estilizar botões globalmente */
        :global(button) {
          background-color: #0d47a1 !important;
          color: white !important;
          border: none !important;
          padding: 0.5rem 1rem !important;
          border-radius: 4px !important;
          cursor: pointer !important;
          margin: 0.25rem !important;
        }

        :global(button:hover) {
          background-color: #0a3a8a !important;
        }

        /* Estilizar textarea globalmente */
        :global(textarea) {
          background-color: #2a2a2a !important;
          border: 1px solid #333 !important;
          color: #fff !important;
          padding: 0.5rem !important;
          border-radius: 4px !important;
          resize: vertical !important;
          box-sizing: border-box !important;
          width: 100% !important;
        }

        :global(textarea::placeholder) {
          color: #bbb !important;
        }

        :global(textarea:focus) {
          outline: none !important;
          border-color: #0d47a1 !important;
          box-shadow: 0 0 5px rgba(13, 71, 161, 0.3) !important;
        }

        /* Estilizar labels e textos */
        :global(label) {
          color: #fff !important;
          margin-bottom: 0.5rem !important;
          display: block !important;
        }

        :global(p) {
          color: #fff !important;
        }

        :global(h1), :global(h2), :global(h3), :global(h4), :global(h5), :global(h6) {
          color: #0d47a1 !important;
        }
      `}</style>
    </div>
  );
}