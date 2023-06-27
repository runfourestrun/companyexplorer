import {Dispatch, SetStateAction, useState} from "react";
import TextButton from "./TextButton";
import GetSubBrands from "./GetSubBrands";

/***
 * How the hell do I do this. I have a state variable that I want to share across components.
 * TextButton sets a state variable. And I want to use that state variable in another component.
 */
interface TreeDiagramProps {
    onStateChange: Dispatch<SetStateAction<string>>;
}

const TreeDiagram = () => {
    const [stateValue, setStateValue] = useState('')

    const handleStateChange = (newValue: SetStateAction<string>) => {
        setStateValue(newValue);
    }

    return (
        <div>
            <TextButton/>
            <GetSubBrands stateValue={stateValue} />
        </div>
    );



};

export default TreeDiagram