type Vertex = { node: string; weight: number };
type Distances = { [key: string]: number };
type Previous = { [key: string]: string };

class WeightedGraph {
	adjacencyList: { [key: string]: Vertex[] };
	constructor() {
		this.adjacencyList = {};
	}

	addVertex(vertex: string) {
		if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
	}

	addEdge(vertex1: string, vertex2: string, weight: number) {
		this.adjacencyList[vertex1].push({ node: vertex2, weight });
		this.adjacencyList[vertex2].push({ node: vertex1, weight });
	}

	dijkstra(start: string, end: string) {
		let distances: Distances = {};
		let previous: Previous = {};
		let nodes = new PriorityQueue();
		let smallest;
		let path: string[] = [];
		for (let vertex in this.adjacencyList) {
			if (vertex === start) {
				distances[vertex] = 0;
				nodes.enqueue(vertex, 0);
			} else {
				distances[vertex] = Infinity;
				nodes.enqueue(vertex, Infinity);
			}
			previous[vertex] = '';
		}

		while (nodes.values.length) {
			smallest = nodes.dequeue().val;
			if (smallest === end) {
				// DONE
				// BUILD UP PATH TO RETURN AT END
				if (smallest) {
					while (previous[smallest]) {
						path.push(smallest);
						smallest = previous[smallest];
					}
				}
				break;
			}
			if (smallest || distances[smallest] !== Infinity) {
				for (let neighbor in this.adjacencyList[smallest]) {
					// find neighboring node
					let nextNode = this.adjacencyList[smallest][neighbor];
					// calculate new distance to neighboring node
					let candidate = distances[smallest] + nextNode.weight;
					let nextNeighbor = nextNode.node;
					if (candidate < distances[nextNeighbor]) {
						// updating new smallest distance to neighbor
						distances[nextNeighbor] = candidate;
						// updating previous - how we got to neighbor
						previous[nextNeighbor] = smallest;
						// enqueue in priority queue with new priority
						nodes.enqueue(nextNeighbor, candidate);
					}
				}
			}
		}
		if (smallest) {
			return path.concat(smallest).reverse();
		}
		return path.reverse();
	}
}

class PriorityQueue {
	values: GraphVertex[] = [];

	enqueue(val: string, priority: number) {
		let newNode = new GraphVertex(val, priority);
		this.values.push(newNode);
		let index = this.values.length - 1;
		let parentIndex = Math.floor((index - 1) / 2);
		while (
			parentIndex >= 0 &&
			this.values[index].priority < this.values[parentIndex].priority
		) {
			this.swap(this.values, index, parentIndex);
			index = parentIndex;
			parentIndex = Math.floor((index - 1) / 2);
		}
	}

	dequeue() {
		this.swap(this.values, 0, this.values.length - 1);
		// let max = this.values.pop();
		let max = this.values[this.values.length - 1];
		this.values.pop();

		let parentIndex = 0;
		while (true) {
			let leftChildIndex = 2 * parentIndex + 1;
			let rightChildIndex = 2 * parentIndex + 2;
			let swapIndex;
			if (leftChildIndex < this.values.length) {
				if (rightChildIndex < this.values.length) {
					swapIndex =
						this.values[leftChildIndex].priority <
						this.values[rightChildIndex].priority
							? leftChildIndex
							: rightChildIndex;
				} else {
					swapIndex = leftChildIndex;
				}
			}
			if (
				swapIndex &&
				this.values[parentIndex].priority >
					this.values[swapIndex].priority
			) {
				this.swap(this.values, parentIndex, swapIndex);
				parentIndex = swapIndex;
			} else {
				break;
			}
		}

		return max;
	}

	swap(arr: GraphVertex[], ind1: number, ind2: number) {
		[arr[ind1], arr[ind2]] = [arr[ind2], arr[ind1]];
	}

	print() {
		let priorities = [];
		for (let i = 0; i < this.values.length; i++) {
			priorities.push(this.values[i].priority);
		}
		return priorities;
	}
}

class GraphVertex {
	constructor(public val: string, public priority: number) {}
}

// * naive priority queue
// class PriorityQueue {
//     constructor() {
//         this.values = [];
//     }

//     enqueue(val, priority) {
//         this.values.push({val, priority});
//         this.sort();
//     }

//     dequeue() {
//         return this.values.shift();
//     }

//     sort() {
//         this.values.sort((a, b) => a.priority - b.priority);
//     }
// }

let g = new WeightedGraph();

g.addVertex('A');
g.addVertex('B');
g.addVertex('C');
g.addVertex('D');
g.addVertex('E');
g.addVertex('F');

g.addEdge('A', 'B', 4);
g.addEdge('A', 'C', 2);
g.addEdge('B', 'E', 3);
g.addEdge('C', 'D', 2);
g.addEdge('C', 'F', 4);
g.addEdge('D', 'E', 3);
g.addEdge('D', 'F', 1);
g.addEdge('E', 'F', 1);

console.log(g.dijkstra('A', 'E'));

// export default WeightedGraph;
export {};
