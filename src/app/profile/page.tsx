"use client";

import { Flex, Text, Heading, Box, Input, Button } from "@chakra-ui/react";
import { Sidebar } from "@/components/sidebar/Sidebar";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import { api } from "@/services/apiClient";

interface ProfileProps {
	id: string;
	name: string;
	email: string;
	endereco: string | null;
	premium: boolean;
}

export default function Profile() {
	const [user, setUser] = useState<ProfileProps>();
	const [name, setName] = useState("");
	const [endereco, setEndereco] = useState("");
	const [email, setEmail] = useState("");
	const { logoutUser } = useContext(AuthContext);

	async function handleLogout(){
		await logoutUser();
	}

	async function handleUpdateUser(){
		if (name === ""){
			return;
		}

		try {
			await api.put('/users', {
				name,
				endereco
			});

			alert("Dados alterados com sucesso");
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		async function getClient(){
			try{
	
				const response = await api.get('/me');

				const user = {
					id: response.data.id,
					name: response.data.name,
					email: response.data.email,
					endereco: response.data?.endereco,
					premium: response.data?.subscriptions?.status === 'active'
				}

				setUser(user);
				setName(user.name);
				setEndereco(user.endereco);
				setEmail(user.email);
	
			}catch(error){
				console.log(error);
			}
		}

		getClient();
	}, []);

	return (
		<>
			<Sidebar>
				<Flex direction={"column"} alignItems={"flex-start"} justifyContent={"flex-start"}>

					<Flex w={"100%"} direction={"row"} alignItems={"center"} justifyContent={"flex-start"}>
						<Heading fontSize={"3xl"} mt={4} mb={4} mr={4} color={"orange.900"}>
							Minha Conta
						</Heading>
					</Flex>

					<Flex maxW={"700px"} w={"100%"} direction={"column"} alignItems={"center"} justifyContent={"center"} bg={"barber.400"} pt={8} pb={8}>
						<Flex direction={"column"} w="85%">
							<Text mb={2} fontSize={"xl"} fontWeight={"bold"} color={"white"}>
								Nome da barbearia:
							</Text>
							<Input
								w={"100%"}
								background={"barber.900"}
								placeholder="Nome da barbearia"
								size={"lg"}
								type="text"
								mb={3}
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>

							<Text mb={2} fontSize={"xl"} fontWeight={"bold"} color={"white"}>
								Endereço:
							</Text>
							<Input
								w={"100%"}
								background={"barber.900"}
								placeholder="Endereço da barbearia"
								size={"lg"}
								type="text"
								mb={3}
								value={endereco}
								onChange={(e) => setEndereco(e.target.value)}
							/>

							<Text mb={2} fontSize={"xl"} fontWeight={"bold"} color={"white"}>
								Plano atual:
							</Text>
							<Flex
								direction={"row"}
								w={"100%"}
								mb={3}
								p={1}
								borderWidth={1}
								rounded={6}
								background={"barber.900"}
								alignItems={"center"}
								justifyContent={"space-between"}
							>
								<Text p={2} fontSize={"lg"} color={user?.premium ? "#FBA931" : "#4dffb4"}>
									Plano {user?.premium ? "Premium" : "Grátis"}
								</Text>

								<Link href={"/planos"} style={{ textDecoration: 'none' }}>
									<Box
										cursor={"pointer"}
										p={1}
										background={"#00cd52"}
										rounded={4}
										color={"white"}
									>
										Mudar plano
									</Box>
								</Link>
							</Flex>

							<Button
								w={"100%"}
								mt={3}
								mb={4}
								background={"button.cta"}
								size={"lg"}
								_hover={{ bg: "#ffb13e" }}
								onClick={handleUpdateUser}
							>
								Salvar
							</Button>

							<Button
								w={"100%"}
								mt={3}
								mb={4}
								background={"transparent"}
								borderWidth={2}
								borderColor={"red.500"}
								color={"red.500"}
								size={"lg"}
								_hover={{ bg: "transparent" }}
								onClick={handleLogout}
							>
								Sair da conta
							</Button>

						</Flex>

					</Flex>

				</Flex>
			</Sidebar>
		</>
	)
}