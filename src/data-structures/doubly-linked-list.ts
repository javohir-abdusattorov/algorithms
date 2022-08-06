export default class DoublyLinkedList<T> {

	private size: number = 0
	private head: Node<T> = null
	private tail: Node<T> = null


	public length(): number {
		return this.size
	}

	public isEmpty(): boolean {
		return this.length() === 0
	}

	public addLast( item: T ): void {
		if (this.isEmpty()) {
			const node = new Node<T>(item, null, null)
			this.head = node
			this.tail = node
		}
		else {
			this.tail.next = new Node<T>(item, this.tail, null)
			this.tail = this.tail.next
		}

		this.size++
	}

	public addFirst( item: T ): void {
		if (this.isEmpty()) {
			const node = new Node<T>(item, null, null)
			this.head = node
			this.tail = node
		}
		else {
			this.head.prev = new Node<T>(item, null, this.head)
			this.head = this.head.prev
		}
		this.size++
	}

	public peekFirst(): T {
		if (this.isEmpty()) return null
		return this.head.data
	}

	public peekLast(): T {
		if (this.isEmpty()) return null
		return this.tail.data
	}

	public removeFirst(): T {
		if (this.isEmpty()) return null

		const removedData = this.head.data

		// Change head to next node
		this.head = this.head.next
		this.size--

		// If the list is empty, clear tail
		if (this.isEmpty()) this.tail = null

		// Remove head.prev to clear memory
		else this.head.prev = null

		return removedData
	}

	public removeLast(): T {
		if (this.isEmpty()) return null

		const removedData = this.tail.data

		// Change tail to prev node
		this.tail = this.tail.prev
		this.size--

		// If the list is empty, clear head
		if (this.isEmpty()) this.head = null

		// Remove head.prev to clear memory
		else this.tail.next = null

		return removedData
	}

	public removeAt( index: number ): T {
		const isInvalidIndex = Boolean(index < 0 || index >= this.size)
		if (isInvalidIndex) return null

		let i = 0
		let traverse: Node<T> = null

		const isCloseToHead = Boolean(index < (this.size / 2))
		if (isCloseToHead) {
			// Search: start -> last
			for (i = 0, traverse = this.head; i !== index; i++) {
				traverse = traverse.next
			}
		}
		else {
			// Search: last -> start
			for (i = this.size - 1, traverse = this.tail; i !== index; i--) {
				traverse = traverse.prev
			}
		}

		console.log(`Found node to remove:`, traverse)

		return this.remove(traverse)
	}

	private remove( node: Node<T> ): T {
		// If node is first or last, use predefined methods
		if (node.isFirst()) return this.removeFirst()
		if (node.isLast()) return this.removeLast()

		// Change node's neighbours pointers, to basically remove node from connections
		node.next.prev = node.prev
		node.prev.next = node.next

		const removedData = node.data

		// Clean memory
		node.data = null
		node.prev = null
		node.next = null
		node = null

		this.size--

		return removedData
	}

	public print(): string {
		let array: T[] = []
		let traverse: Node<T> = this.head

		while (traverse !== null) {
			array.push(traverse.data)
			traverse = traverse.next
		}

		return `[ ${array.join(", ")} ]`
	}
}

class Node<T> {
	constructor(
		public data: T,
		public prev: Node<T>,
		public next: Node<T>
	) {
	}

	public isFirst(): boolean {
		return Boolean(this.prev === null)
	}

	public isLast(): boolean {
		return Boolean(this.next === null)
	}
}