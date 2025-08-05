
export function drawCommunityTree({ containerId, jsonPath, width = 1000, height = 800, enableZoom = false }) {
  // Remove any previous SVG (for hot reload/dev)
  d3.select(`#${containerId}`).selectAll("svg").remove();

  const margin = { top: 40, right: 120, bottom: 40, left: 120 };

  const svg = d3.select(`#${containerId}`)
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  let g = svg.append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  if (enableZoom) {
    const zoom = d3.zoom()
      .scaleExtent([0.3, 2.5])
      .on("zoom", (event) => {
        g.attr("transform", event.transform);
      });
    svg.call(zoom);
  }

  const cluster = d3.cluster().size([height - margin.top - margin.bottom, width - margin.left - margin.right]);

  // Tooltip div
  let tooltip = d3.select(`#${containerId}`).select(".d3-tooltip");
  if (tooltip.empty()) {
    tooltip = d3.select("body").append("div")
      .attr("class", "d3-tooltip")
      .style("position", "absolute")
      .style("z-index", 10)
      .style("background", "#fff")
      .style("border", "1.5px solid #b5c99a")
      .style("border-radius", "8px")
      .style("padding", "8px 14px")
      .style("font-size", "15px")
      .style("color", "#296307")
      .style("box-shadow", "0 2px 8px rgba(41,99,7,0.08)")
      .style("pointer-events", "none")
      .style("opacity", 0);
  }

  d3.json(jsonPath).then(data => {
    const root = d3.hierarchy(data);
    root.x0 = (height - margin.top - margin.bottom) / 2;
    root.y0 = 0;
    cluster(root);

    // Collapse all children initially except root
    root.children?.forEach(collapse);

    update(root);

    function update(source) {
      cluster(root);

      // Links

      const links = g.selectAll(".link")
        .data(root.links(), d => d.target.data.name + "-" + d.source.data.name);

      links.join(
        enter => enter.append("path")
          .attr("class", "link")
          .attr("d", d3.linkHorizontal()
            .x(d => d.source.y)
            .y(d => d.source.x)
          )
          .attr("stroke", "#b5c99a")
          .attr("stroke-width", 2.5)
          .attr("fill", "none"),
        update => update,
        exit => exit.remove()
      )
      .transition().duration(400)
      .attr("d", d3.linkHorizontal()
        .x(d => d.target.y)
        .y(d => d.target.x)
      );

      // Nodes

      const nodes = g.selectAll("g.node")
        .data(root.descendants(), d => d.data.name);

      const nodeEnter = nodes.enter().append("g")
        .attr("class", d => "node" + (d.children ? " node--internal" : " node--leaf"))
        .attr("transform", d => `translate(${source.y0 || d.y},${source.x0 || d.x})`)
        .on("mouseover", function(event, d) {
          d3.select(this).select("circle").attr("fill", "#b5c99a");
          tooltip.transition().duration(200).style("opacity", 0.95);
          tooltip.html(d.data.name + (d.data.link ? `<br><span style='font-size:13px;color:#1a6;'>🔗 Click for more</span>` : ""))
            .style("left", (event.pageX + 16) + "px")
            .style("top", (event.pageY - 18) + "px");
        })
        .on("mousemove", function(event) {
          tooltip.style("left", (event.pageX + 16) + "px")
            .style("top", (event.pageY - 18) + "px");
        })
        .on("mouseout", function(event, d) {
          d3.select(this).select("circle").attr("fill", null);
          tooltip.transition().duration(200).style("opacity", 0);
        })
        .on("click", function(event, d) {
          event.stopPropagation();
          if (d.data.link) {
            window.open(d.data.link, "_blank");
          } else if (d.children) {
            collapse(d);
            update(d);
          } else if (d._children) {
            expand(d);
            update(d);
          }
        });

      nodeEnter.append("circle")
        .attr("r", 6)
        .attr("fill", d => d._children ? "#b5c99a" : "#296307")
        .attr("stroke", "#b5c99a")
        .attr("stroke-width", 2.5);

      nodeEnter.append("text")
        .attr("dy", "0.32em")
        .attr("x", d => d.children || d._children ? -14 : 14)
        .attr("text-anchor", d => d.children || d._children ? "end" : "start")
        .text(d => d.data.name)
        .style("cursor", d => d.data.link ? "pointer" : "default");

      // Transition nodes to their new position
      const nodeUpdate = nodeEnter.merge(nodes);
      nodeUpdate.transition().duration(400)
        .attr("transform", d => `translate(${d.y},${d.x})`);

      // Remove exiting nodes
      nodes.exit().transition().duration(400)
        .attr("transform", d => `translate(${source.y},${source.x})`)
        .remove();
    }

    function collapse(d) {
      if (d.children) {
        d._children = d.children;
        d._children.forEach(collapse);
        d.children = null;
      }
    }
    function expand(d) {
      if (d._children) {
        d.children = d._children;
        d.children.forEach(expand);
        d._children = null;
      }
    }
  });
}

// Auto-run when loaded
drawCommunityTree({
  containerId: "tree-container",
  jsonPath: "community_of_practice_cluster_tree_v2.json"
});
