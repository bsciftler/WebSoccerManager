

# **Architecting Agency: A Technical Blueprint for Developing State-Driven Narrative RPGs**

## **Part I: Deconstructing the Narrative-as-Mechanic Paradigm: A *Suzerain* Case Study**

The enduring appeal of narrative-driven role-playing games like *Suzerain* lies not in the complexity of their stories alone, but in the sophisticated architecture that underpins player agency. These games succeed by treating narrative not as a decorative layer applied over mechanics, but as the primary mechanic itself.1 The player's interface for interacting with the game's complex systems is dialogue, choice, and consequence. To construct a similar experience, it is essential to first deconstruct this paradigm, understanding the design patterns that transform a political simulation into a deeply personal drama. This analysis will use

*Suzerain* as a case study to establish the foundational principles of state-driven narrative design, which will then be applied to the development of the proposed title, "Friday Night Underdogs."

### **1.1 The Illusion of the Spreadsheet: Masking Systemic Complexity**

At its core, *Suzerain* is a resource management game. The player must balance a complex set of interconnected variables, including the national budget, government debt, public opinion, economic development, and the stability of various state institutions.2 In a traditional strategy or management game, these variables would be presented to the player directly through spreadsheets, charts, and dense user interface panels.1 The primary gameplay loop would involve the direct manipulation of these numbers.

*Suzerain*'s critical design innovation is to make this underlying systemic complexity almost entirely opaque to the player.4

The game achieves this through two interconnected techniques: **abstraction** and **diegetic feedback**. Instead of interacting with a budget menu, the player interacts with their finance minister in a dialogue scene. The minister presents a problem, outlines several potential solutions, and explains their costs and potential benefits.2 The choice is presented as a human conversation, laden with political nuance and personal stakes, but its ultimate function is to modify the variables in the hidden state machine. Similarly, the consequences of these decisions are not delivered as a simple

\+5% Public Opinion notification. Instead, the player reads a newspaper article from a particular political perspective, receives a concerned memo from a cabinet member, or sees a report on regional developments.4 This is diegetic feedback—information delivered naturally through the game's world and characters rather than through an abstract user interface.

This approach creates a more "believable and challenging" experience because it mirrors the ambiguity of real-world leadership.2 A player, like a real president, must make critical decisions based on the advice of others, who may have their own biases, hidden agendas, or incomplete information.1 The player does not know the "real" repercussions of any choice with certainty; they only have the opinions of their ministers.2 This intentional opacity transforms the game from a mathematical optimization problem into an exercise in judgment, trust, and political navigation. The player's primary challenge is not to solve a spreadsheet but to interpret qualitative information and manage human relationships. This design philosophy is already present in the "Friday Night Underdogs" Game Design Document (GDD), which proposes delivering information via emails and messages in the "Morning Briefing" rather than through raw stat screens, a strong foundation upon which to build.5

### **1.2 The Personal is Political: Character-Driven Interaction as the Core Loop**

The central gameplay loop of *Suzerain* does not revolve around map-painting or unit management, but around attending meetings and navigating conversations.2 The game's design posits that politics is, at its most fundamental level, a "deeply personal struggle between people".1 The player's success or failure is almost entirely contingent on their ability to manage relationships with key figures: cabinet ministers, party leaders, oligarchs, military generals, and foreign diplomats.7 Passing a constitutional reform, for example, is not a matter of simply having enough "political points"; it requires securing the support of specific individuals and factions through persuasion, compromise, backroom deals, or even corruption and intimidation.1

This design elevates characters from being mere quest-givers or sources of exposition to being integral components of the mechanical and narrative structure. They function as dynamic gates within the game's branching paths. A narrative branch is not simply gated by a resource check, such as if (budget \> 5), but by a complex combination of resource and relationship checks, such as if (Gloria\_Tory\_support \> 50 AND budget \> 5). Gloria Tory, the conservative Speaker of the Assembly, is not just a character; she is a personified lock that the player must find the correct key to open. This key might be a policy concession, a respectful dialogue choice, or a political threat, each of which modifies a hidden relationship variable.

This character-centric approach is the engine of the game's political drama. It forces the player to consider the human element of every decision. A policy that is economically sound may be politically impossible if it alienates a powerful ally. Conversely, a corrupt deal with an oligarch might provide the necessary funds or political backing to achieve a greater good. These choices are compelling precisely because they are not abstract; they are filtered through the lens of personal relationships and their consequences. The "Friday Night Underdogs" GDD intuits this powerful design pattern with its "Individual Focus" action, which allows the coach to "Mentor," "Counsel," or "Discipline" a specific player.5 This system is a direct parallel to President Rayne's cabinet meetings. To fully realize its potential, the outcomes of these interactions must go beyond simple stat modifications. An effective "Counsel" action should not only increase a player's

Morale stat but also increment a hidden variable like marco\_trust or leo\_loyalty, which can then be used to unlock unique dialogue options or event pathways later in the game.

### **1.3 The Web of Consequences: Delayed, Interconnected State Changes**

A hallmark of *Suzerain*'s design is its emphasis on long-term, often unforeseen, consequences. Players frequently report that the effects of their choices are "unclear and long-term," making a successful first playthrough exceptionally difficult.9 A decision that seems minor in the first turn, such as which construction company to award a state contract, can have cascading effects that determine which foreign powers are willing to ally with Sordland, which economic synergies become available, or even who will attempt to launch a coup d'état in the final turns.9 This intricate web of cause and effect is what gives the game its significant replayability and its reputation for narrative depth.

The technical implementation of this design rests on a robust and meticulously managed system of **flags and conditional triggers**. A flag is, in its simplest form, a boolean variable that records a choice has been made (e.g., FLAG\_sided\_with\_Underhall\_Construction \= true). When the player makes a key decision, the game sets one or more of these flags in its central state machine. Crucially, this flag may have no immediate, observable effect. Its purpose is to serve as a check for a future event. Much later in the game, the script for a different event will contain a conditional check, such as if (FLAG\_sided\_with\_Underhall\_Construction \== true). If the condition is met, a unique dialogue option, a specific story branch, or a sudden crisis may be triggered that would otherwise be unavailable. This creates the "delayed story choice" dynamic that is a cornerstone of modern interactive fiction and is correctly identified as a design goal in the user's GDD.5

This system is the primary mechanism for ensuring narrative coherence and preventing choices from "clashing." A narrative clash occurs when the game presents the player with a choice or a piece of information that contradicts a previous action. For example, it would be a clash for the game to offer an alliance with the nation of Agnolia if the player has previously made decisions that have made Agnolia irrevocably hostile. By gating the alliance option behind a series of prerequisite flags (if (FLAG\_recognized\_island\_sovereignty \== true AND FLAG\_did\_not\_trade\_with\_Valgsland \== true)), the system ensures that the narrative path remains logically consistent. The game does not need to "remember" in an abstract sense; it simply checks the flags that constitute the unique history of that specific playthrough. Every significant choice contributes to this history, weaving a complex but coherent tapestry of consequences.

### **1.4 The "Imperfect Run": Designing for Meaningful Trade-offs**

