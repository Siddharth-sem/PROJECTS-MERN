import ReactMarkdown from "react-markdown"
import { useState } from "react"

const NoteForm = ({title, setTitle, content, setContent}) => {

  const [isPreview, setIsPreview] = useState(false)

  return (
    <div>
      
      {!isPreview && (
        <input
          type="text"
          placeholder="Enter note title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      )}

      {!isPreview && (
        <textarea
          placeholder="Write your note..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      )}
      

      {isPreview && (
        <div>
          <h2><u>Preview</u></h2>
          <h2>{title}</h2>
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>  
      )}

      <button onClick={() => setIsPreview(!isPreview)}>
        {isPreview ? "Edit" : "Preview"}
      </button>
    </div>

    
  )
}

export default NoteForm
