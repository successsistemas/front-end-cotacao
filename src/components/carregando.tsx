import { Heading } from "@chakra-ui/layout";
import React from "react";

type Prop = {
	text: string;
}

export const Carregando = (props: Prop) => {
	return (
		<Heading bg={"red"} position="absolute">{props.text}</Heading>
	);
}