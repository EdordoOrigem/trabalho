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
        <div className="loading-wrapper">
          <div className="loading-spinner"></div>
          <p className="loading-text">Carregando...</p>
        </div>
      </div>
      <Footer />
      
      <style jsx>{`
        .page-container {
          background-color: #0a0a0a;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          color: #ffffff;
        }
        
        .container {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem 1rem;
        }
        
        .loading-wrapper {
          text-align: center;
          background-color: #1a1a1a;
          padding: 2rem;
          border-radius: 12px;
          border: 1px solid #333;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
        }
        
        .loading-spinner {
          width: 40px;
          height: 40px;
          border: 4px solid #333;
          border-top: 4px solid #0d47a1;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 0 auto 1rem;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .loading-text {
          color: #ffffff;
          font-size: 1.2rem;
          text-align: center;
          margin: 0;
        }
      `}</style>
    </div>
  );
  
  if (!user) return null;

  return (
    <div className="page-container">
      <Header />
      <div className="container">
        <div className="admin-header">
          <h1 className="admin-title">Painel Administrativo</h1>
          <div className="user-info">
            <span className="user-email">Logado como: {user.email}</span>
            <button className="btn btn-danger" onClick={handleLogout}>
              <span className="btn-icon">🚪</span>
              Sair
            </button>
          </div>
        </div>
        <AdminContent user={user} />
      </div>
      <Footer />

      <style jsx>{`
        .page-container {
          background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          color: #ffffff;
        }

        .container {
          flex: 1;
          padding: 2rem 1rem;
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
        }

        .admin-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          padding: 1.5rem;
          background-color: #1a1a1a;
          border-radius: 12px;
          border: 1px solid #333;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }

        .admin-title {
          color: #0d47a1 !important;
          font-size: 1.8rem;
          font-weight: 600;
          margin: 0;
          text-shadow: 0 2px 4px rgba(13, 71, 161, 0.3);
        }

        .user-info {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .user-email {
          color: #cccccc;
          font-size: 0.9rem;
          background-color: #2a2a2a;
          padding: 0.5rem 1rem;
          border-radius: 6px;
          border: 1px solid #444;
        }

        .btn-danger {
          background: linear-gradient(135deg, #dc3545 0%, #c82333 100%) !important;
          color: white !important;
          border: none !important;
          padding: 0.75rem 1.5rem !important;
          border-radius: 8px !important;
          cursor: pointer !important;
          font-size: 0.9rem !important;
          font-weight: 500 !important;
          display: flex !important;
          align-items: center !important;
          gap: 0.5rem !important;
          transition: all 0.3s ease !important;
          box-shadow: 0 2px 8px rgba(220, 53, 69, 0.3) !important;
        }

        .btn-danger:hover {
          background: linear-gradient(135deg, #c82333 0%, #bd2130 100%) !important;
          transform: translateY(-2px) !important;
          box-shadow: 0 4px 12px rgba(220, 53, 69, 0.4) !important;
        }

        .btn-icon {
          font-size: 1rem;
        }

        /* Estilos globais melhorados para elementos dentro da página admin */
        :global(.admin-content) {
          color: #ffffff !important;
        }

        /* Estilizar todas as caixas/containers dentro do admin */
        :global(.admin-content > *) {
          background: linear-gradient(135deg, #1a1a1a 0%, #252525 100%) !important;
          border-radius: 12px !important;
          padding: 2rem !important;
          margin-bottom: 1.5rem !important;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4) !important;
          border: 1px solid #333 !important;
          transition: all 0.3s ease !important;
        }

        :global(.admin-content > *:hover) {
          transform: translateY(-2px) !important;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.5) !important;
        }

        /* Estilizar inputs globalmente com melhor visibilidade */
        :global(input) {
          background: linear-gradient(135deg, #2a2a2a 0%, #3a3a3a 100%) !important;
          border: 2px solid #444 !important;
          color: #ffffff !important;
          padding: 0.75rem 1rem !important;
          border-radius: 8px !important;
          box-sizing: border-box !important;
          width: 100% !important;
          font-size: 0.95rem !important;
          transition: all 0.3s ease !important;
        }

        :global(input::placeholder) {
          color: #888 !important;
          opacity: 1 !important;
        }

        :global(input:focus) {
          outline: none !important;
          border-color: #0d47a1 !important;
          box-shadow: 0 0 0 3px rgba(13, 71, 161, 0.2) !important;
          background: linear-gradient(135deg, #3a3a3a 0%, #4a4a4a 100%) !important;
        }

        /* Estilizar botões globalmente com melhor contraste */
        :global(button:not(.btn-danger)) {
          background: linear-gradient(135deg, #0d47a1 0%, #1976d2 100%) !important;
          color: #ffffff !important;
          border: none !important;
          padding: 0.75rem 1.5rem !important;
          border-radius: 8px !important;
          cursor: pointer !important;
          margin: 0.5rem 0.25rem !important;
          font-size: 0.9rem !important;
          font-weight: 500 !important;
          transition: all 0.3s ease !important;
          box-shadow: 0 2px 8px rgba(13, 71, 161, 0.3) !important;
        }

        :global(button:not(.btn-danger):hover) {
          background: linear-gradient(135deg, #1976d2 0%, #1565c0 100%) !important;
          transform: translateY(-2px) !important;
          box-shadow: 0 4px 12px rgba(13, 71, 161, 0.4) !important;
        }

        :global(button:disabled) {
          background: #555 !important;
          cursor: not-allowed !important;
          transform: none !important;
          box-shadow: none !important;
          opacity: 0.6 !important;
        }

        /* Estilizar textarea globalmente */
        :global(textarea) {
          background: linear-gradient(135deg, #2a2a2a 0%, #3a3a3a 100%) !important;
          border: 2px solid #444 !important;
          color: #ffffff !important;
          padding: 0.75rem 1rem !important;
          border-radius: 8px !important;
          resize: vertical !important;
          box-sizing: border-box !important;
          width: 100% !important;
          min-height: 120px !important;
          font-size: 0.95rem !important;
          line-height: 1.5 !important;
          transition: all 0.3s ease !important;
        }

        :global(textarea::placeholder) {
          color: #888 !important;
          opacity: 1 !important;
        }

        :global(textarea:focus) {
          outline: none !important;
          border-color: #0d47a1 !important;
          box-shadow: 0 0 0 3px rgba(13, 71, 161, 0.2) !important;
          background: linear-gradient(135deg, #3a3a3a 0%, #4a4a4a 100%) !important;
        }

        /* Estilizar labels e textos com melhor contraste */
        :global(label) {
          color: #ffffff !important;
          margin-bottom: 0.75rem !important;
          display: block !important;
          font-weight: 500 !important;
          font-size: 0.95rem !important;
        }

        :global(p) {
          color: #e0e0e0 !important;
          line-height: 1.6 !important;
          margin-bottom: 1rem !important;
        }

        :global(h1), :global(h2), :global(h3), :global(h4), :global(h5), :global(h6) {
          color: #0d47a1 !important;
          margin-bottom: 1rem !important;
          text-shadow: 0 2px 4px rgba(13, 71, 161, 0.3) !important;
        }

        /* Estilizar selects */
        :global(select) {
          background: linear-gradient(135deg, #2a2a2a 0%, #3a3a3a 100%) !important;
          border: 2px solid #444 !important;
          color: #ffffff !important;
          padding: 0.75rem 1rem !important;
          border-radius: 8px !important;
          box-sizing: border-box !important;
          width: 100% !important;
          font-size: 0.95rem !important;
          cursor: pointer !important;
        }

        :global(select:focus) {
          outline: none !important;
          border-color: #0d47a1 !important;
          box-shadow: 0 0 0 3px rgba(13, 71, 161, 0.2) !important;
        }

        :global(option) {
          background-color: #2a2a2a !important;
          color: #ffffff !important;
        }

        /* Estilizar tabelas se houver */
        :global(table) {
          width: 100% !important;
          border-collapse: collapse !important;
          background-color: #1a1a1a !important;
          border-radius: 8px !important;
          overflow: hidden !important;
        }

        :global(th), :global(td) {
          padding: 1rem !important;
          text-align: left !important;
          border-bottom: 1px solid #333 !important;
          color: #ffffff !important;
        }

        :global(th) {
          background-color: #0d47a1 !important;
          font-weight: 600 !important;
        }

        :global(tr:hover) {
          background-color: #2a2a2a !important;
        }

        /* Responsividade */
        @media (max-width: 768px) {
          .admin-header {
            flex-direction: column;
            gap: 1rem;
            text-align: center;
          }

          .user-info {
            flex-direction: column;
            width: 100%;
          }

          .user-email {
            width: 100%;
            text-align: center;
          }

          :global(.admin-content > *) {
            padding: 1rem !important;
          }
        }
      `}</style>
    </div>
  );
}