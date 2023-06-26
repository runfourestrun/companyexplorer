import { gql, useQuery } from '@apollo/client';
import React from "react";


interface Brand {
    brandName: string;
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



const SubBrandList: React.FC<SubBrandListProps> = ({ stateValue }) => {

    const {loading,error,data} = useQuery(GET_SUB_BRANDS,
        {
            variables: {stateValue}
        });

    if (loading) {
        return <p>Loading...</p>;
    };

    if (error) {
        return <p>Error: {error.message}</p>;
    };

    console.log(data);

    return (
        <div>
            <h2>Sub Brands</h2>
            <ul>
                {data.getSubBrands.map((brand:Brand) => (
                    <li key={brand.brandName}>{brand.brandName}</li>
                ))}
            </ul>
        </div>
    );
};

export default SubBrandList;