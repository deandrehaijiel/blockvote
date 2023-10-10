import { Tab } from "bootstrap";
import React, { useEffect, useState } from "react";
import { Table, Container, Button } from "react-bootstrap";

const Home = (props) => {
  const [promptList, changePromptList] = useState([]);

  useEffect(() => {
    const getPrompts = async () => {
      changePromptList(await window.contract.getAllPrompts());
      console.log(await window.contract.getAllPrompts());
    };
    getPrompts();
  }, []);

  return (
<<<<<<< HEAD
    <body className="bg">
=======
    <body className="homebg">
>>>>>>> 4d9edf3579ce6ac715991cf9d0abd91a39754f1f
    <Container>
      <br></br>
      <br></br>
      <Table striped bordered style={{color: 'white'}}>
        <thead>
          <tr>
            <th>#</th>
            <th>Voting Booths</th>
            <th>Enter Voting Booth</th>
          </tr>
        </thead>
        <tbody>
          {promptList.map((el, index) => {
            return (
              <tr key={index}>
                <td style={{color: 'white'}}>{index + 1}</td>
                <td style={{color: 'white'}}>{el}</td>
                <td>
                  {" "}
                  <Button variant='dark' onClick={() => props.changeCandidates(el)}>
                    Enter
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
    </body>
  );
};

export default Home;
