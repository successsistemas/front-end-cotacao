import { useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { CotacaoTDO } from "../lib/types";

export const useItem = () => {

	const [valorProduto, setValorProduto] = useState('');
	const [frete, setFrete] = useState('');
	const [st, setSt] = useState('');
	const [icms, setIcms] = useState('');
	const [mva, setMva] = useState('')
	const [desconto, setDesconto] = useState('');
	//const [formaPagamento, setFormaPagamento] = useState('');
	const [ipi, setIpi] = useState('');
	const [prazo, setPrazo] = useState('');
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [cotacao, setCotacao] = useState<CotacaoTDO>();
	const [formaPagamento, setFormaPagamento] = useState('0');

	const [note, setNote] = useState('');


	function abrirModal(cotacao: CotacaoTDO, value: string) {

		setCotacao(cotacao)
		setIpi(cotacao.ipi !== null ? cotacao?.ipi.toString() : '')
		setIcms(cotacao.icms !== null ? cotacao?.icms.toString() : '')
		setMva(cotacao.mva !== null ? cotacao?.mva.toString() : '')
		setSt(cotacao.st !== null ? cotacao?.st.toString() : '');
		setValorProduto(cotacao.valordoproduto !== null ? cotacao?.valordoproduto.toString() : '')
		setFrete(cotacao.frete !== null ? cotacao.frete.toString() : '')
		setDesconto(cotacao.desconto !== null ? cotacao.desconto.toString() : '')
		setNote(cotacao.observacao !== null ? cotacao?.observacao : '')
		setPrazo(cotacao.prazo !== null ? cotacao?.prazo.toString() : '')
		setFormaPagamento(cotacao.formaPagamento !== null ? cotacao?.formaPagamento?.toString() : '0');
		onOpen()
	}


	return {
		ipi,
		setIpi,
		icms,
		setIcms,
		mva,
		setMva,
		st,
		setSt,
		valorProduto,
		setValorProduto,
		note,
		setNote,
		frete,
		setFrete,
		setDesconto,
		desconto,
		abrirModal,
		onOpen,
		onClose,
		isOpen,
		cotacao,
		prazo,
		setPrazo,
		formaPagamento,
		setFormaPagamento
	}
}