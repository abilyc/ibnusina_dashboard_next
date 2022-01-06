import { getProviders, signIn } from "next-auth/react";

export default function SignIn({ providers }:{providers:{name:any, id:any}}) {
  console.log(providers);
  const test = {"google":{"id":"google","name":"Google","type":"oauth","signinUrl":"http://localhost:3000/api/auth/signin/google","callbackUrl":"http://localhost:3000/api/auth/callback/google"}}
  return (
    <>
      {Object.values(test).map((provider) => (
        <div key={provider.name}>
          <button onClick={() => signIn(provider.id)}>
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </>
  )
}
// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(_context: any) {
  const providers = await getProviders()
  return {
    props: { providers },
  }
}

/*
// If older than Next.js 9.3
SignIn.getInitialProps = async () => {
  return {
    providers: await getProviders()
  }
}
*/