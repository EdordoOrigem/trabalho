// components/AdminContent.jsx
import { useEffect, useState } from "react";
import {
  addDoc, collection, deleteDoc,
  doc, onSnapshot, orderBy, query, updateDoc, where
} from "firebase/firestore";
import { db } from "../lib/firebase";

export default function AdminContent({ user }) {
  const [tarefaInput, setTarefaInput] = useState('');
  const [tarefas, setTarefas] = useState([]);
  const [edit, setEdit] = useState(null);

  useEffect(() => {
    const tarefaRef = collection(db, "tarefas");
    const q = query(tarefaRef, orderBy("created", "desc"), where("userUid", "==", user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const lista = [];
      snapshot.forEach((doc) => {
        lista.push({ id: doc.id, ...doc.data() });
      });
      setTarefas(lista);
    });

    return () => unsubscribe();
  }, [user.uid]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!tarefaInput.trim()) {
      alert("Digite sua tarefa");
      return;
    }

    try {
      if (edit) {
        const docRef = doc(db, "tarefas", edit.id);
        await updateDoc(docRef, { 
          tarefa: tarefaInput.trim(),
          updated: new Date()
        });
        setEdit(null);
      } else {
        await addDoc(collection(db, "tarefas"), {
          tarefa: tarefaInput.trim(),
          created: new Date(),
          userUid: user.uid,
        });
      }
      setTarefaInput('');
    } catch (error) {
      console.error("Erro ao salvar tarefa:", error);
      alert("Erro ao salvar tarefa. Tente novamente.");
    }
  }

  async function handleDelete(id) {
    if (window.confirm("Tem certeza que deseja excluir esta tarefa?")) {
      try {
        await deleteDoc(doc(db, "tarefas", id));
      } catch (error) {
        console.error("Erro ao deletar tarefa:", error);
        alert("Erro ao deletar tarefa. Tente novamente.");
      }
    }
  }

  function handleEdit(item) {
    setEdit(item);
    setTarefaInput(item.tarefa);
  }

  function handleCancelEdit() {
    setEdit(null);
    setTarefaInput('');
  }

  return (
    <div className="admin-content">
      {/* Formulário de Tarefa */}
      <div className="task-form-container">
        <h2 className="section-title">
          {edit ? "✏️ Editar Tarefa" : "➕ Nova Tarefa"}
        </h2>
        
        <form onSubmit={handleSubmit} className="task-form">
          <label className="form-label">
            {edit ? "Edite sua tarefa:" : "Digite uma nova tarefa:"}
          </label>
          
          <textarea
            className="form-textarea"
            value={tarefaInput}
            onChange={(e) => setTarefaInput(e.target.value)}
            placeholder={edit ? "Edite o texto da tarefa..." : "Ex: Reunião às 14h, Comprar mantimentos..."}
            rows="3"
          />
          
          <div className="form-buttons">
            <button 
              type="submit" 
              className={`btn ${edit ? 'btn-primary' : 'btn-success'}`}
            >
              {edit ? "💾 Atualizar Tarefa" : "✅ Registrar Tarefa"}
            </button>
            
            {edit && (
              <button 
                type="button" 
                onClick={handleCancelEdit}
                className="btn btn-secondary"
              >
                ❌ Cancelar
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Lista de Tarefas */}
      <div className="tasks-container">
        <h2 className="section-title">
          📋 Suas Tarefas ({tarefas.length})
        </h2>
        
        {tarefas.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📝</div>
            <h3>Nenhuma tarefa cadastrada</h3>
            <p>Comece criando sua primeira tarefa acima!</p>
          </div>
        ) : (
          <div className="tasks-list">
            {tarefas.map((item, index) => (
              <div key={item.id} className={`task-item ${edit?.id === item.id ? 'editing' : ''}`}>
                <div className="task-content">
                  <div className="task-number">#{index + 1}</div>
                  <div className="task-text">
                    <p className="task-description">{item.tarefa}</p>
                    <small className="task-date">
                      📅 Criado em: {item.created?.toDate ? 
                        item.created.toDate().toLocaleString('pt-BR') : 
                        'Data não disponível'
                      }
                    </small>
                  </div>
                </div>
                
                <div className="task-actions">
                  <button 
                    onClick={() => handleEdit(item)} 
                    className="btn btn-edit"
                    title="Editar tarefa"
                  >
                    ✏️ Editar
                  </button>
                  <button 
                    onClick={() => handleDelete(item.id)} 
                    className="btn btn-delete"
                    title="Excluir tarefa"
                  >
                    🗑️ Excluir
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        .admin-content {
          color: #ffffff;
          max-width: 100%;
        }

        /* Estilo do Formulário */
        .task-form-container {
          background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
          border-radius: 12px;
          padding: 2rem;
          margin-bottom: 2rem;
          border: 1px solid #333;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
        }

        .section-title {
          color: #0d47a1 !important;
          font-size: 1.4rem;
          font-weight: 600;
          margin-bottom: 1.5rem;
          text-align: center;
          text-shadow: 0 2px 4px rgba(13, 71, 161, 0.3);
        }

        .task-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .form-label {
          color: #ffffff !important;
          font-weight: 500;
          font-size: 1rem;
          margin-bottom: 0.5rem;
        }

        .form-textarea {
          background: linear-gradient(135deg, #2a2a2a 0%, #3a3a3a 100%) !important;
          border: 2px solid #444 !important;
          color: #ffffff !important;
          padding: 1rem !important;
          border-radius: 8px !important;
          resize: vertical !important;
          min-height: 100px !important;
          font-size: 1rem !important;
          line-height: 1.5 !important;
          transition: all 0.3s ease !important;
          width: 100% !important;
          box-sizing: border-box !important;
        }

        .form-textarea::placeholder {
          color: #888 !important;
          opacity: 1 !important;
        }

        .form-textarea:focus {
          outline: none !important;
          border-color: #0d47a1 !important;
          box-shadow: 0 0 0 3px rgba(13, 71, 161, 0.2) !important;
          background: linear-gradient(135deg, #3a3a3a 0%, #4a4a4a 100%) !important;
        }

        .form-buttons {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        /* Estilo dos Botões */
        .btn {
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-size: 0.9rem;
          font-weight: 500;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          white-space: nowrap;
        }

        .btn-success {
          background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
          color: white;
          box-shadow: 0 2px 8px rgba(40, 167, 69, 0.3);
        }

        .btn-success:hover {
          background: linear-gradient(135deg, #218838 0%, #1ea085 100%);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(40, 167, 69, 0.4);
        }

        .btn-primary {
          background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
          color: white;
          box-shadow: 0 2px 8px rgba(0, 123, 255, 0.3);
        }

        .btn-primary:hover {
          background: linear-gradient(135deg, #0056b3 0%, #004085 100%);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 123, 255, 0.4);
        }

        .btn-secondary {
          background: linear-gradient(135deg, #6c757d 0%, #545b62 100%);
          color: white;
          box-shadow: 0 2px 8px rgba(108, 117, 125, 0.3);
        }

        .btn-secondary:hover {
          background: linear-gradient(135deg, #545b62 0%, #495057 100%);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(108, 117, 125, 0.4);
        }

        /* Container das Tarefas */
        .tasks-container {
          background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
          border-radius: 12px;
          padding: 2rem;
          border: 1px solid #333;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
        }

        /* Estado Vazio */
        .empty-state {
          text-align: center;
          padding: 3rem 1rem;
          color: #888;
        }

        .empty-icon {
          font-size: 4rem;
          margin-bottom: 1rem;
        }

        .empty-state h3 {
          color: #ccc !important;
          margin-bottom: 0.5rem;
          font-size: 1.2rem;
        }

        .empty-state p {
          color: #888 !important;
          font-size: 1rem;
        }

        /* Lista de Tarefas */
        .tasks-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .task-item {
          background: linear-gradient(135deg, #2a2a2a 0%, #3a3a3a 100%);
          border: 2px solid #444;
          border-radius: 10px;
          padding: 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          transition: all 0.3s ease;
          position: relative;
        }

        .task-item:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
          border-color: #555;
        }

        .task-item.editing {
          border-color: #0d47a1;
          box-shadow: 0 0 0 2px rgba(13, 71, 161, 0.2);
        }

        .task-content {
          flex: 1;
          display: flex;
          gap: 1rem;
          align-items: flex-start;
        }

        .task-number {
          background: #0d47a1;
          color: white;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.8rem;
          font-weight: bold;
          flex-shrink: 0;
        }

        .task-text {
          flex: 1;
        }

        .task-description {
          color: #ffffff !important;
          font-size: 1rem;
          line-height: 1.5;
          margin-bottom: 0.5rem;
          word-wrap: break-word;
        }

        .task-date {
          color: #888 !important;
          font-size: 0.85rem;
          display: block;
        }

        .task-actions {
          display: flex;
          gap: 0.5rem;
          flex-shrink: 0;
        }

        .btn-edit {
          background: linear-gradient(135deg, #ffc107 0%, #e0a800 100%);
          color: #000;
          padding: 0.5rem 1rem;
          font-size: 0.8rem;
          box-shadow: 0 2px 6px rgba(255, 193, 7, 0.3);
        }

        .btn-edit:hover {
          background: linear-gradient(135deg, #e0a800 0%, #d39e00 100%);
          transform: translateY(-1px);
          box-shadow: 0 3px 8px rgba(255, 193, 7, 0.4);
        }

        .btn-delete {
          background: linear-gradient(135deg, #dc3545 0%, #c82333 100%);
          color: white;
          padding: 0.5rem 1rem;
          font-size: 0.8rem;
          box-shadow: 0 2px 6px rgba(220, 53, 69, 0.3);
        }

        .btn-delete:hover {
          background: linear-gradient(135deg, #c82333 0%, #bd2130 100%);
          transform: translateY(-1px);
          box-shadow: 0 3px 8px rgba(220, 53, 69, 0.4);
        }

        /* Responsividade */
        @media (max-width: 768px) {
          .task-form-container,
          .tasks-container {
            padding: 1rem;
          }

          .task-item {
            flex-direction: column;
            gap: 1rem;
          }

          .task-actions {
            width: 100%;
            justify-content: center;
          }

          .form-buttons {
            flex-direction: column;
          }

          .btn {
            justify-content: center;
          }
        }

        @media (max-width: 480px) {
          .task-content {
            flex-direction: column;
            gap: 0.5rem;
          }

          .task-number {
            align-self: flex-start;
          }
        }
      `}</style>
    </div>
  );
}