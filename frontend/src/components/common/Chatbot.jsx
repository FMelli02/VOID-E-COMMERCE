import React, { useState, useEffect, useRef } from 'react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [sessionId, setSessionId] = useState('');
  const messagesEndRef = useRef(null);

  // Genera un ID de sesión único cuando el componente se monta por primera vez
  useEffect(() => {
    setSessionId(`web-session-${Date.now()}`);
    setMessages([{ sender: 'bot', text: '¡Hola! Soy Jarvis, tu asistente de ventas. ¿En qué puedo ayudarte?' }]);
  }, []);

  // Para scrollear automáticamente al último mensaje
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage = { sender: 'user', text: inputValue };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    try {
      const response = await fetch('http://127.0.0.1:8000/api/chatbot/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sesion_id: sessionId,
          pregunta: inputValue,
        }),
      });

      if (!response.ok) throw new Error('Jarvis no está disponible en este momento.');

      const data = await response.json();
      const botMessage = { sender: 'bot', text: data.respuesta };
      setMessages(prev => [...prev, botMessage]);

    } catch (error) {
      console.error("Error al contactar al chatbot:", error);
      const errorMessage = { sender: 'bot', text: 'Disculpá, estoy teniendo problemas técnicos.' };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  return (
    <div className="chatbot-container">
      <div className={`chatbot-window ${isOpen ? 'open' : ''}`}>
        <div className="chatbot-header">
          <h3>Asistente VOID</h3>
          <button onClick={() => setIsOpen(false)}>&times;</button>
        </div>
        <div className="chatbot-messages">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender}`}>
              {msg.text}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <form className="chatbot-input-form" onSubmit={handleSendMessage}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Escribí tu consulta..."
          />
          <button type="submit">Enviar</button>
        </form>
      </div>
      <button className="chatbot-toggle-button" onClick={() => setIsOpen(!isOpen)}>
        ?
      </button>
    </div>
  );
};

export default Chatbot;