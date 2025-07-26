const nodes = [
  {
    id: "NYC Food Metrics",
    url: "https://www.nyc.gov/site/foodpolicy/reports-and-data/food-metrics-report.page",
    group: "Government",
    year: 2024,
    author: "NYC Mayor's Office of Food Policy",
    summary: "Comprehensive data report on NYC food system metrics including food insecurity, food access, nutrition, and sustainability initiatives.",
    keywords: ["Food insecurity", "Food access", "Sustainability", "Nutrition", "Food deserts", "NYC policy", "Urban food systems"]
  },
  {
    id: "Urban Metabolism (MIT)",
    url: "https://umg.mit.edu/blog/read/urban-metabolism-can-inform-cities-climate-change-actions-lessons-from-the-transatlantic-cities-lab-dialogues",
    group: "Academic",
    year: 2022,
    author: "MIT Urban Metabolism Group",
    summary: "Examines how urban metabolism concepts can inform climate change actions in cities. Highlights resource flows, sustainability, and cross-city knowledge exchange.",
    keywords: ["Urban metabolism", "Climate change", "Sustainability", "Resource flows", "Cities", "Knowledge exchange"]
  },
  {
    id: "Foodprint Manhattan",
    url: "https://thewhyfactory.com/output/foodprint-manhattan/",
    group: "Design",
    year: 2023,
    author: "The Why Factory",
    summary: "Explores Manhattan's food system footprint using design-led approaches to analyze urban food flows, consumption, and spatial impacts.",
    keywords: ["Food footprint", "Urban food system", "Design research", "Manhattan", "Sustainability", "Urban metabolism"]
  },
  {
    id: "Land Food Lab",
    url: "https://landfoodlab.weebly.com/",
    group: "Research Collective",
    year: 2021,
    author: "Land Food Lab Collective",
    summary: "Collaborative research exploring land use, food systems, and environmental impact, focusing on sustainable agriculture and food justice.",
    keywords: ["Sustainable agriculture", "Food justice", "Land use", "Environmental impact", "Collaborative research"]
  },
  {
    id: "Edible New York",
    url: "https://somequietfuture.com/edible-new-york/",
    group: "Art Project",
    year: 2022,
    author: "Some Quiet Future",
    summary: "Artistic exploration of New York’s edible landscapes, focusing on local food culture, urban agriculture, and community food practices.",
    keywords: ["Urban agriculture", "Food culture", "Art project", "Community", "Local food"]
  },
  {
    id: "Foodprint.org",
    url: "https://foodprint.org/",
    group: "NGO",
    year: 2010,
    author: "Foodprint NGO",
    summary: "Nonprofit organization providing research and education on sustainable food systems, food justice, and environmental impacts.",
    keywords: ["Sustainable food", "Food justice", "Education", "Environmental impact", "Nonprofit"]
  },
  {
    id: "WFP HungerMap",
    url: "https://hungermap.wfp.org/",
    group: "Global",
    year: 2024,
    author: "World Food Programme",
    summary: "Global hunger mapping tool providing real-time data on food insecurity worldwide to support humanitarian response and policy making.",
    keywords: ["Hunger", "Food insecurity", "Global data", "Humanitarian aid", "Mapping"]
  },
  {
    id: "BBC Food Calculator",
    url: "https://www.bbc.com/future/bespoke/follow-the-food/calculate-the-environmental-footprint-of-your-food.html",
    group: "Media",
    year: 2023,
    author: "BBC Future",
    summary: "Interactive tool allowing users to calculate the environmental footprint of their food choices, raising awareness on climate impacts.",
    keywords: ["Environmental footprint", "Food", "Climate change", "Interactive tool", "Sustainability"]
  },
  {
    id: "OSC NY Food Report",
    url: "https://www.osc.ny.gov/files/reports/osdc/pdf/report-2-2026.pdf",
    group: "Government",
    year: 2026,
    author: "NY State Office of the State Comptroller",
    summary: "Official report analyzing New York State’s food system economics, challenges, and policy recommendations for future resilience.",
    keywords: ["Food system", "Policy", "Economics", "New York State", "Resilience"]
  },
  {
    id: "Edible Infrastructures (AA)",
    url: "https://issuu.com/aaemtech/docs/edible_infrastructures_-_borowski_janssen_low",
    group: "Academic",
    year: 2012,
    author: "Borowski, Janssen, Low (AA EmTech)",
    summary: "MArch thesis exploring edible infrastructures as urban design strategies that integrate food production into cityscapes.",
    keywords: ["Edible infrastructure", "Urban design", "Food production", "Sustainability", "Architecture"]
  },
  {
    id: "Reassembling Nature",
    url: "https://reassemblingnature.org/",
    group: "Research Collective",
    year: 2023,
    author: "Reassembling Nature Collective",
    summary: "Interdisciplinary research platform focused on nature, ecology, and multispecies relations in the Anthropocene.",
    keywords: ["Ecology", "Multispecies", "Anthropocene", "Interdisciplinary", "Research"]
  },
  {
    id: "Food: Bigger Than Plate (V&A)",
    url: "https://www.vam.ac.uk/exhibitions/food-bigger-than-the-plate",
    group: "Exhibition",
    year: 2023,
    author: "Victoria & Albert Museum",
    summary: "Exhibition exploring global food systems, sustainability, and the cultural significance of food beyond just consumption.",
    keywords: ["Exhibition", "Food systems", "Sustainability", "Culture", "Global"]
  },
  {
    id: "OEC World",
    url: "https://oec.world/en",
    group: "Data Platform",
    year: 2018,
    author: "Observatory of Economic Complexity",
    summary: "Open data platform providing visualizations and data on global trade, economic complexity, and supply chains including food commodities.",
    keywords: ["Trade data", "Economic complexity", "Supply chains", "Open data", "Food commodities"]
  },
  {
    id: "Design Trust",
    url: "https://www.designtrust.org/",
    group: "Design Org",
    year: 2005,
    author: "Design Trust for Public Space",
    summary: "Organization promoting innovative design and research projects addressing urban challenges, including food and sustainability.",
    keywords: ["Urban design", "Public space", "Innovation", "Research", "Sustainability"]
  },
  {
    id: "UVM Food Systems",
    url: "https://libraries.uvm.edu/c.php?g=290509&p=1935278",
    group: "Academic",
    year: 2020,
    author: "University of Vermont Libraries",
    summary: "Resource guide covering food system research, sustainability, and policy resources curated by academic librarians.",
    keywords: ["Food systems", "Sustainability", "Research", "Policy", "Academic resources"]
  },
  {
    id: "Edible Urbanism Essay",
    url: "http://www.esperdy.net/wp-content/uploads/2009/03/Edible-Urbanism.pdf",
    group: "Essay",
    year: 2009,
    author: "Esperdy",
    summary: "Essay discussing the concept of edible urbanism, integrating food production with urban planning and community engagement.",
    keywords: ["Edible urbanism", "Urban planning", "Food production", "Community", "Sustainability"]
  },
  {
    id: "NYT Takeout Real Estate",
    url: "https://www.nytimes.com/2024/06/28/realestate/takeout-only-locations.html",
    group: "Media",
    year: 2024,
    author: "New York Times",
    summary: "Article analyzing the rise of takeout-only food businesses in NYC and the implications for urban real estate and food access.",
    keywords: ["Takeout", "Food business", "Real estate", "NYC", "Urban food access"]
  },
  {
    id: "Food Deserts NYC",
    url: "https://food-deserts.com/food-deserts-in-new-york-city/",
    group: "Mapping",
    year: 2022,
    author: "Food Deserts Project",
    summary: "Interactive maps and data visualizations highlighting food desert areas within NYC, focusing on food access inequality.",
    keywords: ["Food deserts", "Mapping", "Food access", "Inequality", "NYC"]
  }
];

