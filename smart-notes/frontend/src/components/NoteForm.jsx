import ReactMarkdown from "react-markdown"
import { useState } from "react"

const NoteForm = ({title, setTitle, content, setContent}) => {

  const [isPreview, setIsPreview] = useState(false)

  return (
    <div>
      
      <input
        type="text"
        placeholder="Enter note title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {!isPreview && (
        <textarea
          placeholder="Write your note..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      )}
      

      {/* <h3>Preview</h3> */}
      {isPreview && (
        
        <ReactMarkdown>{content}</ReactMarkdown>
      )}

      <button onClick={() => setIsPreview(!isPreview)}>
        {isPreview ? "Edit" : "Preview"}
      </button>
    </div>

    
  )
}

export default NoteForm
