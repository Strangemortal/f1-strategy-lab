# Contributing

Thank you for your interest in contributing to F1 Strategy Lab.

Whether you are fixing bugs, improving documentation, building new analytics features, or enhancing the user interface, your contributions are welcome.

---

# Before You Start

Please familiarize yourself with the project documentation:

```text
docs/SRS.md
docs/USE_CASES.md
docs/DOMAIN_MODEL.md
docs/ARCHITECTURE.md
docs/API_REFERENCE.md
docs/TEAM_ONBOARDING.md
PROJECT_RULES.md
```

Understanding the architecture and development standards will make contributing significantly easier.

---

# Development Setup

## Clone the Repository

```bash
git clone <repository-url>
cd f1-strategy-lab
```

---

## Backend Setup

```bash
cd backend

python -m venv .venv

source .venv/bin/activate

pip install -r requirements.txt

uvicorn app.main:app --reload
```

Backend URL:

```text
http://localhost:8000
```

---

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

# Contribution Workflow

## 1. Create a Branch

```bash
git checkout -b feature/feature-name
```

Examples:

```bash
feature/sector-analysis
feature/race-search
fix/telemetry-endpoint
docs/readme-update
```

---

## 2. Implement Changes

Keep changes focused on a single objective.

Examples:

- One feature
- One bug fix
- One documentation improvement

Avoid combining unrelated changes.

---

## 3. Test Locally

Before committing:

- Verify backend functionality
- Verify frontend functionality
- Check for console errors
- Confirm API responses

---

## 4. Commit Changes

Follow the project's commit conventions.

### Feature

```text
feat:
```

Example:

```text
feat: add strategy simulation endpoint
```

### Bug Fix

```text
fix:
```

Example:

```text
fix: correct lap delta calculation
```

### Documentation

```text
docs:
```

Example:

```text
docs: add architecture diagram
```

### Refactor

```text
refactor:
```

Example:

```text
refactor: simplify telemetry service
```

### Maintenance

```text
chore:
```

Example:

```text
chore: update dependencies
```

---

## 5. Push Changes

```bash
git push origin <branch-name>
```

---

## 6. Open a Pull Request

When creating a pull request:

- Use a clear title
- Describe the problem being solved
- Describe the proposed solution
- Reference related issues when applicable

---

# Coding Standards

## Frontend

- Use TypeScript
- Prefer reusable components
- Keep components focused
- Avoid duplicated logic
- Centralize API calls inside `lib/api.ts`

---

## Backend

- Keep routes lightweight
- Place business logic inside services
- Follow the existing service architecture
- Return consistent JSON responses

---

## General

- Prefer readability over cleverness
- Use meaningful names
- Keep modules small
- Avoid unnecessary complexity

---

# Documentation

Documentation is considered a first-class contribution.

When introducing significant changes, update relevant documentation:

- README.md
- API_REFERENCE.md
- ARCHITECTURE.md
- SRS.md
- TEAM_ONBOARDING.md

If architecture or workflows change, update diagrams when necessary.

---

# Areas for Contribution

Contributors can help with:

### Frontend

- Dashboard Improvements
- User Experience
- Data Visualization
- Component Development

### Backend

- Analytics Services
- Strategy Logic
- Performance Improvements
- API Development

### Documentation

- Technical Documentation
- Tutorials
- Diagrams
- Contributor Guides

### Future Features

- Race Search
- Sector Analysis
- Strategy Simulation
- Pit Window Prediction
- AI-Assisted Analytics

---

# Code of Conduct

Be respectful, constructive, and collaborative.

Focus discussions on improving the project and helping contributors succeed.

---

# Questions

For questions, suggestions, or discussions:

- Open a GitHub Issue
- Start a GitHub Discussion
- Submit a Pull Request

---

# Thank You

F1 Strategy Lab is an open-source project built through community collaboration.

Every contribution, whether code, documentation, testing, or feedback, helps improve the platform.
