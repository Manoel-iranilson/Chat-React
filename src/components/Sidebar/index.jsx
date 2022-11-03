import React from 'react';
import { Box, Button, Flex, Image } from '@chakra-ui/react';
import { AiOutlineUserAdd } from "react-icons/ai"
import * as EmailValidator from "email-validator"
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore'
import { auth, db } from '../../services/firebase';

function Sidebar() {
    const [user] = useAuthState(auth)

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
        <Box bg={"#000"} h={"100vh"} w={"25vw"}>
            <Flex>
                <Image
                    src={user?.photoURL}
                    onClick={() => auth.signOut()}
                />
                <AiOutlineUserAdd onClick={createChat} size={30} color={"#fff"} />

            </Flex>
        </Box >
    );
}

export default Sidebar;