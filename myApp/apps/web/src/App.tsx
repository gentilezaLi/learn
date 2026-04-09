import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import "./App.css";
import { db } from "./cloudbase";

type Todo = {
  _id: string;
  text: string;
  done: boolean;
};

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function loadTodos() {
    setLoading(true);
    setError("");
    try {
      const res = await db.collection("todos").orderBy("createdAt", "desc").get();
      setTodos((res.data ?? []) as Todo[]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load data");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadTodos();
  }, []);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const value = text.trim();
    if (!value) return;

    setSaving(true);
    setError("");
    try {
      await db.collection("todos").add({
        text: value,
        done: false,
        createdAt: Date.now()
      });
      setText("");
      await loadTodos();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create todo");
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="page">
      <section className="hero">
        <p className="badge">CloudBase x React Monorepo</p>
        <h1>Task Board</h1>
        <p className="hint">
          Full-stack scaffold with CloudBase database + Cloud Function package.
        </p>
      </section>

      <section className="panel">
        <form onSubmit={handleSubmit} className="composer">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add a todo..."
            aria-label="todo input"
          />
          <button type="submit" disabled={saving}>
            {saving ? "Saving..." : "Add"}
          </button>
        </form>

        {error ? <p className="error">{error}</p> : null}
        {loading ? <p className="state">Loading...</p> : null}

        {!loading && todos.length === 0 ? (
          <p className="state">No tasks yet. Create your first one.</p>
        ) : null}

        <ul className="list">
          {todos.map((item) => (
            <li key={item._id} className={item.done ? "done" : ""}>
              <span>{item.text}</span>
              <small>{item.done ? "done" : "open"}</small>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

export default App;
