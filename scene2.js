// Scene 2: Offense vs. Defense
function renderScene2() {
  d3.select("#scene").html("");
  const margin = {top: 60, right: 150, bottom: 40, left: 60};
  const width = 900, height = 500;
  const svg = d3.select("#scene")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  // Data: All teams for selected year
  const yearData = state.data.filter(d => d.season === state.selectedYear);
  
  // Debug: Log playoff teams for the selected year
  console.log(`Playoff teams for ${state.selectedYear}:`, yearData.filter(d => d.playoff).map(d => d.team));

  const x = d3.scaleLinear()
    .domain(d3.extent(yearData, d => d.pointsFor))
    .nice()
    .range([margin.left, width - margin.right]);
  const y = d3.scaleLinear()
    .domain([d3.min(yearData, d => d.pointsAgainst) - 20, d3.max(yearData, d => d.pointsAgainst) + 20])
    .nice()
    .range([height - margin.bottom, margin.top]);

  // Scale for circle sizes based on wins
  const sizeScale = d3.scaleLinear()
    .domain([0, d3.max(yearData, d => d.wins)])
    .range([5, 25]);

  // Scatterplot
  svg.selectAll("circle")
    .data(yearData)
    .enter()
    .append("circle")
    .attr("cx", d => x(d.pointsFor))
    .attr("cy", d => y(d.pointsAgainst))
    .attr("r", d => sizeScale(d.wins))
    .attr("fill", d => d.playoff ? "#e63946" : "#457b9d")
    .attr("opacity", 0.8)
    .on("mouseover", (event, d) => showTooltip(event, `Team: ${d.team}<br>Points For: ${d.pointsFor}<br>Points Against: ${d.pointsAgainst}<br>Wins: ${d.wins}<br>Playoffs: ${d.playoff ? "Yes" : "No"}`))
    .on("mouseout", hideTooltip);

  // Add legend with better positioning and size
  const legend = svg.append("g")
    .attr("transform", `translate(${width - margin.right + 10}, ${margin.top + 20})`);
  
  // Legend background
  legend.append("rect")
    .attr("x", -7)
    .attr("y", 0)
    .attr("width", 140)
    .attr("height", 75)
    .attr("fill", "white")
    .attr("stroke", "#ccc")
    .attr("stroke-width", 1)
    .attr("rx", 5);


  // Playoff points legend
  legend.append("circle")
  .attr("cx", 15)
  .attr("cy", 20)
  .attr("r", 6)
  .attr("fill", "#e63946");
  legend.append("text")
  .attr("x", 30)
  .attr("y", 25)
  .attr("font-size", "12px")
  .text("Made Playoffs");

   // Non-playoff points legend
 legend.append("circle")
   .attr("cx", 15)
   .attr("cy", 40)
   .attr("r", 6)
   .attr("fill", "#457b9d");
 legend.append("text")
   .attr("x", 30)
   .attr("y", 45)
   .attr("font-size", "12px")
   .text("Missed Playoffs");
  
  // Size legend
  legend.append("text")
    .attr("x", 0)
    .attr("y", 65)
    .attr("font-size", "11px")
    .attr("font-weight", "bold")
    .text("Circle size = Total Wins");

  // Axes
  svg.append("g")
    .attr("transform", `translate(0,${height-margin.bottom})`)
    .call(d3.axisBottom(x));
  svg.append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y));

  // Labels
  svg.append("text")
    .attr("x", width/2)
    .attr("y", margin.top/2)
    .attr("text-anchor", "middle")
    .attr("font-size", "1.4em")
    .text(`Offense vs. Defense (${state.selectedYear})`);

  // Instruction text under title
  svg.append("text")
    .attr("x", width/2)
    .attr("y", margin.top/2 + 25)
    .attr("text-anchor", "middle")
    .attr("font-size", "11px")
    .attr("fill", "#666")
    .attr("font-style", "italic")
    .text("Hover over data points for more details");

  svg.append("text")
    .attr("x", width/2)
    .attr("y", height-5)
    .attr("text-anchor", "middle")
    .attr("font-size", "1em")
    .text("Points Scored (For)");

  svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -height/2)
    .attr("y", 18)
    .attr("text-anchor", "middle")
    .attr("font-size", "1em")
    .text("Points Allowed (Against)");

  // Quadrant annotation
  const xMid = d3.mean(yearData, d => d.pointsFor);
  const yMid = d3.mean(yearData, d => d.pointsAgainst);
  svg.append("line")
    .attr("x1", x(xMid)).attr("x2", x(xMid))
    .attr("y1", y.range()[0]).attr("y2", y.range()[1])
    .attr("stroke", "#aaa").attr("stroke-dasharray", "4 4");
      svg.append("line")
      .attr("x1", x.range()[0]).attr("x2", x.range()[1])
      .attr("y1", y(yMid)).attr("y2", y(yMid))
      .attr("stroke", "#aaa").attr("stroke-dasharray", "4 4");

  // Annotations: Highlight best offense and best defense
  const bestOffense = yearData.reduce((best, current) => 
    current.pointsFor > best.pointsFor ? current : best
  );
  
  const bestDefense = yearData.reduce((best, current) => 
    current.pointsAgainst < best.pointsAgainst ? current : best
  );

  // Best offense annotation (most points scored)
  svg.append("g")
    .attr("class", "annotation")
    .append("circle")
    .attr("cx", x(bestOffense.pointsFor))
    .attr("cy", y(bestOffense.pointsAgainst))
    .attr("r", 12)
    .attr("fill", "none")
    .attr("stroke", "#2d5a27")
    .attr("stroke-width", 3);

  svg.append("text")
    .attr("x", x(bestOffense.pointsFor))
    .attr("y", y(bestOffense.pointsAgainst) - 15)
    .attr("text-anchor", "middle")
    .attr("font-size", "12px")
    .attr("font-weight", "bold")
    .attr("fill", "#2d5a27")
    .text(`Best Offense: ${bestOffense.team} (${bestOffense.pointsFor} pts)`);

  // Best defense annotation 
  svg.append("g")
    .attr("class", "annotation")
    .append("circle")
    .attr("cx", x(bestDefense.pointsFor))
    .attr("cy", y(bestDefense.pointsAgainst))
    .attr("r", 12)
    .attr("fill", "none")
    .attr("stroke", "#2d5a27")
    .attr("stroke-width", 3);

  svg.append("text")
    .attr("x", x(bestDefense.pointsFor))
    .attr("y", y(bestDefense.pointsAgainst) + 20)
    .attr("text-anchor", "middle")
    .attr("font-size", "12px")
    .attr("font-weight", "bold")
    .attr("fill", "#2d5a27")
    .text(`Best Defense: ${bestDefense.team} (${bestDefense.pointsAgainst} pts)`);

  // Scene information
  d3.select("#scene").append("div")
    .style("clear", "both")
    .style("padding", "10px")
    .style("background-color", "#f8f9fa")
    .style("border-radius", "4px")
    .style("width", "25%")
    .style("box-sizing", "border-box")
    .style("border-left", "4px solid #e63946")
    .html(`
      <h3 style="margin: 0 0 15px 0; color: #2d3748; font-size: 18px;">Offensive vs Defensive Performance</h3>
      <p style="margin: 8px 0; color: #4a5568; line-height: 1.6;">
        This scatter plot compares all NFL teams' offensive and defensive performance for the ${state.selectedYear} season. Each point represents a team, with position indicating their scoring efficiency.
      </p>
      <p style="margin: 8px 0; color: #4a5568; line-height: 1.6;">
        <strong>Key Insights:</strong> ${bestOffense.team} had the best offense with ${bestOffense.pointsFor} points scored, while ${bestDefense.team} had the best defense allowing only ${bestDefense.pointsAgainst} points. 
        Circle size represents wins - larger circles indicate more successful teams.
      </p>
      <p style="margin: 8px 0; color: #4a5568; line-height: 1.6;">
        <strong>Quadrant Analysis:</strong> Teams in the bottom-right (high scoring, low points allowed) are elite on both sides of the ball. Teams in the top-left struggle on both offense and defense.
      </p>
    `);
} 