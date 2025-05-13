import { Sidebar } from "@/components/sidebar/Sidebar"
import { Flex, Text } from "@chakra-ui/react"

export default function Dashboard() {
	return (
		<>
			<Sidebar>
				<Flex>
					<Text>Dashboard</Text>
				</Flex>
			</Sidebar>
		</>
	)
}