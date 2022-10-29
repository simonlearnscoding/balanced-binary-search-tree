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
    }
    static buildTree(arr, start, end) {
        if(start > end) {
            return null
        }
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
                return a - b;}); // TODO: anki sort
        }
    }
}
const array = [2,4,1,5,32, 5, 13]
const tree = new Tree(array)
console.log(tree)