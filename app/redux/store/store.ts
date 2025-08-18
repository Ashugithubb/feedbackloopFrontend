'use client';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import userReducer from '../slice/user.slice';
import storage from 'redux-persist/lib/storage'; 
import { persistStore, persistReducer } from 'redux-persist';
import feedbackReducer from '../slice/feeback.slice'
import tagReducer from '../slice/tags.slice'
import userSearchReducer from '../slice/author.slice'
import myFeedbackReducer from '../slice/my.feedback.slice'
import loginReducer from '../slice/auth.slice'
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user','login'], 
};

const rootReducer = combineReducers({
  user: userReducer,
  feedback:feedbackReducer,
  tags:tagReducer,
  author:userSearchReducer,
  myfeedback: myFeedbackReducer,
  login:loginReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

