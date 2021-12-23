import { FormEvent, useState } from 'react'
import { useAuth } from '../contexts/AuthContexts'

export default function Home() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const {
    signIn
  } = useAuth()

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()

    const data = {
      email,
      password,
    }

    await signIn(data)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="password"
        name="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

      <button type="submit">Entrar</button>
    </form>
  )
}
