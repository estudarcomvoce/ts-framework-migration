import Server from 'ts-framework';
import { Job, JobOptions } from 'ts-framework-common';
import { SqlMigration, BaseDatabaseMigration } from '../migration';
export interface DatabaseMigrationJobOptions extends JobOptions {
    verbose?: boolean;
    exitOnError?: boolean;
    migration?: {
        auto: boolean;
        pipeline: (BaseDatabaseMigration | SqlMigration)[];
    };
}
export default class DatabaseMigrationJob extends Job {
    options: DatabaseMigrationJobOptions;
    constructor(options?: DatabaseMigrationJobOptions);
    /**
     * Runs the database migrations.
     *
     * @param server The main server instance.
     */
    run(server: Server): Promise<void>;
}
