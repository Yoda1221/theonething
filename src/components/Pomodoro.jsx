import { CustomButton }     from './'
import { MODE }             from '../config'
import { useNavigate }      from "react-router-dom"
import alertSound           from '../assets/alert.mp3'
import SettingsContext      from "../context/SettingContext"
import { ToastContainer, toast }        from 'react-toastify'
import { FiPauseCircle, FiPlayCircle }  from 'react-icons/fi'
import { useContext, useEffect, useRef, useState }  from 'react'
import { CircularProgressbar, buildStyles }         from 'react-circular-progressbar'

import 'react-toastify/dist/ReactToastify.css'
import 'react-circular-progressbar/dist/styles.css'

const Pomodoro = () => {
  const navigate              = useNavigate()
  const context               = useContext(SettingsContext)
  const [minLeft, setminLeft] = useState(0)
  const [isPlay, setIsPlay]   = useState(false)
  const [mode, setMode]       = useState(MODE.focus) //* focus, relax, null
  const [fullTime, setFullTime] = useState(context.focusMinutes * 60) 
  const audioPlayer           = useRef(null)
  const modeRef               = useRef(mode)
  const isPlayRef             = useRef(isPlay)
  const minLeftRef            = useRef(minLeft)

  const playAudio = ()  => { audioPlayer.current.play() }
  const addZero   = (n) => { return (parseInt(n, 10) < 10 ? '0' : '') + n }
  const notify    = ()  => {
    toast.info('The relax time is begin', { 
      autoClose: 5000,
      draggable: true,
      closeOnClick: true,
      pauseOnHover: true,
      hideProgressBar: false,
      className: 'black-background',
      progressClassName: 'fancy-progress-bar'
    })
  }
  const countDown = () => {
    minLeftRef.current--
    setminLeft(minLeftRef.current)
  }
  const setPomodoro = () => {
    minLeftRef.current = context.focusMinutes * 60
    setminLeft(minLeftRef.current)
  }
  const changeMode = () => {
    const nextMode = modeRef.current === MODE.focus ? MODE.relax : MODE.focus
    const nextSec = nextMode === MODE.focus 
      ? context.focusMinutes * 60
      : context.relaxMinutes * 60

    setMode(nextMode)
    modeRef.current = nextMode

    setminLeft(nextSec)
    minLeftRef.current = nextSec

    setFullTime(
      modeRef.current === MODE.focus
      ? context.focusMinutes * 60
      : context.relaxMinutes * 60
    )

    if (modeRef.current === MODE.relax) notify()

    playAudio()
  }
  
  const percentage  = Math.round((minLeft / fullTime) * 100)
  const min         = addZero(Math.floor(minLeft / 60))
  let sec           = addZero(minLeft % 60)
  const color       = percentage < 11 ? 'rgba(255, 193, 142, 1)' : mode === MODE.focus ? 'rgba(158, 56, 128, 1)' : 'rgba(202, 78, 121,1)'

  useEffect(() => {
    setPomodoro()

    const intervall = setInterval(() => {
      if (!isPlayRef.current) return
      if (minLeftRef.current === 0 ) return changeMode()

      countDown()
    }, 1000)

    return () => clearInterval(intervall)
  }, [context])

  return (
    <div>
      <h2 className='mb-4'>{context.focusSentence}</h2>
      <CircularProgressbar 
        value={percentage} 
        text={`${min}:${sec}`}
        styles={buildStyles({
          strokeLinecap: 'round',
          textSize: '16px',
          pathColor: color,
          tailColor: '#FFC18E',
          textColor: '#CA4E79',
          trailColor: '#7A4069',
          backgroundColor: '#FFC18E',
        })} 
      />
      <p className='text-center mt-3'>
        { modeRef.current === MODE.focus 
          ? MODE.focus.charAt(0).toUpperCase() + MODE.focus.slice(1)
          : MODE.relax.charAt(0).toUpperCase() + MODE.relax.slice(1) 
        } time
      </p>
      <div className="mt-3 d-flex justify-content-center">
        {isPlay 
          ? <CustomButton 
              type="button" 
              classS="btn-sm" 
              label={ <FiPauseCircle /> } 
              style={{
                fontSize: "40px", 
                color:'rgb(255, 193, 142)',
                background: 'rgb(81, 50, 82)',
                border: '1px solid rgb(202, 78, 121)',
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                display: "grid",
                placeContent: "center"
              }}
              handleClick={() => {
                setIsPlay(false)
                isPlayRef.current = false
              }}
            /> 
          : <CustomButton 
              type="button" 
              classS="btn-sm" 
              label={ <FiPlayCircle /> } 
              style={{
                fontSize: "40px", 
                color:'rgb(202, 78, 121)',
                background: 'rgb(81, 50, 82)',
                border: '1px solid rgb(255, 193, 142)',
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                display: "grid",
                placeContent: "center"
              }}
              handleClick={() => {
                setIsPlay(true)
                isPlayRef.current = true
              }}
            />
        }
      </div>
      <div className="mt-5 d-flex justify-content-center">
        <CustomButton 
          type="button" 
          classS="btn-sm w-100" 
          label="Settings focus" 
          style={{
            fontSize: "20px", 
            background: 'rgb(81, 50, 82)',
            border: '1px solid rgb(122, 64, 105)',
            color:'rgb(255, 193, 142)'
          }}
          handleClick={() => navigate('settings')}
        />
      </div>
      <audio ref={audioPlayer} src={alertSound} />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        theme='rgb(122, 64, 105)'
      />
    </div>
  )
}

export default Pomodoro
