"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (req, res) => {
    res.render('errors/err-404', {
        title: '404'
    });
};
