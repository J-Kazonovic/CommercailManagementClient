export class UtilClone {



    static iterationCopy(src) {
        var target;
        for (let prop in src) {
            if (src.hasOwnProperty(prop)) {
                // if the value is a nested object, recursively copy all it's properties
                if (this.isObject(src[prop])) {
                    target[prop] = UtilClone.iterationCopy(src[prop]);
                } else {
                    target[prop] = src[prop];
                }
            }
        }
        return target;
    }
    static isObject(obj) {
        var type = typeof obj;
        return type === 'function' || type === 'object' && !!obj;
    }


    
}