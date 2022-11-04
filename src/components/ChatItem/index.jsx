import React, { useContext } from 'react';
import { Box, Flex, Image, Text } from '@chakra-ui/react';
import { BsPersonCircle } from "react-icons/bs"
import { useCollection } from 'react-firebase-hooks/firestore'
import { db } from '../../services/firebase';
import MyContext from '../../context/myContext';

const getUser = (users, userLogged) => users?.filter((user) => user !== userLogged?.email)[0];

function ChatItem({ id, users, user }) {
    const { userChat, setUserChat } = useContext(MyContext)

    const [getUserItem] = useCollection(
        db.collection("users").where("email", "==", getUser(users, user))
    );

    const avatar = getUserItem?.docs?.[0]?.data();
    const item = getUser(users, user)

    const handleNewChat = () => {
        const userChat = {
            chatId: id,
            name: item.split("@")[0],
            photoURL: avatar?.photoURL,
        };
        setUserChat(userChat);

    }


    return (
        <Flex onClick={handleNewChat} p={3} pt={4} borderBottom={"1px"} borderColor={"#c3c3c3"} _hover={{ bg: "#1f2c34" }}>
            {avatar ? <Image src={avatar?.photoURL} /> : <BsPersonCircle size={40} color={"#fff"} />}
            <Text color={"#fff"} pl={3} pt={1} >{item.split("@")[0]}</Text>
        </Flex>

    );
}

export default ChatItem;