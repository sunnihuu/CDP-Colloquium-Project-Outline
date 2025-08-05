// js/community-force-map.js
// D3 force map for Community of Practice slide

function runCommunityForceMap() {
  const container = document.querySelector('.force-map-container');
  if (!container) return;
  const svg = d3.select('#community-force-map');
  const data = {
    nodes: [
      { id: "Laura Kurgan", group: "Practitioner" },
      { id: "Tega Brain", group: "Practitioner" },
      { id: "Giorgia Lupi", group: "Practitioner" },
      { id: "Jer Thorp", group: "Practitioner" },
      { id: "Annie Novak", group: "Practitioner" },
      { id: "SIDL (Columbia)", group: "Lab" },
      { id: "Civic Data Design Lab (MIT)", group: "Lab" },
      { id: "Center for Genomic Gastronomy", group: "Lab" },
      { id: "Feeding Cities Lab (PennDesign)", group: "Lab" },
      { id: "Design Earth", group: "Lab" },
      { id: "NYC Food Policy Center", group: "Lab" },
      { id: "Food x Design (UNDP)", group: "Network" },
      { id: "BioDesign Challenge", group: "Network" },
      { id: "Speculative Futures NYC", group: "Network" },
      { id: "Climate Designers", group: "Network" },
      { id: "Domestic Data Streamers", group: "Network" }
    ],
    links: [
      { source: "Laura Kurgan", target: "SIDL (Columbia)" },
      { source: "Tega Brain", target: "Civic Data Design Lab (MIT)" },
      { source: "Giorgia Lupi", target: "BioDesign Challenge" },
      { source: "Jer Thorp", target: "NYC Food Policy Center" },
      { source: "Annie Novak", target: "Feeding Cities Lab (PennDesign)" },
      { source: "SIDL (Columbia)", target: "NYC Food Policy Center" },
      { source: "Center for Genomic Gastronomy", target: "Food x Design (UNDP)" },
      { source: "Design Earth", target: "Speculative Futures NYC" },
      { source: "Feeding Cities Lab (PennDesign)", target: "Climate Designers" },
      { source: "Civic Data Design Lab (MIT)", target: "Domestic Data Streamers" }
    ]
  };

  // Tooltip
  let tooltip = document.getElementById('force-map-tooltip');
  if (!tooltip) {
    tooltip = document.createElement('div');
    tooltip.id = 'force-map-tooltip';
    tooltip.style.position = 'fixed';
    tooltip.style.pointerEvents = 'none';
    tooltip.style.background = 'rgba(255,255,255,0.97)';
    tooltip.style.border = '1px solid #ccc';
    tooltip.style.borderRadius = '6px';
    tooltip.style.padding = '6px 12px';
    tooltip.style.fontSize = '14px';
    tooltip.style.fontFamily = 'Plus Jakarta Sans, sans-serif';
    tooltip.style.color = '#222';
    tooltip.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
    tooltip.style.display = 'none';
    tooltip.style.minHeight = '24px';
    tooltip.style.zIndex = '9999';
    document.body.appendChild(tooltip);
  }

  function showTooltip(text, x, y) {
    tooltip.textContent = text;
    tooltip.style.left = (x + 12) + 'px';
    tooltip.style.top = (y + 12) + 'px';
    tooltip.style.display = 'block';
  }
  function hideTooltip() {
    tooltip.style.display = 'none';
  }

  function render() {
    svg.selectAll('*').remove();
    const width = container.offsetWidth;
    const height = container.offsetHeight;
    svg.attr('width', width).attr('height', height);
    const color = d3.scaleOrdinal()
      .domain(["Practitioner", "Lab", "Network"])
      .range(["#ff9999", "#99ccff", "#99ff99"]);
    const simulation = d3.forceSimulation(data.nodes)
      .force("link", d3.forceLink(data.links).id(d => d.id).distance(130))
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(width / 2, height / 2));
    const link = svg.append("g")
      .attr("stroke", "#ccc")
      .attr("stroke-opacity", 0.8)
      .selectAll("line")
      .data(data.links)
      .join("line")
      .attr("stroke-width", 1.5);
    const node = svg.append("g")
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.5)
      .selectAll("g")
      .data(data.nodes)
      .join("g")
      .attr("class", "node")
      .call(drag(simulation));
    node.append("circle")
      .attr("r", 14)
      .attr("fill", d => color(d.group))
      .on('mouseover', function(event, d) {
        d3.select(this).attr('stroke', '#296307').attr('stroke-width', 4);
        showTooltip(d.id + ' (' + d.group + ')', event.clientX, event.clientY);
      })
      .on('mousemove', function(event, d) {
        showTooltip(d.id + ' (' + d.group + ')', event.clientX, event.clientY);
      })
      .on('mouseout', function(event, d) {
        d3.select(this).attr('stroke', '#fff').attr('stroke-width', 2);
        hideTooltip();
      });
    // Always show text, clearly and on top
    // Draw white outline first, then black text on top for visibility
    node.append("text")
      .attr("x", 20)
      .attr("y", "0.35em")
      .text(d => d.id)
      .attr("fill", "none")
      .attr("stroke", "white")
      .attr("stroke-width", 7)
      .attr("font-size", "18px")
      .attr("font-weight", "bold");
    node.append("text")
      .attr("x", 20)
      .attr("y", "0.35em")
      .text(d => d.id)
      .attr("fill", "#000")
      .attr("font-size", "18px")
      .attr("font-weight", "bold")
      .style('pointer-events', 'none');
    simulation.on("tick", () => {
      link
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);
      node.attr("transform", d => `translate(${d.x},${d.y})`);
    });
    function drag(simulation) {
      return d3.drag()
        .on("start", (event, d) => {
          if (!event.active) simulation.alphaTarget(0.3).restart();
          d.fx = d.x; d.fy = d.y;
        })
        .on("drag", (event, d) => {
          d.fx = event.x; d.fy = event.y;
        })
        .on("end", (event, d) => {
          if (!event.active) simulation.alphaTarget(0);
          d.fx = null; d.fy = null;
        });
    }
  }
  render();
  window.addEventListener('resize', render);
}

// Reveal.js integration: run only when slide is visible
if (window.Reveal) {
  Reveal.addEventListener('slidechanged', function(event) {
    if (event.currentSlide && event.currentSlide.querySelector('.force-map-container')) {
      setTimeout(runCommunityForceMap, 0);
    }
  });
  // Also run if already visible on load
  if (document.querySelector('.force-map-container')) {
    setTimeout(runCommunityForceMap, 0);
  }
} else {
  // fallback for non-Reveal.js
  document.addEventListener('DOMContentLoaded', runCommunityForceMap);
}
