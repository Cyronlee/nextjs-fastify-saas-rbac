import { redirect } from 'next/navigation'

import { isAuthenticated } from '@/auth'

export default async function authLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	if (isAuthenticated()) {
		redirect('/')
	}

	return (
		<div className="flex min-h-screen flex-col items-center justify-center px-4 py-6">
			<div className="w-full max-w-xs">{children}</div>
		</div>
	)
}