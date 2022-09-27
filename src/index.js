"use strict";
import "./style.scss";
import React from "react";
import { useReducer, useState, useEffect } from "react";
import { createRoot } from 'react-dom/client';
import ReactMarkdown from "react-markdown";
import { production, automation, arge, about } from "./assets/scripts/experiences.js";
import { reactJs, vertibird, matlab, incubator, thesis } from "./assets/scripts/projects.js";

const experienceTexts = [automation, production, arge];
const projectTexts = [reactJs, vertibird, matlab, incubator, thesis];

const UEXP = "UEXP";
const UNMD = "UNMD";
const UBOOL = "UBOOL";
const initialState = {
     whExpanded: "all",
     nightMode: true,
     fullscr: false,
}


const reducer = (state, action) => {
     const value = action.payload;
     const target = action.target;
     switch (action.type) {
          case UEXP:
               return { ...state, whExpanded: value }
               break;
          case UNMD:
               return { ...state, nightMode: value }
               break;
          case UBOOL:
               return { ...state, [target]: value }
               break;
          default:
               return { state }
               break;
     }
}

const projFolders = ["reactJs", "vertibird", "matlab", "incubator", "thesis"];
const expFolders = ["automation", "arge", "production"];

const capitalize = (str) => {
     return str[0].toUpperCase() + str.slice(1);
}

const scroll = (projName) => {
     const section = document.querySelector('#' + projName);
     setTimeout(() =>
          section.scrollIntoView({ behaviour: 'smooth', block: 'start' })
          , 0)
};

const OnOffButtton = (props) => {
     const [{ nightMode, fullscr }, dispatch] = [props.state, props.dispatch];

     function toggleFullScreen() {
          var doc = window.document;
          var docEl = doc.documentElement;

          var requestFullScreen =
               docEl.requestFullscreen ||
               docEl.mozRequestFullScreen ||
               docEl.webkitRequestFullScreen ||
               docEl.msRequestFullscreen;
          var cancelFullScreen =
               doc.exitFullscreen ||
               doc.mozCancelFullScreen ||
               doc.webkitExitFullscreen ||
               doc.msExitFullscreen;

          if (
               !doc.fullscreenElement &&
               !doc.mozFullScreenElement &&
               !doc.webkitFullscreenElement &&
               !doc.msFullscreenElement
          ) {
               dispatch({ type: UBOOL, target: "fullscr", payload: !fullscr })
               requestFullScreen.call(docEl);
          } else {
               dispatch({ type: UBOOL, target: "fullscr", payload: !fullscr })
               cancelFullScreen.call(doc);
          }
     }


     const style = {
          dark: {
               display: 'flex',
               backgroundColor: 'gold',
               width: "30px",
               height: "16px",
               padding: "1px",
               alignItems: "center",
               borderRadius: "20px",
               transition: "0.25s",
          },
          light: {
               display: 'flex',
               flexDirection: 'row-reverse',
               backgroundColor: 'black',
               width: "30px",
               height: "16px",
               padding: "1px",
               alignItems: "center",
               borderRadius: "20px",
               transition: "0.25s",
          },
          backgroundDark: {
               backgroundColor: "black",
               width: "16px",
               height: "16px",
               borderRadius: "50%",
               transition: "0.25s",
          },
          backgroundLight: {
               backgroundColor: "white",
               width: "16px",
               height: "16px",
               borderRadius: "50%",
               transition: "0.25s",
          }
     }

     const whiteToBlack = (color) => {

          const revColor = inv(color)
          document.documentElement.style.setProperty('--whitefornight', revColor);
          document.documentElement.style.setProperty('--blackfornight', color);
          function inv(color) {
               if (color === "white") return "black";
               if (color === "black") return "white";
               return 0xffffff ^ color;
          }
     }

     const changeNM = () => {
          dispatch({ type: UNMD, payload: !nightMode })
          whiteToBlack(nightMode ? "white" : "black");
     }

     return (
          <div className="flex">
               <div className="flexb" onClick={toggleFullScreen}>
                    <svg class="options" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 448 512">{!fullscr?<path d="M32 32C14.3 32 0 46.3 0 64v96c0 17.7 14.3 32 32 32s32-14.3 32-32V96h64c17.7 0 32-14.3 32-32s-14.3-32-32-32H32zM64 352c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7 14.3 32 32 32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H64V352zM320 32c-17.7 0-32 14.3-32 32s14.3 32 32 32h64v64c0 17.7 14.3 32 32 32s32-14.3 32-32V64c0-17.7-14.3-32-32-32H320zM448 352c0-17.7-14.3-32-32-32s-32 14.3-32 32v64H320c-17.7 0-32 14.3-32 32s14.3 32 32 32h96c17.7 0 32-14.3 32-32V352z" />:<path d="M160 64c0-17.7-14.3-32-32-32s-32 14.3-32 32v64H32c-17.7 0-32 14.3-32 32s14.3 32 32 32h96c17.7 0 32-14.3 32-32V64zM32 320c-17.7 0-32 14.3-32 32s14.3 32 32 32H96v64c0 17.7 14.3 32 32 32s32-14.3 32-32V352c0-17.7-14.3-32-32-32H32zM352 64c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7 14.3 32 32 32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H352V64zM320 320c-17.7 0-32 14.3-32 32v96c0 17.7 14.3 32 32 32s32-14.3 32-32V384h64c17.7 0 32-14.3 32-32s-14.3-32-32-32H320z" />}</svg>
                    {fullscr ? "Minimized " : "Fullscreen "}|
               </div>
               <div className="flex" onClick={changeNM}>
                    | {nightMode ? "Light" : "Dark"}
                    <div style={nightMode ? style.dark : style.light}>
                         <div style={nightMode ? style.backgroundDark : style.backgroundLight}>
                         </div>
                    </div>
               </div>
          </div>
     )
}

