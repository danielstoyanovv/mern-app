describe("Test users api",  function() {
    test("Creates a new user", async function() {
        const notValidUser = {
            username: "2",
            password: "1",
            role: "test"
        }
        const notValidResponse = await fetch('http://localhost:4000/api/users', {
            method: "POST",
            body: JSON.stringify(notValidUser),
            headers: {
                "Content-Type": "application/json"
            }
        })
        expect(notValidResponse.status).toBe(400);
        const user = {
            username: "test_user",
            password: "123456",
            role: "admin"
        }
        const response = await fetch('http://localhost:4000/api/users', {
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
            })
        }
    });
    test("Get user", async function() {
        const user = {
            username: "test_user_123",
            password: "123456",
            role: "admin"
        }
        const response = await fetch('http://localhost:4000/api/users', {
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
                const getUserResponse = await fetch("http://localhost:4000/api/users/" + result.data._id)
                const userJson = await getUserResponse.json()
                if (userJson.ok) {
                    userJson.then(user => {
                        expect(user.username).toEqual("test_user");
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
        const response = await fetch("http://localhost:4000/api/users")
        const json = response.json()
        if (response.ok) {
            expect(response.status).toBe(200);
        }
    });
});