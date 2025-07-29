// Scene 1: Win/Loss Trends
function renderScene1() {
  d3.select("#scene").html("");
  const margin = {top: 60, right: 140, bottom: 40, left: 60};
  const width = 1000, height = 500;
  const svg = d3.select("#scene")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  // Data: All years for selected team
  const teamData = state.data.filter(d => d.team === state.selectedTeam);
  const x = d3.scaleLinear()
    .domain(d3.extent(teamData, d => d.season))
    .range([margin.left, width - margin.right]);
  const y = d3.scaleLinear()
    .domain([0, 1])
    .range([height - margin.bottom, margin.top]);

  // Line
  const line = d3.line()
    .x(d => x(d.season))
    .y(d => y(d.wins / (d.wins + d.losses)));

  svg.append("path")
    .datum(teamData)
    .attr("fill", "none")
    .attr("stroke", "#1d3557")
    .attr("stroke-width", 3)
    .attr("d", line);

  // Points
  svg.selectAll("circle")
    .data(teamData)
    .enter()
    .append("circle")
    .attr("cx", d => x(d.season))
    .attr("cy", d => y(d.wins / (d.wins + d.losses)))
    .attr("r", 6)
    .attr("fill", d => d.playoff ? "#e63946" : "#457b9d")
    .on("mouseover", (event, d) => showTooltip(event, `Year: ${d.season}<br>Win %: ${(d.wins/(d.wins+d.losses)).toFixed(2)}<br>Playoffs: ${d.playoff ? "Yes" : "No"}`))
    .on("mouseout", hideTooltip);

  // Axes
  svg.append("g")
    .attr("transform", `translate(0,${height-margin.bottom})`)
    .call(d3.axisBottom(x).tickFormat(d3.format("d")));
  svg.append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y).tickFormat(d3.format(".0%")));

  // Labels
  svg.append("text")
    .attr("x", width/2)
    .attr("y", margin.top/2)
    .attr("text-anchor", "middle")
    .attr("font-size", "1.4em")
    .text(`${state.selectedTeam} Win % by Season`);

  // X-axis label
  svg.append("text")
    .attr("x", width/2)
    .attr("y", height - 5)
    .attr("text-anchor", "middle")
    .attr("font-size", "1em")
    .text("Season");

  // Y-axis label
  svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -height/2)
    .attr("y", 18)
    .attr("text-anchor", "middle")
    .attr("font-size", "1em")
    .text("Win %");

  // Instruction text under title
  svg.append("text")
    .attr("x", width/2)
    .attr("y", margin.top/2 + 25)
    .attr("text-anchor", "middle")
    .attr("font-size", "11px")
    .attr("fill", "#666")
    .attr("font-style", "italic")
    .text("Hover over data points for more details");

  // Legend with better positioning
  const legend = svg.append("g")
    .attr("transform", `translate(${width - margin.right + 10}, ${margin.top + 20})`);
  
  // Legend background
  legend.append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", 120)
    .attr("height", 60)
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

  // Annotations: Highlight best and worst seasons
  const bestSeason = teamData.reduce((best, current) => {
    const currentWinPct = current.wins / (current.wins + current.losses);
    const bestWinPct = best.wins / (best.wins + best.losses);
    return currentWinPct > bestWinPct ? current : best;
  });
  
  const worstSeason = teamData.reduce((worst, current) => {
    const currentWinPct = current.wins / (current.wins + current.losses);
    const worstWinPct = worst.wins / (worst.wins + worst.losses);
    return currentWinPct < worstWinPct ? current : worst;
  });

  const bestWinPct = (bestSeason.wins / (bestSeason.wins + bestSeason.losses)).toFixed(1);
  const worstWinPct = (worstSeason.wins / (worstSeason.wins + worstSeason.losses)).toFixed(1);

  // Best season annotation
  svg.append("g")
    .attr("class", "annotation")
    .append("circle")
    .attr("cx", x(bestSeason.season))
    .attr("cy", y(bestSeason.wins / (bestSeason.wins + bestSeason.losses)))
    .attr("r", 10)
    .attr("fill", "none")
    .attr("stroke", "#2d5a27")
    .attr("stroke-width", 3);

  svg.append("text")
    .attr("x", x(bestSeason.season))
    .attr("y", y(bestSeason.wins / (bestSeason.wins + bestSeason.losses)) - 20)
    .attr("text-anchor", "middle")
    .attr("font-size", "12px")
    .attr("font-weight", "bold")
    .attr("fill", "#2d5a27")
    .text(`Best: ${bestWinPct}% (${bestSeason.season})`);

  // Worst season annotation
  svg.append("g")
    .attr("class", "annotation")
    .append("circle")
    .attr("cx", x(worstSeason.season))
    .attr("cy", y(worstSeason.wins / (worstSeason.wins + worstSeason.losses)))
    .attr("r", 10)
    .attr("fill", "none")
    .attr("stroke", "#8b0000")
    .attr("stroke-width", 3);

  svg.append("text")
    .attr("x", x(worstSeason.season))
    .attr("y", y(worstSeason.wins / (worstSeason.wins + worstSeason.losses)) + 25)
    .attr("text-anchor", "middle")
    .attr("font-size", "12px")
    .attr("font-weight", "bold")
    .attr("fill", "#8b0000")
    .text(`Worst: ${worstWinPct}% (${worstSeason.season})`);

  // Scene information
  d3.select("#scene").append("div")
    .style("clear", "both")
    .style("margin-top", "30px")
    .style("padding", "20px")
    .style("background-color", "#f8f9fa")
    .style("border-radius", "8px")
    .style("width", "20%")
    .style("box-sizing", "border-box")
    .style("border-left", "4px solid #457b9d")
    .html(`
      <h3 style="margin: 0 0 15px 0; color: #2d3748; font-size: 18px;">Team Performance Analysis</h3>
      <p style="margin: 8px 0; color: #4a5568; line-height: 1.6;">
        This line chart tracks ${state.selectedTeam}'s win percentage over the 2002-2024 period, revealing long-term performance trends and consistency patterns.
      </p>
      <p style="margin: 8px 0; color: #4a5568; line-height: 1.6;">
        <strong>Key Insights:</strong> The team's best season was ${bestSeason.season} with ${bestWinPct}% wins, while their worst performance was in ${worstSeason.season} with ${worstWinPct}% wins. 
        Red dots indicate playoff appearances, showing when the team qualified for postseason play.
      </p>
      <p style="margin: 8px 0; color: #4a5568; line-height: 1.6;">
        <strong>Data Source:</strong> NFL Team Stats 2002 - Feb. 2025 (ESPN)  
        https://www.kaggle.com/datasets
        /cviaxmiwnptr/nfl-team-stats-20022019-espn
      </p>
    `);
} 