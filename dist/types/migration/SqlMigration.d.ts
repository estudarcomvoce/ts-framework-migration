import { SelectQueryBuilder } from 'typeorm';
export interface SqlMigrationOptions {
    transactionSize?: number;
    rowsPerInsert?: number;
}
export default abstract class SqlMigration {
    name: String;
    options: SqlMigrationOptions;
    protected postMigrationActions: (() => Promise<void>)[];
    constructor(name: String, options?: SqlMigrationOptions);
    /**
     * This method determines whether this script has any work to be done.
     */
    abstract hasWork(): Promise<number>;
    /**
     * Creates a QueryBuilder for the recors that should be migrated,
     * will only be called is ```hasWork()``` have returned ```true```.
     */
    abstract map<T = any>(): SelectQueryBuilder<T>;
    /**
     * Creates an asyncIterator for the ```map()``` QueryBuilder for performing a paginated query
     * over the records
     *
     * @param count The number of records to be iterated over
     * @param pageSize The number of records to be taken on each iteration
     */
    private paginatedMap<T>(count, pageSize);
    /**
     * Handles the migrations of the mapped documents.
     *
     * @param data The data mapped by the migration step
     */
    abstract migrate(data: any[]): Promise<void>;
    /**
     * Handles the migrations of the mapped documents.
     *
     * @param data The data mapped by the migration step
     */
    abstract revert(error: Error, data: any[]): Promise<void>;
    /**
     * Runs the migration step safely, reverting the changes in the case of errors.
     *
     */
    run(): Promise<void>;
}
