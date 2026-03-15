import { useState } from 'react';

function TaskList({ tasks, fetchTasks }) {
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ title: '', description: '', priority: 'Medium' });

  const handleDelete = (id) => {
    fetch(`/tasks/${id}`, { method: 'DELETE' })
      .then(() => fetchTasks());
  };

  const startEdit = (task) => {
    setEditingId(task.id);
    setEditForm({
      title: task.title,
      description: task.description || '',
      priority: task.priority || 'Medium'
    });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = (id) => {
    fetch(`/tasks/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editForm)
    }).then(() => {
      setEditingId(null);
      fetchTasks();
    });
  };

  const toggleComplete = (task) => {
    fetch(`/tasks/${task.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !task.completed })
    }).then(() => fetchTasks());
  };

  return (
    <div>
      <h2>Tasks</h2>
      {tasks.length === 0 ? (
        <p>No tasks yet. Create one!</p>
      ) : (
        tasks.map(task => (
          <div key={task.id} className={`card ${task.completed ? 'completed' : ''}`}>
            {editingId === task.id ? (
              <>
                <input name="title" value={editForm.title} onChange={handleEditChange} />
                <textarea name="description" value={editForm.description} onChange={handleEditChange} />
                <select name="priority" value={editForm.priority} onChange={handleEditChange}>
                  <option>Low</option><option>Medium</option><option>High</option>
                </select>
                <button onClick={() => handleEditSubmit(task.id)}>Save</button>
                <button className="delete" onClick={() => setEditingId(null)}>Cancel</button>
              </>
            ) : (
              <>
                <h3>{task.title}</h3>
                <p>{task.description}</p>
                <p><strong>Priority:</strong> {task.priority}</p>
                <p><strong>Status:</strong> {task.completed ? '✅ Complete' : '⏳ Pending'}</p>
                <p><strong>Created by:</strong> {task.user}</p>
                <button onClick={() => startEdit(task)}>Edit</button>
                <button onClick={() => toggleComplete(task)}>
                  {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
                </button>
                <button className="delete" onClick={() => handleDelete(task.id)}>Delete</button>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default TaskList;