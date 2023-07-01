import React from 'react'
import { useLocation } from "react-router-dom";

const Hotelpaying = () => {
  const location=useLocation()
  const resortDataa=location.state?.resortIdd
  console.log(resortDataa,"data of selected resort.....")
  

  return (
    <div>Hotelpaying</div>
  )
}

export default Hotelpaying