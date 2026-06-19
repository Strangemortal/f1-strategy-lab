# Project Rules

This document defines the development standards, architectural principles, and contribution guidelines for F1 Strategy Lab.

All contributors are expected to follow these rules to maintain consistency, code quality, and long-term maintainability.

---

# 1. Core Principles

### Build for Maintainability

Code should prioritize clarity and long-term maintainability over clever implementations.

Future contributors should be able to understand and modify features without extensive onboarding.

---

### Build for Contributors

Assume every module will eventually be touched by someone unfamiliar with the project.

Code should be self-explanatory, modular, and well-organized.

---

### Build One Feature at a Time

Features should be implemented incrementally.

Avoid combining multiple unrelated features into a single change.

---

### Avoid Premature Optimization

Prioritize correctness and simplicity before optimization.

Optimize only when performance bottlenecks are identified.

---

### Every Feature Must Have a Purpose

New functionality should solve a clearly defined problem and align with the project roadmap.

Avoid unnecessary complexity and feature bloat.

---

# 2. Architecture Rules

### Frontend Responsibilities

The frontend is responsible for:

- User Interaction
- Visualization
- State Management
- API Consumption

Business logic should not be duplicated in frontend components.

---

### Backend Responsibilities

The backend is responsible for:

- Data Processing
- Analytics
- Strategy Evaluation
- Recommendation Generation

Analytical logic belongs in services, not API routes.

---

### Service-Based Design

Every analytical feature should have a dedicated service.

Examples:

```text
telemetry_service.py
track_service.py
delta_service.py
strategy_service.py
recommendation_service.py
```

Services should remain focused on a single responsibility.

---

# 3. Development Order

New features should generally follow this sequence:

```text
Data
  ↓
Backend Services
  ↓
API Endpoints
  ↓
Frontend Components
  ↓
Documentation
```

This ensures the analytical foundation exists before user interfaces are built.

---

# 4. Commit Standards

Use conventional commit prefixes.

### Feature

```text
feat:
```

Example:

```text
feat: add lap delta analysis
```

### Bug Fix

```text
fix:
```

Example:

```text
fix: resolve telemetry loading issue
```

### Documentation

```text
docs:
```

Example:

```text
docs: add architecture diagram
```

### Refactoring

```text
refactor:
```

Example:

```text
refactor: simplify strategy service
```

### Maintenance

```text
chore:
```

Example:

```text
chore: update gitignore
```

---

# 5. Branch Naming

Use descriptive branch names.

### Features

```text
feature/<feature-name>
```

Example:

```text
feature/strategy-simulator
```

### Fixes

```text
fix/<issue-name>
```

Example:

```text
fix/telemetry-endpoint
```

### Documentation

```text
docs/<change-name>
```

Example:

```text
docs/day7-documentation
```

---

# 6. Coding Standards

### General

- Prefer readability over cleverness.
- Use meaningful names.
- Keep functions small and focused.
- Avoid unnecessary abstractions.
- Remove dead code.

---

### Frontend

- Use TypeScript.
- Prefer reusable components.
- Keep presentation separate from data fetching.
- Centralize API requests inside `lib/api.ts`.

---

### Backend

- Keep routes lightweight.
- Place business logic inside services.
- Return consistent JSON responses.
- Avoid duplicate processing logic.

---

# 7. Documentation Standards

Major features should include:

- Updated documentation
- API updates (if applicable)
- Architecture impact notes (if applicable)

Documentation should evolve alongside the codebase.

---

# 8. Pull Request Guidelines

Before opening a pull request:

- Verify functionality locally.
- Ensure code follows project conventions.
- Update documentation when necessary.
- Keep changes focused on a single objective.

Large unrelated changes should be split into separate pull requests.

---

# 9. Quality Standard

A contribution meets project standards when:

- The code is understandable by a first-time contributor.
- The feature solves a clearly defined problem.
- The implementation follows the existing architecture.
- Documentation remains accurate.
- Future extension remains possible.

---

# 10. Long-Term Goal

F1 Strategy Lab is being developed as a long-term open-source Formula 1 analytics platform.

Every contribution should support the project's goals of:

- Maintainability
- Extensibility
- Transparency
- Reusability
- Open Collaboration

When faced with multiple implementation choices, prefer the solution that is easiest for future contributors to understand and maintain.
