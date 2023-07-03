import { GetServerSideProps } from "next"
import { useEffect } from "react"

import { api } from "../services/apiClient"
import { setupAPIClient } from "../services/axios"

import { useAuth } from "../contexts/AuthContexts"
import { useCan } from "../hooks/useCan"
import { withSSRAuth } from "../utils/withSRRAuth"

export default function Dashboard() {
  const { user, isAuthenticated } = useAuth()

  return (
    <>
      <h1>Metrics</h1>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = withSSRAuth(async (ctx) => { 
  const apiClient = setupAPIClient(ctx)
  const response = await apiClient.get('/me')

  

  return {
    props: {}
  }
}, {
  permissions: ['metrics.list'],
  roles: ['administrator']
})
