import React from "react";
import CodeOutput from "./codeOutput";
import ConsoleButton from "../buttons/consoleButtons";
import { useSelector } from "react-redux";

import "./styles/consoleInput.css";

const ConsoleInput = ({output,runCode}) =>{

    const alphaConsole = useSelector((state) => state.alphaConsole.consoleState);

    return (
        <div className="main-console flex-grow overflow-hidden p-2 pb-0 border border-gray-500 min-h-[375px] bg-algoblack rounded-md">  
            <div className="flex-grow output-input  h-full mt-2 mb-2 border border-gray-600 rounded-md overflow-hidden p-1 ">
                { <CodeOutput outputDetail={output} runCode={runCode}/> }
            </div>
            
        </div>
    );
}

export default ConsoleInput;