export class Queue<T> {
  private _queue: T[] = [];
  private _timePerItem: number;

  constructor(timePerItem: number) {
    this._timePerItem = timePerItem;
  }

  public enqueue(item: T) {
    this._queue.unshift(item);
  }

  public dequeue(): T | undefined {
    return this._queue.pop();
  }

  public get size() {
    return this._queue.length;
  }

  public getCurrentWaitTime(): number {
    return this._queue.length * this._timePerItem;
  }

  public get queue() {
    return this._queue;
  }
}
