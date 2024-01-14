"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pathParameterExample = void 0;
const pathParameterExample = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { value } = req.params;
    if (!value)
        return res.status(400).send('Name is required');
    res
        .status(418)
        .send('I cant make coffee! Thanks for your request though, ' +
        value +
        '. Great use of a path parameter!');
});
exports.pathParameterExample = pathParameterExample;
