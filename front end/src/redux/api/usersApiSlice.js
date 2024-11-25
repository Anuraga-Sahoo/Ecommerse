import { apiSlice } from "./apiSlice";
import { USERS_URL } from "../constants";

export const userApiSlice= apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        login:builder.mutation({
            query:(data)=>({
                url:`${USERS_URL}/auth`,
                method:"POST",
                body:data,
            })
        }),
        register:builder.mutation({
            query:(data)=>({
                url:`${USERS_URL}`,
                method:"POST",
                body:data,
            })
        }),
        logout:builder.mutation({
            query:()=>({
                url:`${USERS_URL}/logout`,
                method:"POST",
            })
        }),
        profile:builder.mutation({
            query:(data)=>({
                url:`${USERS_URL}/profile`,
                method:"PUT",
                body:data,
            })       
        }),
        getUsers:builder.query({
            query:()=>({
                url:USERS_URL,
            }),
            providesTags:['User'],
            keepUnusedDataFor:5,
        }),
        deleteUser:builder.mutation({
            query:(userId)=>({
                url:`${USERS_URL}/${userId}`,
                method:"DELETE",
            })
        }),
        getUserDetails:builder.query({
            query:(id)=>({
                url:`${USERS_URL}/${id}`,
            }),
            keepUnusedDataFor:5,
        }),
        updateUser:builder.mutation({
            query:(data)=>({
                url:`${USERS_URL}/${data.userId}`,
                method:"PUT",
                body:data,
            }),
            invalidatesTags:["User"]
        })
       
    })
})


export const {
    useLoginMutation,
    useLogoutMutation,
    useRegisterMutation,
    useProfileMutation,
    useGetUsersQuery,
    useDeleteUserMutation,
    useGetUserDetailsQuery,
    useUpdateUserMutation
} = userApiSlice  /*useLoginMutation is dynamically destrucre by redux-toolkit
                                                  use isdefault, then login is endpoints name and it will converts to
                                                  capitalize at the time of destructure, then mutation also convert to
                                                  Mutation , so it make (useLoginMutation) */



/*
      import { apiSlice } from "./apiSlice";
      import { USERS_URL } from "../constants";
          ->The code imports the previously defined apiSlice and a constant USERS_URL from the "../constants" file.

    
    export const userApiSlice = apiSlice.injectEndpoints({
        endpoints: (builder) => ({
            login: builder.mutation({
                query: (data) => ({
                     url: `${USERS_URL}/auth`,
                     method: "POST",
                     body: data,
                }),
             }),
         }),
    });





//     ->userApiSlice: This variable holds the extended 
//                     API slice. It is named userApiSlice to indicate that it specifically includes endpoints related to user-related operations.
//     ->apiSlice.injectEndpoints: This function is used to inject new endpoints
//                                 into the existing API slice (apiSlice). 
//                                 It takes an object with an endpoints property, which is a function that receives a builder. The builder is then used to define new endpoint
//     ->login: This is the name of the new endpoint being added. It represents a user login operation.
//     ->builder.mutation: This method is used to define a new mutation endpoint. 
//                          In Redux Toolkit Query, mutations are used for operations that modify data on the server.
//     ->query: This is a function that takes data as an argument and returns an object representing the configuration for the mutation. In this case, it specifies:

//              1. url: The URL for the API endpoint, which is constructed by appending "/auth" to the USERS_URL.
//              2. method: The HTTP method for the request, set to "POST" for a login operation.
//              3. body: The data to be sent in the request body, which is the provided data.


// ** The result is a new endpoint named login added to the 
// userApiSlice, allowing you to dispatch actions and handle 
// the state associated with user login operations in your Redux store.
// */