import {SetStateAction, useState} from "react";

const TextButton: React.FC<{ onBrandInputChange: (input: string) => void }> = ({ onBrandInputChange }) => {

    const [brandInput, setBrandInput] = useState('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const input = event.target.value;
        setBrandInput(input);
        onBrandInputChange(input)
    };

    const handleButtonClick = () => {
        console.log(brandInput)
    }

    return (
        <div>
            <input
                placeholder="Input the Brand here"
                type="text"
                value={brandInput}
                onChange={handleInputChange}
            />
            <button onClick={handleButtonClick}>Submit</button>
        </div>
    );




};

export default TextButton;