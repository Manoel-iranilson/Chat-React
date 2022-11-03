import { Button, Flex } from '@chakra-ui/react';
import React from 'react';
import { auth, provider } from '../../services/firebase';

function Login() {

    const handleSignin = () => {
        auth.signInWithPopup(provider).catch(alert)
    }

    return (
        <Flex>
            <Button colorScheme='blue' onClick={handleSignin}>Button</Button>
        </Flex>
    );
}

export default Login;