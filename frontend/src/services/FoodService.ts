export default class FoodService {

    static async get(token:string) {
        try{
            const response = await fetch('http://localhost:8000/api/foods', {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
            return await response.json()
        } catch(e) {
            return {
                success: false,
                data: [],
                message: 'Error al obtener los productos'
            }
        }
    }

}