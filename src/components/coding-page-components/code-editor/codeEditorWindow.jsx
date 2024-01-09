import React from "react";
import { useState, useRef, useEffect } from "react";
import Editor from "@monaco-editor/react";
import LanguageDropDown from "../drop-downs/languageDropDown";
import SettingsIcon from '@mui/icons-material/Settings';
import RestoreIcon from '@mui/icons-material/Restore';
import SettingSlidingPane from "../sliding-panel/settingSlidingPane";
import ConsoleSlidingPane from "../sliding-panel/consoleSlidingPane";
import MenuIcon from '@mui/icons-material/Menu';
import {useSelector} from "react-redux";
import { defineTheme } from "../../../data/themeOptions";
import "./styles/codeEditorWindow.css";
import { Link } from "react-router-dom";

const CodeEditorWindow = ({onChangeData,code }) =>
 {
    const dropdownValue = useSelector((state) => state.dropdownValues.dropdownValue);
    const [initialValue, setInitialValue] = useState(code); // New state variable
    const [currentFontSize,setFontSize] = useState("16px");
    const [settingPane,setSettingPane] = useState(false);
    const [consolePane,setConsolePane] = useState(false);
    const [currentLanguage,setCurrentLanguagae] = useState(dropdownValue.language);

    useEffect(() => {
        setFontSize(dropdownValue.fontSize);
        setCurrentLanguagae(dropdownValue.language);
    }, [dropdownValue.fontSize,dropdownValue.language,dropdownValue.theme]);

    const editorRef = useRef(null);

    const closeSettingPane = () => {
        setSettingPane(false);
    }
    const closeConsolePane = () => {
        setConsolePane(false);
    }

    const openSettingPane = () => {
        setSettingPane(true);
    }
    const openConsolePane = () => {
        setConsolePane(true);
    }

    function handleEditorDidMount(editor, monaco) {
        editorRef.current = editor;
    }

    useEffect(()=>{
        let loadThemes = ["brilliance-black","oceanic-next","active4d","blackboard","amy"];
        for(let i in loadThemes){
            defineTheme(loadThemes[i]);
        }
    },[])


    const editorChange = (code) => {
        onChangeData("code",code);
    };


    const OriginalResizeObserver = window.ResizeObserver;

    window.ResizeObserver = function (callback) {

        const wrappedCallback = (entries, observer) => {
            window.requestAnimationFrame(() => {
            callback(entries, observer);
            });
        };
        return new OriginalResizeObserver(wrappedCallback);
    };

    useEffect(() => { defineTheme(dropdownValue.theme); }, [dropdownValue.theme]);

    for (let staticMethod in OriginalResizeObserver) {
        if (OriginalResizeObserver.hasOwnProperty(staticMethod)) {
            window.ResizeObserver[staticMethod] = OriginalResizeObserver[staticMethod];
        }
    }

    return(
    <>
        < SettingSlidingPane isOpen={settingPane} onRequestClose={closeSettingPane} />
        < ConsoleSlidingPane isOpen={consolePane} onRequestClose={closeConsolePane} />

        <div className="  code-editor  flex flex-col w-full min-w-[385px] border-4 min-h-screen border-gray-800">
            
            <div className=" flex flex-row justify-between min-w-[385px]  rounded-sm border-4 m-1 border-gray-800 h-14 ">

                <div className=" buttons flex  text-center align-center rounded-sm ">

                    <button  onClick={openSettingPane} className={`  overflow-hidden mr-2 flex h-12 flex-row items-center bg-blue-900   border-b-4 border-algoXcolor rounded-sm px-4 py-2 font-mono text-sm font-normal text-white ${false ? 'bg-[#1C283B]' : 'bg-[#12151D]'}`}>
                        <SettingsIcon style={{  fontSize: '26px',color:"purple", color:"white",marginRight:"4px"}}/>
                    </button>

                </div>

                <div className="language-button ">
                    <LanguageDropDown />
                </div>

                <div className="side-menu-editor flex  min-w-[125px] text-white ml-8 items-center justify-left p-2">
                    <button  onClick={openConsolePane} >
                        <MenuIcon sx={{fontSize:'28px'}}/>
                    </button>
                </div>

            </div>
            
            <div className="h-2 w-full flex-grow min-h-[200px] min-w-[385px]">
                <Editor
                    height={`100%`}
                    width={`100%`}
                    theme={ dropdownValue.theme}
                    language={currentLanguage.value || "javascript"}
                    onMount={handleEditorDidMount}
                    value={code}
                    onChange={editorChange}
                    options={{fontSize: currentFontSize}}
                />
            </div>
        </div>

    </>
    );

};

export default CodeEditorWindow;