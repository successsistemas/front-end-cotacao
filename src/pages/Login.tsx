import { Box, Center, Container, Image, VStack } from "@chakra-ui/react";
import React from "react";
import Logo from '../assets/logo.webp';
import { FormularioLogin } from "./FormularioLogin";

export const Login = () => {
	return (
		<Box position="relative" bg={"#e6e6e6"} w="full" h="100vh">
			<Box position="absolute" bg={"blue.400"} w="full" h="150">
			</Box>
			<Center h="100vh" >
				<Container w={{ sm: "full", md: "70%", lg: "50%" }} display="flex" justifyContent="center" alignItems="center" mt={0} borderRadius={{ base: 0, sm: 0, md: 10, lg: 10 }} position="absolute" bg={"white"} h="80%">
					<VStack alignItems={"center"} w="full">
						<Image src={Logo} alt="Segun Adebayo" />
						<FormularioLogin />
					</VStack>
				</Container>
			</Center>
		</Box >
	)
}