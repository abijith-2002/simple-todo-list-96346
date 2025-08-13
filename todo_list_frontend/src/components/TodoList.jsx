import React from 'react';
import TodoItem from './TodoItem';

/**
 * PUBLIC_INTERFACE
 * TodoList renders an accessible list of todo items.
 */
export default function TodoList({ todos, onToggle, onEdit, onDelete }) {
  /** Renders the list with empty state when no items match. */
  if (!todos?.length) {
    return <div className="empty">No tasks to show.</div>;
  }

  return (
    <div className="todo-list" role="list" aria-label="Todo list">
      {todos.map((t) => (
        <TodoItem
          key={t.id}
          todo={t}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
