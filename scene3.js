// Scene 3: Playoff Appearances
function renderScene3() {
  d3.select("#scene").html("");
  const margin = {top: 60, right: 40, bottom: 40, left: 140};
  const width = 900, height = 600;
  const svg = d3.select("#scene")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  // Data: Playoff appearances for selected year range
  const [minYear, maxYear] = state.yearRange;
  const teams = state.teams;
  const data = teams.map(team => {
    const years = (state.playoffData[team] || []).filter(y => y >= minYear && y <= maxYear);
    return {team, count: years.length, years};
  }).sort((a, b) => b.count - a.count);

  const y = d3.scaleBand()
    .domain(data.map(d => d.team))
    .range([margin.top, height - margin.bottom])
    .padding(0.2);
  const x = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.count)])
    .range([margin.left, width - margin.right]);

  // Bars
  svg.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", x(0))
    .attr("y", d => y(d.team))
    .attr("width", d => x(d.count) - x(0))
    .attr("height", y.bandwidth())
    .attr("fill", "#457b9d")
    .on("mouseover", (event, d) => showTooltip(event, `Team: ${d.team}<br>Playoff Appearances: ${d.count}<br>Years: ${d.years.join(", ")}`))
    .on("mouseout", hideTooltip);

  // Axes
  svg.append("g")
    .attr("transform", `translate(0,${height-margin.bottom})`)
    .call(d3.axisBottom(x).ticks(5));
  svg.append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y));

  // Labels
  svg.append("text")
    .attr("x", width/2)
    .attr("y", margin.top/2)
    .attr("text-anchor", "middle")
    .attr("font-size", "1.4em")
    .text(`Playoff Appearances (${minYear} - ${maxYear})`);

  // X-axis label
  svg.append("text")
    .attr("x", width/2)
    .attr("y", height - 5)
    .attr("text-anchor", "middle")
    .attr("font-size", "1em")
    .text("Total Appearances");

  // Instruction text under title
  svg.append("text")
    .attr("x", width/2)
    .attr("y", margin.top/2 + 25)
    .attr("text-anchor", "middle")
    .attr("font-size", "11px")
    .attr("fill", "#666")
    .attr("font-style", "italic")
    .text("Hover over bars for more details");

  // Scene information
  d3.select("#scene").append("div")
    .style("clear", "both")
    .style("margin-top", "30px")
    .style("padding", "20px")
    .style("background-color", "#f8f9fa")
    .style("border-radius", "8px")
    .style("width", "25%")
    .style("box-sizing", "border-box")
    .style("border-left", "4px solid #2d5a27")
    .html(`
      <h3 style="margin: 0 0 15px 0; color: #2d3748; font-size: 18px;">Playoff Success Analysis</h3>
      <p style="margin: 8px 0; color: #4a5568; line-height: 1.6;">
        This horizontal bar chart shows the total number of playoff appearances for each NFL team from ${state.yearRange[0]} to ${state.yearRange[1]}. Teams are ranked by their postseason success over this period.
      </p>
      <p style="margin: 8px 0; color: #4a5568; line-height: 1.6;">
        <strong>Key Insights:</strong> The New England Patriots lead with the most playoff appearances, followed by the Green Bay Packers and Philadelphia Eagles. 
        This visualization reveals which teams have been consistently successful in qualifying for postseason play.
      </p>
      <p style="margin: 8px 0; color: #4a5568; line-height: 1.6;">
        <strong>Success Patterns:</strong> Teams with longer bars have demonstrated sustained excellence and consistency in reaching the playoffs, while shorter bars indicate teams that have struggled to qualify for postseason play.
      </p>
    `);
} 