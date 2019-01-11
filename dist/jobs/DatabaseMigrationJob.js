"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const ts_framework_common_1 = require("ts-framework-common");
const AsyncUtil_1 = require("../util/AsyncUtil");
const Logger = ts_framework_common_1.Logger.getInstance();
class DatabaseMigrationJob extends ts_framework_common_1.Job {
    constructor(options = {}) {
        super({
            name: 'DatabaseMigrationJob',
        });
        this.options = options;
    }
    /**
     * Runs the database migrations.
     *
     * @param server The main server instance.
     */
    run(server) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.options.migration && server.logger) {
                server.logger.warn('MainDatabase: No migration pipeline specified');
            }
            else if (this.options.migration) {
                const pipeline = this.options.migration.pipeline;
                const hasWorkQueue = yield Promise.all(pipeline.map(step => {
                    return step.hasWork().then(count => ({ name: step.name, count }));
                }));
                const hasWork = hasWorkQueue.reduce((tot, next) => tot + next.count, 0);
                const details = hasWorkQueue.reduce((result, next) => (Object.assign({}, result, { [next.name]: next.count })), {});
                if (hasWork && this.options.migration.auto) {
                    if (this.options.verbose && server.logger) {
                        server.logger.debug('MainDatabase: Starting migration pipeline', details);
                        Logger.info('\n-------------------------------------------------------------------------------------------------\n' +
                            '                                                               \n' +
                            '              NOTICE: The database will be migrated            \n' +
                            '                                                               \n' +
                            hasWorkQueue.map(work => `              ${work.name}:\t\t${work.count} document(s)\n`).join('') +
                            '                                                               \n' +
                            '\n-------------------------------------------------------------------------------------------------\n');
                    }
                    else if (server.logger) {
                        server.logger.debug('MainDatabase: Starting migration pipeline', details);
                    }
                    // Run the migrations in series for expliciting defining the order of the execution
                    // This may be important because migrations may depend on one another
                    yield AsyncUtil_1.default.mapSeries(pipeline, (step) => __awaiter(this, void 0, void 0, function* () { return step.run(); }));
                }
                else if (hasWork) {
                    if (this.options.exitOnError) {
                        server.logger.error('Database needs migration', details);
                        return process.exit(1);
                    }
                    else {
                        throw new Error('Database needs migration');
                    }
                }
                else {
                    Logger.silly(`Database needs no migration, all models are updated`);
                }
            }
        });
    }
}
exports.default = DatabaseMigrationJob;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGF0YWJhc2VNaWdyYXRpb25Kb2IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvam9icy9EYXRhYmFzZU1pZ3JhdGlvbkpvYi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQ0EsNkRBQTRFO0FBQzVFLGlEQUEwQztBQUcxQyxNQUFNLE1BQU0sR0FBRyw0QkFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDO0FBV3hDLDBCQUEwQyxTQUFRLHlCQUFHO0lBQ25ELFlBQW1CLFVBQXVDLEVBQUU7UUFDMUQsS0FBSyxDQUFDO1lBQ0osSUFBSSxFQUFFLHNCQUFzQjtTQUM3QixDQUFDLENBQUM7UUFIYyxZQUFPLEdBQVAsT0FBTyxDQUFrQztJQUk1RCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNVLEdBQUcsQ0FBQyxNQUFjOztZQUM3QixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUM3QyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQywrQ0FBK0MsQ0FBQyxDQUFDO1lBQ3RFLENBQUM7WUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUNsQyxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUM7Z0JBRWpELE1BQU0sWUFBWSxHQUFHLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFO29CQUN6RCxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ3BFLENBQUMsQ0FBQyxDQUFVLENBQUM7Z0JBRWIsTUFBTSxPQUFPLEdBQUcsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUN4RSxNQUFNLE9BQU8sR0FBRyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsbUJBQU0sTUFBTSxJQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLElBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztnQkFFcEcsRUFBRSxDQUFDLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7b0JBQzNDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO3dCQUMxQyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQywyQ0FBMkMsRUFBRSxPQUFPLENBQUMsQ0FBQzt3QkFFMUUsTUFBTSxDQUFDLElBQUksQ0FDVCx1R0FBdUc7NEJBQ3ZHLG1FQUFtRTs0QkFDbkUsbUVBQW1FOzRCQUNuRSxtRUFBbUU7NEJBQ25FLFlBQVksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxpQkFBaUIsSUFBSSxDQUFDLElBQUksUUFBUSxJQUFJLENBQUMsS0FBSyxnQkFBZ0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7NEJBQy9GLG1FQUFtRTs0QkFDbkUsdUdBQXVHLENBQUMsQ0FBQztvQkFFN0csQ0FBQztvQkFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7d0JBQ3pCLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLDJDQUEyQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO29CQUM1RSxDQUFDO29CQUVELG1GQUFtRjtvQkFDbkYscUVBQXFFO29CQUNyRSxNQUFNLG1CQUFTLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxDQUFPLElBQTRDLEVBQUUsRUFBRSxnREFBQyxNQUFNLENBQU4sSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFBLEdBQUEsQ0FBQyxDQUFDO2dCQUMxRyxDQUFDO2dCQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO29CQUNuQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7d0JBQzdCLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLDBCQUEwQixFQUFFLE9BQU8sQ0FBQyxDQUFDO3dCQUN6RCxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDekIsQ0FBQztvQkFBQyxJQUFJLENBQUMsQ0FBQzt3QkFDTixNQUFNLElBQUksS0FBSyxDQUFDLDBCQUEwQixDQUFDLENBQUM7b0JBQzlDLENBQUM7Z0JBQ0gsQ0FBQztnQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFDTixNQUFNLENBQUMsS0FBSyxDQUFDLHFEQUFxRCxDQUFDLENBQUM7Z0JBQ3RFLENBQUM7WUFDSCxDQUFDO1FBQ0gsQ0FBQztLQUFBO0NBQ0Y7QUF6REQsdUNBeURDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFNlcnZlciBmcm9tICd0cy1mcmFtZXdvcmsnO1xuaW1wb3J0IHsgTG9nZ2VyIGFzIEJhc2VMb2dnZXIsIEpvYiwgSm9iT3B0aW9ucyB9IGZyb20gJ3RzLWZyYW1ld29yay1jb21tb24nO1xuaW1wb3J0IEFzeW5jVXRpbCBmcm9tICcuLi91dGlsL0FzeW5jVXRpbCc7XG5pbXBvcnQgeyBTcWxNaWdyYXRpb24sIEJhc2VEYXRhYmFzZU1pZ3JhdGlvbiB9IGZyb20gJy4uL21pZ3JhdGlvbic7XG5cbmNvbnN0IExvZ2dlciA9IEJhc2VMb2dnZXIuZ2V0SW5zdGFuY2UoKTtcblxuZXhwb3J0IGludGVyZmFjZSBEYXRhYmFzZU1pZ3JhdGlvbkpvYk9wdGlvbnMgZXh0ZW5kcyBKb2JPcHRpb25zIHtcbiAgdmVyYm9zZT86IGJvb2xlYW4sXG4gIGV4aXRPbkVycm9yPzogYm9vbGVhbjtcbiAgbWlncmF0aW9uPzoge1xuICAgIGF1dG86IGJvb2xlYW4sXG4gICAgcGlwZWxpbmU6IChCYXNlRGF0YWJhc2VNaWdyYXRpb24gfCBTcWxNaWdyYXRpb24pW10sXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGF0YWJhc2VNaWdyYXRpb25Kb2IgZXh0ZW5kcyBKb2Ige1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgb3B0aW9uczogRGF0YWJhc2VNaWdyYXRpb25Kb2JPcHRpb25zID0ge30pIHtcbiAgICBzdXBlcih7XG4gICAgICBuYW1lOiAnRGF0YWJhc2VNaWdyYXRpb25Kb2InLFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJ1bnMgdGhlIGRhdGFiYXNlIG1pZ3JhdGlvbnMuXG4gICAqIFxuICAgKiBAcGFyYW0gc2VydmVyIFRoZSBtYWluIHNlcnZlciBpbnN0YW5jZS5cbiAgICovXG4gIHB1YmxpYyBhc3luYyBydW4oc2VydmVyOiBTZXJ2ZXIpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBpZiAoIXRoaXMub3B0aW9ucy5taWdyYXRpb24gJiYgc2VydmVyLmxvZ2dlcikge1xuICAgICAgc2VydmVyLmxvZ2dlci53YXJuKCdNYWluRGF0YWJhc2U6IE5vIG1pZ3JhdGlvbiBwaXBlbGluZSBzcGVjaWZpZWQnKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMub3B0aW9ucy5taWdyYXRpb24pIHtcbiAgICAgIGNvbnN0IHBpcGVsaW5lID0gdGhpcy5vcHRpb25zLm1pZ3JhdGlvbi5waXBlbGluZTtcblxuICAgICAgY29uc3QgaGFzV29ya1F1ZXVlID0gYXdhaXQgUHJvbWlzZS5hbGwocGlwZWxpbmUubWFwKHN0ZXAgPT4ge1xuICAgICAgICByZXR1cm4gc3RlcC5oYXNXb3JrKCkudGhlbihjb3VudCA9PiAoeyBuYW1lOiBzdGVwLm5hbWUsIGNvdW50IH0pKTtcbiAgICAgIH0pKSBhcyBhbnlbXTtcblxuICAgICAgY29uc3QgaGFzV29yayA9IGhhc1dvcmtRdWV1ZS5yZWR1Y2UoKHRvdCwgbmV4dCkgPT4gdG90ICsgbmV4dC5jb3VudCwgMCk7XG4gICAgICBjb25zdCBkZXRhaWxzID0gaGFzV29ya1F1ZXVlLnJlZHVjZSgocmVzdWx0LCBuZXh0KSA9PiAoeyAuLi5yZXN1bHQsIFtuZXh0Lm5hbWVdOiBuZXh0LmNvdW50IH0pLCB7fSk7XG5cbiAgICAgIGlmIChoYXNXb3JrICYmIHRoaXMub3B0aW9ucy5taWdyYXRpb24uYXV0bykge1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zLnZlcmJvc2UgJiYgc2VydmVyLmxvZ2dlcikge1xuICAgICAgICAgIHNlcnZlci5sb2dnZXIuZGVidWcoJ01haW5EYXRhYmFzZTogU3RhcnRpbmcgbWlncmF0aW9uIHBpcGVsaW5lJywgZGV0YWlscyk7XG5cbiAgICAgICAgICBMb2dnZXIuaW5mbyhcbiAgICAgICAgICAgICdcXG4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXFxuJyArXG4gICAgICAgICAgICAnICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuJyArXG4gICAgICAgICAgICAnICAgICAgICAgICAgICBOT1RJQ0U6IFRoZSBkYXRhYmFzZSB3aWxsIGJlIG1pZ3JhdGVkICAgICAgICAgICAgXFxuJyArXG4gICAgICAgICAgICAnICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuJyArXG4gICAgICAgICAgICBoYXNXb3JrUXVldWUubWFwKHdvcmsgPT4gYCAgICAgICAgICAgICAgJHt3b3JrLm5hbWV9OlxcdFxcdCR7d29yay5jb3VudH0gZG9jdW1lbnQocylcXG5gKS5qb2luKCcnKSArXG4gICAgICAgICAgICAnICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXFxuJyArXG4gICAgICAgICAgICAnXFxuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxcbicpO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoc2VydmVyLmxvZ2dlcikge1xuICAgICAgICAgIHNlcnZlci5sb2dnZXIuZGVidWcoJ01haW5EYXRhYmFzZTogU3RhcnRpbmcgbWlncmF0aW9uIHBpcGVsaW5lJywgZGV0YWlscyk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBSdW4gdGhlIG1pZ3JhdGlvbnMgaW4gc2VyaWVzIGZvciBleHBsaWNpdGluZyBkZWZpbmluZyB0aGUgb3JkZXIgb2YgdGhlIGV4ZWN1dGlvblxuICAgICAgICAvLyBUaGlzIG1heSBiZSBpbXBvcnRhbnQgYmVjYXVzZSBtaWdyYXRpb25zIG1heSBkZXBlbmQgb24gb25lIGFub3RoZXJcbiAgICAgICAgYXdhaXQgQXN5bmNVdGlsLm1hcFNlcmllcyhwaXBlbGluZSwgYXN5bmMgKHN0ZXA6IChCYXNlRGF0YWJhc2VNaWdyYXRpb24gfCBTcWxNaWdyYXRpb24pKSA9PiBzdGVwLnJ1bigpKTtcbiAgICAgIH0gZWxzZSBpZiAoaGFzV29yaykge1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zLmV4aXRPbkVycm9yKSB7XG4gICAgICAgICAgc2VydmVyLmxvZ2dlci5lcnJvcignRGF0YWJhc2UgbmVlZHMgbWlncmF0aW9uJywgZGV0YWlscyk7XG4gICAgICAgICAgcmV0dXJuIHByb2Nlc3MuZXhpdCgxKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0RhdGFiYXNlIG5lZWRzIG1pZ3JhdGlvbicpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBMb2dnZXIuc2lsbHkoYERhdGFiYXNlIG5lZWRzIG5vIG1pZ3JhdGlvbiwgYWxsIG1vZGVscyBhcmUgdXBkYXRlZGApO1xuICAgICAgfVxuICAgIH1cbiAgfVxufSJdfQ==