const links = [
  { source: "NYC Food Metrics", target: "OSC NY Food Report" },
  { source: "Food Deserts NYC", target: "NYC Food Metrics" },
  { source: "Urban Metabolism (MIT)", target: "Land Food Lab" },
  { source: "Foodprint Manhattan", target: "Edible Infrastructures (AA)" },
  { source: "Foodprint.org", target: "WFP HungerMap" },
  { source: "Edible New York", target: "Edible Urbanism Essay" },
  { source: "Reassembling Nature", target: "Land Food Lab" },
  { source: "Food: Bigger Than Plate (V&A)", target: "Edible New York" },
  { source: "BBC Food Calculator", target: "Foodprint.org" },
  { source: "Design Trust", target: "Foodprint Manhattan" },
  { source: "UVM Food Systems", target: "Land Food Lab" },
  { source: "OEC World", target: "WFP HungerMap" }
];

const svg = d3.select("#graph");
const g = svg.append("g");

// 设置svg大小，比例可调
function setSize() {
  const width = window.innerWidth * 0.4;
  const height = window.innerHeight * 0.5;
  svg.attr("width", width).attr("height", height);
  return { width, height };
}

let { width, height } = setSize();

// 缩放和平移
const zoom = d3.zoom().on("zoom", event => {
  g.attr("transform", event.transform);
});
svg.call(zoom);

