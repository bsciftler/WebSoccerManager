# WebSoccerManager

A narrative-driven high school soccer management game built with modern web technologies. Players take on the role of a high school soccer coach, managing their team through seasons while dealing with player personalities, academic challenges, and rivalries.

## 🎮 Game Concept

WebSoccerManager combines the strategic depth of sports management games with the rich storytelling of narrative games. Players must balance:

- **Team Management**: Tactics, training, and player development
- **Player Relationships**: Managing diverse personalities and team chemistry
- **Academic Pressure**: Ensuring players maintain grades while excelling on the field
- **Narrative Choices**: Making decisions that affect the story and team dynamics

## 🏗️ Project Structure

```
WebSoccerManager/
├── docs/                    # Project documentation and design docs
│   ├── Architecture.md     # System architecture overview
│   ├── DataModel.md        # Data structures and models
│   ├── Decisions.md        # Design decisions and rationale
│   ├── DetailedPlan.md     # Development roadmap
│   ├── DevelopmentSetup.md # Setup instructions
│   ├── EditorWorkflow.md   # Narrative editor usage
│   ├── Glossary.md         # Game terminology
│   ├── NarrativeEditor.md  # Editor documentation
│   ├── TagProtocol.md      # Ink tag system documentation
│   └── VerticalSlice.md    # MVP scope and deliverables
├── tools/
│   └── narrative-editor/   # Ink narrative editor tool
│       ├── src/           # React/TypeScript source code
│       ├── package.json   # Dependencies and scripts
│       └── README.md      # Editor-specific documentation
└── README.md              # This file
```

## 🛠️ Development Setup

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Git

### Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/bsciftler/WebSoccerManager.git
   cd WebSoccerManager
   ```

2. **Set up the narrative editor**
   ```bash
   cd tools/narrative-editor
   npm install
   npm run dev
   ```

3. **Access the editor**
   - Open your browser to `http://localhost:5173`
   - The narrative editor will be available for creating and testing Ink stories

## 🎯 Current Status

This project is in early development. The current focus is on:

- **Vertical Slice (Weeks 1-3)**: End-to-end gameplay loop with minimal UI
- **Narrative Editor**: Tool for creating and testing Ink stories
- **Core Systems**: State management, narrative integration, and basic match simulation

## 📚 Documentation

- [Architecture Overview](docs/Architecture.md)
- [Development Setup](docs/DevelopmentSetup.md)
- [Narrative Editor Guide](docs/NarrativeEditor.md)
- [Vertical Slice Plan](docs/VerticalSlice.md)

## 🎨 Technology Stack

- **Frontend**: React, TypeScript, Vite
- **Narrative Engine**: Ink (via inkjs)
- **Game Engine**: Phaser (planned)
- **Build Tool**: Vite
- **Package Manager**: npm

## 🤝 Contributing

This is a personal project, but suggestions and feedback are welcome. Please refer to the documentation in the `docs/` directory for development guidelines.

## 📄 License

This project is for educational and personal use.

---

*WebSoccerManager - Where strategy meets storytelling on the soccer field*
