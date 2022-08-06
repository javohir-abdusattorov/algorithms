export default class BinarySearchTree<T> {

	private root: Node<T> = null
	private size: number = 0
	private readonly comparator: ( a: T, b: T ) => Priority

	constructor(
		values: T[],
		comparator: ( a, b ) => number
	) {
		this.comparator = ( a: T, b: T ) => {
			const value = comparator(a, a)
			if (Number.isNaN(value)) {
				throw new Error(`Comparator should evaluate to a number. Got ${ value } when comparing ${ a } with ${ b }`)
			}

			return new Priority(value)
		}
	}

	// Basic information methods
	public getSize(): number {
		return this.size
	}

	public isEmpty(): boolean {
		return this.getSize() === 0
	}


	// Search by value
	public contains( element: T ): boolean {
		return this.containsRecursive(this.root, element)
	}

	private containsRecursive( node: Node<T>, element: T ): boolean {

		// If reach to bottom, value not found
		if (node === null) return false

		const diff = this.comparator(element, node.data)

		// If element is smaller than current value, go LEFT
		if (diff.isLow()) return this.containsRecursive(node.left, element)

		// If element is greater than current value, go RIGHT
		else if (diff.isHigh()) return this.containsRecursive(node.right, element)

		// If element is equal, FOUND value
		else if (diff.isEqual()) return true
	}


	// Add new value. Returns true if successfully added. O(n)
	public add( element: T ): boolean {

		// Check if element already exists
		if (this.contains(element)) {
			return false
		}

		this.root = this.addRecursive(this.root, element)
		this.size++
		return true
	}

	private addRecursive( node: Node<T>, element: T ): Node<T> {
		const isLeafNode = Boolean(node	=== null)
		if (isLeafNode) {
			node = new Node<T>(element, null, null)
			return node
		}

		// Pick subtree to insert
		const diff = this.comparator(element, node.data)
		if (diff.isLow()) {
			node.left = this.addRecursive(node.left, element)
		} else {
			node.right = this.addRecursive(node.right, element)
		}

		return node
	}


	// Remove value. Returns true if successfully removed. O(n)
	public remove( element: T ): boolean {
		if (!this.contains(element)) return false

		this.root = this.removeRecursive(this.root, element)
		this.size--
		return true
	}

	private removeRecursive( node: Node<T>, element: T ): Node<T> {

		if (node === null) return null

		const diff = this.comparator(node.data, element)

		// If value we are looking for is smaller than current, dig left
		if (diff.isLow()) {
			node.left = this.removeRecursive(node.left, element)
		}

		// If value we are looking for is greater than current, dig left
		else if (diff.isHigh()) {
			node.right = this.removeRecursive(node.right, element)
		}

		// Found value
		else {

			// [NOTE] When removing node with only 1 child: right or left - we just swap the node with only child

			// If there is no left child, then just swap with right child
			if (node.left === null) {
				return node.right
			}

			// If there is no right child, then just swap with left child
			if (node.right === null) {
				return node.left
			}

			// [NOTE] When removing node who has right and left child, successor of the node can either be:
			// 1) largest value in left subtree
			// 2) smallest value in right subtree

			// We going on 1-way: finding largest value in left subtree
			const temp = this.findMaximum(node.left)

			// Swap the data
			node.data = temp.data

			// Remove rightmost node we found, to prevent duplicate value
			node.left = this.removeRecursive(node.left, temp.data)
		}

		return node
	}


	// Helper methods to find leftmost and rightmost nodes
	private findMinimum( node: Node<T> ): Node<T> {
		while (node.left !== null) node = node.left
		return node
	}

	private findMaximum( node: Node<T> ): Node<T> {
		while (node.right !== null) node = node.right
		return node
	}


	// Node height calculators
	public height(): number {
		return this.nodeHeight(this.root)
	}

	public nodeHeight( node: Node<T> ): number {
		if (node === null) return 0

		const leftHeight = this.nodeHeight(node.left)
		const rightHeight = this.nodeHeight(node.right)
		const max = Math.max(leftHeight, rightHeight)

		return max + 1
	}
}


class Node<T> {
	constructor(
		public data: T,
		public left: Node<T>,
		public right: Node<T>
	) {}
}

class Priority {
	constructor(
		private value: number
	) {}

	isLow(): boolean {
		return this.value < 0
	}

	isHigh(): boolean {
		return this.value > 0
	}

	isEqual(): boolean {
		return this.value === 0
	}
}