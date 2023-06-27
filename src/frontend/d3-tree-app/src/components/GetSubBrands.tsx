import { gql, useLazyQuery } from '@apollo/client';
import React from "react";


interface SubBrand {
    brandName: string;
    // Define other properties of SubBrand if applicable
}
interface QueryData {
    getSubBrands: SubBrand[];
}
interface SubBrandListProps {
    stateValue: string;
}
const GET_SUB_BRANDS = gql`
    query GetSubBrands($brandName: String!) {
        getSubBrands(brandName: $brandName) {
            brandName
        }
    }
`;

/***
 * Look for useLazy query not useQuery -> that helps you explicitly call it in the button.
 * @param stateValue
 * @constructor
 */
const SubBrandList: React.FC<SubBrandListProps> = ({ stateValue }) => {

    const [getSubBrands, { loading, data, error }] = useLazyQuery<QueryData>(GET_SUB_BRANDS);

    const handleFetchSubBrands = (brandName: string) => {
        getSubBrands({ variables: { brandName } });
    };

    if (loading) {
        return <p>Loading...</p>;
    };

    if (error) {
        return <p>Error: {error.message}</p>;
    };

    if (data) {
        const { getSubBrands: subBrands } = data;
        console.log(subBrands); // Print subBrands array to the console
        // Access and use the subBrands array as needed
    }

    return (
        <div>
            <button onClick={() => handleFetchSubBrands('exampleBrand')}>Fetch Sub Brands</button>
        </div>
    );
};
export default SubBrandList;