import React from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';

function AssignmentForm({ fetchAssignments, users, tasks }) {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      user_id: '',
      task_id: '',
      notes: ''
    },
    validate: (values) => {
      const errors = {};
      if (!values.user_id) errors.user_id = 'Please select a user';
      if (!values.task_id) errors.task_id = 'Please select a task';
      return errors;
    },
    onSubmit: (values) => {
      fetch('/assignments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: parseInt(values.user_id),
          task_id: parseInt(values.task_id),
          notes: values.notes
        })
      })
        .then(res => res.json())
        .then(() => {
          fetchAssignments();
          navigate('/assignments');
        });
    }
  });

  return (
    <div>
      <h2>New Assignment</h2>
      <form onSubmit={formik.handleSubmit}>

        <label>User</label>
        <select name="user_id" onChange={formik.handleChange} value={formik.values.user_id}>
          <option value="">-- Select User --</option>
          {users.map(u => (
            <option key={u.id} value={u.id}>{u.username}</option>
          ))}
        </select>
        {formik.errors.user_id && <p style={{color:'red'}}>{formik.errors.user_id}</p>}

        <label>Task</label>
        <select name="task_id" onChange={formik.handleChange} value={formik.values.task_id}>
          <option value="">-- Select Task --</option>
          {tasks.map(t => (
            <option key={t.id} value={t.id}>{t.title}</option>
          ))}
        </select>
        {formik.errors.task_id && <p style={{color:'red'}}>{formik.errors.task_id}</p>}

        <label>Notes</label>
        <input
          name="notes"
          onChange={formik.handleChange}
          value={formik.values.notes}
          placeholder="Optional notes..."
        />

        <button type="submit">Create Assignment</button>
      </form>
    </div>
  );
}

export default AssignmentForm;