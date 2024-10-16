import { Header } from '@/components/header'

import { OrganizationForm } from '../organization/form'

export default function CreateOrganization() {
	return (
		<div className="flex min-h-screen flex-col px-5 py-4 md:px-8">
			<Header />

			<main className="mx-auto flex w-full max-w-[1200px] flex-grow items-center py-8">
				<div className="mx-auto w-full max-w-[480px] space-y-4">
					<h1 className="text-2xl font-bold">Create an organization</h1>

					<OrganizationForm />
				</div>
			</main>
		</div>
	)
}