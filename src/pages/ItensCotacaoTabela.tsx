import { Alert, AlertIcon, FormControl, FormLabel, HStack, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, SimpleGrid, useMediaQuery, VStack } from "@chakra-ui/react";
import { Button } from "@mantine/core";
import { Input, Space, Typography } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { useState } from "react";
import CurrencyInput from "react-currency-input-field";
import { FormaPagamento } from "../enuns/enuns";
import { CotacaoTDO } from "../lib/types";
import { styles } from "../style/style";



const { Text } = Typography;

type Props = {
	onClose: () => void,
	isOpen: boolean,
	cotacao: CotacaoTDO | undefined,
	dataSource: any,
	frete: string,
	setFrete: React.Dispatch<React.SetStateAction<string>>,
	valorProduto: string,
	setValorProduto: React.Dispatch<React.SetStateAction<string>>,
	desconto: string,
	setDesconto: React.Dispatch<React.SetStateAction<string>>,
	st: string,
	setSt: React.Dispatch<React.SetStateAction<string>>,
	icms: string,
	setIcms: React.Dispatch<React.SetStateAction<string>>,
	mva: string,
	setMva: React.Dispatch<React.SetStateAction<string>>,
	ipi: string,
	setIpi: React.Dispatch<React.SetStateAction<string>>,
	observacaoItem: string,
	setObservacaoItem: React.Dispatch<React.SetStateAction<string>>,
	setPrazo: React.Dispatch<React.SetStateAction<string>>,
	prazo: string,
	verificarHistorico(): Promise<void>,
	isAllPreenchido: boolean,
	isLoading: boolean,
	isEnviado: boolean,
	setFormaPagamento: React.Dispatch<React.SetStateAction<string>>,
	formaPagamento: string,
	note: string,
	setNote: React.Dispatch<React.SetStateAction<string>>,

}
// const { Panel } = Collapse;

