import React, { useContext } from 'react';
import { Box, Button, Center, Flex, Image } from '@chakra-ui/react';
import { AiOutlineUserAdd } from "react-icons/ai"
import * as EmailValidator from "email-validator"
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore'
import { auth, db } from '../../services/firebase';
import ChatItem from '../chatItem';
import MyContext from '../../context/myContext';


function Sidebar() {
    const [user] = useAuthState(auth)
    const { userChat, setUserChat } = useContext(MyContext)

    const refChat = db
        .collection("chats")
        .where("users", "array-contains", user.email);

    const [chatsSnapShot] = useCollection(refChat)

    const chatExists = (email) => {
        return !!chatsSnapShot?.docs.find(
            (chat) => chat.data().users.find((user) => user === email)?.length > 0
        )

    }

    const createChat = () => {
        const emailInput = prompt("escreva")

        if (!emailInput) return;

        if (!EmailValidator.validate(emailInput)) {
            return alert("email invalido")
        } else if (emailInput === user.email) {
            return alert("Insira um email diferendo seu")
        } else if (chatExists(emailInput)) {
            return alert("email ja existe")
        }

        db.collection("chats").add({
            users: [user.email, emailInput],
        })

    }


    return (
        <Box h={"83.1vh"} w={"25vw"} >
            <Flex justifyContent={"space-between"} bg={"#1f2c34"} pt={6} pl={3} pr={3} >
                <Image
                    borderRadius={100}
                    h={20}
                    w={20}
                    cursor={"pointer"}
                    src={user?.photoURL}
                    onClick={() => [auth.signOut(), setUserChat(1)]}
                />

                <Box onClick={createChat} cursor={"pointer"} color={"#fff"}  >
                    <AiOutlineUserAdd size={50} />
                </Box>
            </Flex>

            <Box bg={" #121b22"} h={"100%"}>
                {chatsSnapShot?.docs.map((item, index) => (
                    <div key={index} >
                        <ChatItem
                            id={item.id}
                            users={item.data().users}
                            user={user}
                        />
                    </div>
                ))}
            </Box>


        </Box >
    );
}

export default Sidebar;