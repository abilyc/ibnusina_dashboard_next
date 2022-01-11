import { getSession } from "next-auth/react"

export default async ():Promise<string> => {
  const session = await getSession();
//   console.log(session.token);
  const token:string|any= !session?.token?'':session?.token!;
  return token;
}