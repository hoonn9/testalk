export const thisYear = (year: number) => {
    const date = new Date();
    console.log(date);
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    date.setFullYear(date.getFullYear() - year);
    return `${date.getFullYear()}-${
        date.getMonth() + 1
    }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
};

export const timestampConverter = (date: string) => {
    const temp = new Date(date);

    return `${temp.getFullYear()}-${
        temp.getMonth() + 1
    }-${temp.getDate()} ${temp.getHours()}:${temp.getMinutes()}:${temp.getSeconds()}`;
};
