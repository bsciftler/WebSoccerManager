

# **Game Design Document: Friday Night Underdogs**

## **I. Vision & Core Experience**

This document outlines the complete design for *Friday Night Underdogs*, a narrative-driven, role-playing game (RPG) and management simulation hybrid. It serves as a comprehensive blueprint for all members of the development team, from programmers and artists to writers and marketers.1

### **Game Title**

*Friday Night Underdogs*

### **Logline**

A narrative-driven, RPG-management sim where you coach a high school soccer team of talented misfits. Balance their powerful skills against their personal baggage, navigate the drama of high school life, and lead your ragtag bunch of underdogs on an unforgettable journey of growth, friendship, and maybe even victory.

### **Core Fantasy**

The central experience of *Friday Night Underdogs* is to place the player in the role of a mentor, strategist, and leader. The core fantasy is not merely about achieving victory in a sports competition but about making a tangible, lasting impact on the lives of young, developing student-athletes. Players will navigate the complex intersection of on-field tactics and off-field personal drama. The emotional weight and narrative focus draw inspiration from beloved high school sports stories like *Remember the Titans* and the team-based drama of *Bring it On*.3 This is combined with the choice-driven, episodic storytelling seen in games like

*Surviving High School*, where player decisions shape relationships and outcomes.4 The player's success is measured not just by the trophy cabinet, but by the growth of their players as athletes and as people.

### **Genre**

*Friday Night Underdogs* is a deliberate hybrid of several genres, designed to create a unique experience.5

* **Sports Management Simulation:** The player handles team strategy, tactics, player training, and financial aspects on a small scale, echoing the core responsibilities found in classic management titles.7  
* **Narrative RPG:** The game features a strong, overarching story, character development, dialogue choices, and a coach progression system. The experience is akin to story-rich visual novels and tabletop RPGs that emphasize character arcs and relationships.3  
* **Life Simulation:** The player manages their time and relationships within the high school ecosystem, dealing with faculty, parents, and the student body, similar to the life-sim elements found in games like *Punch Club* 8 or  
  *Kudos*.10

### **Target Audience**

The game is designed for players who appreciate strategic depth and long-term planning but are often left wanting more emotional connection and narrative substance from traditional management sims. The ideal player enjoys the tactical challenges of games like *Football Manager* 8 or

*Motorsport Manager* 11 but also seeks the compelling character arcs and choice-driven storytelling of games like

*Life is Strange* 12 or the

*Persona* series. This audience values a "story-rich" experience 5 and is willing to engage with a text-heavy format in exchange for narrative depth.

### **Platform**

The game is designed as a browser-based title, accessible on PC, Mac, and tablets. This platform choice is intentional, leveraging the accessibility and low barrier to entry of web games.13 It allows for flexible play sessions, catering to both players who wish to engage for long periods and those who prefer to play in shorter, daily increments. The technical design prioritizes smooth performance in a web environment, with no downloads or installations required.13

### **Unique Selling Proposition (USP)**

The core innovation and primary draw of *Friday Night Underdogs* is the **Duality Trait System**. Every student-athlete on the team is defined by a powerful positive trait that makes them valuable on the field and a challenging negative trait that creates risk and narrative conflict. This system is the central mechanical and narrative engine of the game. It transforms the standard management task of roster-building into a complex balancing act of skill, personality, and risk. This design choice directly fuels the narrative, ensuring that team management is a deeply personal and story-driven experience.

The game's design philosophy is explicitly "narrative first." In a market dominated by data-intensive, graphically complex sports simulations 7, attempting to compete on pure simulation fidelity as a basic browser game would be a losing proposition. Instead, the design leverages the proven appeal of character-focused, drama-centric stories found in games like

*Surviving High School* 4 and TTRPGs like

*Fight with Spirit*.3 Every game mechanic, from training schedules to match tactics, is designed to serve the narrative. A tactical choice is not merely a path to victory; it is a narrative decision with interpersonal consequences. A player's stats are not just numbers; they are reflections of their personality that trigger unique story events. This focus on story over graphical complexity makes

*Friday Night Underdogs* a distinct and compelling entry in the sports game landscape.

## **II. The Core Gameplay Loop: A Week in the Life**

The game's structure is built around a weekly cycle, providing a clear and engaging rhythm that blends management duties with narrative progression. This loop is designed to be intuitive, forcing meaningful decisions through a resource-management system while consistently advancing the story.

### **Weekly Structure**

The game progresses on a week-by-week basis, beginning on Monday morning and culminating in the match on Friday night. The weekend serves as a period for reflection, progression, and significant narrative developments.

### **Action Points (AP) System**

To create strategic tension and make time management meaningful, the coach has a limited number of Action Points (AP) to spend each day from Monday to Thursday (e.g., 3 AP per day). This system prevents the player from doing everything at once, forcing them to prioritize their efforts based on the team's immediate needs and long-term goals. This is a core principle of engaging strategy games, where every choice has an opportunity cost.14

### **Monday \- Thursday: The Build-Up**

During the week, the player prepares the team for Friday's match through a series of actions available from the main hub screen.

* **Morning Briefing (Hub Screen):** Each day begins in the "Coach's Office." The player can check their laptop for emails containing faculty notices, messages from players or parents, and news about rival teams. This serves as the primary method for delivering information and initiating small narrative events.  
* **Training (Costs 1 AP):** The player designs the team's daily training session. They can choose a general focus, such as "Defensive Drills," "Shooting Practice," "Set Pieces," or "Team Cohesion." This action provides a small, team-wide boost to the relevant skills but also increases player fatigue.  
* **Individual Focus (Costs 1 AP):** This action allows the coach to spend dedicated time with a single player. It is a critical tool for both player development and narrative interaction. The options include:  
  * **Mentor:** Provide a significant boost to one of a player's specific soccer skills.  
  * **Counsel:** Address a player's low morale or a specific negative trait. This action initiates a dialogue scene with branching choices, allowing the coach to improve the player's mental state or begin the long-term process of mitigating a negative trait.  
  * **Discipline:** Address a behavioral issue stemming from a negative trait. This may improve the trait's effect but comes at the cost of short-term morale.  
* **Scouting (Costs 1 AP):** The coach can "scout" the general student body by spending time in various school locations (e.g., the Library, the Art Club, the Gym). This action reveals a small pool of potential new players, along with their key attributes and traits, making them available for recruitment.  
* **Game Planning (Costs 1 AP):** The coach can analyze the upcoming opponent. This provides a scouting report that reveals the rival team's likely formation, tactical style, and their key "star" players.

