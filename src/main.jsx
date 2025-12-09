import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { createSlice } from '@reduxjs/toolkit'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

const slice = createSlice({
  name:"sliceName",
  initialState:{val:55},
  reducers:{
    reducer1: (state, action)=>{state.val = action.type;}
  }
});

const store = configureStore({
  reducer: {reducerName: slice.reducer}
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
  </StrictMode>,
)

export default slice.actions;