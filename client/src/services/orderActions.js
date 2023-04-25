export const getOrders =  (userId, {setOrders},max) => {
    fetch('http://localhost:5002/api/orders/getOrders', {
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

export const userSpendings = (userId, {setUserSpending}) => {

}