// Main application state and initialization
const state = {
  scene: 0, // 0: Win/Loss, 1: Offense/Defense, 2: Playoff Map
  selectedTeam: null,
  selectedYear: 2023,
  yearRange: [2002, 2024], 
  teams: [],
  years: [],
  data: [],
  playoffData: {},
};

const sceneTitles = [
  "Team Win/Loss Trends",
  "Offense vs. Defense",
  "Playoff Appearances"
];

// Load Data and Initialize Visualization
d3.csv("Data/nfl_team_season_summary_2002_2024.csv").then(raw => {
  
  // Preprocess data from the summary file
  const teamYearStats = raw.map(d => ({
    team: d.Team,
    season: +d.Season,
    wins: +d.Wins,
    losses: +d.Losses,
    pointsFor: +d.PointsFor,
    pointsAgainst: +d.PointsAgainst,
    playoff: d.MadePlayoffs === "1" || d.MadePlayoffs === "True" || d.MadePlayoffs === true
  }));

  // Debug: Check playoff data for recent years
  const recentData = teamYearStats.filter(d => d.season >= 2020);
  console.log("Recent playoff teams (2020+):", recentData.filter(d => d.playoff).map(d => `${d.team} (${d.season})`));

  // Build playoff appearances data
  const playoffAppearances = {};
  const years = new Set();
  const teams = new Set();

  teamYearStats.forEach(stat => {
    years.add(stat.season);
    teams.add(stat.team);
    
    if (stat.playoff) {
      if (!playoffAppearances[stat.team]) playoffAppearances[stat.team] = [];
      playoffAppearances[stat.team].push(stat.season);
    }
  });

  // Prepare state
  state.data = teamYearStats;
  state.teams = Array.from(teams).sort();
  state.years = Array.from(years).sort((a, b) => a - b);
  state.selectedTeam = state.teams[0];
  state.selectedYear = state.years[state.years.length - 1];
  state.playoffData = playoffAppearances;

  renderControls();
  renderCurrentScene();
  setupNav();
});