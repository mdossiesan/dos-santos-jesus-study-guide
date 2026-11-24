/* DC Study Guide questions. Used by the study guide page and the one-at-a-time quiz.
   follows: keeps a question straight after the one it refers to when shuffled. */
window.QUIZ_QUESTIONS = [
  { n: 1, type: "mc", title: "Meter connected across a component",
    prompt: "In a powered 4.5 V circuit, an analogue meter's + terminal connects to the top (positive side) of R2, and its − terminal connects to the bottom of R2. Select the correct response.",
    options: ["The meter is connected to measure current.", "The meter is connected to measure resistance.", "The meter is connected to measure voltage.", "The meter will be damaged as the leads are reversed."],
    correct: ["c"],
    answer: "c. The meter is connected to measure voltage. It's across R2 (in parallel), with the circuit powered.",
    key: "c. Voltage." },

  { n: 2, type: "tf", title: "Voltage testers: true or false",
    rows: [
      ["Non-contact voltage testers operate by detecting an electric field, making operation safer due to no contact required.", true],
      ["Non-contact voltage testers will detect DC voltages only.", false],
      ["LED, neon and solenoid testers require care to be taken during measurement due to being in contact with a live source.", true],
      ["Voltage testers give an accurate voltage measurement.", false],
      ["Voltage testers are used by technicians to indicate the presence of live circuits.", true],
      ["Non-contact voltage testers require the tip to be placed in close proximity to the circuit being tested.", true]
    ],
    why: "Non-contact testers detect AC only. Voltage testers indicate that voltage is present; they don't measure it.",
    key: "T, F, T, F, T, T." },

  { n: 3, type: "mc", kind: "Select three", title: "Which of the following are safety requirement statements when using measuring devices? (Select three)",
    options: ["Hold probe tips with bare hands while taking live measurements to improve accuracy.", "If you are confident in the workplace you do not need to review safety requirements.", "Open equipment should be considered live (energised) until isolation is proven.", "Wherever possible, switch off, unplug and discharge equipment under repair.", "Watches, rings and jewellery should be removed."],
    correct: ["c", "d", "e"],
    answer: "c, d, e.",
    key: "c, d, e." },

  { n: 4, type: "match", title: "Match the test equipment to the task it is used for",
    placeholder: "Choose equipment…",
    hint: "Choose the test equipment for each task, then check your answers.",
    rows: [
      ["Simple, easy to use, with contact required for testing for a live circuit", "Neon Tester"],
      ["Meter incorporating voltage, current and resistance measurement functions", "Digital / Analog Multimeter"],
      ["Non-contact tester for testing for live (energised) terminals and tracing breaks along cables", "Volt Stick (LED or Lamp)"],
      ["Non-contact, high current measurements", "Clamp Meter"],
      ["Rugged voltage indicator (approx. 12 to 600 V) suited to noisy, poorly illuminated or very bright surroundings due to its vibration and sound function", "Solenoid Tester"],
      ["Testing for current leakage caused by faulty or damaged insulation", "Insulation Resistance Tester"]
    ],
    answer: "From the top task down: Neon Tester, Digital / Analog Multimeter, Volt Stick (LED or Lamp), Clamp Meter, Solenoid Tester, Insulation Resistance Tester.",
    key: "Neon, Multimeter, Volt Stick, Clamp Meter, Solenoid, Insulation (top to bottom)." },

  { n: 5, type: "order", title: "What are the four steps that must occur before using a tester (multimeter / voltage indicator) to ensure serviceability? Put them in order.",
    given: ["Test the meter on a 'known voltage source' to confirm meter operation.", "Conduct a continuity test (confirm conductor serviceability).", "Physical inspection of the case and leads.", "Check the calibration date (if applicable)."],
    order: ["Physical inspection of the case and leads.", "Check the calibration date (if applicable).", "Conduct a continuity test (confirm conductor serviceability).", "Test the meter on a 'known voltage source' to confirm meter operation."],
    key: "Inspect case and leads → check calibration date → continuity test → test on a known voltage source." },

  { n: 6, type: "fill", title: "Complete the sentence",
    prompt: "When measuring resistance with a multimeter, the probes should be connected in ______ (series / parallel) with the component, and the circuit should be ______ (energised / de-energised).",
    blanks: [
      { choices: ["series", "parallel"], answer: "parallel" },
      { choices: ["energised", "de-energised"], answer: "de-energised" }
    ],
    answer: "Parallel; de-energised. Resistance is measured across the component with the power off, because the meter supplies its own test current.",
    key: "Parallel; de-energised." },

  { n: 7, type: "order", title: "Insulation resistance test: put the steps in order",
    given: ["Read and record the measurement.", "Connect the black lead to the ground side to be measured.", "Determine and select the measurement voltage relevant to industry standards.", "Isolate the circuit to be tested.", "Complete the TEST process IAW manufacturer's instructions.", "Verify that the MEASURE key is not in the measure position.", "Connect the red lead to the line being measured."],
    order: ["Isolate the circuit to be tested.", "Verify that the MEASURE key is not in the measure position.", "Determine and select the measurement voltage relevant to industry standards.", "Connect the black lead to the ground side to be measured.", "Connect the red lead to the line being measured.", "Complete the TEST process IAW manufacturer's instructions.", "Read and record the measurement."],
    key: "Isolate → MEASURE key off → select voltage → black lead to ground → red lead to line → test → read and record." },

  { n: 8, type: "mc", kind: "Select five", title: "When selecting a meter, which of the following should be considered? (Select five)",
    options: ["Range/s", "Cost", "Manufacturer", "Type of measurement required", "Accuracy", "Internal resistance", "Analogue/Digital"],
    correct: ["a", "d", "e", "f", "g"],
    answer: "a, d, e, f, g. Cost and manufacturer are purchasing considerations, not technical ones.",
    key: "a, d, e, f, g." },

  { n: 9, type: "mc", title: "Bridge circuit",
    prompt: "A bridge circuit has R1 = 200 Ω, R2 = 200 Ω, Rs = 1 kΩ and Rx unknown. For a balanced circuit, what is the resistance value of Rx?",
    options: ["200 Ω", "Depends on the voltage", "1.2 kΩ", "1 kΩ"],
    correct: ["d"],
    answer: "d. 1 kΩ. With R1 = R2, the bridge balances when Rx equals Rs.",
    key: "d. 1 kΩ." },

  { n: 10, type: "mc", title: "Reading an analogue scale",
    prompt: "An analogue multimeter has 0–250, 0–50 and 0–10 DCV scales. The switch is set to the 1 DCV position, and the needle sits at 8.8 on the 0–10 scale. What value is being displayed?",
    options: ["0.45 Vdc", "0.88 Vdc", "21.2 Vdc", "8.8 Vdc"],
    correct: ["b"],
    answer: "b. 0.88 Vdc. On the 1 V range, read the 0–10 scale and divide by 10.",
    key: "b. 0.88 Vdc." },

  { n: 11, type: "tf", title: "Analogue vs digital multimeters: true or false",
    rows: [
      ["Analog multimeters require zeroing prior to resistance measurements.", true],
      ["Digital multimeters have lower input impedance (resistance) than analog multimeters for voltage measurements.", false],
      ["Range and polarity of the leads are critical for analog multimeters to avoid full scale deflection and meter damage.", true],
      ["Digital multimeters are simpler to use than analog.", true],
      ["Digital multimeters are subject to parallax error.", false],
      ["Digital multimeters respond quicker than analog multimeters.", false],
      ["Analog meters are auto-ranging.", false],
      ["A voltmeter is an instrument used to measure voltages of either direct or alternating current, in volts.", true],
      ["An ammeter is an instrument for measuring either direct or alternating current, in amperes.", true]
    ],
    why: "DMMs have higher input impedance (about 10 MΩ). Parallax only affects needle meters. Analogue meters respond faster to changing values. Auto-ranging is a digital feature.",
    key: "T, F, T, T, F, F, F, T, T." },

  { n: 12, type: "mc", title: "Which of the following is NOT a consequence of connecting an ammeter in parallel with a component?",
    options: ["Meter loading effect", "Short circuit across the component", "Blowing the internal fuse of the meter", "Increase of measurement accuracy"],
    correct: ["d"],
    answer: "d. Increase of measurement accuracy. An ammeter in parallel shorts the component, can blow the meter's fuse and loads the circuit. Accuracy never improves.",
    key: "d. Increase of measurement accuracy." },

  { n: 13, type: "mc", title: "Meter loading",
    prompt: "A 15 V supply feeds a closed switch S1, R1 (5 MΩ) and R2 (10 MΩ) in series. A multimeter with 10 MΩ internal resistance and ±2% accuracy is connected across R2. What voltage will the meter display?",
    options: ["10.00 Vdc", "7.50 Vdc", "15.00 Vdc", "5.00 Vdc"],
    correct: ["b"],
    answer: "b. 7.50 Vdc (7.35–7.65 V with ±2%). The meter's 10 MΩ in parallel with R2's 10 MΩ gives 5 MΩ, so the 15 V splits evenly with R1. Without the meter, R2 would have 10 V.",
    key: "b. 7.50 Vdc." },

  { n: 14, type: "mc", kind: "True or false", letters: false, follows: 13, title: "True or false",
    prompt: "For the measurement in question 13, the loading effect of the meter has affected the operation of the circuit.",
    options: ["True", "False"],
    correct: ["a"],
    answer: "True. Connecting the meter dropped R2's voltage from 10 V to 7.5 V.",
    key: "True." },

  { n: 15, type: "mc", title: "Referring to meters, which of the following statements is correct?",
    options: ["Ammeter internal resistance must be extremely low to reduce the loading effect on the circuit.", "Meter internal resistance does not affect circuit operation.", "Voltmeter internal resistance must be very low to reduce the loading effect on the circuit.", "Ammeter internal resistance must be high to reduce the loading effect on the circuit."],
    correct: ["a"],
    answer: "a. An ammeter (in series) needs very low resistance, and a voltmeter (in parallel) needs very high resistance.",
    key: "a." },

  { n: 16, type: "mc", title: "What is the function of the reflective strip behind the needle of an analogue meter?",
    options: ["Makes small needle variations more visible to the operator.", "Assists the operator to view the needle at 90 degrees to reduce parallax error.", "Provides a lamp background function.", "Removes stray magnetic fields from affecting needle movement."],
    correct: ["b"],
    answer: "b. The strip is a mirror. When the needle hides its own reflection, your eye is square to the scale.",
    key: "b." },

  { n: 17, type: "mc", title: "Reading a negative value",
    prompt: "A digital multimeter is connected across R2 in a 4.5 V circuit. The black (COM) lead is on the top (positive) side of R2, and the red lead is on the bottom (negative) side. The display reads -3.24. Select the correct statement.",
    options: ["The multimeter is connected correctly and is measuring DC voltage.", "The multimeter probes are connected reversed.", "The multimeter is connected correctly and is measuring current.", "The multimeter is connected correctly and is measuring resistance."],
    correct: ["b"],
    answer: "b. The probes are connected reversed. COM on the positive side gives a negative reading.",
    key: "b. The probes are connected reversed." },

  { n: 18, type: "mc", title: "When an analogue needle moves to its furthest point, what is this known as?",
    options: ["Full scale movement", "Maximum deflection", "Full scale deflection", "Partial deflection"],
    correct: ["c"],
    answer: "c. Full scale deflection (FSD).",
    key: "c. Full scale deflection (FSD)." },

  { n: 19, type: "mc", title: "Meter wired into the circuit",
    prompt: "An analogue meter is wired into a break in the circuit, between switch S1 and R1. Its + terminal goes towards the battery positive, and its − terminal goes towards R1. Select the correct response.",
    options: ["The meter is connected to measure voltage.", "The meter is connected to measure current.", "The meter is connected to measure resistance.", "The meter will be damaged as the leads are reversed."],
    correct: ["b"],
    answer: "b. The meter is connected to measure current. It's in series, in a break in the circuit, with correct polarity.",
    key: "b. Current." },

  { n: 20, type: "mc", title: "What does the purpose of a calibration on measurement equipment ensure?",
    options: ["Accuracy of measurements", "Meter serviceability", "Use by date has not expired", "All of the above"],
    correct: ["a"],
    answer: "a. Accuracy of measurements.",
    key: "a. Accuracy of measurements." },

  { n: 21, type: "mc", kind: "Select three", title: "What hazards or issues may be evident if measuring devices are used incorrectly? (Select three)",
    options: ["Electric shock", "The device doesn't work, no hazards occur", "Inaccurate / false measurements", "Damage to analog tester due to incorrect polarity and range", "Elimination of the need to use PPE"],
    correct: ["a", "c", "d"],
    answer: "a, c, d.",
    key: "a, c, d." },

  { n: 22, type: "mc", kind: "Select three", title: "Which of the following describe effects of electrical current and relevant industry principles for protection against current damage and metal corrosion? (Select three)",
    options: ["Industry standards allow unrestricted current flow as long as personal protective equipment (PPE) is worn.", "Electrical current can accelerate corrosion in metals through electrochemical reactions, particularly in the presence of moisture, leading to material degradation and failure, addressed by use of sacrificial anodes and protective coatings. Electrical current prevents corrosion by strengthening metallic bonds once installed in a circuit.", "Excessive current can cause overheating of conductors and components, leading to insulation failure, fire risk and equipment damage, addressed through protective devices such as fuses and circuit breakers.", "Electrical current flowing through the human body can cause effects ranging from muscle contraction to fatal injury, which is why industry standards specify limits on safe touch voltages and currents."],
    correct: ["b", "c", "d"],
    answer: "b, c, d.",
    key: "b, c, d." }
];
