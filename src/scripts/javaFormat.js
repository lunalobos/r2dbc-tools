import { Languaje } from "./formatTypes"

const reserved = [
    /class/,
    /private/,
    /public/,
    /interface/,
    /extends/,
    /static/,
    /import/,
    /package/
]

const primitives = [
    /boolean/,
    /byte/,
    /char/,
    /double/,
    /float/,
    /int/,
    /long/,
    /short/
]

const classes = [
    /String/,
    /UUID/,
    /OffSetDateTime/,
    /LocalDate/,
    /Long/,
    /Integer/,
    /Double/,
    /Float/,
    /BigDecimal/,
    /BigInteger/,
    /Boolean/,
    /Byte/,
    /Character/
]

const annotations = [
    /@Id/,
    /@Column/,
    /@Data/,
    /@Table/,
    /@Builder/,
    /@RestController/,
    /@GetMapping/,
    /@PostMapping/,
    /@PutMapping/,
    /@DeleteMapping/,
    /@RequestMapping/,
    /@PathMapping/,
    /@Repository/
]

const simbols = [
    /{/,
    /}/,
    /\(/,
    /\)/,
    /\[/,
    /]/,
    /,/,
    /;/,
    /=/,
    /=\+/,
    /=\-/,
    /==/,
    /!=/,
    />/,
    /</,
    />=/,
    /<=/,
    /&&/,
    /\|\|/,
]

export const java = new Languaje('Java', reserved, primitives, classes, annotations, simbols);