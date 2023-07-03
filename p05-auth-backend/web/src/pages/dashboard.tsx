import { GetServerSideProps } from "next"
import { useEffect } from "react"

import { api } from "../services/apiClient"
import { setupAPIClient } from "../services/axios"

import { useAuth } from "../contexts/AuthContexts"
import { withSSRAuth } from "../utils/withSRRAuth"
import { Can } from "../components/Can"

export default function Dashboard() {
  const { user, isAuthenticated, signOut } = useAuth()

  useEffect(() => {
    api.get('/me')
      .then(console.log)
      .catch(console.log)
  })

  return (
    <>
      <h1>Dashboard {user?.email}</h1>

      <button onClick={() => signOut()}>Sign out</button>

      <Can permissions={['metrics.list']}>
        <div>Métricas</div>
      </Can>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = withSSRAuth(async (ctx) => { 
  const apiClient = setupAPIClient(ctx)
  const response = await apiClient.get('/me')

  return {
    props: {}
  }
})
