import { useState } from "react";
import Sidebar from "../components/Sidebar";
import SearchBar from "../components/SearchBar";
import NotesList from "../components/NotesList";
import Trash from "../components/Trash";
import Archived from "../components/Archived";
import NoteCard from "../components/NoteCard";
import { useNotes } from "../context/useNotes";

const Dashboard = () => {
  const {
    notes,
    togglePin,
    toggleArchive,
    toggleTrash,
    permanentDelete,
  } = useNotes();

  const [search, setSearch] = useState("");
  const [activeSection, setActiveSection] = useState("all");
  const [selectedTag, setSelectedTag] = useState(null);

  const allTags = [
    ...new Map(
      notes
        .flatMap((note) => note.tags || [])
        .map((tag) => {
          const cleanTag = tag.trim();
          const key = cleanTag.toLowerCase();
          const displayTag =
            cleanTag.charAt(0).toUpperCase() +
            cleanTag.slice(1).toLowerCase();

          return [key, displayTag];
        })
    ).values(),
  ];

  const handleSectionChange = (section) => {
    setActiveSection(section);
    setSelectedTag(null);
    setSearch("");
  };

  return (
    <div className="dashboard-layout">
      <Sidebar
        activeSection={activeSection}
        setActiveSection={handleSectionChange}
      />

      <main className="dashboard-main">
        <SearchBar search={search} setSearch={setSearch} />

        <h2>
          {activeSection === "all" && "All Notes"}
          {activeSection === "archived" && "Archived Notes"}
          {activeSection === "trash" && "Trash"}
          {activeSection === "tags" && "Tags"}
        </h2>

        {activeSection === "all" && (
          <NotesList
            notes={notes}
            search={search}
            togglePin={togglePin}
            toggleArchive={toggleArchive}
            toggleTrash={toggleTrash}
          />
        )}

        {activeSection === "tags" && (
          <>
            <div className="tag-filter-list">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>

            {selectedTag && (
              <>
                <h3>{selectedTag} Notes</h3>

                <div className="notes-grid">
                  {notes
                    .filter(
                      (note) =>
                        note.tags.some(
                          (tag) =>
                            tag.toLowerCase() ===
                            selectedTag.toLowerCase()
                        ) &&
                        !note.isTrashed &&
                        !note.isArchived
                    )
                    .map((note) => (
                      <NoteCard
                        key={note.id}
                        note={note}
                        togglePin={togglePin}
                        toggleArchive={toggleArchive}
                        toggleTrash={toggleTrash}
                      />
                    ))}
                </div>
              </>
            )}
          </>
        )}

        {activeSection === "archived" && (
          <Archived
            notes={notes}
            toggleArchive={toggleArchive}
            toggleTrash={toggleTrash}
          />
        )}

        {activeSection === "trash" && (
          <Trash
            notes={notes}
            toggleTrash={toggleTrash}
            permanentDelete={permanentDelete}
          />
        )}
      </main>
    </div>
  );
};

export default Dashboard;