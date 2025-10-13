import React from "react";
import { Container } from "./elements/index.style";
import Intro from "./elements/intro";

function Index() {
  return (
    <Container>
      {/* <p className="text-5xl m-[auto]">House Maduekwe</p> */}

      <div className="w-[500px] h-[500px] m-[auto]">
        <Intro />
      </div>
    </Container>
  );
}

export default Index;