A consistent theme in player discussions of *Suzerain* is the feeling that a "perfect run" is impossible and that one will "always lose out somewhere".1 The game is designed to be a series of difficult compromises. It constantly presents the player with choices that pit their ideological ideals against pragmatic realities, or their personal morality against the perceived good of the nation.1 A player can attempt to govern as a democratic, peaceful reformist, but the game consistently offers more expedient paths to success through corruption, authoritarianism, or political strong-arming.1 This is not a design flaw but a deliberate and central pillar of the game's philosophy: meaningful choice requires meaningful trade-offs.

In *Suzerain*, this principle is implemented by tying desirable outcomes to mutually exclusive resources or by forcing the player to choose between opposing factions. The most obvious resource is the national budget; the player simply does not have enough money to fully fund healthcare, education, law enforcement, and the military simultaneously, forcing them to prioritize and accept the negative consequences of underfunding certain sectors.3 A more nuanced resource is political capital. Enacting policies that appease the conservative "Old Guard" and their leader, Tarquin Soll, will inevitably alienate the reformist wing of the party and the progressive justices on the Supreme Court. It is mechanically impossible to keep all factions happy simultaneously. Every major decision is therefore an exercise in opportunity cost; choosing one path necessarily closes off another.

The "Friday Night Underdogs" GDD contains an excellent microcosm of this design philosophy in its **Duality Trait System**.5 This system, which assigns each player a powerful positive trait and a challenging negative trait, is the perfect engine for creating these kinds of meaningful trade-offs. The decision to recruit "The Prodigy," a brilliant striker, is not a simple calculation of his high stats. The player must also accept the cost of his "Arrogant" trait, which will lower team chemistry and potentially cause narrative conflicts that will require the coach's time and attention to manage.5 This design transforms a simple roster management task into a complex strategic and narrative decision. The report will recommend extending this philosophy of trade-offs and opportunity costs to all major systems in the game. For instance, the Action Point (AP) system is a powerful tool for enforcing this. By giving the coach a limited number of AP per week, the game forces a choice: spending an AP on "Game Planning" to gain a tactical advantage means forgoing the opportunity to use that AP on "Individual Focus" to manage a player's personal crisis. This constant need to prioritize, driven by systems of mutually exclusive choices, is what will make the decisions in "Friday Night Underdogs" feel as weighty and consequential as those in

*Suzerain*.

## **Part II: A Blueprint for "Friday Night Underdogs": Applying the Paradigm**

The provided Game Design Document for "Friday Night Underdogs" demonstrates a strong understanding of the principles that make narrative RPGs compelling. It outlines several core systems—the Duality Trait System, the Dynamic Event System, and the Coach's Philosophy Tree—that serve as an excellent foundation for a *Suzerain*\-like experience.5 This section will provide a detailed analysis of these systems, validating their design and offering concrete architectural recommendations to ensure they are implemented in a robust, scalable, and narratively coherent manner.

### **2.1 Architecting the Narrative State Machine**

The foundation of any state-driven narrative game is its state machine—the collection of all variables that define the current status of the game world, its characters, and the player's progress. The GDD for "Friday Night Underdogs" already identifies the key components of this machine: Player Attributes (Soccer Skills, Morale, Fatigue, Chemistry), Coach Attributes (Archetype, Philosophy Points), and Team-wide Stats.5 These are the raw data that the game's systems will read from and write to.

To ensure narrative coherence and prevent the "clashing" of choices, these variables must be managed centrally and systematically. The recommended approach is to create a central StateManager class within the game's code. This object will act as the single source of truth for the entire game state. It will be responsible for initializing, tracking, and modifying all critical variables. Any other system in the game—the event system, the match engine, the UI—that needs to know or change the state of the world will do so by making requests to the StateManager.

The most critical initial step in development is not to write a single line of dialogue, but to create a comprehensive catalogue of every variable the game needs to track. This process forces a level of design clarity that is essential for complex narratives. A "clash" occurs when the game's state is ill-defined or improperly tracked. For example, if a player's morale is merely a narrative concept rather than a concrete, stored variable, the game cannot react to it consistently. By defining marco\_morale as an integer variable ranging from 0 to 100, a concrete piece of state is created. This variable can then be reliably checked and modified by any other system, from a dialogue choice in an "Individual Focus" scene to the outcome of a play in the match engine, ensuring consistency across the entire experience. This catalogue of variables becomes the blueprint for the StateManager and the bedrock upon which the entire narrative is built.

### **2.2 The Duality Trait System as a Narrative Engine**

The GDD correctly identifies the Duality Trait System as the game's "central mechanical and narrative engine" and a key driver of "emergent narrative".5 The examples provided, such as the "Prodigy/Arrogant" and "Captain/Academically Ineligible" archetypes, are perfectly designed to create the kind of meaningful trade-offs seen in

*Suzerain*.5 To fully realize the potential of this system, it is crucial that traits are implemented as active components of the game's logic, not merely as passive stat modifiers.

Each trait should function as a hook into other game systems, particularly the dialogue and event systems.

* **Positive Traits** should act as gates, unlocking unique capabilities for the player. A player with the "Natural Leader" trait, for instance, could enable a unique dialogue option for the coach during a halftime team talk. The script for that scene would check for the presence of the trait (if (player\_has\_trait('Natural Leader'))) and display the option only if the condition is met. This makes the trait a tangible tool that shapes narrative interactions.  
* **Negative Traits** should function as active event triggers. These traits should not just impose a statistical penalty; they should be a source of conflict that consumes player resources. A player with the "Hot-Headed" trait should have a higher probability of causing a "Team Conflict" event to be selected from the pool of potential random events for that week. The "Academically Ineligible" trait is a prime candidate for a dedicated, multi-stage scripted event chain. The first time the player's grades slip, it could trigger a warning email from a teacher. If the problem persists, it could escalate to a meeting with the principal, forcing the coach to spend valuable Action Points to resolve the situation.

This implementation transforms the recruitment process from a simple stat comparison into the "complex act of strategic and narrative curation" envisioned by the GDD.5 The talent provided by a player's positive trait becomes a resource that is "purchased" with the ongoing cost of managing the problems created by their negative trait. This constant balancing act—weighing talent against trouble—forms a compelling core gameplay loop that is deeply personal and story-driven.

### **2.3 The Dynamic Event System: From Triggers to Consequences**

The Dynamic Event System, as outlined in the GDD, is the heart of the game's RPG experience. It is the mechanism through which the game world reacts to the player's choices and the evolving state of the team. The document's proposal for a system with multiple trigger types (Game Progression, Player Performance, Player Traits, and Coach's Actions) is sophisticated and robust.5 The key to a successful implementation is a tight, clear architectural loop that connects the game state to the event system.

The recommended architectural pattern is as follows:

