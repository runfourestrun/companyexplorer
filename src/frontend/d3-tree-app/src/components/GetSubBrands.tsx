import { gql, useQuery } from '@apollo/client';
import React from "react";


interface Brand {
    brandName: string;
}

const GET_SUB_BRANDS = gql`
    query GetSubBrands($brandName: String!) {
        getSubBrands(brandName: $brandName) {
            brandName
        }
    }
`;


const GetSubBrands: React.FC<{brandInput:String}>  = ({ brandInput }) => {

    const {loading,error,data} = useQuery(GET_SUB_BRANDS,
        {
            variables: {brandInput}
        });

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    const subBrands = data?.getSubBrands ?? [];

    return (
        <div>
            <h2>Sub Brands</h2>
            <ul>
                {subBrands.map((brand: Brand) => (
                    <li key={brand.brandName}>{brand.brandName}</li>
                ))}
            </ul>
        </div>
    );
};


export default GetSubBrands;