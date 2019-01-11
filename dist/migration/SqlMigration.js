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
const AsyncUtil_1 = require("../util/AsyncUtil");
class SqlMigration {
    constructor(name, options = { transactionSize: 50, rowsPerInsert: 50 }) {
        this.name = name;
        this.options = options;
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
                    for (var _a = __asyncValues(this.paginatedMap(count, this.options.rowsPerInsert)), _b; _b = yield _a.next(), !_b.done;) {
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
            // Post-migration actions
            if (this.postMigrationActions && this.postMigrationActions.length) {
                try {
                    AsyncUtil_1.default.mapSeries(this.postMigrationActions, (action) => __awaiter(this, void 0, void 0, function* () { return action(); }));
                }
                catch (error) {
                    // TODO: Handle post-migration errors
                    throw error;
                }
            }
            var e_1, _c;
        });
    }
}
exports.default = SqlMigration;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3FsTWlncmF0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL21pZ3JhdGlvbi9TcWxNaWdyYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsaURBQTBDO0FBTzFDO0lBR0UsWUFDUyxJQUFZLEVBQ1osVUFBK0IsRUFBQyxlQUFlLEVBQUUsRUFBRSxFQUFFLGFBQWEsRUFBRSxFQUFFLEVBQUM7UUFEdkUsU0FBSSxHQUFKLElBQUksQ0FBUTtRQUNaLFlBQU8sR0FBUCxPQUFPLENBQWdFO0lBQzdFLENBQUM7SUFhSjs7Ozs7O09BTUc7SUFDWSxZQUFZLENBQVUsS0FBYSxFQUFFLFFBQWdCOztZQUNsRSxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUM7WUFFZCxPQUFPLEtBQUssR0FBRyxLQUFLLEVBQUUsQ0FBQztnQkFDckIsTUFBTSxJQUFJLENBQUMsR0FBRyxFQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUM3QyxLQUFLLElBQUksUUFBUSxDQUFDO1lBQ3BCLENBQUM7UUFDSCxDQUFDO0tBQUE7SUFnQkQ7OztPQUdHO0lBQ1UsR0FBRzs7WUFDZCxJQUFJLENBQUM7Z0JBQ0gsTUFBTSxLQUFLLEdBQUcsTUFBTSxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUM7O29CQUUxQyxHQUFHLENBQUMsQ0FBMEIsSUFBQSxLQUFBLGNBQUEsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQSxJQUFBO3dCQUF2RSxNQUFNLFNBQVMsaUJBQUEsQ0FBQTt3QkFDeEIsRUFBRSxDQUFDLENBQUMsU0FBUyxJQUFJLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDOzRCQUVsQyxJQUFJLENBQUM7Z0NBQ0gsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDOzRCQUVoQyxDQUFDOzRCQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0NBQ2Ysa0NBQWtDO2dDQUNsQyxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLFNBQVMsQ0FBQyxDQUFDO2dDQUNwQyxNQUFNLEtBQUssQ0FBQzs0QkFDZCxDQUFDO3dCQUNILENBQUM7cUJBQ0Y7Ozs7Ozs7OztZQUNILENBQUM7WUFBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNmLHVDQUF1QztnQkFDdkMsTUFBTSxLQUFLLENBQUM7WUFDZCxDQUFDO1lBRUQseUJBQXlCO1lBQ3pCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsSUFBSSxJQUFJLENBQUMsb0JBQW9CLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDbEUsSUFBSSxDQUFDO29CQUNILG1CQUFTLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFPLE1BQTJCLEVBQUUsRUFBRSxnREFBQyxNQUFNLENBQU4sTUFBTSxFQUFFLENBQUEsR0FBQSxDQUFDLENBQUE7Z0JBQ2pHLENBQUM7Z0JBQUMsS0FBSyxDQUFBLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztvQkFDZCxxQ0FBcUM7b0JBQ3JDLE1BQU0sS0FBSyxDQUFDO2dCQUNkLENBQUM7WUFDSCxDQUFDOztRQUNILENBQUM7S0FBQTtDQUNGO0FBckZELCtCQXFGQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNlbGVjdFF1ZXJ5QnVpbGRlciB9IGZyb20gJ3R5cGVvcm0nO1xuaW1wb3J0IEFzeW5jVXRpbCBmcm9tICcuLi91dGlsL0FzeW5jVXRpbCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3FsTWlncmF0aW9uT3B0aW9ucyB7XG4gIHRyYW5zYWN0aW9uU2l6ZT86IG51bWJlcjtcbiAgcm93c1Blckluc2VydD86IG51bWJlcjtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYWJzdHJhY3QgY2xhc3MgU3FsTWlncmF0aW9uIHtcbiAgcHJvdGVjdGVkIHBvc3RNaWdyYXRpb25BY3Rpb25zOiAoKCkgPT4gUHJvbWlzZTx2b2lkPilbXVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBuYW1lOiBTdHJpbmcsXG4gICAgcHVibGljIG9wdGlvbnM6IFNxbE1pZ3JhdGlvbk9wdGlvbnMgPSB7dHJhbnNhY3Rpb25TaXplOiA1MCwgcm93c1Blckluc2VydDogNTB9XG4gICkge31cblxuICAvKipcbiAgICogVGhpcyBtZXRob2QgZGV0ZXJtaW5lcyB3aGV0aGVyIHRoaXMgc2NyaXB0IGhhcyBhbnkgd29yayB0byBiZSBkb25lLlxuICAgKi9cbiAgcHVibGljIGFic3RyYWN0IGFzeW5jIGhhc1dvcmsoKTogUHJvbWlzZTxudW1iZXI+O1xuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgUXVlcnlCdWlsZGVyIGZvciB0aGUgcmVjb3JzIHRoYXQgc2hvdWxkIGJlIG1pZ3JhdGVkLFxuICAgKiB3aWxsIG9ubHkgYmUgY2FsbGVkIGlzIGBgYGhhc1dvcmsoKWBgYCBoYXZlIHJldHVybmVkIGBgYHRydWVgYGAuXG4gICAqL1xuICBwdWJsaWMgYWJzdHJhY3QgbWFwPFQgPSBhbnk+KCk6IFNlbGVjdFF1ZXJ5QnVpbGRlcjxUPjtcblxuICAvKipcbiAgICogQ3JlYXRlcyBhbiBhc3luY0l0ZXJhdG9yIGZvciB0aGUgYGBgbWFwKClgYGAgUXVlcnlCdWlsZGVyIGZvciBwZXJmb3JtaW5nIGEgcGFnaW5hdGVkIHF1ZXJ5XG4gICAqIG92ZXIgdGhlIHJlY29yZHNcbiAgICogXG4gICAqIEBwYXJhbSBjb3VudCBUaGUgbnVtYmVyIG9mIHJlY29yZHMgdG8gYmUgaXRlcmF0ZWQgb3ZlclxuICAgKiBAcGFyYW0gcGFnZVNpemUgVGhlIG51bWJlciBvZiByZWNvcmRzIHRvIGJlIHRha2VuIG9uIGVhY2ggaXRlcmF0aW9uXG4gICAqL1xuICBwcml2YXRlIGFzeW5jICpwYWdpbmF0ZWRNYXA8VCA9IGFueT4oY291bnQ6IG51bWJlciwgcGFnZVNpemU6IG51bWJlcik6IEFzeW5jSXRlcmFibGVJdGVyYXRvcjxhbnk+IHtcbiAgICBsZXQgaW5kZXggPSAwO1xuIFxuICAgIHdoaWxlIChpbmRleCA8IGNvdW50KSB7XG4gICAgICB5aWVsZCB0aGlzLm1hcDxUPigpLnRha2UocGFnZVNpemUpLmdldE1hbnkoKTtcbiAgICAgIGluZGV4ICs9IHBhZ2VTaXplO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGVzIHRoZSBtaWdyYXRpb25zIG9mIHRoZSBtYXBwZWQgZG9jdW1lbnRzLlxuICAgKiBcbiAgICogQHBhcmFtIGRhdGEgVGhlIGRhdGEgbWFwcGVkIGJ5IHRoZSBtaWdyYXRpb24gc3RlcFxuICAgKi9cbiAgcHVibGljIGFic3RyYWN0IGFzeW5jIG1pZ3JhdGUoZGF0YTogYW55W10pOiBQcm9taXNlPHZvaWQ+O1xuXG4gIC8qKlxuICAgKiBIYW5kbGVzIHRoZSBtaWdyYXRpb25zIG9mIHRoZSBtYXBwZWQgZG9jdW1lbnRzLlxuICAgKiBcbiAgICogQHBhcmFtIGRhdGEgVGhlIGRhdGEgbWFwcGVkIGJ5IHRoZSBtaWdyYXRpb24gc3RlcFxuICAgKi9cbiAgcHVibGljIGFic3RyYWN0IGFzeW5jIHJldmVydChlcnJvcjogRXJyb3IsIGRhdGE6IGFueVtdKTogUHJvbWlzZTx2b2lkPjtcblxuICAvKipcbiAgICogUnVucyB0aGUgbWlncmF0aW9uIHN0ZXAgc2FmZWx5LCByZXZlcnRpbmcgdGhlIGNoYW5nZXMgaW4gdGhlIGNhc2Ugb2YgZXJyb3JzLlxuICAgKiBcbiAgICovXG4gIHB1YmxpYyBhc3luYyBydW4oKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGNvdW50ID0gYXdhaXQgdGhpcy5tYXAoKS5nZXRDb3VudCgpO1xuICAgICAgXG4gICAgICBmb3IgYXdhaXQgKGNvbnN0IGRhdGFTbGljZSBvZiB0aGlzLnBhZ2luYXRlZE1hcChjb3VudCwgdGhpcy5vcHRpb25zLnJvd3NQZXJJbnNlcnQpKSB7XG4gICAgICAgIGlmIChkYXRhU2xpY2UgJiYgZGF0YVNsaWNlLmxlbmd0aCkge1xuXG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMubWlncmF0ZShkYXRhU2xpY2UpO1xuXG4gICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIC8vIFRPRE86IEhhbmRsZSB0aGlzIGNhc2UgcHJvcGVybHlcbiAgICAgICAgICAgIGF3YWl0IHRoaXMucmV2ZXJ0KGVycm9yLCBkYXRhU2xpY2UpO1xuICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIC8vIFRPRE86IEhhbmRsZSBtYXBwaW5nIGVycm9ycyBwcm9wZXJseVxuICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxuXG4gICAgLy8gUG9zdC1taWdyYXRpb24gYWN0aW9uc1xuICAgIGlmICh0aGlzLnBvc3RNaWdyYXRpb25BY3Rpb25zICYmIHRoaXMucG9zdE1pZ3JhdGlvbkFjdGlvbnMubGVuZ3RoKSB7XG4gICAgICB0cnkge1xuICAgICAgICBBc3luY1V0aWwubWFwU2VyaWVzKHRoaXMucG9zdE1pZ3JhdGlvbkFjdGlvbnMsIGFzeW5jIChhY3Rpb246ICgpID0+IFByb21pc2U8dm9pZD4pID0+IGFjdGlvbigpKVxuICAgICAgfSBjYXRjaChlcnJvcikge1xuICAgICAgICAvLyBUT0RPOiBIYW5kbGUgcG9zdC1taWdyYXRpb24gZXJyb3JzXG4gICAgICAgIHRocm93IGVycm9yO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19