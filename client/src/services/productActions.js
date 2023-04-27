import React, { useContext } from "react"
import { UserContext } from "./centralContext"

export const updateProducts = (productId, name, description, price, sale, seller, category, {setProducts}) => {
    if (!name && !description && !price && !sale && !seller && !category)
    {

    }
    else {

        fetch('http://localhost:5002/api/products/updateProduct', {
            method: 'POST',
            body: JSON.stringify({
                productId,
                name,
                description,
                price,
                sale,
                seller,
                category
            }),
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json",
            }
        }).then(res=>res.json()).then((data)=> {
            setProducts(data)
        })
    }
}

export const getProducts = ({setProduct}) => {
    fetch('http://localhost:5002/api/products/getProducts', {
        method: 'GET',
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
        }
        }).then(res=>res.json()).then((data)=> {
            setProduct(data)
            console.log(data)
    })
}

export const getByID = (productID,{setProduct}) => {
    fetch('http://localhost:5002/api/products/getByID', {
        method: 'POST',
        body: JSON.stringify({
            productID
        }),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
        }
        }).then(res=>res.json()).then((data)=> {
            console.log(data)
        setProduct(data[0])
    })
}


export const getRecommended = ({setRecommended}) => {
    fetch('http://localhost:5002/api/products/getRecommended', {
        method: 'GET',
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
        }
    }).then(res=>res.json()).then((data)=> {
        setRecommended(data[0])
    })
}

export const getCategory = async (category, {setPopularHP}, max) => {
    fetch('http://localhost:5002/api/products/getCategory', {
        method: 'POST',
        body: JSON.stringify({
            category
        }),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
        }
    }).then(res=>res.json()).then((data)=> {
            if (max) {
                console.log(data)
                setPopularHP(data.splice(0,max))
            }
            else {
                setPopularHP(data)
            }

        
    })
}

export const getSale = ({setSale},max) => {
    fetch('http://localhost:5002/api/products/getSale', {
        method: 'GET',
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
        }
    }).then(res=>res.json()).then((data)=> {
        setSale(data)
    })
}

export const addItemToCart =  (productId,userId,{setResponse}) => {
    fetch('http://localhost:5002/api/products/addToCart', {
        method: 'POST',
        body: JSON.stringify({
            productId,
            userId
        }),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
        }
        }).then(res=>res.json()).then((data)=> {
        setResponse(["Item added","Your item was successfully added to your cart."])
    })
}

export const getCart = (userId, setCart,max) => {
    fetch('http://localhost:5002/api/products/getCart', {
        method: 'POST',
        body: JSON.stringify({
            userId
        }),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
        }
    }).then(res=>res.json()).then((data)=>{
        console.log(userId)
        if (data) {
            setCart(data.splice(0,max))
        }
    })
}

export const addItemToSave =  (productId, userId, {setResponse, setItemSaved}) => {
    fetch('http://localhost:5002/api/products/addToSaved', {
        method: 'POST',
        body: JSON.stringify({
            productId,
            userId
        }),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
        }
    }).then(res=>res.json()).then((data)=>{
        setItemSaved(true)
        setResponse(["Item added","Your item was successfully saved."])
    })
}

export const removeItemToSave =  (productId, userId, {setResponse,setItemSaved}) => {
    fetch('http://localhost:5002/api/products/removeToSaved', {
            method: 'POST',
        body: JSON.stringify({
            productId,
            userId
        }),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
        }
    }).then(res=>res.json()).then((data)=>{
        console.log(data)
        if (data[0]?._id) {
            setItemSaved(true)
            setResponse(["Item removed", "Your item was successfully removed from save."])
        }
        else {
            setItemSaved(false)
            setResponse(["Item removed", "Your item was successfully removed from save."])

        }
    })
}

export const getSaved = (userId, setSaved,max) => {
    fetch('http://localhost:5002/api/products/getSaved', {
                method: 'POST',
            body: JSON.stringify({
                userId
            }),
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json",
            }
        }).then(res=>res.json()).then((data)=>{
            console.log(data)
            if (data) {
                setSaved(data.splice(0,max))
            }
            else {
            }
        })
}

export const checkItemToSave =  (productId, userId,{setItemSaved}) => {
        fetch('http://localhost:5002/api/products/getSavedById', {
            method: 'POST',
            body: JSON.stringify({
                productId,
                userId
            }),
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json",
            }
        }).then(res=>res.json()).then((data)=>{
            console.log(data)
            if (data[0]?._id) {
                setItemSaved(true)
            }
            else {
                setItemSaved(false)
            }
        })
}

export const searchFor = (query, remove, {setResults}) => {
    if (remove) {
        fetch('http://localhost:5002/api/products/searchFor', {
                method: 'POST',
                body: JSON.stringify({
                    query,
                    remove
                }),
                headers: {
                    Accept: "application/json, text/plain, */*",
                    "Content-Type": "application/json",
                }
            }).then(res=>res.json()).then((data)=>{
                console.log(data)
                if (data) {
                    setResults(data)
                }
                throw new Error("search query failed.")
            })
    }
    else {
        fetch('http://localhost:5002/api/products/searchFor', {
            method: 'POST',
            body: JSON.stringify({
                query,
            }),
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json",
            }
        }).then(res=>res.json()).then((data)=>{
            console.log(data)
            if (data) {
                setResults(data)
            }
            throw new Error("search query failed.")
        })
    }
}

