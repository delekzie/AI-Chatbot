import React from 'react'
import styles from "./Controls.module.css"
import { useState } from 'react'  

function Controls({ onSend }) {

  const [content, setContent] = useState("")

  // Function for handling textarea change
  function handleContentChange(event) {
    setContent(event.target.value)
  }

// Funtion for handling send button click
  function handleContentSend() {
    if (content.length > 0) {
      onSend(content)
      setContent("")
    }
  }

  function handleEnterPress(event) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault()
      handleContentSend()
    }
  }

  return (
	<div className={styles.Controls}>
    <div className={styles.TextAreaContainer}>
      <textarea className={styles.TextArea}
       placeholder='Message AI Chatbot' 
       value={content}
       onChange={handleContentChange}
       onKeyDown={handleEnterPress} ></textarea> 
    </div>

    <button className={styles.Button} 
     onClick={handleContentSend}>
      <img src="/Send.png" alt="" />
    </button>
  </div>
  )
}

export default Controls