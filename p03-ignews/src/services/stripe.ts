import Stripe from 'stripe'
import package_json from '../../package.json';

export const stripe = new Stripe(
  process.env.STRIPE_API_KEY,
  {
    apiVersion: '2020-08-27',
    appInfo: {
      name: 'ig.news',
      version: package_json?.version ?? '1.0.0',
    },
  }
)
