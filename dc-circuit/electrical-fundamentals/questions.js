/* Electrical Fundamentals questions (58, in assessment order).
   Used by the Electrical Fundamentals study guide and its one-at-a-time quiz.
   Types: mc (multiple choice), match, fill (blanks), calc (type in values), recall (reveal, then mark yourself). */
(function () {
  const TF = (n, statement, value, answer) => ({
    n, type: "mc", kind: "True or false", letters: false, title: statement,
    options: ["True", "False"], correct: [value ? "a" : "b"],
    answer: answer || (value ? "True." : "False."),
    key: value ? "True." : "False."
  });
  const FAULTS = ["R1 is open circuit", "R1 is short circuit", "R2 is open circuit", "R2 is short circuit"];
  const CURRENT = ["increased", "decreased", "ceased"];

  window.QUIZ_QUESTIONS = [
    { n: 1, type: "mc", title: "Changing conductor material",
      prompt: "For a given length and CSA, what result would occur if we changed the conductor material from nichrome to copper?",
      options: ["Resistance will increase", "No change", "Resistance will decrease", "Resistance will not change"],
      correct: ["c"],
      answer: "c. Resistance will decrease. Copper has a much lower resistivity than nichrome.",
      key: "c. Resistance will decrease." },

    { n: 2, type: "mc", title: "Capacitor symbols",
      prompt: "Select the correct order of the capacitors in the diagram (A, B, C, D). In the diagram, A is two plain parallel plates, B has a diagonal line ending in a T-bar, C has a diagonal arrow, and D has a + sign on one plate.",
      options: ["Polarised, Standard, Trimmer, Variable.", "Trimmer, Polarised, Standard, Variable.", "Standard, Trimmer, Variable, Polarised.", "Standard, Variable, Trimmer, Polarised."],
      correct: ["c"],
      answer: "c. Standard, Trimmer, Variable, Polarised. The T-bar marks a trimmer (preset), the arrow marks a variable capacitor, and the + marks a polarised one.",
      key: "c. Standard, Trimmer, Variable, Polarised." },

    TF(3, "Power losses in a conductor can be reduced by using a conductor with lower resistance.", true,
      "True. Power loss = I²R, so less resistance means less loss."),

    { n: 4, type: "mc", title: "Resistance from a graph",
      prompt: "The following graph was produced from measured values of a resistor. What is the resistance value indicated by the graph? The graph plots current (A) against voltage (V) as a straight line from 0 up to 6 A at 12 V.",
      options: ["0.5 Ω", "2 Ω", "1 Ω", "4 Ω"],
      correct: ["b"],
      answer: "b. 2 Ω. R = V ÷ I = 12 V ÷ 6 A (or any other point, such as 4 V ÷ 2 A).",
      key: "b. 2 Ω." },

    TF(5, "The power rating of a resistor refers to the amount of heat that can be dissipated by it without damage.", true,
      "True. The power rating (in watts) is the most heat the resistor can get rid of without being damaged."),

    { n: 6, type: "match", title: "Match the component to its function",
      prompt: "For the image of a basic electrical circuit, match each component to its function.",
      placeholder: "Choose component…",
      hint: "Choose the component for each function, then check your answers.",
      rows: [
        ["Load", "Lamp"],
        ["Power source", "Battery"],
        ["Overcurrent protection", "Fuse"],
        ["Current control", "Resistor"],
        ["Circuit connections", "Wires"],
        ["Energise / de-energise circuit", "Switch"]
      ],
      answer: "Load: Lamp. Power source: Battery. Overcurrent protection: Fuse. Current control: Resistor. Circuit connections: Wires. Energise / de-energise circuit: Switch.",
      key: "Lamp, Battery, Fuse, Resistor, Wires, Switch (top to bottom)." },

    { n: 7, type: "mc", title: "Which cells use light to produce electricity?",
      options: ["Fuel", "Piezo-electric", "Photovoltaic", "Battery"],
      correct: ["c"],
      answer: "c. Photovoltaic.",
      key: "c. Photovoltaic." },

    { n: 8, type: "calc", title: "Series circuit calculation",
      prompt: "Complete the table for a series circuit with VT = 24 V, R1 = 1.2 kΩ, R2 = 5.6 kΩ and R3 = 3.3 kΩ. Find RT, IT, VR1, VR3 and PR3.",
      fields: [
        { label: "RT", unit: "kΩ", answer: 10.1 },
        { label: "IT", unit: "mA", answer: 2.38 },
        { label: "VR1", unit: "V", answer: 2.86 },
        { label: "VR3", unit: "V", answer: 7.85 },
        { label: "PR3", unit: "mW", answer: 18.68 }
      ],
      answer: "RT = 10.1 kΩ, IT = 2.38 mA, VR1 = 2.86 V, VR3 = 7.85 V, PR3 = 18.68 mW. RT = R1 + R2 + R3, IT = VT ÷ RT, each voltage drop = IT × R, and PR3 = IT² × R3.",
      key: "RT 10.1 kΩ, IT 2.38 mA, VR1 2.86 V, VR3 7.85 V, PR3 18.68 mW." },

    { n: 9, type: "mc", title: "Fault finding at 100 mA",
      prompt: "A 10 V supply feeds fuse F1 and switch S1, then R1 (500 Ω) and R2 (100 Ω) in parallel. What is the fault if the total current flowing through the circuit is 100 mA?",
      options: ["R2 is short circuit.", "R2 is open circuit.", "R1 is open circuit.", "R1 is short circuit."],
      correct: ["c"],
      answer: "c. R1 is open circuit. Normally IT = 10 V ÷ 500 Ω + 10 V ÷ 100 Ω = 20 mA + 100 mA = 120 mA. 100 mA is exactly R2's current on its own, so R1's branch has opened.",
      key: "c. R1 is open circuit." },

    TF(10, "If the CSA of a conductor is increased, resistance will decrease and the current carrying capability will increase.", true),

    { n: 11, type: "mc", title: "Which of the following factors does NOT affect the resistance of a conductor?",
      options: ["Temperature", "Permeability", "Resistivity", "Length", "Cross-sectional area"],
      correct: ["b"],
      answer: "b. Permeability. That's a magnetic property. Resistance depends on resistivity, length, CSA and temperature.",
      key: "b. Permeability." },

    { n: 12, type: "recall", title: "Capacitor construction",
      prompt: "The image shows the basic construction of a capacitor. Label all parts as shown. (In the assessment this is a drag-and-drop question. The image isn't included here.)",
      answer: "A capacitor is two conductive plates separated by a dielectric (insulator), with a lead connected to each plate.",
      key: "Two conductive plates, a dielectric between them, and a lead on each plate." },

    { n: 13, type: "mc", title: "Which of the following is correct for an NTC thermistor?",
      options: ["Resistance decreases as temperature increases.", "Resistance doesn't change with temperature.", "Resistance decreases as temperature decreases.", "Resistance increases as temperature increases."],
      correct: ["a"],
      answer: "a. NTC means negative temperature coefficient: resistance goes down as temperature goes up.",
      key: "a. Resistance decreases as temperature increases." },

    { n: 14, type: "mc", title: "Fault finding at 60 mA",
      prompt: "For the circuit shown, what is the fault if the total current flowing through the circuit is 60 mA? (The circuit isn't included here.)",
      options: ["R2 is short circuit", "R1 is open circuit", "Either R2 or R3 is open circuit", "R1 is short circuit"],
      correct: ["c"],
      answer: "c. Either R2 or R3 is open circuit. The current dropped but didn't stop, so a parallel branch has opened.",
      key: "c. Either R2 or R3 is open circuit." },

    { n: 15, type: "mc", title: "A VDR changes its resistance as:",
      options: ["Temperature varies.", "Current varies.", "Resistance varies.", "Voltage varies."],
      correct: ["d"],
      answer: "d. Voltage varies. VDR stands for voltage dependent resistor.",
      key: "d. Voltage varies." },

    { n: 16, type: "recall", title: "Energy sources",
      prompt: "Provide one example of each type of energy source: a. renewable, b. non-renewable.",
      answer: "a. Renewable: windmills (wind). b. Non-renewable: diesel.",
      key: "Renewable: wind. Non-renewable: diesel." },

    { n: 17, type: "mc", kind: "Select three", title: "Which of the following are physiological effects of current? (Select three)",
      options: ["Ventricular fibrillation", "Asphyxia", "Bone calcification", "Respiratory arrest"],
      correct: ["a", "b", "d"],
      answer: "a, b, d.",
      key: "a, b, d." },

    { n: 18, type: "match", title: "Match the effects of current to the correct principle",
      placeholder: "Choose effect…",
      hint: "Choose the effect for each principle, then check your answers.",
      rows: [
        ["Damage to human body", "Physiological"],
        ["Current flowing through a conductor generates a field", "Magnetic"],
        ["Battery", "Chemical"],
        ["By-product of current flowing through a resistance", "Heat"]
      ],
      answer: "Damage to human body: Physiological. Field around a conductor: Magnetic. Battery: Chemical. By-product of current through a resistance: Heat.",
      key: "Physiological, Magnetic, Chemical, Heat (top to bottom)." },

    { n: 19, type: "mc", title: "Relative permittivity",
      prompt: "As a reference point, the relative permittivity in a vacuum is 1. Which of the following capacitor dielectrics is the next lowest?",
      options: ["Air", "Mica", "Glass", "Polystyrene"],
      correct: ["a"],
      answer: "a. Air (about 1.0006). Polystyrene is about 2.5, and mica and glass are higher again.",
      key: "a. Air." },

    { n: 20, type: "mc", title: "Which of the following is NOT a method of protection against the damaging effects of current?",
      options: ["Circuit breaker", "Earthing", "Fuse", "Autotransformer"],
      correct: ["d"],
      answer: "d. Autotransformer. It changes voltage levels; it doesn't protect anything.",
      key: "d. Autotransformer." },

    { n: 21, type: "fill", title: "Complete the sentences",
      prompt: "The chemical reaction in a battery produces an electromotive ______ capable of moving electrons through a conductive path. This electrical ______ has the capability to do ______ by a load. The ______ consumed is the rate of energy used by the load.",
      blanks: [
        { choices: ["force", "energy", "work", "power"], answer: "force" },
        { choices: ["force", "energy", "work", "power"], answer: "energy" },
        { choices: ["force", "energy", "work", "power"], answer: "work" },
        { choices: ["force", "energy", "work", "power"], answer: "power" }
      ],
      answer: "Force, energy, work, power.",
      key: "Force, energy, work, power." },

    TF(22, "Static electricity is an electric charge built up on the surface of a material through friction.", true),

    { n: 23, type: "mc", title: "Which of the following is NOT a type of capacitor commonly used in the electro-technology industry?",
      options: ["Electrolytic", "Carbon", "Tantalum", "Ceramic"],
      correct: ["b"],
      answer: "b. Carbon. Carbon is a resistor type.",
      key: "b. Carbon." },

    { n: 24, type: "mc", title: "Dissimilar metals",
      prompt: "The junction of two dissimilar metals can generate a voltage. Which of the following uses this effect as a temperature measuring device?",
      options: ["Hydrostat", "Thermometer", "Thermostat", "Thermocouple"],
      correct: ["d"],
      answer: "d. Thermocouple.",
      key: "d. Thermocouple." },

    { n: 25, type: "match", title: "Match the type and application of each resistor shown",
      prompt: "The five resistors pictured, top to bottom: a beige body with colour bands, a round disc with a red zigzag track, a black disc marked NTC, a blue disc, and a white ceramic body.",
      rowHeader: "Resistor pictured",
      cols: ["Type", "Application"],
      hint: "Choose the type and the application for each resistor, then check your answers.",
      rows: [
        ["Beige body with colour bands", "Carbon Film", "General purpose"],
        ["Round, red zigzag track", "Light Dependent Resistor (LDR)", "Lightmeters, automatic exposure controls"],
        ["Black disc marked NTC", "Thermistor", "Temperature monitoring / sensing (fire alarms, ovens, refrigerators)"],
        ["Blue disc", "VDR / Varistor", "Voltage surge protection"],
        ["White ceramic body", "Wire Wound", "Power applications requiring high power dissipation and accuracy"]
      ],
      answer: "Colour bands: Carbon Film, general purpose. Red zigzag track: LDR, lightmeters and automatic exposure controls. Black NTC disc: Thermistor, temperature sensing. Blue disc: VDR / Varistor, voltage surge protection. White ceramic: Wire Wound, high power dissipation and accuracy.",
      key: "Carbon Film, LDR, Thermistor, VDR / Varistor, Wire Wound (top to bottom)." },

    TF(26, "Capacitors are used in electro-technology for smoothing, filtering and timing applications.", true),

    { n: 27, type: "mc", title: "Poor efficiency and power losses in an electrical circuit lead to:",
      options: ["Nil circuit protection required.", "Increased operating costs due to waste.", "Ideal machine operation.", "Frequent interruption to supply."],
      correct: ["b"],
      answer: "b. Increased operating costs due to waste.",
      key: "b. Increased operating costs due to waste." },

    TF(28, "In a voltage divider network, the component with the smallest voltage drop across it is the component with the smallest resistance value.", true,
      "True. The same current flows through each resistor, so V = I × R is smallest across the smallest resistance."),

    { n: 29, type: "fill", title: "Ohm's law",
      prompt: "Ohm's law states that the current (I) in an electrical circuit is ______ proportional to the voltage (V) and ______ proportional to resistance (Ω).",
      blanks: [
        { choices: ["directly", "inversely"], answer: "directly" },
        { choices: ["directly", "inversely"], answer: "inversely" }
      ],
      answer: "Directly; inversely. I = V ÷ R, so more voltage means more current, and more resistance means less current.",
      key: "Directly; inversely." },

    { n: 30, type: "mc", title: "Voltage after one time constant",
      prompt: "Given the circuit shown, what is the voltage across the capacitor after one time constant? (The circuit isn't included here.)",
      options: ["63.2 V", "68.2 V", "36.8 V", "31.8 V"],
      correct: ["a"],
      answer: "a. 63.2 V. A charging capacitor reaches 63.2% of the supply voltage after one time constant.",
      key: "a. 63.2 V." },

    TF(31, "Capacitors connected in series to a DC supply will each store the same amount of charge (in coulombs).", true,
      "True. The same charging current flows through every capacitor in series, so each one stores the same charge (Q)."),

    { n: 32, type: "calc", title: "Parallel circuit calculation",
      prompt: "Complete the table for a parallel circuit with VT = 13 V, R1 = 820 Ω, R2 = 2.2 kΩ and R3 = 150 Ω. Find RT, IT, VR1, IR2 and PR2.",
      fields: [
        { label: "RT", unit: "Ω", answer: 119.89 },
        { label: "IT", unit: "mA", answer: 108.43 },
        { label: "VR1", unit: "V", answer: 13 },
        { label: "IR2", unit: "mA", answer: 5.91 },
        { label: "PR2", unit: "mW", answer: 76.82 }
      ],
      answer: "RT = 119.89 Ω, IT = 108.43 mA, VR1 = 13 V, IR2 = 5.91 mA, PR2 = 76.82 mW. 1 ÷ RT = 1 ÷ R1 + 1 ÷ R2 + 1 ÷ R3. Every branch has the full 13 V across it, so IR2 = 13 V ÷ 2.2 kΩ and PR2 = V² ÷ R2.",
      key: "RT 119.89 Ω, IT 108.43 mA, VR1 13 V, IR2 5.91 mA, PR2 76.82 mW." },

    { n: 33, type: "mc", title: "Which of the following test equipment would NOT be used to test the serviceability of a capacitor?",
      options: ["Analogue ohmmeter", "Multimeter with inbuilt capacitor tester", "Dedicated LCR meter", "Insulation resistance tester"],
      correct: ["d"],
      answer: "d. Insulation resistance tester (most likely, not confirmed). c was marked wrong in the assessment, so the answer is a or d. The analogue ohmmeter is the standard trainee test: the needle kicks towards zero, then returns to infinity as the capacitor charges. IR testers are sometimes used on high-voltage capacitors in industry, so check your course notes.",
      key: "d. Insulation resistance tester (to confirm)." },

    { n: 34, type: "recall", title: "Total capacitance",
      prompt: "Calculate total capacitance for the circuit shown. (The circuit isn't included here.)",
      answer: "CT = 65 µF.",
      key: "CT = 65 µF." },

    TF(35, "A capacitance value of 60 µF could be achieved by connecting a 27 µF capacitor and a 33 µF capacitor in a series configuration.", false,
      "False. In series, 1 ÷ CT = 1 ÷ 27 + 1 ÷ 33, which gives about 14.85 µF. They'd need to be in parallel to make 60 µF."),

    { n: 36, type: "mc", title: "How long does it take a solenoid to travel 20 mm if its average speed is 10 m/s?",
      options: ["20 ms", "2 ms", "5 ms", "1 ms"],
      correct: ["b"],
      answer: "b. 2 ms. Time = distance ÷ speed = 0.02 m ÷ 10 m/s = 0.002 s.",
      key: "b. 2 ms." },

    { n: 37, type: "recall", title: "Power distribution system",
      prompt: "Name the unidentified components of a basic electrical power distribution system. (In the assessment this is a drag-and-drop question. The image isn't included here.)",
      answer: "A typical system runs from the power station (generation) through a step-up transformer, transmission lines, a substation (step-down) and a distribution transformer to the consumer.",
      key: "Power station → step-up transformer → transmission lines → substation → distribution transformer → consumer." },

    { n: 38, type: "recall", title: "Time constant",
      prompt: "What is the time constant for the circuit shown, and how long will it take to fully charge (or discharge)? (The circuit isn't included here.)",
      answer: "TC = 59.4 ms. Fully charged in 297 ms (5 time constants).",
      key: "TC = 59.4 ms; fully charged in 297 ms." },

    { n: 39, type: "fill", title: "Conservation of energy",
      prompt: "Energy is neither ______ nor destroyed, but only ______ from one form to another.",
      blanks: [
        { choices: ["created", "converted"], answer: "created" },
        { choices: ["created", "converted"], answer: "converted" }
      ],
      answer: "Created; converted.",
      key: "Created; converted." },

    { n: 40, type: "mc", title: "If the temperature of a conductor is increased, its resistance will:",
      options: ["Increase", "Drop to zero", "Remain unchanged", "Decrease"],
      correct: ["a"],
      answer: "a. Increase.",
      key: "a. Increase." },

    { n: 41, type: "match", title: "Match the circuit type to its correct application",
      placeholder: "Choose circuit type…",
      hint: "Choose the circuit type for each application, then check your answers.",
      rows: [
        ["Voltage divider", "Series"],
        ["Bridge circuit", "Parallel"],
        ["Loaded voltage divider", "Series/Parallel"]
      ],
      answer: "Voltage divider: Series. Bridge circuit: Parallel. Loaded voltage divider: Series/Parallel. A plain voltage divider is resistors in series. Adding a load across one of them makes it series/parallel.",
      key: "Series, Parallel, Series/Parallel (top to bottom)." },

    { n: 42, type: "calc", title: "Circuit with S1 closed",
      prompt: "VT = 15 V across R1 (50 Ω) in series with R2 (200 Ω). Closing S1 connects R3 (200 Ω) in parallel with R2. Fill in the table with S1 closed.",
      fields: [
        { label: "VR1", unit: "V", answer: 5 },
        { label: "VR2", unit: "V", answer: 10 },
        { label: "VR3", unit: "V", answer: 10 },
        { label: "IR1", unit: "mA", answer: 100 },
        { label: "IR2", unit: "mA", answer: 50 },
        { label: "IR3", unit: "mA", answer: 50 },
        { label: "PT", unit: "W", answer: 1.5 },
        { label: "PR1", unit: "mW", answer: 500 },
        { label: "PR2", unit: "mW", answer: 500 }
      ],
      answer: "VR1 = 5 V, VR2 = 10 V, VR3 = 10 V, IR1 = 100 mA, IR2 = 50 mA, IR3 = 50 mA, PT = 1.5 W, PR1 = 500 mW, PR2 = 500 mW. R2 ∥ R3 = 100 Ω, so RT = 150 Ω and IT = 15 V ÷ 150 Ω = 100 mA. R1 drops 5 V, which leaves 10 V across R2 and R3, so PR2 = 10 V × 50 mA = 500 mW.",
      key: "VR1 5 V, VR2 10 V, VR3 10 V, IR1 100 mA, IR2 50 mA, IR3 50 mA, PT 1.5 W, PR1 500 mW, PR2 500 mW." },

    { n: 43, type: "mc", title: "What is the colour code for an 820 Ω, 5% tolerance resistor?",
      options: ["White, Red, Brown, Silver", "Grey, Red, Brown, Gold", "Grey, Red, Black, Gold", "White, Orange, Black, Silver"],
      correct: ["b"],
      answer: "b. Grey (8), red (2), brown (×10) = 820 Ω, and gold = ±5%.",
      key: "b. Grey, Red, Brown, Gold." },

    { n: 44, type: "mc", title: "What type of reaction is used to produce an electrical current in primary, secondary and fuel cells?",
      options: ["Heat", "Magnetic", "Chemical", "Mechanical"],
      correct: ["c"],
      answer: "c. Chemical.",
      key: "c. Chemical." },

    { n: 45, type: "mc", kind: "Select three", title: "Which of the following are faults known to develop in capacitors? (Select three)",
      options: ["Leaky capacitor due to dielectric deterioration", "Open circuit caused by internally disconnected lead", "Short circuit due to dielectric breakdown", "Inter-turn short circuit"],
      correct: ["a", "b", "c"],
      answer: "a, b, c. An inter-turn short is a fault in coils and windings, not capacitors.",
      key: "a, b, c." },

    { n: 46, type: "mc", title: "In a parallel circuit, the branch with the highest resistance value will:",
      options: ["Cause current to decrease to zero", "Cause an increase on total resistance", "Allow the highest amount of current to flow", "Allow the least amount of current to flow"],
      correct: ["d"],
      answer: "d. Allow the least amount of current to flow.",
      key: "d. Allow the least amount of current to flow." },

    { n: 47, type: "fill", title: "Fault: VR1 = 24 V, IT = 400 mA",
      prompt: "For the circuit shown, a fault condition has made VR1 = 24 V and IT = 400 mA. (The circuit isn't included here.) Complete the sentence: the fault is ______ because current has ______.",
      blanks: [
        { choices: FAULTS, answer: "R2 is short circuit" },
        { choices: CURRENT, answer: "increased" }
      ],
      answer: "R2 is short circuit; increased. The whole 24 V is across R1, so nothing else is dropping voltage. A short has lowered the total resistance, which pushes the current up.",
      key: "R2 is short circuit; increased." },

    { n: 48, type: "fill", title: "Fault: VR1 = 24 V, IT = 0 mA",
      prompt: "For the circuit shown, a fault condition has made VR1 = 24 V and IT = 0 mA. (The circuit isn't included here.) Complete the sentence: the fault is ______ because current has ______.",
      blanks: [
        { choices: FAULTS, answer: "R1 is open circuit" },
        { choices: CURRENT, answer: "ceased" }
      ],
      answer: "R1 is open circuit; ceased. With R1 open, no current flows and the full supply appears across the break.",
      key: "R1 is open circuit; ceased." },

    { n: 49, type: "mc", title: "To generate a voltage from an alternator, what three fundamental conditions must exist?",
      options: ["Rotation, magnetic field, and fuel", "Magnetic field, movement, conductors", "Movement, conductors, and rotation", "Rotation, electric supply, and prime mover"],
      correct: ["b"],
      answer: "b. Magnetic field, movement, conductors.",
      key: "b. Magnetic field, movement, conductors." },

    TF(50, "A light dependent resistor (LDR) has an increasing amount of resistance with an increase in illumination.", false,
      "False. An LDR's resistance decreases as light increases."),

    { n: 51, type: "mc", title: "What is the major difference between a potentiometer and a rheostat?",
      options: ["A rheostat is for wattages above 500 W. A potentiometer is used for wattages below this value.", "A potentiometer provides voltage adjustment. A rheostat provides current adjustment.", "A potentiometer provides current adjustment. A rheostat provides voltage adjustment.", "A potentiometer has two leads. A rheostat has three leads."],
      correct: ["b"],
      answer: "b. A potentiometer (three terminals) divides voltage. A rheostat (two terminals, in series) controls current.",
      key: "b. Potentiometer: voltage. Rheostat: current." },

    { n: 52, type: "match", title: "Practical uses of the effects of current",
      prompt: "Provide an example of a practical use for each effect.",
      placeholder: "Choose a use…",
      hint: "Choose a practical use for each effect, then check your answers.",
      rows: [
        ["Magnetic", "Electric motor rotors"],
        ["Heating", "Stove top"],
        ["Light", "Lamp"],
        ["Chemical", "Charging a battery"]
      ],
      answer: "Magnetic: electric motor rotors. Heating: stove top. Light: lamp. Chemical: charging a battery.",
      key: "Motor rotors, stove top, lamp, charging a battery (top to bottom)." },

    { n: 53, type: "mc", title: "Which of the following is NOT a factor that affects capacitance?",
      options: ["Plate area", "Thickness of the plates", "Dielectric material", "Distance between the plates"],
      correct: ["b"],
      answer: "b. Thickness of the plates. Capacitance depends on plate area, the distance between the plates and the dielectric.",
      key: "b. Thickness of the plates." },

    TF(54, "Before touching a capacitor, you should always consider the possibility that it is charged, due to the risk of electric shock.", true),

    { n: 55, type: "mc", kind: "Select two", title: "Which statements correctly describe the effects of resistance on the current carrying capacity and voltage drop in electrical cables? (Select two)",
      options: ["Increase in cable length increases resistance, decreases current carrying capacity and increases voltage drop.", "Decrease in cable material resistivity increases resistance, decreases current capacity and increases voltage drop.", "Increase in temperature reduces cable resistance, increases current carrying capacity and reduces voltage drop.", "Decrease in cable CSA increases resistance, decreases current carrying capacity and increases voltage drop."],
      correct: ["a", "d"],
      answer: "a, d. b is wrong because lower resistivity lowers resistance, and c is wrong because higher temperature raises resistance.",
      key: "a, d." },

    { n: 56, type: "mc", title: "When a crystal is subject to an applied pressure, the generated voltage is referred to as:",
      options: ["Voltaic cell", "Piezo electricity", "Oxygen fuel", "Compression power"],
      correct: ["b"],
      answer: "b. Piezo electricity.",
      key: "b. Piezo electricity." },

    { n: 57, type: "recall", title: "Total capacitance",
      prompt: "Calculate total capacitance for the circuit shown. (The circuit isn't included here.)",
      answer: "CT = 8.55 µF.",
      key: "CT = 8.55 µF." },

    { n: 58, type: "mc", title: "What essential safety precaution must be observed before testing or handling high voltage capacitors?",
      options: ["Discharge the capacitor with a discharge probe", "Capacitors require no safety precautions to be observed", "Ensure the red multimeter probe is connected to the 10A socket", "Discharge the capacitor with a shorting wire"],
      correct: ["a"],
      answer: "a. A discharge probe bleeds the charge off through a resistor. A shorting wire can cause a dangerous arc and damage the capacitor.",
      key: "a. Discharge with a discharge probe." }
  ];
})();