### **Friday: Match Day**

Friday is dedicated entirely to the game.

* **Pre-Match:** The player is taken to the Tactics Board. Here, they set the starting lineup, formation, and tactical instructions for the match. This is a crucial phase where the player must balance player skills, active traits, morale, and fatigue levels to field the best possible team.  
* **The Match:** The game transitions to the match engine (detailed in Section V). The match unfolds via a dynamic text commentary. The player's role is primarily that of an observer, but they can make a limited number of tactical changes and deliver a pivotal team talk at halftime.

### **Weekend: Reflection & Progression**

The weekend is a time for consequences and growth.

* **Match Report:** The player receives a detailed summary of the previous day's match, including the final score, key statistics, individual player ratings, and reports on any injuries or suspensions.  
* **Player Progression:** Players who participated in the match gain experience points (XP). When a player levels up, they receive a point that the coach can allocate to improve one of their soccer skills.  
* **Narrative Events:** The weekend is a prime window for major narrative events to trigger. The outcome of Friday's match, along with the choices made during the week, will often lead to significant story developments presented through dialogue scenes or special events.  
* **League Table & News:** The regional high school league table is updated, and a "Sunday Sports" news bulletin provides flavor text, recaps other matches, and builds up future rivalries.

This weekly loop is designed to seamlessly weave narrative elements into the core management gameplay. Many management games can feel sterile, like a series of spreadsheets.10 By making actions like "Individual Focus" trigger interactive dialogue scenes, the game embeds its RPG elements directly into the simulation structure. This approach is inspired by the choice-based interactions of narrative games like

*Surviving High School*.4 It transforms a purely mechanical choice ("Which player stat should I increase?") into a narrative and emotional one ("Which of my players needs my guidance the most right now?"). The UI will be designed to support this, clearly communicating both the mechanical and narrative potential of each action, ensuring the loop feels less like a grind and more like building meaningful relationships with a team of individuals.

## **III. The Coach: An RPG System**

The player's role as the coach is not that of a detached, omniscient manager. Instead, the coach is a distinct character within the game world, with their own personality, skills, and progression path. This section details the RPG systems that define the player's avatar, making their identity a core part of the gameplay experience.

### **Coach Creation**

The game begins with the player creating their coach's profile. This process establishes their starting identity and provides both mechanical and narrative benefits that will shape their entire playthrough.

* **Appearance:** The player customizes their coach's portrait using a simple but expressive pixel-art creator. This tool allows for a variety of faces, hairstyles, and clothing options, giving the player a visual representation in dialogue scenes. This approach is inspired by accessible character creators that allow for personalization without requiring complex 3D models.15  
* **Name & Background:** The player enters their name and chooses a background, or "Archetype." This choice is the most significant part of character creation, defining their coaching philosophy and unlocking unique abilities and dialogue options throughout the game.

### **Coaching Archetypes**

The initial choice of archetype is a foundational RPG choice that provides a starting bonus, unlocks unique gameplay mechanics, and influences how other characters perceive and interact with the coach. This system ensures that the player's role-playing decisions have immediate and lasting consequences, a key tenet of RPG design.3 The archetypes are designed to offer distinct playstyles, encouraging replayability.

### **Coach Progression**

