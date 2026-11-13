# Logic Lab

Logic Lab is a small educational web page for exploring fundamental electronic gates. It uses only plain HTML, CSS, and JavaScript, with no build step or external dependencies.

## Iteration 1

This iteration includes:

- AND, OR, NOT, NAND, and NOR gates.
- A reusable gate card for each gate.
- Toggleable binary inputs with immediate output updates.
- A truth table generated from the same gate definition used for the live output.
- Responsive layout and keyboard-accessible controls.

Circuit composition, drag-and-drop editing, saved circuits, additional gate families, and backend functionality are intentionally out of scope for this iteration.

## Structure

- `index.html` contains the semantic page shell and application mount point.
- `css/styles.css` contains the design system and responsive visual styles.
- `js/gates.js` contains gate metadata, Boolean evaluation functions, and truth-table generation.
- `js/app.js` renders cards, manages input state, and updates outputs and active truth-table rows.

To add a gate, add one definition to `js/gates.js` with an `id`, display metadata, an `inputs` array, and an `evaluate` function. The existing renderer will create its controls and truth table automatically.

## Design system

The CSS uses custom properties for:

- Neutral paper/surface colors and the teal accent.
- High/low signal colors.
- Typography families and spacing scale.
- Card radii, shadows, and maximum content width.

The layout uses a responsive auto-fit grid. On smaller screens the cards become one column, while the gate demonstration keeps inputs, gate, and output visually connected.

## Running locally

Open `index.html` directly in a modern browser, or serve the folder with any simple static file server. The page uses regular scripts so it also works when opened as a local file.

## Future iterations

Potential next steps are XOR/XNOR gates, composed circuits, input presets, a visual circuit builder, and automated browser tests for gate behavior.
