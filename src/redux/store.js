import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'reduxjs-toolkit-persist';
import storage from 'reduxjs-toolkit-persist/lib/storage';
import { contactsReducer } from "./contacts/contactsSlice";
import { filterReducer } from "./filter/filterSlice";

const persistConfig = {
    key: 'root',
    storage,
};

export const store = configureStore({
    reducer: {
        contacts: persistReducer(persistConfig, contactsReducer),
        filter: filterReducer,
    }
});

export const persistor = persistStore(store);

