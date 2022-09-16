import React, { useRef, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";

const NewVote = (props) => {
  const candidateName1 = useRef();
  const candidateName2 = useRef();

  const candidateName1URL = useRef();
  const candidateName2URL = useRef();

  const promptRef = useRef();

  const [disableButton, changeDisable] = useState(false);

  const sendToBlockChain = async () => {
    changeDisable(true);
    await window.contract.addUrl({
      name: candidateName1.current.value,
      url: candidateName1URL.current.value,
    });

    await window.contract.addUrl({
      name: candidateName2.current.value,
      url: candidateName2URL.current.value,
    });

    await window.contract.addCandidatePair({
      prompt: promptRef.current.value,
      name1: candidateName1.current.value,
      name2: candidateName2.current.value,
    });

    await window.contract.addToPromptArray({ prompt: promptRef.current.value });

    alert("Head Over to Home Page");
  };

  return (
    <body className="newvotebg">
      <Container style={{ marginTop: "10px", color: "white"}}>
        <Form>
          <Form.Group className='mb-3'>
            <Form.Label>Candidiate 1 Name</Form.Label>
            <Form.Control
              ref={candidateName1}
              placeholder="Enter Candidate's Name"
            ></Form.Control>
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Candidate 1 Image URL</Form.Label>
            <Form.Control
              ref={candidateName1URL}
              placeholder='Enter Image URL'
            ></Form.Control>
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Candidiate 2 Name</Form.Label>
            <Form.Control
              ref={candidateName2}
              placeholder="Enter Candidate's Name"
            ></Form.Control>
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Candidate 2 Image URL</Form.Label>
            <Form.Control
              ref={candidateName2URL}
              placeholder='Enter Image URL'
            ></Form.Control>
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Prompt</Form.Label>
            <Form.Control ref={promptRef} placeholder='Add Prompt'></Form.Control>
          </Form.Group>
        </Form>
        <br></br>
        <Button
          disabled={disableButton}
          onClick={sendToBlockChain}
          variant='dark'>
          Submit
        </Button>
      </Container>
    </body>
  );
};

export default NewVote;
