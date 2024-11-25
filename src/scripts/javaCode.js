import { JavaAnnotation, JavaType } from "./codeTypes"

export const types = [
    new JavaType("String"),
    new JavaType("Integer"),
    new JavaType("Long"),
    new JavaType("Float"),
    new JavaType("Double"),
    new JavaType("Boolean"),
    new JavaType("Short"),
    new JavaType("Byte"),
    new JavaType("Character"),
    new JavaType("LocalDate", false, "java.time"),
    new JavaType("OffSetDateTime", false, "java.time"),
    new JavaType("UUID", false, "java.util"),
    new JavaType("BigInteger", false, "java.math"),
    new JavaType("BigDecimal", false, "java.math"),
    new JavaType("ByteBuffer", false, "java.nio"),
    new JavaType("int", true),
    new JavaType("long", true),
    new JavaType("float", true),
    new JavaType("double", true),
    new JavaType("boolean", true),
    new JavaType("short", true),
    new JavaType("byte", true),
    new JavaType("char", true),
].sort((a, b) => a.name.localeCompare(b.name));



const javaKeywords = new Set(['abstract', 'continue', 'for', 'new', 'switch',
    'assert', 'default', 'package', 'synchronized',
    'boolean', 'do', 'if', 'private', 'this',
    'break', 'double', 'implements', 'protected', 'throw',
    'byte', 'else', 'import', 'public', 'throws',
    'case', 'enum', 'instanceof', 'return', 'transient',
    'catch', 'extends', 'int', 'short', 'try',
    'char', 'final', 'interface', 'static', 'void',
    'class', 'finally', 'long', 'strictfp', 'volatile',
    'float', 'native', 'super', 'while'
]);

/**
 * 
 * @param {string} str the string to check
 * @returns {boolean} if the string is a valid java identifier
 */
export function isValidJavaIdentifier(str) {

    if (!str || typeof str !== "string") return false;
    if (javaKeywords.has(str)) return false;

    const identifierRegex = /^[a-zA-Z_$][a-zA-Z\d_$]*$/;
    return identifierRegex.test(str);
}