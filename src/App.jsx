
import './App.css'
import { useState , useCallback , useEffect,useRef} from 'react'  

function App() {
  const [length, setLength] = useState(8)
  const [numAllowed, setNumAllowed] = useState(true)
  const [symbolAllowed, setSymbolAllowed] = useState(true)
  const [PassWord, setPassword] = useState('')

  const passref = useRef(null)
  
  const passGen = () => {
    let pass = ''
    let allowed = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    let num = '0123456789'
    let symbol = '!@#$%^&*()_+'
    if (numAllowed) allowed += num
    if (symbolAllowed) allowed += symbol
    for (let i = 0; i < length; i++) {
      pass += allowed.charAt(Math.floor(Math.random() * allowed.length))
    }
    setPassword(pass)
  }

  useEffect(() => {
    passGen()
  }, [length, numAllowed, symbolAllowed])


   const copyToClipboard = useCallback(() => {
    passref.current?.select();
    passref.current?.setSelectionRange(0, 8);
    window.navigator.clipboard.writeText(PassWord)
    alert('Password copied to clipboard')

  },[PassWord])
  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-500'>
        <h1 className='text text-white text-center'>
          Password Generator
        </h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input 
            type='text' 
            value={PassWord} 
            onChange={() => {}} 
            className='outline-none px-3 py-2 w-full bg-gray-300'
            placeholder='password'
            readOnly
            ref={passref}
          />
          <button
            className='outline-none bg-blue-500 text-white px-4'
            onClick={copyToClipboard}
          >
            COPY
          </button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input 
              type="range"
              min={6}
              max={25}
              value={length} 
              className='w-full cursor-pointer'
              onChange={(e) => setLength(parseInt(e.target.value))}
              name="" id="passwordLength"
            />
            <label htmlFor="passwordLength">length:{length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input 
              type="checkbox"
              checked={numAllowed}
              onChange={() => setNumAllowed(prev => !prev)}
              id="includeNumbers"
            />
            <label htmlFor="includeNumbers">numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input 
              type="checkbox"
              checked={symbolAllowed}
              onChange={() => setSymbolAllowed(prev => !prev)}
              id="includeSymbols"
            />
            <label htmlFor="includeSymbols">Symbols</label>
          </div>
        </div>
      </div>
    </>
  )
}
export default App
