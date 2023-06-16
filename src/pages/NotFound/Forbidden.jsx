import { useEffect, useState } from "react"
import { Link } from 'react-router-dom';
import frame from "../../images/Frame.png"

import './notfound.css';

const Forbidden = ()=> {
    const [data,setDate] = useState('')
    const thisYear = new Date()
    useEffect(()=>{
        setDate(thisYear.getFullYear())
    },)

    return(
        <div className="page">
        <div className="content">
            <div className="logo">
            </div>
            <div className="w3l-error-grid">
                <h1>403</h1>
                <h2>You Don't Have Permission</h2>
                <Link to="/">
                    <a  className="home">Back to Home </a>
                </Link>
            </div>

            <div className="copy-right text-center">
                <p>© {data} Reward Management. All rights reserved </p>
            </div>
        </div>
        <img src={frame} className="img-responsive" style={{transform: 'translate(-20px, -10px) scale(1.1)'}}/>
    </div>
    )
}

export default Forbidden;