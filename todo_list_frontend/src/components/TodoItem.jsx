import React from 'react';

/**
 * PUBLIC_INTERFACE
 * TodoItem displays a single todo task with controls.
 */
export default function TodoItem({ todo, onToggle, onEdit, onDelete }) {
  /** Renders a todo item with completion checkbox and action buttons. */
  return (
    <div className="todo-item" role="listitem" aria-label={`Task ${todo.title}`}>
      <input
        type="checkbox"
        className="checkbox"
        checked={Boolean(todo.completed)}
        onChange={() => onToggle?.(todo)}
        aria-label={todo.completed ? 'Mark as incomplete' : 'Mark as complete'}
      />
      <div>
        <div className={`todo-title ${todo.completed ? 'completed' : ''}`}>
          {todo.title}
        </div>
        {todo.description ? (
          <div className="todo-desc">{todo.description}</div>
        ) : null}
      </div>
      <div className="todo-actions">
        <button className="btn" onClick={() => onEdit?.(todo)} aria-label="Edit task">Edit</button>
        <button className="btn btn-danger" onClick={() => onDelete?.(todo)} aria-label="Delete task">Delete</button>
      </div>
    </div>
  );
}
