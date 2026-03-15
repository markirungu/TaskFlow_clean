import { useFormik } from 'formik';
import * as yup from 'yup';

function TaskForm({ fetchTasks, users }) {
  const formik = useFormik({
    initialValues: { title: '', description: '', priority: 'Medium', user_id: '' },
    validationSchema: yup.object({
      title: yup.string().required('Required').min(3, 'Too short').max(50, 'Too long'),
      user_id: yup.string().required('Select a user')
    }),
    onSubmit: (values, { resetForm }) => {
      fetch('/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      }).then(() => {
        fetchTasks();
        resetForm();
      });
    }
  });

  return (
    <div>
      <h2>Create New Task</h2>
      <form onSubmit={formik.handleSubmit}>
        <input name="title" placeholder="Title" onChange={formik.handleChange} value={formik.values.title} />
        {formik.errors.title && <div className="error">{formik.errors.title}</div>}
        
        <textarea name="description" placeholder="Description" onChange={formik.handleChange} value={formik.values.description} />
        
        <select name="priority" onChange={formik.handleChange} value={formik.values.priority}>
          <option>Low</option><option>Medium</option><option>High</option>
        </select>
        
        <select name="user_id" onChange={formik.handleChange} value={formik.values.user_id}>
          <option value="">Select User</option>
          {users.map(u => <option key={u.id} value={u.id}>{u.username}</option>)}
        </select>
        {formik.errors.user_id && <div className="error">{formik.errors.user_id}</div>}
        
        <button type="submit">Create Task</button>
      </form>
    </div>
  );
}

export default TaskForm;