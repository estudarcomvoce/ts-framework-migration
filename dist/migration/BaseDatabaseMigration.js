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
                yield this.map().take(pageSize).skip(pageSize).getMany();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFzZURhdGFiYXNlTWlncmF0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL21pZ3JhdGlvbi9CYXNlRGF0YWJhc2VNaWdyYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBT0E7SUFJRSxZQUFtQixJQUFZLEVBQVMsVUFBb0MsRUFBQyxlQUFlLEVBQUUsRUFBRSxFQUFFLGFBQWEsRUFBRSxFQUFFLEVBQUM7UUFBakcsU0FBSSxHQUFKLElBQUksQ0FBUTtRQUFTLFlBQU8sR0FBUCxPQUFPLENBQXFFO1FBQ2xILElBQUksQ0FBQyxlQUFlLEdBQUcsT0FBTyxDQUFDLGVBQWUsSUFBSSxFQUFFLENBQUM7UUFDckQsSUFBSSxDQUFDLGFBQWEsR0FBRyxPQUFPLENBQUMsYUFBYSxJQUFJLEVBQUUsQ0FBQztJQUNuRCxDQUFDO0lBYUQ7Ozs7OztPQU1HO0lBQ1ksWUFBWSxDQUFVLEtBQUssRUFBRSxRQUFROztZQUNsRCxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUM7WUFFZCxPQUFPLEtBQUssR0FBRyxLQUFLLEVBQUUsQ0FBQztnQkFDckIsTUFBTSxJQUFJLENBQUMsR0FBRyxFQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDNUQsS0FBSyxJQUFJLFFBQVEsQ0FBQztZQUNwQixDQUFDO1FBQ0gsQ0FBQztLQUFBO0lBZ0JEOzs7T0FHRztJQUNVLEdBQUc7O1lBQ2QsSUFBSSxDQUFDO2dCQUNILE1BQU0sS0FBSyxHQUFHLE1BQU0sSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDOztvQkFFMUMsR0FBRyxDQUFDLENBQTBCLElBQUEsS0FBQSxjQUFBLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQSxJQUFBO3dCQUEvRCxNQUFNLFNBQVMsaUJBQUEsQ0FBQTt3QkFDeEIsRUFBRSxDQUFDLENBQUMsU0FBUyxJQUFJLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDOzRCQUVsQyxJQUFJLENBQUM7Z0NBQ0gsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDOzRCQUVoQyxDQUFDOzRCQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0NBQ2Ysa0NBQWtDO2dDQUNsQyxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLFNBQVMsQ0FBQyxDQUFDO2dDQUNwQyxNQUFNLEtBQUssQ0FBQzs0QkFDZCxDQUFDO3dCQUNILENBQUM7cUJBQ0Y7Ozs7Ozs7OztZQUNILENBQUM7WUFBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNmLHVDQUF1QztnQkFDdkMsTUFBTSxLQUFLLENBQUM7WUFDZCxDQUFDOztRQUNILENBQUM7S0FBQTtDQUNGO0FBNUVELHdDQTRFQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNlbGVjdFF1ZXJ5QnVpbGRlciB9IGZyb20gJ3R5cGVvcm0nO1xuXG5leHBvcnQgaW50ZXJmYWNlIERhdGFiYXNlTWlncmF0aW9uT3B0aW9ucyB7XG4gIHRyYW5zYWN0aW9uU2l6ZT86IG51bWJlcjtcbiAgcm93c1Blckluc2VydD86IG51bWJlcjtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYWJzdHJhY3QgY2xhc3MgQmFzZURhdGFiYXNlTWlncmF0aW9uIHtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IHRyYW5zYWN0aW9uU2l6ZTogbnVtYmVyO1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgcm93c1Blckluc2VydDogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBuYW1lOiBTdHJpbmcsIHB1YmxpYyBvcHRpb25zOiBEYXRhYmFzZU1pZ3JhdGlvbk9wdGlvbnMgPSB7dHJhbnNhY3Rpb25TaXplOiA1MCwgcm93c1Blckluc2VydDogNTB9KSB7XG4gICAgdGhpcy50cmFuc2FjdGlvblNpemUgPSBvcHRpb25zLnRyYW5zYWN0aW9uU2l6ZSB8fCA1MDtcbiAgICB0aGlzLnJvd3NQZXJJbnNlcnQgPSBvcHRpb25zLnJvd3NQZXJJbnNlcnQgfHwgNTA7XG4gIH1cblxuICAvKipcbiAgICogVGhpcyBtZXRob2QgZGV0ZXJtaW5lcyB3aGV0aGVyIHRoaXMgc2NyaXB0IGhhcyBhbnkgd29yayB0byBiZSBkb25lLlxuICAgKi9cbiAgcHVibGljIGFic3RyYWN0IGFzeW5jIGhhc1dvcmsoKTogUHJvbWlzZTxib29sZWFuPjtcblxuICAvKipcbiAgICogQ3JlYXRlcyBhIFF1ZXJ5QnVpbGRlciBmb3IgdGhlIHJlY29ycyB0aGF0IHNob3VsZCBiZSBtaWdyYXRlZCxcbiAgICogd2lsbCBvbmx5IGJlIGNhbGxlZCBpcyBgYGBoYXNXb3JrKClgYGAgaGF2ZSByZXR1cm5lZCBgYGB0cnVlYGBgLlxuICAgKi9cbiAgcHVibGljIGFic3RyYWN0IG1hcDxUID0gYW55PigpOiBTZWxlY3RRdWVyeUJ1aWxkZXI8VD47XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYW4gYXN5bmNJdGVyYXRvciBmb3IgdGhlIGBgYG1hcCgpYGBgIFF1ZXJ5QnVpbGRlciBmb3IgcGVyZm9ybWluZyBhIHBhZ2luYXRlZCBxdWVyeVxuICAgKiBvdmVyIHRoZSByZWNvcmRzXG4gICAqIFxuICAgKiBAcGFyYW0gY291bnQgVGhlIG51bWJlciBvZiByZWNvcmRzIHRvIGJlIGl0ZXJhdGVkIG92ZXJcbiAgICogQHBhcmFtIHBhZ2VTaXplIFRoZSBudW1iZXIgb2YgcmVjb3JkcyB0byBiZSB0YWtlbiBvbiBlYWNoIGl0ZXJhdGlvblxuICAgKi9cbiAgcHJpdmF0ZSBhc3luYyAqcGFnaW5hdGVkTWFwPFQgPSBhbnk+KGNvdW50LCBwYWdlU2l6ZSk6IEFzeW5jSXRlcmFibGVJdGVyYXRvcjxhbnk+IHtcbiAgICBsZXQgaW5kZXggPSAwO1xuIFxuICAgIHdoaWxlIChpbmRleCA8IGNvdW50KSB7XG4gICAgICB5aWVsZCB0aGlzLm1hcDxUPigpLnRha2UocGFnZVNpemUpLnNraXAocGFnZVNpemUpLmdldE1hbnkoKTtcbiAgICAgIGluZGV4ICs9IHBhZ2VTaXplO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGVzIHRoZSBtaWdyYXRpb25zIG9mIHRoZSBtYXBwZWQgZG9jdW1lbnRzLlxuICAgKiBcbiAgICogQHBhcmFtIGRhdGEgVGhlIGRhdGEgbWFwcGVkIGJ5IHRoZSBtaWdyYXRpb24gc3RlcFxuICAgKi9cbiAgcHVibGljIGFic3RyYWN0IGFzeW5jIG1pZ3JhdGUoZGF0YTogYW55W10pOiBQcm9taXNlPHZvaWQ+O1xuXG4gIC8qKlxuICAgKiBIYW5kbGVzIHRoZSBtaWdyYXRpb25zIG9mIHRoZSBtYXBwZWQgZG9jdW1lbnRzLlxuICAgKiBcbiAgICogQHBhcmFtIGRhdGEgVGhlIGRhdGEgbWFwcGVkIGJ5IHRoZSBtaWdyYXRpb24gc3RlcFxuICAgKi9cbiAgcHVibGljIGFic3RyYWN0IGFzeW5jIHJldmVydChlcnJvcjogRXJyb3IsIGRhdGE6IGFueVtdKTogUHJvbWlzZTx2b2lkPjtcblxuICAvKipcbiAgICogUnVucyB0aGUgbWlncmF0aW9uIHN0ZXAgc2FmZWx5LCByZXZlcnRpbmcgdGhlIGNoYW5nZXMgaW4gdGhlIGNhc2Ugb2YgZXJyb3JzLlxuICAgKiBcbiAgICovXG4gIHB1YmxpYyBhc3luYyBydW4oKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGNvdW50ID0gYXdhaXQgdGhpcy5tYXAoKS5nZXRDb3VudCgpO1xuXG4gICAgICBmb3IgYXdhaXQgKGNvbnN0IGRhdGFTbGljZSBvZiB0aGlzLnBhZ2luYXRlZE1hcChjb3VudCwgdGhpcy5yb3dzUGVySW5zZXJ0KSkge1xuICAgICAgICBpZiAoZGF0YVNsaWNlICYmIGRhdGFTbGljZS5sZW5ndGgpIHtcblxuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLm1pZ3JhdGUoZGF0YVNsaWNlKTtcblxuICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAvLyBUT0RPOiBIYW5kbGUgdGhpcyBjYXNlIHByb3Blcmx5XG4gICAgICAgICAgICBhd2FpdCB0aGlzLnJldmVydChlcnJvciwgZGF0YVNsaWNlKTtcbiAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAvLyBUT0RPOiBIYW5kbGUgbWFwcGluZyBlcnJvcnMgcHJvcGVybHlcbiAgICAgIHRocm93IGVycm9yO1xuICAgIH1cbiAgfVxufVxuIl19