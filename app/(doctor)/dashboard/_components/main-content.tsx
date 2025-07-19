import { StatsCard, StatsGrid } from "@/components/stats-grid";
import React from "react";
import { NavigationItem } from "./navigation-item";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function DoctorDashboardMainContent() {
  const stats = [
    {
      id: 1,
      title: "Erhalt der Studienanfrage",
      checked: true,
      date: null,
    },
    {
      id: 2,
      title: "Meldung an die/den Studienbeauftragten (Ärztliche Direktion)",
      checked: false,
      date: null,
    },
    {
      id: 3,
      title: "Vorprüfung der Machbarkeit und Ressourcenverfügbarkeit",
      checked: false,
      date: null,
    },
    {
      id: 4,
      title:
        "Zur Kenntnisnahme an die ärztliche Abteilungsleitung (falls nicht identisch dem PI)",
      checked: false,
      date: null,
    },
    {
      id: 5,
      title:
        "Detailprüfung der Studienunterlagen – Studienbeauftragte*r (Ärztliche Direktion)",
      checked: false,
      date: null,
    },
    {
      id: 6,
      title: "Vorprüfung und Freigabe durch die Ärztliche Direktion",
      checked: false,
      date: null,
    },
    {
      id: 7,
      title:
        "Bewertung der ethischen und datenschutzrechtlichen Anforderungen – Studienbeauftragte*r(Ärztliche Direktion)",
      checked: false,
      date: null,
    },
    {
      id: 8,
      title:
        "Genehmigung durch die*den Datenschutzbeauftragte*n für Klinische Studien",
      checked: false,
      date: null,
    },
    {
      id: 9,
      title: "Verhandlung der Vertragsbedingungen",
      checked: false,
      date: null,
    },
    {
      id: 10,
      title: "Festlegung des Budgets und finanzieller Rahmenbedingungen",
      checked: false,
      date: null,
    },
    {
      id: 11,
      title: "Abschluss der Verträge",
      checked: false,
      date: null,
    },
    {
      id: 12,
      title: "Vorbereitung der Studie",
      checked: false,
      date: null,
    },

    {
      id: 13,
      title: "Studieninitiierung",
      checked: false,
      date: null,
    },
    {
      id: 14,
      title: "Durchführung des First Patient First Visit (FPFV)",
      checked: false,
      date: null,
    },
    {
      id: 15,
      title: "Patientenanzahl im Screening 1. Monat",
      checked: false,
      date: null,
    },
    {
      id: 16,
      title: "Stand der Randomisierung 1. Monat",
      checked: false,
      date: null,
    },
    {
      id: 17,
      title: "Patientenanzahl im Screening 2. Monat",
      checked: false,
      date: null,
    },
    {
      id: 18,
      title: "Stand der Randomisierung 2. Monat",
      checked: false,
      date: null,
    },
    {
      id: 19,
      title: "Patientenanzahl im Screening 3. Monat",
      checked: false,
      date: null,
    },
    {
      id: 20,
      title: "Stand der Randomisierung 3. Monat",
      checked: false,
      date: null,
    },
    {
      id: 21,
      title: "Übernahme der vollständigen Studien-Checkliste",
      checked: false,
      date: null,
    },
  ];

  return (
    <div className="grid grid-cols-1 min-[1200px]:grid-cols-3 gap-6">
      <div className="flex flex-col rounded-xl bg-gradient-to-br from-sidebar/60 to-sidebar">
        <div className="relative p-4 lg:p-5 group">
          <h1 className="text-xl font-semibold">Navigation</h1>
        </div>

        <ScrollArea
          className="w-full rounded-md"
          style={{ height: "calc(100vh - 400px)" }}
        >
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="bg-gradient-to-r hover:bg-transparent hover:from-sidebar-accent hover:to-sidebar-accent/40 data-[active=true]:from-primary/20 data-[active=true]:to-primary/5 rounded-xl"
            >
              <NavigationItem key={stat.id} {...stat} />
            </div>
          ))}
        </ScrollArea>
      </div>

      <div className="flex flex-col rounded-xl bg-gradient-to-br from-sidebar/60 to-sidebar">
        <h1>LEPIII</h1>
      </div>

      <div className="flex flex-col rounded-xl bg-gradient-to-br from-sidebar/60 to-sidebar">
        <h1>qwbeqweb</h1>
      </div>

      <div className="flex flex-col rounded-xl bg-gradient-to-br from-sidebar/60 to-sidebar p-4 lg:p-5">
        <h1>Samo stats</h1>
      </div>
    </div>
  );
}
