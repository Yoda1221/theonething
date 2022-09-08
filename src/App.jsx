import { useState } from 'react'
import { Home, Layout, Settings } from "./components"
import { Routes, Route} from 'react-router-dom'
import SettingsContext from './context/SettingContext'
import { DEFAULTVALUES }  from './config'

function App() {
  const [focusMinutes, setFocusMinutes] = useState(DEFAULTVALUES.focus)
  const [relaxMinutes, setRelaxMinutes] = useState(DEFAULTVALUES.relax)
  const [focusSentence, setFocusSentence] = useState(DEFAULTVALUES.sentence)

  return (
    <>
    <SettingsContext.Provider value={{
      focusMinutes, relaxMinutes, focusSentence,
      setFocusMinutes, setRelaxMinutes, setFocusSentence
    }} >
      <Routes>
          <Route path='/' element={ <Layout />} >
            <Route index element={ <Home />} />
            <Route path='settings' element={ <Settings />} />
          </Route>
      </Routes>
    </SettingsContext.Provider>
    </>
  )
}

export default App
