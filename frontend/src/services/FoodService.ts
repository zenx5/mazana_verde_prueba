export default class FoodService {

    static async get(token:string) {
        try{
            const response = await fetch(import.meta.env.VITE_APP_HOST+'/api/foods', {
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