import { useEffect, useState } from "react";
import axios from "axios";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserComments, setSelectedUserComments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("/api/users", { withCredentials: true });
      setUsers(res.data);
    } catch (err) {
      console.error("\u274C B\u0142\u0105d pobierania u\u017cytkownik\u00f3w:", err);
    }
  };

  const updateUser = async (id, updates) => {
    try {
      const res = await axios.patch(`/api/users/${id}`, updates, { withCredentials: true });
      setUsers(prev => prev.map(u => u._id === id ? res.data : u));
    } catch (err) {
      console.error("\u274C B\u0142\u0105d edycji u\u017cytkownika:", err);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`/api/users/${id}`, { withCredentials: true });
      setUsers(prev => prev.filter(u => u._id !== id));
    } catch (err) {
      console.error("\u274C B\u0142\u0105d usuwania u\u017cytkownika:", err);
    }
  };

  const fetchUserComments = async (userId) => {
    try {
      const res = await axios.get(`/api/users/${userId}/comments`, { withCredentials: true });
      const withEditing = res.data.map(c => ({
        ...c,
        editing: false,
        tempText: c.text,
        tempRating: c.rating
      }));
      setSelectedUserComments(withEditing);
      setIsModalOpen(true);
    } catch (err) {
      console.error("\u274C B\u0142\u0105d pobierania komentarzy:", err);
    }
  };

  const deleteComment = async (productId, commentId) => {
    try {
      await axios.delete(`/api/products/${productId}/comments/${commentId}`, { withCredentials: true });
      setSelectedUserComments(prev => prev.filter(c => c._id !== commentId));
    } catch (err) {
      console.error("\u274C B\u0142\u0105d usuwania komentarza:", err);
    }
  };

  const startEditComment = (commentId) => {
    setSelectedUserComments(prev =>
      prev.map(c => c._id === commentId ? { ...c, editing: true } : c)
    );
  };

  const handleCommentFieldChange = (commentId, field, value) => {
    setSelectedUserComments(prev =>
      prev.map(c => c._id === commentId ? { ...c, [field]: value } : c)
    );
  };

  const cancelEditComment = (commentId) => {
    setSelectedUserComments(prev =>
      prev.map(c => c._id === commentId ? { ...c, editing: false } : c)
    );
  };

  const saveEditedComment = async (comment) => {
    try {
      await axios.patch(`/api/products/${comment.productId}/comments/${comment._id}`, {
        text: comment.tempText,
        rating: parseInt(comment.tempRating)
      }, { withCredentials: true });

      setSelectedUserComments(prev =>
        prev.map(c =>
          c._id === comment._id ? { ...c, text: comment.tempText, rating: comment.tempRating, editing: false } : c
        )
      );
    } catch (err) {
      console.error("\u274C B\u0142\u0105d zapisu edytowanego komentarza:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h2 className="text-2xl text-yellow-400 font-bold mb-6">Lista użytkowników</h2>
      <div className="grid gap-6">
        {users.map((u) => (
          <div key={u._id} className="bg-zinc-900 p-5 rounded-xl shadow-lg border border-zinc-700">
            <EditableUserCard
              user={u}
              onUpdate={updateUser}
              onDelete={deleteUser}
              onViewComments={fetchUserComments}
            />
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-xl max-h-[80vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">Komentarze użytkownika</h3>
            {selectedUserComments.length === 0 ? (
              <p className="text-gray-500">Brak komentarzy.</p>
            ) : (
              <ul className="space-y-3">
                {selectedUserComments.map(comment => (
                  <li key={comment._id} className="border p-3 rounded space-y-1">
                    {comment.editing ? (
                      <>
                        <textarea
                          value={comment.tempText}
                          onChange={(e) => handleCommentFieldChange(comment._id, "tempText", e.target.value)}
                          className="w-full border rounded p-1"
                        />
                        <input
                          type="number"
                          min={1}
                          max={5}
                          value={comment.tempRating}
                          onChange={(e) => handleCommentFieldChange(comment._id, "tempRating", e.target.value)}
                          className="w-full border rounded p-1 mt-1"
                        />
                        <div className="flex gap-2 mt-2">
                          <button onClick={() => saveEditedComment(comment)} className="px-2 py-1 bg-green-600 text-white rounded text-sm">
                            Zapisz
                          </button>
                          <button onClick={() => cancelEditComment(comment._id)} className="px-2 py-1 bg-gray-400 text-white rounded text-sm">
                            Anuluj
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="text-sm text-gray-500">
                          <span className="font-semibold">{comment.productTitle}</span> — {comment.date}
                        </div>
                        <div className="text-sm">{comment.text}</div>
                        <div className="text-xs text-yellow-600">Ocena: {comment.rating}/5</div>
                        <div className="flex gap-2 mt-2">
                          <button
                            onClick={() => startEditComment(comment._id)}
                            className="text-sm text-blue-600 hover:underline"
                          >
                            ✏️ Edytuj
                          </button>
                          <button
                            onClick={() => deleteComment(comment.productId, comment._id)}
                            className="text-sm text-red-600 hover:underline"
                          >
                            🗑️ Usuń
                          </button>
                        </div>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            )}
            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-4 px-4 py-2 bg-gray-300 rounded"
            >
              Zamknij
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const EditableUserCard = ({ user, onUpdate, onDelete, onViewComments }) => {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ ...user, password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    const { password, ...data } = form;
    if (password.trim() !== "") {
      data.password = password;
    }
    onUpdate(user._id, data);
    setEditing(false);
  };

  return (
    <div className="text-yellow-300">
      {editing ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Imię" className="bg-zinc-800 text-yellow-200 border border-zinc-600 rounded p-2" />
          <input type="text" name="surname" value={form.surname} onChange={handleChange} placeholder="Nazwisko" className="bg-zinc-800 text-yellow-200 border border-zinc-600 rounded p-2" />
          <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email" className="bg-zinc-800 text-yellow-200 border border-zinc-600 rounded p-2" />
          <select name="role" value={form.role} onChange={handleChange} className="bg-zinc-800 text-yellow-200 border border-zinc-600 rounded p-2">
            <option value="User">User</option>
            <option value="Admin">Admin</option>
          </select>
          <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Nowe hasło (opcjonalnie)" className="bg-zinc-800 text-yellow-200 border border-zinc-600 rounded p-2 md:col-span-2" />
          <div className="flex gap-3 mt-3 col-span-full">
            <button onClick={handleSave} className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded">💾 Zapisz</button>
            <button onClick={() => setEditing(false)} className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded">✖ Anuluj</button>
          </div>
        </div>
      ) : (
        <>
          <div className="text-xl font-semibold">{user.name} {user.surname}</div>
          <div className="text-sm text-yellow-400">{user.email}</div>
          <div className="text-sm text-zinc-400">Rola: {user.role}</div>
          <div className="flex gap-3 flex-wrap mt-4">
            <button onClick={() => setEditing(true)} className="px-3 py-1 bg-blue-600 text-white rounded text-sm">✏️ Edytuj</button>
            <button onClick={() => onDelete(user._id)} className="px-3 py-1 bg-red-600 text-white rounded text-sm">🗑️ Usuń</button>
            <button onClick={() => onViewComments(user._id)} className="px-3 py-1 bg-indigo-600 text-white rounded text-sm">💬 Komentarze</button>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminUsers;