// Tooltip
const tooltip = d3.select("body")
  .append("div")
  .attr("class", "tooltip")
  .style("position", "absolute")
  .style("padding", "6px 10px")
  .style("background", "rgba(0,0,0,0.7)")
  .style("color", "#fff")
  .style("border-radius", "4px")
  .style("font-size", "12px")
  .style("pointer-events", "none")
  .style("opacity", 0);

// 力导向仿真
const simulation = d3.forceSimulation(nodes)
  .force("link", d3.forceLink(links).id(d => d.id).distance(150))
  .force("charge", d3.forceManyBody().strength(-300))
  .force("center", d3.forceCenter(width / 2, height / 2));

// 画连线
const link = g.selectAll(".link")
  .data(links)
  .join("line")
  .attr("class", "link")
  .attr("stroke", "#aaa")
  .attr("stroke-width", 1.5);

// 画节点组
const node = g.selectAll(".node")
  .data(nodes)
  .join("g")
  .attr("class", "node")
  .call(d3.drag()
    .on("start", dragstarted)
    .on("drag", dragged)
    .on("end", dragended));

// 节点圆圈，颜色按 group 不同可自定义
const colorMap = {
  "Government": "#1f77b4",
  "Academic": "#ff7f0e",
  "Design": "#2ca02c",
  "Research Collective": "#d62728",
  "Art Project": "#9467bd",
  "NGO": "#8c564b",
  "Global": "#e377c2",
  "Media": "#7f7f7f",
  "Exhibition": "#bcbd22",
  "Data Platform": "#17becf",
  "Design Org": "#aec7e8",
  "Essay": "#f7b6d2",
  "Mapping": "#c5b0d5"
};

node.append("circle")
  .attr("r", 8)
  .attr("fill", d => colorMap[d.group] || "#ccc")
  .style("cursor", "pointer")
  .on("click", (event, d) => {
    if (d.url) window.open(d.url, "_blank");
  })
  .on("mouseover", (event, d) => {
    tooltip.style("opacity", 1)
      .html(`
        <strong>${d.id}</strong><br/>
        <em>Group:</em> ${d.group || "N/A"}<br/>
        <em>Year:</em> ${d.year || "N/A"}<br/>
        <em>Author:</em> ${d.author || "N/A"}<br/>
        <em>Summary:</em> ${d.summary ? d.summary.substring(0, 150) + "..." : "N/A"}<br/>
        <em>Keywords:</em> ${d.keywords ? d.keywords.join(", ") : "N/A"}
      `)
      .style("left", (event.pageX + 10) + "px")
      .style("top", (event.pageY + 10) + "px");
  })
  .on("mousemove", (event) => {
    tooltip.style("left", (event.pageX + 10) + "px")
      .style("top", (event.pageY + 10) + "px");
  })
  .on("mouseout", () => tooltip.style("opacity", 0));

// 节点文字
node.append("text")
  .attr("x", 12)
  .attr("y", "0.31em")
  .style("pointer-events", "none")
  .style("font-family", "sans-serif")
  .style("font-size", "12px")
  .text(d => d.id);

// 仿真每帧执行位置更新
simulation.on("tick", () => {
  link
    .attr("x1", d => d.source.x)
    .attr("y1", d => d.source.y)
    .attr("x2", d => d.target.x)
    .attr("y2", d => d.target.y);

  node.attr("transform", d => `translate(${d.x},${d.y})`);
});

// 拖拽事件函数
function dragstarted(event, d) {
  if (!event.active) simulation.alphaTarget(0.3).restart();
  d.fx = d.x; d.fy = d.y;
}
function dragged(event, d) {
  d.fx = event.x; d.fy = event.y;
}
function dragended(event, d) {
  if (!event.active) simulation.alphaTarget(0);
  d.fx = null; d.fy = null;
}

// 窗口大小变化时更新svg和力导向中心
window.addEventListener("resize", () => {
  const size = setSize();
  simulation.force("center", d3.forceCenter(size.width / 2, size.height / 2));
  simulation.alpha(0.3).restart();
});