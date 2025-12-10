class WeightedGraph {
    constructor() {
        this.adjacencyList = {};
    }

    getList() {
        return this.adjacencyList;
    }

    neighbours(vertex) {
        return this.adjacencyList[vertex];
    }

    addVertex(vertex) {
        if (!this.adjacencyList[vertex]) {
            // Could be an array but use set for better performance
            this.adjacencyList[vertex] = new Map();
        }
    }

    addEdge(vertex1, vertex2, cost) {
        if (!this.adjacencyList[vertex1]) {
            this.addVertex(vertex1);
        }
        if (!this.adjacencyList[vertex2]) {
            this.addVertex(vertex2);
        }
        this.adjacencyList[vertex1].set(vertex2, cost);
        this.adjacencyList[vertex2].set(vertex1, cost);
    }

    display() {
        for (let vertex in this.adjacencyList) {
            let str = "";
            for (let edge of this.adjacencyList[vertex]) {
                str = str + " (" + edge + ")";
            }
            console.log(vertex + "->" + str);
        }
    }

    removeVertex(vertex) {
        if (this.adjacencyList[vertex]) {
            for (let adjacentVertex of this.adjacencyList[vertex]) {
                this.removeEdge(vertex, adjacentVertex);
            }
            delete this.adjacencyList[vertex];
        }
    }

    removeEdge(vertex1, vertex2) {
        this.adjacencyList[vertex1].delete(vertex2);
        this.adjacencyList[vertex2].delete(vertex1);
    }

    hasEdge(vertex1, vertex2) {
        return (
            this.adjacencyList[vertex1].has(vertex2) &&
            this.adjacencyList[vertex2].has(vertex1)
        );
    }

}

module.exports = WeightedGraph;

