import moment from 'moment';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { TDocumentDefinitions } from "pdfmake/interfaces";
import { FormaPagamento } from '../enuns/enuns';
const pdf = pdfMake;
pdf.vfs = pdfFonts.pdfMake.vfs;

const corHeadTable = '#D6E7FF'
// const corHeadTableGray = '#D9D9D9'

const fontSize = 9;


export const generateADocument = () => {

	let documentDefinition: TDocumentDefinitions = {
		content: [

		]
	}
	return documentDefinition;
}

export const imprimir = (itens: any[], download: boolean, totalS: number, totalDesconto: number, totalFrete: number, formaPagamento: number, dadosEmpresa: any) => {
	let definition: TDocumentDefinitions = generateADocument();
	const arrayItens: any[] = []

	for (let i = 0; i < itens.length; i++) {
		let item: any = itens[i];
		arrayItens.push(getItemTable(item))
	}

	const total: any[] = getTotal(totalS, totalDesconto, totalFrete, formaPagamento);

	definition.content = [...getCabecalho(dadosEmpresa, itens[0].codigo), ...arrayItens, ...total];

	pdfMake.createPdf(definition);

	if (download) {
		pdfMake.createPdf(definition).download();
	} else {
		pdfMake.createPdf(definition).print();
	}

}

