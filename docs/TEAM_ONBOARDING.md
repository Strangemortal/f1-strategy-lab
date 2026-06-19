# Team Onboarding Guide

## Welcome to F1 Strategy Lab

F1 Strategy Lab is an open-source Formula 1 analytics platform focused on telemetry visualization, race strategy analysis, and performance evaluation.

The project combines modern web technologies with Formula 1 telemetry data to create an interactive analytical environment for motorsport enthusiasts, developers, students, and researchers.

---

# 1. Project Vision

The long-term goal of F1 Strategy Lab is to become a comprehensive race engineering and strategy analysis platform.

Users should be able to:

- Explore race sessions
- Compare drivers
- Analyze telemetry
- Visualize circuits
- Evaluate race strategies
- Simulate alternative outcomes
- Generate strategic insights

---

# 2. Current Capabilities

### Backend Features

- Race Information Retrieval
- Telemetry Analysis
- Track Visualization
- Lap Delta Analysis
- Strategy Analysis
- Recommendation Generation

### Frontend Features

- Driver Selection
- Metric Selection
- Telemetry Charts
- Track Heatmaps
- Lap Delta Charts
- Strategy Cards
- Recommendation Cards

---

# 3. Technology Stack

## Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- Plotly

## Backend

- Python
- FastAPI
- FastF1

## Development Tools

- Git
- GitHub

---

# 4. Project Structure

```text
f1-strategy-lab/
│
├── backend/
├── frontend/
├── data/
├── docs/
└── README.md
```

### Backend

Contains API routes, analytical services, and FastF1 integrations.

### Frontend

Contains the user interface, visualizations, and interactive dashboard components.

### Data

Stores cached and processed race data.

### Docs

Contains project documentation and supporting diagrams.

---

# 5. Local Development Setup

## Clone Repository

```bash
git clone <repository-url>
cd f1-strategy-lab
```

## Backend Setup

```bash
python -m venv .venv

source .venv/bin/activate

pip install -r requirements.txt

uvicorn app.main:app --reload
```

Backend URL:

```text
http://localhost:8000
```

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend URL:

```text
http://localhost:3000
```

---

# 6. Development Workflow

### Create a Branch

```bash
git checkout -b feature/feature-name
```

### Implement Changes

Develop and test functionality locally.

### Commit Changes

```bash
git add .

git commit -m "feat: description"
```

### Push Changes

```bash
git push origin feature/feature-name
```

### Open a Pull Request

Submit changes for review and discussion.

---

# 7. Coding Guidelines

### Frontend

- Use TypeScript
- Prefer reusable components
- Keep components focused and maintainable
- Avoid duplicated logic

### Backend

- Follow the service-based architecture
- Keep routes lightweight
- Place business logic inside services
- Return consistent JSON responses

### General

- Write readable code
- Use meaningful naming
- Keep modules small
- Prioritize simplicity and maintainability

---

# 8. Roadmap

### Near Term

- Dynamic Race Search
- Session Selection
- Multi-Race Support

### Mid Term

- Track-Centric Dashboard
- Driver Focus Mode
- Expanded Analytics Layout

### Long Term

- Strategy Simulation Engine
- Pit Window Prediction
- AI-Assisted Strategy Analysis
- Advanced Race Engineering Tools

---

# 9. Contributing

Contributions are welcome across multiple areas:

### Frontend

- User Interface Improvements
- Dashboard Enhancements
- Data Visualization

### Backend

- Analytics Services
- Strategy Logic
- Performance Optimization
- API Development

### Documentation

- Guides
- Tutorials
- Architecture Notes
- Diagrams

---

# 10. License

F1 Strategy Lab is licensed under the GNU Affero General Public License v3.0 (AGPL-3.0).

All contributions are distributed under the same license.

---

# 11. Summary

F1 Strategy Lab follows a modular architecture designed for long-term growth and extensibility.

Contributors are encouraged to focus on:

- Maintainability
- Reusability
- Simplicity
- Scalability

The goal is to build an open-source Formula 1 analytics platform capable of evolving into a complete race engineering and strategy analysis ecosystem.
