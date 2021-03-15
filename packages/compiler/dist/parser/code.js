"use strict";
/******************************************************************
 * Copyright (C) 2020 LvChengbin
 *
 * File: src/parse.ts
 * Author: LvChengbin<lvchengbin59@gmail.com>
 * Time: 06/02/2020
 * Description:
 ******************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Interpolates expression templates and gather imports from them
 *
 */
function interpolate(tpl, options) {
    const { moduleId } = options;
    const imports = new Set();
    const invocation = tpl.replace(/\$\{([^}]*)\}/g, (m, n) => {
        return n.replace(/(?:^|\s)MODULE(\.EXPORTS)?((?:\.[a-zA-Z$_][a-zA-Z0-9$_]*)*)/g, (MODULE, EXPORTS, expression) => {
            if (EXPORTS) {
                if (!expression)
                    throw new Error(`${n} is not a legal expression.`);
                const alias = `${moduleId}__${expression.slice(1)}`;
                imports.add(`{ ${expression.slice(1)} as ${alias} }`);
                return alias;
            }
            imports.add(moduleId);
            if (expression)
                return `${moduleId}${expression}`;
            return moduleId;
        });
    });
    return { invocation, imports: [...imports] };
}
/**
 * Parses the "code" token, translates invocation template code to the real code
 * e.g. if the moduleId is "M1"
 *  <${MODULE} /> --> <M1 /> with import M1
 *  <${MODULE.fn} /> -> <M1.fn /> with import M1
 *  <${MODULE.EXPORTS.fn} /> -> <M1_fn /> with import { fn as M1_fn }
 *  <${MODULE.EXPORTS.fn1} /> <${MODULE.EXPORTS.fn2} /> -> <M1_fn1 /> <M1_fn2 /> with import { fn1 as M1_fn1, fn2 as M1_fn2 }
 *
 *
 * @param {Marked.Token} token
 * @param {ParseCodeTokenOptions} options
 */
function token(token, options) {
    const { raw = '', lang = '', text = '' } = token;
    const matches = raw.split(/[\n\r]/)[0]?.match(/\{{3}(.*?)\}{3}/);
    const { imports = [], invocation = null } = matches ? interpolate(matches[1], options) : {};
    return {
        imports,
        token: {
            ...token,
            lang: lang.replace(/\s+\{{3}.*$/, ''),
            text: text.replace(/^.*?\}{3}/, ''),
            invocation
        }
    };
}
exports.default = { interpolate, token };