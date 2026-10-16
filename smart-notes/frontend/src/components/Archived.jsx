import NoteCard from "./NoteCard"

const Archived = ({notes, archiveNote, deleteNote, editNote}) => {
  return (
    <div>
      <h2>Archived Notes</h2>

        {notes
            .filter((note) => note.isArchived === true && note.isTrashed === false)
            .map((note)=>
                <NoteCard
                    key={note.id}
                    note={note}
                    archiveNote={archiveNote}
                    deleteNote={deleteNote}
                    editNote={editNote}

                />
            )}
    </div>
  )
}

export default Archived
