/*import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
*/




import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Card from "react-bootstrap/Card";
import {Button, Navbar, Nav, Container, NavLink} from "react-bootstrap";



const UserContext = React.createContext(null);

const linkStyle = {
  margin: "1rem",
  textDecoration: "none",
  color: 'white'
};


export default function App() {
  return (
    <UserContext.Provider value={{users:[{name:'abel',email:'abel@mit.edu',password:'secret',balance:100}]}}>
      <Router>
      <div>
        
        <Navbar bg="primary" variant="dark">
          <Container>
              <Navbar.Brand>BadBank</Navbar.Brand>
              <Nav className="me-auto" >
                      {/*
                      <NavLink to="/" style={linkStyle} activeStyle={{ color: 'red' }}>Home</NavLink>
                      <NavLink to="/deposit" style={linkStyle}>Deposit</NavLink>
                  
                      <NavLink to="/withdraw" style={linkStyle}>Withdraw</NavLink>
                  
                      <NavLink to="/createaccount/" style={linkStyle}>Create Account</NavLink>
                  
                      <NavLink to="/alldata/" style={linkStyle}>All Data</NavLink>
                      
                      */}
                      <Link to="/" style={linkStyle} activeStyle={{ color: 'red' }}>Home</Link>
                      <Link to="/deposit" style={linkStyle}>Deposit</Link>
                  
                      <Link to="/withdraw" style={linkStyle}>Withdraw</Link>
                  
                      <Link to="/createaccount/" style={linkStyle}>Create Account</Link>
                  
                      <Link to="/alldata/" style={linkStyle}>All Data</Link>
                      
              </Nav>
            </Container>
          </Navbar>
        {/*
          <nav>
            <ul className="nav-links">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/deposit">Deposit</Link>
              </li>
              <li>
                <Link to="/withdraw">Withdraw</Link>
              </li>
              <li>
                <Link to="/createaccount/">Create Account</Link>
              </li>
              <li>
                <Link to="/alldata/">All Data</Link>
              </li>
            </ul>
        </nav>*/}

          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/deposit">
              <Deposit />
            </Route>
            <Route path="/createaccount/">
              <CreateAccount/>
            </Route>
            <Route path="/withdraw">
              <Withdraw />
            </Route>
            <Route path="/alldata">
              <AllData />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    </UserContext.Provider>
  );
}

function Home() {
  return (
    <>
    <h2>Home</h2>
    <Card className="text-center" bg="light">
        <Card.Header>Bad Bank</Card.Header>
        <Card.Body>
          <Card.Title>Welcome to the Bad Bank!</Card.Title>
          <Card.Text>
          <img src="bank.png"/>
          </Card.Text>
        </Card.Body>
      </Card>
  </>
  );
}

// DEPOSIT PAGE 

function Deposit() {
  const [bal, setBal] = React.useState(100);
  let [show, setShow]         = React.useState(true);
  const [transaction, setTransaction] = React.useState('');

  function clearForm(){
    setTransaction('');
    setShow(true);
  }


  function handleSubmit () {
    let newBal = Number(bal) + Number(transaction);
    if (isNaN(transaction)) {
      window.alert("Please enter a number");
      return; 
    }
    if (transaction < 0) {
      window.alert("Please enter a positive number.");
      return; 
    }
    setBal(newBal);
    setShow(false);  
  }


  return (
    <>
  <h2>Current Balance: ${bal}</h2>

    {show ? <> 
    <Card className="text-center" bg="light">
          <Card.Header>Deposit Funds</Card.Header>
          <Card.Body>
            <Card.Title>Enter an amount in $(USD)</Card.Title>
            <Card.Text>
            <input type="number" className="form-control" id="deposit" placeholder="Enter an amount" value={transaction} onChange={e => setTransaction(e.currentTarget.value)} /><br/>
                      
                  
            </Card.Text>
            {transaction.length > 0 && 
            <Button variant="primary" onClick={handleSubmit}>Submit</Button>
            }
          </Card.Body>
        </Card>
        </>
      :
      <>
        <h5>Success</h5>
        <Button variant="primary" onClick={clearForm}>Make another deposit</Button>
      </>
    }
  </>
  );
}

