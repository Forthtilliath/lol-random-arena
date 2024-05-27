export const getSecureRandomNumber = () => {
	let randomNumber = crypto.getRandomValues(new Uint32Array(1))[0];
	randomNumber /= 4_294_967_296;

	return randomNumber;
};

export const getRandomNumber = (min: number, max: number) => {
	const randomNumber = getSecureRandomNumber();

	return Math.floor(randomNumber * (max - min + 1)) + min;
};
