import NoteCard from "./NoteCard.jsx"

const Trash = ({notes}) => {
  return(
  <div>
    {notes
        .filter((note) => note.isTrashed === true)
        .map((note) => 
            <NoteCard 
                key={note.id}
                note = {note}
            />
    )
    }
  </div>
  )
}

export default Trash
