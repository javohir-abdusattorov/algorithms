import PriorityQueue from "../priority-queue"


const minPQ = (a, b) => b - a
const maxPQ = (a, b) => a - b

const queue = new PriorityQueue<number>([9, 3, 4, 5, 2, 1, 7, 6], maxPQ)

// queue.add(9)
// queue.add(3)
// queue.add(4)
// queue.add(5)
// queue.add(2)
// queue.add(1)
// queue.add(7)
// queue.add(6)
//
queue.remove(9)


console.dir(queue, { depth: 55 })