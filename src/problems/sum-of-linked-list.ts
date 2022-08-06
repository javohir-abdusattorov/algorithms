/*
 * Problem:
 * - https://leetcode.com/problems/add-two-numbers
 * */


class ListNode {
	val: number
	next: ListNode | null

	constructor( val?: number, next?: ListNode | null ) {
		this.val = (val === undefined ? 0 : val)
		this.next = (next === undefined ? null : next)
	}
}

namespace Solution {

	export function run( l1: ListNode, l2: ListNode ): ListNode | null {

		let iterator1 = l1
		let iterator2 = l2

		let prev: ListNode = null
		let current: ListNode = null
		let next: ListNode = null

		while (true) {
			const sum = iterator1.val + iterator2.val
			const additional = prev ? prev.val : 0
			let val = sum + additional

			if (val < 10) {
				next = new ListNode(0, null)
			}
			else {
				val = val - 10
				next = new ListNode(1, null)
			}

			prev = current
			current = new ListNode(val, next)
			prev.next = current

			iterator1 = iterator1.next
			iterator2 = iterator2.next
		}

		return current
	}


}

