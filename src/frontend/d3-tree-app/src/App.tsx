import React, { useState } from 'react';
import { useQuery, QueryClient, QueryClientProvider } from 'react-query';
import { gql } from '@apollo/client';
import client from './client';
import SankeyDiagram from './SankeyDiagram';

interface Brand {
    brandName: string;
    subBrands?: Brand[];
}

const GET_SUB_BRANDS = gql`
    query GetSubBrands($brandName: String!) {
        getSubBrands(brandName: $brandName) {
            brandName
            subBrands {
                brandName
            }
        }
    }
`;

const queryClient = new QueryClient();

function App() {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const { isLoading, isError, data } = useQuery('brands', async () => {
        const response = await client.query({
            query: GET_SUB_BRANDS,
            variables: { brandName: inputValue },
        });
        return response.data;
    });

    if (isLoading || data === undefined) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error fetching data</div>;
    }

    const transformData = (response: any) => {
        const { getSubBrands } = response;

        const nodes: any[] = [];
        const links: any[] = [];

        const findOrCreateNode = (nodeName: string) => {
            const existingNode = nodes.find((node) => node.name === nodeName);
            if (existingNode) {
                return existingNode;
            } else {
                const newNode = { name: nodeName };
                nodes.push(newNode);
                return newNode;
            }
        };

        getSubBrands.forEach((brand: Brand) => {
            const root = findOrCreateNode(brand.brandName);

            if (brand.subBrands && brand.subBrands.length > 0) {
                brand.subBrands.forEach((subBrand: Brand) => {
                    const leaf = findOrCreateNode(subBrand.brandName);

                    links.push({
                        source: root.name,
                        target: leaf.name,
                        value: 1,
                    });
                });
            }
        });

        return { nodes, links };
    };

    const transformedData = transformData(data);

    return (
        <div className="App">
            <header className="App-header">
                <SankeyDiagram data={transformedData} width={500} height={500} />
            </header>
        </div>
    );
}

function Root() {
    return (
        <QueryClientProvider client={queryClient}>
            <App />
        </QueryClientProvider>
    );
}

export default Root;