The coach earns Experience Points (XP) alongside their players. XP is awarded for winning matches, achieving narrative objectives (e.g., successfully resolving a player's personal crisis), and making wise decisions in key events. When the coach levels up, they earn "Philosophy Points" (PP).

### **Philosophy Tree**

Philosophy Points can be spent in a simple skill tree, allowing the coach to further specialize or branch out from their initial archetype. This tree provides a tangible sense of progression for the player's own character. The tree is divided into three main branches:

* **Tactician:** This branch focuses on the X's and O's of soccer. Unlocks include more advanced tactical instructions, more detailed opponent scouting reports, and the ability to make more impactful in-match adjustments.  
* **Motivator:** This branch focuses on the psychology of the team. Unlocks include more effective halftime team talks, special dialogue options to manage team-wide morale, and a greater ability to foster positive team chemistry.  
* **Mentor:** This branch focuses on individual player development. Unlocks include more efficient training sessions, faster skill growth for players, and unique abilities to help players confront and overcome their negative traits over time.

### **Table 3.1: Coach Archetypes & Effects**

This table outlines the starting archetypes. It is designed to clearly communicate to the player how their initial choice will impact gameplay, narrative, and strategy. This is a core RPG principle applied to the management genre, demonstrating that the coach's identity is as important as the players' stats. The design of these archetypes is informed by the need for choices to have both mechanical and narrative consequences, similar to how character backgrounds in games like *Mass Effect* can alter conversations and available quests.12

| Archetype | Description | Mechanical Bonus | Unique Ability (Unlockable) | Narrative Flavor |
| :---- | :---- | :---- | :---- | :---- |
| **The Ex-Pro** | "You almost made it. A career-ending injury brought you back to your old high school. You know the game inside and out, but the politics of education are a foreign language." | \+15% effectiveness of skill-based training. Players gain technical skills faster. | **"Pro Insight":** Once per match, reveal a hidden weakness of an opposing player. | Dialogue options are focused on professional standards and high-level tactics. Can intimidate or inspire players with stories of the pro game. May struggle to relate to academic pressures. |
| **The Teacher** | "You drew the short straw at the faculty meeting. You're a great educator, but your soccer knowledge comes from watching your own kids play. You excel at connecting with students." | \+15% effectiveness of counseling actions. Better at managing morale and resolving conflicts. | **"Study Hall":** Negate one player's "Academically Ineligible" risk for one week. | Dialogue options are empathetic, patient, and educational. Excels at navigating faculty politics and parent-teacher meetings. May be seen as tactically naive by more ambitious players. |
| **The Drill Sergeant** | "Winning is a habit. So is discipline. You were hired to turn a losing program around, and you'll do it through hard work and unwavering standards. No excuses." | Players are less affected by fatigue. Higher base team fitness. | **"Tough Love":** A harsh halftime talk that drastically boosts performance for 10 minutes but lowers morale. | Dialogue options are blunt, demanding, and focused on results. Builds resilience in some players but can clash with more sensitive personalities, creating high-risk, high-reward relationships. |

## **IV. Player & Team Management Systems**

This section details the heart of the simulation: the attributes, systems, and mechanics that govern the student-athletes who make up the Northwood High Ravens. The design is centered around the Duality Trait System, which serves as the primary engine for both strategic depth and emergent narrative.

### **4.1. Player Attributes**

Each player is defined by a set of statistics that represent their abilities both on and off the soccer field. These attributes are the core data that the match engine and event system will use to determine outcomes.

* **Soccer Skills (Rated 1-20):** These are the player's fundamental abilities in the sport, similar to those found in detailed sports sims.10  
  * *Technical:* Passing, Shooting, Dribbling, Tackling  
  * *Mental:* Composure (handling pressure), Positioning (tactical awareness), Work Rate (effort during a match)  
  * *Physical:* Pace (speed), Stamina, Strength  
* **Character Stats:** These stats represent the player's current state and are dynamic, changing based on events and coach actions.  
  * *Morale:* A measure of the player's happiness and confidence. High morale improves performance, while low morale can lead to mistakes and negative events.  
  * *Fatigue:* A measure of the player's physical exhaustion. High fatigue reduces on-field performance and increases the risk of injury.  
  * *Chemistry:* A hidden value that represents the player's relationships with their teammates and the coach. This affects team cohesion and the likelihood of positive or negative team-based events.

### **4.2. The Duality Trait System**

This is the game's central and most unique mechanic. Every student-athlete recruited to the team possesses one powerful **Positive Trait** and one challenging **Negative Trait**. This system is designed to ensure that no player is perfect and that every team-building decision involves a meaningful trade-off. The pool of traits is extensive, drawing inspiration from comprehensive lists of personality traits used in writing and RPG design.17

* **Positive Traits:** These grant a significant, tangible advantage in gameplay. They often define a player's role and make them a star in a particular area. Examples include "Natural Leader," "Clinical Finisher," and "Tireless Engine."  
* **Negative Traits:** These introduce a significant disadvantage, risk, or management challenge. They can be on-field flaws, off-field issues, or personality conflicts. Examples include "Hot-Headed," "Academically Ineligible," and "Glass Cannon" (injury-prone).

The true depth of this system lies in its direct integration with the narrative. Traits are not merely passive stat modifiers; they are active hooks for the game's event system. A player with the "Hot-Headed" trait is statistically more likely to trigger a "Confrontation" or "Disciplinary Hearing" event. A player with an "Insecure" trait may require specific "Counseling" actions from the coach before a big game to avoid a performance penalty. This design directly links a player's personality to the gameplay loop, a hallmark of strong narrative game design.12

This approach transforms the recruitment process from a simple exercise in comparing stats into a complex act of strategic and narrative curation. The traditional management sim asks, "Who is the best player?" *Friday Night Underdogs* asks, "Is this player's talent worth the trouble they'll cause?" Do you recruit the brilliant striker with the "Volatile" trait 17, knowing they will win you games but also risk tearing the locker room apart? That choice, and managing its consequences,

*is* the game. The combination of traits on the roster creates a unique "story potential" for every playthrough, ensuring high replayability.

### **Table 4.1: Example Player Duality Traits**

This table provides concrete examples of the Duality Trait system in action. It is a critical reference for the design and writing teams, illustrating the intended balance of risk and reward and showing how each character archetype can generate unique stories. Each example presents a clear trade-off and includes a "Narrative Hook" to guide the writing team in creating relevant event chains.

| Player Archetype | Positive Trait | Positive Effect | Negative Trait | Negative Effect | Narrative Hook |
| :---- | :---- | :---- | :---- | :---- | :---- |
| **The Prodigy** | **Prodigious Talent** | \+10 to all Technical skills. Learns new skills 50% faster during training. | **Arrogant** 20 | Lowers overall team chemistry. Has a 10% chance to ignore a tactical instruction to attempt a solo play. | A classic "brilliant but difficult" character. Their arc revolves around learning the value of teamwork. They will clash with the coach's authority and more team-oriented players. |
| **The Captain** | **Natural Leader** | Team gains a \+10 Morale bonus when this player is on the field. Unlocks a unique "Rally the Team" interaction during halftime talks. | **Academically Ineligible** | Carries a 25% risk of being declared ineligible to play during the week of a major exam or if their grades slip. | The heart and soul of the team, but their academic struggles create a constant source of tension. This arc forces the coach to interact with teachers and the school administration. |
| **The Workhorse** | **Tireless Engine** | Has a \+20 bonus to Stamina. Their performance does not degrade due to fatigue during a match. | **Timid** 19 | Suffers a \-10 penalty to Composure. Is prone to making critical mistakes in high-pressure "Big Game" situations or penalty shootouts. | A player who will run through a wall for the team but crumbles under the spotlight. Their personal quest is about building confidence. A "Motivator" coach archetype is best suited to help them. |
| **The Bruiser** | **Rock Solid** | Has a \+20 bonus to Strength and Tackling. Wins the vast majority of physical challenges and 50/50 balls. | **Hot-Headed** | High probability of committing fouls. Carries a 5% chance of receiving a straight red card in any given match. | The team's enforcer and defensive anchor, but their temper is a constant liability. Their story involves learning to channel their aggression, leading to disciplinary hearings and anger management subplots. |
| **The Magician** | **Creative Spark** | Unlocks unique "flair" moves (e.g., backheels, nutmegs) that can create unexpected goal-scoring opportunities from midfield. | **Lazy** 19 | Gains only 50% of the benefit from training sessions. Starts every match with 90% stamina instead of 100%. | An artist who believes their talent alone is enough. Their arc is a classic tale of wasted potential vs. hard work. Will they learn the value of effort or coast until they're left behind? |

### **4.3. Recruitment & Scouting**

In *Friday Night Underdogs*, teams are built, not bought. Players are recruited from the general student population of Northwood High, reinforcing the game's setting and themes.

* The "Scouting" action allows the coach to spend AP to observe students in different parts of the school. Scouting the "Library" might reveal students with high "Positioning" (a mental skill) but low physical stats. Scouting the "Weight Room" might reveal strong, athletic students who lack technical skill.  
* Once a potential recruit is identified, the coach can attempt to persuade them to join the team. This initiates a dialogue-based event where the coach must appeal to the student's personality, make promises about playing time, or convince them that the team needs their unique talents.

### **4.4. Team Morale & Chemistry**

These two stats are crucial for team performance and are heavily influenced by the coach's management style.

* **Morale:** This is an individual stat for each player. It is affected by playing time, personal performance, the team's win/loss record, and the outcomes of narrative events. A player with high morale will perform better, while a benched or unhappy player will see their performance suffer.  
* **Chemistry:** This is a team-wide stat that acts as a global multiplier on performance during matches. It represents how well the team functions as a single unit. Chemistry is influenced by the aggregate morale of the team, the combination of traits on the roster (a team full of "Arrogant" or "Selfish" players will have poor chemistry), and the coach's ability to resolve conflicts and foster a positive environment.

## **V. The Match Day Engine**

The match day experience is the dramatic climax of each in-game week. The engine is designed to be a narrative-focused, event-driven system rather than a complex physics simulation. Its primary goal is to create tension, highlight player personalities, and provide dramatic, readable outcomes. This approach is perfectly suited for a browser-based game and draws heavily on the design principles of classic text-based sports simulations.10

### **5.1. Pre-Match Phase**

Before kickoff, the player makes the critical strategic decisions that will influence the match's outcome.

* **Tactics Board:** The player interacts with a simple, visual drag-and-drop interface representing a soccer pitch. Player icons, showing their portrait and key stats, can be moved into various formation slots (e.g., 4-4-2, 4-3-3, 5-3-2).  
* **Player Roles:** Beyond their position, players can be assigned simple roles like "Playmaker," "Target Man," or "Ball-Winning Midfielder." These roles provide minor adjustments to their behavior within the simulation logic.  
* **Team Instructions:** The coach sets a handful of overarching tactical instructions from a dropdown menu. These include options like "Play High-Tempo," "Focus on Defense," "Exploit the Flanks," or "Play Through the Middle." These instructions act as primary modifiers for the event generation logic in the match engine.

### **5.2. Event-Based Simulation**

The match is not simulated in real-time. Instead, it is a turn-based flow of "Key Events" that are generated every few virtual minutes. The fundamental state of the game is a simple "ball possession" toggle between the two teams.

* **Event Generation:** The engine uses a weighted probability system to determine the type of event that occurs next. For example, the team in possession might have a 60% chance of a "Midfield Possession" event (safe play), a 20% chance of an "Attack Chance," a 10% chance of a "Turnover," a 5% chance of a "Foul," and a 5% chance of a "Special Event" (often triggered by a specific player trait). This probabilistic approach is inspired by simple but effective simulation models.25  
* **Event Resolution:** Once an event type is generated, its outcome is resolved by a virtual dice roll. This roll is heavily modified by a variety of factors:  
  * **Player Skills:** An "Attack Chance" event will pit the attacker's "Shooting" and "Composure" skills against the goalkeeper's "Composure" and the defender's "Tackling."  
  * **Tactics & Chemistry:** A "High-Tempo" tactic might increase the frequency of "Attack Chance" events but also increase the chance of "Turnovers." High team chemistry provides a bonus to all team-based rolls.  
  * **Player Traits:** Traits provide significant modifiers. A player with "Clinical Finisher" gets a large bonus on their shooting roll. A "Hot-Headed" player has a much higher chance of turning a "Tackle" event into a "Foul" event.

### **5.3. Dynamic Commentary System**

The primary feedback mechanism for the player is the text commentary. This system is designed to be more than just a log of events; it is a tool for narrative immersion, bringing the players' personalities to life on the field.

* **Varied Text Blocks:** Each possible event outcome is linked to a pool of multiple commentary strings. For example, a saved shot might have five different descriptions. This prevents the commentary from becoming repetitive over a full season.  
* **Trait-Infused Commentary:** The system is designed to select specific commentary strings based on the traits of the players involved in an action. This makes the commentary feel personal and dynamic, reinforcing the characters' identities. The style will adopt the immediate, present-tense language of live sports commentary to maximize engagement and excitement.28  
  * **Example (Successful Tackle by a "Rock Solid" player):** *"And he's met by a brick wall\! Johnson stands his ground and comes away with the ball. Textbook defending."*  
  * **Example (Successful Dribble by a "Creative Spark" player):** *"Oh, a moment of magic from Ramirez\! He leaves the defender for dead with a sublime piece of skill\!"*  
  * **Example (Missed Shot by a "Timid" player):** *"The chance falls to Miller... but he snatches at it\! It's a weak effort, and the keeper gathers it easily. He looks like he didn't want the responsibility."*

### **5.4. Coach Intervention**

To keep the focus on pre-match preparation and long-term management, the coach's direct control during the match is limited but impactful.

* **Halftime Team Talk:** This is a key narrative and mechanical moment. The player chooses the tone and content of their halftime speech (e.g., "Inspirational," "Calm & Tactical," "Angry"). The choice provides a temporary team-wide buff (or in some cases, a debuff) for the second half and can affect player morale.  
* **Tactical Shouts:** The coach has a limited number of "Shouts" per match (e.g., 2 or 3). These are single-use commands like "Push Forward\!", "Tighten Up\!", or "Shoot on Sight\!" that temporarily alter the team's tactical bias for the next few minutes of game time.

## **VI. Narrative, Events, and Relationships**

This section details the heart of the game's RPG experience. The systems described here are responsible for driving the story, creating compelling character arcs, and making the world of Northwood High feel alive and reactive. The narrative structure is built upon the foundations of classic sports story tropes and the universal drama of high school life.

### **6.1. The Season Arc: An Underdog Story**

The main plot of *Friday Night Underdogs* follows a powerful and relatable narrative structure: the underdog story. The player takes control of the Northwood High Ravens, a team with a history of failure, a "Ragtag Bunch of Misfits".30 The overarching goal is to guide this team on an unlikely, season-long journey towards the state championship. This "Cinderella story" framework provides a clear narrative spine for the game, filled with built-in stakes and emotional resonance.31 The season will be punctuated by key matches against rivals, unexpected setbacks, and moments of hard-won triumph, drawing from established sports tropes like "David Versus Goliath" and "Save Our Team".30

### **6.2. Key Characters & Arcs**

While the entire team is important, the narrative will focus on a core cast of 5-6 "main character" players. These individuals will have more detailed backstories, unique dialogue, and multi-stage personal quests that unfold over the course of the season. These quests function like companion quests in a traditional RPG. They are deeply integrated into the gameplay and often revolve around a player's struggle to overcome their negative trait or deal with external pressures such as family problems, academic stress, or a bitter rivalry.34 The coach's choices in dialogue and management actions will directly influence the outcomes of these personal arcs, creating a strong sense of player agency.

### **6.3. The Dynamic Event System**

The week-to-week stories and challenges are generated by a dynamic event system. This system is a sophisticated blend of pre-scripted plot points that advance the main season arc and randomly generated, system-driven events that create emergent narratives.

* **Event Triggers:** An event can be triggered by a wide range of conditions, making the game world feel responsive.  
  * **Game Progression:** Scripted events will fire at specific points in the season, such as the week before a match against a major rival.  
  * **Player Performance:** A player's on-field actions can trigger events. For example, a player who scores a game-winning goal might be featured in the local news, boosting their morale but also putting pressure on them.  
  * **Player Traits:** As previously detailed, player traits are a primary source of events. A "Selfish" player might trigger an event where teammates complain about them not passing the ball.  
  * **Coach's Actions:** The player's own decisions have consequences. Benching a star player with an "Arrogant" trait could trigger a "Confrontation" event in the coach's office.  
* **Event Content:** The library of events is filled with scenarios drawn from the rich well of high school drama and sports stories.34 Examples include:  
  * A player is caught cheating on a test, forcing the coach to intervene with the school administration.  
  * Two key players develop a rivalry over a starting position or a romantic interest.  
  * A wealthy and influential parent attempts to bribe or pressure the coach into giving their child more playing time.  
  * A scout from a prestigious college appears at a practice to watch a specific player, adding a new layer of pressure.  
  * The team's training equipment is vandalized before a big game, and the team must rally together.

This event system is designed to be an evolution of the model seen in earlier episodic narrative games. The choice-based gameplay of a title like *Surviving High School* 4 provides an excellent template for our weekly structure. However, a noted weakness of some older games was that choices often felt self-contained and lacked long-term impact.39

*Friday Night Underdogs* will address this by implementing a robust system of flags and variables to track player decisions. This is a core mechanic of modern interactive fiction.23 For example, if the coach chooses to "Publicly Defend" a player in an event during Week 3, the game will set a flag and increase a hidden "Trust" variable for that player. Later, in Week 8, a new, critical event may have a conditional dialogue branch that is only accessible if that player's "Trust" variable is above a certain threshold. This creates a "delayed story choice" dynamic 23, where early decisions have unforeseen consequences down the line, rewarding player investment and making the narrative feel genuinely reactive and personalized.

### **Table 6.1: Key Narrative Beats (First 5 Weeks)**

This table provides a clear roadmap for the opening act of the story. It is intended to guide the writing team, establish the initial tone and conflicts, and demonstrate the interplay between the narrative and gameplay systems from the very beginning. This structure provides a template that can be extended to map out the entire season.

| Week \# | Main Plot Point | Key Character Event | Player Choice & Consequence |
| :---- | :---- | :---- | :---- |
| **1** | **"The New Coach"** | Introduction to the team. The captain, **Leo (Captain/Academically Ineligible)**, welcomes you but seems distracted and overwhelmed by the responsibility. | **First Team Talk:** The player chooses the tone of their introductory speech (Inspiring, Demanding, or Tactical). This action sets the initial relationship values with the core players. |
| **2** | **"First Scrimmage"** | You hold an intra-squad practice match. The team's raw talent and lack of cohesion are immediately apparent. The star striker, **Marco (Prodigy/Arrogant)**, scores a brilliant solo goal but pointedly refuses to pass to open teammates. | **Confront Marco:** The player must address Marco's behavior. Praising his skill boosts his morale but lowers team chemistry. Criticizing his selfishness does the opposite. This is the first major test of the coach's management style. |
| **3** | **"The Rival's Shadow"** | The first official match is against the reigning champions and wealthy rivals, Northwood Academy. Their captain publicly mocks your team in the school newspaper, increasing the pressure. | **Leo's Grades:** Leo's English teacher sends an email warning that he is on the verge of being declared academically ineligible. The player must choose how to spend their AP: tutor him personally, ask a teammate to help, or tell him to figure it out on his own. |
| **4** | **"Friday Night Humiliation"** | The team loses badly to Northwood Academy. The scoreline is embarrassing, and team morale hits rock bottom. The rival's taunts seem justified. | **Post-Match Speech:** In the locker room, the player must address the devastated team. Do they shield the players from blame ("The loss is on me") or hold them accountable ("That performance was not good enough")? This choice has a major impact on team-wide morale and the coach's relationship with Leo and Marco. |
| **5** | **"Picking Up the Pieces"** | A mandatory team meeting is called to clear the air. Tensions are high. Marco blames the defense for the loss; Leo blames Marco's selfishness. An argument erupts. | **Mediate the Conflict:** Through a series of dialogue choices, the player must navigate the conflict. Their choices can resolve the tension, make it worse, or even cause one of the players to storm out and threaten to quit the team. This is a major early branching point in the narrative. |

## **VII. User Interface (UI) and Experience (UX) Flow**

The user interface is paramount in a management game, as it is the primary medium through which the player interacts with the world. The UI/UX for *Friday Night Underdogs* will be designed with three core principles in mind: clarity, ease of use, and thematic immersion. The goal is to create an interface that is intuitive for new players while providing the necessary depth for strategic management, drawing inspiration from the clean design of modern management games and the specific needs of a browser-based platform.40

### **Guiding Principles**

* **Clarity over Clutter:** Information will be presented in a clean, logical hierarchy. The design will avoid overwhelming the player with dense spreadsheets of stats. Key information will be prioritized, with more detailed data accessible through tooltips or secondary clicks.  
* **Minimal Micromanagement:** The UI will be designed to streamline repetitive tasks and respect the player's time, a core philosophy of accessible web-based games.13 Features like a "Repeat Last Week's Training" button or simple team-wide instructions will reduce tedious clicking.  
* **Thematic Immersion:** The UI elements will be styled to feel like they belong in a high school environment. This enhances the game's narrative and atmosphere. For example, the main hub will resemble a coach's office, the playbook might look like a composition notebook, and news updates could be presented on a corkboard.40

### **Key Screen Wireframes & Descriptions**

The following outlines the layout and function of the game's most important screens.

* **The Coach's Office (Main Hub):**  
  * **Layout:** This is the central navigation screen. It will be a static, illustrative background of a coach's office with several interactive elements. A desk will feature a clickable laptop (for emails, news, and league tables) and a phone (for text messages from players). A large corkboard on the wall will display the weekly schedule, photos of key players, and clippings of recent results.  
  * **Function:** This screen serves as the player's home base. All key management functions and weekly actions are initiated from these interactive objects, creating an intuitive and immersive hub.  
* **Roster & Player Profile Screen:**  
  * **Layout:** A two-panel design. The left panel will be a scrollable list of all players on the roster, showing their portrait, name, position, and current morale (indicated by a simple icon like a smiley or frowny face). Selecting a player from this list will populate the right panel with their detailed profile. This profile will prominently feature their pixel-art portrait, their Positive and Negative traits, their full list of Soccer Skills, and a "Coach's Notes" tab that summarizes their ongoing narrative arc and recent events.  
  * **Function:** This is the primary screen for analyzing the team and interacting with individual players. The "Individual Focus" actions (Mentor, Counsel, Discipline) will be initiated from this screen.  
* **Tactics Board:**  
  * **Layout:** A clean, top-down visual representation of a soccer pitch. The pitch will be divided into zones, with slots for each position in the selected formation. Player icons, which can be dragged and dropped from a bench area onto the pitch, will clearly display their name and fatigue level. A simple set of dropdown menus at the bottom will allow the player to set team-wide instructions.  
  * **Function:** This screen provides an intuitive, visual, and fast interface for all pre-match tactical decisions. It is designed to be easily understandable even for players not deeply familiar with soccer tactics.  
* **Match View:**  
  * **Layout:** The screen will be dominated by a large, scrolling text commentary box, which is the focus of the experience. A small, non-intrusive panel at the bottom of the screen will display the current score, the in-game time, and the coach's available "Shout" buttons. A minimalist, 2D radar view of the pitch will be present in a corner, showing colored dots representing the players' general positions, giving a simple visual context to the text commentary.  
  * **Function:** This layout is designed to create a focused and dramatic experience during matches, centering the narrative generated by the commentary and preventing the player from being distracted by complex visual information.

## **VIII. Art and Audio Direction**

The aesthetic of *Friday Night Underdogs* is designed to turn the "basic browser game" constraint into a stylistic strength. The art and audio will work together to create a cohesive, memorable, and emotionally resonant experience that complements the narrative-heavy gameplay.

### **8.1. Visuals**

* **Style:** The game will employ a hybrid art style that combines clean, modern UI design with expressive, retro-inspired 16-bit pixel art. This approach is both aesthetically appealing and technically efficient for a browser-based game.  
* **User Interface (UI):** The UI will feature a minimalist, flat design with a strong emphasis on clear typography and a logical layout. The color palette will be based on the school colors of the Northwood High Ravens (e.g., royal blue, gold, and white), creating a strong brand identity.  
* **Character Art:** All key characters (the coach, the main players, key rivals, and faculty members) will have unique, expressive pixel art portraits. These portraits are not static; they will have multiple emotional states (e.g., neutral, happy, angry, sad) that will change dynamically during dialogue scenes to reflect the tone of the conversation. This technique adds significant emotional depth with minimal technical overhead, inspired by the effectiveness of character art in visual novels and RPGs.15  
* **Event Illustrations:** Key narrative moments—a dramatic game-winning goal, a heated argument in the locker room, a quiet moment of mentorship—will be accompanied by larger, more detailed, full-screen pixel art illustrations. These "cutscene" images will serve as memorable rewards and emotional punctuation for major story beats.

### **8.2. Audio**

The audio design is crucial for setting the mood and enhancing the emotional impact of the narrative.

* **Music:** The soundtrack will be a key component of the game's atmosphere, with distinct styles for different phases of the game.  
  * **Management & Menus:** During the weekly management phase, the music will consist of relaxing, contemplative lo-fi, "study beats" style tracks. This creates a chill, focused atmosphere conducive to planning and decision-making.  
  * **Matches:** During the Friday night matches, the music will shift to upbeat, energetic, retro-inspired chiptune tracks. The music will be dynamic, escalating in intensity and tempo during key moments like scoring chances or the final minutes of a close game.  
* **Sound Effects (SFX):** The sound design will be minimalist but impactful, designed to punctuate the text-based action and provide satisfying user feedback.  
  * **UI Sounds:** Clean, responsive clicks for menu navigation and distinct notification sounds (perhaps a school bell for new messages) will make the interface feel tactile.  
  * **Atmospheric Sounds:** Subtle background sounds like crowd murmurs in the match view or the quiet hum of a school hallway will add to the immersion.  
  * **Match Sounds:** Key sounds will be synchronized with the text commentary to enhance the drama: the sharp blow of a referee's whistle, the thud of a ball being kicked, the roar of the crowd for a goal, and the collective groan for a near-miss.43

## **IX. Technical Outline & Implementation**

This section provides a high-level technical blueprint for the development of *Friday Night Underdogs*. The choices outlined here are designed to be practical, efficient, and well-suited to the project's scope as a narrative-focused browser game.

### **Game Engine**

The recommended game engine is **Phaser 3**.44

* **Justification:** Phaser is a mature, powerful, and open-source 2D game framework designed specifically for making HTML5 games. Its feature set aligns perfectly with the needs of this project.  
  * **Web-Native:** Phaser is built for the browser, ensuring that web export is a primary feature, not an afterthought.44  
  * **Performance:** It uses a fast WebGL and Canvas renderer, capable of handling the 2D art and UI elements smoothly.  
  * **Lightweight:** Phaser builds are compact, leading to fast load times for the player, a critical factor for browser games.44  
  * **Robust Feature Set:** It has excellent, well-documented support for all required features, including sprite and portrait management, text rendering, audio playback, and input handling.  
  * **Community & Ecosystem:** Phaser has a large community and integrates well with modern web development tools and frameworks.44

### **Programming Language**

The recommended language is **TypeScript**. While Phaser is a JavaScript framework, using TypeScript provides the benefits of static typing. For a game with complex, interconnected data structures (players, events, stats), static typing will be invaluable for managing complexity, catching errors early, and improving code maintainability for the development team.45

### **Core Data Structures**

The game's logic will be built around a series of well-defined data objects, likely stored and managed in a format like JSON for ease of use and extensibility.

* **Player Object:** A comprehensive object for each player containing all their attributes: name, portrait assets, soccer skills (as key-value pairs), current morale and fatigue levels, XP, and an array of their Positive and Negative traits. It will also contain a section for narrative flags specific to that player's personal arc.  
* **Coach Object:** An object containing the coach's data: name, chosen archetype, current XP, available Philosophy Points, and a list of unlocked abilities from the Philosophy Tree.  
* **Event Database:** This will be a large collection of event objects. Each event object will contain its name, the narrative text, the trigger conditions (e.g., "Week \> 5 AND Player\_Trait \== 'Arrogant'"), the dialogue choices available to the player, and the consequences of each choice (e.g., "Morale \-10," "Set Flag: Marco\_Confronted").  
* **Schedule Manager:** A simple array of weekly objects that dictates the flow of the season, storing the opponent for each week and tracking the results of matches.

### **Development Roadmap (High-Level)**

A phased development approach is recommended to mitigate risk and ensure core systems are functional before building out the full scope of content.2

1. **Prototype 1 (Core Mechanics Validation):** The initial focus will be on building and testing the core data structures and the match engine. This phase will involve creating the Player and Coach objects and implementing the event-based simulation logic. The output will be purely text-based (e.g., console logs), with the goal of verifying that the match simulation produces logical and interesting results based on player stats and traits.  
2. **Prototype 2 (Core Loop Implementation):** This phase will build the primary user interface and the weekly gameplay loop. The team will implement the Coach's Office hub, the Roster screen, and the Tactics Board. The AP system will be integrated, allowing the player to perform actions like Training and Scouting that modify the core data structures.  
3. **Vertical Slice (Narrative & Aesthetic Integration):** This is a crucial milestone. The goal is to create a fully playable, polished version of the first five weeks of the game, as outlined in Table 6.1. This will involve building the dialogue and event systems, integrating the character portraits with emotional states, and adding the initial art and audio assets. A successful vertical slice will prove that the core fantasy of the game is achievable and engaging.  
4. **Full Production (Content Expansion):** Once the vertical slice is approved, the team will move into full production. This phase is focused on expanding the game's content: creating the full roster of potential recruits, writing the complete library of traits and events, building out the entire season-long narrative arc with all its branching paths, and creating the remaining art and audio assets.  
5. **Polish & Release:** The final phase will be dedicated to extensive playtesting, bug fixing, balancing the game's difficulty and mechanics, and performing the final audio mix. This will be followed by deployment to the web.

#### **Works cited**

1. How to write a game design document — with examples and ..., accessed August 12, 2025, [https://www.gitbook.com/blog/how-to-write-a-game-design-document](https://www.gitbook.com/blog/how-to-write-a-game-design-document)  
2. 7 Important Game Design Document (GDD) Sections for Indie Developers \- Gamescrye Blog, accessed August 12, 2025, [https://gamescrye.com/blog/7-important-game-design-document-gdd-sections-for-indie-developers/](https://gamescrye.com/blog/7-important-game-design-document-gdd-sections-for-indie-developers/)  
3. Fight with Spirit: a Sports Drama RPG \- Storybrewers Roleplaying, accessed August 12, 2025, [https://storybrewersroleplaying.com/fight-with-spirit-sports-drama-rpg/](https://storybrewersroleplaying.com/fight-with-spirit-sports-drama-rpg/)  
4. Surviving High School \- Wikipedia, accessed August 12, 2025, [https://en.wikipedia.org/wiki/Surviving\_High\_School](https://en.wikipedia.org/wiki/Surviving_High_School)  
5. Sports Manager Games on Steam, accessed August 12, 2025, [https://store.steampowered.com/bundle/19026/Sports\_Manager\_Games/](https://store.steampowered.com/bundle/19026/Sports_Manager_Games/)  
6. Sports Sims & Sports Managers \- Steam, accessed August 12, 2025, [https://store.steampowered.com/category/sports\_sim/](https://store.steampowered.com/category/sports_sim/)  
7. Sports video game \- Wikipedia, accessed August 12, 2025, [https://en.wikipedia.org/wiki/Sports\_video\_game](https://en.wikipedia.org/wiki/Sports_video_game)  
8. Best sports management video games of all-time \- Glitchwave, accessed August 12, 2025, [https://glitchwave.com/charts/top/game/all-time/g:sports-management/](https://glitchwave.com/charts/top/game/all-time/g:sports-management/)  
9. Top 10 TTRPGs For Sports Fans \- CBR, accessed August 12, 2025, [https://www.cbr.com/top-10-ttrpgs-for-sports-fans/](https://www.cbr.com/top-10-ttrpgs-for-sports-fans/)  
10. Text sim \- Wikipedia, accessed August 12, 2025, [https://en.wikipedia.org/wiki/Text\_sim](https://en.wikipedia.org/wiki/Text_sim)  
11. Best Sports Management Sims? : r/tycoon \- Reddit, accessed August 12, 2025, [https://www.reddit.com/r/tycoon/comments/1hb9pr1/best\_sports\_management\_sims/](https://www.reddit.com/r/tycoon/comments/1hb9pr1/best_sports_management_sims/)  
12. Mastering Game Storytelling: Crafting Compelling Narratives \- Juego Studio, accessed August 12, 2025, [https://www.juegostudio.com/blog/mastering-game-storytelling-crafting-compelling-narratives](https://www.juegostudio.com/blog/mastering-game-storytelling-crafting-compelling-narratives)  
13. ZenGM \- Basketball GM, Football GM, ZenGM Baseball, and ZenGM ..., accessed August 12, 2025, [https://zengm.com/](https://zengm.com/)  
14. Online Sport Manager Games, accessed August 12, 2025, [https://www.onlinesportmanagers.com/](https://www.onlinesportmanagers.com/)  
15. Reroll, accessed August 12, 2025, [https://reroll.co/](https://reroll.co/)  
16. Avatars In Pixels, accessed August 12, 2025, [https://www.avatarsinpixels.com/](https://www.avatarsinpixels.com/)  
17. Character Personality traits : r/RPGdesign \- Reddit, accessed August 12, 2025, [https://www.reddit.com/r/RPGdesign/comments/114v0hz/character\_personality\_traits/](https://www.reddit.com/r/RPGdesign/comments/114v0hz/character_personality_traits/)  
18. Positive Trait Thesaurus \- One Stop For Writers, accessed August 12, 2025, [https://onestopforwriters.com/positive\_traits](https://onestopforwriters.com/positive_traits)  
19. 1200+ Character Traits \- Ultimate List for Storytellers \- ProWritingAid, accessed August 12, 2025, [https://prowritingaid.com/inspiration-decks/character-traits](https://prowritingaid.com/inspiration-decks/character-traits)  
20. 638 Primary Personality Traits \- Ideonomy, accessed August 12, 2025, [https://ideonomy.mit.edu/essays/traits.html](https://ideonomy.mit.edu/essays/traits.html)  
21. Negative Trait Thesaurus \- One Stop For Writers, accessed August 12, 2025, [https://onestopforwriters.com/negative\_traits](https://onestopforwriters.com/negative_traits)  
22. Over 600 Personality Traits to Create Unforgettable NPC's in Your TTRPG \- Skull RPG, accessed August 12, 2025, [https://www.skullrpg.com/personality-traits/](https://www.skullrpg.com/personality-traits/)  
23. Narrative Mechanics, Narrative Dynamics | by Aaron A. Reed \- Medium, accessed August 12, 2025, [https://medium.com/@aareed/narrative-mechanics-narrative-dynamics-cfe2e1c22cfb](https://medium.com/@aareed/narrative-mechanics-narrative-dynamics-cfe2e1c22cfb)  
24. tXtFL \- a strategy-based football simulator \- Text Flex, accessed August 12, 2025, [https://textflex.com/txtfl/](https://textflex.com/txtfl/)  
25. Soccer simulation for a game \- Stack Overflow, accessed August 12, 2025, [https://stackoverflow.com/questions/1427043/soccer-simulation-for-a-game](https://stackoverflow.com/questions/1427043/soccer-simulation-for-a-game)  
26. Improving soccer simulation algorithm \- Stack Overflow, accessed August 12, 2025, [https://stackoverflow.com/questions/1439102/improving-soccer-simulation-algorithm](https://stackoverflow.com/questions/1439102/improving-soccer-simulation-algorithm)  
27. Sources recommendations to learn how to make a simulation engine to simulate a match of a sport. : r/gamedev \- Reddit, accessed August 12, 2025, [https://www.reddit.com/r/gamedev/comments/1agme1w/sources\_recommendations\_to\_learn\_how\_to\_make\_a/](https://www.reddit.com/r/gamedev/comments/1agme1w/sources_recommendations_to_learn_how_to_make_a/)  
28. Lesson idea: using sports commentaries in class \- ELT Planning, accessed August 12, 2025, [https://eltplanning.com/2015/04/24/lesson-idea-using-sports-commentaries-in-class/](https://eltplanning.com/2015/04/24/lesson-idea-using-sports-commentaries-in-class/)  
29. Football live text commentary as a speech genre (Based on materials in English and Ukrainian languages) \- ResearchGate, accessed August 12, 2025, [https://www.researchgate.net/publication/380878326\_Football\_live\_text\_commentary\_as\_a\_speech\_genre\_Based\_on\_materials\_in\_English\_and\_Ukrainian\_languages](https://www.researchgate.net/publication/380878326_Football_live_text_commentary_as_a_speech_genre_Based_on_materials_in_English_and_Ukrainian_languages)  
30. Category:Sports Story Tropes, accessed August 12, 2025, [https://allthetropes.org/wiki/Category:Sports\_Story\_Tropes](https://allthetropes.org/wiki/Category:Sports_Story_Tropes)  
31. The Underdog Story in Romance: 6 Common Tropes \- Galatea Chronicles, accessed August 12, 2025, [https://galatea.com/h/blog/the-underdog-story-in-romance/](https://galatea.com/h/blog/the-underdog-story-in-romance/)  
32. Underdog \- Wikipedia, accessed August 12, 2025, [https://en.wikipedia.org/wiki/Underdog](https://en.wikipedia.org/wiki/Underdog)  
33. For the love of an underdog: Sports in film | Pop Verse, accessed August 12, 2025, [https://pop-verse.com/2017/02/27/for-the-love-of-an-underdog-sports-in-film/](https://pop-verse.com/2017/02/27/for-the-love-of-an-underdog-sports-in-film/)  
34. What are some examples of drama in high school? \- Quora, accessed August 12, 2025, [https://www.quora.com/What-are-some-examples-of-drama-in-high-school](https://www.quora.com/What-are-some-examples-of-drama-in-high-school)  
35. 101 Riveting Drama Story Prompts \- ScreenCraft, accessed August 12, 2025, [https://screencraft.org/blog/101-riveting-drama-story-prompts/](https://screencraft.org/blog/101-riveting-drama-story-prompts/)  
36. Best High School Story Ideas to Inspire Your Writing \- Reedsy Blog, accessed August 12, 2025, [https://blog.reedsy.com/short-story-ideas/high-school/](https://blog.reedsy.com/short-story-ideas/high-school/)  
37. Any ideas for Ideas for a Cliché American High School Teen Comedy Story? : r/AO3 \- Reddit, accessed August 12, 2025, [https://www.reddit.com/r/AO3/comments/1b0x6vu/any\_ideas\_for\_ideas\_for\_a\_clich%C3%A9\_american\_high/](https://www.reddit.com/r/AO3/comments/1b0x6vu/any_ideas_for_ideas_for_a_clich%C3%A9_american_high/)  
38. 75 Drama Writing Prompts To Spice Up Your Script | No Film School, accessed August 12, 2025, [https://nofilmschool.com/drama-writing-prompts](https://nofilmschool.com/drama-writing-prompts)  
39. Is Choices related to Surviving High School? \- Reddit, accessed August 12, 2025, [https://www.reddit.com/r/Choices/comments/9xag26/is\_choices\_related\_to\_surviving\_high\_school/](https://www.reddit.com/r/Choices/comments/9xag26/is_choices_related_to_surviving_high_school/)  
40. Game UI design: the mechanics of fun experiences \- Justinmind, accessed August 12, 2025, [https://www.justinmind.com/ui-design/game](https://www.justinmind.com/ui-design/game)  
41. Browse thousands of Game Manager UI images for design inspiration \- Dribbble, accessed August 12, 2025, [https://dribbble.com/search/game-manager-ui](https://dribbble.com/search/game-manager-ui)  
42. Browser game ui \- Pinterest, accessed August 12, 2025, [https://www.pinterest.com/iammrdjk/browser-game-ui/](https://www.pinterest.com/iammrdjk/browser-game-ui/)  
43. How to Make a Soccer Simulator : 11 Steps (with Pictures) \- Instructables, accessed August 12, 2025, [https://www.instructables.com/How-to-make-a-Soccer-Simulator/](https://www.instructables.com/How-to-make-a-Soccer-Simulator/)  
44. Phaser \- A fast, fun and free open source HTML5 game framework, accessed August 12, 2025, [https://phaser.io/](https://phaser.io/)  
45. Collection: JavaScript Game Engines \- GitHub, accessed August 12, 2025, [https://github.com/collections/javascript-game-engines](https://github.com/collections/javascript-game-engines)  
46. HTML5 Game Engines \- Find Which is Right For You, accessed August 12, 2025, [https://html5gameengine.com/](https://html5gameengine.com/)