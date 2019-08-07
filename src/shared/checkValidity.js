export const checkValidity = (value, validation) => {
	let isValid = true;
	if (!validation) {
		return true;
	}

	if (validation.required) {
		isValid = value.trim() !== '' && isValid;
	}

	if (validation.minLength) {
		isValid = value.length >= validation.minLength && isValid
	}

	if (validation.maxLength) {
		isValid = value.length <= validation.maxLength && isValid
	}

	if (validation.isEmail) {
		const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
		isValid = pattern.test(value) && isValid
	}

	if (validation.isNumeric) {
		const pattern = /^\d+$/;
		isValid = pattern.test(value) && isValid
	}

	return isValid;
};