const ShineTalents = (props) => {
     const [state, dispatch] = [props.state, props.dispatch]
     const [slideVal, setSlideVal] = useState(0);
     document.body.setAttribute("style", `filter:invert(${slideVal + "%"});`);
     return (
          <div className="shineTalents">
               TLDR
               <input type="range" min="0" max="100" value={slideVal} className="slider" id="myRange" step="0,01" onChange={(e) => { setSlideVal(e.target.value) }} />
          </div>
     )
}

function checkExpand(who, state, dispatch) {
     if (state.whExpanded === "all") {
          dispatch({ type: UEXP, payload: who });
     } else {
          dispatch({ type: UEXP, payload: "all" });
     }
}

function ProjFrame(props) {
     const [state, dispatch] = [props.state, props.dispatch];
     const [txt, setText] = useState(props.text);
     const projName = props.name;
     const objClass = state.whExpanded === "projects" ? " expand" : "";

     return (
          <div className={"project" + objClass} key={projName} id={projName} onClick={() => { checkExpand("projects", state, dispatch); scroll(projName); }}>
               <img className="expImg" src={require(`./assets/images/${projName}.png`)} alt={projName} />
               <div className="expText">
                    <h1 className="expHead" >{capitalize(projName)}</h1>
                    <p className="expInfo"><ReactMarkdown children={txt} /></p>
               </div>
          </div>
     );
}

const ProjBank = (props) => {
     const [state, dispatch] = [props.state, props.dispatch];

     return projectTexts && projectTexts.map((text, index) => {
          return (
               <ProjFrame state={state} dispatch={dispatch} key={index} text={text} name={projFolders[index]} />
          )
     })
}

const ExpFrame = (props) => {
     const [state, dispatch] = [props.state, props.dispatch];
     const expName = props.name;
     const [text, setText] = useState(props.text);

     return (
          <div className={"experience"} key={expName} id={expName} onClick={() => { checkExpand("experiences", state, dispatch); scroll(expName); }}>
               <ReactMarkdown children={text} />
          </div>
     );
}

const ExpBank = ({ state, dispatch }) => {
     return experienceTexts?.map((text, index) => <ExpFrame state={state} dispatch={dispatch} key={index} text={text} name={expFolders[index]} />)
}

const About = () => {
     const [text, setText] = useState(about);

     return (
          <div>
               <ReactMarkdown children={text} />
          </div>
     )
}

const App = () => {
     const [state, dispatch] = useReducer(reducer, initialState);
     const whoExpanded = state.whExpanded;
     const objExpand = whoExpanded === "experiences" ? " expand" : "";

     const checkHide = (val) => {
          if (val === whoExpanded) {
               return "";
          } else if (whoExpanded === "all") {
               return "";
          } else {
               return " hidden";
          }
     }
     return (
          <React.StrictMode>
               <div>
                    <div className="flex spacebtw">
                         <img src="./yegenetics_lined.svg"></img>
                         <div className="debug hidden">
                              {"whExpanded: " + state.whExpanded}<br />
                              {"nightMode: " + state.nightMode}<br />
                              {"fullscr: " + state.fullscr}
                         </div>
                         <h1 className="header grow"></h1>
                         <code className="shrink">TLDR Fullscreen DarkMode</code>
                         <div className="controls">
                              <ShineTalents state={state} dispatch={dispatch} />
                              <OnOffButtton state={state} dispatch={dispatch} />
                         </div>
                    </div>
                    <div className="sections">
                         <div className={"section" + checkHide("projects")} id="projects">
                              <h1 className="flex border">PROJECTS</h1>
                              <ProjBank state={state} dispatch={dispatch} />
                         </div>
                         <div className={"section" + checkHide("about")} id="about">
                              <About />
                         </div>
                         <div className={"section" + checkHide("experiences") + objExpand} id="experiences">
                              <h1 className="flex">EXPERIENCES</h1>
                              <ExpBank state={state} dispatch={dispatch} />
                         </div>
                    </div>
               </div>
          </React.StrictMode>
     );
}

const container = document.getElementById("app");
const root = createRoot(container);
root.render(<App />);

