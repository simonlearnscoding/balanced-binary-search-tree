class Node {
    constructor(value) {
        this.value = value
        this.leftNode = null
        this.rightNode = null
    }
}


// Build a Tree class / factory which accepts an array when initialized.
// The Tree class should have a root attribute which uses the return value of buildTree which you’ll write next.

class Tree {
    constructor(array) {
        this.list = Tree.cleanList(array)
        this.root = Tree.buildTree(this.list, 0, this.list.length - 1)
        // this.delete = Tree.delete
    }

    static buildTree(arr, start, end) {
        if (start > end) {
            return null
        }
        const mid = parseInt((start + end) / 2)
        const node = new Node(arr[mid])
        node.leftNode = Tree.buildTree(arr, start, mid - 1)
        node.rightNode = Tree.buildTree(arr, mid + 1, end)
        return node
    }

    static cleanList(arr) {
        //    don’t forget to sort and remove duplicates!
        let array = [...arr]
        array = removeDuplicates(array)
        array = sort(array)
        return array

        function removeDuplicates(array) {
            let unique = [];
            arr.forEach(element => {
                if (!unique.includes(element)) {
                    unique.push(element);
                }
            });
            return unique;
        }

        function sort(array) {
            return array.sort((a, b) => {
                return a - b;
            }); // TODO: anki sort
        }
    }

    deleteNode(obj) {
        const {father, target, direction} = obj

        // check if we are trying to delete root element
        // if(father === 'root') {
        //     const nextBiggest = getNextBiggest(target.rightNode)
        // }

        // target has two kids, we have to therefore
        if ((target.leftNode) && (target.rightNode)) {
            // get the next biggest node
            const nextBiggest = getNextBiggest(target.rightNode)
            this.delete(nextBiggest.value)
            target.value = nextBiggest.value
        }

        // if its a childless node just delete it
        if ((!target.leftNode) && (!target.rightNode)) {
            return father[direction] = null
        }

        //if it has only one kid adopt the kids to its grandpa
        if ((!target.leftNode) | (!target.rightNode)) {
            //find out if the kis is on the left or the right
            const grandKid = !target.leftNode ? target.rightNode : target.leftNode
            return father[direction] = grandKid
        }


        function getNextBiggest(target) {
            //go left until next node is null
            if (!target.leftNode) {
                return target
            }
            return getNextBiggest(target.leftNode)
        }

    }

    inOrder(fn = this.log) {

        const Array = []
        recursion(this.root)
        return Array.map(fn)

        function recursion(target) {
            if (!target) {
                return
            }
            recursion(target.leftNode)
            Array.push(target)
            recursion(target.rightNode)
        }
    }

    preorder(fn = this.log) {
        const Array = []
        recursion(this.root)
        return Array.map(fn)

        function recursion(target) {
            if (!target) {
                return
            }
            Array.push(target)
            recursion(target.leftNode)
            recursion(target.rightNode)
        }
    }
    postOrder(fn =  this.log) {

        const Array = []
        recursion(this.root)
        return Array.map(fn)

        function recursion(target) {
            if (!target) {
                return
            }
            recursion(target.leftNode)
            recursion(target.rightNode)
            Array.push(target)
        }
    }
    delete(value) {
        const data = this.findNode(value, this.root)
        this.deleteNode(data)


    }

    log(item) {
        return item.value
    }

    levelOrder(fn = this.log) {
        const Array = []
        const queue = []
        recursion(this.root)

        function recursion(target) {
            if (!target) {
                return
            }
            Array.push(target)
            queue.push(target.leftNode, target.rightNode)
            for (const item of queue) {
                queue.shift()
                recursion(item)
            }
        }

        return Array.map(item => fn(item))
    }

    find(value) {
        const {target} = this.findNode(value, this.root)
        return target
    }

    static rebalance(tree) {
        const array = tree.preorder()
        return new Tree(array)
    }


    isBalanced() {
        const leftHeight = this.height(this.root.leftNode.value)
        const rightHeight = this.height(this.root.rightNode.value)
        if(difference(leftHeight, rightHeight) > 1) {
            return false
        }
        return true

        function difference(a, b) {
            return Math.abs(a-b)
        }
    }
    depth(value) {
        let count = 0
        return recursion(this.root, count)
        function recursion(node, count) {
            if(!node) {
                throw new Error('node doesnt exist ...')
            }
            if(node.value===value) {
                return count
            }
            if(value> node.value)    {
                return recursion(node.rightNode, count +1)
            }
            return recursion(node.leftNode, count+1)

        }
        if(this.root.value === value) {
            return count
        }


    }
    findNode(value, node) {
        if (!node) {
            console.log(`there is no node with the value ${value} :(`)
            return
        }
        if (this.root.value === value) {
            return {father: 'root', target: this.root, direction: 'root'}
        }
        //todo check if node
        if (value > node.value) {
            if (node.rightNode.value === value) {
                const result = {father: node, target: node.rightNode, direction: 'rightNode'}
                return result
            }
            return this.findNode(value, node.rightNode)
        } else {
            if (node.leftNode.value === value) {
                const result = {father: node, target: node.leftNode, direction: 'leftNode'}
                return result
            }
            return this.findNode(value, node.leftNode,)
        }
    }

    insert(value, node = this.root) {

        if (value > node.value) {
            if (!node.rightNode) {
                return node.rightNode = new Node(value)
            }
            return this.insert(value, node.rightNode)
        }
        if (value < node.value) {

            if (!node.leftNode) {
                return node.leftNode = new Node(value)
            }
            return this.insert(value, node.leftNode)
        }
    }
    height(value) {
        let maxCount = 0
        let node = this.find(value)
        recursion(node, 0)
        return maxCount
        function recursion(node, count) {
            if (!node) {
                if (count > maxCount) {
                    maxCount = count
                }
                return
            }
                recursion(node.leftNode, count + 1)
                recursion(node.rightNode, count + 1)
            }
        }
}



const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node.rightNode !== null) {
        prettyPrint(node.rightNode, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
    if (node.leftNode !== null) {
        prettyPrint(node.leftNode, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
}
const array = [2,4,1,5,32, 5, 13, 19, 15, 18, 17, 16, 31, 27]
const tree = new Tree(array)
console.log(tree.isBalanced())
console.log(tree.levelOrder())
console.log(tree.preorder())
console.log(tree.postOrder())
console.log(tree.inOrder())
tree.insert(126)
tree.insert(135)
tree.insert(142)
console.log(tree.isBalanced())
const tree2 = Tree.rebalance(tree)
console.log(tree2.levelOrder())
console.log(tree2.preorder())
console.log(tree2.postOrder())
console.log(tree2.inOrder())