export const required = value => {
    if (value) return undefined;
    return "Field is required";
}

export const maxLengthCreator = (maxLength) => (value) => { //value - символы, которые мы вводим
    if (value.length > maxLength) {
        return `Max length is ${maxLength} symbols`;
    }
    return undefined;
}