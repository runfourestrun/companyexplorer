
interface SubBrand {
    brandName: string;
    // Define other properties of SubBrand if applicable
}

interface DisplaySubBrandsProps {
    subBrands: SubBrand[];
}

const DisplaySubBrands = ({ subBrands }: DisplaySubBrandsProps) => {
    return (
        <div>
            <h2>Sub Brands:</h2>
            <ul>
                {subBrands.map((subBrand, index) => (
                    <li key={index}>{subBrand.brandName}</li>
                ))}
            </ul>
        </div>
    );
};

export default DisplaySubBrands;
