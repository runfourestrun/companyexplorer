import React, { useState } from 'react';
import { useQuery, QueryClient, QueryClientProvider } from 'react-query';
import {ApolloProvider, gql} from '@apollo/client';
import client from './client';
import TextButton from "./components/TextButton";
import GetSubBrands from "./components/GetSubBrands";




const App = () => {

    const [brandInput, setBrandName] = useState('');

    const handleBrandInputChange = (input: string) => {
        setBrandName(input);
    };

    return (
        <ApolloProvider client={client}>
        <div>
            <TextButton onBrandInputChange={handleBrandInputChange} />
            <GetSubBrands brandInput={brandInput} />
        </div>
        </ApolloProvider>
    );
}

export default App;