import { createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"

export interface Reminder{
	id: string
	uid: string
	time: string
	marks: string[]
	code: string
	language: string
	label: string
}

export const remindersApi = createApi({
	reducerPath: 'reminderApi',
	tagTypes: ['reminder'],
	baseQuery: fetchBaseQuery({baseUrl: "http://reminder-api/"}),
	endpoints: (build) => ({
		getReminders: build.query<Reminder[], string>({
			query: (id) => `reminders/${id}`,
			providesTags: ['reminder']
		}),
		getReminder: build.query<Reminder, string>({
			query: (id) => `reminder/${id}`,
			providesTags: ['reminder']
		}),
		addReminder: build.mutation({
			query: (body) => ({
				url: 'reminder',
				method: 'POST',
				body
			}),
			invalidatesTags: ['reminder']
		}),
		deleteReminder: build.mutation({
			query: (id) => ({
				url: `reminder/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['reminder']
		}),
		updateReminder: build.mutation({
			query: (body) => ({
				url: 'reminder',
				method: 'PUT',
				body
			}),
			invalidatesTags: ['reminder']
		})
	})
})

export const {
	useGetRemindersQuery, 
	useGetReminderQuery, 
	useAddReminderMutation, 
	useDeleteReminderMutation, 
	useUpdateReminderMutation
} = remindersApi