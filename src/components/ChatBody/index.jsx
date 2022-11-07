import { Flex, Text, Box, useBreakpointValue } from '@chakra-ui/react';
import React, { useEffect, useRef } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import { auth, db } from '../../services/firebase';
import image from '../../assets/image.webp'

function ChatBody({ chatId }) {
    const isDesktop = useBreakpointValue({ lg: "none" });
    const [userLoggenIn] = useAuthState(auth)

    const [messagesRes] = useCollection(
        db
            .collection("chats")
            .doc(chatId)
            .collection("messeges")
            .orderBy("timestamp", "asc")
    )

    return (
        <>
            {isDesktop ?
                <Flex h={"76.5vh"} direction='column' overflowY={"auto"} backgroundImage={image} color={"#fff"} >
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
                :
                <Flex direction='column' h="100vh" w={"100%"} overflowY={"scroll"} backgroundImage={image} color={"#fff"} >
                    {messagesRes?.docs.map((message) => {
                        if (userLoggenIn.email === message.data().user) {
                            return (
                                <Flex justifyContent="flex-end">
                                    <Box textAlign={'end'} borderRadius={5} bg={"#8FBC8F"} w={"10rem"} mt={5} mb={4} mr={5} >
                                        <Text mr={5} fontSize={20} >{message.data().message}</Text>
                                    </Box>
                                </Flex>
                            )
                        } else {
                            return (
                                <Flex>
                                    <Box borderRadius={5} bg={"	#808080"} w={"10rem"} m={5} >
                                        <Text ml={5} fontSize={20} >{message.data().message}</Text>
                                    </Box>
                                </Flex>
                            )
                        }
                    }
                    )
                    }
                </Flex>
            }
        </>
    );
}

export default ChatBody;