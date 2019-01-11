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
            var e_1, _c;
        });
    }
}
exports.default = SqlMigration;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3FsTWlncmF0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL21pZ3JhdGlvbi9TcWxNaWdyYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBT0E7SUFDRSxZQUNTLElBQVksRUFDWixVQUErQixFQUFDLGVBQWUsRUFBRSxFQUFFLEVBQUUsYUFBYSxFQUFFLEVBQUUsRUFBQztRQUR2RSxTQUFJLEdBQUosSUFBSSxDQUFRO1FBQ1osWUFBTyxHQUFQLE9BQU8sQ0FBZ0U7SUFDN0UsQ0FBQztJQWFKOzs7Ozs7T0FNRztJQUNZLFlBQVksQ0FBVSxLQUFhLEVBQUUsUUFBZ0I7O1lBQ2xFLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQztZQUVkLE9BQU8sS0FBSyxHQUFHLEtBQUssRUFBRSxDQUFDO2dCQUNyQixNQUFNLElBQUksQ0FBQyxHQUFHLEVBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQzdDLEtBQUssSUFBSSxRQUFRLENBQUM7WUFDcEIsQ0FBQztRQUNILENBQUM7S0FBQTtJQWdCRDs7O09BR0c7SUFDVSxHQUFHOztZQUNkLElBQUksQ0FBQztnQkFDSCxNQUFNLEtBQUssR0FBRyxNQUFNLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQzs7b0JBRTFDLEdBQUcsQ0FBQyxDQUEwQixJQUFBLEtBQUEsY0FBQSxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFBLElBQUE7d0JBQXZFLE1BQU0sU0FBUyxpQkFBQSxDQUFBO3dCQUN4QixFQUFFLENBQUMsQ0FBQyxTQUFTLElBQUksU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7NEJBRWxDLElBQUksQ0FBQztnQ0FDSCxNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7NEJBRWhDLENBQUM7NEJBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQ0FDZixrQ0FBa0M7Z0NBQ2xDLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsU0FBUyxDQUFDLENBQUM7Z0NBQ3BDLE1BQU0sS0FBSyxDQUFDOzRCQUNkLENBQUM7d0JBQ0gsQ0FBQztxQkFDRjs7Ozs7Ozs7O1lBQ0gsQ0FBQztZQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ2YsdUNBQXVDO2dCQUN2QyxNQUFNLEtBQUssQ0FBQztZQUNkLENBQUM7O1FBQ0gsQ0FBQztLQUFBO0NBQ0Y7QUF6RUQsK0JBeUVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU2VsZWN0UXVlcnlCdWlsZGVyIH0gZnJvbSAndHlwZW9ybSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3FsTWlncmF0aW9uT3B0aW9ucyB7XG4gIHRyYW5zYWN0aW9uU2l6ZT86IG51bWJlcjtcbiAgcm93c1Blckluc2VydD86IG51bWJlcjtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYWJzdHJhY3QgY2xhc3MgU3FsTWlncmF0aW9uIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIG5hbWU6IFN0cmluZyxcbiAgICBwdWJsaWMgb3B0aW9uczogU3FsTWlncmF0aW9uT3B0aW9ucyA9IHt0cmFuc2FjdGlvblNpemU6IDUwLCByb3dzUGVySW5zZXJ0OiA1MH1cbiAgKSB7fVxuXG4gIC8qKlxuICAgKiBUaGlzIG1ldGhvZCBkZXRlcm1pbmVzIHdoZXRoZXIgdGhpcyBzY3JpcHQgaGFzIGFueSB3b3JrIHRvIGJlIGRvbmUuXG4gICAqL1xuICBwdWJsaWMgYWJzdHJhY3QgYXN5bmMgaGFzV29yaygpOiBQcm9taXNlPG51bWJlcj47XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBRdWVyeUJ1aWxkZXIgZm9yIHRoZSByZWNvcnMgdGhhdCBzaG91bGQgYmUgbWlncmF0ZWQsXG4gICAqIHdpbGwgb25seSBiZSBjYWxsZWQgaXMgYGBgaGFzV29yaygpYGBgIGhhdmUgcmV0dXJuZWQgYGBgdHJ1ZWBgYC5cbiAgICovXG4gIHB1YmxpYyBhYnN0cmFjdCBtYXA8VCA9IGFueT4oKTogU2VsZWN0UXVlcnlCdWlsZGVyPFQ+O1xuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGFuIGFzeW5jSXRlcmF0b3IgZm9yIHRoZSBgYGBtYXAoKWBgYCBRdWVyeUJ1aWxkZXIgZm9yIHBlcmZvcm1pbmcgYSBwYWdpbmF0ZWQgcXVlcnlcbiAgICogb3ZlciB0aGUgcmVjb3Jkc1xuICAgKiBcbiAgICogQHBhcmFtIGNvdW50IFRoZSBudW1iZXIgb2YgcmVjb3JkcyB0byBiZSBpdGVyYXRlZCBvdmVyXG4gICAqIEBwYXJhbSBwYWdlU2l6ZSBUaGUgbnVtYmVyIG9mIHJlY29yZHMgdG8gYmUgdGFrZW4gb24gZWFjaCBpdGVyYXRpb25cbiAgICovXG4gIHByaXZhdGUgYXN5bmMgKnBhZ2luYXRlZE1hcDxUID0gYW55Pihjb3VudDogbnVtYmVyLCBwYWdlU2l6ZTogbnVtYmVyKTogQXN5bmNJdGVyYWJsZUl0ZXJhdG9yPGFueT4ge1xuICAgIGxldCBpbmRleCA9IDA7XG4gXG4gICAgd2hpbGUgKGluZGV4IDwgY291bnQpIHtcbiAgICAgIHlpZWxkIHRoaXMubWFwPFQ+KCkudGFrZShwYWdlU2l6ZSkuZ2V0TWFueSgpO1xuICAgICAgaW5kZXggKz0gcGFnZVNpemU7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZXMgdGhlIG1pZ3JhdGlvbnMgb2YgdGhlIG1hcHBlZCBkb2N1bWVudHMuXG4gICAqIFxuICAgKiBAcGFyYW0gZGF0YSBUaGUgZGF0YSBtYXBwZWQgYnkgdGhlIG1pZ3JhdGlvbiBzdGVwXG4gICAqL1xuICBwdWJsaWMgYWJzdHJhY3QgYXN5bmMgbWlncmF0ZShkYXRhOiBhbnlbXSk6IFByb21pc2U8dm9pZD47XG5cbiAgLyoqXG4gICAqIEhhbmRsZXMgdGhlIG1pZ3JhdGlvbnMgb2YgdGhlIG1hcHBlZCBkb2N1bWVudHMuXG4gICAqIFxuICAgKiBAcGFyYW0gZGF0YSBUaGUgZGF0YSBtYXBwZWQgYnkgdGhlIG1pZ3JhdGlvbiBzdGVwXG4gICAqL1xuICBwdWJsaWMgYWJzdHJhY3QgYXN5bmMgcmV2ZXJ0KGVycm9yOiBFcnJvciwgZGF0YTogYW55W10pOiBQcm9taXNlPHZvaWQ+O1xuXG4gIC8qKlxuICAgKiBSdW5zIHRoZSBtaWdyYXRpb24gc3RlcCBzYWZlbHksIHJldmVydGluZyB0aGUgY2hhbmdlcyBpbiB0aGUgY2FzZSBvZiBlcnJvcnMuXG4gICAqIFxuICAgKi9cbiAgcHVibGljIGFzeW5jIHJ1bigpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgY291bnQgPSBhd2FpdCB0aGlzLm1hcCgpLmdldENvdW50KCk7XG4gICAgICBcbiAgICAgIGZvciBhd2FpdCAoY29uc3QgZGF0YVNsaWNlIG9mIHRoaXMucGFnaW5hdGVkTWFwKGNvdW50LCB0aGlzLm9wdGlvbnMucm93c1Blckluc2VydCkpIHtcbiAgICAgICAgaWYgKGRhdGFTbGljZSAmJiBkYXRhU2xpY2UubGVuZ3RoKSB7XG5cbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5taWdyYXRlKGRhdGFTbGljZSk7XG5cbiAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgLy8gVE9ETzogSGFuZGxlIHRoaXMgY2FzZSBwcm9wZXJseVxuICAgICAgICAgICAgYXdhaXQgdGhpcy5yZXZlcnQoZXJyb3IsIGRhdGFTbGljZSk7XG4gICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgLy8gVE9ETzogSGFuZGxlIG1hcHBpbmcgZXJyb3JzIHByb3Blcmx5XG4gICAgICB0aHJvdyBlcnJvcjtcbiAgICB9XG4gIH1cbn1cbiJdfQ==