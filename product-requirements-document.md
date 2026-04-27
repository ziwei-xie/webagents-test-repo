# Product Requirements Document (PRD)

**Title:** Hello World App  
**Date:** 2026-04-24  
**Owner:** Solution Team  
**Solution Category:** BTP Extension

## Product Purpose & Value Proposition

**Elevator Pitch:**  
A minimal SAP BTP extension that demonstrates end-to-end project scaffolding — a CAP Node.js backend exposing a Greetings service consumed by a React frontend with SAP UI5 Web Components.

**Business Need:**  
Developers and architects need a lightweight reference application that validates the development setup and demonstrates a working CAP + React stack on SAP BTP. This serves as a starting point for more complex applications.

**Expected Value:**  
Accelerates onboarding for new BTP developers by providing a working, deployable example that covers data modeling, OData service exposure, and frontend consumption.

**Product Objectives (Prioritized):**
1. Provide a fully working CAP backend with a Greetings entity and a custom `greet()` function
2. Deliver a React frontend that consumes the backend and allows CRUD operations on greetings
3. Serve as a deployable reference for SAP BTP extension development

## User Profiles & Personas

### Primary Persona: BTP Developer

A developer exploring SAP BTP and the Cloud Application Programming Model. They need a working example to understand how CAP services, data models, and React frontends connect. Comfortable with JavaScript/Node.js but new to the CAP framework. They want to get a running app quickly without spending hours on boilerplate setup.

### Secondary Persona: Solution Architect

An architect evaluating the CAP + React technology stack for a larger project. They want to see a clean, minimal example of the architecture pattern before committing to it for a production solution.

## Requirements

### Must-Have Requirements

**R1**: Greetings Data Model

- **Problem to Solve**: Need a persistent data entity to demonstrate CDS modeling and OData exposure.
- **User Story**: As a developer, I need a Greetings entity with sample data so that I can see how CDS models translate to OData services.
- **Acceptance Criteria**:
  - Given the app is running, when I call `GET /odata/v4/hello/Greetings`, then I receive a list of greeting records
- **Maps to Objective**: 1
- **Priority Rank**: 1

**R2**: Custom Greet Function

- **Problem to Solve**: Need to demonstrate custom CAP service handlers beyond basic CRUD.
- **User Story**: As a developer, I need a `greet(name)` function so that I can understand how custom actions/functions work in CAP.
- **Acceptance Criteria**:
  - Given the app is running, when I call `GET /odata/v4/hello/greet(name='World')`, then I receive a personalized greeting message
- **Maps to Objective**: 1
- **Priority Rank**: 2

**R3**: React Frontend with UI5 Web Components

- **Problem to Solve**: Need a frontend that demonstrates consuming a CAP OData service.
- **User Story**: As a developer, I need a React UI that displays greetings and allows me to create and delete them, so that I can see the full-stack pattern.
- **Acceptance Criteria**:
  - Given the frontend is loaded, when I enter a name and click greet, then a personalized greeting is displayed
  - Given the frontend is loaded, when I create a new greeting, then it appears in the list
  - Given a greeting exists, when I click delete, then it is removed from the list
- **Maps to Objective**: 2
- **Priority Rank**: 3

**R4**: Local Development Experience

- **Problem to Solve**: Developers need to run and test the app locally before deploying.
- **User Story**: As a developer, I need to run the full stack locally so that I can iterate quickly during development.
- **Acceptance Criteria**:
  - Given I run `cds watch`, when the server starts, then both the backend and frontend are accessible locally
- **Maps to Objective**: 3
- **Priority Rank**: 4

## Solution Architecture

**Architecture Overview:**  
A single CAP Node.js application with an embedded React frontend. The backend exposes OData V4 services; the frontend is built with Vite and served alongside the CAP server.

**Key Components:**

- CAP Node.js backend: CDS data model, OData service, custom handler
- React frontend: Vite-based app using SAP UI5 Web Components
- SQLite (local) / SAP HANA (deployed): persistence layer

## Schedule & Timeline Context

**Key Milestones:**

### [M1]: Project Scaffolding

- **Description**: CAP backend and React frontend skeleton created
- **Achieved when**: Project structure exists with package.json, CDS model, and UI folder

### [M2]: Backend Service Operational

- **Description**: Greetings OData service and greet() function working
- **Achieved when**: API calls return expected data and greeting messages

### [M3]: Frontend Integrated

- **Description**: React UI consumes the CAP backend successfully
- **Achieved when**: User can create, view, and delete greetings via the UI

### [M4]: Local Run Validated

- **Description**: Full stack runs locally via `cds watch`
- **Achieved when**: Both backend and frontend are accessible and functional in a local environment
