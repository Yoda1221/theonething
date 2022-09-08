import React from 'react'
import App            from './App'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import './sass/style.scss'

createRoot(document.getElementById('root'))
.render(
  <React.StrictMode>
      <Router>
        <Routes>
          <Route path='/*' element={ <App /> } />
        </Routes>
      </Router>
  </React.StrictMode>
)
