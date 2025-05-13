"use client"

import { Children, ReactNode, useState } from "react";
import {
	IconButton,
	Box,
	CloseButton,
	Flex,
	Icon,
	Drawer,
	DrawerContent,
	Text,
	useDisclosure,
	BoxProps,
	FlexProps,
	Portal
} from "@chakra-ui/react";
import {
	FiScissors,
	FiClipboard,
	FiSettings,
	FiMenu
} from 'react-icons/fi';
import { IconType } from "react-icons/lib";

import Link from "next/link";

interface LinkItemsProps {
	name: string;
	icon: IconType;
	route: string;
}

const LinkItems: Array<LinkItemsProps> = [
	{ name: 'Agenda', icon: FiScissors, route: '/dashboard' },
	{ name: 'Cortes', icon: FiClipboard, route: '/haircuts' },
	{ name: 'Minha Conta', icon: FiSettings, route: '/profile' },
];

export function Sidebar({ children }: { children: ReactNode }) {
	const { open, setOpen, onClose } = useDisclosure();

	return (
		<Box minH="100vh" bg="barber.900">
			<SidebarContent
				onClose={() => onClose}
				display={{ base: "none", md: "block" }}
			/>

			<Drawer.Root open={open} onOpenChange={(e) => setOpen(e.open)} placement={"start"}>
				<Portal>
					<Drawer.Positioner>
						<Drawer.Content>
							<SidebarContent onClose={() => setOpen(false)} />
						</Drawer.Content>
					</Drawer.Positioner>
				</Portal>
			</Drawer.Root>

			<MobileNav display={{ base: "flex", md: "none" }} onOpen={() => setOpen(true)} />

			<Box ml={{ base: 0, md: 60 }} p={4}>
				{children}
			</Box>
		</Box>
	)
}

interface SidebarProps extends BoxProps {
	onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
	return (
		<Box
			bg="barber.400"
			borderRight={"1px"}
			borderRightColor={"gray.200"}
			w={{ base: "full", md: 60 }}
			pos="fixed"
			h="full"
			{...rest}
		>

			<Flex h={"20"} alignItems="center" justifyContent={"space-between"} mx="8">
				<Link href={"/dashboard"}>
					<Flex cursor={"pointer"} userSelect={"none"} flexDirection={"row"}>
						<Text fontSize={"2xl"} fontFamily={"monospace"} fontWeight={"bold"}>Barber</Text>
						<Text fontSize={"2xl"} fontFamily={"monospace"} fontWeight={"bold"} color="button.cta">PRO</Text>
					</Flex>
				</Link>

				<CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
			</Flex>

			{LinkItems.map(link => (
				<NavItem icon={link.icon} route={link.route} key={link.name}>
					{link.name}
				</NavItem>
			))}

		</Box>
	)
}

interface NavItemProps extends FlexProps {
	icon: IconType;
	children: ReactNode;
	route: string;
}

const NavItem = ({ icon, children, route, ...rest }: NavItemProps) => {
	return (
		<Link href={route} style={{ textDecoration: 'none' }}>
			<Flex
				align={"center"}
				p="4"
				mx="4"
				borderRadius="lg"
				role={"group"}
				cursor={"pointer"}
				_hover={{
					bg: 'barber.900',
					color: 'white'
				}}
				{...rest}
			>

				{icon && (
					<Icon
						mr="4"
						fontSize="16"
						_groupHover={{
							color: 'white'
						}}
						as={icon}
					/>
				)}
				{children}
			</Flex>
		</Link>
	);
}

interface MobileProps extends FlexProps {
	onOpen: () => void;
}

const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
	return (
		<Flex
			ml={{ base: 0, md: 60 }}
			px={{ base: 4, md: 24 }}
			height="20"
			alignItems={"center"}
			borderBottomWidth="1px"
			borderBottomColor={"gray.200"}
			justifyContent={"flex-start"}
			{...rest}
		>

			<IconButton
				variant={"outline"}
				onClick={onOpen}
				aria-label="open menu"
				color={"gray.400"}
			>
				<FiMenu />
			</IconButton>

			<Flex>
				<Text ml={8} fontSize={"2xl"} fontFamily={"monospace"} fontWeight={"bold"}>Barber</Text>
				<Text fontSize={"2xl"} fontFamily={"monospace"} fontWeight={"bold"} color="button.cta">PRO</Text>
			</Flex>
		</Flex>
	)
}