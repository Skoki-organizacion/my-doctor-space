/**
 * The fixed clinical study workflow. Order is the order doctors work through,
 * and `field` is the value persisted as `Item.name`.
 */
export const studySteps = [
  { id: 1, field: "erhalt", title: "Erhalt der Studienanfrage" },
  {
    id: 2,
    field: "meldung",
    title: "Meldung an die/den Studienbeauftragten (Ärztliche Direktion)",
  },
  {
    id: 3,
    field: "vorprufung",
    title: "Vorprüfung der Machbarkeit und Ressourcenverfügbarkeit",
  },
  {
    id: 4,
    field: "kenntnisnahme",
    title:
      "Zur Kenntnisnahme an die ärztliche Abteilungsleitung (falls nicht identisch dem PI)",
  },
  {
    id: 5,
    field: "detailprufung",
    title:
      "Detailprüfung der Studienunterlagen – Studienbeauftragte*r (Ärztliche Direktion)",
  },
  {
    id: 6,
    field: "freigabe",
    title: "Vorprüfung und Freigabe durch die Ärztliche Direktion",
  },
  {
    id: 7,
    field: "bewertung",
    title:
      "Bewertung der ethischen und datenschutzrechtlichen Anforderungen – Studienbeauftragte*r(Ärztliche Direktion)",
  },
  {
    id: 8,
    field: "genehmigung",
    title:
      "Genehmigung durch die*den Datenschutzbeauftragte*n für Klinische Studien",
  },
  { id: 9, field: "verhandlung", title: "Verhandlung der Vertragsbedingungen" },
  {
    id: 10,
    field: "festlegung",
    title: "Festlegung des Budgets und finanzieller Rahmenbedingungen",
  },
  { id: 11, field: "abschluss", title: "Abschluss der Verträge" },
  { id: 12, field: "vorbereitung", title: "Vorbereitung der Studie" },
  { id: 13, field: "studien", title: "Studieninitiierung" },
  {
    id: 14,
    field: "durchfuhrung",
    title: "Durchführung des First Patient First Visit (FPFV)",
  },
  {
    id: 15,
    field: "patienten_one",
    title: "Patientenanzahl im Screening 1. Monat",
  },
  { id: 16, field: "stand_one", title: "Stand der Randomisierung 1. Monat" },
  {
    id: 17,
    field: "patienten_two",
    title: "Patientenanzahl im Screening 2. Monat",
  },
  { id: 18, field: "stand_two", title: "Stand der Randomisierung 2. Monat" },
  {
    id: 19,
    field: "patienten_three",
    title: "Patientenanzahl im Screening 3. Monat",
  },
  { id: 20, field: "stand_three", title: "Stand der Randomisierung 3. Monat" },
  {
    id: 21,
    field: "ubernahme",
    title: "Übernahme der vollständigen Studien-Checkliste",
  },
] as const satisfies readonly StudyStepDefinition[];

type StudyStepDefinition = {
  id: number;
  field: string;
  title: string;
};

export type StudyStep = (typeof studySteps)[number];
export type StudyStepField = StudyStep["field"];

export const TOTAL_STUDY_STEPS = studySteps.length;
