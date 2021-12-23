import { useEffect } from "react"
import { useAuth } from "../contexts/AuthContexts"
import { api } from "../services/axios"

export default function Dashboard() {
  const { user } = useAuth()

  useEffect(() => {
    api.get('/me')
      .then(console.log)
      .catch(console.log)
  })

  return (
    <h1>Dashboard {user?.email}</h1>
  )
}
