// Setup canvas and context
const canvas = d3.select("#myCanvas").node();
const context = canvas.getContext("2d");
const width = canvas.width;
const height = canvas.height;
context.clearRect(0, 0, width, height);

// Sample event data
const events = [
  { date: new Date("1900-01-01"), label: "Start" },
  { date: new Date("1950-01-01"), label: "Mid-century" },
  { date: new Date("2000-01-01"), label: "Millennium" },
  { date: new Date("2020-01-01"), label: "Recent" },
  { date: new Date("2025-01-01"), label: "Now" }
];

// Create scales
const margin = { left: 50, right: 50 };
const xScale = d3.scaleTime()
  .domain(d3.extent(events, d => d.date))
  .range([margin.left, width - margin.right]);

// Draw baseline
context.beginPath();
context.moveTo(margin.left, height / 2);
context.lineTo(width - margin.right, height / 2);
context.strokeStyle = "#999";
context.lineWidth = 2;
context.stroke();

// Draw event points
events.forEach(event => {
  const x = xScale(event.date);
  const y = height / 2;

  // Point
  context.beginPath();
  context.arc(x, y, 6, 0, 2 * Math.PI);
  context.fillStyle = "#0055ff";
  context.fill();

  // Label
  context.font = "14px sans-serif";
  context.fillStyle = "#000";
  context.textAlign = "center";
  context.fillText(event.label, x, y - 10);
});

// Optional: mouse interaction (e.g., highlight on hover) can be added next
canvas.addEventListener("mousemove", function (event) {
  const rect = canvas.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;

  // Re-draw everything on each mouse move
  context.clearRect(0, 0, width, height);

  // Re-draw baseline
  context.beginPath();
  context.moveTo(margin.left, height / 2);
  context.lineTo(width - margin.right, height / 2);
  context.strokeStyle = "#999";
  context.lineWidth = 2;
  context.stroke();

  // Re-draw points and labels with highlight if hovered
  events.forEach(evt => {
    const x = xScale(evt.date);
    const y = height / 2;
    const dist = Math.hypot(mouseX - x, mouseY - y);

    // If mouse is close to the point, highlight
    const isHover = dist < 10;
    context.beginPath();
    context.arc(x, y, 6, 0, 2 * Math.PI);
    context.fillStyle = isHover ? "orange" : "#0055ff";
    context.fill();

    context.font = "14px sans-serif";
    context.fillStyle = "#000";
    context.textAlign = "center";
    context.fillText(evt.label, x, y - 10);
  });
});