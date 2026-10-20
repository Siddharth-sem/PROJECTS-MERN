
const Sidebar = ({ activeSection, setActiveSection }) => {
  const sections = [
    { label: "All Notes", value: "all" },
    { label: "Pinned", value: "pinned" },
    { label: "Archived", value: "archived" },
    { label: "Trash", value: "trash" }
  ]

  return (
    <div>
      <h2>Smart Notes</h2>

      {sections.map((section) => (
        <button
          key={section.value}
          onClick={() => setActiveSection(section.value)}
          style={{
            fontWeight:
              activeSection === section.value
                ? "bold"
                : "normal"
          }}
        >
          {section.label}
        </button>
      ))}
    </div>
  )
}

export default Sidebar
