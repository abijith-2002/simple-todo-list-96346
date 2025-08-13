import React, { useEffect, useRef, useState } from 'react';

/**
 * PUBLIC_INTERFACE
 * TaskModal provides a modal dialog to create or edit a task.
 */
export default function TaskModal({ isOpen, initialData, onSave, onClose }) {
  /** Controlled modal which collects title and description then invokes onSave. */
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const ref = useRef(null);

  useEffect(() => {
    setTitle(initialData?.title || '');
    setDescription(initialData?.description || '');
  }, [initialData, isOpen]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        ref.current?.focus();
      }, 0);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const onSubmit = (e) => {
    e.preventDefault();
    onSave?.({
      ...initialData,
      title: title?.trim(),
      description: description?.trim(),
    });
  };

  return (
    <div
      className="modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label={initialData?.id ? 'Edit Task' : 'New Task'}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title">{initialData?.id ? 'Edit task' : 'New task'}</div>
          <button className="btn" onClick={onClose} aria-label="Close modal">Close</button>
        </div>
        <form onSubmit={onSubmit}>
          <div style={{ display: 'grid', gap: 10 }}>
            <label>
              <div style={{ fontWeight: 600, marginBottom: 4 }}>Title</div>
              <input
                ref={ref}
                className="input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Task title"
                required
                maxLength={140}
              />
            </label>
            <label>
              <div style={{ fontWeight: 600, marginBottom: 4 }}>Description</div>
              <textarea
                className="input"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                placeholder="Optional details"
                maxLength={500}
              />
            </label>
          </div>
          <div className="modal-actions">
            <button type="button" className="btn" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">{initialData?.id ? 'Save' : 'Create task'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
