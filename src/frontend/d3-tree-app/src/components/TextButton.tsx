import {Dispatch, SetStateAction, useState} from "react";


/***
 * I don't have a hook right now for apollo query - to actually make a
 * @constructor
 */
const TextButton = () => {

    const [value, setValue] = useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const input = event.target.value;
        setValue(input);
        console.log(input + " this is the change event.")

    };

    const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const input = value
        console.log({value} + input + " this is the button click")

    }

    return (
        <div>
            <input
                placeholder="Input the Brand here"
                type="text"
                value={value}
                onChange={handleChange}
            />
            <button onClick={handleButtonClick}>Submit</button>
        </div>
    );




};

export default TextButton;