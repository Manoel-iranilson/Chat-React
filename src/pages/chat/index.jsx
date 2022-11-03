import { Flex, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';

// import { Container } from './styles';

function Chat() {
    const [userChat, setUserChat] = useState(null)

    console.log(userChat);
    return (
        <Flex>
            <Sidebar userChat={userChat} setUserChat={setUserChat} />
            <Text>{userChat?.name}</Text>

        </Flex>
    );
}

export default Chat;