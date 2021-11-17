import { NextApiRequest, NextApiResponse } from 'next'

export default (request: NextApiRequest, response: NextApiResponse) => {
  console.log(request.query)

  const id = Number( request.query.id );

  const users = [
    { id: 1, name: 'Diego' },
    { id: 2, name: 'Dani' },
    { id: 3, name: 'Rafa' },
  ]

  const user = users.find(user => user.id === id)

  return response.json(user)
}
