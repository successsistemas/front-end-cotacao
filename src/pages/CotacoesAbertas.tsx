/* eslint-disable react-hooks/exhaustive-deps */
import {
	Center,
	Divider, Editable, EditableInput, EditablePreview, Flex, HStack, Spacer, Spinner, useDisclosure, useMediaQuery, VStack
} from "@chakra-ui/react";
import { Stepper } from '@mantine/core';
import { Badge, Button as ButtonAnt, Layout, message, Tooltip, Typography } from "antd";
import 'antd/dist/antd.css';
import { ColumnType } from "antd/lib/table";
import moment from "moment";
import React, { memo, useContext, useEffect, useMemo, useState } from "react";
import { CgEyeAlt } from "react-icons/cg";
import { InfoEmpresa } from "../components/InfoEmpresa";
import { QuantidadeTotal } from "../components/QuantidadeTotal";
import { QuantidadeTotalCotacaoFinalizada } from "../components/QuantidadeTotalCotacaoFinalizada";
import { TableComponent } from "../components/TableComponent";
import { UrlContext } from "../context/UrlContext";
import { useCotacao } from "../hooks/useCotacao";
import { useHistorico } from '../hooks/useHistorico';
import { useItem } from '../hooks/useItens';
import { useSetStatusLocalmente } from "../hooks/useSetStatusLocalmente";
import { api } from "../lib/api";
import { CotacaoTDO, HistoricoProdutosParametro, HistoricoProdutosTDO, HistoricoProdutosTDOBoolean, ItemCotacaoTDO } from "../lib/types";
import { styles } from "../style/style";
import '../theme/styles.css';
import '../theme/tabela.css';
import { FinalizarCotacao } from './FinalizarCotacao';
import { HistoricoTributosModal } from './HistoricoTributosModal';
import { IntensCotacaoTabela } from "./ItensCotacaoTabela";





const { Content } = Layout;

const { Text } = Typography;

