export const getOrders =  (userId, {setOrders},max) => {
    fetch('https://centraltech.onrender.com/api/orders/getOrders', {
        method:"POST",
        body: JSON.stringify({
            userId
        }),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
        }
    }).then((res)=> res.json()).then(data=>{
        console.log(data)
        if (max) {
            setOrders(data.splice(0,max))
        }
        else {
            setOrders(data)
        }
    })
}

export const allOrders = (setOrders) => {
    fetch('https://centraltech.onrender.com/api/orders/allOrders', {
        method:"GET",
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
        }
    }).then((res)=> res.json()).then(data=> {
        if (data) {
            setOrders(data)
        }
    })
}
export const allOrdersTotal = (setTotal) => {
    fetch('https://centraltech.onrender.com/api/orders/allOrdersTotal', {
        method:"GET",
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
        }
    }).then((res)=> res.json()).then(data=> {
        if (data) {
            setTotal(data)
        }
    })
}

export const userSpendings = (userId, {setUserSpending}) => {
    fetch('https://centraltech.onrender.com/api/orders/getSpendings', {
        method:"POST",
        body: JSON.stringify({
            userId
        }),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
        }
    }).then((res)=> res.json()).then(data=> {
        setUserSpending(data)
    })
}