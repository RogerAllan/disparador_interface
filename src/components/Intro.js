import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/AdminPanel.module.css';
import Image from 'next/image';

const AdminPanel = () => {
  const [healthStatus, setHealthStatus] = useState(null);
  const [webhookStatus, setWebhookStatus] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(1);
  const [users, setUsers] = useState([]);
  const [images, setImages] = useState([]);
  const [broadcastMessage, setBroadcastMessage] = useState('');
  const [broadcastLevel, setBroadcastLevel] = useState(1);

  const API_BASE_URL = 'http://localhost:5000';

  // Verificar saúde do sistema
  const checkHealth = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/health`);
      setHealthStatus(response.data);
    } catch (error) {
      setHealthStatus({ status: 'unhealthy', error: error.message });
    }
  };

  // Verificar webhook
  const checkWebhook = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/webhook`);
      setWebhookStatus(response.status === 200 ? 'Webhook funcionando' : 'Webhook com problemas');
    } catch (error) {
      setWebhookStatus(`Erro no webhook: ${error.message}`);
    }
  };

  // Manipular upload de arquivo
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // Enviar imagem
  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('level', selectedLevel);

    try {
      const response = await axios.post(`${API_BASE_URL}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setUploadStatus(response.data.message);
      fetchImages();
    } catch (error) {
      setUploadStatus(`Erro no upload: ${error.response?.data?.error || error.message}`);
    }
  };

  // Buscar usuários
  const fetchUsers = async () => {
    try {
      // Nota: Você precisará implementar uma rota GET /api/users no backend
      const response = await axios.get(`${API_BASE_URL}/users`);
      setUsers(response.data);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    }
  };

  // Buscar imagens
  const fetchImages = async () => {
    try {
      // Nota: Você precisará implementar uma rota GET /api/images no backend
      const response = await axios.get(`${API_BASE_URL}/api/images`);
      setImages(response.data);
    } catch (error) {
      console.error('Erro ao buscar imagens:', error);
    }
  };

  // Enviar broadcast
  const sendBroadcast = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/broadcast`, {
        message: broadcastMessage,
        level: broadcastLevel
      });
      alert(response.data.message);
    } catch (error) {
      alert(`Erro no broadcast: ${error.response?.data?.error || error.message}`);
    }
  };

  // Efeito para carregar dados iniciais
  useEffect(() => {
    checkHealth();
    checkWebhook();
    fetchUsers();
    fetchImages();
  }, []);

  return (
    <div className={styles.adminPanel}>
      <h1>Painel de Administração Solares</h1>
      
      <section className={styles.statusSection}>
        <h2>Status do Sistema</h2>
        <button onClick={checkHealth}>
          <a href={`${API_BASE_URL}/health`} target="_blank" rel="noopener noreferrer" color='black'>
          Verificar Saúde
          </a></button>
        {healthStatus && (
          <div>
            <p>Status: {healthStatus.status}</p>
            {healthStatus.database && <p>Banco de dados: {healthStatus.database}</p>}
            {healthStatus.pool_stats && (
              <div>
                <p>Conexões máximas: {healthStatus.pool_stats.max_connections}</p>
                <p>Conexões disponíveis: {healthStatus.pool_stats.available}</p>
              </div>
            )}
          </div>
        )}
        
        <button onClick={checkWebhook}>Verificar Webhook</button>
        {webhookStatus && <p>{webhookStatus}</p>}
      </section>

      <section className={styles.uploadSection}>
        <h2>Upload de Imagens</h2>
        <div>
          <label>
            Nível:
            <select value={selectedLevel} onChange={(e) => setSelectedLevel(e.target.value)}>
              <option value="1">Nível 1</option>
              <option value="2">Nível 2</option>
              <option value="3">Nível 3</option>
            </select>
          </label>
        </div>
        <div>
          <input type="file" onChange={handleFileChange} />
          <button onClick={handleUpload}>Enviar Imagem</button>
        </div>
        {uploadStatus && <p>{uploadStatus}</p>}
        
        <h3>Imagens Cadastradas</h3>
        <div className={styles.imageGrid}>
          {images.map(image => (
            <div key={image.id} className={styles.imageCard}>
              <Image 
                src={`${API_BASE_URL}${image.url}`} 
                alt={`Imagem nível ${image.level}`} 
                className={styles.imageThumbnail}
                width={200} // Adjust width as needed
                height={200} // Adjust height as needed
              />
              <p>Nível: {image.level}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.usersSection}>
        <h2>Gerenciamento de Usuários</h2>
        <button onClick={fetchUsers}>Atualizar Lista</button>
        <table className={styles.usersTable}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nível</th>
              <th>Tentativas</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.role}</td>
                <td>{user.validation_attempts}</td>
                <td>
                  <button onClick={() => {/* Implementar ação */}}>
                    Resetar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className={styles.broadcastSection}>
        <h2>Envio de Broadcast</h2>
        <div>
          <label>
            Nível:
            <select 
              value={broadcastLevel} 
              onChange={(e) => setBroadcastLevel(e.target.value)}
            >
              <option value="1">Nível 1</option>
              <option value="2">Nível 2</option>
              <option value="3">Nível 3</option>
            </select>
          </label>
        </div>
        <div>
          <textarea
            value={broadcastMessage}
            onChange={(e) => setBroadcastMessage(e.target.value)}
            placeholder="Digite a mensagem de broadcast..."
            rows={4}
          />
        </div>
        <button onClick={sendBroadcast}>Enviar Broadcast</button>
      </section>
    </div>
  );
};

export default AdminPanel;