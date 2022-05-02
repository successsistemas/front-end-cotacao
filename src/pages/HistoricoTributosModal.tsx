import {
	HStack,
	Modal,
	ModalBody,
	ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text
} from "@chakra-ui/react"
import { Button, Space, Tag } from "antd"
import React, { useState } from "react"
import { RiErrorWarningFill } from "react-icons/ri"
import { HistoricoProdutosTDO, HistoricoProdutosTDOBoolean } from "../lib/types"
type Props = {
	isOpen: boolean,
	onOpen: () => void,
	onClose: () => void,
	historicos: HistoricoProdutosTDO | undefined,
	historicoBoolean: HistoricoProdutosTDOBoolean | undefined,
	salvarItem: () => void,
	isLoading: boolean
}
export const HistoricoTributosModal = (props: Props) => {


	const [isLoading,] = useState();

	const salvarItem = () => {
		props.salvarItem();
	}
	return <>
		<Modal
			isOpen={props.isOpen}
			onClose={props.onClose}
		>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader fontWeight="normal">
					<HStack>
						<RiErrorWarningFill size="20px" color="#3182ce" />
						<Text>Aviso</Text>
					</HStack>

				</ModalHeader>
				<ModalCloseButton _focus={{ boxShadow: "none" }} />
				<ModalBody>
					<Text>Foi identificado que os tributos lançados diferem  da última comprar feita pelo cliente. Tributos lançados última compra:</Text>
					<br />
					{!props.historicoBoolean?.icms ? <Tag color="orange">ICMS: {props.historicos?.icms}%
					</Tag> : <></>}
					{!props.historicoBoolean?.ipi ? <Tag color="orange">IPI: {props.historicos?.ipi}%
					</Tag> : <></>}
					{!props.historicoBoolean?.mva ? <Tag color="orange">MVA: {props.historicos?.mva}%
					</Tag> : <></>}
					{!props.historicoBoolean?.st ? <Tag color="orange">ST: {props.historicos?.st === null ? 0 : props.historicos?.st}%
					</Tag> : <></>}
					<br />
					deseja confirmar mesmo assim?
				</ModalBody>

				<ModalFooter>
					<Space>
						<Button loading={isLoading} type={"primary"} onClick={salvarItem}>Continuar</Button>
						<Button onClick={props.onClose} type={"default"} >Cancelar</Button>
					</Space>
				</ModalFooter>
			</ModalContent>
		</Modal>
	</>
}