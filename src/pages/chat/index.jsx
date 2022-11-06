import React, { useState } from 'react';
import { Flex, Text, Input, Button, Image, Center } from '@chakra-ui/react';
import { BsPersonCircle } from "react-icons/bs"
import { MdSend } from "react-icons/md"
import Sidebar from '../../components/Sidebar';
import MyContext from '../../context/myContext';
import ChatBody from '../../components/ChatBody';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../services/firebase';
import firebase from 'firebase/compat/app';
import image from "../../assets/image.webp"

function Chat() {
    const [userChat, setUserChat] = useState(null)
    const [user] = useAuthState(auth);
    const [message, setMessage] = useState("");

    console.log(userChat);

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

                {userChat == null ?
                    <Flex w={"100vw"} h={"100vh"} backgroundImage={image} >

                    </Flex>

                    :

                    <Flex flexDirection={"column"}>
                        <Flex h={105} bg={"#1f2c34"} p={3} >
                            <Center>
                                {userChat?.photoURL ? <Image boxSize={"20"} borderRadius={100} src={userChat?.photoURL} /> : <BsPersonCircle size={40} color={"#fff"} />}
                                <Text textColor={"#fff"} fontSize={20} pl={5}>{userChat?.name}</Text>
                            </Center>
                        </Flex>
                        <ChatBody chatId={userChat?.chatId} />
                        <Flex bg={"#1f2c34"}>
                            <Input bg={"#1f2c34"} w={"60rem"} color={"#fff"} placeholder='Basic usage' value={message} onChange={(e) => setMessage(e.target.value)} />
                            <Button onClick={sendMessage}> <MdSend size={20} /> </Button>
                        </Flex>
                    </Flex>

                }
            </Flex>


        </MyContext.Provider >
    );
}

export default Chat;