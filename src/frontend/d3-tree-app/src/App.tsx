import React, { useState } from 'react';
import { useQuery, QueryClient, QueryClientProvider } from 'react-query';
import {ApolloProvider, gql} from '@apollo/client';
import client from './client';
import TextButton from "./components/TextButton";




const App = () => {


    return (
        <ApolloProvider client={client}>
        <div>
            <TextButton/>
        </div>
        </ApolloProvider>
    );
}

export default App;