1. **Event Pool:** All possible events in the game are stored in a database (e.g., a JSON file). Each event object contains its narrative text, its trigger conditions, the choices it offers the player, and the consequences of each choice.  
2. **Event Triggering:** At a designated point in the gameplay loop (e.g., the start of a new week), the system iterates through the event pool. It compares the trigger conditions of each event against the current game state stored in the StateManager. For example, an event might have the trigger condition week \> 5 AND leo\_grades \< 50\. If the current game state matches these conditions, the event is added to a list of potential events for that week.  
3. **Event Execution:** The game selects one or more triggered events to present to the player. The player is shown the narrative text and is prompted to make a choice.  
4. **Consequence Application:** The player's selected choice dictates which consequences are applied. These consequences are instructions to modify the game state. For example, choosing to "Tutor Leo personally" would instruct the StateManager to update multiple variables: leos\_grades \+= 10, coach\_ap \-= 1, and FLAG\_coach\_tutored\_leo \= true.

This loop—**State \-\> Triggers Event \-\> Player Choice \-\> Modifies State**—is the fundamental engine of a state-driven narrative. The GDD's example of defending a player in Week 3 to unlock a special dialogue option in Week 8 is a perfect illustration of this system's power to create delayed consequences.5 This is implemented by the choice in Week 3 setting a flag. The dialogue option in Week 8 is then wrapped in a conditional check for that flag. By ensuring that nearly every significant choice modifies the state in some way (by changing a numerical variable or setting a boolean flag), the game builds a unique, persistent history for each playthrough. This history is then constantly referenced by the event system to create a narrative that feels genuinely reactive and personalized.

### **2.4 The Coach's Philosophy Tree: Gating and Modifying Gameplay**

The Coach's Philosophy Tree is an excellent system for providing a sense of progression and specialization for the player's own character, mirroring the importance of the player-character's background and ideology in *Suzerain*.5 To maximize its impact, the perks unlocked within this tree should directly influence the coach's narrative and mechanical capabilities in two distinct ways.

1. **Passive Modifiers:** Some perks should provide direct, ongoing statistical bonuses. For example, unlocking a skill in the "Mentor" branch could provide a permanent \+15% bonus to the effectiveness of the "Mentor" action, or unlocking a skill in the "Tactician" branch could provide more detailed information in scouting reports. These are simple modifications to the underlying variables that govern gameplay outcomes.  
2. **Active Gates:** More significantly, many perks should function as active gates that unlock entirely new options for the player. Unlocking a high-level "Motivator" perk should not just make the "Counsel" action more effective; it should set a flag like coach\_has\_master\_motivator\_perk \= true. This flag can then be used in the scripts for dialogue scenes to unlock special, powerful, and potentially game-altering choices that would otherwise be hidden. For instance, a coach with this perk might be able to prevent a player from quitting the team during a crisis, an option unavailable to a coach who has specialized in tactics instead.

This dual approach ties the player's RPG progression directly to their narrative toolkit. Leveling up is not just about increasing numbers; it is about expanding the range of possible actions and interactions. A "Mentor"-focused coach will experience and shape the story in a fundamentally different way than a "Tactician"-focused coach, as they will have access to a different set of narrative tools for resolving the conflicts that arise. This design choice dramatically enhances the game's replayability, encouraging players to explore different coaching philosophies to see how the story and the lives of their players unfold differently.

## **Part III: The Narrative Designer's Toolkit: A Comparative Analysis**

Selecting the appropriate tools is a critical decision that will shape the entire development workflow of a narrative-heavy game. The ideal toolkit should not only facilitate the writing of branching dialogue but also provide robust mechanisms for managing the complex web of state variables, flags, and conditional logic that underpins a reactive narrative. This section provides a comparative analysis of industry-standard tools, culminating in a specific, justified recommendation for the development of "Friday Night Underdogs."

### **3.1 Conceptualization & Prototyping Tools**

In the early stages of development, the focus is on rapidly exploring narrative structures and testing the flow of conversations.

* **Twine:** As a free, open-source, and browser-based tool, Twine is exceptionally accessible and is a popular choice for rapid prototyping.13 Its core strength lies in its visual, node-based editor, which allows designers to quickly map out branching conversations by creating "passages" of text and linking them together.14 This visual representation is intuitive for simple structures. However, for a game with the systemic complexity of "Friday Night Underdogs," this visual approach can become a significant liability. As the number of branches, variables, and conditional checks grows, the visual graph can devolve into an unmanageable tangle of nodes and connections, often referred to as "spaghetti".16 While its more advanced story format, SugarCube, offers powerful scripting capabilities based on JavaScript, the fundamental challenge of visually managing a highly complex, state-driven narrative remains.17  
* **Articy:Draft:** This is a professional, commercial-grade, all-in-one narrative design environment.18 It integrates a visual flow editor for branching dialogue with a powerful object database for managing characters, items, and other game entities, and even includes a location editor.20 Its strength lies in its highly structured, database-driven approach, which makes it an excellent "single source of truth" for large teams. It includes features like customizable templates, a built-in scripting language, and robust simulation tools for testing logic without leaving the application.20 However, Articy:Draft has a steeper learning curve, can feel overwhelming for solo developers, and is a paid product.22 Most critically for this project, its official engine integrations are focused on Unity and Unreal.24 While it can export to generic formats like JSON, there is no direct, officially supported importer for the Phaser 3 engine, which would necessitate significant custom development work.  
* **Spreadsheets (Google Sheets / Excel):** While unconventional as a primary writing tool, spreadsheets are surprisingly powerful for organizing the vast amounts of data inherent in a narrative RPG.27 They are ideal for managing lists of characters, their stats, items, and even raw dialogue lines, especially when dealing with localization into multiple languages.28 A well-structured spreadsheet can define event triggers, conditions, and effects in a tabular format, which can then be exported as a CSV or JSON file for the game engine to parse and use.27 Their primary weakness, however, is that they are completely unsuitable for visualizing narrative flow or for the creative process of writing branching dialogue. They are a tool for data management, not for narrative construction.

### **3.2 Implementation & Scripting Engines**

Once the narrative is designed, it must be implemented in a format the game engine can execute. This is the role of a narrative scripting engine.

* **Yarn Spinner:** Developed for the game *Night in the Woods*, Yarn Spinner is designed to be writer-friendly and accessible.29 It combines a simple, text-based scripting language with a visual node-based editor, offering a middle ground between the approaches of Twine and Ink. It is well-regarded within the Unity development community, but it has a smaller footprint in the JavaScript and web-native game development ecosystem.  
* **Ink:** Created by inkle, the studio behind highly acclaimed narrative games like *80 Days* and *Sorcery\!*, Ink is a powerful, text-first narrative scripting language designed specifically to be used as middleware within a larger game engine.30 Its core design philosophy eschews visual flowcharts in favor of a "weave" structure. This allows writers to create highly complex, branching logic within a plain text file that remains compact, readable, and easy to manage even at a scale of hundreds of thousands of words.31 Ink has first-class support for all the features required by "Friday Night Underdogs," including robust variables, conditional logic, functions, and lists.32 Its most significant advantage for this project is the existence of  
  **inkjs**, an official, fully-featured JavaScript port of the Ink engine, making it a perfect technical match for a browser-based game built with Phaser.35

### **3.3 Table: Narrative Tooling Comparison Matrix**

