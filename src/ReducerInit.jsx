import { useReducer } from "react";
import { Col, Container, Row } from "react-bootstrap";

const ReducerInit = () => {
  const countValue = (state, action) => {
    switch (action.type) {
      case "HELLO":
        return state + 1;

      case "BELLO":
        return state - 1;

      case "GROUND":
        return 0;

      default:
        return state;
    }
  };

  const [count, dispatch] = useReducer(countValue, 0);
  return (
    <>
      <Container>
        <Row>
          <Col>
            <h1>{count}</h1>
            <button onClick={() => dispatch({ type: "HELLO" })}>++</button>
            <button onClick={() => dispatch({ type: "BELLO" })}>--</button>
            <button onClick={() => dispatch({ type: "GROUND" })}>Reset</button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ReducerInit;
