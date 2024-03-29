import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import LoadingCircles from "../assets/loadingcircles.svg";
import LoadingBackground1 from "../assets/color-sharp.png";
import LoadingBackground2 from "../assets/color-sharp2.png";

const VotingBooth = (props) => {
  const [candidate1URL, changeCandidate1Url] = useState(LoadingCircles);
  const [candidate2URL, changeCandidate2Url] = useState(LoadingCircles);
  const [showresults, changeResultsDisplay] = useState(false);
  const [buttonStatus, changeButtonStatus] = useState(false);
  const [candidate1Votes, changeVote1] = useState("--");
  const [candidate2Votes, changeVote2] = useState("--");
  const [prompt, changePrompt] = useState("--");

  useEffect(() => {
    const getInfo = async () => {
      // vote count stuff
      let voteCount = await window.contract.getVotes({
        prompt: localStorage.getItem("prompt"),
      });
      changeVote1(voteCount[0]);
      changeVote2(voteCount[1]);

      // image stuff

      changeCandidate1Url(
        await window.contract.getUrl({
          name: localStorage.getItem("Candidate1"),
        })
      );
      changeCandidate2Url(
        await window.contract.getUrl({
          name: localStorage.getItem("Candidate2"),
        })
      );

      changePrompt(localStorage.getItem("prompt"));

      // vote checking stuff

      let didUserVote = await window.contract.didParticipate({
        prompt: localStorage.getItem("prompt"),
        user: window.accountId,
      });

      changeResultsDisplay(didUserVote);
      changeButtonStatus(didUserVote);
    };

    getInfo();
  }, []);

  const addVote = async (index) => {
    changeButtonStatus(true);
    await window.contract.addVote({
      prompt: localStorage.getItem("prompt"),
      index: index,
    });

    await window.contract.recordUser({
      prompt: localStorage.getItem("prompt"),
      user: window.accountId,
    });

    let voteCount = await window.contract.getVotes({
      prompt: localStorage.getItem("prompt"),
    });
    changeVote1(voteCount[0]);
    changeVote2(voteCount[1]);
    changeResultsDisplay(true);
  };

  return (
<<<<<<< HEAD
    <body className="bg">
=======
    <body className="votingboothbg">
>>>>>>> 4d9edf3579ce6ac715991cf9d0abd91a39754f1f
      <Container>
        <Row>
          <Col className='jutify-content-center d-flex'>
            <Container>
              <Row style={{ marginTop: "5vh", backgroundImage: LoadingBackground1 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    padding: "3vw",
                  }}
                >
                  <img
                    style={{
                      height: "35vh",
                      width: "20vw",
                    }}
                    src={candidate1URL}
                  ></img>
                </div>
              </Row>
              {showresults ? (
                <Row
                  className='justify-content-center d-flex'
                  style={{ marginTop: "5vh" }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      fontSize: "8vw",
                      padding: "10px",
                      color: "white"
                    }}
                  >
                    {candidate1Votes}
                  </div>
                </Row>
              ) : null}
              <Row
                style={{ marginTop: "5vh" }}
                className='justify-content-center d-flex'
              >
                <Button variant='dark' disabled={buttonStatus} onClick={() => addVote(0)}>
                  Vote
                </Button>
              </Row>
            </Container>
          </Col>
          <Col className='justify-content-center d-flex align-items-center'>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                height: "20vh",
                alignItems: "center",
                padding: "2vw",
                textAlign: "center",
                color: "white"
              }}
            >
              {prompt}
            </div>
          </Col>
          <Col className='jutify-content-center d-flex'>
            <Container>
              <Row style={{ marginTop: "5vh", backgroundImage: LoadingBackground1 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    padding: "3vw",
                  }}
                >
                  <img
                    style={{
                      height: "35vh",
                      width: "20vw",
                    }}
                    src={candidate2URL}
                  ></img>
                </div>
              </Row>
              {showresults ? (
                <Row
                  className='justify-content-center d-flex'
                  style={{ marginTop: "5vh" }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      fontSize: "8vw",
                      padding: "10px",
                      color: "white"
                    }}
                  >
                    {candidate2Votes}
                  </div>
                </Row>
              ) : null}
              <Row
                style={{ marginTop: "5vh" }}
                className='justify-content-center d-flex'
              >
                <Button variant='dark' disabled={buttonStatus} onClick={() => addVote(1)}>
                  Vote
                </Button>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </body>
  );
};

export default VotingBooth;