To provide a clear, at-a-glance summary, the following table compares the key attributes of the evaluated tools in the context of developing "Friday Night Underdogs."

| Feature | Twine (SugarCube) | Articy:Draft 3 | Ink (with Inky) | Spreadsheets |
| :---- | :---- | :---- | :---- | :---- |
| **Primary Use Case** | Rapid Prototyping, Interactive Fiction | All-in-one Visual GDD & Narrative Design | Professional Narrative Scripting (Middleware) | Raw Data & Dialogue Management |
| **Visual Flowchart** | Yes (core feature) | Yes (core feature) | No (by design, promotes "play-testing" over visualization) 31 | No |
| **Variable/Logic Power** | Good (SugarCube is JS-based) 17 | Very Good (built-in scripting) 21 | Excellent (full logic, functions, lists) 32 | N/A (Data only) |
| **Engine Integration** | Manual (HTML export) 13 | Official (Unity, Unreal), JSON/XML export 20 | Official (Unity, Unreal), inkjs for Web/JS 30 | Manual (CSV/JSON parsing) |
| **Learning Curve** | Low | Medium-High | Low-to-Medium | Low |
| **Cost** | Free | Paid (Lifetime/Subscription) 38 | Free | Free/Paid |
| **Best For...** | Quick prototypes, smaller projects, non-programmers. | Large teams, projects needing a single source of truth, Unity/Unreal dev. | Complex, variable-heavy narratives, professional integration with custom engines. | Managing large volumes of localized dialogue or structured data. |

### **3.4 Expert Recommendation for "Friday Night Underdogs"**

Based on this analysis, the definitive recommendation for the primary narrative development tool for "Friday Night Underdogs" is **Ink**.

This recommendation is based on several key factors:

1. **Alignment with Design Complexity:** The GDD outlines a game that is deeply reliant on a complex state machine, conditional logic, and the interplay of numerous variables (traits, morale, chemistry, flags). Ink's powerful scripting capabilities are designed to handle precisely this level of complexity in a way that is both robust and manageable for the writer.5  
2. **Direct Technical Compatibility:** The project's specified platform is a browser-based game built with Phaser 3\.5 Ink's official JavaScript port,  
   inkjs, provides a direct, seamless, and professionally supported path for integration.36 This eliminates the significant technical risk and overhead that would be associated with developing a custom importer for a tool like Articy:Draft.  
3. **Scalability and Maintainability:** The "weave" format of Ink is specifically designed to address the scalability problems inherent in visual flowchart tools. As the narrative for "Friday Night Underdogs" grows to encompass an entire season with multiple character arcs and hundreds of events, Ink's text-based structure will remain far more readable and maintainable than a sprawling visual graph.31  
4. **Optimal Workflow:** The most efficient workflow for this project would be to use a combination of tools for their specific strengths. **Spreadsheets** should be used for the initial organization of static data, such as the list of potential player recruits, their base stats, and the definitions of all positive and negative traits. The core narrative development—the writing of all dialogue, the scripting of all event logic, and the management of all state variables and flags—should be done entirely in **Ink**, using the dedicated **Inky** editor. This workflow leverages the right tool for the right job, combining the data-management strengths of spreadsheets with the superior narrative scripting power of Ink.

## **Part IV: Implementation Roadmap: Building "Friday Night Underdogs" with Phaser and Ink**

This section provides a practical, technical roadmap for implementing the core narrative systems of "Friday Night Underdogs." It details the architecture for integrating the Ink scripting language with the Phaser 3 game engine, offering concrete patterns and code-level examples to bridge the gap between the GDD and a functional prototype.

### **4.1 The Core Architecture: Phaser \+ inkjs**

The foundation of the project will be a clean separation between the game engine (Phaser), which handles rendering, input, and gameplay presentation, and the narrative engine (inkjs), which manages the story's state and logic.

Project Setup:  
The initial step involves setting up a standard Phaser 3 project, typically using a modern web development toolchain with Node.js, npm, and a bundler like Webpack or Vite.40 The  
inkjs library can then be added as a project dependency via npm: npm install inkjs.36 The narrative itself will be written in

.ink files using the Inky editor and compiled into a single story.json file, which will be treated as a game asset to be loaded by Phaser.30

The NarrativeManager:  
To manage the interaction between these two systems, it is essential to create a dedicated NarrativeManager class in the Phaser project. This class will act as a singleton—a single, globally accessible instance—and will serve as the sole interface to the narrative engine. Its primary responsibilities will include:

* **Initialization:** Loading the compiled story.json asset during Phaser's preload phase.  
* **Story Instantiation:** Creating and storing an instance of the inkjs.Story object using the loaded JSON data.  
* **State Management:** Providing methods to save and load the story's state, using story.state.ToJson() and story.state.LoadJson(), respectively.  
* **API for Game Logic:** Exposing a clean set of methods for the rest of the game to interact with the narrative. This API should include functions like:  
  * continueStory(): Advances the story and returns the next line of text and associated tags.  
  * getChoices(): Returns the list of currently available choices.  
  * makeChoice(index): Informs the Ink story that the player has selected a choice.  
  * getVariable(variableName): Retrieves the current value of a variable from the Ink story's state.  
  * setVariable(variableName, value): Sets the value of a variable within the Ink story's state.  
  * observeVariable(variableName, callback): A mechanism to register a function that gets called whenever a specific Ink variable changes.

This architecture creates a crucial layer of abstraction. The game's UI code, for example, does not need to know anything about the internal workings of inkjs. It simply calls narrativeManager.getChoices() and renders buttons based on the returned data. This separation of concerns makes the codebase cleaner, easier to debug, and more maintainable in the long run.

### **4.2 Creating the Branches: The Writing Workflow in Inky**

All narrative content will be authored in .ink files using the Inky editor.42 Ink's syntax is designed to be intuitive for writers while providing the logical power needed for complex interactivity.

* **Core Syntax:** The fundamental building blocks of an Ink story are:  
  * **Knots (=== knot\_name \===):** Large sections of the story, analogous to chapters or scenes.35 A Dynamic Event from the GDD would be implemented as a knot.  
  * **Stitches (= stitch\_name):** Subsections within a knot, useful for organizing smaller beats within a scene.34  
  * **Choices (\* Choice Text):** Present options to the player. Sticky choices (+) can be selected multiple times.43  
  * **Diverts (-\> knot\_name):** Direct the flow of the story to a different knot or stitch.34  
  * **Gathers (-):** Points where multiple branches of a choice converge back into a single narrative flow.31  
* **Implementing an Event:** The "Leo's Grades" event from the GDD (Table 6.1) can be scripted in Ink as follows:

Code snippet

VAR leos\_grades \= 45  
VAR coach\_ap \= 3

\=== event\_leos\_grades \===  
An email arrives from Leo's English teacher. "Dear Coach," it reads, "I'm concerned about Leo's recent performance. He is on the verge of academic ineligibility."  
\* { coach\_ap \>= 1 }  
    You spend the afternoon helping Leo with his essay. He seems grateful for the personal attention.  
    \~ leos\_grades \+= 15  
    \~ coach\_ap \-= 1  
    \~ FLAG\_leo\_tutored\_by\_coach \= true  
    \-\> weekly\_hub  
