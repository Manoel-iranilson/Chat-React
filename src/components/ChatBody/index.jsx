import { Flex } from '@chakra-ui/react';
import React, { useEffect, useRef } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

import { useCollection } from 'react-firebase-hooks/firestore';
import { auth, db } from '../../services/firebase';



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
        <Flex h={28} bg={"#000"} color={"#fff"} >

            {messagesRes?.docs.map((message) => (

                <h3>{message.data().message} </h3>


            ))
            }


        </Flex>
    );
}

export default ChatBody;