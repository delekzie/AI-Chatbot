import { useState } from "react";
import styles from "./App.module.css";
import Chat  from "./Components/Chat/Chat.jsx"
import Controls from "./Components/Controls/Controls.jsx";
function App() {
  
  const [messages, setMessages] = useState([])

    function handleContentSend(content) {
     setMessages((prevMessages) => [...prevMessages,  { content, role: 'User' } ])
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
