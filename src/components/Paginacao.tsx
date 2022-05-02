import { Button, HStack } from "@chakra-ui/react";
import React from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
type Props = {
	totalItens: number,
	quantidadePorPagina: number,
	currentPage: number,
	setCurrentPage: React.Dispatch<React.SetStateAction<number>>

}
export const Paginacao = (props: Props) => {
	const quantidadeTotalPaginas = props.totalItens / props.quantidadePorPagina + 1;
	const todosNumeros: any = [];



	criarListaDeNumeros();
	function criarListaDeNumeros() {
		for (let i = 1; i < quantidadeTotalPaginas; i++) todosNumeros.push(i);
	}
	function checkarPaginaAtualParaDeixarButtonAzul(n: number) {
		return n === props.currentPage;
	}
	function canBack() {
		return props.currentPage > 1;
	}
	function canNext() {
		const totalTemp = quantidadeTotalPaginas - 1;
		return props.currentPage < totalTemp;
	}
	function next() {
		props.setCurrentPage(props.currentPage + 1)
	}
	function back() {
		props.setCurrentPage(props.currentPage - 1)
	}

	return (
		<HStack marginBottom={10} borderRadius={3} px={2} py={1} >
			<Button disabled={canBack() ? false : true} size={"sm"} onClick={() => { back() }}><MdKeyboardArrowLeft /></Button>
			{
				todosNumeros?.map((numero: any) => (
					checkarPaginaAtualParaDeixarButtonAzul(numero) ? <Button onClick={() => { props.setCurrentPage(numero) }} colorScheme={"azul"} variant={"outline"} size={"sm"}>{numero}</Button>
						: <Button onClick={() => { props.setCurrentPage(numero) }} color={"gray"} variant={"outline"} size={"sm"}>{numero}</Button>
				))
			}
			<Button onClick={() => { next() }} disabled={canNext() ? false : true} variant={"outline"} size={"sm"}><MdKeyboardArrowRight /></Button>
		</HStack>
	);
}