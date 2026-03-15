function UserList({ users }) {
  return (
    <div>
      <h2>Users</h2>
      {users.length === 0 ? (
        <p>No users yet. Create one!</p>
      ) : (
        users.map(user => (
          <div key={user.id} className="card">
            <h3>{user.username}</h3>
            <p><strong>Email:</strong> {user.email}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default UserList;