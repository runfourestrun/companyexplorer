import {useEffect, useState} from 'react';
import { useLazyQuery, gql } from '@apollo/client';

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

const GetSubBrands = () => {
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
            console.log(data)
        }
    }, [data])


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

export default GetSubBrands