import { useEffect, useState } from 'react';
import { useLazyQuery, gql } from '@apollo/client';
import GetSubBrands from './GetSubBrands';
import VisualizeSubBrandsChild from "./VisualizeSubBrandsChild";
import SunburstChart from "./SunburstChart";


interface SubBrand {
    brandName: string;
    // Define other properties of SubBrand if applicable
}

interface QueryData {
    getSubBrands: SubBrand[];
}

const GET_SUB_BRANDS = gql`
    query GetSubBrands($brandName: String!) {
        getSubBrands(brandName: $brandName) {
            brandName
        }
    }
`;


const ParentComponent = () => {
    const [brandName, setBrandName] = useState('');
    const [subBrands, setSubBrands] = useState<SubBrand[]>([]); // State variable to store subBrands
    const [getSubBrands, { loading, data, error }] = useLazyQuery<QueryData>(GET_SUB_BRANDS);

    const handleFetchSubBrands = () => {
        getSubBrands({ variables: { brandName } });
    };

    useEffect(() => {
        if (data) {
            const { getSubBrands: newSubBrands } = data;
            setSubBrands(newSubBrands); // Update the state variable with the fetched subBrands
        }
    }, [data]);

    return (
        <div>
            <GetSubBrands
                brandName={brandName}
                setBrandName={setBrandName}
                subBrands={subBrands}
                handleFetchSubBrands={handleFetchSubBrands}/>
            <VisualizeSubBrandsChild subBrands={subBrands}/>
            <SunburstChart subBrands={subBrands} brandName={brandName} />
    </div>
);
};

export default ParentComponent;
