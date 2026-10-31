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
  const savingRef = useRef(false);

  // Format selected text
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

  // Insert heading or list prefix
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

  // Clean and format tags
  const getCleanTags = () => {
    return [
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
  };

  // Save note
  const handleSave = () => {
    if (savingRef.current) return;

    if (!title.trim() || !content.trim()) {
      alert("Please enter both title and content.");
      return;
    }

    savingRef.current = true;

    try {
      const newNoteId = addNote({
        title: title.trim(),
        content: content,
        tags: getCleanTags(),
      });

      navigate(`/notes/${newNoteId}`, { replace: true });
    } catch (error) {
      console.error("Error saving note:", error);
      alert("Unable to save note. Please try again.");
      savingRef.current = false;
    }
  };

  // Go back
  const handleBack = () => {
    const hasContent =
      title.trim() || content.trim() || tags.trim();

    if (hasContent) {
      const confirmDiscard = window.confirm(
        "Are you sure you want to discard this note?"
      );

      if (!confirmDiscard) return;
    }

    navigate("/dashboard");
  };

  return (
    <main className="note-preview-page">
      <header className="note-preview-toolbar">
        <button
          type="button"
          className="preview-back-btn"
          onClick={handleBack}
        >
          ← Back
        </button>

        <div className="preview-header-actions">
          <button
            type="button"
            className="preview-action-btn"
            onClick={toggleTheme}
          >
            {theme === "light" ? "🌙 Theme" : "☀️ Theme"}
          </button>

          <button
            type="button"
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
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="Add tags separated by commas"
        />
      </div>

      <section className="note-preview-content">
        <input
          type="text"
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
          <button
            type="button"
            title="Bold"
            onClick={() => formatText("**")}
          >
            <strong>B</strong>
          </button>

          <button
            type="button"
            title="Italic"
            onClick={() => formatText("*")}
          >
            <em>I</em>
          </button>

          <button
            type="button"
            title="Heading 1"
            onClick={() => insertLine("# ")}
          >
            H1
          </button>

          <button
            type="button"
            title="Heading 2"
            onClick={() => insertLine("## ")}
          >
            H2
          </button>

          <button
            type="button"
            title="Bullet list"
            onClick={() => insertLine("- ")}
          >
            • List
          </button>

          <button
            type="button"
            title="Numbered list"
            onClick={() => insertLine("1. ")}
          >
            1. List
          </button>

          <button
            type="button"
            title="Inline code"
            onClick={() => formatText("`")}
          >
            {"</>"}
          </button>

          <button
            type="button"
            title="Insert link"
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