import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2, Pencil, Plus, X, LogOut } from "lucide-react";

function authHeaders(extra = {}) {
  const token = localStorage.getItem("token");
  return {
    ...extra,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}
export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [newNote, setNewNote] = useState({
    userId: "",
    title: "",
    content: "",
  });
  const [selectedNote, setSelectedNote] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editNote, setEditNote] = useState({
    userId: "",
    title: "",
    content: "",
  });
  const navigate = useNavigate();

  useEffect(function () {
    async function getNotes() {
      setLoading(true);

      try {
        const response = await fetch("http://localhost:3000/notes", {
          method: "GET",
          headers: authHeaders(),
        });

        const result = await response.json();

        if (response.ok) {
          setNotes(result.data);
        } else {
          setMessage(result.message);
        }
      } catch (error) {
        setMessage("Failed to connect to server", error);
      }

      setLoading(false);
    }
    getNotes();
  }, []);
  useEffect(
    function () {
      if (isModalOpen) {
        const raf = requestAnimationFrame(function () {
          setModalVisible(true);
        });
        return function () {
          cancelAnimationFrame(raf);
        };
      }
    },
    [isModalOpen],
  );

  async function handleAddNote() {
    if (!newNote.title.trim() && !newNote.content.trim()) {
      setIsAdding(false);
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userLogin");
      const response = await fetch("http://localhost:3000/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: userId,
          title: newNote.title,
          content: newNote.content,
        }),
      });

      const result = await response.json();
      if (!response.ok) {
        setMessage(result.message);
        return;
      }
      setNotes(function (prev) {
        return [result.result, ...prev];
      });
      setNewNote({
        title: "",
        content: "",
      });
      setIsAdding(false);
    } catch (error) {
      console.error(error);
      setMessage("Failed to connect to server");
    }
  }

  async function handleDelete() {
    try {
      const response = await fetch(
        `http://localhost:3000/notes/${selectedNote.id}`,
        {
          method: "DELETE",
          headers: authHeaders(),
        },
      );

      const result = await response.json();

      if (!response.ok) {
        setMessage(result.message);
        return;
      }

      setNotes(function (prev) {
        return prev.filter(function (note) {
          return note.id !== selectedNote.id;
        });
      });

      closeModal();
    } catch {
      setMessage("Failed to delete note");
    }
  }

  function openModal(note) {
    setSelectedNote(note);

    setEditNote({
      title: note.title,
      content: note.content,
    });

    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setTimeout(function () {
      setSelectedNote(null);
    }, 150);
  }

  async function handleUpdate() {
    try {
      const response = await fetch(
        `http://localhost:3000/notes/${selectedNote.id}`,
        {
          method: "PATCH",
          headers: authHeaders({ "Content-Type": "application/json" }),
          body: JSON.stringify(editNote),
        },
      );

      const result = await response.json();

      if (!response.ok) {
        setMessage(result.message);
        return;
      }

      setNotes(function (prev) {
        return prev.map(function (note) {
          if (note.id === selectedNote.id) {
            return {
              ...note,
              title: editNote.title,
              content: editNote.content,
            };
          }

          return note;
        });
      });

      closeModal();
    } catch {
      setMessage("Failed to update note");
    }
  }

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("users");
    navigate("/login");
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto flex justify-between items-center p-4">
          <div className="shrink-0">
            <h1 className="text-2xl font-semibold text-gray-800">NoteMe</h1>
            <p className="text-gray-400 text-sm">My Notes</p>
          </div>

          <button
            onClick={handleLogout}
            className="shrink-0 flex items-center gap-1.5 px-3 py-2 text-sm text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut size={16} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto p-5">
        {/* Quick add box, ala Google Keep */}
        <div className="mb-8">
          <div className="max-w-xl mx-auto bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            {!isAdding ? (
              <button
                onClick={function () {
                  setIsAdding(true);
                }}
                className="w-full text-left px-4 py-3 text-gray-500 hover:bg-gray-50 flex items-center justify-between"
              >
                <span>Take a note...</span>
                <Plus size={18} className="text-gray-400" />
              </button>
            ) : (
              <div className="p-3">
                <input
                  autoFocus
                  value={newNote.title}
                  onChange={function (e) {
                    setNewNote(function (prev) {
                      return { ...prev, title: e.target.value };
                    });
                  }}
                  placeholder="Title"
                  className="w-full font-medium text-gray-800 outline-none mb-2 px-1"
                />
                <textarea
                  value={newNote.content}
                  onChange={function (e) {
                    setNewNote(function (prev) {
                      return { ...prev, content: e.target.value };
                    });
                  }}
                  placeholder="Take a note..."
                  rows={3}
                  className="w-full text-gray-600 outline-none resize-none px-1 mb-2"
                />
                <div className="flex justify-end gap-2 pt-1">
                  <button
                    onClick={function () {
                      setIsAdding(false);
                      setNewNote({ title: "", content: "" });
                    }}
                    className="px-3 py-1.5 text-sm text-gray-500 hover:bg-gray-100 rounded-lg flex items-center gap-1"
                  >
                    <X size={14} /> Cancel
                  </button>
                  <button
                    onClick={handleAddNote}
                    className="px-4 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Save
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {loading && (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {[1, 2, 3].map(function (i) {
              return (
                <div
                  key={i}
                  className="break-inside-avoid bg-white rounded-xl border border-gray-200 p-4 animate-pulse"
                >
                  <div className="h-4 bg-gray-200 rounded w-2/3 mb-3" />
                  <div className="h-3 bg-gray-200 rounded w-full mb-2" />
                  <div className="h-3 bg-gray-200 rounded w-5/6" />
                </div>
              );
            })}
          </div>
        )}

        {message !== "" && (
          <p className="text-center text-red-500 mb-4">{message}</p>
        )}

        {!loading && notes.length === 0 && message === "" && (
          <div className="text-center text-gray-400 mt-16">
            <p className="text-lg">No notes yet</p>
            <p className="text-sm">Notes you add appear here</p>
          </div>
        )}

        {!loading && notes.length > 0 && (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 *:mb-4">
            {notes.map(function (note) {
              return (
                <div
                  key={note.id}
                  className={`group break-inside-avoid rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow ${
                    note.color || "bg-white"
                  }`}
                >
                  <h2 className="text-base font-medium text-gray-800 mb-2">
                    {note.title}
                  </h2>

                  <p className="text-gray-600 text-sm whitespace-pre-wrap mb-4">
                    {note.content}
                  </p>

                  <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={function () {
                        openModal(note);
                      }}
                      className="p-2 rounded-full hover:bg-black/5 text-gray-500"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={function () {
                        setSelectedNote(note);
                        handleDelete(note.id);
                      }}
                      className="p-2 rounded-full hover:bg-black/5 text-gray-500"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      {selectedNote && (
        <div
          onClick={function (e) {
            if (e.target === e.currentTarget) closeModal();
          }}
          className={`fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-opacity duration-200 ${
            modalVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            className={`bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden transition-all duration-200 ${
              modalVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            {/* Accent strip matching the note's color */}
            <div
              className={`h-1.5 ${
                selectedNote.color && selectedNote.color !== "bg-white"
                  ? selectedNote.color.replace("-50", "-300")
                  : "bg-blue-300"
              }`}
            />

            <div className="flex justify-between items-center px-5 pt-4 pb-3">
              <h2 className="font-semibold text-lg text-gray-800">Edit note</h2>

              <button
                onClick={closeModal}
                className="p-1.5 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <div className="px-5 pb-5 space-y-3">
              <input
                value={editNote.title}
                onChange={function (e) {
                  setEditNote(function (prev) {
                    return {
                      ...prev,
                      title: e.target.value,
                    };
                  });
                }}
                placeholder="Title"
                className="w-full text-lg font-medium text-gray-800 rounded-lg px-3 py-2 outline-none border border-gray-200 focus:border-blue-300 focus:ring-2 focus:ring-blue-500/20 transition"
              />

              <textarea
                rows={8}
                value={editNote.content}
                onChange={function (e) {
                  setEditNote(function (prev) {
                    return {
                      ...prev,
                      content: e.target.value,
                    };
                  });
                }}
                placeholder="Content"
                className="w-full text-gray-600 rounded-lg px-3 py-2 outline-none border border-gray-200 focus:border-blue-300 focus:ring-2 focus:ring-blue-500/20 resize-none transition"
              />
            </div>

            <div className="border-t border-gray-100 px-5 py-4 flex justify-between items-center">
              <button
                onClick={handleDelete}
                className="flex items-center gap-1.5 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 size={15} />
                Delete
              </button>

              <div className="flex gap-2">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>

                <button
                  onClick={handleUpdate}
                  className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-sm shadow-blue-600/20 transition-colors"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
