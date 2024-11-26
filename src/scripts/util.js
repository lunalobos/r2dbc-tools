
/**
 * 
 * @param {string} str 
 * @returns {string} the capitalized string
 */
export function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * 
 * @param {string} camelCaseStr 
 * @returns {string} the snake cased string
 */
export function camelToSnakeCase(camelCaseStr) {
    return camelCaseStr
        .replace(/([a-z])([A-Z])/g, '$1_$2')
        .toLowerCase();                     
}