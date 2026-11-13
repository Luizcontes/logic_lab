const gateGrid = document.querySelector("#gate-grid");
const logicGates = window.LogicGates;
const gates = logicGates.gates;

function createGateCard(gate) {
  const card = document.createElement("article");
  card.className = "gate-card";
  card.dataset.gateId = gate.id;

  const initialValues = Object.fromEntries(gate.inputs.map((input) => [input, 0]));
  card.state = initialValues;

  card.innerHTML = `
    <header class="gate-card-header">
      <div>
        <h2>${gate.name}</h2>
        <p class="gate-description">${gate.description}</p>
      </div>
      <span class="gate-symbol">${gate.symbol}</span>
    </header>
    <div class="gate-demo">
      <div class="signal-stack" data-inputs aria-label="Gate inputs"></div>
      <div class="gate-visual" aria-hidden="true">${gate.name}</div>
      <div class="gate-output">
        <span>Output</span>
        <span class="output-value" data-output aria-live="polite">0</span>
      </div>
    </div>
    <div>
      <p class="table-heading">Truth table</p>
      <table class="truth-table">
        <thead><tr>${gate.inputs.map((input) => `<th scope="col">${input}</th>`).join("")}<th scope="col">Output</th></tr></thead>
        <tbody data-table-body></tbody>
      </table>
    </div>
  `;

  const inputsContainer = card.querySelector("[data-inputs]");
  gate.inputs.forEach((input) => {
    const button = document.createElement("button");
    button.className = "signal-control";
    button.type = "button";
    button.dataset.input = input;
    button.setAttribute("aria-label", `Toggle input ${input}`);
    button.innerHTML = `<span>Input ${input}</span><span class="signal-value" data-signal-value>0</span>`;
    button.addEventListener("click", () => {
      card.state[input] = card.state[input] === 0 ? 1 : 0;
      updateCard(card, gate);
    });
    inputsContainer.append(button);
  });

  updateCard(card, gate);
  return card;
}

function renderTruthTable(card, gate) {
  const tableBody = card.querySelector("[data-table-body]");
  const activeInputs = card.state;

  tableBody.innerHTML = logicGates.getTruthTable(gate)
    .map(({ inputs, output }) => {
      const isActive = gate.inputs.every((input) => inputs[input] === activeInputs[input]);
      const cells = gate.inputs.map((input) => `<td>${inputs[input]}</td>`).join("");
      return `<tr data-active="${isActive}">${cells}<td>${output}</td></tr>`;
    })
    .join("");
}

function updateCard(card, gate) {
  const output = gate.evaluate(card.state);
  card.querySelector("[data-output]").textContent = output;
  card.querySelector("[data-output]").dataset.value = output;

  card.querySelectorAll("[data-input]").forEach((button) => {
    const value = card.state[button.dataset.input];
    button.dataset.value = value;
    button.querySelector("[data-signal-value]").textContent = value;
    button.setAttribute("aria-pressed", value === 1 ? "true" : "false");
  });

  renderTruthTable(card, gate);
}

if (gateGrid) {
  gateGrid.replaceChildren(...gates.map(createGateCard));
}
