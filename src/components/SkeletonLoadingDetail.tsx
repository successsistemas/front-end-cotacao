import { Button, Image, Link, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import React from "react";
export const SkeletonLoadingDetail = () => {
	return (

		<VStack bg={"orange"} w="70%">
			<SimpleGrid columns={2} spacing={2} w="full" bgColor={'#fafafa'} padding={3} borderRadius={5} boxShadow='0.3px 0.3px 3px rgb(158, 158, 158)'>
				<VStack w={"full"} bg={"green.400"}>
					<Image w={"345px"} src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg" />
				</VStack>
				<VStack pl={5} pr={5} alignItems={"end"} w={"full"} bg={"orange.700"}>
					<Text fontFamily={'Lato, sans-serif'} fontSize={18}><b>dflkff</b></Text>
					<Text fontFamily={'Roboto, sans-serif'} fontSize={20}><b>R$jfjfjf</b></Text>
					<Text fontFamily={'Roboto, sans-serif'} fontSize={16}><b>em 12x 641,58</b></Text>
					<Text fontFamily={'Quando, sans-serif'} fontSize={16}><b>Loja: <Link textColor={'#2985ff'}>Oficial Dell</Link></b></Text>
					<Button width={"full"} style={{ fontFamily: 'Lato, sans-serif' }}>Comprar</Button>
					<Text fontFamily={'Roboto, sans-serif'} paddingY={3} fontSize={18}><b>Descrição</b></Text>
					<Text fontFamily={'Poppins, sans-serif'} fontSize={15} textColor={'gray'}>11ª geração de Intel® Core™ i5-11400H (6-core, cache de 12MB, até 4.5GHz)
						Placa de vídeo NVIDIA® GeForce® RTX™ 3050, 4GB GDDR6
						SSD de 512GB PCIe NVMe M.2
						Memória de 16GB (2x8GB), DDR4, 3200MHz; Expansível até 32GB</Text>
				</VStack>
			</SimpleGrid >
		</VStack >


	);
}