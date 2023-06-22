import React, { useState } from 'react';
import { useQuery,QueryClient,QueryClientProvider } from 'react-query'
import { gql } from '@apollo/client';
import client from './client'


interface Brand {
    brandName: string;
}

const GET_ALL_BRANDS = gql`
    query GetAllBrands{
        getAllBrands {
            brandName
        }
    }
`;


const queryClient = new QueryClient();


function App() {


    //Hook to manage state for these two variables
    const [inputValue, setInputValue] = useState('');

    //I think this is an event handler? It changes the state of event.target.value clearly though.
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };



    const { isLoading, isError, data } = useQuery('brands', async () => {
        const response = await client.query({
            query: GET_ALL_BRANDS,
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


    const transformData = (data: Brand[]) => {
        // Implement the logic to transform the GraphQL response data into the required format for the D3 Tree diagram
        // Return the transformed data
    };

    return (
        <div className="App">
            <header className="App-header">
                <input type="text" value={inputValue} onChange={handleInputChange} />
                {/* Display the retrieved data */}
                <pre>{JSON.stringify(data.getAllBrands, null, 2)}</pre>
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