import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Sidebar contains filtering controls for the todo list.
 */
export default function Sidebar({ filter, onChange }) {
  /** Renders filtering controls and notifies parent via onChange. */
  const filters = [
    { key: 'all', label: 'All tasks' },
    { key: 'active', label: 'Active' },
    { key: 'completed', label: 'Completed' },
  ];

  return (
    <aside className="app-sidebar" aria-label="Filters">
      <div className="sidebar-title">Filters</div>
      <div className="filter-group">
        {filters.map(f => (
          <button
            key={f.key}
            className="filter-btn"
            aria-pressed={filter === f.key}
            onClick={() => onChange?.(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>
    </aside>
  );
}
