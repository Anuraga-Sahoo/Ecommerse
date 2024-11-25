import {fetchBaseQuery,createApi} from '@reduxjs/toolkit/query/react'
import { BASE_URL } from '../constants'

const baseQuery=fetchBaseQuery({baseUrl:BASE_URL})

export const apiSlice= createApi({
   baseQuery,
   tagTypes:["Product","Order","User","Category"],
   endpoints:()=>({}) 
})





/*
   here, import {fetchBaseQuery,createApi} from '@reduxjs/toolkit/query/react'
        -> fetchBaseQuery and createApi are neccessary function of @reduxjs/toolkit/query/react library
     
        const baseQuery=fetchBaseQuery({baseUrl:BASE_URL})
        ->The fetchBaseQuery function is used to create a base configuration for making API calls
        ->It takes an object with a baseUrl property, which is set to the value of BASE_URL from the imported constants file
        ->This baseQuery will be used as the default configuration for making API requests.

        export const apiSlice = createApi({
        baseQuery,
        tagTypes: ["Product", "Order", "User", "Category"],
        endpoints: () => ({}),
        });
    ->"The createApi" function is used to create an API slice. 
                      It takes an object with the following properties:
    ->baseQuery: This is set to the baseQuery created earlier. 
                 It provides the default configuration for making API requests.
    ->tagTypes: An array of strings representing different entities or resource types in the API. 
                In this case, it includes "Product," "Order," "User," and "Category." 
                These are used to generate actions and selectors for each resource type.
    ->endpoints: This is a function that returns an object defining the API endpoints. 
                 However, in this example, it's an empty object ({}) since there are no specific endpoints defined. 
                 Endpoints would be defined with additional configuration options if there were actual API endpoints to interact with.


*/