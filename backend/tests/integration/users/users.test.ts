describe("Test users api",  function() {
    const API_URL = "http://localhost:4000/api/users";
    const API_LOGIN = "http://localhost:4000/api/login";
    test("Create user", async function() {
        const notValidUser = {
            username: "2",
            password: "1",
            role: "test"
        }
        const notValidResponse = await fetch(API_URL, {
            method: "POST",
            body: JSON.stringify(notValidUser),
            headers: {
                "Content-Type": "application/json"
            }
        })
        expect(notValidResponse.status).toBe(400);
        const user = {
            username: Math.random().toString(16).substr(2, 8),
            password: "123456",
            role: "admin"
        }
        const response = await fetch(API_URL, {
            method: "POST",
            body: JSON.stringify(user),  
            headers: {
                "Content-Type": "application/json"
            }
        })
        const json = response.json()
        if (response.ok) {
            expect(response.status).toBe(201);
            json.then(async result => {
                expect(result.message).toEqual("New user registered successfully");
                expect(result.data._id).not.toBeNull();
            })
        }
    });
    test("Get user", async function() {
        const userData = {
            username: Math.random().toString(16).substr(2, 8),
            password: "123456",
            role: "admin"
        }
        const response = await fetch(API_URL, {
            method: "POST",
            body: JSON.stringify(userData),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const json = response.json()
        if (response.ok) {
            expect(response.status).toBe(201);
            json.then(async result => {
                expect(result.message).toEqual("New user registered successfully");
                expect(result.data._id).not.toBeNull();
                const getUserResponse = await fetch(API_URL + "/" + result.data._id)
                const userJson = await getUserResponse.json()
                if (userJson.ok) {
                    userJson.then(async user => {
                        expect(user.role).toEqual("admin");
                        expect(user).toHaveProperty("_id");
                        expect(user).toHaveProperty("password");
                        expect(user).toHaveProperty("username");    
                    })
                }    
            })
        }
    });
    test("Get users", async function() {
        const response = await fetch(API_URL)
        const json = response.json()
        if (response.ok) {
            expect(response.status).toBe(200);
        }
    });
    test("Update user", async function() {
        const userWithoutAdminRole = {
            username: Math.random().toString(16).substr(2, 8),
            password: "123456",
            role: "user"
        }
        const responseUserWithoutAdminRole = await fetch(API_URL, {
            method: "POST",
            body: JSON.stringify(userWithoutAdminRole),
            headers: {
                "Content-Type": "application/json"
            }
        })
        if (responseUserWithoutAdminRole.ok) {
            const jsonUserWithoutAdminRole = responseUserWithoutAdminRole.json()
            expect(responseUserWithoutAdminRole.status).toBe(201);
            jsonUserWithoutAdminRole.then(async result => {                
                expect(result.message).toEqual("New user registered successfully");
                expect(result.data._id).not.toBeNull();
                const responseLogin = await fetch(API_LOGIN, {
                    method: "POST",
                    body: JSON.stringify(userWithoutAdminRole),
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                const jsonLogin = responseLogin.json()
                expect(responseLogin.status).toBe(200);
                jsonLogin.then(async login => {
                    expect(login.token).not.toBeNull();
                    const responseUpdate = await fetch(API_URL + '/' + result.data._id, {
                        method: 'PATCH',
                        body: JSON.stringify(userWithoutAdminRole),
                        headers: {
                            "Content-Type": "application/json",
                            "x-access-token": login.token
                        }

                    })
                    expect(responseUpdate.status).toBe(401);
                })
            })
            
        }
        const userWithAdminRole = {
            username: Math.random().toString(16).substr(2, 8),
            password: "123456",
            role: "admin"
        }
        const responseUserWithAdminRole = await fetch(API_URL, {
            method: "POST",
            body: JSON.stringify(userWithAdminRole),
            headers: {
                "Content-Type": "application/json"
            }
        })
        expect(responseUserWithAdminRole.status).toBe(201);
        const jsonUserWithAdminRole = responseUserWithAdminRole.json()
        jsonUserWithAdminRole.then(async result => {
            expect(result.message).toEqual("New user registered successfully");
            expect(result.data._id).not.toBeNull();
            const responseLogin = await fetch(API_LOGIN, {
                method: "POST",
                body: JSON.stringify(userWithAdminRole),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            expect(responseLogin.status).toBe(200);
            const jsonLogin = responseLogin.json()
            jsonLogin.then(async login => {
                expect(login.token).not.toBeNull();
                const responseUpdate = await fetch(API_URL + '/' + result.data._id, {
                    method: 'PATCH',
                    body: JSON.stringify(userWithAdminRole),
                    headers: {
                        "Content-Type": "application/json",
                        "x-access-token": login.token
                    }

                })
                expect(responseUpdate.status).toBe(200);
            })
        })
    });
    test("Delete user", async function() {
        const userWithAdminRole = {
            username: Math.random().toString(16).substr(2, 8),
            password: "123456",
            role: "admin"
        }
        const responseUserWithAdminRole = await fetch(API_URL, {
            method: "POST",
            body: JSON.stringify(userWithAdminRole),
            headers: {
                "Content-Type": "application/json"
            }
        })
        expect(responseUserWithAdminRole.status).toBe(201);
        const jsonUserWithAdminRole = responseUserWithAdminRole.json()
        jsonUserWithAdminRole.then(async result => {
            expect(result.message).toEqual("New user registered successfully");
            expect(result.data._id).not.toBeNull();
            const responseLogin = await fetch(API_LOGIN, {
                method: "POST",
                body: JSON.stringify(userWithAdminRole),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            expect(responseLogin.status).toBe(200);
            const jsonLogin = responseLogin.json()
            jsonLogin.then(async login => {
                expect(login.token).not.toBeNull();
                const responseUpdate = await fetch(API_URL + '/' + result.data._id, {
                    method: 'DELETE',
                    headers: {
                        "Content-Type": "application/json",
                        "x-access-token": login.token
                    }

                })
                expect(responseUpdate.status).toBe(200);
            })
        });
    });
});