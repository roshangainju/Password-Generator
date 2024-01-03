import React, {useCallback, useState, useEffect, useRef} from 'react'
import "./App.css"

const App = () => {

  const [length, setLength]=useState(10)
  const [numberAllowed, setNumberAllowed]=useState(false)
  const [characterAllowed, setCharacterAllowed]=useState(false)
  const [password, setPassword]=useState()
  const passwordRef=useRef(null)

  const passwordGenerator=useCallback(()=>{
    let pass="";
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed){
      str +="0123456789"
    }
    if (characterAllowed){str +="!@#$%^&*()"}
    for (let i = 0; i < length; i++) {
      const char=Math.floor(Math.random()*str.length+1)
      pass += str.charAt(char)
      
    }
    setPassword(pass)
  },[length, numberAllowed, characterAllowed])

  const copyPasswordToClipBoard=useCallback(()=>{
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(()=>passwordGenerator(),[length,numberAllowed,characterAllowed,])
  return (
  <div className='body'>
    <div className='container m-5'>
      <h1>Password Generator</h1>
      <div className="row p-4 ">
        <div className="col-12 pt-4 pb-2 d-flex justify-content-center">
          <input className="text-white" id="passwordField" value={password} type="text" ref={passwordRef} />
          <button className="btn btn-primary" onClick={copyPasswordToClipBoard}>Copy</button>
        </div>
      </div>
      <div className="row  pb-5 justify-content-center text-light">
        <div className="col-9 d-flex justify-content-center ">
          <div className="col-4 d-flex" >
            <input  type="range" value={length} onChange={(e)=>{setLength(e.target.value)}} name="vol" min="8" max="20"/> Length ({length})
          </div>
          <div className="col-2 d-flex  ps-4">
            <input defaultChecked={numberAllowed} 
            onChange={()=>setNumberAllowed((prev)=>!prev)} 
            type="checkbox"/>Number
          </div>
          <div className="col-2">
            <input defaultChecked={characterAllowed} onChange={()=>setCharacterAllowed((prev)=>!prev)} type="checkbox"/>Character
          </div>
      
        </div>
      </div>
  
    </div>
  </div>
  )
}

export default App