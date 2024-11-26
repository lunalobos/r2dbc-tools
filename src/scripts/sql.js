import { JavaProperty } from "./codeTypes";
import { camelToSnakeCase } from "./util";
import { JavaEntity } from "./codeTypes";
import { Languaje } from "./formatTypes";

/**
 * 
 * @param {JavaEntity} javaEntity
 * @return {string} the sql create table statement
 */
export function toSql(javaEntity){
    const tableName = javaEntity.tableName;
    const properties = javaEntity.properties;
    return `
CREATE TABLE IF NOT EXISTS ${tableName} 
(${properties.map(p => javaPropertyToSqlField(p).toString()).join(",\n\t")});
    `;
}

const javaTypeMappings = {
    String: "TEXT",
    Integer: "INTEGER",
    Long: "BIGINT",
    Float: "REAL",
    Double: "DOUBLE PRECISION",
    Boolean: "BOOLEAN",
    Short: "SMALLINT",
    Byte: "SMALLINT",
    Character: "CHAR(1)",
    LocalDate: "DATE",
    OffSetDateTime: "TIMESTAMP WITH TIME ZONE",
    UUID: "UUID",
    BigInteger: "NUMERIC",
    BigDecimal: "NUMERIC",
    ByteBuffer: "BYTEA",
    int: "INTEGER",
    long: "BIGINT",
    float: "REAL",
    double: "DOUBLE PRECISION",
    boolean: "BOOLEAN",
    short: "SMALLINT",
    byte: "SMALLINT",
    char: "CHAR(1)",
};

/**
 * 
 * @param {string} javaType 
 * @returns {string} the sql type
 */
function javaTypeToSql(javaType) {
    return javaTypeMappings[javaType.name]
}

/**
 * 
 * @param {JavaProperty} property
 * @returns {SQLField} the equivalent sql field
 */
function javaPropertyToSqlField(property) {
    const id = property.annotations.some(a => a.name === 'Id');
    const unique = property.annotations.some(a => a.name === 'Column' && a.value === 'unique = true');
    return new SQLField(property.name, property.type, id, unique);
}

class SQLField{

    /**
     * 
     * @param {string} name 
     * @param {string} type 
     * @param {boolean} id
     * @param {boolean} unique
     */
    constructor(name, type, id = false, unique = false){
        this.name = camelToSnakeCase(name);
        this.type = javaTypeToSql(type);
        this.id = id;
        this.unique = unique;
    }

    /**
     * 
     * @returns {string} a string representation of the field
     */
    toString(){
        return `${this.name} ${this.type}${this.id ? ' PRIMARY KEY' : ''}${this.unique ? ' UNIQUE' : ''}`
    }
}

const reservedSQL = [
   /CREATE/,
   /TABLE/,
   /IF/,
   /NOT/,
   /EXISTS/,
   /PRIMARY/,
   /KEY/,
   /UNIQUE/
];

const typesSQL = [

];

const functionsSQL = [
   
];

const annotationsSQL = [
    
];

const symbolsSQL = [
    
];


export const sql = new Languaje('SQL', reservedSQL, typesSQL, functionsSQL, annotationsSQL, symbolsSQL);
