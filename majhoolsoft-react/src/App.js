import "./App.css";
import { useEffect, useState } from "react";
import useWindowDimensions from "./components/GetWindowDimensions";
import Car from "./components/Car";
import Sideview from "./components/faces/Sideview";
import Background from "./components/Background";
import Darkness from "./components/Darkness";
import LightBeam from "./components/LightBeam";
import GarageDoor from "./components/GarageDoor";
import getScroll from "./helpers/lib/GetScroll";
import Garage from "./components/Garage";
import Play from "./Play";
import GetTextArray from "./components/GetTextArray";
import scrollToTop from "./helpers/lib/ScrollToTop";
const scrollStage = 10;
const texts = GetTextArray();
function App() {
  // get window properties
  const { height, width } = useWindowDimensions();
  const mobile = width < height;
  const size = mobile ? { height: height } : { width: width };
  let [scroll, setScroll] = useState(0);
  let [scene, setScene] = useState(0);
  useEffect(() => {
    // when component did mount:
    scrollToTop();
    Play(scroll, scrollStage, scene, mobile, width, height, texts).initCamera();
    getScroll(setScroll, setScene, scrollStage);
  }, []); //Be carefull - scroll must not be a dependency!
  // play using scrolling
  Play(scroll, scrollStage, scene, mobile, width, height, texts);
  return (
    <div className="App">
      <header className="App-header"></header>
      <div className="container">
        <svg className="page" xmlns="http://www.w3.org/2000/svg" style={size}>
          <Background />
          <Garage />
          <GarageDoor scrollY={scene >= 10 && scroll - 10 * scrollStage} />
          <Sideview />
          <Car />
          <Darkness />
          <LightBeam />
        </svg>
      </div>
    </div>
  );
}

export default App;
