import { useState } from "react";
import styles from "./App.module.css";
import { GoogleGenAI } from "@google/genai";
import Chat from "./Components/Chat/Chat.jsx";
import Controls from "./Components/Controls/Controls.jsx";


console.log("API Key:", import.meta.env.VITE_GOOGLE_AI_API_KEY);
const googleai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GOOGLE_AI_API_KEY,
  
}) ;


// ✅ We'll simulate "gemini" and "chat"
const gemini = {
  async sendMessage(history) {
    const response = await googleai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: history.map((msg) => ({
        role: msg.role,
        parts: [{ text: msg.content }],
      })),
    });
    return { response: { text: response.text } };
  },
};


function App() {
  const [messages, setMessages] = useState([]);

  // Add message to the chat
  function addMessage(message) {
    setMessages((prev) => [...prev, message]);
  }

  // Handle sending user input
  async function handleContentSend(content) {
    const userMessage = { content, role: "User" };
    addMessage(userMessage);

    try {
      // Combine all previous messages + new one for chat context
      const updatedHistory = [...messages, userMessage];

      const result = await gemini.sendMessage(updatedHistory);

      addMessage({
        content: result.response.text,
        role: "assistant",
      });
    } catch (error) {
      console.error(error);
      addMessage({
        content: "⚠️ Sorry, I couldn't process your request. Please try again!",
        role: "system",
      });
    }
  }


  return (
    <>
      <div className={styles.App}>
        <header className={styles.Header}>
          <img className={styles.Logo} src="/chat-bot.png" alt="" />
          <h1 className={styles.Title}>AI Chatbot</h1>
        </header>
        <div className={styles.ChatContainer}>
          <Chat messages={messages} />
        </div>
        <Controls onSend={handleContentSend} />
      </div>
    </>
  );
}

export default App;
