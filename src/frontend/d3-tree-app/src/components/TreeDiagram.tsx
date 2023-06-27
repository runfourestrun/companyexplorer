import {Dispatch, SetStateAction, useState} from "react";
import TextButton from "./TextButton";
import GetSubBrands from "./GetSubBrands";


const TreeDiagram = () => {
    const [value, setStateValue] = useState('')

    const handleStateChange = (newValue: SetStateAction<string>) => {
        setStateValue(newValue);
    }

    return (
        <div>
            <GetSubBrands />
        </div>
    );



};

export default TreeDiagram