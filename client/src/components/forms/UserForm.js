import { useFormik } from 'formik';
import * as yup from 'yup';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function UserForm({ fetchUsers }) {
  const formik = useFormik({
    initialValues: { username: '', email: '', password: 'password' },
    validationSchema: yup.object({
      username: yup.string().required('Required').min(3, 'Too short').max(20, 'Too long'),
      email: yup.string().required('Required').email('Invalid email')
    }),
    onSubmit: (values, { resetForm }) => {
      fetch(`${API}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      }).then(() => {
        fetchUsers();
        resetForm();
      });
    }
  });

  return (
    <div>
      <h2>Create New User</h2>
      <form onSubmit={formik.handleSubmit}>
        <input name="username" placeholder="Username" onChange={formik.handleChange} value={formik.values.username} />
        {formik.errors.username && <div className="error">{formik.errors.username}</div>}
        <input name="email" type="email" placeholder="Email" onChange={formik.handleChange} value={formik.values.email} />
        {formik.errors.email && <div className="error">{formik.errors.email}</div>}
        <button type="submit">Create User</button>
      </form>
    </div>
  );
}

export default UserForm;