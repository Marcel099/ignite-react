import { NextApiRequest, NextApiResponse} from 'next';
import { getSession } from 'next-auth/client'
import { query as q } from 'faunadb'

import { fauna } from '../../services/fauna';
import { stripe } from '../../services/stripe'

type FaunaUser = {
  ref: {
    id: string
  },
  data: {
    stripe_customer_id: string
  }
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const session = await getSession({ req })

      const faunaUser = await fauna.query<FaunaUser>(
        q.Get(
          q.Match(
            q.Index('user_by_email'),
            q.Casefold(session.user.email),
          )
        )
      )

      let customerId = faunaUser.data.stripe_customer_id

      // Cria um novo customer no Stripe somente se
      //o usuário no FaunaDB ainda não for um customer no Stripe
      if ( !customerId ) {
        const stripeCustomer = await stripe.customers.create({
          email: session.user.email,
          // metadata
        })

        await fauna.query(
          q.Update(
            q.Ref(q.Collection('users'), faunaUser.ref.id),
            {
              data: {
                stripe_customer_id: stripeCustomer.id,
              }
            }
          )
        )

        customerId = stripeCustomer.id
      }

      console.log('ANTES_DE_CRIAR_A_CHECKOUT_SESSION')

      const stripeCheckoutSession = await stripe.checkout.sessions.create({
        customer: customerId,
        payment_method_types: ['card'],
        billing_address_collection: 'required',
        line_items: [
          { price: process.env.STRIPE_PRICE_ID, quantity: 1},
        ],
        mode: 'subscription',
        allow_promotion_codes: true,
        success_url: process.env.STRIPE_SUCCESS_URL,
        cancel_url: process.env.STRIPE_CANCEL_URL,
      })

      console.log('DEPOIS_DE_CRIAR_A_CHECKOUT_SESSION')

      return res.status(200).json({ sessionId: stripeCheckoutSession.id })
    } catch(err) {
      console.error(err)
      res.status(500).json(err)
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method not allowed')
  }
}