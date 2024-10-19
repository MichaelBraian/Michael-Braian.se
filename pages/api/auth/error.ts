import { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const error = req.query.error as string
  console.error('NextAuth Error:', error)
  res.status(400).json({ error })
}