const DirectedWeightedGraph = require("../DataStructures/14directedWeightedGraph");

function bellmanFord(graph, start) {
    const result = {};
    let edges = [];

    const list = graph.getList();
    for (let vertex in list) {
        result[vertex] = Infinity;
    }

    if (!(start in result)) return {};
    result[start] = 0;

    for (let vertex in list) {
        for (let [to, cost] of list[vertex]) {
            edges.push({ from: vertex, to, cost });
        }
    }

    for (let i = 0; i < graph.getTotalVertices() - 1; i++) {
        for (let edge of edges) {
            if (result[edge.from] + edge.cost < result[edge.to]) {
                result[edge.to] = result[edge.from] + edge.cost;
            }
        }
    }

    return result;
}



const graph = new DirectedWeightedGraph();

graph.addEdge(1, 2, 2);
graph.addEdge(1, 3, 4);
graph.addEdge(2, 3, 1);
graph.addEdge(3, 5, 3);
graph.addEdge(2, 4, 7);
graph.addEdge(4, 6, 1);
graph.addEdge(5, 4, 2);
graph.addEdge(5, 6, 5);
console.log(bellmanFord(graph, 1));