export const IntensCotacaoTabela = (props: Props) => {

	const [alertCusto, setAlertCusto] = useState(false);
	const [showForm] = useState(true);



	const [isLargerThan600] = useMediaQuery('(min-width: 722px)');
	function verificarHistorico() {
		const custo = Number.parseFloat(props.valorProduto);
		if (custo === 0 || custo < 0) {
			setAlertCusto(true)
		} else {
			setAlertCusto(false)
			props.verificarHistorico()
		}

	}

	// const colunas: ColumnType<any>[] = [
	// 	{
	// 		title: 'Descrição',
	// 		dataIndex: 'descricao',
	// 		key: 'descricaomodal',
	// 		width: "40px",
	// 		shouldCellUpdate: () => false,
	// 		ellipsis: {
	// 			showTitle: false
	// 		},
	// 		render: (value: string, record: any) => {
	// 			return <Tooltip zIndex={99999} title={value}>
	// 				<Text style={{ fontSize: "12px" }}>{value}</Text>
	// 			</Tooltip>
	// 		},

	// 	},
	// 	{
	// 		title: 'Item',
	// 		width: "40px",
	// 		dataIndex: 'item',
	// 		key: 'itemmodal',
	// 		align: 'center',
	// 		render: (value: string, record: any) => {
	// 			return <Tooltip zIndex={99999} title={value}>
	// 				<Text style={{ fontSize: "12px" }}>{value}</Text>
	// 			</Tooltip>
	// 		},
	// 	},
	// 	{
	// 		title: 'Código',
	// 		width: "40px",
	// 		dataIndex: 'codigo',
	// 		key: 'codigomodal',
	// 		align: 'center',
	// 		render: (value: string, record: any) => {
	// 			return <Tooltip zIndex={99999} title={value}>
	// 				<Text style={{ fontSize: "12px" }}>{value}</Text>
	// 			</Tooltip>
	// 		},
	// 	},
	// 	{
	// 		title: 'Código/barras',
	// 		width: "40px",
	// 		dataIndex: 'codigobarras',
	// 		key: 'codigobarrasmodal',
	// 		align: 'center',
	// 		render: (value: string, record: any) => {
	// 			return <Tooltip zIndex={99999} title={value}>
	// 				<Text style={{ fontSize: "12px" }}>{value}</Text>
	// 			</Tooltip>
	// 		},
	// 	},
	// 	{
	// 		title: 'Marca',
	// 		width: "40px",
	// 		dataIndex: 'marca',
	// 		key: 'marcamodal',
	// 		align: 'center',

	// 	},
	// 	{
	// 		title: 'quantidade',
	// 		width: "40px",
	// 		dataIndex: 'quantidade',
	// 		key: 'quantidademodal',
	// 		align: 'center'

	// 	},
	// ];

	const firstLetterUpperCase = (word: string) => {
		return word.toLowerCase().replace(/(?:^|\s)\S/g, function (a) {
			return a.toUpperCase();
		});
	}

	// function callback(key: any) {
	// 	setShowForm(!showForm)
	// }

	// 	const text = `
	//   A dog is a type of domesticated animal.
	//   Known for its loyalty and faithfulness,
	//   it can be found as a welcome guest in many households across the world.
	// `;


	// const { toReal } = useToReal();
	return (
		<>
			<Modal
				isOpen={props.isOpen}
				onClose={props.onClose}
				size={isLargerThan600 ? "md" : "xs"}
			>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader fontSize={"18px"} fontWeight="medium">
						<Text style={{ fontWeight: 500, fontSize: 16 }}>{`Item: ${firstLetterUpperCase(props.cotacao?.descricao ? props.cotacao?.descricao : "")}`}</Text>

					</ModalHeader>
					<ModalCloseButton _focus={{ boxShadow: 'none' }} />
					<ModalBody pb={6} paddingX={10}>

						{/* <Collapse onChange={callback} accordion>
							<Panel header="Detalhes do produto" key="1">
								<List>
									<List.Item>
										<Flex w={"100%"}>
											<strong >Descrição: </strong><p style={{ marginLeft: 10 }}>{props.dataSource[0].descricao}</p>
										</Flex>
									</List.Item>
									<List.Item>
										<Flex w={"100%"}>
											<p style={{ color: "gray" }}>Quantidade: </p><p style={{ marginLeft: 10 }}>{props.dataSource[0].quantidade}</p>
											<Spacer />
											<p >Código barras: </p><p style={{ marginLeft: 10 }}>{props.dataSource[0].valordoproduto}</p>
										</Flex>
									</List.Item>

								</List>
							</Panel>
						</Collapse> */}

						{showForm ?
							<>
								<SimpleGrid columns={[1, 1, 1]} spacing='10px'>
									<FormControl>
										<FormLabel fontSize={"16px"}>Frete</FormLabel>
										<CurrencyInput
											disabled={props.isEnviado}
											style={styles.Font16}
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

									<FormControl>
										<FormLabel fontSize={"16px"}>Desconto</FormLabel>
										<CurrencyInput
											disabled={props.isEnviado}
											style={styles.Font16}
											className="ant-input"
											id="input-example"
											name="input-name"
											placeholder="Please enter a number"
											defaultValue={Number(props.desconto)}
											prefix="R$"
											decimalScale={2}
											onValueChange={(value: any, name: any, float: any) => {
												props.setDesconto(float?.float ? (float.float).toString() : (0).toString())
											}}
										/>
									</FormControl>

									<FormControl mt={{ sm: 0, md: 0, lg: 0 }}>
										<FormLabel fontSize={"16px"}>Custo</FormLabel>
										<CurrencyInput
											disabled={props.isEnviado}
											style={styles.Font16}
											className="ant-input"
											id="input-custo-produto"
											name="input-name"
											placeholder="Please enter a number"
											defaultValue={Number(props.valorProduto)}
											prefix="R$"
											decimalScale={2}
											onValueChange={(value: any, name: any, float: any) => {
												props.setValorProduto(float?.float ? (float.float).toString() : (0).toString())

												if (float?.float ? true : false) {
													const valor = Number.parseFloat(float.float);
													if (valor !== 0 || valor > 0) {
														setAlertCusto(false)
													}
												}
												console.log("valorProduto", props.valorProduto);
											}}
										/>

									</FormControl>
									<FormControl mt={2}>
										<FormLabel fontSize={"16px"}>Prazo da entrega do produto (em dias).</FormLabel>
										<Input disabled={props.isEnviado} type={"number"} style={styles.Font16} name={props.prazo} onChange={(e) => { props.setPrazo(e.target.value) }} value={props.prazo} placeholder='Prazo para entraga' />
									</FormControl>
									<FormControl mt={2}>
										<FormLabel fontSize={styles.Font16.width}>Pagamento</FormLabel>
										<Select fontSize={"16px"} defaultValue={props.formaPagamento} _focus={{ boxShadow: "none" }} onChange={(event: any) => { props.setFormaPagamento(event.target.value) }} size="sm">
											<option value={FormaPagamento.BOLETO_BANCARIO}>Boleto Bancário</option>
											<option value={FormaPagamento.DINHEIRO}>Dinheiro</option>
											<option value={FormaPagamento.CHEQUE}>Cheque</option>
											<option value={FormaPagamento.CARTAO_CREDITO}>Cartão de Crédito</option>
											<option value={FormaPagamento.CARTAO_DEBITO}>Cartão de débito</option>
											<option value={FormaPagamento.PIX}>PIX</option>
											<option value={FormaPagamento.OUTROS}>Outros</option>
											<option value={FormaPagamento.NENHUM}>Nenhum</option>
										</Select>
									</FormControl>

								</SimpleGrid>
								<FormControl>
									<TextArea disabled={props.isEnviado} value={props.note} onChange={(e) => { props.setNote(e.target.value) }} placeholder="Oberservação do produto..." style={{ marginTop: 5 }} showCount maxLength={58} />
								</FormControl>

								<SimpleGrid columns={[2, 2, 4]} spacing='10px'>

									<FormControl mt={4}>
										<FormLabel fontSize={"16px"}>% ST</FormLabel>
										<Input disabled={props.isEnviado} style={styles.Font16} name={props.st} value={props.st} onChange={(e) => { props.setSt(e.target.value) }} placeholder='ST' />
									</FormControl>
									<FormControl mt={4}>
										<FormLabel fontSize={"16px"}>% ICMS</FormLabel>
										<Input disabled={props.isEnviado} style={styles.Font16} name={props.icms} value={props.icms} onChange={(e) => { props.setIcms(e.target.value) }} placeholder='ICMS' />
									</FormControl>
									<FormControl mt={4}>
										<FormLabel fontSize={"16px"}>% MVA</FormLabel>
										<Input disabled={props.isEnviado} style={styles.Font16} name={props.mva?.toString()} value={props.mva} onChange={(e) => { props.setMva(e.target.value) }} placeholder='MVA' />
									</FormControl>
									<FormControl mt={4}>
										<FormLabel fontSize={"16px"}>% IPI</FormLabel>

										<Input disabled={props.isEnviado} style={styles.Font16} name={props.ipi} onChange={(e) => { props.setIpi(e.target.value) }} value={props.ipi} placeholder='IPI' />
									</FormControl>
								</SimpleGrid>

								<HStack>
									{
										alertCusto ?
											<Alert status='warning' my={4}>
												<AlertIcon />
												O campo custo do produto precisa ser preenchido.
											</Alert>

											: <></>
									}
									{
										alertCusto ?
											document.getElementById("input-custo-produto")?.focus()
											: <></>
									}


								</HStack>
							</>
							: <></>}

					</ModalBody>

					<ModalFooter>
						<VStack >
							<Space>
								<Button disabled={props.isEnviado} loading={props.isLoading} onClick={() => { verificarHistorico() }}>
									Salvar
								</Button>
								<Button disabled={props.isEnviado} variant="outline" onClick={props.onClose}>Cancelar</Button>
							</Space>
						</VStack>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
}