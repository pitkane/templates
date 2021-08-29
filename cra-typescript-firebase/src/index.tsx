import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import { App } from './features/App/App'
import { store } from './redux'
import { initFirebase } from './utils/firebase'

import 'antd/dist/antd.css'
import './index.css'

initFirebase()

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)