\* { coach\_ap \>= 1 } \[Ask a teammate to help him.\]  
    You ask the team's academic star to help Leo study. It's a more efficient use of your time.  
    \~ leos\_grades \+= 10  
    \~ coach\_ap \-= 1  
    \-\> weekly\_hub  
\*  
    "He's a student-athlete," you think. "The 'student' part is his responsibility."  
    \~ leos\_grades \-= 5  
    \-\> weekly\_hub

\=== weekly\_hub \===  
//... return to the main game loop

* **Conditional Branching:** The curly braces {} are used to embed logic directly into the narrative. In the example above, the first two choices are only displayed if the coach has at least 1 Action Point ({ coach\_ap \>= 1 }). This powerful feature is the key to making the narrative react to the game's state.

### **4.3 Avoiding Clashes: The Art of Consequence Management**

The primary method for ensuring long-term narrative coherence is a disciplined use of flags and state variables. Every choice that should have a future consequence must alter the game's state in a detectable way.44

The State Catalogue:  
Before writing significant amounts of script, it is vital to create a catalogue of all the variables and flags the game will track. This document serves as a blueprint for the StateManager and a reference for the narrative designer.

| Variable Name | Type | Scope | Initial Value | Description |
| :---- | :---- | :---- | :---- | :---- |
| team\_chemistry | Integer (0-100) | Global | 50 | Overall team cohesion. Affects match performance. |
| coach\_pp | Integer | Global | 0 | Coach's Philosophy Points for the skill tree. |
| marco\_morale | Integer (0-100) | Player (Marco) | 60 | Marco's individual morale. |
| flag\_confronted\_marco | Boolean | Global | false | Set to true after the first confrontation event with Marco. |
| flag\_leo\_tutored\_by\_coach | Boolean | Global | false | Set to true if coach chose to personally tutor Leo. |
| perk\_motivator\_1 | Boolean | Coach | false | Flag indicating if the first Motivator perk is unlocked. |

Using Flags for Coherence:  
These flags are then used in conditional logic to ensure the narrative accurately reflects the player's history. For example, a later scene where the coach talks to the principal could contain the following logic:

Code snippet

"I'm here to talk about Leo," you say.  
{ flag\_leo\_tutored\_by\_coach:  
    "I've been personally working with him," you add. "I believe he's making progress."  
\- else:  
    "I've encouraged him to seek help from his teammates."  
}

This simple check ensures that the dialogue is always consistent with the player's past actions, thereby preventing narrative clashes and making the world feel reactive and intelligent.

### **4.4 The Power of Tags: Triggering Gameplay Mechanics**

While conditional logic allows the narrative to react to the game state, Ink's **tag system** allows the narrative to actively command the game engine. Tags are small pieces of metadata, prefixed with a \#, that can be attached to any line of text.47 These tags are ignored by the Ink engine itself but can be read by the

NarrativeManager in Phaser. This enables the creation of a powerful, one-way communication protocol from the story to the game.

After the NarrativeManager calls story.Continue(), it should also check the story.currentTags property. If any tags are present, it should parse them and dispatch corresponding events to other game systems. This allows the writer to trigger gameplay effects directly from the script.

Gameplay Event Tag Protocol:  
A clear, extensible protocol should be defined for these commands.

| Tag | Example | Parameters | Engine Action |
| :---- | :---- | :---- | :---- |
| \#SOUND | \#SOUND:whistle\_blow | sound\_asset\_key | Calls SoundManager.playSound(key). |
| \#STAT | \#STAT:marco:Pace:+1 | player\_id, stat\_name, value | Calls PlayerManager.modifyStat(player, stat, value). |
| \#MORALE | \#MORALE:team:-5 | player\_id\_or\_team, value | Calls PlayerManager.modifyMorale(target, value). |
| \#EVENT | \#EVENT:show\_match\_report | event\_name | Dispatches a global game event that the UI system listens for. |
| \#PORTRAIT | \#PORTRAIT:leo:angry | character\_id, emotion | Tells the Dialogue UI to switch to the specified character portrait. |

**Example in Practice:**

* **Ink Script:** Marco pushes himself harder than ever before. \#STAT:marco:Work Rate:+1 \#PORTRAIT:marco:determined  
* **Phaser NarrativeManager:** After displaying the text, the manager reads the two tags. It calls PlayerManager.modifyStat('marco', 'Work Rate', 1\) and then tells the UI system to update Marco's portrait to the "determined" expression. This creates a tight, satisfying loop between narrative description and mechanical effect.

### **4.5 Observing Ink Variables: How the Game Engine Reacts**

Communication must also flow from Ink to the game engine. The NarrativeManager can read the current state of any Ink variable at any time by accessing the story.variablesState object.49 This allows the game's UI and other systems to be reactive to changes happening within the narrative logic.

For example, the main game UI in Phaser might display a "Team Chemistry" meter. In its update loop, or through an event-driven system, it can periodically call narrativeManager.getVariable('team\_chemistry'). If the returned value is different from the last known value, the UI can update the visual meter accordingly.

This communication is a two-way street. The game engine must also be able to write data back into the Ink story's state. After the match engine simulates a game on Friday, the Phaser code will need to update the Ink state with the results. This would be accomplished with a series of calls like narrativeManager.setVariable('last\_match\_result', 'win'), narrativeManager.setVariable('leo\_morale', 80), and narrativeManager.setVariable('marco\_fatigue', 65). The next Ink knot that runs (e.g., the Weekend Narrative Event) can then use conditional logic to react to this new state, creating dialogue and events that are specific to the outcome of the match.

### **4.6 Saving and Loading Progress: Serializing the inkjs State**

A critical feature for any long-form RPG is the ability to save and load progress. With this architecture, saving the game does not mean serializing the entire Phaser game engine. It simply means saving the current state of the narrative. The inkjs library provides a straightforward mechanism for this.

* **Saving:** To save the game, the NarrativeManager calls story.state.ToJson(). This method returns a single JSON-formatted string that contains all the necessary information to restore the story: the current point of execution in the narrative flow, the values of all global variables and flags, the read counts for every line, and the call stacks for functions and tunnels.51 This compact string can then be saved to the browser's local storage or sent to a server.  
* **Loading:** To load a game, the NarrativeManager first initializes a fresh inkjs.Story object from the original, compiled story.json file. It then retrieves the saved state string from storage and calls story.state.LoadJson(savedStateString).51 This single function call instantly restores the story object to the exact state it was in when the player saved, allowing the game to continue seamlessly from that point.

## **Part V: Advanced Topics & Concluding Remarks**

Having established a robust architecture for implementing the core vision of "Friday Night Underdogs," this final section explores advanced concepts in narrative design and provides a concluding summary of the recommended path forward. These topics offer a forward-looking perspective on the possibilities of interactive storytelling and address the practical challenges of developing and testing a complex narrative game.

### **5.1 Beyond Hand-Authored Trees: An Introduction to Procedural Dialogue**

