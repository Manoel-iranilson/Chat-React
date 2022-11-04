import React, { useState } from 'react';
import { Flex, Text, Input, Button } from '@chakra-ui/react';
import { BsPersonCircle } from "react-icons/bs"
import Sidebar from '../../components/Sidebar';
import MyContext from '../../context/myContext';
import ChatBody from '../../components/ChatBody';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../services/firebase';
import firebase from 'firebase/compat/app';


function Chat() {
    const [userChat, setUserChat] = useState(null)
    const [user] = useAuthState(auth);
    const [message, setMessage] = useState("");

    console.log(userChat?.chatId);

    const sendMessage = (e) => {
        e.preventDefault();

        db.collection("chats").doc(userChat?.chatId).collection("messeges").add({
            message: message,
            user: user.email,
            photoURL: user.photoURL,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),

        });

        setMessage("")

    }

    return (
        <MyContext.Provider value={{ userChat, setUserChat }}>
            <Flex>
                <Sidebar />
                <Flex flexDirection={"column"}>
                    <Flex bg={"#1f2c34"} p={5} pt={8} >
                        {userChat?.photoURL ? <Image src={userChat?.photoURL} /> : <BsPersonCircle size={40} color={"#fff"} />}
                        <Text textColor={"#fff"} fontSize={20} pl={5}>{userChat?.name}</Text>
                    </Flex>
                    <ChatBody chatId={userChat?.chatId} />
                    <Flex >
                        <Input bg={"#1f2c34"} w={"30rem"} color={"#fff"} placeholder='Basic usage' value={message} onChange={(e) => setMessage(e.target.value)} />
                        <Button onClick={sendMessage}>enviar</Button>
                    </Flex>
                </Flex>
            </Flex>


        </MyContext.Provider >
    );
}

export default Chat;