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

			stack.push(char)
			removeMatchedBrackets(stack)
		}

		return stack.length() === 0
	}

	function removeMatchedBrackets( stack: Stack<string> ): void {
		const current = stack.lookup(0)
		const prev = stack.lookup(1)

		if (checkIsBracketMatches(prev, current)) {
			stack.pop()
			stack.pop()
		}
	}

	function checkIsBracketMatches( start: string, end: string ): boolean {
		if (start === "[" && end === "]") return true
		if (start === "{" && end === "}") return true
		if (start === "(" && end === ")") return true

		return false
	}
}

Solution.run("{[()]}")
Solution.run("{[(]}")
Solution.run("(()())")
Solution.run("[][](){}")