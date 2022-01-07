import { getToken } from "next-auth/jwt"
import { NextApiRequest, NextApiResponse } from 'next'

const secret = process.env.JWT_SECRET!

const x = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = await getToken({ req, secret })
  // console.log("JSON Web Token", token)
  res.end()
}

export default x;