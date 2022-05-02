import React from "react";
import { VStack, Center, Spinner, Text } from "@chakra-ui/react";
export const Loading = () => {
	return (
		<Center display="flex" alignContent="center" alignItems="center" w="full" h="100vh">
			<VStack>
				<Spinner
					thickness="4px"
					speed="0.65s"
					emptyColor="gray.200"
					color="blue.500"
					size="xl"
				/>
				<Text mt={3}>Carregando...</Text>
			</VStack>
		</Center>
	);
}