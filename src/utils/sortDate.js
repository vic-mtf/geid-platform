export const sortFuncString = (a, b) => a > b ? 1 : a < b ? -1 : 0;
export const sortFuncDate = (a, b) => a?.getTime() - b?.getTime();
export const sortNumber = (a, b) => a - b;