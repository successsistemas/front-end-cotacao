import {
	Alert,
	AlertIcon, Button, Heading, Input,
	Modal, ModalBody,
	ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, useToast, VStack
} from "@chakra-ui/react";
import React, { useState } from "react";
import { BiErrorCircle } from 'react-icons/bi';
import { useNavigate } from "react-router-dom";
// import { useUsuario } from "../hooks/useUsuario";
import { apiFornecedorLogin, apiFornecedorVerificarCredenciais, apiFornecedorVerificarEmail } from "../lib/apiUsuario";
export const FormularioLogin = () => {


	const [loading, setLoading] = useState(false);

	//passos para o login
	const [passo, setPasso] = useState(1);

	const [textoModal] = useState(
		'O email informado não coincide com o de nenhum fornecedor no nosso cadastro de fornecedores. Certifique - se que seus dados estejam atualizados junto a Success, caso necessário entre em contato com a Success, fale com nosso setor de atendimento e diga que deseja atualizar seu email no cadastro de fornecedores.'
	);

	const { isOpen, onOpen, onClose } = useDisclosure()

	const navigate = useNavigate();
	const [isEmailValid, setEmailValid] = useState<boolean>(false);
	const [isSenhaExiste, setSenhaExiste] = useState(false);

	const toast = useToast();

	//campos 
	const [email, setEmail] = useState('');
	const [senha, setSenha] = useState('');

	const verificarEmailExiste = async (dataEmail: string) => {
		setLoading(true)
		await apiFornecedorVerificarEmail(dataEmail)
			.then((result) => {
				verificarCredenciais(dataEmail);

			}).catch(error => {
				setLoading(false)
				onOpen();
			})
	}
	const verificarCredenciais = async (email: string) => {
		await apiFornecedorVerificarCredenciais(email)
			.then((result) => {
				setPasso(passo + 1)
				setSenhaExiste(true)
				setLoading(false)
				toast({
					title: "Login.",
					description: "Email encontrado! ",
					status: "success",
					duration: 2000,
					isClosable: true,
				})
				setEmailValid(true);
			}).catch(error => {
				setPasso(passo + 1)
				setEmailValid(true);
				setSenhaExiste(false)
				setLoading(false)
			})

		console.log(isEmailValid)
	}

	const fazerLogin = async () => {
		setLoading(true)
		await apiFornecedorLogin(email, senha)
			.then((result) => {
				setLoading(false)
				toast({
					title: "Login.",
					description: "Login efetuado com sucesso",
					status: "success",
					duration: 2000,
					isClosable: true,
				})
				localStorage.setItem('@App:token', result.data.access_token);
				//navigate('painel/home');
				navigate('painel');
			}).catch(error => {
				setLoading(false)
				toast({
					title: "Login.",
					description: "Senha inválida!.",
					status: "error",
					duration: 2000,
					isClosable: true,
				})
			})
	}
	const handleKeyPressEmail = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			verificarEmailExiste(email);
		}
	}
	const handleKeyPressSenha = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			fazerLogin();
		}
	}
	return (
		<>
			<VStack paddingX={3} w="full">
				{!isEmailValid ?
					<Heading mb={5} mt={5} fontSize="lg" >	Digite o seu e-mail.</Heading>
					: <>
						<Heading mb={5} mt={5} fontSize="lg" >Confirme que é voce</Heading>
						{isSenhaExiste ? <></>
							: <Alert status="success">
								<AlertIcon />
								Uma senha foi gerada e enviada para o seu email.
							</Alert>}
					</>}

				{isEmailValid ? <></> : <Input onKeyPress={(event) => { handleKeyPressEmail(event) }} onChange={(e) => { setEmail(e.target.value) }} name={email} label="Email" placeholder='Email' />}
				{isEmailValid ?

					<Input w="full" onKeyPress={(event) => { handleKeyPressSenha(event) }} type="password" onChange={(e) => { setSenha(e.target.value) }} name={senha} placeholder='Senha' />
					: <> </>}
				<Button fontWeight={"normal"} isLoading={loading} onClick={() => { passo === 2 ? fazerLogin() : verificarEmailExiste(email) }} w={"full"} colorScheme='blue'>Continuar</Button>
				<Button fontWeight={"normal"} colorScheme="teal" fontSize="sm" w="full" variant="ghost">Cadastrar novo usuário</Button>
			</VStack >
			<Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader >	<BiErrorCircle color={'red'} />Email não cadastrado	</ModalHeader>
					<ModalCloseButton />
					<ModalBody>

						{textoModal}
					</ModalBody>

					<ModalFooter>
						<Button colorScheme="blue" variant={"ghost"} mr={3} onClick={onClose}>
							Close
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);


}