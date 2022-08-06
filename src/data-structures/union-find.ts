export default class UnionFind {

	private length: number = null
	private components: number = null
	private sizes: number[] = []
	private indexes: number[] = []

	constructor( size: number ) {
		if (size <= 0) throw new Error(`Size <= 0 is not allowed`)

		this.length = size
		this.components = size

		for (let i = 0; i < size; i++) {
			this.indexes[i] = i
			this.sizes[i] = 1
		}
	}


	public find( number: number ): number {
		let parentOfNumber = this.indexes[number]
		let isNumberRoot = number === parentOfNumber

		if (!isNumberRoot) {
			// If number itself is not root, find root of number till parent is root
			parentOfNumber = this.find(parentOfNumber)

			// Set the parent of {number} to root of it, to decrease next check timing - path compression
			this.indexes[number] = parentOfNumber
		}

		return parentOfNumber
	}

	public connected( a: number, b: number ): boolean {
		const rootOfA = this.find(a)
		const rootOfB = this.find(b)
		const isSameRoot = rootOfA === rootOfB

		return isSameRoot
	}

	public componentSize( number: number ): number {
		const rootOfNumber = this.find(number)
		const size = this.sizes[rootOfNumber]

		return size
	}

	public size(): number {
		return this.length
	}

	public allComponentsSize(): number {
		return this.components
	}

	public unify( a: number, b: number ): void {
		const rootOfA = this.find(a)
		const rootOfB = this.find(b)

		// If they are in the same component, do not unify them
		if (rootOfA === rootOfB) return

		const sizeOfA = this.sizes[rootOfA]
		const sizeOfB = this.sizes[rootOfB]

		// Merge smaller component into larger one
		if (sizeOfA < sizeOfB) {
			this.indexes[rootOfA] = rootOfB

			// Balance sizes
			this.sizes[rootOfB] += sizeOfA
			this.sizes[rootOfA] = 0
		}
		else {
			this.indexes[rootOfB] = rootOfA

			// Balance sizes
			this.sizes[rootOfA] += sizeOfB
			this.sizes[rootOfB] = 0
		}

		this.components--
	}
}