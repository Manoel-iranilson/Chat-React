import { Button, Flex } from '@chakra-ui/react';
import React from 'react';
import { auth, provider } from '../../services/firebase';

function Login() {

    const handleSignin = () => {
        auth.signInWithPopup(provider).catch(alert)
    }

    return (
        <Flex justifyContent="center" pt="20rem" >
            <Button colorScheme='blue' onClick={handleSignin}>Entrar com Google</Button>
        </Flex>
    );
}

export default Login;