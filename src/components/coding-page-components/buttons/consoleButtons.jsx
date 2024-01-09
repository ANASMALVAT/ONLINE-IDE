import React, {useState,useEffect}from "react";
import MenuIcon from '@mui/icons-material/Menu';
import ConsoleSlidingPane from "../sliding-panel/consoleSlidingPane";
import ConsoleDropDown from "../drop-downs/consoleDropDown";
import { useDispatch , useSelector} from "react-redux";
import { setConsole,setAlpha,setInput,setProblem,setSolution } from "../../../redux/slices/alphaConsole";
import "./styles/consoleButton.css"

const ConsoleButton = ({}) => {

    const [consolePane,setConsolePane] = useState(false);
    const alphaConsole = useSelector((state) => state.alphaConsole.consoleState);
    const dispatch = useDispatch();

    const setConsoleSolution = () => {
        dispatch(setSolution());
    }

    const setConsoleProblem = () => {
        dispatch(setProblem());
    }
    
    const setConsoleConsole = () => {
        dispatch(setConsole());
    }
    
    const setConsoleInput = () => {
        dispatch(setInput());
    }
    
    const setConsoleAlpha = () => {
        dispatch(setAlpha());
    }

    const openConsolePane = () => {
        setConsolePane(true);
    }
    
    const closeConsolePane = () => {
        setConsolePane(false);
    }

    return (
        <>
            < ConsoleSlidingPane isOpen={consolePane} onRequestClose={closeConsolePane} />

            <div className="flex gap-1 console-buttons">
                <button
                    onClick={setConsoleConsole}
                    className={`border border-[#1F2937] overflow-hidden flex flex-row items-center rounded-[4px] px-3 py-2 h-full font-mono text-sm font-normal text-white
                    ${alphaConsole.isConsole ? 'bg-algoXcolor' : 'bg-[#002451]'}
                    sm:text-sm lg:text-md xl:text-md`}
                >
                    <pre className="font-normal font-resize">Console</pre>
                </button>
            </div>
            <div className="flex gap-1 console-dropdown">
                <ConsoleDropDown/>
            </div>
            <button
                onClick={openConsolePane}
                className={` side-menu-editor border border-algoXcolor overflow-hidden flex flex-row items-center rounded-[4px] px-3 h-full  font-mono text-sm font-normal text-white
                sm:text-sm lg:text-md xl:text-md`}
            >
                <MenuIcon sx={{fontSize:'28px'}}/>
            </button>
        </>
    )
}

export default ConsoleButton;