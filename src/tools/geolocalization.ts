const getCountryFromCoordinates =  async ( latitude: number, longitude: number ) => {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
    try {
        const response = await fetch( url );
        const data = await response.json( );
        if( data?.address?.country) {
            return {
                status: 'success',
                message: 'ubicacion determinada exitosamente',
                data: data.address,
            };
        }
        return {
            status: 'error',
            message: 'no se pudo determinar la ubicacion',
            data: null,
        };
    } catch (error) {
        console.error("Error al obtener el país:", error);
        return {
            status: 'error',
            message: 'error al obtener el pais',
            data: error,
        };
    }
}

const getCurrentCountry = async ( callback: Function ) => {
    if( "geolocation" in navigator ) {
        navigator.geolocation.getCurrentPosition(
            async position => {
                const { latitude, longitude } = position.coords;
                const lastLatitude = sessionStorage.getItem( 'latitude' )
                const lastLongitude = sessionStorage.getItem( 'longitude' )
                if( lastLatitude === latitude.toString() && lastLongitude === longitude.toString() ) {
                    const lastCountry = sessionStorage.getItem( 'country' );
                    if( lastCountry ) {
                        callback( JSON.parse( lastCountry ) );
                        return;
                    }
                }
                sessionStorage.setItem( 'latitude', latitude.toString() );
                sessionStorage.setItem( 'longitude', longitude.toString() );
                const { data } = await getCountryFromCoordinates( latitude, longitude );
                sessionStorage.setItem( 'country', JSON.stringify( data ) );
                callback( data );
            },
            error => {
                console.error("Error al obtener la posición:", error);
            }
        );
    } else {
        console.error("Geolocalización no está disponible en este navegador.");
    }
}

export {
    getCountryFromCoordinates,
    getCurrentCountry,
}