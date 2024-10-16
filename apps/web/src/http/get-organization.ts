import { API } from '../lib/api-client'

interface GetOrganizationResponse {
	organization: {
		id: string
		slug: string
		name: string
		domain: string | null
		shouldAttachUsersByDomain: boolean
		avatarUrl: string | null
		createdAt: string
		updatedAt: string
		ownerId: string
	}
}

export async function getOrganization(organization: string) {
	const result = await API.get(
		`organizations/${organization}`,
	).json<GetOrganizationResponse>()

	return result
}