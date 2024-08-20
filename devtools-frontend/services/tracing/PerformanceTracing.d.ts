import * as SDK from '../../core/sdk/sdk.js';
export declare class PerformanceTracing implements SDK.TracingManager.TracingManagerClient {
    #private;
    constructor(target: SDK.Target.Target, delegate: Delegate);
    start(): Promise<void>;
    stop(): Promise<void>;
    getTraceEvents(): Object[];
    traceEventsCollected(events: Object[]): void;
    tracingBufferUsage(usage: number): void;
    eventsRetrievalProgress(progress: number): void;
    tracingComplete(): void;
}
interface Delegate {
    tracingBufferUsage(usage: number): void;
    eventsRetrievalProgress(progress: number): void;
    tracingComplete(events: Object[]): void;
}
export declare class RawTraceEvents {
    private events;
    constructor(events: Object[]);
    getEvents(): Object[];
}
export {};
