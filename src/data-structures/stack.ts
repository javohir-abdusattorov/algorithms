export default class Stack<T> {

	private size: number = 0
	private items: T[] = []
	private head: T = null


	public length(): number {
		return this.size
	}

	public isEmpty(): boolean {
		return this.length() === 0
	}

	public push( item: T ): void {
		this.items.push(item)
		this.size++
		this.head = item
	}

	public pop(): T {
		const item = this.items.pop()
		this.size--
		this.head = this.items[this.size - 1]

		return item || null
	}

	public lookup( skip: number = 0 ): T {
		return this.items[this.size - 1 - skip]
	}
}