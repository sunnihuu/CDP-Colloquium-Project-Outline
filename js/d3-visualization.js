/**
 * D3.js Climate-Food Feedback Loop Visualization
 * Interactive network diagram showing climate and food system interactions
 */

import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

// Configuration
const CONFIG = {
    width: 960,
    height: 600,
    nodeRadius: 12,
    hoverRadius: 15,
    linkDistance: 250,
    chargeStrength: -1000,
    colors: {
        climate: "#e63946",
        system: "#2a9d8f", 
        feedback: "#ffb703",
        bridge: "#888"
    },
    background: "#fff5db",
    textColor: "#2d3436"
};

// Data structure
const VISUALIZATION_DATA = [
    // Climate Feedback Loop (Red)
    { source: "Climate Change", target: "Extreme Weather", type: "climate" },
    { source: "Extreme Weather", target: "Reduced Yields", type: "climate" },
    { source: "Reduced Yields", target: "Urban Food Shortages", type: "climate" },
    { source: "Urban Food Shortages", target: "System Expansion", type: "climate" },
    { source: "System Expansion", target: "High foodprint", type: "climate" },

    // Feedback loop (Dashed Orange)
    { source: "High foodprint", target: "Climate Change", type: "feedback" },

    // Urban Food System Loop (Green)
    { source: "Production", target: "Processing", type: "system" },
    { source: "Processing", target: "Transport", type: "system" },
    { source: "Transport", target: "Retail", type: "system" },
    { source: "Retail", target: "Consumption", type: "system" },
    { source: "Consumption", target: "Waste", type: "system" },
    { source: "Waste", target: "Production", type: "system" },

    // Interactions between systems (Gray dashed bridges)
    { source: "Urban Food Shortages", target: "Retail", type: "bridge" },
    { source: "Production", target: "High foodprint", type: "bridge" },
    { source: "Transport", target: "High foodprint", type: "bridge" }
];

// Node categorization
const NODE_CATEGORIES = {
    climate: ["Climate Change", "Extreme Weather", "Reduced Yields", "Urban Food Shortages", "High foodprint"],
    system: ["Production", "Processing", "Transport", "Retail", "Consumption", "Waste"],
    bridge: ["System Expansion"]
};

// Legend data
const LEGEND_DATA = [
    { label: "Climate Loop", color: CONFIG.colors.climate },
    { label: "Food System Loop", color: CONFIG.colors.system },
    { label: "Feedback Loop", color: CONFIG.colors.feedback },
    { label: "System Bridge", color: CONFIG.colors.bridge }
];

/**
 * Create the D3 visualization
 * @param {string} containerId - The ID of the container element
 */
export function createVisualization(containerId) {
    // Prepare data
    const types = ["climate", "system", "feedback", "bridge"];
    const nodes = Array.from(new Set(VISUALIZATION_DATA.flatMap(d => [d.source, d.target])), id => ({ id }));
    const links = VISUALIZATION_DATA.map(d => Object.create(d));

    // Color scale
    const color = d3.scaleOrdinal()
        .domain(types)
        .range([CONFIG.colors.climate, CONFIG.colors.system, CONFIG.colors.feedback, CONFIG.colors.bridge]);

    // Force simulation
    const simulation = d3.forceSimulation(nodes)
        .force("link", d3.forceLink(links).id(d => d.id).distance(CONFIG.linkDistance))
        .force("charge", d3.forceManyBody().strength(CONFIG.chargeStrength))
        .force("x", d3.forceX())
        .force("y", d3.forceY());

    // Create SVG
    const svg = d3.select(`#${containerId}`)
        .append("svg")
        .attr("viewBox", [-CONFIG.width / 2, -CONFIG.height / 2, CONFIG.width, CONFIG.height])
        .attr("width", CONFIG.width)
        .attr("height", CONFIG.height)
        .attr("style", `max-width: 100%; height: auto; font: 14px 'Plus Jakarta Sans', sans-serif; background-color: ${CONFIG.background};`);

    // Create arrow markers
    createArrowMarkers(svg, types, color);

    // Create links
    const link = createLinks(svg, links, color);

    // Create nodes
    const node = createNodes(svg, nodes, simulation);

    // Create legend
    createLegend(svg);

    // Start simulation
    simulation.on("tick", () => {
        link.attr("d", linkArc);
        node.attr("transform", d => `translate(${d.x},${d.y})`);
    });
}

