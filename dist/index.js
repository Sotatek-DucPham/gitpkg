/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IgniteClient = exports.Errors = exports.Long = exports.Decimal = void 0;
__exportStar(require("./Timestamp"), exports);
__exportStar(require("./ObjectType"), exports);
__exportStar(require("./BinaryObject"), exports);
__exportStar(require("./EnumItem"), exports);
const d = require('decimal.js').default;
const l = require('long');
exports.Decimal = d;
exports.Long = l;
__exportStar(require("./IgniteClientConfiguration"), exports);
__exportStar(require("./CacheClient"), exports);
__exportStar(require("./CacheClient"), exports);
__exportStar(require("./CacheConfiguration"), exports);
__exportStar(require("./Query"), exports);
__exportStar(require("./Cursor"), exports);
exports.Errors = require("./Errors");
var IgniteClient_1 = require("./IgniteClient");
Object.defineProperty(exports, "IgniteClient", { enumerable: true, get: function () { return IgniteClient_1.IgniteClient; } });
//# sourceMappingURL=index.js.map