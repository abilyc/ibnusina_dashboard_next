import { useSession, signOut, signIn } from 'next-auth/react';
import { useState } from 'react';
import { Button } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

export function Login({ getLogin }: { getLogin: any }) {
    const [login, setIslogin] = useState(true);
    const [inProgress, setInProgress] = useState(false);
    // console.log('hello dari library login')
    const { status, data: session } = useSession({
        required: true,
        onUnauthenticated() {
            setIslogin(false);
        }
    });
    const setLogin = (e: boolean) => {
        getLogin(e);

    }
    const devAuthUrl = process.env.NEXT_PUBLIC_NEXTAUTH_URL_DEV;
    const prodAuthUrl = process.env.NEXT_PUBLIC_NEXTAUTH_URL_PROD; 
    const theUrl = process.env.NODE_ENV !== 'production' ? devAuthUrl : prodAuthUrl;
    return (
        <>
            {
                session ? <Button size={'medium'} variant="text" sx={{ position: 'relative', right: 0 }} onClick={() => {
                    signOut({ redirect: false, callbackUrl: theUrl });
                    setLogin(false);
                }
                }>Sign out</Button> :
                    <>
                        {!inProgress ? <Button size={'medium'} variant="text" sx={{ position: 'relative', right: 0 }} onClick={() => {
                            setLogin(true); // sepetinya ini tidak berguna
                            setInProgress(true);
                            signIn();
                        }
                        }
                        >Sign in</Button>: <CircularProgress/>
                        }
                    </>
            }
        </>
    )
}