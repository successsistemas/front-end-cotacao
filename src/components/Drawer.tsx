import { Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Image, useDisclosure } from "@chakra-ui/react"
import React from "react"
import { HiMenuAlt1 } from "react-icons/hi"
import { ListaMenu } from "./ListaMenu"
export const MenuLateral = () => {

	const { isOpen, onOpen, onClose } = useDisclosure()
	const urlLogo = "https://static.wixstatic.com/media/02d127_75b52b04b39949d2861075fa738f850c.png/v1/fill/w_159,h_49,al_c,q_85,usm_0.66_1.00_0.01/02d127_75b52b04b39949d2861075fa738f850c.webp";

	return (
		<>
			<HiMenuAlt1 onClick={onOpen} color="white" size={"50px"} cursor={"pointer"} />
			<Drawer placement="left" onClose={onClose} isOpen={isOpen}>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerHeader borderBottomWidth="1px">
						<Image src={urlLogo} alt="Segun Adebayo" />
					</DrawerHeader>
					<DrawerBody>
						<ListaMenu onClose={() => { }} />
					</DrawerBody>
				</DrawerContent>
			</Drawer>
		</>
	)
}