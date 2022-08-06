import Stack from "../data-structures/stack"


/*
 * Problem:
 * Given brackets as string, check if all brackets have it's opposite closing bracket. And if all has return true, else false
 *
 * Hint:
 * Use Stack
 * */

namespace Solution {

	export function run(brackets: string): void {
		const result = isMatchedBrackets(brackets)
		console.log(`[SOLUTION] For brackets: "${brackets}" = ${JSON.stringify(result)}`)
	}

	function isMatchedBrackets( brackets: string ): boolean {
		const stack = new Stack<string>()

		for (let i = 0; i < brackets.length; i++) {
			const char = brackets[i]
			const isLeft = isLeftBracket(char)

			// If bracket is left one, just push to stack
			if (isLeft) {
				stack.push(char)
				continue
			}

			// If bracket is right one and stack is empty, it is already invalid
 			if (stack.isEmpty()) return false

			// Remove top item and if it doesn't couple with current brackets reversed version, brackets is invalid
			const last = stack.pop()
			const reversed = reverseRightBracket(char)

			if (last !== reversed) return false
		}

		return stack.isEmpty()
	}

	function isLeftBracket( char: string ): boolean {
		if (char === "[") return true
		if (char === "{") return true
		if (char === "(") return true

		return false
	}

	function reverseRightBracket( char: string ): string {
		if (char === "]") return "["
		if (char === "}") return "{"
		if (char === ")") return "("

		return null
	}
}

Solution.run("{[()]}")
Solution.run("{[(]}")
Solution.run("(()())")
Solution.run("[][](){}")