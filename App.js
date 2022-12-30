import { useState, useEffect } from 'react';
import './App.css';
import { Form, Card, Image, Icon } from 'semantic-ui-react'
function App() {
  const [name, setname] = useState('')
  const [avter, setavter] = useState('')
  const [id, setid] = useState('')
  const [userInput, setuserInput] = useState("")
  const [err,seterr]=useState(null)

  useEffect(() => {
    fetch('https://api.github.com/users').then((result) => {
      result.json().then((data) => {
        setData(data)
        console.log(data)
      })
    })
  }, [])
  const handleSubmit = () => {
    fetch(`https://api.github.com/users/${userInput}`).then((resp) => {
      resp.json().then((data) => {
        if(data.message){
          seterr(data.message)
        }else
        {
          setData(data);
        }
        setData(data)
      })
    })
  }
  const setData = ({ login, avatar_url, id }) => {
    setname(login)
    setavter(avatar_url)
    setid(id)
  }
  return (
    <div className="App">
      <div className='nav' >Github User integration</div>
      <div className='Search'>
        <Form onSubmit={handleSubmit} >
          <Form.Group>
            <Form.Input placeholder='Github User' name='Github User' onChange={(e) => setuserInput(e.target.value)} />
            <Form.Button content='Search' />
          </Form.Group>
        </Form>
      </div>
      {err ? (<h1>User Not Found</h1>) : (
        <div className='Card'>
        <Card>
          <Image src={avter} wrapped ui={false} />
          <Card.Content>
            <Card.Header>{name}</Card.Header>
            <Card.Meta>
              <span className='date'>Joined in 2022</span>
            </Card.Meta>
          </Card.Content>
          <Card.Content extra>
            <a><Icon name='user' /> iD : {id} </a>
          </Card.Content>
        </Card>
      </div>
      )}
      <div>
        <h2>Enter name of the Github Users</h2>
        <ul>
          <li>mojombo</li>
          <li>defunkt</li>
          <li>pjhyett</li>
          <li>wycats</li>
          <li>ivey</li>
        </ul>
      </div>
    </div>
  );
}

export default App;
