import { Box, Button, Center, Flex, HStack, Input, Spacer, Text } from "@chakra-ui/react";
import React from "react";
import { GrSearch } from 'react-icons/gr';
type Props = {
	titulo: string;
}
export const CampoBuscar = (props: Props) => {
	return (
		<Flex w="full">
			<Box p="4">
				<Text fontSize={"md"}>{props.titulo}</Text>
			</Box>
			<Spacer />
			<Box p="4" >
				<Center>
					<HStack w={"300px"}>
						<Input borderRadius={0} bg={"white"} />
					</HStack>
					<Button colorScheme={"whiteAlpha"} borderRadius={0}><GrSearch /></Button>
				</Center>
			</Box>
		</Flex>
	)
}