import { Center, Text, VStack } from "@chakra-ui/react";
import React from "react";
type Prop = {
	text: string;
}
export const NadaAqui = (props: Prop) => {
	return (
		<Center>
			<VStack>
				<Text color={'gray'}>{props.text}</Text>
			</VStack>
		</Center>

	);
}