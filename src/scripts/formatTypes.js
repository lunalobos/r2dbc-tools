export class Token {

    /**
     * 
     * @param {string} value 
     * @param {string} type 
     * @param {boolean} nextLine 
     * @param {int} indentation 
     * @param {boolean} space 
     */
    constructor(value, type, nextLine, indentation, space) {
        this.value = value; //string
        this.type = type; //string
        this.nextLine = nextLine; //boolean
        this.indentation = indentation; //int
        this.space = space; //boolean
    }

}

export class Languaje {

    constructor(name, reserved, primitives, classes, annotations, simbols) {
        this.name = name; //string
        this.reserved = reserved; //regex[]
        this.primitives = primitives; //regex[]
        this.classes = classes; //regex[]
        this.annotations = annotations; //regex[]
        this.simbols = simbols; //regex[]
    }
}