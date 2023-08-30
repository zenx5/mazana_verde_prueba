export default class UserService {

    static async login(email:string, password:string) {
        try{
            const response = await fetch('http://localhost:8000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            })
            return await response.json()
        } catch(error) {
            return {
                error: true,
                message: error?.message ?? "Uknown error"
            }
        }
    }

    static async register(name:string, email:string, password:string, password_confirmation:string) {
        
        try{
            const response = await fetch('http://localhost:8000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password,
                    password_confirmation: password_confirmation
                })
            })
            return await response.json()
        } catch(error) {
            return {
                error: true,
                message: error?.message ?? "Uknown error"
            }
        }
    }

    static async logout(token:string) {
        try{
            const response = await fetch('http://localhost:8000/api/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            })
            return await response.json()
        } catch(error) {
            return {
                error: true,
                message: error?.message ?? "Uknown error"
            }
        }
    }

}