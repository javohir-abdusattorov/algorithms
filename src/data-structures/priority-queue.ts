export default class PriorityQueue<T> {

	private heap: T[] = []
	private readonly comparator: ( a: number, b: number ) => Priority

	constructor(
		values: T[],
		comparator: ( a, b ) => number
	) {
		this.comparator = ( a: number, b: number ) => {
			const value = comparator(this.heap[a], this.heap[b])
			if (Number.isNaN(value)) {
				throw new Error(`Comparator should evaluate to a number. Got ${ value } when comparing ${ this.heap[a] } with ${ this.heap[b] }`)
			}

			return new Priority(value)
		}

		this.heapify(values)
	}

	public length(): number {
		return this.heap.length
	}

	public add( value: T ): void {
		this.heap.push(value)
		this.bubbleUp()
	}

	public peek(): T {
		return this.heap[0]
	}

	public remove( item: T ): void {
		if (!this.length()) return null

		const index = this.searchItemFromBottom(item)
		this.removeAt(index)
	}

	public removeAt( index: number ): T {
		if (!this.length()) return null

		this.swap(index, this.length() - 1)

		const value = this.heap.pop()
		this.bubbleDown(index)

		return value
	}


	private heapify( values: T[] ): void {
		if (!values.length) return

		this.heap = values
		const nonLeafNodes = Math.floor(values.length / 2 - 1)

		for (let i = nonLeafNodes; i >= 0; i--) {
			this.bubbleDown(i)
		}
	}

	private bubbleUp(): void {
		let iterator = this.length() - 1

		while (true) {
			const parentIndex = this.getParentIndex(iterator)
			const doesHaveParent = parentIndex >= 0
			if (!doesHaveParent) break

			const parentHasHigherPriority = this.comparator(parentIndex, iterator).isHigh()
			if (parentHasHigherPriority) break

			this.swap(parentIndex, iterator)
			iterator = parentIndex
		}
	}

	private bubbleDown( index: number ): void {
		let iterator = index

		while (true) {
			const doesHaveChildren = this.getLeftChildIndex(iterator) < this.length()
			if (!doesHaveChildren) break

			const highestPriorityChild = this.getHigherPriorityChild(iterator)
			const doesHaveHigherPriorityThanChildren = this.comparator(iterator, highestPriorityChild).isHigh()
			if (doesHaveHigherPriorityThanChildren) break

			const next = highestPriorityChild
			this.swap(iterator, next)
			iterator = next
		}
	}

	private swap( a: number, b: number ): void {
		const x = this.heap[a]
		const y = this.heap[b]

		this.heap[a] = y
		this.heap[b] = x
	}

	private getParentIndex( index: number ): number {
		return Math.ceil((index / 2) - 1)
	}

	private getLeftChildIndex( index: number ): number {
		return (2 * index) + 1
	}

	private getRightChildIndex( index: number ): number {
		return (2 * index) + 2
	}

	private getHigherPriorityChild( index: number ): number {
		const rightChild = this.getRightChildIndex(index)
		const leftChild = this.getLeftChildIndex(index)

		const doesHaveRightChild = rightChild < this.length()
		if (!doesHaveRightChild) return leftChild

		const isRightChildHighPriority = this.comparator(rightChild, leftChild).isHigh()
		if (isRightChildHighPriority) return rightChild

		return leftChild
	}

	private searchItemFromBottom( item: T ): number {
		for (let index = this.length() - 1; index >= 0; index--) {
			if (this.heap[index] === item) return index
		}

		throw new Error(`Cannot find item in heap: ${ item }`)
	}
}

class Priority {
	constructor(
		private value: number
	) {
	}

	isHigh(): boolean {
		return this.value > 0
	}
}