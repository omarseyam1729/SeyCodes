const canvas = document.getElementById('animationCanvas');
const ctx = canvas.getContext('2d');

const WIDTH = canvas.width / 2 - 50;
const HEIGHT = canvas.height / 2 - 50;

const originalArray = [50, 30, 70, 10, 90, 40, 80, 20, 60, 100];
const arrays = [
    [...originalArray],
    [...originalArray],
    [...originalArray],
    [...originalArray]
];

const barWidth = WIDTH / originalArray.length;

function drawArray(arr, highlightIndex = -1, offsetX = 0, offsetY = 0, label = '') {
    ctx.clearRect(offsetX, offsetY, WIDTH + 50, HEIGHT + 50);
    ctx.fillStyle = 'black';
    ctx.font = '16px Arial';
    ctx.fillText(label, offsetX + WIDTH / 2 - 30, offsetY + HEIGHT + 30);
    for (let i = 0; i < arr.length; i++) {
        ctx.fillStyle = i === highlightIndex ? 'red' : 'steelblue';
        ctx.fillRect(offsetX + i * barWidth, offsetY + HEIGHT - arr[i], barWidth - 2, arr[i]);
    }
}

// Bubble Sort Animation
async function bubbleSort(arr, offsetX, offsetY) {
    let swapped;
    do {
        swapped = false;
        for (let i = 0; i < arr.length - 1; i++) {
            if (arr[i] > arr[i + 1]) {
                [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
                swapped = true;
            }
            drawArray(arr, i, offsetX, offsetY, 'Bubble Sort');
            await new Promise(resolve => setTimeout(resolve, 100));
        }
    } while (swapped);
    setTimeout(() => bubbleSort([...originalArray], offsetX, offsetY), 1000);
}

// Selection Sort Animation
async function selectionSort(arr, offsetX, offsetY) {
    for (let i = 0; i < arr.length; i++) {
        let minIndex = i;
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
            drawArray(arr, j, offsetX, offsetY, 'Selection Sort');
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        if (minIndex !== i) {
            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
        }
        drawArray(arr, i, offsetX, offsetY, 'Selection Sort');
    }
    setTimeout(() => selectionSort([...originalArray], offsetX, offsetY), 1000);
}

// Insertion Sort Animation
async function insertionSort(arr, offsetX, offsetY) {
    for (let i = 1; i < arr.length; i++) {
        let key = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
            drawArray(arr, j + 1, offsetX, offsetY, 'Insertion Sort');
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        arr[j + 1] = key;
        drawArray(arr, i, offsetX, offsetY, 'Insertion Sort');
    }
    setTimeout(() => insertionSort([...originalArray], offsetX, offsetY), 1000);
}

// Quick Sort Animation
async function quickSort(arr, low, high, offsetX, offsetY) {
    if (low < high) {
        const pi = await partition(arr, low, high, offsetX, offsetY);
        await Promise.all([
            quickSort(arr, low, pi - 1, offsetX, offsetY),
            quickSort(arr, pi + 1, high, offsetX, offsetY)
        ]);
    }
    if (low === 0 && high === arr.length - 1) {
        setTimeout(() => quickSort([...originalArray], 0, originalArray.length - 1, offsetX, offsetY), 1000);
    }
}

async function partition(arr, low, high, offsetX, offsetY) {
    const pivot = arr[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        drawArray(arr, j, offsetX, offsetY, 'Quick Sort');
        await new Promise(resolve => setTimeout(resolve, 100));
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    drawArray(arr, i + 1, offsetX, offsetY, 'Quick Sort');
    return i + 1;
}

drawArray(arrays[0], -1, 0, 0, 'Bubble Sort');
drawArray(arrays[1], -1, WIDTH + 50, 0, 'Selection Sort');
drawArray(arrays[2], -1, 0, HEIGHT + 50, 'Insertion Sort');
drawArray(arrays[3], -1, WIDTH + 50, HEIGHT + 50, 'Quick Sort');

bubbleSort(arrays[0], 0, 0);
selectionSort(arrays[1], WIDTH + 50, 0);
insertionSort(arrays[2], 0, HEIGHT + 50);
quickSort(arrays[3], 0, arrays[3].length - 1, WIDTH + 50, HEIGHT + 50);

const width = 300;
const height = 400;

const svg = d3.select("svg")
    .attr("width", width)
    .attr("height", height);

const color = d3.scaleOrdinal(d3.schemeCategory10);

// Sample data: Nodes and links
const graph = {
    nodes: [
        { id: "Alice" },
        { id: "Bob" },
        { id: "Charlie" },
        { id: "David" },
        { id: "Eve" },
        { id: "Frank" }
    ],
    links: [
        { source: "Alice", target: "Bob" },
        { source: "Alice", target: "Charlie" },
        { source: "Bob", target: "David" },
        { source: "Charlie", target: "David" },
        { source: "David", target: "Eve" },
        { source: "Eve", target: "Frank" },
        { source: "Frank", target: "Alice" }
    ]
};

const simulation = d3.forceSimulation(graph.nodes)
    .force("link", d3.forceLink(graph.links).id(d => d.id).distance(100))
    .force("charge", d3.forceManyBody().strength(-300))
    .force("center", d3.forceCenter(width / 2, height / 2));

const link = svg.append("g")
    .attr("class", "links")
    .selectAll("line")
    .data(graph.links)
    .enter().append("line")
    .attr("class", "link")
    .attr("stroke-width", 2);

const node = svg.append("g")
    .attr("class", "nodes")
    .selectAll("circle")
    .data(graph.nodes)
    .enter().append("circle")
    .attr("class", "node")
    .attr("r", 10)
    .attr("fill", d => color(d.id))
    .call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended));

node.append("title")
    .text(d => d.id);

simulation
    .nodes(graph.nodes)
    .on("tick", ticked);

simulation.force("link")
    .links(graph.links);

function ticked() {
    link
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

    node
        .attr("cx", d => d.x)
        .attr("cy", d => d.y);
}

function dragstarted(event, d) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
}

function dragged(event, d) {
    d.fx = event.x;
    d.fy = event.y;
}

function dragended(event, d) {
    if (!event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
}
