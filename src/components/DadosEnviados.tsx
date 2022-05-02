import { Editable, EditableInput, EditablePreview, Text, Tooltip } from "@chakra-ui/react";
import { Badge, Stepper } from "@mantine/core";
import { Table } from "antd";
import { ColumnType } from "antd/lib/table";
import React, { useMemo } from "react";
import { useCotacao } from "../hooks/useCotacao";
import { CotacaoTDO } from "../lib/types";
import { styles } from "../style/style";
import { QuantidadeTotalCotacaoFinalizada } from "./QuantidadeTotalCotacaoFinalizada";



const toReal = (value: string) => {
	return Number(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

export const DadosEnviados = () => {

	const { cotacoes, total, totalFrete, totalDesconto, mutate } = useCotacao();


	const firstLetterUpperCase = (word: string) => {
		return word.toLowerCase().replace(/(?:^|\s)\S/g, function (a) {
			return a.toUpperCase();
		});
	}



	const columns: ColumnType<any>[] = useMemo(
		() => [
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
							<Badge style={styles.Badge} variant="dot" color={"green"}>Preenchido</Badge>

						</>
					} else {
						return <>
							<Badge style={styles.Badge} variant="dot" color={"orange"}>Pendente</Badge>
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


	return (
		<>

			<Stepper style={{ marginTop: "20px", marginBottom: "20px" }} color="green" size="md" active={2}>
				<Stepper.Step label="Passo 1" description="Cotação preenchida" />
				<Stepper.Step label="Passo 2" description="Cotação enviada" />
			</Stepper>

			<Table
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
				columns={columns}
				pagination={{ pageSize: 10 }}
				scroll={{ y: "200px", x: 1500 }}
			/>
			<QuantidadeTotalCotacaoFinalizada totalFrete={totalFrete.data === undefined ? 0 : totalFrete?.data[0]?.totalFrete} mutate={mutate} totalDesconto={totalDesconto.data === undefined ? 0 : totalDesconto?.data[0]?.totalDesconto} total={total.data === undefined ? 0 : total?.data[0]?.total} />
		</>
	);
}