// Write a util function that returns the user's current location using async await and the Geolocation API

export const getCurrentLocation = async (): Promise<Coordinates> => {
	return new Promise((resolve, reject) => {
		if (!navigator.geolocation) {
			reject("Geolocation is not supported by your browser");
		} else {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					resolve({
						latitude: position.coords.latitude,
						longitude: position.coords.longitude,
						altitude: position.coords.altitude,
					});
				},
				(error) => {
					reject(error);
				}
			);
		}
	});
};