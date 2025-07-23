import { useEffect, useState } from "react";



const Home = () =>{
    const [message, setMessage] = useState('')
    useEffect(() =>{
        fetch('http://localhost:5162/hello')
        .then((res)=>res.text())
        .then((data)=>setMessage(data))
        .catch((err)=>console.log(err))
    })
    return <div>{message}</div>
};

export default Home;