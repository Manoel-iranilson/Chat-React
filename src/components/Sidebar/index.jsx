import React, { useContext, useState } from 'react';
import {
    Box, Button, Center, Flex, Image, useBreakpointValue, Drawer, useDisclosure, DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Input
} from '@chakra-ui/react';
import { AiOutlineUserAdd, AiOutlineRollback } from "react-icons/ai"
import { GrContactInfo } from "react-icons/gr"
import * as EmailValidator from "email-validator"
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore'
import { auth, db } from '../../services/firebase';
import ChatItem from '../ChatItem';
import MyContext from '../../context/myContext';

function Sidebar() {
    const isDesktop = useBreakpointValue({ lg: "none" });
    const { isOpen: isOpenModal, onOpen: onOpenModal, onClose: onCloseModal } = useDisclosure()
    const { isOpen: isOpenDrawer, onOpen: onOpenDrawer, onClose: onCloseDrawer } = useDisclosure()
    const btnRef = React.useRef()

    const [email, setEmail] = useState('')
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

        if (!email) return;

        if (!EmailValidator.validate(email)) {
            return alert("email invalido")
        } else if (email === user.email) {
            return alert("Insira um email diferendo seu")
        } else if (chatExists(email)) {
            return alert("email ja existe")
        }

        db.collection("chats").add({
            users: [user.email, email],
        })
        setEmail('')
    }


    return (
        <>
            {isDesktop ?
                <Box h={"83.1vh"} w={"20vw"} >
                    <Flex justifyContent={"space-between"} bg={"#1f2c34"} pt={6} pl={3} pr={3} >
                        <Image
                            borderRadius={100}
                            h={20}
                            w={20}
                            cursor={"pointer"}
                            src={user.photoURL}
                            onClick={() => [auth.signOut(), setUserChat(1)]}
                        />

                        <Box cursor={"pointer"} color={"#fff"}  >
                            <AiOutlineUserAdd size={50} onClick={onOpenModal} />
                            <Modal isOpen={isOpenModal} onClose={onCloseModal} >
                                <ModalOverlay />
                                <ModalContent>
                                    <ModalHeader>Adicionar Contatos</ModalHeader>
                                    <ModalCloseButton />
                                    <ModalBody>
                                        <Input type='email' placeholder='Digite o email' value={email} onChange={(e) => setEmail(e.target.value)} />
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button colorScheme='blue' mr={3} onClick={onCloseModal}>
                                            Cancelar
                                        </Button>
                                        <Button variant='ghost' onClick={() => { [onCloseModal()];[createChat()] }} >Adicionar</Button>
                                    </ModalFooter>
                                </ModalContent>
                            </Modal>
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
                :
                <Box w={"25vw"} >
                    <Button ref={btnRef} colorScheme='teal' onClick={onOpenDrawer}>
                        {userChat == null ?
                            <GrContactInfo size={50} color={"#fff"} />
                            :
                            <AiOutlineRollback size={20} />
                        }

                    </Button>
                    <Drawer
                        isOpen={isOpenDrawer}
                        placement='left'
                        onClose={onCloseDrawer}
                        finalFocusRef={btnRef}
                    >
                        <DrawerOverlay />
                        <DrawerContent bg={"#1f2c34"}  >
                            <DrawerCloseButton color={"#fff"} />
                            <DrawerHeader>
                                <Flex justifyContent={"space-between"} pt={6} pl={3} pr={3} >
                                    <Image
                                        borderRadius={100}
                                        h={20}
                                        w={20}
                                        cursor={"pointer"}
                                        src={user.photoURL}
                                        onClick={() => [auth.signOut(), setUserChat(1)]}
                                    />

                                    <Box cursor={"pointer"} color={"#fff"}  >
                                        <AiOutlineUserAdd size={50} onClick={onOpenModal} />
                                        <Modal isOpen={isOpenModal} onClose={onCloseModal} >
                                            <ModalOverlay />
                                            <ModalContent>
                                                <ModalHeader>Adicionar Contatos</ModalHeader>
                                                <ModalCloseButton />
                                                <ModalBody>
                                                    <Input type='email' placeholder='Digite o email' value={email} onChange={(e) => setEmail(e.target.value)} />
                                                </ModalBody>
                                                <ModalFooter>
                                                    <Button colorScheme='blue' mr={3} onClick={onCloseModal}>
                                                        Cancelar
                                                    </Button>
                                                    <Button variant='ghost' onClick={() => { [onCloseModal()];[createChat()] }} >Adicionar</Button>
                                                </ModalFooter>
                                            </ModalContent>
                                        </Modal>
                                    </Box>
                                </Flex>

                            </DrawerHeader>

                            <DrawerBody p={0}>
                                <Box bg={" #121b22"} h={"100%"} w={"100%"}>
                                    {chatsSnapShot?.docs.map((item, index) => (
                                        <div key={index} onClick={onCloseModal} >
                                            <ChatItem
                                                id={item.id}
                                                users={item.data().users}
                                                user={user}
                                            />
                                        </div>
                                    ))}
                                </Box>
                            </DrawerBody>
                        </DrawerContent>
                    </Drawer>
                </Box >
            }
        </>
    );
}

export default Sidebar;