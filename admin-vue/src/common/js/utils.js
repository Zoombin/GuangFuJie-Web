export function getName(str) {
    return str.substr(0, str.lastIndexOf('.'));
}

export function getExt(str) {
    return str.substr(str.lastIndexOf('.'));
}

export function guid() {
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    return (S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4());
}