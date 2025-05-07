import Head from "next/head";
import { Button, Center, Flex, Input, Text } from "@chakra-ui/react";
import Image from "next/image";
import logoImg from '../../../public/images/logo.svg'
import Link from "next/link";

export default function Login() {
	return (
		<>
			<Head>
				<title>Login - BarberPRO</title>
			</Head>
			<Flex background="barber.900" height="100vh" alignItems="center" justifyContent="center">

				<Flex width={640} direction="column" p={14} rounded={8}>
					<Center p={4}>
						<Image
							src={logoImg}
							quality={100}
							width={240}
							objectFit="fill"
							alt="Logo BarberPRO"
						/>
					</Center>

					<Input
						background={"barber.400"}
						variant="subtle"
						size="lg"
						placeholder="email@email.com"
						type="email"
						mb={3}
					/>

					<Input
						background={"barber.400"}
						variant="subtle"
						size="lg"
						placeholder="*******"
						type="text"
						mb={6}
					/>

					<Button
						background="button.cta"
						mb={6}
						color="gray.900"
						size="lg"
						_hover={{ bg: "#ffb13e" }}
					>
						Acessar
					</Button>

					<Center>
						<Link href="/register">
							<Text cursor="pointer">
								Ainda não possui conta? <strong>Cadastre-se</strong>
							</Text>
						</Link>
					</Center>
				</Flex>

			</Flex>
		</>
	)
}