import { Center, Image } from "@chakra-ui/react";
import React from "react";
//import { useParams } from "react-router";
import LogoFull from '../assets/logofull.png';
export const PaginaInfo = () => {
	//	const params = useParams();
	return (
		<Center>
			<Image src={LogoFull} />
		</Center>
	)
}