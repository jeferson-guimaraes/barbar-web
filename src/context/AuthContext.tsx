"use client";

import { createContext, ReactNode, useState, useEffect } from "react";
import { destroyCookie, setCookie, parseCookies } from "nookies";
import { useRouter } from "next/navigation";
import { api } from "../services/apiClient";

interface SubscriptionProps {
	id: string;
	status: string;
}

interface UserProps {
	id: string;
	name: string;
	email: string;
	endereco: string | null;
	subscriptions?: SubscriptionProps | null;
}

interface AuthContextData {
	user: UserProps;
	isAuthenticated: boolean;
	signIn: (credentials: SignInProps) => Promise<void>;
	signUp: (credentials: SignUpProps) => Promise<void>;
	logoutUser: () => Promise<void>;
}

type AuthProviderProps = {
	children: ReactNode;
}

interface SignInProps {
	email: string;
	password: string;
}

interface SignUpProps {
	name: string;
	email: string;
	password: string;
}

export const AuthContext = createContext({} as AuthContextData);

export function signOut() {
	console.log("ERROR LOGOUT");

	try {
		destroyCookie(null, '@barber.token', { path: '/' });
		window.location.href = '/login';
	} catch (error) {
		console.log("Error ao deslogar");
	}
}

export function AuthProvider({ children }: AuthProviderProps) {
	const router = useRouter();
	const [user, setUser] = useState<UserProps>();
	const isAuthenticated = !!user;

	useEffect(() => {
		const { '@barber.token': token } = parseCookies();

		if (token) {
			api.get('/me')
				.then(response => {
					const { id, name, endereco, email, subscriptions } = response.data;
					setUser({
						id,
						name,
						email,
						endereco,
						subscriptions
					});
				})
				.catch(() => {
					signOut();
				});
		}
	});

	async function signIn({ email, password }: SignInProps) {
		try {
			const response = await api.post('/session', {
				email,
				password
			});

			const { id, name, token, subscriptions, endereco } = response.data;

			setCookie(undefined, '@barber.token', token, {
				maxAge: 60 * 60 * 24 * 30,
				path: '/'
			});

			setUser({
				id,
				name,
				email,
				subscriptions,
				endereco
			});

			api.defaults.headers['Authorization'] = `Bearer ${token}`;

			router.push('/dashboard');

		} catch (error) {
			console.log("ERROR LOGING", error);
		}
	}

	async function signUp({ name, email, password }: SignUpProps) {
		try {
			const response = await api.post('/users', {
				name,
				email,
				password
			});

			router.push('/login');
		} catch (error) {
			console.log("ERROR LOGING", error);
		}
	}

	async function logoutUser() {
		try {
			destroyCookie(null, '@barber.token', { path: '/' });
			setUser(null);
		} catch (error) {
			console.log("Error ao deslogar", error);
		}
	}

	return (
		<AuthContext.Provider value={{ user, isAuthenticated, signIn, signUp, logoutUser }}>
			{children}
		</AuthContext.Provider>
	)
}