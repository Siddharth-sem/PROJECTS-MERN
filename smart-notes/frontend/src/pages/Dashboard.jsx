import { useState , useEffect} from "react"

// import NavBar from "../components/NavBar"
import Sidebar from "../components/Sidebar"
import SearchBar from "../components/SearchBar"
import NotesList from "../components/NotesList"
import Trash from "../components/Trash"
import Archived from "../components/Archived"
import NoteForm from "../components/NoteForm"
import NoteCard from "../components/NoteCard"


const Dashboard = () => {

  const [edit, setEdit] = useState(null)

  const [editTags, setEditTags] = useState("");

  const [search, setSearch] =useState("")

  const [activeSection, setActiveSection] = useState("all")

  const [selectedTag, setSelectedTag] = useState(null)

  
  const [notes, setNotes] = useState(() => {
    try {
      const savedNotes = localStorage.getItem("smart-notes");

      if (savedNotes === null) {
        return [];
      }

      const parsedNotes = JSON.parse(savedNotes);

      if (!Array.isArray(parsedNotes)) {
        console.error("Saved notes data is not an array.");
        return [];
      }

      const validNotes = parsedNotes.filter(
        (note) =>
          note &&
          typeof note === "object" &&
          !Array.isArray(note) &&
          typeof note.id === "number" &&
          typeof note.title === "string" &&
          typeof note.content === "string" &&
          Array.isArray(note.tags)
      );

      return validNotes;
    } catch (error) {
      console.error("Failed to load notes:", error);
      return [];
    }
  });


  const allTags = [
    ...new Map(
      notes
        .flatMap((note) =>
          Array.isArray(note.tags) ? note.tags : []
        )
        .map((tag) => {
          const cleanTag = tag.trim();
          const key = cleanTag.toLowerCase();
          const displayTag =
            cleanTag.charAt(0).toUpperCase() +
            cleanTag.slice(1).toLowerCase();

          return [key, displayTag];
        })
    ).values()
  ]

  useEffect(() => {
  localStorage.setItem("smart-notes", JSON.stringify(notes))
  }, [notes])



// remove the notes nad move to trash
const deleteNote = (noteId) => {
  setNotes(
    (currNotes) => currNotes.map((note) => {

      if (note.id === noteId) {
        return {
          ...note,
          isTrashed: !note.isTrashed
        }
      }

       return note
    })
  )

}

// make the note archived
const archiveNote = (noteId) => {
  setNotes(
    (currNotes) => currNotes.map((note) => {
       if (note.id === noteId) {
          return {
            ...note,
            isArchived: !note.isArchived
          }
        }

        return note
    })
  )
}


// permanently delete the note from trash
const permanentDelete = (noteId) => {
  setNotes(
    (currNotes) => currNotes.filter((note) => note.id !== noteId)
  )
}

// pin the note
  const togglePin = (noteId) => {

    setNotes(
      (currNotes) => currNotes.map((note) => {

        if (note.id === noteId) {
          return {
            ...note,
            isPinned: !note.isPinned
          }
        }

        return note
      })
    )
  }

// edit a note
const editNote =(noteId)=> {
  const selNote = notes.find(
    (note) => note.id === noteId
  )
  setEdit(selNote)
  setEditTags(selNote.tags.join(", "));
}

// save the edited note

const saveEdit = () => {
  if (!edit.title.trim() || !edit.content.trim()) {
    alert("Please enter both title and content");
    return;
  }
  setNotes((currNotes) =>
    currNotes.map((note) =>
      note.id === edit.id
      ? {
          ...edit,
          tags: [
            ...new Map(
              editTags
                .split(",")
                .map((tag) => tag.trim())
                .filter((tag) => tag !== "")
                .map((tag) => [
                  tag.toLowerCase(),
                  tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase()
                ])
            ).values()
          ]
        }
      : note
    )
  )

  setEdit(null)
  setEditTags("")
}

const handleSectionChange = (section) => {
  setEdit(null);
  setEditTags("");
  setActiveSection(section);
};

  return (

    
    <div>

      <Sidebar
        activeSection={activeSection}
        setActiveSection={handleSectionChange}
      />

      <SearchBar 
        search={search}
        setSearch={setSearch}
      />

      <h2>
        {activeSection === "all" && "All Notes"}
        {activeSection === "pinned" && "Pinned Notes"}
        {activeSection === "archived" && "Archived Notes"}
        {activeSection === "trash" && "Trash"}
        {activeSection === "tags" && "Tags"}
      </h2>

      {activeSection === "tags" && (
      <div>
        {allTags.map((tag) => (
          <button 
          key={tag}
          onClick={()=> setSelectedTag(tag)}
          >
            {tag}
          </button>
        ))}
      </div>
      )}

      {activeSection === "tags" && selectedTag && (
      <div>
        <h3><u>{selectedTag} Notes</u></h3>

        {notes
          .filter((note) => note.tags.some(
                                        (tag) => tag.trim().toLowerCase() === selectedTag.toLowerCase()
                                      ) 
                                      && note.isTrashed === false 
                                      && note.isArchived === false)
          .map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              togglePin={togglePin}
              deleteNote={deleteNote}
              permanentDelete={permanentDelete}
              editNote={editNote}
              archiveNote={archiveNote}
            />
          ))}
      </div>
      )}

      {activeSection === "all" && (
      <NotesList
        notes={notes}
        setNotes={setNotes}
        deleteNote={deleteNote}
        editNote={editNote}
        search={search}
        archiveNote={archiveNote}
        togglePin={togglePin}
      />
      )}
      {edit && activeSection !== "trash" &&(
      <div>
        <h2>Edit Note</h2>
      
      <NoteForm
        key={edit.id}
        title={edit.title}
        setTitle={(newTitle) =>
          setEdit({ ...edit, title: newTitle })
        }
        content={edit.content}
        setContent={(newContent) =>
          setEdit({ ...edit, content: newContent })
        }
      />
      <input
        type="text"
        placeholder="Enter tags (comma separated)"
        value={editTags}
        onChange={(e) => setEditTags(e.target.value)}
      />

      <button onClick={saveEdit }>
        Save Changes
      </button>
      <button onClick={() => {
        setEdit(null)
        setEditTags("")
      }}>
        Cancel
      </button>
      </div>
      )}
  

      {activeSection === "trash" && (
      <Trash
        notes={notes}
        deleteNote={deleteNote}
        permanentDelete={permanentDelete}
      />
      )}

      
      {activeSection === "archived" && (
        
      <Archived
        notes={notes}
        archiveNote={archiveNote}
        deleteNote={deleteNote}
        editNote={editNote}
      />
      )}
    </div>
  )
}

export default Dashboard
