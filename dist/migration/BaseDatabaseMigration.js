"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);  }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
var __asyncValues = (this && this.__asyncIterator) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator];
    return m ? m.call(o) : typeof __values === "function" ? __values(o) : o[Symbol.iterator]();
};
Object.defineProperty(exports, "__esModule", { value: true });
class BaseDatabaseMigration {
    constructor(name, options = { transactionSize: 50, rowsPerInsert: 50 }) {
        this.name = name;
        this.options = options;
        this.transactionSize = options.transactionSize || 50;
        this.rowsPerInsert = options.rowsPerInsert || 50;
    }
    /**
     * Creates an asyncIterator for the ```map()``` QueryBuilder for performing a paginated query
     * over the records
     *
     * @param count The number of records to be iterated over
     * @param pageSize The number of records to be taken on each iteration
     */
    paginatedMap(count, pageSize) {
        return __asyncGenerator(this, arguments, function* paginatedMap_1() {
            let index = 0;
            while (index < count) {
                yield this.map().take(pageSize).getMany();
                index += pageSize;
            }
        });
    }
    /**
     * Runs the migration step safely, reverting the changes in the case of errors.
     *
     */
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const count = yield this.map().getCount();
                try {
                    for (var _a = __asyncValues(this.paginatedMap(count, this.rowsPerInsert)), _b; _b = yield _a.next(), !_b.done;) {
                        const dataSlice = yield _b.value;
                        if (dataSlice && dataSlice.length) {
                            try {
                                yield this.migrate(dataSlice);
                            }
                            catch (error) {
                                // TODO: Handle this case properly
                                yield this.revert(error, dataSlice);
                                throw error;
                            }
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_b && !_b.done && (_c = _a.return)) yield _c.call(_a);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
            catch (error) {
                // TODO: Handle mapping errors properly
                throw error;
            }
            var e_1, _c;
        });
    }
}
exports.default = BaseDatabaseMigration;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFzZURhdGFiYXNlTWlncmF0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL21pZ3JhdGlvbi9CYXNlRGF0YWJhc2VNaWdyYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBT0E7SUFJRSxZQUFtQixJQUFZLEVBQVMsVUFBb0MsRUFBQyxlQUFlLEVBQUUsRUFBRSxFQUFFLGFBQWEsRUFBRSxFQUFFLEVBQUM7UUFBakcsU0FBSSxHQUFKLElBQUksQ0FBUTtRQUFTLFlBQU8sR0FBUCxPQUFPLENBQXFFO1FBQ2xILElBQUksQ0FBQyxlQUFlLEdBQUcsT0FBTyxDQUFDLGVBQWUsSUFBSSxFQUFFLENBQUM7UUFDckQsSUFBSSxDQUFDLGFBQWEsR0FBRyxPQUFPLENBQUMsYUFBYSxJQUFJLEVBQUUsQ0FBQztJQUNuRCxDQUFDO0lBYUQ7Ozs7OztPQU1HO0lBQ1ksWUFBWSxDQUFVLEtBQUssRUFBRSxRQUFROztZQUNsRCxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUM7WUFFZCxPQUFPLEtBQUssR0FBRyxLQUFLLEVBQUUsQ0FBQztnQkFDckIsTUFBTSxJQUFJLENBQUMsR0FBRyxFQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUM3QyxLQUFLLElBQUksUUFBUSxDQUFDO1lBQ3BCLENBQUM7UUFDSCxDQUFDO0tBQUE7SUFnQkQ7OztPQUdHO0lBQ1UsR0FBRzs7WUFDZCxJQUFJLENBQUM7Z0JBQ0gsTUFBTSxLQUFLLEdBQUcsTUFBTSxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUM7O29CQUUxQyxHQUFHLENBQUMsQ0FBMEIsSUFBQSxLQUFBLGNBQUEsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFBLElBQUE7d0JBQS9ELE1BQU0sU0FBUyxpQkFBQSxDQUFBO3dCQUN4QixFQUFFLENBQUMsQ0FBQyxTQUFTLElBQUksU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7NEJBRWxDLElBQUksQ0FBQztnQ0FDSCxNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7NEJBRWhDLENBQUM7NEJBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQ0FDZixrQ0FBa0M7Z0NBQ2xDLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsU0FBUyxDQUFDLENBQUM7Z0NBQ3BDLE1BQU0sS0FBSyxDQUFDOzRCQUNkLENBQUM7d0JBQ0gsQ0FBQztxQkFDRjs7Ozs7Ozs7O1lBQ0gsQ0FBQztZQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ2YsdUNBQXVDO2dCQUN2QyxNQUFNLEtBQUssQ0FBQztZQUNkLENBQUM7O1FBQ0gsQ0FBQztLQUFBO0NBQ0Y7QUE1RUQsd0NBNEVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU2VsZWN0UXVlcnlCdWlsZGVyIH0gZnJvbSAndHlwZW9ybSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgRGF0YWJhc2VNaWdyYXRpb25PcHRpb25zIHtcbiAgdHJhbnNhY3Rpb25TaXplPzogbnVtYmVyO1xuICByb3dzUGVySW5zZXJ0PzogbnVtYmVyO1xufVxuXG5leHBvcnQgZGVmYXVsdCBhYnN0cmFjdCBjbGFzcyBCYXNlRGF0YWJhc2VNaWdyYXRpb24ge1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgdHJhbnNhY3Rpb25TaXplOiBudW1iZXI7XG4gIHByb3RlY3RlZCByZWFkb25seSByb3dzUGVySW5zZXJ0OiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IocHVibGljIG5hbWU6IFN0cmluZywgcHVibGljIG9wdGlvbnM6IERhdGFiYXNlTWlncmF0aW9uT3B0aW9ucyA9IHt0cmFuc2FjdGlvblNpemU6IDUwLCByb3dzUGVySW5zZXJ0OiA1MH0pIHtcbiAgICB0aGlzLnRyYW5zYWN0aW9uU2l6ZSA9IG9wdGlvbnMudHJhbnNhY3Rpb25TaXplIHx8IDUwO1xuICAgIHRoaXMucm93c1Blckluc2VydCA9IG9wdGlvbnMucm93c1Blckluc2VydCB8fCA1MDtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIG1ldGhvZCBkZXRlcm1pbmVzIHdoZXRoZXIgdGhpcyBzY3JpcHQgaGFzIGFueSB3b3JrIHRvIGJlIGRvbmUuXG4gICAqL1xuICBwdWJsaWMgYWJzdHJhY3QgYXN5bmMgaGFzV29yaygpOiBQcm9taXNlPGJvb2xlYW4+O1xuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgUXVlcnlCdWlsZGVyIGZvciB0aGUgcmVjb3JzIHRoYXQgc2hvdWxkIGJlIG1pZ3JhdGVkLFxuICAgKiB3aWxsIG9ubHkgYmUgY2FsbGVkIGlzIGBgYGhhc1dvcmsoKWBgYCBoYXZlIHJldHVybmVkIGBgYHRydWVgYGAuXG4gICAqL1xuICBwdWJsaWMgYWJzdHJhY3QgbWFwPFQgPSBhbnk+KCk6IFNlbGVjdFF1ZXJ5QnVpbGRlcjxUPjtcblxuICAvKipcbiAgICogQ3JlYXRlcyBhbiBhc3luY0l0ZXJhdG9yIGZvciB0aGUgYGBgbWFwKClgYGAgUXVlcnlCdWlsZGVyIGZvciBwZXJmb3JtaW5nIGEgcGFnaW5hdGVkIHF1ZXJ5XG4gICAqIG92ZXIgdGhlIHJlY29yZHNcbiAgICogXG4gICAqIEBwYXJhbSBjb3VudCBUaGUgbnVtYmVyIG9mIHJlY29yZHMgdG8gYmUgaXRlcmF0ZWQgb3ZlclxuICAgKiBAcGFyYW0gcGFnZVNpemUgVGhlIG51bWJlciBvZiByZWNvcmRzIHRvIGJlIHRha2VuIG9uIGVhY2ggaXRlcmF0aW9uXG4gICAqL1xuICBwcml2YXRlIGFzeW5jICpwYWdpbmF0ZWRNYXA8VCA9IGFueT4oY291bnQsIHBhZ2VTaXplKTogQXN5bmNJdGVyYWJsZUl0ZXJhdG9yPGFueT4ge1xuICAgIGxldCBpbmRleCA9IDA7XG4gXG4gICAgd2hpbGUgKGluZGV4IDwgY291bnQpIHtcbiAgICAgIHlpZWxkIHRoaXMubWFwPFQ+KCkudGFrZShwYWdlU2l6ZSkuZ2V0TWFueSgpO1xuICAgICAgaW5kZXggKz0gcGFnZVNpemU7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZXMgdGhlIG1pZ3JhdGlvbnMgb2YgdGhlIG1hcHBlZCBkb2N1bWVudHMuXG4gICAqIFxuICAgKiBAcGFyYW0gZGF0YSBUaGUgZGF0YSBtYXBwZWQgYnkgdGhlIG1pZ3JhdGlvbiBzdGVwXG4gICAqL1xuICBwdWJsaWMgYWJzdHJhY3QgYXN5bmMgbWlncmF0ZShkYXRhOiBhbnlbXSk6IFByb21pc2U8dm9pZD47XG5cbiAgLyoqXG4gICAqIEhhbmRsZXMgdGhlIG1pZ3JhdGlvbnMgb2YgdGhlIG1hcHBlZCBkb2N1bWVudHMuXG4gICAqIFxuICAgKiBAcGFyYW0gZGF0YSBUaGUgZGF0YSBtYXBwZWQgYnkgdGhlIG1pZ3JhdGlvbiBzdGVwXG4gICAqL1xuICBwdWJsaWMgYWJzdHJhY3QgYXN5bmMgcmV2ZXJ0KGVycm9yOiBFcnJvciwgZGF0YTogYW55W10pOiBQcm9taXNlPHZvaWQ+O1xuXG4gIC8qKlxuICAgKiBSdW5zIHRoZSBtaWdyYXRpb24gc3RlcCBzYWZlbHksIHJldmVydGluZyB0aGUgY2hhbmdlcyBpbiB0aGUgY2FzZSBvZiBlcnJvcnMuXG4gICAqIFxuICAgKi9cbiAgcHVibGljIGFzeW5jIHJ1bigpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgY291bnQgPSBhd2FpdCB0aGlzLm1hcCgpLmdldENvdW50KCk7XG5cbiAgICAgIGZvciBhd2FpdCAoY29uc3QgZGF0YVNsaWNlIG9mIHRoaXMucGFnaW5hdGVkTWFwKGNvdW50LCB0aGlzLnJvd3NQZXJJbnNlcnQpKSB7XG4gICAgICAgIGlmIChkYXRhU2xpY2UgJiYgZGF0YVNsaWNlLmxlbmd0aCkge1xuXG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMubWlncmF0ZShkYXRhU2xpY2UpO1xuXG4gICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIC8vIFRPRE86IEhhbmRsZSB0aGlzIGNhc2UgcHJvcGVybHlcbiAgICAgICAgICAgIGF3YWl0IHRoaXMucmV2ZXJ0KGVycm9yLCBkYXRhU2xpY2UpO1xuICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIC8vIFRPRE86IEhhbmRsZSBtYXBwaW5nIGVycm9ycyBwcm9wZXJseVxuICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxuICB9XG59XG4iXX0=