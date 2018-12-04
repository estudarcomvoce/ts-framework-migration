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
                const offset = index === 0 ? 0 : pageSize;
                yield this.map().take(pageSize).skip(offset).getMany();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFzZURhdGFiYXNlTWlncmF0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL21pZ3JhdGlvbi9CYXNlRGF0YWJhc2VNaWdyYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBT0E7SUFJRSxZQUFtQixJQUFZLEVBQVMsVUFBb0MsRUFBQyxlQUFlLEVBQUUsRUFBRSxFQUFFLGFBQWEsRUFBRSxFQUFFLEVBQUM7UUFBakcsU0FBSSxHQUFKLElBQUksQ0FBUTtRQUFTLFlBQU8sR0FBUCxPQUFPLENBQXFFO1FBQ2xILElBQUksQ0FBQyxlQUFlLEdBQUcsT0FBTyxDQUFDLGVBQWUsSUFBSSxFQUFFLENBQUM7UUFDckQsSUFBSSxDQUFDLGFBQWEsR0FBRyxPQUFPLENBQUMsYUFBYSxJQUFJLEVBQUUsQ0FBQztJQUNuRCxDQUFDO0lBYUQ7Ozs7OztPQU1HO0lBQ1ksWUFBWSxDQUFVLEtBQUssRUFBRSxRQUFROztZQUNsRCxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUM7WUFFZCxPQUFPLEtBQUssR0FBRyxLQUFLLEVBQUUsQ0FBQztnQkFDckIsTUFBTSxNQUFNLEdBQUcsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUM7Z0JBQzFDLE1BQU0sSUFBSSxDQUFDLEdBQUcsRUFBSyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQzFELEtBQUssSUFBSSxRQUFRLENBQUM7WUFDcEIsQ0FBQztRQUNILENBQUM7S0FBQTtJQWdCRDs7O09BR0c7SUFDVSxHQUFHOztZQUNkLElBQUksQ0FBQztnQkFDSCxNQUFNLEtBQUssR0FBRyxNQUFNLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQzs7b0JBRTFDLEdBQUcsQ0FBQyxDQUEwQixJQUFBLEtBQUEsY0FBQSxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUEsSUFBQTt3QkFBL0QsTUFBTSxTQUFTLGlCQUFBLENBQUE7d0JBQ3hCLEVBQUUsQ0FBQyxDQUFDLFNBQVMsSUFBSSxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQzs0QkFFbEMsSUFBSSxDQUFDO2dDQUNILE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQzs0QkFFaEMsQ0FBQzs0QkFBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dDQUNmLGtDQUFrQztnQ0FDbEMsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxTQUFTLENBQUMsQ0FBQztnQ0FDcEMsTUFBTSxLQUFLLENBQUM7NEJBQ2QsQ0FBQzt3QkFDSCxDQUFDO3FCQUNGOzs7Ozs7Ozs7WUFDSCxDQUFDO1lBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDZix1Q0FBdUM7Z0JBQ3ZDLE1BQU0sS0FBSyxDQUFDO1lBQ2QsQ0FBQzs7UUFDSCxDQUFDO0tBQUE7Q0FDRjtBQTdFRCx3Q0E2RUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTZWxlY3RRdWVyeUJ1aWxkZXIgfSBmcm9tICd0eXBlb3JtJztcblxuZXhwb3J0IGludGVyZmFjZSBEYXRhYmFzZU1pZ3JhdGlvbk9wdGlvbnMge1xuICB0cmFuc2FjdGlvblNpemU/OiBudW1iZXI7XG4gIHJvd3NQZXJJbnNlcnQ/OiBudW1iZXI7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGFic3RyYWN0IGNsYXNzIEJhc2VEYXRhYmFzZU1pZ3JhdGlvbiB7XG4gIHByb3RlY3RlZCByZWFkb25seSB0cmFuc2FjdGlvblNpemU6IG51bWJlcjtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IHJvd3NQZXJJbnNlcnQ6IG51bWJlcjtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgbmFtZTogU3RyaW5nLCBwdWJsaWMgb3B0aW9uczogRGF0YWJhc2VNaWdyYXRpb25PcHRpb25zID0ge3RyYW5zYWN0aW9uU2l6ZTogNTAsIHJvd3NQZXJJbnNlcnQ6IDUwfSkge1xuICAgIHRoaXMudHJhbnNhY3Rpb25TaXplID0gb3B0aW9ucy50cmFuc2FjdGlvblNpemUgfHwgNTA7XG4gICAgdGhpcy5yb3dzUGVySW5zZXJ0ID0gb3B0aW9ucy5yb3dzUGVySW5zZXJ0IHx8IDUwO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgbWV0aG9kIGRldGVybWluZXMgd2hldGhlciB0aGlzIHNjcmlwdCBoYXMgYW55IHdvcmsgdG8gYmUgZG9uZS5cbiAgICovXG4gIHB1YmxpYyBhYnN0cmFjdCBhc3luYyBoYXNXb3JrKCk6IFByb21pc2U8Ym9vbGVhbj47XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBRdWVyeUJ1aWxkZXIgZm9yIHRoZSByZWNvcnMgdGhhdCBzaG91bGQgYmUgbWlncmF0ZWQsXG4gICAqIHdpbGwgb25seSBiZSBjYWxsZWQgaXMgYGBgaGFzV29yaygpYGBgIGhhdmUgcmV0dXJuZWQgYGBgdHJ1ZWBgYC5cbiAgICovXG4gIHB1YmxpYyBhYnN0cmFjdCBtYXA8VCA9IGFueT4oKTogU2VsZWN0UXVlcnlCdWlsZGVyPFQ+O1xuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGFuIGFzeW5jSXRlcmF0b3IgZm9yIHRoZSBgYGBtYXAoKWBgYCBRdWVyeUJ1aWxkZXIgZm9yIHBlcmZvcm1pbmcgYSBwYWdpbmF0ZWQgcXVlcnlcbiAgICogb3ZlciB0aGUgcmVjb3Jkc1xuICAgKiBcbiAgICogQHBhcmFtIGNvdW50IFRoZSBudW1iZXIgb2YgcmVjb3JkcyB0byBiZSBpdGVyYXRlZCBvdmVyXG4gICAqIEBwYXJhbSBwYWdlU2l6ZSBUaGUgbnVtYmVyIG9mIHJlY29yZHMgdG8gYmUgdGFrZW4gb24gZWFjaCBpdGVyYXRpb25cbiAgICovXG4gIHByaXZhdGUgYXN5bmMgKnBhZ2luYXRlZE1hcDxUID0gYW55Pihjb3VudCwgcGFnZVNpemUpOiBBc3luY0l0ZXJhYmxlSXRlcmF0b3I8YW55PiB7XG4gICAgbGV0IGluZGV4ID0gMDtcbiBcbiAgICB3aGlsZSAoaW5kZXggPCBjb3VudCkge1xuICAgICAgY29uc3Qgb2Zmc2V0ID0gaW5kZXggPT09IDAgPyAwIDogcGFnZVNpemU7XG4gICAgICB5aWVsZCB0aGlzLm1hcDxUPigpLnRha2UocGFnZVNpemUpLnNraXAob2Zmc2V0KS5nZXRNYW55KCk7XG4gICAgICBpbmRleCArPSBwYWdlU2l6ZTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlcyB0aGUgbWlncmF0aW9ucyBvZiB0aGUgbWFwcGVkIGRvY3VtZW50cy5cbiAgICogXG4gICAqIEBwYXJhbSBkYXRhIFRoZSBkYXRhIG1hcHBlZCBieSB0aGUgbWlncmF0aW9uIHN0ZXBcbiAgICovXG4gIHB1YmxpYyBhYnN0cmFjdCBhc3luYyBtaWdyYXRlKGRhdGE6IGFueVtdKTogUHJvbWlzZTx2b2lkPjtcblxuICAvKipcbiAgICogSGFuZGxlcyB0aGUgbWlncmF0aW9ucyBvZiB0aGUgbWFwcGVkIGRvY3VtZW50cy5cbiAgICogXG4gICAqIEBwYXJhbSBkYXRhIFRoZSBkYXRhIG1hcHBlZCBieSB0aGUgbWlncmF0aW9uIHN0ZXBcbiAgICovXG4gIHB1YmxpYyBhYnN0cmFjdCBhc3luYyByZXZlcnQoZXJyb3I6IEVycm9yLCBkYXRhOiBhbnlbXSk6IFByb21pc2U8dm9pZD47XG5cbiAgLyoqXG4gICAqIFJ1bnMgdGhlIG1pZ3JhdGlvbiBzdGVwIHNhZmVseSwgcmV2ZXJ0aW5nIHRoZSBjaGFuZ2VzIGluIHRoZSBjYXNlIG9mIGVycm9ycy5cbiAgICogXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgcnVuKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBjb3VudCA9IGF3YWl0IHRoaXMubWFwKCkuZ2V0Q291bnQoKTtcblxuICAgICAgZm9yIGF3YWl0IChjb25zdCBkYXRhU2xpY2Ugb2YgdGhpcy5wYWdpbmF0ZWRNYXAoY291bnQsIHRoaXMucm93c1Blckluc2VydCkpIHtcbiAgICAgICAgaWYgKGRhdGFTbGljZSAmJiBkYXRhU2xpY2UubGVuZ3RoKSB7XG5cbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5taWdyYXRlKGRhdGFTbGljZSk7XG5cbiAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgLy8gVE9ETzogSGFuZGxlIHRoaXMgY2FzZSBwcm9wZXJseVxuICAgICAgICAgICAgYXdhaXQgdGhpcy5yZXZlcnQoZXJyb3IsIGRhdGFTbGljZSk7XG4gICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgLy8gVE9ETzogSGFuZGxlIG1hcHBpbmcgZXJyb3JzIHByb3Blcmx5XG4gICAgICB0aHJvdyBlcnJvcjtcbiAgICB9XG4gIH1cbn1cbiJdfQ==