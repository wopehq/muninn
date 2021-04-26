"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var fs = require("fs");
var cheerio = require("cheerio");
var config = require('./config/desktop.json');
var collection = config.collection, blockSelector = config.blockSelector;
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var data, $, blocks, results, typeOrders;
        return __generator(this, function (_a) {
            data = fs.readFileSync('./sample/desktop.html', { encoding: 'utf-8' });
            console.time("parser");
            $ = cheerio.load(data);
            blocks = $(blockSelector);
            results = [];
            typeOrders = {};
            blocks.each(function (index, el) {
                Object.keys(collection).forEach(function (key) {
                    var currentType = collection[key];
                    var typeCheck = $(el).find(currentType.detect.withInnerSelector).length > 0;
                    if (!typeCheck)
                        return;
                    var schema = currentType.schema;
                    var result = {};
                    typeOrders[key] = (typeOrders[key] || 0) + 1;
                    Object.keys(schema).forEach(function (field) {
                        var isObjectSelector = typeof schema[field] === 'object';
                        var selector = schema[field];
                        var collectType = "text"; // available: "text" | "html" | "attr" 
                        var collectParams = undefined;
                        if (isObjectSelector) {
                            selector = schema[field].selector;
                            collectType = schema[field].attr ? "attr" : "text";
                            collectParams = schema[field].attr;
                        }
                        result[field] = $(el).find(selector)[collectType](collectParams);
                    });
                    results.push(__assign({ order: index, typeOrder: typeOrders[key], type: key }, result));
                });
            });
            console.log(results);
            console.timeEnd('parser');
            return [2 /*return*/];
        });
    });
}
main()["catch"](function (err) {
    console.log('Error:', err);
});
