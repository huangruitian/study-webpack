import React, {useState} from 'react'
import reactDOM from 'react-dom'
import './index.less'
import './rest.css'
import image from './images/kq_login.png'

function App(){
    const [count, setCount] = useState(0)
    return <div className="main" onClick={() => setCount(count+1)}>
        hello react  {count}
        <img src={image}></img>
    </div>
}

reactDOM.render(<App/>, document.getElementById("root"))
