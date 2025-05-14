"use client";

import { Sidebar } from "@/components/sidebar/Sidebar";
import { Button, Flex, Heading, Stack, Switch, Text, useMediaQuery } from "@chakra-ui/react";
import Link from "next/link";
import { IoMdPricetag } from "react-icons/io"

export default function Haircuts() {

	const [isMobile] = useMediaQuery(["(max-width: 500px)"]);

	return (
		<>
			<Sidebar>
				<Flex direction={"column"} alignItems={"flex-start"} justifyContent={"flex-start"}>
					<Flex
						direction={isMobile ? "column" : "row"}
						w={"100%"}
						alignItems={isMobile ? "flex-start" : "center"}
						justifyContent={"flex-start"}
						mb={0}
					>
						<Heading
							fontSize={isMobile ? '28px' : '3xl'}
							mt={4}
							mb={4}
							mr={4}
							color={"orange.900"}
						>
							Modelos de cortes
						</Heading>

						<Link href={"/haircuts/new"}>
							<Button>
								Cadastrar novo
							</Button>
						</Link>

						<Stack ml={"auto"} align={"center"} direction={"row"}>
							<Switch.Root
								colorPalette={"green"}
							>
								<Switch.HiddenInput />
								<Switch.Control />
								<Switch.Label fontWeight={"bold"}>ATIVOS</Switch.Label>
							</Switch.Root>
						</Stack>
					</Flex>

					<Link href="/haircuts/123" style={{ width: "100%" }}>
						<Flex
							cursor={"pointer"}
							w={"100%"}
							p={4}
							bg={"barber.400"}
							direction={isMobile ? "column" : "row"}
							alignItems={isMobile ? "flex-start" : "center"}
							rounded={4}
							mb={2}
							justifyContent={"space-between"}
						>
							
							<Flex mb={isMobile ? 2 : 0} direction={"row"} alignItems={"center"} justifyContent={"center"}>
								<IoMdPricetag size={28} color="#fba931" />
								<Text fontWeight={"bold"} ml={4} color={"#FFF"}>
									Corte completo
								</Text>
							</Flex>

							<Text fontWeight={"bold"} color={"#FFF"}>
								R$59.90
							</Text>

						</Flex>
					</Link>

				</Flex>
			</Sidebar>
		</>
	)
}