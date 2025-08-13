import React, { useEffect, useMemo, useState } from 'react';
import { createTodo, deleteTodo, fetchTodos, updateTodo } from '../services/apiClient';
import { useAuth } from '../context/AuthContext';
import TaskModal from '../components/TaskModal';
import TodoList from '../components/TodoList';
import Sidebar from '../components/Sidebar';

/**
 * PUBLIC_INTERFACE
 * Todos page displays and manages a user's todo tasks.
 */
export default function Todos() {
  const { isAuthenticated } = useAuth();
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState('');

  async function load() {
    setLoading(true);
    setError('');
    try {
      const data = await fetchTodos();
      setTodos(Array.isArray(data) ? data : data?.items || []);
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to load tasks.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      load();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  const filtered = useMemo(() => {
    let list = [...todos];
    if (filter === 'active') list = list.filter(t => !t.completed);
    if (filter === 'completed') list = list.filter(t => t.completed);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(t =>
        t.title?.toLowerCase().includes(q) ||
        t.description?.toLowerCase().includes(q)
      );
    }
    return list;
  }, [todos, filter, search]);

  async function onSaveTask(task) {
    if (task.id) {
      // update
      const updated = await updateTodo(task.id, {
        title: task.title,
        description: task.description,
      });
      setTodos(prev => prev.map(t => (t.id === task.id ? updated : t)));
    } else {
      // create
      const created = await createTodo({
        title: task.title,
        description: task.description,
      });
      setTodos(prev => [created, ...prev]);
    }
    setModalOpen(false);
    setEditing(null);
  }

  async function onToggleComplete(task) {
    const updated = await updateTodo(task.id, { completed: !task.completed });
    setTodos(prev => prev.map(t => (t.id === task.id ? updated : t)));
  }

  async function onDeleteTask(task) {
    await deleteTodo(task.id);
    setTodos(prev => prev.filter(t => t.id !== task.id));
  }

  return (
    <>
      <div className="app-body">
        <Sidebar filter={filter} onChange={setFilter} />
        <main className="app-main">
          <div className="toolbar">
            <div className="search">
              <input
                className="input"
                placeholder="Search tasks..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label="Search tasks"
              />
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button
                className="btn btn-primary"
                onClick={() => { setEditing(null); setModalOpen(true); }}
              >
                New task
              </button>
            </div>
          </div>

          {error ? <div style={{ color: '#E53935', marginBottom: 8 }} role="alert">{error}</div> : null}
          {loading ? (
            <div className="empty">Loading tasks...</div>
          ) : (
            <TodoList
              todos={filtered}
              onToggle={onToggleComplete}
              onEdit={(t) => { setEditing(t); setModalOpen(true); }}
              onDelete={onDeleteTask}
            />
          )}
        </main>
      </div>

      <TaskModal
        isOpen={modalOpen}
        initialData={editing}
        onSave={onSaveTask}
        onClose={() => { setModalOpen(false); setEditing(null); }}
      />
    </>
  );
}