function Withdraw() {
  const [bal, setBal] = React.useState(100);
  const [transaction, setTransaction] = React.useState('');
  let [show, setShow]         = React.useState(true);


  function handleSubmit () {
    if (isNaN(transaction)) {
      window.alert("Please enter a number");
      return; 
    }
    if (transaction > bal) {
      window.alert("Account Overdraft: You have insufficient funds for this withdrawal.");
      return;
    } 
    if (transaction < 0) {
      window.alert("Please enter a positive number.");
      return; 
    }
    let newBal = Number(bal) - Number(transaction);
    setBal(newBal); 
    setShow(false);  
  }

  function clearForm(){
    setTransaction('');
    setShow(true);
  }


  return (
    <>
  <h2>Current Balance: ${bal}</h2>

        {show ? <>
                  <Card className="text-center" bg="light">
                      <Card.Header>Withdraw Funds</Card.Header>
                      <Card.Body>
                        <Card.Title>Enter an amount in $(USD)</Card.Title>
                        <Card.Text>
                        <input type="number" className="form-control" id="deposit" placeholder="Enter an amount" value={transaction} onChange={e => setTransaction(e.currentTarget.value)} /><br/>
                                  
                              
                        </Card.Text>
                        {transaction.length > 0 && 
                          <Button variant="primary" onClick={handleSubmit}>Submit</Button>
                        }
                      </Card.Body>
                    </Card>
                </>
                :
                <>
                <h5>Success</h5>
                  <Button variant="primary" onClick={clearForm}>Make another withdrawal</Button>
                </>
          }
  </>
  );
}

function AllData() {
  let data = React.useContext(UserContext);
  return (
    <>
    
    <Card>
      <Card.Header as="h5">All Data</Card.Header>
      <Card.Body>
        <Card.Title>A record of all user data</Card.Title>
        <Card.Text>
        {JSON.stringify(data)}

        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
    </>
  );
}

// CREATE ACCOUNT PAGE 

function CreateAccount() {
    let [show, setShow]         = React.useState(true);
    const [status, setStatus]     = React.useState('');
    const [name, setName]         = React.useState('');
    const [email, setEmail]       = React.useState('');
    const [password, setPassword] = React.useState('');
    const ctx = React.useContext(UserContext);  
  
    function validate(field, label){
        if (!field) {
          setStatus('Error: ' + label);
          setTimeout(() => setStatus(''),3000);
          return false;
        }
        return true;
    }
  
    function handleCreate(){
      console.log(name,email,password);
      if (name.length == 0) {
        window.alert("Name is blank");
        return; 
      }
      if (email.length == 0) {
        window.alert("Email is blank");
        return; 
      }

      if (password.length < 8) {
        window.alert("Password needs to be at least 8 characters");
        return;
      }

      {/* 
      if (!validate(name,     'name'))
        alert("Name is blank");     
        return;
      if (!validate(email,    'email'))
        alert("Email is blank");     
        return;
      if (!validate(password, 'password')) return;
      */}
      ctx.users.push({name,email,password,balance:100});
      setShow(false);
    }    
  
    function clearForm(){
      setName('');
      setEmail('');
      setPassword('');
      setShow(true);
    }
  
    return (
      <>
      
      { show ? <>
        <Card className="text-center" bg="light">
        <Card.Header>Create Account</Card.Header>
        <Card.Body>
          <Card.Title>Enter account information</Card.Title>
          <Card.Text>
                  Name<br/>
                    <input type="input" className="form-control" id="name" placeholder="Enter name" value={name} onChange={e => setName(e.currentTarget.value)} /><br/>
                    Email address<br/>
                    <input type="input" className="form-control" id="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.currentTarget.value)}/><br/>
                    Password<br/>
                    <input type="password" className="form-control" id="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.currentTarget.value)}/><br/>
          </Card.Text>
          { (name.length > 0 || email.length > 0 || password.length > 0) && 
          <Button variant="primary" onClick={handleCreate}>Create Account</Button>
          }
        </Card.Body>
      </Card>
      </>
      :
      <>
      <h5>Success</h5>
      <Button variant="primary" onClick={clearForm}>Add another account</Button>
      
      </>
    }
     
   
        <Card
          bgcolor="primary"
          header="Create Account"
          status={status}
          body={show ? (  
                  <>
                  Name<br/>
                  <input type="input" className="form-control" id="name" placeholder="Enter name" value={name} onChange={e => setName(e.currentTarget.value)} /><br/>
                  Email address<br/>
                  <input type="input" className="form-control" id="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.currentTarget.value)}/><br/>
                  Password<br/>
                  <input type="password" className="form-control" id="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.currentTarget.value)}/><br/>
                  <button type="submit" className="btn btn-light" onClick={handleCreate}>Create Account</button>
                  </>
                ):(
                  <>
                  <h5>Success</h5>
                  <button type="submit" className="btn btn-light" onClick={clearForm}>Add another account</button>
                  </>
                )}
        />
      </>
    )
}


