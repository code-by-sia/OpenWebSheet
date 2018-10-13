define(["require", "exports"], function (require, exports) {
    function clone(obj) {
        return JSON.parse(JSON.stringify(obj));
    }
    exports.clone = clone;
});
