# Hello World — CAP + React on SAP BTP

A minimal SAP BTP extension demonstrating an end-to-end full-stack application built with the **SAP Cloud Application Programming Model (CAP)** backend and a **React** frontend using **SAP UI5 Web Components**.

## Overview

This solution provides a simple "Hello World" reference application that showcases:

- **CDS Data Modeling** — A `Greetings` entity with auto-generated UUIDs and sample data
- **OData V4 Service** — CRUD operations exposed via the `HelloService`
- **Custom CAP Function** — A `greet(name)` function returning personalized greeting messages
- **React Frontend** — A Vite-based UI using SAP UI5 Web Components to consume the CAP backend

It serves as a starting point for developers exploring the CAP + React technology stack on SAP BTP.

## Architecture

```
┌─────────────────────────────────────────────┐
│                  Solution                   │
│                                             │
│  ┌────────────────────────────────────────┐ │
│  │        hello-world (CAP Asset)         │ │
│  │                                        │ │
│  │  ┌──────────┐       ┌──────────────┐  │ │
│  │  │  React   │ HTTP  │  CAP Node.js │  │ │
│  │  │ Frontend │──────▶│   Backend    │  │ │
│  │  │ (UI5 WC) │       │ (OData V4)  │  │ │
│  │  └──────────┘       └──────┬───────┘  │ │
│  │                            │           │ │
│  │                     ┌──────▼───────┐  │ │
│  │                     │   SQLite /   │  │ │
│  │                     │   SAP HANA   │  │ │
│  │                     └──────────────┘  │ │
│  └────────────────────────────────────────┘ │
└─────────────────────────────────────────────┘
```

## Project Structure

```
.
├── solution.yaml                    # Solution descriptor
├── package.json                     # Root package.json
├── assets/
│   └── hello-world/                 # CAP application asset
│       ├── asset.yaml               # Asset descriptor
│       ├── package.json             # CAP dependencies
│       ├── .cdsrc.json              # CDS configuration
│       ├── custom_build.sh          # Custom build script
│       ├── db/
│       │   ├── schema.cds           # Data model (Greetings entity)
│       │   └── data/
│       │       └── hello.world-Greetings.csv   # Sample data
│       ├── srv/
│       │   ├── hello-service.cds    # Service definition
│       │   └── hello-service.js     # Custom service handler
│       ├── app/
│       │   └── index.html           # Static entry point
│       └── ui/
│           ├── package.json         # Frontend dependencies
│           ├── vite.config.js       # Vite configuration
│           └── src/
│               ├── main.jsx         # React entry point
│               └── App.jsx          # Main App component
```

## Data Model

The solution defines a single `Greetings` entity:

| Field     | Type         | Description                      |
| --------- | ------------ | -------------------------------- |
| `ID`      | UUID (cuid)  | Auto-generated unique identifier |
| `name`    | String(100)  | Name for the greeting (default: `World`) |
| `message` | String(200)  | The greeting message             |

Three sample records are provided: _World_, _SAP_, and _BTP_.

## API Endpoints

The `HelloService` is exposed at `/api/hello` and provides:

| Endpoint | Method | Description |
| -------- | ------ | ----------- |
| `/api/hello/Greetings` | GET | List all greetings |
| `/api/hello/Greetings` | POST | Create a new greeting |
| `/api/hello/Greetings({ID})` | GET | Read a single greeting |
| `/api/hello/Greetings({ID})` | DELETE | Delete a greeting |
| `/api/hello/greet(name='<value>')` | GET | Returns a personalized greeting string |

### Example

```
GET /api/hello/greet(name='Developer')
→ "Hello Developer!"
```

## Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9
- **SAP CDS CLI** (`@sap/cds-dk` ≥ 8)

Install the CDS CLI globally if you haven't already:

```bash
npm install -g @sap/cds-dk
```

## Getting Started

### 1. Install Dependencies

```bash
# Install root dependencies
npm install

# Install CAP backend dependencies
cd assets/hello-world
npm install

# Install React frontend dependencies
cd ui
npm install
cd ..
```

### 2. Run Locally

**Option A — Backend only (with static app/index.html):**

```bash
cd assets/hello-world
cds watch
```

The CAP server starts on [http://localhost:4004](http://localhost:4004).

**Option B — Full stack with React dev server:**

In one terminal, start the CAP backend:

```bash
cd assets/hello-world
cds watch
```

In another terminal, start the React dev server:

```bash
cd assets/hello-world/ui
npm run dev
```

The React frontend runs on [http://localhost:5173](http://localhost:5173) and proxies API calls to the CAP server.

### 3. Build the Frontend

To build the React app and output it into the `app/` directory for CAP to serve:

```bash
cd assets/hello-world/ui
npm run build
```

## Deployment

This solution is configured for deployment to **SAP App Foundation**. The `solution.yaml` and `asset.yaml` descriptors define the deployment configuration.

The CAP server runs on port **4004** as specified in the asset descriptor.

## Technology Stack

| Layer     | Technology |
| --------- | ---------- |
| Backend   | SAP CAP Node.js (CDS 8, Express 4) |
| Frontend  | React 18, Vite 5, SAP UI5 Web Components 2 |
| Database  | SQLite (local) / SAP HANA (production) |
| Protocol  | OData V4 |

## License

This project is proprietary. All rights reserved.
