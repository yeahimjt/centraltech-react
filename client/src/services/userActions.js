
export function getUsers(setUsers) {
    fetch('http://localhost:5002/api/users/getUsers', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
    })
    .then((response)=> response.json()).then(data=>{
        if (data) {
            setUsers(data)
        }
    })
}

// Register user
export function Register(username,email,password, setUser, setRegisterErr) {
    fetch('http://localhost:5002/api/users/register', {
    method: 'POST',
    body: JSON.stringify({
        username: username,
        email: email,
        password,
    }),
    headers: {
        'Content-Type': 'application/json'
    }
    })
    .then((response)=> response.json()).then(data=>{
        setRegisterErr("Your account was successfully registered, try to log in!")
    })
}

// Login user
export const loginUser = (username,password, setToken, setFinished, setAlert) => {
    if (username && password) {
        fetch('http://localhost:5002/api/users/login', {
            method: "POST",
            headers: {
              Accept: "application/json, text/plain, */*",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: username,
              password: password,
            }),
          })
            .then((response) =>  response.json())
            .then((data) => {
                console.log(data)
                if (data.accessToken) {
                    setToken(data.accessToken)
                    setFinished(true)
                }
                if (data.title) {
                    alert("Username or password invalid. Please try again.");
                    return null
                }
            })
            .catch((err) => {
              return null
            });
        }

}

// Update user
export function Update(id,setUser, setToken, username,email,password) {
    fetch('http://localhost:5002/api/users/update', {
        method: 'POST',
        body: JSON.stringify({
            userId: id,
            username: username,
            email: email,
            password: password,
        }),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
        }
    }).then(res=>res.json()).then((data)=> {
        if (setToken === null) {
        } else {
            setToken(data.accessToken)
        }
    })
}

// Delete User
export const Delete = (token, setToken,userId, setUser) => {
    fetch('http://localhost:5002/api/users/delete', {
        method: 'DELETE',
        headers: {
            Accept: "application/json, text/plain, */*",
              "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            userId: userId
        })
    }).then((res)=> res.json()).then(data=>{
        console.log('in here')
        localStorage.setItem('access', '')
        setToken(null)
        setUser(null)
    })
}

// Get user
export const Current = async (token, setUser) => {
    fetch('http://localhost:5002/api/users/current', {
        method: 'GET',
        headers: {
            Accept: "application/json, text/plain, */*",
              "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    }).then((res)=> res.json()).then(data=> {
        console.log(data)
        if (data?.username) {
            setUser(data)
        }
    })
}

export const getProfile = async (userId, setProfile) => {
    fetch('http://localhost:5002/api/users/getProfile', {
        method: 'POST',
        body: JSON.stringify({
            userId
        }),
        headers: {
            Accept: "application/json, text/plain, */*",
              "Content-Type": "application/json",
        }
    }).then((res)=> res.json()).then(data=> {
        if (data) {
            setProfile(data[0])
        }
    })
}

export const purchaseCart = async (userId,cart) => {
    fetch('http://localhost:5002/api/users/purchaseCart', {
        method: 'POST',
        body: JSON.stringify({
            userId,
            cart
        }),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
        }
    }).then((res)=> res.json()).then(data=> {
        console.log(data)
    })
    console.log(userId,cart)
}

export const removeCartItem = async (userId, id, {setResponse}) => {
    fetch('http://localhost:5002/api/users/removeCartItem',{
        method: 'POST',
        body: JSON.stringify({
            userId,
            id
        }),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
        }
    }).then((res)=>res.json()).then(data=> {
        console.log(data)
        setResponse(["Successfully removed item","The item has been removed from your cart."])
    })
}