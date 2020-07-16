import * as GraphTypes from './graphTypes';
import * as Position from '../../position';

export class PriorityQueue {
	values: GraphTypes.Vertex[];

	constructor(public numRows: number, public numCols: number) {
		this.values = [];
	}

	enqueue(val: number, priority: number) {
		let indices = Position.absoluteToIndex(val, this.numRows, this.numCols);
		let newNode: GraphTypes.Vertex = {
			node: val,
			weight: priority,
			x: indices.row,
			y: indices.col,
		};
		this.values.push(newNode);

		let index = this.values.length - 1;
		let parentIndex = Math.floor((index - 1) / 2);

		while (
			parentIndex >= 0 &&
			this.values[index].weight <= this.values[parentIndex].weight
		) {
			this.swap(this.values, index, parentIndex);
			index = parentIndex;
			parentIndex = Math.floor((index - 1) / 2);
		}
	}

	dequeue() {
		this.swap(this.values, 0, this.values.length - 1);
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
						this.values[leftChildIndex].weight <
						this.values[rightChildIndex].weight
							? leftChildIndex
							: rightChildIndex;
				} else {
					swapIndex = leftChildIndex;
				}
			}
			if (
				swapIndex &&
				this.values[parentIndex].weight > this.values[swapIndex].weight
			) {
				this.swap(this.values, parentIndex, swapIndex);
				parentIndex = swapIndex;
			} else {
				break;
			}
		}

		return max;
	}

	swap(arr: GraphTypes.Vertex[], ind1: number, ind2: number) {
		[arr[ind1], arr[ind2]] = [arr[ind2], arr[ind1]];
	}
}
