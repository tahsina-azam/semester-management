import React from 'react'

const Center = ({children,style}) => {
  return (
    <div style={{
        ...style,
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        flexDirection:"column"

    }}>{children}</div>
  )
}

export default Center