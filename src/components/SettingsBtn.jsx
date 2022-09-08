import { Link } from "react-router-dom"

const SettingsBtn = (props) => {
  return (
    <Link 
      {...props} 
      to="settings" 
      style={{ fontSize: "20px"}}
      className="btn rounded-pill btn-primary px-5 py-2"
    >    
        Settings
    </Link>
  )
}

export default SettingsBtn
