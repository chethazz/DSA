const Queue = require("./6queue");

class Node {
    constructor(value, left = null, right = null) {
        this.value = value;
        this.left = left;
        this.right = right;
    }
}

class BinarySearchTree {
    constructor() {
        this.root = null;
    }

    isEmpty() {
        return this.root === null;
    }

    insert(value) {
        const newNode = new Node(value);

        if (this.isEmpty()) {
            this.root = newNode;
        } else {
            this._insertNode(this.root, newNode);
        }
    }

    _insertNode(root, newNode) {
        if (newNode.value < root.value) {
            if (root.left === null) {
                root.left = newNode;
            } else {
                this._insertNode(root.left, newNode);
            }
        } else {
            if (root.right === null) {
                root.right = newNode;
            } else {
                this._insertNode(root.right, newNode);
            }
        }
    }

    search(value, root = this.root) {
        if (!root) {
            return false;
        } else {
            if (value === root.value) {
                return true;
            }
            if (value < root.value) {
                return this.search(root.left, value);
            } else {
                return this.search(root.right, value);
            }
        }
    }

    preOrder(root = this.root) {
        if (root) {
            console.log(root.value);
            this.preOrder(root.left);
            this.preOrder(root.right);
        }
    }

    inOrder(root = this.root) {
        if (root) {
            this.inOrder(root.left);
            console.log(root.value);
            this.inOrder(root.right);
        }
    }

    postOrder(root = this.root) {
        if (root) {
            this.postOrder(root.left);
            this.postOrder(root.right);
            console.log(root.value);
        }
    }

    levelOrder() {
        const queue = new Queue();

        queue.enqueue(this.root);
        while (!queue.isEmpty()) {
            let curr = queue.dequeue();
            console.log(curr.value);
            if (curr.left) {
                queue.enqueue(curr.left);
            }
            if (curr.right) {
                queue.enqueue(curr.right);
            }
        }
    }

    min(root = this.root) {
        if (!root.left) {
            return root.value;
        } else {
            return this.min(root.left);
        }
    }

    max(root = this.root) {
        if (!root.right) {
            return root.value;
        } else {
            return this.max(root.right);
        }
    }

    delete(value) {
        this.root = this._deleteNode(value, this.root)
    }

    _deleteNode(value, root) {
        if(root === null) {
            return root;
        }

        if(value < root.value) {
            root.left = this._deleteNode(value, root.left)
        } else if(value > root.value) {
            root.right = this._deleteNode(value, root.right);
        } else {
            if(!root.left && !root.right) {
                return null;
            }
            if(!root.left) {
                return root.right;
            } else if(!root.right) {
                return root.left;
            }

            root.value = this.min(root.right);
            root.right = this._deleteNode(root.value, root.right)
        }
        return root;
    }
}

const bst = new BinarySearchTree();
bst.insert(10);
bst.insert(15);
bst.insert(5);
bst.insert(3);
bst.insert(7);
bst.delete(5)
bst.levelOrder()