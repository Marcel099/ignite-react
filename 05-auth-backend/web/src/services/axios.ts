import axios, { AxiosError } from 'axios'
import { parseCookies, setCookie } from 'nookies'

import { signOut } from '../contexts/AuthContexts'

let cookies = parseCookies()

let isRefreshingToken = false
let failedRequestsQueue = []

export const api = axios.create({
  baseURL: 'http://localhost:3333',
  headers: {
    Authorization: `Bearer ${cookies['nextauth.token']}`
  }
})

api.interceptors.response.use(response => {
  return response
}, (error: AxiosError) => {
  if (error.response.status === 401) {
    if (error.response.data?.code === 'token.expired') {
      cookies = parseCookies()

      const { 'nextauth.refreshToken': refreshToken } = cookies

      const originalConfig = error.config
      
      if (!isRefreshingToken) {
        isRefreshingToken = true

        api.post('/refresh', {
          refreshToken
        })
        .then(response => {
          const { token, refreshToken } = response.data

          setCookie(undefined, 'nextauth.token', token, {
            maxAge: 60 * 60 * 24 * 30,  // 30 days
            path: '/'
          })
          setCookie(undefined, 'nextauth.refreshToken', refreshToken, {
            maxAge: 60 * 60 * 24 * 30,  // 30 days
            path: '/'
          })

          api.defaults.headers['Authorization'] = `Bearer ${token}`

          failedRequestsQueue.forEach(request => request.onSuccess(token))
          failedRequestsQueue = []
        })
        .catch(err => {
          failedRequestsQueue.forEach(request => request.onFailure(err))
          failedRequestsQueue = []
        })
        .finally(() => {
          isRefreshingToken = false
        })
      }

      return new Promise((resolve, reject) => {
        failedRequestsQueue.push({
          onSuccess: (token: string) => {     // sucesso ao refrescar token
            originalConfig.headers['Authorization'] = `Bearer ${token}`

            resolve(api(originalConfig))
          },
          onFailure: (err: AxiosError) => {   // erro ao refrescar token
            reject(err)
          },
        })
      })
    } else {
      signOut()
    }
  }

  return Promise.reject(error)
})