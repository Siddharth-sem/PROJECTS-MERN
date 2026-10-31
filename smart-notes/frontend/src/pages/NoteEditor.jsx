
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useNotes } from "../context/useNotes";
import "./NotePreview.css";

const NoteEditor = ({ theme, toggleTheme }) => {
  const navigate = useNavigate();
  const { addNote } = useNotes();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");

  const contentRef = useRef(null);

  const formatText = (before, after = before) => {
    const textarea = contentRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    const selected = selectedText || "text";

    const replacement = `${before}${selected}${after}`;

    const newContent =
      content.substring(0, start) +
      replacement +
      content.substring(end);

    setContent(newContent);

    requestAnimationFrame(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + before.length,
        start + before.length + selected.length
      );
    });
  };

  const insertLine = (prefix) => {
    const textarea = contentRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const lineStart = content.lastIndexOf("\n", start - 1) + 1;

    const newContent =
      content.substring(0, lineStart) +
      prefix +
      content.substring(lineStart);

    setContent(newContent);

    requestAnimationFrame(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + prefix.length,
        start + prefix.length
      );
    });
  };

  const handleSave = () => {
    if (!title.trim() || !content.trim()) {
      alert("Please enter both title and content.");
      return;
    }

    const cleanTags = [
      ...new Map(
        tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean)
          .map((tag) => [
            tag.toLowerCase(),
            tag.charAt(0).toUpperCase() +
              tag.slice(1).toLowerCase(),
          ])
      ).values(),
    ];

    const newNoteId = addNote({
      title: title.trim(),
      content,
      tags: cleanTags,
    });

    navigate(`/notes/${newNoteId}`);
  };

  return (
    <main className="note-preview-page">
      <header className="note-preview-toolbar">
        <button
          className="preview-back-btn"
          onClick={() => navigate("/dashboard")}
        >
          ← Back
        </button>

        <div className="preview-header-actions">
          <button
            className="preview-action-btn"
            onClick={toggleTheme}
          >
            {theme === "light" ? "🌙 Theme" : "☀️ Theme"}
          </button>

          <button
            className="preview-save-btn"
            onClick={handleSave}
          >
            Save Note
          </button>
        </div>
      </header>

      <div className="preview-tags-row">
        <label htmlFor="new-note-tags">Tags</label>

        <input
          id="new-note-tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="Add tags separated by commas"
        />
      </div>

      <section className="note-preview-content">
        <input
          className="preview-title-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Untitled Note"
          autoFocus
        />

        <textarea
          ref={contentRef}
          className="preview-editor-textarea"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Start writing your note..."
        />

        <div className="markdown-toolbar">
          <button onClick={() => formatText("**")}>
            <strong>B</strong>
          </button>

          <button onClick={() => formatText("*")}>
            <em>I</em>
          </button>

          <button onClick={() => insertLine("# ")}>
            H1
          </button>

          <button onClick={() => insertLine("## ")}>
            H2
          </button>

          <button onClick={() => insertLine("- ")}>
            • List
          </button>

          <button onClick={() => insertLine("1. ")}>
            1. List
          </button>

          <button onClick={() => formatText("`")}>
            {"</>"}
          </button>

          <button
            onClick={() =>
              formatText("[", "](https://example.com)")
            }
          >
            Link
          </button>
        </div>
      </section>
    </main>
  );
};

export default NoteEditor;