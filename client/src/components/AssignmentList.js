const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function AssignmentList({ assignments, fetchAssignments, users, tasks }) {
  const toggleComplete = (assignment) => {
    fetch(`${API}/assignments/${assignment.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !assignment.completed })
    }).then(() => fetchAssignments());
  };

  const getUserName = (userId) => {
    const user = users.find(u => u.id === userId);
    return user ? user.username : 'Unknown';
  };

  const getTaskTitle = (taskId) => {
    const task = tasks.find(t => t.id === taskId);
    return task ? task.title : 'Unknown';
  };

  return (
    <div>
      <h2>Task Assignments</h2>
      {assignments.length === 0 ? (
        <p>No assignments yet. Assign tasks to users!</p>
      ) : (
        assignments.map(a => (
          <div key={a.id} className={`card ${a.completed ? 'completed' : ''}`}>
            <p><strong>User:</strong> {getUserName(a.user_id)}</p>
            <p><strong>Task:</strong> {getTaskTitle(a.task_id)}</p>
            <p><strong>Notes:</strong> {a.notes || 'No notes'}</p>
            <p><strong>Status:</strong> {a.completed ? '✅ Complete' : '⏳ Pending'}</p>
            <button onClick={() => toggleComplete(a)}>
              Mark {a.completed ? 'Incomplete' : 'Complete'}
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default AssignmentList;