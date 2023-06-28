import {useEffect} from "react";


interface SubBrand {
    brandName: string;
    // Define other properties of SubBrand if applicable
}


interface GetSubBrandsProps {
    brandName: string;
    setBrandName: React.Dispatch<React.SetStateAction<string>>;
    subBrands: SubBrand[];
    handleFetchSubBrands: () => void;
}

const GetSubBrands = ({
                          brandName,
                          setBrandName,
                          subBrands,
                          handleFetchSubBrands,
                      }: GetSubBrandsProps) => {
    useEffect(() => {
        console.log(subBrands);
    }, [subBrands]);

    return (
        <div>
            <input
                type="text"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                placeholder="Enter brand name"
            />
            <button onClick={handleFetchSubBrands}>Fetch Sub Brands</button>
        </div>
    );
};

export default GetSubBrands;


