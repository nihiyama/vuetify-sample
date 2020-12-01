import _ from "lodash"

const mapKeysDeep = (obj, cb) => {
    // console.log("hoge0", obj)
    if (_.isArray(obj)) {
        // console.log("hoge1", obj)
        return obj.map(innerObj => mapKeysDeep(innerObj, cb))
    } else if (_.isObject(obj)) {
        // console.log("hoge2", obj)
        // console.log("hoge", _.mapValues(_.mapKeys(obj, cb), val => mapKeysDeep(val, cb)),)
        return _.mapValues(_.mapKeys(obj, cb), val => mapKeysDeep(val, cb))
    } else {
        // console.log("hoge3", obj)
        return obj
    }
}

export const mapKeysCamelCase = obj =>
    mapKeysDeep(obj, (_value, key) => _.camelCase(key))

export const mapKeysSnakeCase = obj =>
    mapKeysDeep(obj, (_value, key) => _.snakeCase(key))