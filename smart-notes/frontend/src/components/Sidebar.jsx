
const Sidebar = ({ activeSection, setActiveSection }) => {
  const sections = [
    { label: "All Notes", value: "all" },
    { label: "Archived", value: "archived" },
    { label: "Trash", value: "trash" },
    { label: "Tags", value: "tags" }
  ]

  return (
    <div>
      <h1>Smart Notes</h1>

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
