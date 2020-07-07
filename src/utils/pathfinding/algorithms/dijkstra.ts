type Vertex = { node: number; weight: number };
type Distances = { [key: string]: number };
type Previous = { [key: string]: number };

class WeightedGraph {
	adjacencyList: { [key: string]: Vertex[] };
	constructor() {
		this.adjacencyList = {};
	}

	addVertex(vertex: number) {
		if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
	}

	addEdge(vertex1: number, vertex2: number, weight: number) {
		this.adjacencyList[vertex1].push({
			node: vertex2,
			weight,
		});
		// this.adjacencyList[vertex2].push({ node: vertex1, weight });
	}

	dijkstra(start: number, end: number) {
		let pathfindingAnimation = [];
		let distances: Distances = {};
		let previous: Previous = {};
		let nodes = new PriorityQueue();
		let smallest;
		let path: number[] = [];
		let visited: number[] = [];
		let endFind = false;

		for (let vertex in this.adjacencyList) {
			if (Number(vertex) === start) {
				distances[vertex] = 0;
				nodes.enqueue(Number(vertex), 0);
			} else {
				distances[vertex] = Infinity;
				nodes.enqueue(Number(vertex), Infinity);
			}
			previous[vertex] = NaN;
		}

		while (nodes.values.length) {
			smallest = nodes.dequeue().val;
			// console.log('smallest: ', smallest);

			if (smallest === start) {
				visited.push(smallest);
			}

			if (smallest === end /*endFind*/) {
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

					if (!visited.includes(nextNeighbor) && !endFind) {
						pathfindingAnimation.push({
							index: nextNeighbor,
							state: 'VISITING',
						});

						visited.push(nextNeighbor);

						if (candidate < distances[nextNeighbor]) {
							// updating new smallest distance to neighbor
							distances[nextNeighbor] = candidate;
							// updating previous - how we got to neighbor
							previous[nextNeighbor] = smallest;
							// enqueue in priority queue with new priority
							nodes.enqueue(nextNeighbor, candidate);
						}

						if (nextNeighbor === end) {
							endFind = true;
							break;
						}
					}
				}
			}
		}

		if (smallest) {
			path.push(smallest);
			path.reverse();

			for (let i = 0; i < path.length; i++) {
				pathfindingAnimation.push({ index: path[i], state: 'PATH' });
			}

			return pathfindingAnimation;
		}
		return pathfindingAnimation;
	}
}

class PriorityQueue {
	values: GraphVertex[] = [];

	enqueue(val: number, priority: number) {
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
	constructor(public val: number, public priority: number) {}
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

// let g = new WeightedGraph();

// g.addVertex(1);
// g.addVertex(2);
// g.addVertex(3);
// g.addVertex(4);
// g.addVertex(5);
// g.addVertex(6);

// g.addEdge(1, 2, 1);

// console.log(g.dijkstra(1, 2));

export default WeightedGraph;
// export {};
