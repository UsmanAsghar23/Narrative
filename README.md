# NFL Team Performance Narrative Visualization

A comprehensive D3.js-based interactive visualization that explores NFL team performance across multiple dimensions from 2002-2024.

## 📊 Overview

This project creates an engaging narrative visualization that tells the story of NFL team success through three distinct scenes, each offering unique insights into team performance patterns. The visualization moves from individual team analysis to comparative league-wide examination, ultimately revealing long-term playoff success patterns.

## 🎯 Key Features

### **Scene 1: Team Performance Analysis**
- Interactive line chart showing win percentage over time
- Color-coded playoff appearances (red for playoff years, blue for non-playoff)
- Annotations highlighting best and worst seasons
- Team selection dropdown for exploring different franchises

### **Scene 2: Offensive vs Defensive Performance**
- Scatter plot comparing all teams' offensive and defensive efficiency
- Circle size represents regular season wins
- Color coding indicates playoff qualification
- Annotations identify best offensive and defensive teams
- Year slider for exploring different seasons

### **Scene 3: Playoff Success Analysis**
- Horizontal bar chart ranking teams by playoff appearances
- Year range slider for examining different time periods
- Visual representation of sustained success patterns

## ��️ Technologies Used

- **D3.js v7** - Core visualization library
- **d3-annotation** - Annotation functionality
- **HTML5/CSS3** - Structure and styling
- **Vanilla JavaScript** - Application logic and state management

## 📁 Project Structure
```
D3/
├── Data/
│   ├── NFL_Playoff_Appearances_2002-2024.csv
│   ├── nfl_team_season_summary_2002_2024.csv
│   └── nfl_team_stats_2002-2024.csv
├── index.html
├── script.js
├── utils.js
├── controls.js
├── scene1.js
├── scene2.js
├── scene3.js
└── style.css
```



## �� Getting Started

1. **Clone the repository**
   ```bash
   git clone [your-repo-url]
   cd D3
   ```

2. **Open in a web server**
   - Due to CORS restrictions, you'll need to serve the files through a local web server
   - You can use Python's built-in server:
     ```bash
     python -m http.server 8000
     ```
   - Or use Node.js's http-server:
     ```bash
     npx http-server
     ```

3. **Access the visualization**
   - Open your browser and navigate to `http://localhost:8000`
   - The visualization will load with Scene 1 active

## �� How to Use

### **Navigation**
- **Top Circles**: Click to jump directly to any scene
- **Side Arrows**: Navigate sequentially between scenes
- **Active indicators**: Current scene is highlighted

### **Scene 1: Team Analysis**
- Use the team dropdown to select different franchises
- Hover over data points for detailed information
- Red dots indicate playoff appearances
- Annotations show best and worst seasons

### **Scene 2: League Comparison**
- Use the year slider to explore different seasons
- Hover over circles for team details
- Larger circles indicate more wins
- Annotations highlight best offensive and defensive teams

### **Scene 3: Historical Success**
- Use the year range slider to examine different time periods
- Hover over bars for detailed playoff information
- Teams are ranked by total playoff appearances

## �� Data Sources

- **Primary Dataset**: [NFL Team Stats 2002-2024 (ESPN)](https://www.kaggle.com/datasets/cviaxmiwnptr/nfl-team-stats-20022019-espn)
- **Playoff Data**: Custom compilation of playoff qualification data
- **Time Period**: 2002-2024 (22 seasons)

## 🎨 Design Features

### **Visual Consistency**
- Consistent color scheme across all scenes
- Red/blue encoding for playoff status
- Clear axis labels and instructions
- Smooth transitions between scenes

### **Interactive Elements**
- Hover tooltips with detailed information
- Responsive controls and navigation
- Dynamic annotations that update with parameter changes
- State preservation across scene transitions

### **Accessibility**
- Clear visual hierarchy
- Descriptive labels and instructions
- Keyboard-accessible navigation
- High contrast color schemes

## 🔧 Technical Implementation

### **Modular Architecture**
- **scene1.js**: Line chart implementation
- **scene2.js**: Scatter plot implementation  
- **scene3.js**: Bar chart implementation
- **controls.js**: UI control rendering
- **utils.js**: Shared utilities and navigation
- **script.js**: Main application logic

### **State Management**
- Centralized state object managing all parameters
- Reactive updates based on user interactions
- Parameter persistence across scene transitions

### **Data Processing**
- CSV data loading and preprocessing
- Dynamic filtering based on user selections
- Real-time calculations for annotations and statistics

## 📈 Key Insights

The visualization reveals several important patterns in NFL team performance:

1. **Temporal Variability**: Teams experience significant ups and downs over time
2. **Success Pathways**: Different teams achieve success through various strategies
3. **Sustained Excellence**: Some teams maintain high performance over extended periods
4. **League Evolution**: Offensive and defensive trends change across different eras

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

*Made for CS 416 Data Visualization*
