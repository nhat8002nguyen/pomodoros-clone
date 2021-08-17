import { v4 } from 'uuid';

export const taskList = [
	{
		id: v4(),
		title: "Read react book",
		totalPomo: 10,
		donePomo: 10,
		note: "Read chap 1,2,3",
		done: true,
	},
	{
		id: v4(),
		title: "Do leetcode",
		totalPomo: 9,
		donePomo: 5,
		note: null,
		done: false,
	},
	{
		id: v4(),
		title: "Read java book",
		totalPomo: 6,
		donePomo: 5,
		note: null,
		done: false,
	},
	
]