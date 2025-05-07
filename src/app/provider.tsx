"use client"

import { ChakraProvider } from "@chakra-ui/react"
import { system } from "@/theme";

export default function RootLayout(props: { children: React.ReactNode }) {
	return (
		<ChakraProvider value={system}>
			{props.children}
		</ChakraProvider>
	)
}