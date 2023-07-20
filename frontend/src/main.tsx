
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

//css
import './styles/index.css'

//Router
import { BrowserRouter as Router } from 'react-router-dom'

//Redux
import { store } from './redux/store.ts'
import { Provider } from 'react-redux'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
  <Router>
    <App />
  </Router>
  </Provider>
)
