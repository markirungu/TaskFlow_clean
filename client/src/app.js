import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import TaskList from './components/TaskList';
import UserList from './components/UserList';
import AssignmentList from './components/AssignmentList';
import TaskForm from './components/forms/TaskForm';
import UserForm from './components/forms/UserForm';
import AssignmentForm from './components/forms/AssignmentForm';

function App() {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetchTasks(),
      fetchUsers(),
      fetchAssignments()
    ]).then(() => setLoading(false));
  }, []);

  const fetchTasks = () => {
    return fetch('/tasks')
      .then(res => res.json())
      .then(data => setTasks(data))
      .catch(err => console.error('Error fetching tasks:', err));
  };

  const fetchUsers = () => {
    return fetch('/users')
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error('Error fetching users:', err));
  };

  const fetchAssignments = () => {
    return fetch('/assignments')
      .then(res => res.json())
      .then(data => setAssignments(data))
      .catch(err => console.error('Error fetching assignments:', err));
  };

  if (loading) return <div className="container">Loading...</div>;

  return (
    <BrowserRouter>
      <nav>
        <NavLink to="/">Tasks</NavLink>
        <NavLink to="/users">Users</NavLink>
        <NavLink to="/assignments">Assignments</NavLink>
        <NavLink to="/tasks/new">+ New Task</NavLink>
        <NavLink to="/users/new">+ New User</NavLink>
        <NavLink to="/assignments/new">+ New Assignment</NavLink>
      </nav>

      <div className="container">
        <Routes>
          <Route path="/" element={
            <TaskList tasks={tasks} fetchTasks={fetchTasks} users={users} />
          } />
          <Route path="/users" element={
            <UserList users={users} fetchUsers={fetchUsers} />
          } />
          <Route path="/assignments" element={
            <AssignmentList 
              assignments={assignments} 
              fetchAssignments={fetchAssignments}
              users={users}
              tasks={tasks}
            />
          } />
          <Route path="/tasks/new" element={
            <TaskForm fetchTasks={fetchTasks} users={users} />
          } />
          <Route path="/users/new" element={
            <UserForm fetchUsers={fetchUsers} />
          } />
          <Route path="/assignments/new" element={
            <AssignmentForm 
              fetchAssignments={fetchAssignments}
              users={users}
              tasks={tasks}
            />
          } />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;