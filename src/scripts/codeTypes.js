import { capitalize } from "./util";

export class JavaType {

    /**
     * Creates a new type
     * @param {string} name - the name of the type
     * @param {string} [package] - the package of the type
     * @param {boolean} [primitive] - if the type is a primitive
     */
    constructor(name, primitive = false, javaPackage = undefined) {
        this.name = primitive ? name.toLowerCase() : capitalize(name);
        if(javaPackage !== undefined){
            this.javaPackage = javaPackage.toLowerCase();
        }
        this.primitive = primitive;
    }

    /**
     * @returns {string} a string representation of the type
     */
    toString(){
        return `${this.name}`;
    }

    toImportString(){
        if(this.javaPackage === undefined)
            return '';
        else
            return `import ${this.javaPackage}.${this.name};`;
    }
}

export class JavaProperty{

    /**
     * Creates a new property
     * @param {string} name 
     * @param {JavaType} type 
     * @param {Annotation[]} annotations 
     */
    constructor(name, type, annotations) {
        this.name = name;
        this.type = type;
        this.annotations = annotations;
    }

    /**
     * @returns {string} a string representation of the property
     */
    toString(){
        return `${this.annotations.some(a => a.name === 'none') ? '' : '\t'}${this.annotations.map(a => a.toString()).join('\t')}\tprivate ${this.type.toString()} ${this.name};\n`;
    }

    toFunctionParameter(){
        return `${this.type} ${this.name}`;
    }
}

export class JavaAnnotation {

    /**
     * Creates a new annotation
     * @param {string} name
     * @param {string} value 
     */
    constructor(name, value = undefined) {
        this.name = name;
        this.value = value;
    }

    /**
     * @returns {string} a string representation of the annotation
     */
    toString(){
        if(this.name === 'none')
            return '\n';
        if(this.value === undefined)
            return `@${this.name}\n`;
        else
            return `@${this.name}(${this.value})\n`;
    }
}

export class JavaEntity{

    /**
     * 
     * @param {string} name 
     * @param {string} [tableName] 
     * @param {JavaProperty[]} properties 
     * @param {JavaAnnotation[]} [annotations]
     * @param {boolean} [builder]
     */
    constructor(name, properties, tableName, entityPackage = 'com.example', annotations = [new JavaAnnotation("Data") ], builder = true){
        this.name = capitalize(name);
        this.tableName =tableName === undefined ? this.name.toLowerCase() : tableName.toLowerCase();
        this.tableName = this.tableName === '' ? this.name.toLowerCase() : this.tableName;
        this.properties = properties;
        annotations.push(new JavaAnnotation("Table", this.tableName));
        this.annotations = annotations;
        this.builder = builder;
        this.entityPackage = entityPackage;
    }
    
    /**
     * 
     * @returns {string} a string representation of the entity
     */
    toString(){

        console.log(this.properties);
        console.log(this.annotations);

        return `
package ${this.entityPackage};
import lombok.Data;\n${this.builder ? 'import lombok.Builder;' : ''}\n
import org.springframework.data.relational.core.mapping.Table;\nimport org.springframework.data.annotation.Id;\n
${this.properties.map(p => p.type.toImportString()).join("\n")}\n
${this.annotations.map(a => a.toString()).join("")}
public class ${this.name} {\n
${this.properties.map(p => p.toString()).join('')}
\tpublic ${this.name}(){}\n
\t${this.builder ? '@Builder' : ''}
\tpublic ${this.name}(${this.properties.map(p => p.toFunctionParameter()).join(", ")}){
\t\t${this.properties.map(p => `this.${p.name} = ${p.name};`).join('\n\t\t')}
\t}
}
`;
    }


}

