import NoteCard from "./NoteCard.jsx"

const Trash = ({notes, deleteNote, permanentDelete}) => {
  return(
  <div>
    {notes
        .filter((note) => note.isTrashed === true)
        .map((note) => 
            <NoteCard 
                key={note.id}
                note = {note}
                deleteNote={deleteNote}
                permanentDelete={permanentDelete}
            />
    )
    }
  </div>
  )
}

export default Trash
