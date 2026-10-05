import { Provider } from 'react-redux'

import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './Context/authContext.jsx'
import { store } from './Redux/store.js'
import { LocationProvider } from './Context/LocationContext'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <AuthProvider>
     <LocationProvider>
      <App />
    </LocationProvider>
    </AuthProvider>
  </Provider>
)
