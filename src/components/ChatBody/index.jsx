import { Flex, Text, Box } from '@chakra-ui/react';
import React, { useEffect, useRef } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import { auth, db } from '../../services/firebase';
import image from '../../assets/image.webp'

function ChatBody({ chatId }) {
    const [userLoggenIn] = useAuthState(auth)

    const [messagesRes] = useCollection(
        db
            .collection("chats")
            .doc(chatId)
            .collection("messeges")
            .orderBy("timestamp", "asc")
    )

    const refBody = useRef("");

    useEffect(() => {
        if (refBody.current.scrollHeight > refBody.current.offsetHeight) {
            refBody.current.scrollTop = refBody.current.scrollHeight - refBody.current.offsetHeight
        }
    }, [messagesRes]);

    return (
        <Flex h={470} direction='column' w={1030} overflowY={"auto"} backgroundImage={image} color={"#fff"} >
            {messagesRes?.docs.map((message) => {
                if (userLoggenIn.email === message.data().user) {
                    return (
                        <Box textAlign={'end'} borderRadius={5} bg={"#8FBC8F"} ml={"50rem"} mt={5} mb={4} mr={5} >
                            <Text mr={5} fontSize={20} >{message.data().message}</Text>
                        </Box>
                    )
                } else {
                    return (
                        <Box borderRadius={5} bg={"	#808080"} w={"12rem"} m={5} >
                            <Text ml={5} fontSize={20} >{message.data().message}</Text>
                        </Box>)
                }
            }
            )
            }

        </Flex>
    );
}

export default ChatBody;