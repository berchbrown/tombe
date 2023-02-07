import "./css/App.css"
import { useState, useEffect } from 'react'


const App = () => {
  const [user, setUser] = useState(undefined)
  const API_endpoint = "http://localhost:2003"

  useEffect(() => {
    let uuid = new URLSearchParams(window.location.search).get('uuid') || window.localStorage.getItem("uuid")
    if (uuid != null) {
      window.localStorage.setItem("uuid", uuid)
      fetch(API_endpoint + "/get_user/" + uuid)
        .then(res => res.json())
        .then(res => {
          setUser(res)
          console.log(res)
        })
      if (new URLSearchParams(window.location.search).get('uuid') != null) {
        window.location = "/"
      }
    }
  }, [])

  return (
    <div style={{ overflowX: 'hidden' }}>
      {user ?
        <button onClick={() => {
          window.localStorage.removeItem("uuid")
          window.location.reload(false)
        }}>Se déconnecter</button> :
        <button onClick={() => {
          window.location = API_endpoint + "/login/discord/"
        }}>Se connecter</button>}
        {user && <>
        <br/>
        <br/>

        {user.soutien ? <button>Déja soutenu</button>
        :
        <button onClick={() => {
          fetch(API_endpoint + "/soutien/" + window.localStorage.getItem("uuid"))
          setTimeout(() => {
            window.location.reload(false)
          }, 500)
        }}>SOUTENIR</button> }</>}
    </div>
  )
}

export default App
