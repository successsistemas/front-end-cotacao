import { Button, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger } from "@chakra-ui/react";
import React from "react";

export const Teste = () => {

	return (
		<>
			<Popover autoFocus={false} >
				<PopoverTrigger>
					<Button>Trigger</Button>
				</PopoverTrigger>
				<PopoverContent>
					<PopoverArrow />
					<PopoverCloseButton />
					<PopoverHeader>Confirmation!</PopoverHeader>
					<PopoverBody>Are you sure you want to have that milkshake?</PopoverBody>
				</PopoverContent>
			</Popover>
		</>
	);
}


