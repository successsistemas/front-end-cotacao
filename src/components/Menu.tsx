import { Box, Center, Divider, Flex, HStack, Img, Spacer, VStack } from '@chakra-ui/react';
import { Badge } from 'antd';
import React from "react";
import { MdNotificationsNone } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.webp';
import './../theme/styles.css';
import { DrawerExample } from "./OpenDrawer";
import { ProfileMenu } from "./ProfileMenu";


export const MenuBar = () => {



	const navigate = useNavigate();
	return (
		<>
			<VStack >
				<Flex bg="blue.400" w="full">
					<Box marginY={3}>
						<HStack>
							<DrawerExample />
							<Img cursor={'pointer'} src={Logo} onClick={() => { navigate('home') }} />
						</HStack>
					</Box>
					<Spacer />

					<Center>

					</Center>
					<Center>
						<Badge color={"red"} count={0}>
							<MdNotificationsNone cursor={'pointer'} color={"white"} size={"24px"} />
						</Badge>
					</Center>
					<ProfileMenu />
				</Flex>
			</VStack>
			<Divider />
		</>
	);
}