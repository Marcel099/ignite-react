import { GetServerSideProps } from "next"
import { useEffect } from "react"
import { useAuth } from "../contexts/AuthContexts"
import { api } from "../services/apiClient"
import { setupAPIClient } from "../services/axios"
import { withSSRAuth } from "../utils/withSRRAuth"

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

export const getServerSideProps: GetServerSideProps = withSSRAuth(async (ctx) => { 
  const apiClient = setupAPIClient(ctx)
  const response = await apiClient.get('/me')

  return {
    props: {}
  }
})
