const Users = ({ users, Link }) => (
  <div>
    <h2>Users</h2>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Blogs created</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>
              <Link to={`/users/${user.id}`}>{user.username}</Link>
            </td>
            <td>{user.blogs.length}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

export default Users
