//add a product to localStorage
export const addFavouriteToLocalStorage=(product)=>{
    const favourites=getFavouritesFromLocalStorage()
    if(!favourites.some((p)=>p._id===product._id)){
        favourites.push(product)
        localStorage.setItem("favourites",JSON.stringify(favourites))
    }
}

//remove product from a localstorage
export const removeFavouriteFromLocalStorage=(productId)=>{
    const favourites=getFavouritesFromLocalStorage()
    const updateFavourites=favourites.filter(
        (product)=>product._id!==productId
    )
    localStorage.setItem("favourites",JSON.stringify(updateFavourites))
}

//retrive favourites from localstorage
export const getFavouritesFromLocalStorage=()=>{
    const favouriteJSON=localStorage.getItem("favourites")
    return favouriteJSON ? JSON.parse(favouriteJSON):[]
}

