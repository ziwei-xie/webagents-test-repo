# Simple Hello World App

A minimal SAP BTP extension demonstrating a CAP backend with a simple HTML/React frontend that displays "Hello World".

## Business challenge

User asked to create a simple "Hello World" application to demonstrate project scaffolding and basic end-to-end app structure on SAP BTP.

## Key Milestones

- Project scaffolding created: CAP backend and frontend skeleton
- Basic endpoint implemented: /hello returning "Hello World"
- Frontend consumes endpoint and displays message
- Build and run locally

## Business Architecture (RBA)

### End-to-End Process

Development and Demonstration (not mapped to a specific SAP E2E process)

### Process Hierarchy

Development
└── Demonstration
    └── Hello World Application
        └── Backend Service
        └── Frontend UI

### Summary

A minimal demo application to validate development setup and show a simple end-to-end CAP + React app on BTP.

## Fit Gap Analysis

| Requirement (business) | Standard asset(s) found | Gap? | Notes / assumptions |
| ---------------------- | ----------------------- | ---- | ------------------- |
| Simple web app to display "Hello World" | N/A (custom demo) | No | Simple custom app sufficient |

### Key findings

- This is a minimal demo use case that does not require standard SAP products.
- Best implemented as a BTP extension with CAP and a React frontend.

## Recommendations

### Recommended approach

#### Executive Summary

Build a CAP Node.js service exposing a /hello endpoint and a React frontend that calls this endpoint and displays the message.

#### Recommended Solution

Use Cloud Application Programming Model (CAP) for the backend and React for the frontend. No external systems required. Deployable to SAP BTP as a single extension.

#### Recommended solution category

BTP Extension

#### Intent fit

90%
