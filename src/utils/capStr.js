
const capStr = str => typeof str === 'string' ? 
str.charAt(str, 0).toUpperCase() + str.slice(1, str.length) : null;
export default capStr;