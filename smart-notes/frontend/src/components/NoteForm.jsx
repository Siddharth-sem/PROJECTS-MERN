

const NoteForm = ({title, setTitle, content, setContent}) => {
  return (
    <div>
      
      <input
        type="text"
        placeholder="Enter note title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Write your note..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
    </div>
  )
}

export default NoteForm
