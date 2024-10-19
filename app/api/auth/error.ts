import { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse, error: any) {
  console.error('NextAuth Error:', error)
  res.status(error.status || 500).end(error.message)
}