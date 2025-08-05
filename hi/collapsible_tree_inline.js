
const treeData = {
  name: "Community of Practice",
  children: [
    {
      name: "Climate",
      children: [
        {
          name: "Research",
          children: [
            {
              name: "Slow Factory: Transforming Food Systems",
              link: "https://slowfactory.earth/courses/transforming-food-systems/"
            },
            {
              name: "Slow Factory: Food Sovereignty",
              link: "https://slowfactory.earth/readings/food-sovereignty/"
            },
            {
              name: "Speculative Food Design Histories – Piyali Sircar",
              link: "https://www.piyalisircar.com/speculative-food-design-histories"
            },
            {
              name: "Edible Infrastructures – Borowski, Janssen, Low",
              link: "https://issuu.com/aaemtech/docs/edible_infrastructures_-_borowski_janssen_low"
            }
          ]
        },
        {
          name: "Art Installation",
          children: [
            {
              name: "Poster House: Food or Poison?",
              link: "https://shop.posterhouse.org/food-or-poison-poster.html"
            },
            {
              name: "Tega Brain",
              link: "https://tegabrain.com/"
            }
          ]
        }
      ]
    },
    {
      name: "Urban Food",
      children: [
        {
          name: "Media",
          children: [
            {
              name: "This is Mold – Alt Universe",
              link: "https://thisismold.com/mold-magazine/issue-06-design-for-a-new-earth/eating-in-an-alt-universe"
            },
            {
              name: "Urban Ecologies – Editor's Note",
              link: "https://thisismold.com/series/urban-ecologies/urban-ecologies-editors-note"
            },
            {
              name: "Edible Graveyards",
              link: "https://thisismold.com/series/urban-ecologies/edible-graveyards"
            }
          ]
        },
        {
          name: "Data & Design",
          children: [
            {
              name: "Giorgia Lupi",
              link: "https://giorgialupi.com/"
            },
            {
              name: "Eat · Act · Impact – Domestic Streamers",
              link: "https://www.domesticstreamers.com/work/eat-act-impact/"
            },
            {
              name: "Sustainable Nutrition – Domestic Streamers",
              link: "https://www.domesticstreamers.com/work/sustainable-nutrition-let-s-act/"
            }
          ]
        }
      ]
    },
    {
      name: "Agriculture",
      children: [
        {
          name: "Experimental",
          children: [
            {
              name: "Genomic Gastronomy Site Visit",
              link: "https://genomicgastronomy.com/blog/fftt-april-1-flevoland-site-visit/"
            },
            {
              name: "Genomic Gastronomy",
              link: "https://genomicgastronomy.com/"
            }
          ]
        }
      ]
    },
    {
      name: "Food System",
      children: [
        {
          name: "Academia",
          children: [
            {
              name: "Mapping Evolving Food Systems – Opentranscripts",
              link: "http://opentranscripts.org/transcript/mapping-evolving-food-systems/"
            },
            {
              name: "Food Systems Visualization Article",
              link: "https://www.tandfonline.com/doi/full/10.1080/17549175.2023.2180077"
            }
          ]
        }
      ]
    }
  ]
};


// D3 collapsible tree logic (abbreviated)

// Layout and style refinements
const width = 1500;
const dx = 32; // vertical node spacing
const dy = 220; // horizontal node spacing
const margin = {top: 40, right: 180, bottom: 40, left: 80};
const diagonal = d3.linkHorizontal().x(d => d.y).y(d => d.x);
const tree = d3.tree().nodeSize([dx, dy]);
const root = d3.hierarchy(treeData);
root.x0 = 0;
root.y0 = margin.left;
root.descendants().forEach((d, i) => d.id = i);

const svg = d3.select("#tree-container").append("svg")
  .attr("width", width)
  .attr("height", 800)
  .style("font", "16px 'Plus Jakarta Sans', 'Noto Serif', Arial, sans-serif")
  .style("user-select", "none");

// Collapse all children initially
root.children.forEach(d => { d._children = d.children; d.children = null; });

function update(source) {
  const duration = 400;
  const nodes = root.descendants().reverse();
  const links = root.links();
  tree(root);

  let left = root, right = root;
  root.eachBefore(n => {
    if (n.x < left.x) left = n;
    if (n.x > right.x) right = n;
  });
  const height = right.x - left.x + margin.top + margin.bottom;
  svg.transition().duration(duration)
    .attr("height", height)
    .attr("viewBox", [0, left.x - margin.top, width, height]);

  // Nodes
  const node = svg.selectAll("g.node").data(nodes, d => d.id);
  const nodeEnter = node.enter().append("g")
    .attr("class", "node")
    .attr("transform", d => `translate(${source.y0},${source.x0})`)
    .on("click", (event, d) => { d.children = d.children ? null : d._children; update(d); });

  nodeEnter.append("circle")
    .attr("r", 10)
    .attr("fill", d => d._children ? "#b5c99a" : "#296307")
    .attr("stroke", "#b5c99a")
    .attr("stroke-width", 2.5)
    .style("cursor", d => d._children ? "pointer" : "default");

  nodeEnter.append("text")
    .attr("dy", "0.32em")
    .attr("x", d => d._children ? -18 : 18)
    .attr("text-anchor", d => d._children ? "end" : "start")
    .text(d => d.data.name)
    .style("font-size", "1.1em")
    .style("font-weight", d => d.depth === 0 ? 700 : 400)
    .style("fill", d => d.data.link ? "#1a6" : "#222")
    .style("cursor", d => d.data.link ? "pointer" : "default")
    .on("click", (event, d) => {
      event.stopPropagation();
      if (d.data.link) window.open(d.data.link, "_blank");
    });

  // Animate node position
  nodeEnter.merge(node)
    .transition().duration(duration)
    .attr("transform", d => `translate(${d.y},${d.x})`);

  node.exit().transition().duration(duration)
    .attr("transform", d => `translate(${source.y},${source.x})`)
    .remove();

  // Links
  const link = svg.selectAll("path.link").data(links, d => d.target.id);
  const linkEnter = link.enter().insert("path", "g")
    .attr("class", "link")
    .attr("d", d => {
      const o = {x: source.x0, y: source.y0};
      return diagonal({source: o, target: o});
    })
    .attr("stroke", "#b5c99a")
    .attr("stroke-width", 2.5)
    .attr("fill", "none");

  link.merge(linkEnter).transition().duration(duration)
    .attr("d", diagonal)
    .attr("stroke", "#b5c99a");

  link.exit().transition().duration(duration)
    .attr("d", d => {
      const o = {x: source.x, y: source.y};
      return diagonal({source: o, target: o});
    })
    .remove();

  root.eachBefore(d => {
    d.x0 = d.x;
    d.y0 = d.y;
  });
}
update(root);
