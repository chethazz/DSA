const Queue = require("./6queue");

class Node {
    constructor(val, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
        this.height = 0;
    }
}

class AVL {
    constructor() {
        this.root = null;
    }

    getHeight(node) {
        return node === null ? -1 : node.height;
    }

    getBalance(node) {
        return this.getHeight(node.left) - this.getHeight(node.right);
    }

    leftRotate(x) {
        const y = x.right;
        const yLeft = y.left;
        y.left = x;
        x.right = yLeft;
        x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1;
        y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1;
        return y;
    }

    rightRotate(x) {
        const y = x.left;
        const yRight = y.Right;
        y.right = x;
        x.left = yRight;
        x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1;
        y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1;
        return y;
    }

    isEmpty() {
        return this.root === null;
    }

    insert(value, node) {
        if (!node) {
            return new Node(value);
        }

        if (value < node.val) {
            node.left = this.insert(value, node.left);
        } else {
            node.right = this.insert(value, node.right);
        }
        node.height = Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1;

        if (this.getBalance(node) === 2 && this.getBalance(node.left) >= 0) {
            return this.rightRotate(node);
        } else if (this.getBalance(node) === 2 && this.getBalance(node.left) < 0) {
            node.left = this.leftRotate(node.left);
            return this.rightRotate(node);
        } else if (this.getBalance(node) === -2 && this.getBalance(node.right) <= 0) {
            return this.leftRotate(node);
        } else if (this.getBalance(node) === -2 && this.getBalance(node.right) > 0) {
            node.right = this.rightRotate(node.right);
            return this.leftRotate(node);
        }

        return node;
    }

    insertNode(value) {
        const newNode = new Node(value);

        if (this.isEmpty()) {
            this.root = newNode;
        } else {
            this._insertNode(newNode);
        }
    }

    _insertNode(newNode, root = this.root) {
        if (newNode.val < root.val) {
            if (!root.left) {
                root.left = newNode;
            } else {
                this._insertNode(newNode, root.left);
            }
        } else {
            if (!root.right) {
                root.right = newNode;
            } else {
                this._insertNode(newNode, root.right);
            }
        }
    }

    min(root = this.root) {
        if (!root) return null;
        if (!root.left) {
            return root.val;
        }
        return this.min(root.left);
    }

    max(root = this.root) {
        if (!root) return null;
        if (!root.right) {
            return root.val;
        }
        return this.max(root.right);
    }

    delete(value) {
        this.root = this._deleteNode(value);
    }

    _deleteNode(value, root = this.root) {
        if (!root) {
            return root;
        }

        if (value < root.val) {
            root.left = this._deleteNode(value, root.left);
        } else if (value > root.val) {
            root.right = this._deleteNode(value, root.right);
        } else {
            if (!root.left && !root.right) {
                return null;
            }
            if (!root.left) {
                return root.right;
            }
            if (!root.right) {
                return root.left;
            }
            root.val = this.min(root.right);
            root.right = this._deleteNode(root.val, root.right);
        }
        return root;
    }

    search(value, root = this.root) {
        if (!root) {
            return false;
        }
        if (value === root.val) {
            return true;
        }
        if (value < root.val) {
            return this.search(value, root.left);
        } else {
            return this.search(value, root.right);
        }
    }

    preorder(root = this.root) {
        if (root) {
            console.log(root.val);
            this.preorder(root.left);
            this.preorder(root.right);
        }
    }

    inorder(root = this.root) {
        if (root) {
            this.inorder(root.left);
            console.log(root.val);
            this.inorder(root.right);
        }
    }

    postorder(root = this.root) {
        if (root) {
            this.postorder(root.left);
            this.postorder(root.right);
            console.log(root.val);
        }
    }

    levelorder() {
        if (!this.isEmpty()) {
            const queue = new Queue();

            queue.enqueue(this.root);
            while (!queue.isEmpty()) {
                const curr = queue.dequeue();
                console.log(curr.val);
                if (curr.left) {
                    queue.enqueue(curr.left);
                }
                if (curr.right) {
                    queue.enqueue(curr.right);
                }
            }
        }
    }
}

const bst = new BinarySearchTree();
bst.insert(10);
bst.insert(15);
bst.insert(5);
bst.insert(3);
bst.insert(7);
bst.delete(5);
console.log(bst.search(3));
bst.levelorder();