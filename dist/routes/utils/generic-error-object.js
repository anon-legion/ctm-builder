"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function genericErrorObject(message, model) {
    const nullModel = Object.keys(model.schema.obj).reduce((acc, key) => (Object.assign(Object.assign({}, acc), { [key]: null })), {});
    return Object.assign({ error: message }, nullModel);
}
exports.default = genericErrorObject;
