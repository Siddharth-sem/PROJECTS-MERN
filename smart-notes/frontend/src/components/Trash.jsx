import NoteCard from "./NoteCard.jsx"

const Trash = ({notes, deleteNote}) => {
  return(
  <div>
    {notes
        .filter((note) => note.isTrashed === true)
        .map((note) => 
            <NoteCard 
                key={note.id}
                note = {note}
                deleteNote={deleteNote}
            />
    )
    }
  </div>
  )
}

export default Trash
