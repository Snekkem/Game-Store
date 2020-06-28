export const required = (value) => {
    if(value) return undefined;
    return 'Заполните поле'
}

export const maxLengthCreator = (maxLength) => (value)=> {
    if(value && value.length > 25) return `Максимальная длина ${maxLength} символов`;
    return undefined;
}

export const minLengthCreator = (minLength) => (value)=> {
    if(value && value.length < 6) return `Минимальная длина пароля ${minLength} символов`;
    return undefined;
}

export const passwordsMatch = (value, allValues) =>
    value !== allValues.password ? 'Пароли не совпадают' : undefined;

export const email = value =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
        ? 'Некорректный email'
        : undefined