const getCabecalho = (dadosEmpresa: any, codigoCotacao: string) => {

	const now: moment.Moment = moment();

	const head: any[] = [
		{
			width: 40,
			image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAAzCAYAAAAn3w6xAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAVESURBVGhD7Zh9TNVVGMePhTJBfOMljWyZoXPLP1KzTdpS+iOby2ore/EFUd4MhJXMaU0hASHkJciglGrDFS9u2Gg5C6QQXxKTd8blnQsRIASBXuMtvj3ncK5zTZBxz++O7d7Pdvb87vO7927ne57znOc5DBaOVQBpLRarANJaLFYBpLVYrAJIa7FYBZDWYjGrAFm1fdic0wYWXwt2uBLsUBXYhxU0ysfsJzo8k67H5+U98hfaYxYBQgpvgh3XgX1M41g1dua247z+FvoGh+ntqBiG4RFc77yDuOIePJvZAhZeiQ3ZLegfGhH/oRWaCpD/x22wuBqwaFrxyGpEFHXJN5PjXPMtrEhrxPsXO6RHPZoJEHm9GyyCVjy2Dg4p9SatpK53gMTrxOgojxa1aCLAgUsU8pE0+bg6OJ9qkF7TMWiwHZQLUNBGYc8n/2k97JLrpXf6olwAFkN7PrFe7Pmuf4akd/qiVAD//A6x53noe+W1S+/4GAwD+D7rGtJO/YLTqb8iO+MqbhSp2zKTQakALIGyPV/9KJ30jM/JpJ8wk70Np4f3wGWmDw1vONt4YwHzwjy2E29tjkdZcZP8tnYoE6C8+w5NnMI/oR5Pf6eX3vvTqu+GDU3ezTkIy12Csdw5GG7c0nDjz+Rf4rAX9mwHNq0PxzDVCFqhTIC44r+o2KEIoPAPKuiU3vtTUdIMW7YNTy7ch8fs/bFwxm6x8o5kF9n6Yun8ACGCEGLOXswhIUp+b5S/VosyAXzzO8XkeQ44WtQtvePjtfUETd4X/tu/FKHe3NiJoiu1SI4/j+dWHsJc5kkCBYqoWOa4D3ZsOypKJ46sqaBMgB0/t48JQMOPkqGplN5oIgECRIQYRZhLuWFkRO12UCZACC9++AlA57/r1+rC9cV1YXC1GxPhUTs/+LyTIt+oQZkAZ+r6qJujHJDUQA2PDu0GdTXAysXBWLogUOQEO8odf/ca5BvTUSYAh3d6QgA6CVZ92yy9ptP+Z49IhFwAniSPHcmWb0xHqQBrMvRi8kKE6BqkVKjr67e9liiOxifmBWDDmjDpNR2lAvCujUXIKOCDeoLoGw8+ESbDN1/k45FZPiIZLnHwl17TUSoA5wN++UGrf1cEel5LkdHUPyi/8X9GMTL6r3wen8oyPRZSrfCUUxBVjXuk13SUC8BZn0VbwZgQ+eDbghLjotQGeF/owHEqmuJLerA6o0U0TSysSnSRE9HSfBPzSQAeAY9P5wgw4plLdYFsi+8KwZ95rcArRj6M+SK+Du5nJi5yrhbq4PjQbpEDXlgdKr2mo5kAnAuttzHrBE2YbwmaJEuSE/7snsE/k1BHH3BdlhjzozgBFs/2Q+iBDOk1HU0FMJLT2I+NZ1vBYvilKA3qFoUo3NLRub9w4t6B47E2VKw+L4mbGtTdEZpFgHvpHRhBy61B6HoGJl0sXcyvohbZk/b+e3jVI1p61WB2AaaCq72f6Bxt2btoa1VzrBqZ9gK8sjFa9AK8O0yI+kF61aFcAH513d3VJz+ZxhubYuFi403hvwsBu05Kr1o0iYAyamUPBqVhcHBqDdHQ0DDcV30krst40jsSki7fqEfTLbDFIwovuYfjSkG19DyYqNBszKaOz4FCnpe81y7XyjfaoHkO0Dd14eXnI8HY63SUheHw/nRknr6MgrxK/HapBrnnSsUt0Bba64y9iRlsq+j6vkrOk/+gLWZNgmczryHQKxXrVhykosabWtztVN56YplTgBAgNiIHNdVt8tvmwawCTEesAkhrsVgFkNZisQogrcViFUBaCwX4D7C54XoP7HR9AAAAAElFTkSuQmCC'
		},
		{
			style: 'tableExample',
			table: {
				widths: ['*', 'auto'],
				body: [
					['Sucess Sistemas', now.format('DD/MM/YYYY')],
				]
			},
			margin: [0, 0],
			layout: 'noBorders'
		},
		{
			margin: [0, 10],
			canvas: [
				{
					type: 'rect',
					x: 0,
					y: 0,
					w: 515,
					h: 0,
					r: 0,
					lineWidth: 1,
					lineColor: '#00000',

				},

			]
		},
		{
			text: "Dados da empresa solicitante"
		},
		{
			margin: [0, 10],
			style: 'tableExample',
			table: {
				widths: ['*', '*', '*', '*'],
				body: [
					[
						{ text: 'Razão Social' },
						{ text: 'CNPJ' },
						{ text: 'Cidade' },
						{ text: 'Cotação' }
					],
					[dadosEmpresa.razao.toLowerCase(), dadosEmpresa.cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5"), dadosEmpresa.cidade.toLowerCase(), codigoCotacao]
				]
			},
			layout: 'lightHorizontalLines'

		}
	]

	return head;
}

export const getItemTable = (item: any) => {
	const itemTable: any[] = [
		{
			style: 'tableExample',
			table: {
				widths: [25, 60, '*', '*', 30, 30, 50, 40, 25],
				body: [
					[
						{ text: 'Item', fontSize: fontSize, fillColor: corHeadTable },
						{ text: 'Cód. Produto', fontSize: fontSize, fillColor: corHeadTable },
						{ text: 'Descrição', fontSize: fontSize, fillColor: corHeadTable },
						{ text: 'Cód. barras', fontSize: fontSize, fillColor: corHeadTable },
						{ text: 'Marca', fontSize: fontSize, fillColor: corHeadTable },
						{ text: 'Qtd', fontSize: fontSize, fillColor: corHeadTable },
						{ text: 'Custo Unit.', fontSize: fontSize, fillColor: corHeadTable },
						{ text: 'Desconto', fontSize: fontSize, fillColor: corHeadTable },
						{ text: 'Frete', fontSize: fontSize, fillColor: corHeadTable },

					],
					[
						{ text: item.item.toLowerCase(), fontSize: fontSize },
						{ text: item.produto.toLowerCase(), fontSize: fontSize },
						{ text: item.descricao.toLowerCase(), fontSize: fontSize },
						{ text: item.codbarras, fontSize: fontSize },
						{ text: item.marca.toLowerCase(), fontSize: fontSize },
						{ text: item.quantidade, fontSize: fontSize },
						{ text: item.valordoproduto, fontSize: fontSize },
						{ text: item.desconto, fontSize: fontSize },
						{ text: "1245.33", fontSize: fontSize }
					]
				]
			},
			layout: 'noBorders'
		},
		{
			style: 'tableExample',
			table: {
				widths: [100, '*', 100, '*', '*'],
				body: [
					[
						{ text: '% st', fillColor: corHeadTable, fontSize: fontSize },
						{ text: '% mva', fillColor: corHeadTable, fontSize: fontSize },
						{ text: '% icms', fillColor: corHeadTable, fontSize: fontSize },
						{ text: '% ipi', fillColor: corHeadTable, fontSize: fontSize },

						{ text: 'Total', fillColor: corHeadTable, fontSize: fontSize }
					],
					[{ text: item.st + '%', fontSize: fontSize }, { text: item.mva + '%', fontSize: fontSize }, { text: item.icms + '%', fontSize: fontSize }, { text: item.ipi + '%', fontSize: fontSize }, { text: 12.76, fontSize: fontSize }]
				]
			},
			layout: 'noBorders',
		}
	]
	return itemTable;
}

export const getTotal = (totalS: number, totalDesconto: number, totalFrete: number, formaPagamento: number): any[] => {
	return [
		{
			text: "", margin: [0, 10],
		}
		,
		{
			style: 'tableExample',
			table: {
				widths: ['*', '*', '*', '*', '*'],
				body: [
					[
						{ text: 'Forma Pagamento', fontSize: fontSize, fillColor: corHeadTable },
						{ text: 'Subtotal', fontSize: fontSize, fillColor: corHeadTable },
						{ text: 'Frete', fontSize: fontSize, fillColor: corHeadTable },
						{ text: 'Desconto. barras', fontSize: fontSize, fillColor: corHeadTable },
						{ text: 'Total Geral', fontSize: fontSize, fillColor: corHeadTable },
					],
					[
						{ text: getFormaPagamentoToString(formaPagamento), fontSize: fontSize },
						{ text: Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(totalS), fontSize: fontSize },
						{ text: Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(totalFrete), fontSize: fontSize },
						{ text: Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(totalDesconto), fontSize: fontSize },
						{ text: Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(totalS + totalFrete - totalDesconto), fontSize: fontSize }
					]
				]
			},
			layout: 'lightHorizontalLines'
		}
	];
}

export const getFormaPagamentoToString = (formaPagamamento: number) => {

	let formaPagamentoString = "";

	switch (formaPagamamento) {
		case FormaPagamento.BOLETO_BANCARIO:
			return formaPagamentoString = "Boleto bancário"

		case FormaPagamento.CARTAO_CREDITO:
			return formaPagamentoString = "Cartão de crédito"

		case FormaPagamento.CARTAO_DEBITO:
			return formaPagamentoString = "Cartão de débito"

		case FormaPagamento.CHEQUE:
			return formaPagamentoString = "Cheque"
		case FormaPagamento.DINHEIRO:
			return formaPagamentoString = "Dinheiro"
		case FormaPagamento.OUTROS:
			return formaPagamentoString = "Outros"
		case FormaPagamento.PIX:
			return formaPagamentoString = "Pix"

		default:
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			formaPagamentoString = "Nenhum"
			break;
	}

	return formaPagamamento;

}