The design of "Friday Night Underdogs," like *Suzerain*, is best served by a heavily authored, hand-crafted narrative. Every major event and character arc is deliberately designed and scripted. However, it is valuable to be aware of an alternative approach used in other genres: Procedural Content Generation (PCG) for narrative.53

Instead of writing every possible line of dialogue, a procedural system uses grammars, templates, and algorithms to generate content dynamically.55 This is particularly useful for creating variety in non-critical interactions, such as ambient dialogue from minor characters. For example, instead of writing ten different greetings for generic students in the hallway, one could create a simple grammar template:

", Coach. The team looks today." The system would then populate the and slots with randomly selected words from predefined lists ("Hey," "Morning"; "tough," "ready," "focused"), generating a wide variety of unique lines from a small amount of source material.

While a deep dive into PCG is beyond the scope of this project, this technique can be a powerful tool for making the game world feel more alive and less repetitive, especially for interactions that do not need to carry the weight of the main plot. It is a technique that powers the emergent, player-driven stories found in games like *Dwarf Fortress* and *Crusader Kings*, where the game provides the systems and the story "just happens" as a result of their interaction.56

### **5.2 Methodologies for Testing and Debugging Complex Narratives**

One of the greatest challenges in developing a state-driven narrative game is testing. With potentially thousands of branches and an exponential number of possible game states, how can a developer ensure that every path is coherent and free of bugs?

* **In-Editor Simulation:** The first line of defense is testing the narrative logic in isolation, before it is even integrated into the game engine. Tools like the Inky editor's live-preview pane or Articy:Draft's "Presentation View" are invaluable for this.20 They allow the writer to rapidly click through dialogue, test conditional logic, and monitor variable changes without the overhead of running the full game client.57 This is the fastest way to catch basic logic errors and typos.  
* **Automated Narrative Testing:** For more rigorous testing, principles from software engineering can be applied. Behavior-Driven Development (BDD) frameworks, such as Cucumber, use a plain-language syntax called Gherkin to define test cases.58 A test for "Friday Night Underdogs" could be written as:  
  Gherkin  
  Scenario: Tough Love Demotivates Arrogant Player  
    Given the Coach has the "Drill Sergeant" archetype  
    And Marco has the "Arrogant" trait  
    When the Coach uses the "Tough Love" dialogue option on Marco  
    Then Marco's morale should decrease by 10

  These plain-language scenarios can be linked to test scripts that programmatically load the narrative engine, execute the specified choices, and then assert that the final state variables match the expected outcome. Building a suite of these automated tests can provide a powerful safety net, ensuring that changes to one part of the narrative do not unintentionally break another.  
* **The Limits of Visualization:** A common impulse for designers of branching narratives is to seek a tool that can visualize the entire story as a giant flowchart. However, as the creators of Ink have noted, for a truly complex, state-driven narrative, such a graph is often more confusing than helpful.37 A choice that depends on five different flags does not branch into two paths; it exists in a high-dimensional state space that is impossible to represent cleanly in 2D. The Ink philosophy correctly posits that it is more effective to focus on writing clean, readable, well-structured script and to test the logic of state transitions rigorously, rather than attempting to visually map every conceivable path.31

### **5.3 Final Recommendations and Path Forward**

The development of a game with the narrative depth and reactivity of *Suzerain* is an ambitious but achievable goal. The analysis presented in this report demonstrates that the key is not simply to write a branching story, but to architect a robust **narrative state machine**. This machine serves as the game's memory, and every system, from dialogue to on-field performance, is an expression of its current state.

For "Friday Night Underdogs," the recommended architecture is clear:

* The **Ink** scripting language should serve as the brain of the narrative, managing all logic, variables, and branching.  
* The **Phaser 3** game engine should be the body, responsible for rendering the UI, handling user input, and simulating the soccer matches.  
* A well-defined **tag-based protocol** should act as the nervous system, allowing the narrative brain to send clear commands to the game engine body.

The user's GDD provides an exceptionally strong foundation for this project. The concepts of the Duality Trait System, the Dynamic Event System, and the Coach's Philosophy Tree are precisely the right building blocks for creating a compelling, state-driven experience. The path forward should be methodical and iterative.

**Actionable Next Steps:**

1. **Catalogue the State:** The immediate first step is to expand upon the table provided in this report and create a comprehensive "State Variable & Flag Catalogue" for the entire game. Define every piece of information that the game needs to remember. This document will be the single most important blueprint for development.  
2. **Build a Vertical Slice:** Do not attempt to build the entire game at once. Select a single, self-contained event chain from the GDD—for example, the "First Scrimmage" and subsequent confrontation with Marco from Week 2 (Table 6.1)—and implement it end-to-end. Build the Ink script, the Phaser UI, and the NarrativeManager logic required to make that one sequence fully functional.  
3. **Iterate and Expand:** A successful vertical slice will validate the core architecture. Once the fundamental loop of **State \-\> Event \-\> Choice \-\> State Change \-\> Gameplay Effect** is proven to work, the process becomes one of content expansion: writing more events, creating more characters, and building out the full season arc, confident that the underlying foundation is solid.

By adopting these architectural principles and a disciplined, iterative development process, the ambitious vision for "Friday Night Underdogs" can be successfully realized, resulting in a game that offers the strategic depth of a management simulation and the personal, consequential storytelling of a premier narrative RPG.

#### **Works cited**

