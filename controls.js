// Controls functionality
function renderControls() {
  const controls = d3.select("#controls");
  controls.html(""); 

  if (state.scene === 0) {
    // Team dropdown
    controls.append("label").text("Select Team: ");
    controls.append("select")
      .attr("id", "teamDropdown")
      .on("change", function() {
        state.selectedTeam = this.value;
        renderCurrentScene();
      })
      .selectAll("option")
      .data(state.teams)
      .enter()
      .append("option")
      .attr("value", d => d)
      .property("selected", d => d === state.selectedTeam)
      .text(d => d);
  }
  if (state.scene === 1) {
    // Year range slider for offense vs defense
    controls.append("label").text("Select Year: ");
    
    // Container for connected range slider
    const rangeContainer = controls.append("div")
      .style("display", "inline-block")
      .style("margin-left", "10px")
      .style("position", "relative");
    
    // Create a single range slider container
    const sliderContainer = rangeContainer.append("div")
      .style("width", "300px")
      .style("height", "20px")
      .style("position", "relative")
      .style("background", "#e0e0e0")
      .style("border-radius", "10px")
      .style("margin", "0");
    
    // Track for the range
    sliderContainer.append("div")
      .style("position", "absolute")
      .style("top", "8px")
      .style("left", "0")
      .style("right", "0")
      .style("height", "4px")
      .style("background", "#ccc")
      .style("border-radius", "2px");
    
    // Square handle for year selection
    const yearHandle = sliderContainer.append("div")
      .style("position", "absolute")
      .style("top", "2px")
      .style("width", "16px")
      .style("height", "16px")
      .style("background", "#fff")
      .style("border", "2px solid #457b9d")
      .style("border-radius", "2px")
      .style("cursor", "pointer")
      .style("z-index", "10");
    

    
    // Update positions based on current state
          function updateSlider() {
        const minYear = d3.min(state.years);
        const maxYear = d3.max(state.years);
        const range = maxYear - minYear;
        
        const yearPos = ((state.selectedYear - minYear) / range) * 284; 
        
        yearHandle.style("left", yearPos + "px");
      }
    
    // Initialize positions
    updateSlider();
    
    // Drag functionality
    let isDragging = false;
    
    function handleDrag(event) {
      if (!isDragging) return;
      
      const rect = sliderContainer.node().getBoundingClientRect();
      const x = event.clientX - rect.left;
      const minYear = d3.min(state.years);
      const maxYear = d3.max(state.years);
      const range = maxYear - minYear;
      
      let newYear = Math.round(minYear + (x / 284) * range);
      newYear = Math.max(minYear, Math.min(maxYear, newYear));
      
      state.selectedYear = newYear;
      
      updateSlider();
      renderCurrentScene();
    }
    
    // Mouse events for year handle
    yearHandle
      .on("mousedown", () => {
        isDragging = true;
      });
    
    // Global mouse events
    d3.select(document)
      .on("mousemove", handleDrag)
      .on("mouseup", () => {
        isDragging = false;
      });
  }
  if (state.scene === 2) {
    // Year range for playoff appearances
    controls.append("label").text("Year Range: ");
    
    // Container for connected range slider
    const rangeContainer = controls.append("div")
      .style("display", "inline-block")
      .style("margin-left", "10px")
      .style("position", "relative");
    
    // Create a single range slider container
    const sliderContainer = rangeContainer.append("div")
      .style("width", "300px")
      .style("height", "20px")
      .style("position", "relative")
      .style("background", "#e0e0e0")
      .style("border-radius", "10px")
      .style("margin", "0");
    
    // Track for the range
    sliderContainer.append("div")
      .style("position", "absolute")
      .style("top", "8px")
      .style("left", "0")
      .style("right", "0")
      .style("height", "4px")
      .style("background", "#ccc")
      .style("border-radius", "2px");
    
    // Active range track
    const activeTrack = sliderContainer.append("div")
      .style("position", "absolute")
      .style("top", "8px")
      .style("height", "4px")
      .style("background", "#457b9d")
      .style("border-radius", "2px");
    
    // Min handle
    const minHandle = sliderContainer.append("div")
      .style("position", "absolute")
      .style("top", "2px")
      .style("width", "16px")
      .style("height", "16px")
      .style("background", "#fff")
      .style("border", "2px solid #457b9d")
      .style("border-radius", "50%")
      .style("cursor", "pointer")
      .style("z-index", "10");
    
    // Max handle
    const maxHandle = sliderContainer.append("div")
      .style("position", "absolute")
      .style("top", "2px")
      .style("width", "16px")
      .style("height", "16px")
      .style("background", "#fff")
      .style("border", "2px solid #457b9d")
      .style("border-radius", "50%")
      .style("cursor", "pointer")
      .style("z-index", "10");
    
    
    
    // Update positions based on current state
    function updateSlider() {
      const minYear = d3.min(state.years);
      const maxYear = d3.max(state.years);
      const range = maxYear - minYear;
      
      const minPos = ((state.yearRange[0] - minYear) / range) * 284; 
      const maxPos = ((state.yearRange[1] - minYear) / range) * 284;
      
      minHandle.style("left", minPos + "px");
      maxHandle.style("left", maxPos + "px");
      
              activeTrack
          .style("left", minPos + 8 + "px")
          .style("width", (maxPos - minPos) + "px");
      }
    
    // Initialize positions
    updateSlider();
    
    // Drag functionality
    let isDragging = false;
    let dragTarget = null;
    
    function handleDrag(event) {
      if (!isDragging) return;
      
      const rect = sliderContainer.node().getBoundingClientRect();
      const x = event.clientX - rect.left;
      const minYear = d3.min(state.years);
      const maxYear = d3.max(state.years);
      const range = maxYear - minYear;
      
      let newYear = Math.round(minYear + (x / 284) * range);
      newYear = Math.max(minYear, Math.min(maxYear, newYear));
      
      if (dragTarget === 'min') {
        if (newYear <= state.yearRange[1]) {
          state.yearRange[0] = newYear;
        }
      } else if (dragTarget === 'max') {
        if (newYear >= state.yearRange[0]) {
          state.yearRange[1] = newYear;
        }
      }
      
      updateSlider();
      renderCurrentScene();
    }
    
    // Mouse events for min handle
    minHandle
      .on("mousedown", () => {
        isDragging = true;
        dragTarget = 'min';
      });
    
    // Mouse events for max handle
    maxHandle
      .on("mousedown", () => {
        isDragging = true;
        dragTarget = 'max';
      });
    
    // Global mouse events
    d3.select(document)
      .on("mousemove", handleDrag)
      .on("mouseup", () => {
        isDragging = false;
        dragTarget = null;
      });
  }
} 