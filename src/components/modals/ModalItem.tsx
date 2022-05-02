import { FormControl, FormLabel, HStack, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Table, useDisclosure } from "@chakra-ui/react";
import { Button, Input, Space, Typography } from "antd";
import { ColumnType } from "antd/lib/table";
import React from "react"
import CurrencyInput from "react-currency-input-field";
import { CotacaoTDO } from "../../lib/types";
const { Text } = Typography;

const toReal = (value: string) => {
	return Number(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

type Props = {
	cotacao: CotacaoTDO | undefined
	setValorProduto: React.Dispatch<React.SetStateAction<string>>,
	valorProduto: string,
	setFrete: React.Dispatch<React.SetStateAction<string>>,
	setSt: React.Dispatch<React.SetStateAction<string>>,
	st: string,
	setIcms: React.Dispatch<React.SetStateAction<string>>,
	icms: string,
	setMva: React.Dispatch<React.SetStateAction<string>>,
	mva: string,
	setIpi: React.Dispatch<React.SetStateAction<string>>,
	ipi: string,
	frete: string,
	dataSource: any,
	isAllPreenchido: boolean,
	isLoading: boolean,
	verificarHistorico: () => void,
	colunas: ColumnType<any>[],
	onOpen: () => void,
	onClose: () => void,
	isOpen: boolean
}
export const ModalItem = (props: Props) => {

	return (
		<Modal
			isOpen={props.isOpen}
			onClose={props.onClose}
		>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader fontSize={"18px"} fontWeight="medium">
					Cotação: {props.cotacao}
				</ModalHeader>
				<ModalCloseButton _focus={{ boxShadow: 'none' }} />
				<ModalBody pb={6}>

					<Table pagination={false} scroll={{ x: 1500 }} size={"small"} dataSource={props.dataSource} columns={props.colunas} />
					<HStack mt={5} mb={4}>
						<FormControl>
							<FormLabel fontSize={"14px"}>Frete</FormLabel>
							<Text style={{ fontSize: "10px", color: "gray" }}>{toReal(props.frete)}</Text>
							<CurrencyInput
								className="ant-input"
								id="input-example"
								name="input-name"
								placeholder="Please enter a number"
								defaultValue={Number(props.frete)}
								prefix="R$"
								decimalScale={2}
								onValueChange={(value: any, name: any, float: any) => {
									props.setFrete(float?.float ? (float.float).toString() : (0).toString())
								}}
							/>
						</FormControl>

						<FormControl mt={4}>
							<FormLabel fontSize={"14px"}>Custo do produto</FormLabel>
							<Text style={{ fontSize: "10px", color: "gray" }}>{toReal(props.valorProduto)}</Text>
							<CurrencyInput
								className="ant-input"
								id="input-example"
								name="input-name"
								placeholder="Please enter a number"
								defaultValue={Number(props.valorProduto)}
								prefix="R$"
								decimalScale={2}
								onValueChange={(value: any, name: any, float: any) => {
									props.setValorProduto(float?.float ? (float.float).toString() : (0).toString())
								}}
							/>

						</FormControl>
					</HStack>
					<HStack mb={4}>

						<FormControl >
							<FormLabel fontSize={"14px"}>% ST</FormLabel>
							<Text style={{ fontSize: "10px", color: "gray" }}>{`${props.st}%`}</Text>
							<Input name={props.st} value={props.st} onChange={(e) => { props.setSt(e.target.value) }} placeholder='ST' />
						</FormControl>
						<FormControl mt={4}>
							<FormLabel fontSize={"14px"}>ICMS</FormLabel>
							<Text style={{ fontSize: "10px", color: "gray" }}>{`${props.icms}%`}</Text>
							<Input name={props.icms} value={props.icms} onChange={(e) => { props.setIcms(e.target.value) }} placeholder='ICMS' />
						</FormControl>
						<FormControl mt={4}>
							<FormLabel fontSize={"14px"}>% MVA</FormLabel>
							<Text style={{ fontSize: "10px", color: "gray" }}>{`${props.mva}%`}</Text>
							<Input name={props.mva?.toString()} value={props.mva} onChange={(e) => { props.setMva(e.target.value) }} placeholder='MVA' />
						</FormControl>
					</HStack>

					<HStack>
						<FormControl>
							<FormLabel fontSize={"14px"}>Forma de pagamento</FormLabel>
							<Text style={{ fontSize: "10px", color: "gray" }}>{`Boleto bancário`}</Text>
							<Select size="sm">
								<option value='option1'>TRANF. BANCARIA</option>
								<option value='option2'>PIX</option>
								<option value='option3'>CHEQUE</option>
								<option value='option4'>BOLETO</option>
							</Select>
						</FormControl>

						<FormControl mt={4}>
							<FormLabel fontSize={"14px"}>% IPI</FormLabel>
							<Text style={{ fontSize: "10px", color: "gray" }}>{`${props.ipi}%`}</Text>
							<Input name={props.ipi} onChange={(e) => { props.setIpi(e.target.value) }} value={props.ipi} placeholder='IPI' />
						</FormControl>
					</HStack>

				</ModalBody>

				<ModalFooter>
					<Space>
						<Button disabled={props.isAllPreenchido} loading={props.isLoading} onClick={() => { props.verificarHistorico() }}>
							Modificar
						</Button>
						<Button type="primary" onClick={props.onClose}>Cancelar</Button>
					</Space>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}