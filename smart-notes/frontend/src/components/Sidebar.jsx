import { Link } from "react-router-dom";

const Sidebar = ({ activeSection, setActiveSection }) => {
  const sections = [
    { label: "All Notes", value: "all" },
    { label: "Archived", value: "archived" },
    { label: "Trash", value: "trash" },
    { label: "Tags", value: "tags" },
  ];

  return (
    <aside className="sidebar">
      <h1 className="sidebar-logo">Smart Notes</h1>

      <nav className="sidebar-nav">
        {sections.map((section) => (
          <button
            key={section.value}
            className={`sidebar-link ${
              activeSection === section.value ? "active" : ""
            }`}
            onClick={() => setActiveSection(section.value)}
          >
            {section.label}
          </button>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <Link to="/login" className="sidebar-link">
          Login
        </Link>

        <Link to="/register" className="sidebar-link">
          Register
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;