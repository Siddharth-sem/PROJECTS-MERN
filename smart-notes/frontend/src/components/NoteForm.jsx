import ReactMarkdown from "react-markdown"
import { useState } from "react"
import "./NoteForm.css"

const NoteForm = ({title, setTitle, content, setContent}) => {

  const [isPreview, setIsPreview] = useState(false)

  return (
    <div className="note-form">
      
      {!isPreview && (
        <input
          className="note-title-input"
          type="text"
          placeholder="Enter note title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      )}

      {!isPreview && (
        <textarea
          className="npte-content-input"
          placeholder="Write your note..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      )}
      

      {isPreview && (
        <div className="note-content-input">
          <h2><u>Preview</u></h2>
          <h2>{title}</h2>
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>  
      )}

      <button 
        className="preview-toggle-btn"
        onClick={() => setIsPreview(!isPreview)}>
        {isPreview ? "Edit" : "Preview"}
      </button>
    </div>

    
  )
}

export default NoteForm
