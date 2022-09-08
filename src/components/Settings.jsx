import { CustomButton }   from './'
import { useContext }     from "react"
import { DEFAULTVALUES }  from '../config'
import { useNavigate }    from "react-router-dom"
import SettingsContext    from "../context/SettingContext"

const Settings = (props) => {
  const navigate  = useNavigate()
  const context = useContext(SettingsContext)
  const handleClick = () => {
    context.setFocusMinutes(DEFAULTVALUES.focus)
    context.setRelaxMinutes(DEFAULTVALUES.relax)
    context.setFocusSentence(DEFAULTVALUES.sentence)
  }

  return (
    <div className='container mt-5 settings'>
      <h2>Settings</h2>
      <div className="mt-3">
        <label htmlFor="focusSentence" className="form-label">
          Enter your focus sentence
        </label>
        <input 
          type="text" 
          className="form-control" 
          id="focusSentence" 
          value={context.focusSentence}
          onInput={e => context.setFocusSentence(e.target.value) }
        />
      </div>
      <label htmlFor="focus" className="form-label mt-3">
        Focus: {context.focusMinutes}
      </label>
      <input 
        min="1"
        max="120" 
        id="focus" 
        type="range" 
        className="form-range" 
        value={context.focusMinutes}
        onChange={e => context.setFocusMinutes(e.target.value)}
      />
      <label htmlFor="relax" className="form-label mt-3">
        Relax: {context.relaxMinutes}
      </label>
      <input 
        min="1"
        max="120" 
        id="relax" 
        type="range" 
        className="form-range" 
        value={context.relaxMinutes}
        onChange={e => context.setRelaxMinutes(e.target.value)}
      />
      <div className="row mt-5">
        <div className="col-xs-6">
            <CustomButton 
              type="button" 
              classS="info btn-sm w-100" 
              label="Save and back" 
              style={{
                fontSize: "20px", 
                background: 'rgb(202, 78, 121)',
                border: '1px solid rgb(255, 193, 142)',
                color:'rgb(255, 193, 142)'
              }}
              handleClick={() => navigate('/') }
            />
        </div>

        <div className="col-xs-6">
          <CustomButton 
            type="button" 
            classS="info btn-sm w-100" 
            label="Reset" 
            style={{
              fontSize: "20px", 
              background: 'rgb(122, 64, 105)',
              border: '1px solid rgb(202, 78, 121)',
              color:'rgb(202, 78, 121)'
          }}
            handleClick={handleClick}
          />
        </div>
        
      </div>

    </div>
  )
}

export default Settings
