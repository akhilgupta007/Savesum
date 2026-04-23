const UserCard = ({ name, email, role }) => {
  return (
    <div>
      <p>{name}</p>
      <p>{email}</p>
      <p>{role}</p>
    </div>
  )
}

export default UserCard
