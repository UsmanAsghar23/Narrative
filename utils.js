// Utility functions

// Tooltip functionality
const tooltip = d3.select("body").append("div")
  .attr("class", "tooltip")
  .style("display", "none");

function showTooltip(event, html) {
  tooltip.html(html)
    .style("display", "block")
    .style("left", (event.pageX + 15) + "px")
    .style("top", (event.pageY - 20) + "px");
}

function hideTooltip() {
  tooltip.style("display", "none");
}

// Navigation functionality
function setupNav() {
  // Arrow navigation
  d3.select("#leftArrow").on("click", () => {
    if (state.scene > 0) {
      state.scene--;
      updateNavigation();
      renderControls();
      renderCurrentScene();
    }
  });
  
  d3.select("#rightArrow").on("click", () => {
    if (state.scene < 2) {
      state.scene++;
      updateNavigation();
      renderControls();
      renderCurrentScene();
    }
  });
  
  // Circle navigation
  d3.select("#circle1").on("click", () => {
    if (state.scene !== 0) {
      state.scene = 0;
      updateNavigation();
      renderControls();
      renderCurrentScene();
    }
  });
  
  d3.select("#circle2").on("click", () => {
    if (state.scene !== 1) {
      state.scene = 1;
      updateNavigation();
      renderControls();
      renderCurrentScene();
    }
  });
  
  d3.select("#circle3").on("click", () => {
    if (state.scene !== 2) {
      state.scene = 2;
      updateNavigation();
      renderControls();
      renderCurrentScene();
    }
  });
}

// Update navigation circles
function updateNavigation() {
  // Remove active class from all circles
  d3.selectAll(".nav-circle")
    .style("background-color", "transparent")
    .style("border", "2px solid #333");
  
  // Add active class to current scene circle
  d3.select(`#circle${state.scene + 1}`)
    .style("background-color", "#333")
    .style("border", "none");
  
  // Update arrow visibility
  d3.select("#leftArrow").style("opacity", state.scene > 0 ? "1" : "0.3");
  d3.select("#rightArrow").style("opacity", state.scene < 2 ? "1" : "0.3");
}

// Scene rendering coordinator
function renderCurrentScene() {
  d3.select("#sceneTitle").text(sceneTitles[state.scene]);
  if (state.scene === 0) renderScene1();
  else if (state.scene === 1) renderScene2();
  else if (state.scene === 2) renderScene3();
} 