1. Mini-survey for a bit of academic work \- What part of Suzerain do you find most enjoyable and why? \- Reddit, accessed August 12, 2025, [https://www.reddit.com/r/suzerain/comments/1j1xn9p/minisurvey\_for\_a\_bit\_of\_academic\_work\_what\_part/](https://www.reddit.com/r/suzerain/comments/1j1xn9p/minisurvey_for_a_bit_of_academic_work_what_part/)  
2. Suzerain: when management meets storytelling | by Pablo Gordillo Sánchez \- Medium, accessed August 12, 2025, [https://medium.com/@pabloGordilloSanchez/suzerain-when-management-meets-storytelling-2bc0b6698447](https://medium.com/@pabloGordilloSanchez/suzerain-when-management-meets-storytelling-2bc0b6698447)  
3. Suzerain (video game) \- Wikipedia, accessed August 12, 2025, [https://en.wikipedia.org/wiki/Suzerain\_(video\_game)](https://en.wikipedia.org/wiki/Suzerain_\(video_game\))  
4. Suzerain: a narrative game that brings policy & politics to life \- Matchsticks for my Eyes, accessed August 12, 2025, [https://www.matchstickeyes.com/2024/07/27/suzerain-a-narrative-game-that-brings-policy-politics-to-life/](https://www.matchstickeyes.com/2024/07/27/suzerain-a-narrative-game-that-brings-policy-politics-to-life/)  
5. High School Soccer Management Game\_.pdf  
6. New player: all decisions are made during conversations, right? : r/suzerain \- Reddit, accessed August 12, 2025, [https://www.reddit.com/r/suzerain/comments/1m7hd2q/new\_player\_all\_decisions\_are\_made\_during/](https://www.reddit.com/r/suzerain/comments/1m7hd2q/new_player_all_decisions_are_made_during/)  
7. Suzerain \- Gameplay and Developer Interview \- LudoNarraCon 2020 Exhibitor Stream, accessed August 12, 2025, [https://www.youtube.com/watch?v=R8UlhUCl8nY](https://www.youtube.com/watch?v=R8UlhUCl8nY)  
8. Suzerain, accessed August 12, 2025, [https://www.suzeraingame.com/](https://www.suzeraingame.com/)  
9. Is this game all about memorizing choices, or am i missing something? : r/suzerain \- Reddit, accessed August 12, 2025, [https://www.reddit.com/r/suzerain/comments/1k99lx6/is\_this\_game\_all\_about\_memorizing\_choices\_or\_am\_i/](https://www.reddit.com/r/suzerain/comments/1k99lx6/is_this_game_all_about_memorizing_choices_or_am_i/)  
10. Situations guide \- Steam Community, accessed August 12, 2025, [https://steamcommunity.com/sharedfiles/filedetails/?id=3486843361](https://steamcommunity.com/sharedfiles/filedetails/?id=3486843361)  
11. Guide :: How to be a Transformational President \- Steam Community, accessed August 12, 2025, [https://steamcommunity.com/sharedfiles/filedetails/?id=2401566806](https://steamcommunity.com/sharedfiles/filedetails/?id=2401566806)  
12. Which tool you use to design a story and all the choices : r/gamedev \- Reddit, accessed August 12, 2025, [https://www.reddit.com/r/gamedev/comments/1941y11/which\_tool\_you\_use\_to\_design\_a\_story\_and\_all\_the/](https://www.reddit.com/r/gamedev/comments/1941y11/which_tool_you_use_to_design_a_story_and_all_the/)  
13. Twine / An open-source tool for telling interactive, nonlinear stories, accessed August 12, 2025, [https://twinery.org/](https://twinery.org/)  
14. Comparing Tools for Building Branching Scenarios \- Christy Tucker, accessed August 12, 2025, [https://christytuckerlearning.com/tools-for-building-branching-scenarios/](https://christytuckerlearning.com/tools-for-building-branching-scenarios/)  
15. A Total Beginner's Guide to Twine 2.1 \- Adam Hammond, accessed August 12, 2025, [https://www.adamhammond.com/twineguide/](https://www.adamhammond.com/twineguide/)  
16. Best software to start with narrative design? : r/gamedesign \- Reddit, accessed August 12, 2025, [https://www.reddit.com/r/gamedesign/comments/1045rj5/best\_software\_to\_start\_with\_narrative\_design/](https://www.reddit.com/r/gamedesign/comments/1045rj5/best_software_to_start_with_narrative_design/)  
17. Sugarcube vs Harlowe : r/twinegames \- Reddit, accessed August 12, 2025, [https://www.reddit.com/r/twinegames/comments/1i7k1ap/sugarcube\_vs\_harlowe/](https://www.reddit.com/r/twinegames/comments/1i7k1ap/sugarcube_vs_harlowe/)  
18. articy:draft 3 \- Steam Community, accessed August 12, 2025, [https://steamcommunity.com/app/570090](https://steamcommunity.com/app/570090)  
19. articy:draft 3 on Steam, accessed August 12, 2025, [https://store.steampowered.com/app/570090/articydraft\_3/](https://store.steampowered.com/app/570090/articydraft_3/)  
20. Features List \- Articy, accessed August 12, 2025, [https://www.articy.com/en/articydraft/feature-list/](https://www.articy.com/en/articydraft/feature-list/)  
21. Scripting in articy:draft \- Articy Help Center, accessed August 12, 2025, [https://www.articy.com/help/Scripting\_in\_articy.html](https://www.articy.com/help/Scripting_in_articy.html)  
22. Arcweave: "Want to read a more in-depth review of each tool mentioned here? Here's the full article blog.arcweave.com/top-10-tools..." — Bluesky, accessed August 12, 2025, [https://bsky.app/profile/arcweave.com/post/3ler6fgnnzc2s](https://bsky.app/profile/arcweave.com/post/3ler6fgnnzc2s)  
23. A narrative designer tries out Articy Draft \-- is it better than Inkle and Twine? \- YouTube, accessed August 12, 2025, [https://www.youtube.com/watch?v=knOraqpitJ4](https://www.youtube.com/watch?v=knOraqpitJ4)  
24. Unreal Integration \- Articy, accessed August 12, 2025, [https://www.articy.com/en/downloads/unreal-ad3/](https://www.articy.com/en/downloads/unreal-ad3/)  
25. Integration articy:draft 3, accessed August 12, 2025, [https://www.articy.com/en/articydraft/integration-ad3/](https://www.articy.com/en/articydraft/integration-ad3/)  
26. Unity Integration \- Articy, accessed August 12, 2025, [https://www.articy.com/en/downloads/unity-ad3/](https://www.articy.com/en/downloads/unity-ad3/)  
27. How to build dialogue tree with Google spreadsheet, Part 1 | by Yun Cheng. Hsin | Medium, accessed August 12, 2025, [https://medium.com/@hsinpa/how-to-build-dialogue-tree-with-google-spreadsheet-part-1-ff982c704736](https://medium.com/@hsinpa/how-to-build-dialogue-tree-with-google-spreadsheet-part-1-ff982c704736)  
28. Using spreadsheets for our indie game's config management. \- YouTube, accessed August 12, 2025, [https://www.youtube.com/watch?v=BXqrlPfoGP0](https://www.youtube.com/watch?v=BXqrlPfoGP0)  
29. Looking for game dialogue spreadsheet example : r/gamedev \- Reddit, accessed August 12, 2025, [https://www.reddit.com/r/gamedev/comments/7wte7a/looking\_for\_game\_dialogue\_spreadsheet\_example/](https://www.reddit.com/r/gamedev/comments/7wte7a/looking_for_game_dialogue_spreadsheet_example/)  
30. ink \- inkle's narrative scripting language, accessed August 12, 2025, [https://www.inklestudios.com/ink/](https://www.inklestudios.com/ink/)  
31. Introduction to Ink (by Jon Ingold) | by D S WADESON | Game Writing Guide | Medium, accessed August 12, 2025, [https://medium.com/game-writing-guide/introduction-to-ink-3e6c224865f8](https://medium.com/game-writing-guide/introduction-to-ink-3e6c224865f8)  
32. Ink \- goldenxp.com docs, accessed August 12, 2025, [https://docs.goldenxp.com/ink/](https://docs.goldenxp.com/ink/)  
33. Learning Ink: Part 10: Lists \- Digital Ephemera, accessed August 12, 2025, [https://videlais.com/2018/08/11/learning-ink-part-10-lists/](https://videlais.com/2018/08/11/learning-ink-part-10-lists/)  
34. The Ink language — Unfold Studio 0.5.1 documentation, accessed August 12, 2025, [https://docs.unfold.studio/user\_guide/ink.html](https://docs.unfold.studio/user_guide/ink.html)  
35. Writing web-based interactive fiction with ink \- Inkle Studios, accessed August 12, 2025, [https://www.inklestudios.com/ink/web-tutorial/](https://www.inklestudios.com/ink/web-tutorial/)  
36. inkjs \- NPM, accessed August 12, 2025, [https://www.npmjs.com/package/inkjs](https://www.npmjs.com/package/inkjs)  
37. Visual Documentation of Stories · Issue \#22 · inkle/ink \- GitHub, accessed August 12, 2025, [https://github.com/inkle/ink/issues/22](https://github.com/inkle/ink/issues/22)  
38. articy:draft 3, accessed August 12, 2025, [https://www.articy.com/shop/pricing/articy-draft-3/](https://www.articy.com/shop/pricing/articy-draft-3/)  
39. A tiny demo that combines ink & phaser. \- GitHub, accessed August 12, 2025, [https://github.com/lizgw/phaser-ink-demo](https://github.com/lizgw/phaser-ink-demo)  
40. How to build a simple game in the browser with Phaser 3 and TypeScript \- freeCodeCamp, accessed August 12, 2025, [https://www.freecodecamp.org/news/how-to-build-a-simple-game-in-the-browser-with-phaser-3-and-typescript-bdc94719135/](https://www.freecodecamp.org/news/how-to-build-a-simple-game-in-the-browser-with-phaser-3-and-typescript-bdc94719135/)  
41. Phaser is a fun, free and fast 2D game framework for making HTML5 games for desktop and mobile web browsers, supporting Canvas and WebGL rendering. \- GitHub, accessed August 12, 2025, [https://github.com/phaserjs/phaser](https://github.com/phaserjs/phaser)  
42. inkle/inky: An editor for ink: inkle's narrative scripting language \- GitHub, accessed August 12, 2025, [https://github.com/inkle/inky](https://github.com/inkle/inky)  
43. Learning Ink Script \- Tutorial One \- edwin mcrae, accessed August 12, 2025, [https://www.edmcrae.com/article/learning-ink-script-tutorial-one](https://www.edmcrae.com/article/learning-ink-script-tutorial-one)  
44. www.reddit.com, accessed August 12, 2025, [https://www.reddit.com/r/gamedev/comments/1d202nn/how\_to\_handle\_a\_storyscenario\_based\_games\_event/\#:\~:text=A%20common%20way%20to%20handle,the%20next%20interaction%20somewhere%20else.](https://www.reddit.com/r/gamedev/comments/1d202nn/how_to_handle_a_storyscenario_based_games_event/#:~:text=A%20common%20way%20to%20handle,the%20next%20interaction%20somewhere%20else.)  
45. How to handle a story/scenario based game's event or states? : r/gamedev \- Reddit, accessed August 12, 2025, [https://www.reddit.com/r/gamedev/comments/1d202nn/how\_to\_handle\_a\_storyscenario\_based\_games\_event/](https://www.reddit.com/r/gamedev/comments/1d202nn/how_to_handle_a_storyscenario_based_games_event/)  
46. Flags, Tags, and Counters. Narrative design variables their… | by Gregory Pellechi | Medium, accessed August 12, 2025, [https://medium.com/@GregoryPellechi/flags-tags-and-counters-45a009fbbc20](https://medium.com/@GregoryPellechi/flags-tags-and-counters-45a009fbbc20)  
47. Using Ink for Conversations | Echodog Games, accessed August 12, 2025, [https://www.echodoggames.com/blog/2019/09/19/using-ink-for-conversations/](https://www.echodoggames.com/blog/2019/09/19/using-ink-for-conversations/)  
48. \[Discussion\] Triggering audio & cinematic directions from ink · Issue \#228 · inkle/ink \- GitHub, accessed August 12, 2025, [https://github.com/inkle/ink/issues/228](https://github.com/inkle/ink/issues/228)  
49. Getting INK story endings to affect Unity : r/Unity3D \- Reddit, accessed August 12, 2025, [https://www.reddit.com/r/Unity3D/comments/qv9tfr/getting\_ink\_story\_endings\_to\_affect\_unity/](https://www.reddit.com/r/Unity3D/comments/qv9tfr/getting_ink_story_endings_to_affect_unity/)  
50. Sending Ink Variables to Unity Variables : r/Unity3D \- Reddit, accessed August 12, 2025, [https://www.reddit.com/r/Unity3D/comments/hy2q2l/sending\_ink\_variables\_to\_unity\_variables/](https://www.reddit.com/r/Unity3D/comments/hy2q2l/sending_ink_variables_to_unity_variables/)  
51. ink \+ Unity: Story Saving and Restoring (Using JSON Serialization) \- Digital Ephemera, accessed August 12, 2025, [https://videlais.com/2022/02/11/ink-unity-story-saving-and-restoring-using-json-serialization/](https://videlais.com/2022/02/11/ink-unity-story-saving-and-restoring-using-json-serialization/)  
52. @atrament/core | npmjs.org | Ecosyste.ms: Packages, accessed August 12, 2025, [https://packages.ecosyste.ms/registries/npmjs.org/packages/@atrament%2Fcore](https://packages.ecosyste.ms/registries/npmjs.org/packages/@atrament%2Fcore)  
53. Procedural Content Generation for video games, a friendly approach, accessed August 12, 2025, [https://www.levelup-gamedevhub.com/en/news/procedural-content-generation-for-video-games-a-friendly-approach/](https://www.levelup-gamedevhub.com/en/news/procedural-content-generation-for-video-games-a-friendly-approach/)  
54. Procedural Generation \- Meegle, accessed August 12, 2025, [https://www.meegle.com/en\_us/topics/game-design/procedural-generation](https://www.meegle.com/en_us/topics/game-design/procedural-generation)  
55. Mastering Procedural Generation in Games \- Number Analytics, accessed August 12, 2025, [https://www.numberanalytics.com/blog/procedural-generation-guide](https://www.numberanalytics.com/blog/procedural-generation-guide)  
56. Emergent Narratives in Games: The State of Affairs \- YouTube, accessed August 12, 2025, [https://www.youtube.com/watch?v=NsBFLDVwWiY](https://www.youtube.com/watch?v=NsBFLDVwWiY)  
57. Twine Makes Branching Scenarios Easier \- Experiencing Elearning \- Christy Tucker, accessed August 12, 2025, [https://christytuckerlearning.com/twine-makes-branching-scenarios-easier/](https://christytuckerlearning.com/twine-makes-branching-scenarios-easier/)  
58. Top 10 Behavior Driven Development (BDD) Testing Tools \- ACCELQ, accessed August 12, 2025, [https://www.accelq.com/blog/bdd-testing-tools/](https://www.accelq.com/blog/bdd-testing-tools/)  
59. Beyond Branching: Quality-Based, Salience-Based, and Waypoint Narrative Structures, accessed August 12, 2025, [https://emshort.blog/2016/04/12/beyond-branching-quality-based-and-salience-based-narrative-structures/](https://emshort.blog/2016/04/12/beyond-branching-quality-based-and-salience-based-narrative-structures/)