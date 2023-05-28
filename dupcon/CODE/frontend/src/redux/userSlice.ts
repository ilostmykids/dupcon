import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface userInterface {
	uid: string | null
	username: string | null
	token: string | null
}

const initialState: userInterface = {
	uid: null,
	username: null,
	token: null
}

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUser(state, action: PayloadAction<userInterface>){
			state.uid = action.payload.uid
			state.username = action.payload.username
			state.token = action.payload.token
		},
		eraseUser(state){
			state.uid = null
			state.username = null
			state.token = null
		}
	}
})

export default userSlice.reducer
export const { eraseUser, setUser } = userSlice.actions