/**
 * Create arrow markers for links
 */
function createArrowMarkers(svg, types, color) {
    svg.append("defs").selectAll("marker")
        .data(types)
        .join("marker")
            .attr("id", d => `arrow-${d}`)
            .attr("viewBox", "0 -5 10 10")
            .attr("refX", 15)
            .attr("refY", 0)
            .attr("markerWidth", 6)
            .attr("markerHeight", 6)
            .attr("orient", "auto")
        .append("path")
            .attr("fill", d => color(d))
            .attr("d", "M0,-5L10,0L0,5");
}

/**
 * Create visualization links
 */
function createLinks(svg, links, color) {
    return svg.append("g")
        .attr("fill", "none")
        .attr("stroke-width", 3)
        .selectAll("path")
        .data(links)
        .join("path")
            .attr("stroke", d => color(d.type))
            .attr("stroke-dasharray", d => d.type === "bridge" || d.type === "feedback" ? "8,4" : "")
            .attr("marker-end", d => `url(#arrow-${d.type})`);
}

/**
 * Create visualization nodes
 */
function createNodes(svg, nodes, simulation) {
    const node = svg.append("g")
        .attr("fill", "currentColor")
        .attr("stroke-linecap", "round")
        .attr("stroke-linejoin", "round")
        .selectAll("g")
        .data(nodes)
        .join("g")
        .style("cursor", "pointer")
        .call(d3.drag()
            .on("start", (event, d) => dragstarted(event, d, simulation))
            .on("drag", dragged)
            .on("end", (event, d) => dragended(event, d, simulation)));

    // Add circles
    node.append("circle")
        .attr("stroke", CONFIG.background)
        .attr("stroke-width", 3)
        .attr("r", CONFIG.nodeRadius)
        .attr("fill", getNodeColor)
        .on("mouseover", function(event, d) {
            d3.select(this)
                .transition()
                .duration(200)
                .attr("r", CONFIG.hoverRadius);
        })
        .on("mouseout", function(event, d) {
            d3.select(this)
                .transition()
                .duration(200)
                .attr("r", CONFIG.nodeRadius);
        });

    // Add text labels
    node.append("text")
        .attr("x", 18)
        .attr("y", "0.31em")
        .attr("font-size", "14px")
        .attr("font-weight", "600")
        .attr("fill", CONFIG.textColor)
        .style("pointer-events", "none")
        .style("user-select", "none")
        .text(d => d.id)
    .clone(true).lower()
        .attr("fill", "none")
        .attr("stroke", CONFIG.background)
        .attr("stroke-width", 3);

    return node;
}

/**
 * Get node color based on category
 */
function getNodeColor(d) {
    if (NODE_CATEGORIES.climate.includes(d.id)) return CONFIG.colors.climate;
    if (NODE_CATEGORIES.system.includes(d.id)) return CONFIG.colors.system;
    if (NODE_CATEGORIES.bridge.includes(d.id)) return CONFIG.colors.feedback;
    return CONFIG.colors.bridge;
}

/**
 * Create legend
 */
function createLegend(svg) {
    const legend = svg.append("g")
        .attr("transform", `translate(${-CONFIG.width/2 + 30}, ${-CONFIG.height/2 + 30})`);

    LEGEND_DATA.forEach((d, i) => {
        const legendItem = legend.append("g")
            .attr("transform", `translate(0, ${i * 35})`);

        legendItem.append("circle")
            .attr("r", 8)
            .attr("fill", d.color)
            .attr("stroke", CONFIG.background)
            .attr("stroke-width", 2);

        legendItem.append("text")
            .attr("x", 20)
            .attr("y", 6)
            .attr("font-size", "15px")
            .attr("font-weight", "600")
            .attr("fill", CONFIG.textColor)
            .text(d.label);
    });
}

/**
 * Link arc path generator
 */
function linkArc(d) {
    const dx = d.target.x - d.source.x;
    const dy = d.target.y - d.source.y;
    const dr = Math.sqrt(dx * dx + dy * dy);
    return `M${d.source.x},${d.source.y}A${dr},${dr} 0 0,1 ${d.target.x},${d.target.y}`;
}

/**
 * Drag event handlers
 */
function dragstarted(event, d, simulation) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
}

function dragged(event, d) {
    d.fx = event.x;
    d.fy = event.y;
}

function dragended(event, d, simulation) {
    if (!event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
}
