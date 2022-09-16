import "regenerator-runtime/runtime";
import React from "react";
import { login, logout } from "./utils";
import "./global.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

// components
import Home from "./Components/Home";
import NewVote from "./Components/NewVote";
import VotingBooth from "./Components/VotingBooth";

// images
import BlockVoteLogo from "./assets/blockchain.png";

import getConfig from "./config";
const { networkId } = getConfig(process.env.NODE_ENV || "development");

export default function App() {
  const changeCandidatesFunction = async (prompt) => {
    console.log(prompt);
    let namePair = await window.contract.getCandidatePair({ prompt: prompt });
    localStorage.setItem("Candidate1", namePair[0]);
    localStorage.setItem("Candidate2", namePair[1]);
    localStorage.setItem("prompt", prompt);
    window.location.replace(window.location.href + "VotingBooth");
  };

  return (
    <Router>
      <Navbar expand='md' bg='dark' variant='dark'>
        <Container>
          <Navbar.Brand href='/'>
            <img src={BlockVoteLogo}></img>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav'>
            <span className="navbar-toggler-icon"></span>
          </Navbar.Toggle>
          <Nav className="me-auto">
            <Nav.Link href='/'>Blockchain Voting System</Nav.Link>
          </Nav>
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'></Nav>
            <Nav>
              <Nav.Link href='/NewVote'>New Vote</Nav.Link>
              <Nav.Link onClick={window.accountId === "" ? login : logout}>
                {window.accountId === "" ? "Login" : window.accountId + " [Logout]" }
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Switch>
        <Route exact path='/'>
          <Home changeCandidates={changeCandidatesFunction} />
        </Route>
        <Route exact path='/VotingBooth'>
          <VotingBooth />
        </Route>
        <Route exact path='/NewVote'>
          <NewVote />
        </Route>
      </Switch>
    </Router>
  );
}

/*
service 
brick 
sting 
enhance 
furnace 
mutual 
convince 
fluid 
leg 
enable 
stuff 
seed
*/