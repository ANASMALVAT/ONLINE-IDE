import React from "react";
import 'react-dropdown/style.css';
import { setLanguage } from "../../../redux/slices/dropDownSlice";
import ThemeDropdown from "../drop-downs/themeDropDown";
import FontDropDown from "../drop-downs/fontDropDown";
import {useDispatch} from  "react-redux"
import "./styles/editorSettings.css"

const EditorSetting = ({}) => 
{
    const dispatch = useDispatch();

    const setWhiteBoard = () => {
        dispatch(setLanguage({ id: 1, name: "text", label: "White Board", value: "text" }));
    }

    const label = { inputProps: { 'aria-label': 'Color switch demo' } };

    return (
        <>
            <div className="flex flex-col w-full h-full items-center">

                <div className="flex flex-row justify-between items-center text-center mb-6">
                    <FontDropDown/>
                </div>

                <div className="flex flex-row justify-between items-center text-center mb-6">
                    <ThemeDropdown />
                </div>

                <div className="editor-button flex flex-row justify-between items-center text-center mb-6 ">
                    <button onClick={setWhiteBoard} className={`overflow-hidden rounded-sm w-40 mr-2 flex flex-row items-center  px-2 py-2 font-mono text-sm font-normal justify-center border-4 border-algoXcolor text-white   hover:border-[#F5F5F5]`}>
                        White Board 
                    </button>
                </div> 

            </div>
        </>
    )

}

export default EditorSetting;