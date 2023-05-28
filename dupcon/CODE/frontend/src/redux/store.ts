import { configureStore, combineReducers} from "@reduxjs/toolkit"
import userSlice from "./userSlice"
import { persistStore,
	persistReducer,
	FLUSH,
  	REHYDRATE,
  	PAUSE,
  	PERSIST,
  	PURGE,
  	REGISTER
	} from "redux-persist"
import storage from 'redux-persist/lib/storage'
import { remindersApi } from "./remindersApi"


const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['user']
}

const rootReducer = combineReducers({
	user: userSlice,
	[remindersApi.reducerPath]: remindersApi.reducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(remindersApi.middleware),
})

const persistor = persistStore(store)

export { persistor }
export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch