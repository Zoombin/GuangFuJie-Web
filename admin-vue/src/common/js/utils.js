export function getName(str) {
    return str.substr(0, str.lastIndexOf('.'));
}

export function getExt(str) {
    return str.substr(str.lastIndexOf('.'));
}