import {SetStateAction, useState} from "react";

const TextButton =  () => {

    const [value, setValue] = useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const input = event.target.value;
        setValue(input);
    };

    const handleButtonClick = () => {
        console.log(value)
    }

    return (
        <div>
            <input
                placeholder="Input the Brand here"
                type="text"
                onChange={handleChange}
            />
            <button onClick={handleButtonClick}>Submit</button>
        </div>
    );




};

export default TextButton;