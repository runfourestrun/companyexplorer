import {SetStateAction, useState} from "react";
import TextButton from "./TextButton";
import GetSubBrands from "./GetSubBrands";

const TreeDiagram = () => {
    const [stateValue, setStateValue] = useState('')

    const handleStateChange = (newValue: SetStateAction<string>) => {
        setStateValue(newValue);
    }

    return (
        <div>
            <TextButton  />
            <GetSubBrands stateValue={stateValue} />
        </div>
    )



}