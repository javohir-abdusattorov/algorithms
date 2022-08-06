import DoublyLinkedList from "../doubly-linked-list"

const list = new DoublyLinkedList<string>()
list.addFirst("3")
list.addFirst("2")
list.addFirst("1")
list.addLast("last")
list.removeAt(3)


console.log(list.print())