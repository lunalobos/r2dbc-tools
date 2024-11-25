import { java } from './javaFormat.js'
import { Languaje, Token } from './formatTypes.js';

/**
 * 
 * @param {string} properties 
 * @returns an array of token objects
 */
export function tokens(code) {
    const lines = code.split("/\r?\n/");
    const tokens = [];
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const lineTokens = lineToTokens(line, java);
        tokens.push(...lineTokens);
    }
    return tokens;
}

/**
 * 
 * @param {string} line 
 * @param {Languaje} languaje 
 * @returns an array of token objects
 */
function lineToTokens(line, languaje) {
    const all = languaje.reserved.concat(languaje.primitives).concat(languaje.classes).concat(languaje.annotations).concat(languaje.simbols);
    const characters = Array.from(line);
    const tokens = [];
    let tabs = 0;
    let space = false;
    let accumulateToken = '';
    for (let i = 0; i < characters.length; i++) {
        const char = characters[i];
        if (/\t/.test(char)) {
            tabs++;
        } else if (/ /.test(char)) {
            space = true;
        } else if (languaje.simbols.some(re => re.test(char))) {
            if (accumulateToken.length > 0) {
                const token = new Token(accumulateToken, type(accumulateToken, languaje), false, tabs, space);
                tabs = 0;
                space = false;
                tokens.push(token);
                accumulateToken = '';
            }
            const simbolToken = new Token(char, 'simbol', false, tabs, space);
            tabs = 0;
            space = false;
            tokens.push(simbolToken);
        } else if (/\n/.test(char)) {
            if (accumulateToken.length > 0) {
                const token = new Token(accumulateToken, type(accumulateToken, languaje), true, tabs, space);
                tabs = 0;
                space = false;
                tokens.push(token);
                accumulateToken = '';
            } else if(tokens.length > 0){ 
                tokens[tokens.length - 1].nextLine = true;
            }
        } else {
            accumulateToken += char;
            if (all.some(re => re.test(accumulateToken))) {
                const token = new Token(accumulateToken, type(accumulateToken, languaje), false, tabs, space);
                tabs = 0;
                space = false;
                tokens.push(token);
                accumulateToken = '';
            }
        }
    }
    return tokens;
}

function type(str, languaje) {

    if (languaje.reserved.some(re => re.test(str)))
        return 'reserved';

    if (languaje.primitives.some(re => re.test(str)))
        return 'primitive';

    if (languaje.classes.some(re => re.test(str)))
        return 'class';

    if (languaje.annotations.some(re => re.test(str)))
        return 'annotation';

    if (languaje.simbols.some(re => re.test(str)))
        return 'simbol';

    return 'simple';
}



