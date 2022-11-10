import { useSelector } from 'react-redux'
/* import User from '../components/User' */
const Users = () => {
  const users = useSelector(({ users }) => {
    return users
  })

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>Nimi</th>
            <th>Blogeja</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users
