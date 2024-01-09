import React, { useLayoutEffect } from "react";
import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { useSelector,useDispatch } from "react-redux";
import {setDifferentEditor, setDefault,} from "../redux/slices/alphaPlatformSlice";
import { alphaRunning,alphaStopRunning } from "../redux/slices/alphaRunning";
import { useParams } from "react-router-dom";
import CodeEditorWindow from "./coding-page-components/code-editor/codeEditorWindow";
import ConsoleInput from "./coding-page-components/console/console";

import "./styles/mainPage.css";
import "react-toastify/dist/ReactToastify.css";

const AlphaPlatform = ({}) => {

  const alphaPlatformComponents = useSelector((state) => state.alphaPlatform.value);
  const dropdownValue = useSelector((state) => state.dropdownValues.dropdownValue);
  const isRunning = useSelector((state) => state.alphaRunning.isRunning);
  const [editorWidth, setEditorWidth] = useState();
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState(dropdownValue.language);
  const [solution, setSolution] = useState(false);
  const [output, setOutput] = useState("");
  const {problemId} = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn,setIsLoggedIn] = useState(false);
  const [isQuestion,setIsQuestion] = useState(false);
  const [isServer,setIsServer] = useState(false);
  const [isAuthorised, setIsAuthorised] = useState(false);
  const toastId = useRef(null);
  const dispatch = useDispatch();

  const handleResize = (e) => {
    const newWidth = e.clientX;
    setEditorWidth(newWidth);
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
    document.body.style.cursor = 'col-resize';
    document.addEventListener('mousemove', handleResize);
    document.addEventListener('mouseup', () => {
      document.body.style.cursor = 'auto';
      document.removeEventListener('mousemove', handleResize);
    });
  };

  useEffect(() => {
    setLanguage(dropdownValue.language);
  }, [dropdownValue.language]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1225) {
        dispatch(
          setDefault({
            editor: true,
            console: true,
          })
        );
      }
      else if ( alphaPlatformComponents.editor === true && alphaPlatformComponents.console === true){
         dispatch(setDifferentEditor({editor: true, console: false}));
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("beforeunload", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("beforeunload", handleResize);
    };
  },
  [alphaPlatformComponents.console, alphaPlatformComponents.editor]);

  const onChange = (action, data) => {
    switch (action) {
      case "code": {
        setCode(data);
        sessionStorage.setItem(`user-code` , code);
        break;
      }
      default: {
        console.warn("case not handled!", action, data);
      }
    }
  };

  async function runCode(runOrSubmitCode) {
    
    try{

      // compile code here
      if(true){
      }
      else{
        toast.update(toastId.current, { autoClose: 1 });
        showError("Error compiling code!");
        setTimeout(function() {
          dispatch(alphaStopRunning());
        }, 2000);
      }
    }
    catch(error){
      toast.update(toastId.current, { autoClose: 1 });
      toast("Error compiling code!");
      setTimeout(function() {
        dispatch(alphaStopRunning());
      }, 2000);
    }
  }

  const showError = (notification) => {
    toast.error(
      notification ? notification : `Something Went Wrong, Please Try Again!`,
      {
        position: "top-right",
        autoClose: 3000,
        theme:"light"
      }
    );
  };

  const showSuccess = (notification) => {
    toast.success(notification ? notification : `Compiled Successfully!`, {
      position: "top-right",
      autoClose: 3000,
      theme:"light"
    });
  };

  return (
    <>
      <div className="main-class min-w-[375px] min-h-[600px] w-full h-full flex flex-grow   min-w-screen max-h-screen bg-algoblack overflow-auto">

        { alphaPlatformComponents.editor && (
          <div
            className={`editor-class overflow-hidden flex flex-col grow-1 h-[100vh]  min-h-[375px]  flex-grow `}
            style={{ width: editorWidth }} 
          >
            < CodeEditorWindow code={code} onChangeData={onChange} />
          </div>)
        }

        <div id="resize" class="resize"
          onMouseDown={handleMouseDown} 
          className=" resize no-select w-2 h-full min-h-screen bg-algoXcolor pt-2 pb-2 ml-2 mr-2 rounded-md">
        </div>

        { 
          alphaPlatformComponents.console && (
          <div className={`console-gpt`} >
            <ConsoleInput
              output={output}
              runCode={runCode}
            />
          </div>)
        }
      </div>
    </>
  );
};

export default AlphaPlatform;
