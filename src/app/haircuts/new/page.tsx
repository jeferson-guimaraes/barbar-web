"use client";

import { Sidebar } from "@/components/sidebar/Sidebar";
import { api } from "@/services/apiClient";
import { Button, Flex, Heading, Input, Text, useMediaQuery } from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiChevronLeft } from "react-icons/fi"

export default function NewHaircut() {
	const [isMobile] = useMediaQuery(["(max-width: 500px)"]);
	const [subscription, setSubscription] = useState(false);
	const [count, setCount] = useState(0);
	const [name, setName] = useState("");
	const [price, setPrice] = useState("");

	useEffect(() => {

		async function checkSubscription() {
			try {

				const response = await api.get('/haircut/check');
				const count = await api.get('/haircut/count');

				setSubscription(response.data?.subscriptions?.status === 'active' ? true : false);
				setCount(count.data);
			} catch (error) {
				console.log(error);
			}
		}

		checkSubscription();
	}, [])

	async function handleRegister() {
		if (name === "" && price === "") {
			return;
		}

		try {
			await api.post('/haircut', {
				name,
				price: Number(price)
			});

			setName("");
			setPrice("");

			alert("Modelo cadastrado com sucesso");
		} catch (error) {
			console.log(error);
			alert("Erro ao cadastrar novo modelo");
		}
	}

	return (
		<>
			<Sidebar>
				<Flex direction={"column"} alignItems={"flex-start"} justifyContent={"flex-start"}>

					<Flex
						direction={isMobile ? "column" : "row"}
						w={"100%"}
						alignItems={isMobile ? "flex-start" : "center"}
						mb={isMobile ? 4 : 0}
					>
						<Link href={"/haircuts"}>
							<Button
								p={4}
								display={"flex"}
								alignItems={"center"}
								justifyItems={"center"}
								mr={4}
							>
								<FiChevronLeft size={24} color="#FFF" />
								Voltar
							</Button>
						</Link>
						<Heading
							color={"orange.900"}
							mt={4}
							mb={4}
							mr={4}
							fontSize={isMobile ? '28px' : '3xl'}
						>
							Modelos de corte
						</Heading>
					</Flex>

					<Flex
						maxW={"700px"}
						bg={"barber.400"}
						w={"100%"}
						align={"center"}
						justify={"center"}
						pt={8}
						pb={8}
						direction={"column"}
					>
						<Heading fontSize={isMobile ? '22px' : '3xl'} color={"white"} mb={4}>Cadastrar modelo</Heading>

						<Input
							placeholder="Nome do corte"
							size={"lg"}
							type="text"
							w={"85%"}
							bg={"gray.900"}
							mb={3}
							disabled={!subscription && count >= 3 ? true : false}
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>

						<Input
							placeholder="Valor do corte ex: 59.90"
							size={"lg"}
							type="text"
							w={"85%"}
							bg={"gray.900"}
							mb={4}
							disabled={!subscription && count >= 3 ? true : false}
							value={price}
							onChange={(e) => setPrice(e.target.value)}
						/>

						<Button
							w={"85%"}
							size={"lg"}
							color={"gray.900"}
							mb={6}
							bg={"button.cta"}
							_hover={{ bg: "#ffb13e" }}
							disabled={!subscription && count >= 3 ? true : false}
							onClick={handleRegister}
						>
							Cadastrar
						</Button>

						{!subscription && count >= 3 && (
							<Flex direction={"row"} align={"center"} justifyContent={"center"}>
								<Text>
									Você atingiu seu limite de corte.
								</Text>
								<Link href="/planos">
									<Text fontWeight={"bold"} color={"#31FB6A"} cursor={"pointer"} ml={1}>
										Seja premium
									</Text>
								</Link>
							</Flex>
						)}
					</Flex>

				</Flex>
			</Sidebar>
		</>
	)
}