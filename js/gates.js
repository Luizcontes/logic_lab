const binaryInputs = ["A", "B"];

const gateDefinitions = [
  {
    id: "and",
    name: "AND",
    symbol: "A · B",
    description: "High only when every input is high.",
    inputs: binaryInputs,
    evaluate: (values) => values.A & values.B,
  },
  {
    id: "or",
    name: "OR",
    symbol: "A + B",
    description: "High when at least one input is high.",
    inputs: binaryInputs,
    evaluate: (values) => values.A | values.B,
  },
  {
    id: "not",
    name: "NOT",
    symbol: "¬A",
    description: "Inverts the signal at its input.",
    inputs: ["A"],
    evaluate: (values) => Number(!values.A),
  },
  {
    id: "nand",
    name: "NAND",
    symbol: "¬(A · B)",
    description: "The inverse of an AND gate.",
    inputs: binaryInputs,
    evaluate: (values) => Number(!(values.A & values.B)),
  },
  {
    id: "nor",
    name: "NOR",
    symbol: "¬(A + B)",
    description: "The inverse of an OR gate.",
    inputs: binaryInputs,
    evaluate: (values) => Number(!(values.A | values.B)),
  },
];

function getTruthTable(gate) {
  const rows = gate.inputs.length === 1
    ? [{ A: 0 }, { A: 1 }]
    : [
        { A: 0, B: 0 },
        { A: 0, B: 1 },
        { A: 1, B: 0 },
        { A: 1, B: 1 },
      ];

  return rows.map((inputs) => ({
    inputs,
    output: gate.evaluate(inputs),
  }));
}

window.LogicGates = {
  gates: gateDefinitions,
  getTruthTable,
};
