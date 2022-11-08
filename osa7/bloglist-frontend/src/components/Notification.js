import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notification.content)
  const type = useSelector((state) => state.notification.type)
  console.log(type)
  /*  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  } */
  if (notification) {
    if (type === 'update') {
      return <div className="update">{notification}</div>
    }
    if (type === 'error') {
      return <div className="error">{notification}</div>
    }
  }
}

export default Notification