const toReal = (value: string) => {
	return Number(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

//moeda formatada para numero
const unMaskReais = (value: string) => {
	return typeof (value) === 'number' ? value : (Number(value.replace(/\D/g, "")) / 100);
}

const CotacaoHome = () => {

	const [isLargerThan600] = useMediaQuery('(min-width: 600px)');

	const [isVerificandoFlag] = useState(false);

	const success = () => {
		message.success('Item salvo com sucesso!');
	};
	const failure = () => {
		message.error('Ocorreu um erro ao salvar este item.');
	};
	// const pdfGerado = () => {
	// 	message.success('Relatório gerado com sucesso!');
	// };
	const [quantidade] = useState('');
	const {
		abrirModal, onClose, isOpen, icms, setIcms, frete, setFrete,
		valorProduto, setValorProduto, st, setSt, mva, setMva, ipi, setIpi, desconto, setDesconto, prazo, setPrazo,
		cotacao, note, setNote, setFormaPagamento, formaPagamento
	} = useItem();



	const [isLoading, setLoading] = useState(false);
	const [isUpdateLoading, setUpdateLoading] = useState(false);
	const { cotacoes, total, totalFrete, totalDesconto, mutate, isReady } = useCotacao();

	// const { isOpen, onOpen, onClose } = useDisclosure();
	const { isOpen: isOpenSegundo, onOpen: onOpenSegundo, onClose: onCloseSegundo } = useDisclosure();






	const { verificarHistoricoTributos } = useHistorico();

	const [historico, setHistoricos] = useState<HistoricoProdutosTDO>();
	const [historicoBoolean, setHistoricoBoolean] = useState<HistoricoProdutosTDOBoolean>();
	const [isAllPreenchido, setAllPreenchido] = useState(false);



	const { isEnviado, statusLocalmente, setEnviado } = useSetStatusLocalmente();

	//const price = useContext(CotacaoContext);



	useEffect(() => {
		statusLocalmente();
	}, [])

	// const [, setGerandoPDF] = useState(false);

	const dadosUrl = useContext(UrlContext);




	//aastat
	// var generateData = function (amount: number) {

	// 	const itens: Array<CotacaoTDO> = [
	// 		...cotacoes.data
	// 	]
	// 	console.log(itens)
	// 	console.log(cotacoes.data.length)
	// 	var result = [];
	// 	var data = {
	// 		item: "dd",
	// 		codigo_barras: "codigo_barras",
	// 		codigo_interno: "codigo_interno",
	// 		descricao: "descricao",
	// 		marca: "marca",
	// 		quantidade: "quantidade",
	// 		custo: "custo",
	// 		frete: "frete",
	// 		st: "st",
	// 		icms: "icms",
	// 		forma_pagamento: "forma_pagamento",
	// 		ipi: "ipi",
	// 		mva: "mva"
	// 	};
	// 	for (var i = 0; i < cotacoes.data.length; i += 1) {
	// 		data.item = itens[i].item ? itens[i].item : "**";
	// 		data.quantidade = itens[i].quantidade ? itens[i].quantidade.toString() : "0";
	// 		data.codigo_barras = itens[i].codbarras ? itens[i].codbarras : "0";
	// 		data.codigo_interno = itens[i].codigo ? itens[i].codigo : "0";
	// 		data.descricao = itens[i].descricao ? itens[i].descricao : "**";
	// 		data.marca = itens[i].marca ? itens[i].marca : "**";
	// 		data.custo = itens[i].valordoproduto ? itens[i].valordoproduto.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) : "**";
	// 		data.frete = itens[i].frete ? itens[i].frete.toString() : "**";
	// 		data.st = itens[i].st ? itens[i].st.toString() : "**";
	// 		data.icms = itens[i].icms ? itens[i].icms.toString() : "**";
	// 		data.forma_pagamento = itens[i].formaPagamento ? itens[i].formaPagamento.toString() : "**";
	// 		data.ipi = itens[i].ipi ? itens[i].ipi.toString() : "**";
	// 		data.mva = itens[i].mva ? itens[i].mva.toString() : "**";
	// 		result.push(Object.assign({}, data));
	// 	}
	// 	return result;
	// };



	// function createHeaders(keys: any) {
	// 	var result = [];
	// 	for (var i = 0; i < keys.length; i += 1) {
	// 		result.push({
	// 			id: keys[i],
	// 			name: keys[i],
	// 			prompt: keys[i],
	// 			width: 65,
	// 			align: "center",
	// 			padding: 10
	// 		});
	// 	}
	// 	return result;
	// }

	// var headers: any = createHeaders([
	// 	"item",
	// 	"codigo_barras",
	// 	"codigo_interno",
	// 	"descricao",
	// 	"marca",
	// 	"quantidade",
	// 	"custo",
	// 	"frete",
	// 	"st",
	// 	"icms",
	// 	"forma_pagamento",
	// 	"ipi",
	// 	"mva"
	// ]);


	// function gerarRelatorio() {

	// 	setGerandoPDF(true)
	// 	var doc = new jsPDF({ putOnlyUsedFonts: true, orientation: "landscape" });

	// 	doc.addImage('https://i.ibb.co/Qk15TwS/logonomesuc-f5f52e7a-f5f52e7a.png', "PNG", 15, 10, 50, 15)
	// 	// doc.setFont("times", "normal");
	// 	// doc.text("Success Sistemas", 70, 25)


	// 	doc.table(3, 30, generateData(20), headers, { autoSize: true, fontSize: 8 })
	// 	doc.save('relatório' + dadosUrl?.numeroCotacao)
	// 	setGerandoPDF(false)
	// 	pdfGerado();

	// 	// doc.html(element ? element : '', {
	// 	// 	callback: function (doc) {
	// 	// 		doc.save("a4.pdf");
	// 	// 	},
	// 	// 	x: 10,
	// 	// 	y: 10
	// 	// })

	// }


	const dataSource = [
		{
			descricao: cotacao?.descricao,
			item: cotacao?.item,
			codigo: cotacao?.produto,
			marca: cotacao?.marca,
			quantidade: cotacao?.quantidade,
			codigobarras: cotacao?.codbarras ? cotacao?.codbarras : 'xxx-xxxx'
		},

	];

	async function compararItens(data: HistoricoProdutosTDO) {
		const isIpi: boolean = data.ipi === Number(ipi);
		const isSt: boolean = data.st !== null ? data.st === Number(st) : true;
		const isIcms: boolean = data.icms === Number(icms);
		const isMva: boolean = data.mva === Number(mva);
		const historicoBoolean: HistoricoProdutosTDOBoolean = {
			icms: isIcms,
			st: isSt,
			ipi: isIpi,
			mva: isMva
		}
		setHistoricoBoolean(historicoBoolean);

		const historico: HistoricoProdutosTDO = {
			icms: data.icms,
			st: data.st,
			ipi: data.ipi,
			mva: data.mva,
			fornecedor: data.fornecedor,
			produto6: data.produto6
		}
		//const array: Array<HistoricoProdutosTDO> = [...historicos, historico]
		setHistoricos(historico);

		if (historicoBoolean.icms && historicoBoolean.ipi && historicoBoolean.mva && historicoBoolean.st) {
			salvarItensLocalmente();
		} else {
			onClose();
			onOpenSegundo();
		}

	}
	async function verificarHistorico() {
		setLoading(true)
		// const item: HistoricoProdutosParametro = {
		// 	contratoEmpresa: "1EDFFA7D75A6",
		// 	numeroEmpresa: "01",
		// 	fornecedor: "A6CFFA7D7D9E79B6",
		// 	produto6: "VEFR069"
		// }
		//********************AQUI PRECISO MUDAR /////////////
		const item: HistoricoProdutosParametro = {
			contratoEmpresa: dadosUrl?.contratoEmpresa || "",
			numeroEmpresa: dadosUrl?.numeroEmpresa || "",
			fornecedor: dadosUrl?.codigoFornecedor || "",
			produto6: cotacao?.produto || ""
		}
		const result = await verificarHistoricoTributos(item);
		setLoading(false)
		result.data ?
			compararItens(result.data[0])
			: salvarItensLocalmente();


	}
	async function salvarItensLocalmente() {
		mutate()
		setLoading(true);
		const item: ItemCotacaoTDO = {
			quantidade: Number(quantidade),
			codigoInterno: cotacao?.produto,
			fornecedor: "AG000002",
			codigo: cotacao?.codigo,
			item: cotacao?.item,
			descricao: cotacao?.descricao,
			marca: cotacao?.marca,
			valorProduto: unMaskReais(valorProduto),
			frete: Number(frete),
			st: Number(st),
			icms: Number(icms),
			formaPagamento: Number.parseInt(formaPagamento),
			ipi: Number(ipi),
			mva: Number(mva),
			status: true,
			codbarras: cotacao?.codbarras,
			data: moment(Date()).format('YYYYMMDDHHmm'),
			contratoEmpresa: "",
			codigoEmpresa: dadosUrl?.numeroEmpresa || "",
			desconto: undefined,
			observacao: note,
			prazo: Number(prazo)
		};

		localStorage.setItem(`@App:${item.item}`, JSON.stringify(item));
		setLoading(false);
		salvarItem();
	}
	async function salvarItem() {


		setUpdateLoading(true);
		const item: ItemCotacaoTDO = {
			quantidade: Number(quantidade),
			codigoInterno: cotacao?.produto,
			fornecedor: dadosUrl?.codigoFornecedor,
			codigo: cotacao?.codigo,
			item: cotacao?.item,
			descricao: cotacao?.descricao,
			marca: cotacao?.marca,
			valorProduto: Number(valorProduto),
			frete: Number(frete),
			st: Number(st),
			icms: Number(icms),
			formaPagamento: Number.parseInt(formaPagamento),
			ipi: Number(ipi),
			mva: Number(mva),
			status: false,
			codbarras: cotacao?.codbarras,
			data: moment(Date()).format('YYYYMMDDHHmm'),
			contratoEmpresa: dadosUrl?.contratoEmpresa || "",
			codigoEmpresa: dadosUrl?.numeroEmpresa || "",
			desconto: Number(desconto),
			observacao: note,
			prazo: Number(prazo)
		};

		try {
			const res = await api.post('price/update', item).then((result) => {
				console.log(result.status)
				if (result.status === 201) {
					setLoading(false);
					onClose();
					mutate();
					success();
					setUpdateLoading(false)
					onCloseSegundo()

					statusLocalmente();
				} else {
					setLoading(false);
					failure();
					setUpdateLoading(false)


				}
			}).catch(error => {
				console.log(error)
				setLoading(false);
				failure();
				setUpdateLoading(false)

			});

			console.log(res)
			// const payload: CotacaoTDOPayload = {
			// 	codigo: urlData?.numeroCotacao || "",
			// 	fornecedor: urlData?.codigoFornecedor || "",
			// 	flag: ".S",
			// 	codigoEmpresa: ""
			// }
			// await apiPostVerificarFlagFornecedor(payload);


			// dados.forEach((item: any) => {
			// 	if (item.valordoproduto === 0) {
			// 		console.log("==========verificação=========")
			// 		console.log(false)
			// 		return false;
			// 	} else {
			// 		console.log("==========verificação=========")
			// 		console.log(true)
			// 		return true;
			// 	}
			// });



			return res;
		} catch (e: any) {
			console.log("aqui é um catch")
			setUpdateLoading(false)
			onCloseSegundo()
		}

	}


	const columns: ColumnType<any>[] = useMemo(
		() => [
			{
				title: 'Ações',
				dataIndex: 'acoes',
				key: 'acoes',
				shouldCellUpdate: () => true,
				align: "center",
				width: "40px",
				render: (value: string, record: any) => {
					return (
						<Tooltip title={"Editar"}>
							<ButtonAnt style={{ ...styles.Font14, color: "#228be6" }} type="link" onClick={() => abrirModal(record, value)}>Editar</ButtonAnt>
						</Tooltip>
					)
				},
			},

			{
				title: 'status',
				dataIndex: 'status',
				key: 'status',
				align: "center",
				shouldCellUpdate: () => true,
				width: '100px',
				render: (value: boolean, record: CotacaoTDO) => {

					if (record.valordoproduto > 0) {
						return <>
							<Badge style={styles.Font14} color={"green"} text={"Preenchido"} />

						</>
					} else {
						return <>
							<Badge style={styles.Font14} color={"orange"} text={"Pendente"} />
						</>
					}
				},
			},

			{
				title: 'Item',
				dataIndex: 'item',
				key: 'item',
				width: '50px',
				align: "center",
				ellipsis: {
					showTitle: false
				},
				shouldCellUpdate: () => false,
				render: (value: string, record: any) => {
					return (
						<Tooltip title={value}>
							<Text style={styles.Font14}>{value}</Text>
						</Tooltip>
					)
				},
			},
			{
				title: 'Código/barras',
				dataIndex: 'codbarras',
				key: 'codbarras',
				width: '100px',
				align: "center",
				ellipsis: {
					showTitle: false
				},
				shouldCellUpdate: () => false,
				render: (value: string, record: any) => {
					return (
						<Tooltip title={value ? value : "Campo vazio"}>
							<Text style={styles.Font14}>{value ? value : "XXX-XXX"}</Text>
						</Tooltip>
					)
				},
			},
			{
				title: 'Código interno',
				dataIndex: 'produto',
				key: 'produto',
				align: 'center',
				width: "70px",
				ellipsis: {
					showTitle: false
				},
				shouldCellUpdate: () => false,
				render: (value: string, record: any) => {
					return (
						<Tooltip title={value}>
							<Text style={styles.Font14}>{firstLetterUpperCase(value)}</Text>
						</Tooltip>
					)
				},
			},
			{
				title: 'Descrição',
				dataIndex: 'descricao',
				key: 'descricao',
				width: '140px',
				shouldCellUpdate: () => false,
				ellipsis: {
					showTitle: false
				},
				render: (value: string, record: any) => {
					return <Tooltip title={firstLetterUpperCase(value)}>
						<Text style={styles.Font14}>{firstLetterUpperCase(value)}</Text>
					</Tooltip>
				},

			},
			{
				title: 'marca',
				dataIndex: 'marca',
				align: 'center',
				key: 'marca',
				width: '60px',
				shouldCellUpdate: () => false,
				ellipsis: {
					showTitle: false
				},
				render: (value: string, record: any) => {
					return <Tooltip style={styles.Font14
					} title={value}>
						<Text style={styles.Font14}>{firstLetterUpperCase(value)}</Text>
					</Tooltip>
				},
			},
			{
				title: 'quantidade',
				dataIndex: 'quantidade',
				key: 'quantidade',
				align: 'center',
				width: '60px',
				ellipsis: {
					showTitle: false
				},
				shouldCellUpdate: () => true,
				render: (value: string, record: any) => {
					return <Tooltip title={value}>
						<Editable fontSize={styles.Font14.width}>
							<EditablePreview />
							<Text style={styles.Font14}>{value}</Text>
							<EditableInput />
						</Editable>
					</Tooltip>
				},
			},
			{
				title: 'Custo',
				dataIndex: 'valordoproduto',
				key: 'valordoproduto',
				align: 'right',
				ellipsis: {
					showTitle: false
				},
				shouldCellUpdate: () => true,
				width: '70px',
				render: (value: string, record: any) => {
					return <Editable fontSize={styles.Font14.width} >
						<Text style={styles.Font14}>	{Number(value).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</Text>
						<EditablePreview />
						<EditableInput />
					</Editable>;
				},

			},
			{
				title: 'desconto',
				dataIndex: 'desconto',
				key: 'desconto',
				align: 'right',
				ellipsis: {
					showTitle: false
				},
				shouldCellUpdate: () => true,
				width: '70px',
				render: (value: string, record: any) => {
					return <Editable fontSize={styles.Font14.width} >
						<Text style={styles.Font14}>	{Number(value).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</Text>
						<EditablePreview />
						<EditableInput />
					</Editable>;
				},
			},
			{
				title: 'Frete',
				dataIndex: 'frete',
				key: 'frete',
				width: '70px',
				ellipsis: {
					showTitle: false
				},
				align: 'right',
				shouldCellUpdate: () => true,
				render: (value: string, record: any) => {
					return <Editable fontSize={styles.Font14.width}>
						<EditablePreview />
						<Text style={styles.Font14}>	{toReal(value)}</Text>
						<EditableInput />
					</Editable>
				},
			},
			{
				title: '% ST',
				dataIndex: 'st',
				key: 'st',
				align: 'center',
				width: '50px',
				shouldCellUpdate: () => true,
				render: (value: string, record: any) => {
					return <Editable fontSize={styles.Font14.width}>
						<Text style={styles.Font14}>{`${Number.parseFloat(value).toFixed(2)}%`}</Text>
						<EditablePreview />
						<EditableInput />
					</Editable>;
				},
			},
			{
				title: '% ICMS',
				dataIndex: 'icms',
				key: 'icms',
				align: 'center',
				width: '50px',
				shouldCellUpdate: () => true,
				render: (value: string, record: any) => {
					return <Editable fontSize={styles.Font14.width} >
						<Text style={styles.Font14}>	{`${Number.parseFloat(value).toFixed(2)}%`}</Text>
						<EditablePreview />
						<EditableInput />
					</Editable>;
				},
			},
			// {
			// 	title: 'Forma de pagamento',
			// 	dataIndex: 'formapagamento',
			// 	align: 'center',
			// 	key: 'formapagamento',
			// 	shouldCellUpdate: () => true,
			// 	width: '150px',
			// 	render: (value: string, record: any) => {
			// 		return <Editable fontSize={"12px"} defaultValue='BOLETO BANCARIO'>
			// 			<EditablePreview />
			// 			<EditableInput />
			// 		</Editable>;
			// 	},
			// },
			{
				title: '% IPI',
				dataIndex: 'ipi',
				align: 'center',
				key: 'ipi',
				shouldCellUpdate: () => true,
				width: '50px',
				render: (value: string, record: any) => {
					return <Editable fontSize={styles.Font14.width}>
						<Text style={styles.Font14}>	{`${Number.parseFloat(value).toFixed(2)}%`}</Text>
						<EditablePreview />
						<EditableInput />
					</Editable>;
				},
			},
			{
				title: '% MVA',
				dataIndex: 'mva',
				align: 'center',
				key: 'mva',
				shouldCellUpdate: () => true,
				width: '50px',
				render: (value: string, record: any) => {
					return <Editable fontSize={styles.Font16.width}>
						<Text style={styles.Font14}>	{`${Number.parseFloat(value).toFixed(2)}%`}</Text>
						<EditablePreview />
						<EditableInput />
					</Editable>;
				},
			},
			// eslint-disable-next-line react-hooks/exhaustive-deps
		], []
	)


	const columnsEnviado: ColumnType<any>[] = useMemo(
		() => [
			{
				title: 'Ações',
				dataIndex: 'acoes',
				key: 'acoes',
				shouldCellUpdate: () => true,
				align: "center",
				width: "40px",
				render: (value: string, record: any) => {
					return (
						<Tooltip title={"Editar"}>
							<ButtonAnt style={{ ...styles.Font14, color: "#228be6" }} type="link" onClick={() => abrirModal(record, value)}><CgEyeAlt /></ButtonAnt>
						</Tooltip>
					)
				},
			},


			{
				title: 'status',
				dataIndex: 'status',
				key: 'status',
				align: "center",
				shouldCellUpdate: () => true,
				width: '100px',
				render: (value: boolean, record: CotacaoTDO) => {

					if (record.valordoproduto > 0) {
						return <>
							<Badge style={styles.Font14} color={"green"} text={"Preenchido"} />

						</>
					} else {
						return <>
							<Badge style={styles.Font14} color={"orange"} text={"Pendente"} />
						</>
					}
				},
			},

			{
				title: 'Item',
				dataIndex: 'item',
				key: 'item',
				width: '50px',
				align: "center",
				ellipsis: {
					showTitle: false
				},
				shouldCellUpdate: () => false,
				render: (value: string, record: any) => {
					return (
						<Tooltip title={value}>
							<Text style={styles.Font14}>{value}</Text>
						</Tooltip>
					)
				},
			},
			{
				title: 'Código/barras',
				dataIndex: 'codbarras',
				key: 'codbarras',
				width: '100px',
				align: "center",
				ellipsis: {
					showTitle: false
				},
				shouldCellUpdate: () => false,
				render: (value: string, record: any) => {
					return (
						<Tooltip title={value ? value : "Campo vazio"}>
							<Text style={styles.Font14}>{value ? value : "XXX-XXX"}</Text>
						</Tooltip>
					)
				},
			},
			{
				title: 'Código interno',
				dataIndex: 'produto',
				key: 'produto',
				align: 'center',
				width: "70px",
				ellipsis: {
					showTitle: false
				},
				shouldCellUpdate: () => false,
				render: (value: string, record: any) => {
					return (
						<Tooltip title={value}>
							<Text style={styles.Font14}>{firstLetterUpperCase(value)}</Text>
						</Tooltip>
					)
				},
			},
			{
				title: 'Descrição',
				dataIndex: 'descricao',
				key: 'descricao',
				width: '140px',
				shouldCellUpdate: () => false,
				ellipsis: {
					showTitle: false
				},
				render: (value: string, record: any) => {
					return <Tooltip title={firstLetterUpperCase(value)}>
						<Text style={styles.Font14}>{firstLetterUpperCase(value)}</Text>
					</Tooltip>
				},

			},
			{
				title: 'marca',
				dataIndex: 'marca',
				align: 'center',
				key: 'marca',
				width: '60px',
				shouldCellUpdate: () => false,
				ellipsis: {
					showTitle: false
				},
				render: (value: string, record: any) => {
					return <Tooltip style={styles.Font14
					} title={value}>
						<Text style={styles.Font14}>{firstLetterUpperCase(value)}</Text>
					</Tooltip>
				},
			},
			{
				title: 'quantidade',
				dataIndex: 'quantidade',
				key: 'quantidade',
				align: 'center',
				width: '60px',
				ellipsis: {
					showTitle: false
				},
				shouldCellUpdate: () => true,
				render: (value: string, record: any) => {
					return <Tooltip title={value}>
						<Editable fontSize={styles.Font14.width}>
							<EditablePreview />
							<Text style={styles.Font14}>{value}</Text>
							<EditableInput />
						</Editable>
					</Tooltip>
				},
			},
			{
				title: 'Custo',
				dataIndex: 'valordoproduto',
				key: 'valordoproduto',
				align: 'right',
				ellipsis: {
					showTitle: false
				},
				shouldCellUpdate: () => true,
				width: '70px',
				render: (value: string, record: any) => {
					return <Editable fontSize={styles.Font14.width} >
						<Text style={styles.Font14}>	{Number(value).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</Text>
						<EditablePreview />
						<EditableInput />
					</Editable>;
				},

			},
			{
				title: 'desconto',
				dataIndex: 'desconto',
				key: 'desconto',
				align: 'right',
				ellipsis: {
					showTitle: false
				},
				shouldCellUpdate: () => true,
				width: '70px',
				render: (value: string, record: any) => {
					return <Editable fontSize={styles.Font14.width} >
						<Text style={styles.Font14}>	{Number(value).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</Text>
						<EditablePreview />
						<EditableInput />
					</Editable>;
				},
			},
			{
				title: 'Frete',
				dataIndex: 'frete',
				key: 'frete',
				width: '70px',
				ellipsis: {
					showTitle: false
				},
				align: 'right',
				shouldCellUpdate: () => true,
				render: (value: string, record: any) => {
					return <Editable fontSize={styles.Font14.width}>
						<EditablePreview />
						<Text style={styles.Font14}>	{toReal(value)}</Text>
						<EditableInput />
					</Editable>
				},
			},
			{
				title: '% ST',
				dataIndex: 'st',
				key: 'st',
				align: 'center',
				width: '50px',
				shouldCellUpdate: () => true,
				render: (value: string, record: any) => {
					return <Editable fontSize={styles.Font14.width}>
						<Text style={styles.Font14}>{`${Number.parseFloat(value).toFixed(2)}%`}</Text>
						<EditablePreview />
						<EditableInput />
					</Editable>;
				},
			},
			{
				title: '% ICMS',
				dataIndex: 'icms',
				key: 'icms',
				align: 'center',
				width: '50px',
				shouldCellUpdate: () => true,
				render: (value: string, record: any) => {
					return <Editable fontSize={styles.Font14.width} >
						<Text style={styles.Font14}>	{`${Number.parseFloat(value).toFixed(2)}%`}</Text>
						<EditablePreview />
						<EditableInput />
					</Editable>;
				},
			},
			// {
			// 	title: 'Forma de pagamento',
			// 	dataIndex: 'formapagamento',
			// 	align: 'center',
			// 	key: 'formapagamento',
			// 	shouldCellUpdate: () => true,
			// 	width: '150px',
			// 	render: (value: string, record: any) => {
			// 		return <Editable fontSize={"12px"} defaultValue='BOLETO BANCARIO'>
			// 			<EditablePreview />
			// 			<EditableInput />
			// 		</Editable>;
			// 	},
			// },
			{
				title: '% IPI',
				dataIndex: 'ipi',
				align: 'center',
				key: 'ipi',
				shouldCellUpdate: () => true,
				width: '50px',
				render: (value: string, record: any) => {
					return <Editable fontSize={styles.Font14.width}>
						<Text style={styles.Font14}>	{`${Number.parseFloat(value).toFixed(2)}%`}</Text>
						<EditablePreview />
						<EditableInput />
					</Editable>;
				},
			},
			{
				title: '% MVA',
				dataIndex: 'mva',
				align: 'center',
				key: 'mva',
				shouldCellUpdate: () => true,
				width: '50px',
				render: (value: string, record: any) => {
					return <Editable fontSize={styles.Font16.width}>
						<Text style={styles.Font14}>	{`${Number.parseFloat(value).toFixed(2)}%`}</Text>
						<EditablePreview />
						<EditableInput />
					</Editable>;
				},
			},
			// eslint-disable-next-line react-hooks/exhaustive-deps
		], []
	)

	// columns.forEach((e, index) => {
	// 	if (e.title) {
	// 		columns.splice(index, 1);
	// 	}
	// })


	const firstLetterUpperCase = (word: string) => {
		return word.toLowerCase().replace(/(?:^|\s)\S/g, function (a) {
			return a.toUpperCase();
		});
	}


	return (
		<>
			{isVerificandoFlag ?
				<Center w="full" h="100vh">
					<VStack>
						<Spinner color='blue' />
						<Text>Carregando...</Text>
					</VStack>
				</Center>
				:
				<>
					<HistoricoTributosModal isLoading={isUpdateLoading} historicoBoolean={historicoBoolean} salvarItem={salvarItensLocalmente} historicos={historico} isOpen={isOpenSegundo} onClose={onCloseSegundo} onOpen={onOpenSegundo} />
					<Content
						className="site-layout-background"
						style={{
							margin: '3px 2px',
							padding: 3,
							minHeight: 280,
						}}>
						<Flex mb={3}>
							<VStack w="full" mb={3}>
								<HStack w="full">
									<InfoEmpresa />
								</HStack>
							</VStack>
							<Spacer />

						</Flex>

						<Divider />

						<>
							<Stepper style={{ marginTop: "20px", marginBottom: "20px" }} color="green" size={isLargerThan600 ? "md" : "sm"} active={!isEnviado ? 1 : 2}>
								<Stepper.Step label="Passo 1" description="Preencher cotação" />
								<Stepper.Step label="Passo 2" description="Enviar cotação" />
							</Stepper>
							{/* <Table
								onRow={(record, rowIndex) => {
									return {
										onClick: event => { console.log(record) }, // click row
									};
								}}
								rowKey={"item"}
								rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' : 'table-row-dark'}
								className="tabela"
								size={'small'}
								loading={cotacoes?.data ? false : true}
								dataSource={cotacoes?.data}
								columns={isEnviado ? columnsEnviado : columns}
								pagination={{ pageSize: 10 }}
								scroll={{ y: "200px", x: 1500 }}
							/> */}

							<TableComponent data={cotacoes?.data} isEnviado={isEnviado} columnsEnviado={columnsEnviado} columns={columns} />

							{!isEnviado ?
								<Flex>
									<QuantidadeTotal totalFrete={totalFrete.data === undefined ? 0 : totalFrete?.data[0]?.totalFrete} mutate={mutate} totalDesconto={totalDesconto.data === undefined ? 0 : totalDesconto?.data[0]?.totalDesconto} total={total.data === undefined ? 0 : total?.data[0]?.total} />
									<Spacer />
									{isLargerThan600 ?
										<FinalizarCotacao readyToSend={isReady?.data ? isReady?.data[0].isReady : false} mutate={mutate} setEnviado={setEnviado} loading={!isEnviado} setAllPreenchido={setAllPreenchido} />
										: <></>}
								</Flex>
								:
								<QuantidadeTotalCotacaoFinalizada totalFrete={totalFrete.data === undefined ? 0 : totalFrete?.data[0]?.totalFrete} mutate={mutate} totalDesconto={totalDesconto.data === undefined ? 0 : totalDesconto?.data[0]?.totalDesconto} total={total.data === undefined ? 0 : total?.data[0]?.total} />
							}
						</>

						{!isLargerThan600 && !isEnviado ?
							<FinalizarCotacao readyToSend={isReady?.data ? isReady?.data[0].isReady : false} mutate={mutate} setEnviado={setEnviado} loading={!isEnviado} setAllPreenchido={setAllPreenchido} />
							: <></>
						}
					</Content>
					<IntensCotacaoTabela formaPagamento={formaPagamento} setFormaPagamento={setFormaPagamento} prazo={prazo} setPrazo={setPrazo} observacaoItem={note} setObservacaoItem={setNote} desconto={desconto} setDesconto={setDesconto} onClose={onClose} isOpen={isOpen} cotacao={cotacao}
						dataSource={dataSource} note={note} setNote={setNote} frete={frete} setFrete={setFrete} valorProduto={valorProduto}
						setValorProduto={setValorProduto} st={st} setSt={setSt} icms={icms} setIcms={setIcms}
						mva={mva} setMva={setMva} ipi={ipi} setIpi={setIpi} verificarHistorico={verificarHistorico} isAllPreenchido={isAllPreenchido}
						isLoading={isLoading} isEnviado={isEnviado} />

				</>}
		</>
	);
}

export const CotacoesAbertas = memo(CotacaoHome);


