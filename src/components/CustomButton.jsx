import React from 'react'

const CustomButton = ({classS, handleClick, label, style, type}) => (
    <button
        style={style}
        type = {type}
        onClick={handleClick}
        className={`btn ${classS} mt-3 rounded-pill px-3`}
    >
      {label}
    </button>
  )

export default CustomButton
