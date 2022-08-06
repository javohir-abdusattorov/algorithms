export default class Queue<T> {

	private size: number = 0
	private items: T[] = []


	public length(): number {
		return this.size
	}

	public isEmpty(): boolean {
		return this.length() === 0
	}

	public peek(): T {
		if (this.isEmpty()) return null

		return this.items[0]
	}

	public enqueue( item: T ): void {
		this.items.push(item)
	}

	public dequeue(): T {
		return this.items.shift()
	}
}