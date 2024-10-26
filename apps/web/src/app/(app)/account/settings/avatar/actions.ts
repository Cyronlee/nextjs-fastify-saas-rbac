'use server'

import { HTTPError } from 'ky'
import { revalidateTag } from 'next/cache'

import { updateAvatar } from '@/http/update-avatar'

export async function updateAvatarAction(
	receipientId: string,
	file?: File | null,
) {
	if (!file) {
		return {
			success: false,
			message: 'There is no file selected',
			errors: null,
		}
	}

	try {
		const formData = new FormData()

		formData.append('file', file)

		await updateAvatar({
			receipientId,
			receipient: 'USER',
			formData,
		})

		revalidateTag('get-profile')
	} catch (error) {
		if (error instanceof HTTPError) {
			const { message } = await error.response.json()

			return {
				success: false,
				message,
				errors: null,
			}
		}

		console.error(error)

		return {
			success: false,
			message: 'Unexpected error, try again in a few minutes',
			errors: null,
		}
	}

	return {
		success: true,
		message: 'Your profile avatar was changed',
		errors: null,
	}
}
