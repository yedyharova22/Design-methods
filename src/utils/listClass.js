export class Node {
    value;
    prev;
    next;

    constructor(value) {
        this.value = value;
        this.prev = null;
        this.next = null;
    }
}

export class DoublyLinkedList {
    head;
    tail;
    length;

    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    push(val) {
        const newNode = new Node(val);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail.next = newNode;
            newNode.prev = this.tail;
            this.tail = newNode;
        }
        this.length++;
        return this;
    }

    pop() {
        if (this.length === 0) {
            return false;
        }
        const popped = this.tail;
        const newTail = this.tail.prev;
        if (newTail) {
            newTail.next = null;
            this.tail.prev = null;
        } else {
            this.head = null;
        }
        this.tail = newTail;
        this.length--;

        return popped;
    }

    shift() {
        if (!this.head) {
            return false;
        }
        const shiftedNode = this.head;
        const newHead = this.head.next;
        if (this.head !== this.tail) {
            newHead.prev = null;
            shiftedNode.next = null;
        } else {
            this.tail = null;
        }
        this.head = newHead;
        this.length--;
        return shiftedNode;
    }

    unshift(val) {
        const newNode = new Node(val);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.head.prev = newNode;
            newNode.next = this.head;
            this.head = newNode;
        }
        this.length++;
        return this;
    }

    insertAtIndex(index, val) {
        if (index > this.length) {
            return false;
        }
        if (index === 0) {
            this.unshift(val);
        } else if (index === this.length) {
            this.push(val);
        } else {
            const newNode = new Node(val);
            const after = this.getNodeAtIndex(index);
            const before = after.prev;
            after.prev = newNode;
            before.next = newNode;
            newNode.next = after;
            newNode.prev = before;
            this.length++;
        }
        return this;
    }

    removeAtIndex(index) {
        let removedNode;
        if (index >= this.length) {
            return false;
        }
        if (index === 0) {
            removedNode = this.shift();
        } else if (index === this.length - 1) {
            removedNode = this.pop();
        } else {
            removedNode = this.getNodeAtIndex(index);
            const after = removedNode.next;
            const before = removedNode.prev;
            removedNode.next = null;
            removedNode.prev = null;
            before.next = after;
            after.prev = before;
            this.length--;
        }
        return removedNode;
    }

    getList() {
        return this;
    }

    getNodeAtIndex(index) {
        if (index >= this.length || index < 0) {
            return false;
        }
        let currentIndex = 0;
        let currentNode = this.head;
        while (currentIndex !== index) {
            currentNode = currentNode.next;
            currentIndex++;
        }
        return currentNode;
    }

    setNodeAtIndex(index, val) {
        const foundNode = this.getNodeAtIndex(index);
        if (foundNode) {
            foundNode.value = val;
            return foundNode;
        }
        return null;
    }

    printList() {
        let str = "";
        if (this.head) {
            let current = this.head;
            while (current.next) {
                str += " " + current.value;
                console.log(current);
                current = current.next;
            }
            console.log(current);
            str += " " + current.value;
        } else {
            console.log("empty list");
            str = "null";
        }
        console.log("LIST ->", str);
    }

    getArrayList() {
        const res = [];
        if (this.head) {
            res.push(this.head);
            let current = this.head;
            while (current.next) {
                res.push(current.next);
                current = current.next;
            }
        }
        console.log("Array fro, list ", res);
        return res;
    }
}
