import async from 'async';
import { JobData } from '../webhook-sender';
import { Queue, Worker } from 'bullmq'
import { QueueInterface } from './queue-interface';
import Redis, { Cluster, ClusterOptions, RedisOptions } from 'ioredis';
import { Server } from '../server';

interface QueueWithWorker {
    queue: Queue;
    worker: Worker;
}

export class RedisQueueDriver implements QueueInterface {
    /**
     * The queues with workers list.
     */
    protected queueWithWorker: Map<string, QueueWithWorker> = new Map();

    /**
     * Initialize the Redis Queue Driver.
     */
    constructor(protected server: Server) {
        //
    }

    /**
     * Add a new event with data to queue.
     */
    addToQueue(queueName: string, data: JobData): Promise<void> {
        return new Promise(resolve => {
            let queueWithWorker = this.queueWithWorker.get(queueName);

            if (!queueWithWorker) {
                return resolve();
            }

            queueWithWorker.queue.add('webhook', data).then(() => resolve());
        });
    }

    /**
     * Register the code to run when handing the queue.
     */
    processQueue(queueName: string, callback: CallableFunction): Promise<void> {
        return new Promise(resolve => {
            if (!this.queueWithWorker.has(queueName)) {
                let redisOptions: RedisOptions|ClusterOptions = {
                    maxRetriesPerRequest: null,
                    enableReadyCheck: false,
                    ...this.server.options.database.redis,
                    ...this.server.options.queue.redis.redisOptions,
                    // We set the key prefix on the queue, worker and scheduler instead of on the connection itself
                    keyPrefix: undefined,
                };

                const connection = this.server.options.queue.redis.clusterMode
                    ? new Cluster(this.server.options.database.redis.clusterNodes, { scaleReads: 'slave', ...redisOptions })
                    : new Redis(redisOptions);

                const queueSharedOptions = {
                    // We remove a trailing `:` from the prefix because BullMQ adds that already
                    prefix: this.server.options.database.redis.keyPrefix.replace(/:$/, ''),
                    connection,
                };

              this.queueWithWorker.set(queueName, {
                queue: new Queue(queueName, {
                    ...queueSharedOptions,
                    defaultJobOptions: {
                        attempts: 6,
                        backoff: {
                            type: 'exponential',
                            delay: 1000,
                        },
                        removeOnComplete: true,
                        removeOnFail: true,
                    },
                }),
                worker: new Worker(queueName, callback as any, {
                    ...queueSharedOptions,
                    concurrency: this.server.options.queue.redis.concurrency,
                }),
                    // No need for Queue Scheduler anymore. edit by: ehsanR91@github
                });
            }

            resolve();
        });
    }

    /**
     * Clear the queues for a graceful shutdown.
     */
  disconnect(): Promise<void> {
    return new Promise((resolve, reject) => {
        async.each([...this.queueWithWorker], ([queueName, { queue, worker }]: [string, QueueWithWorker], callback) => {
            worker.close().then(() => {
                // Since there's no scheduler, we directly callback after closing the worker
                callback();
            }).catch(callback);
        }, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

}
