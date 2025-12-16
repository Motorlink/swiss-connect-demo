import { addDays, subHours, subMinutes } from "date-fns";

export type ShipmentStatus = "offen" | "zugewiesen" | "abgeholt" | "unterwegs" | "zugestellt" | "storniert";

export interface Shipment {
  id: string;
  from: {
    name: string;
    address: string;
    city: string;
    zip: string;
    lat: number;
    lng: number;
  };
  to: {
    name: string;
    address: string;
    city: string;
    zip: string;
    lat: number;
    lng: number;
  };
  details: {
    weight: number; // kg
    pallets: number;
    type: string;
    goods: string;
  };
  status: ShipmentStatus;
  price: number;
  pickupDate: Date;
  deliveryDate: Date;
  carrier?: string;
  vehicle?: string;
  trackingId?: string;
}

const now = new Date();

export const shipments: Shipment[] = [
  {
    id: "CH-2025-001",
    from: {
      name: "Novartis Pharma AG",
      address: "Lichtstrasse 35",
      city: "Basel",
      zip: "4056",
      lat: 47.5714,
      lng: 7.5612
    },
    to: {
      name: "Inselspital Bern",
      address: "Freiburgstrasse 18",
      city: "Bern",
      zip: "3010",
      lat: 46.9480,
      lng: 7.4474
    },
    details: {
      weight: 450,
      pallets: 2,
      type: "Pharma / Gekühlt",
      goods: "Medikamente (2-8°C)"
    },
    status: "unterwegs",
    price: 385.00,
    pickupDate: subHours(now, 2),
    deliveryDate: addDays(now, 0),
    carrier: "Planzer Transport AG",
    vehicle: "MB Sprinter Kühlkoffer",
    trackingId: "TRK-882910"
  },
  {
    id: "CH-2025-002",
    from: {
      name: "Nestlé Suisse SA",
      address: "Rue d'Entre-deux-Villes 10",
      city: "Vevey",
      zip: "1800",
      lat: 46.4628,
      lng: 6.8419
    },
    to: {
      name: "Coop Verteilzentrale",
      address: "Riedbachstrasse 165",
      city: "Bern",
      zip: "3027",
      lat: 46.9405,
      lng: 7.3689
    },
    details: {
      weight: 12000,
      pallets: 24,
      type: "Standard Planenauflieger",
      goods: "Nahrungsmittel / Trocken"
    },
    status: "zugewiesen",
    price: 850.00,
    pickupDate: addDays(now, 1),
    deliveryDate: addDays(now, 1),
    carrier: "Galliker Transport AG",
    vehicle: "Scania R450"
  },
  {
    id: "CH-2025-003",
    from: {
      name: "ABB Schweiz AG",
      address: "Brown Boveri Strasse 6",
      city: "Baden",
      zip: "5400",
      lat: 47.4736,
      lng: 8.3064
    },
    to: {
      name: "Siemens Mobility",
      address: "Hammerweg 1",
      city: "Wallisellen",
      zip: "8304",
      lat: 47.4144,
      lng: 8.5925
    },
    details: {
      weight: 2500,
      pallets: 4,
      type: "Express / Hebebühne",
      goods: "Elektronikkomponenten"
    },
    status: "offen",
    price: 220.00,
    pickupDate: addDays(now, 2),
    deliveryDate: addDays(now, 2)
  },
  {
    id: "CH-2025-004",
    from: {
      name: "Rolex SA",
      address: "Rue François-Dussaud 3",
      city: "Genf",
      zip: "1211",
      lat: 46.1936,
      lng: 6.1339
    },
    to: {
      name: "Bucherer AG",
      address: "Bahnhofstrasse 50",
      city: "Zürich",
      zip: "8001",
      lat: 47.3725,
      lng: 8.5387
    },
    details: {
      weight: 15,
      pallets: 0,
      type: "Werttransport / Security",
      goods: "Uhren / Wertgegenstände"
    },
    status: "abgeholt",
    price: 1250.00,
    pickupDate: subMinutes(now, 45),
    deliveryDate: addDays(now, 0),
    carrier: "SecurePost AG",
    vehicle: "Gepanzerter Transporter",
    trackingId: "SEC-9912"
  },
  {
    id: "CH-2025-005",
    from: {
      name: "Stadler Rail AG",
      address: "Ernst-Stadler-Strasse 1",
      city: "Bussnang",
      zip: "9565",
      lat: 47.5586,
      lng: 9.0839
    },
    to: {
      name: "SBB Werkstätte",
      address: "Hohlstrasse 400",
      city: "Zürich",
      zip: "8048",
      lat: 47.3884,
      lng: 8.4975
    },
    details: {
      weight: 8500,
      pallets: 6,
      type: "Spezialtransport / Überbreite",
      goods: "Zugkomponenten"
    },
    status: "offen",
    price: 1450.00,
    pickupDate: addDays(now, 3),
    deliveryDate: addDays(now, 3)
  },
  {
    id: "CH-2025-006",
    from: {
      name: "Migros Verteilbetrieb",
      address: "Industriestrasse 1",
      city: "Neuendorf",
      zip: "4623",
      lat: 47.3056,
      lng: 7.7944
    },
    to: {
      name: "Migros Filiale",
      address: "Marktgasse 10",
      city: "St. Gallen",
      zip: "9000",
      lat: 47.4245,
      lng: 9.3767
    },
    details: {
      weight: 18000,
      pallets: 33,
      type: "Kühlauflieger",
      goods: "Frischprodukte"
    },
    status: "zugestellt",
    price: 920.00,
    pickupDate: subDays(now, 1),
    deliveryDate: subHours(now, 4),
    carrier: "Migros Transport",
    vehicle: "Scania G410"
  },
  {
    id: "CH-2025-007",
    from: {
      name: "Logitech Europe SA",
      address: "EPFL - Quartier de l'Innovation",
      city: "Lausanne",
      zip: "1015",
      lat: 46.5191,
      lng: 6.5668
    },
    to: {
      name: "Digitec Galaxus AG",
      address: "Pfingstweidstrasse 60",
      city: "Zürich",
      zip: "8005",
      lat: 47.3902,
      lng: 8.5134
    },
    details: {
      weight: 350,
      pallets: 1,
      type: "Express / Same Day",
      goods: "Computerzubehör"
    },
    status: "unterwegs",
    price: 290.00,
    pickupDate: subHours(now, 3),
    deliveryDate: addHours(now, 2),
    carrier: "DPD Schweiz",
    vehicle: "VW Crafter",
    trackingId: "DPD-77281"
  },
  {
    id: "CH-2025-008",
    from: {
      name: "Emmi Schweiz AG",
      address: "Landenbergstrasse 1",
      city: "Luzern",
      zip: "6002",
      lat: 47.0478,
      lng: 8.3105
    },
    to: {
      name: "Manor AG",
      address: "Greifengasse 22",
      city: "Basel",
      zip: "4058",
      lat: 47.5606,
      lng: 7.5906
    },
    details: {
      weight: 4200,
      pallets: 8,
      type: "Kühltransport",
      goods: "Milchprodukte"
    },
    status: "offen",
    price: 410.00,
    pickupDate: addDays(now, 1),
    deliveryDate: addDays(now, 1)
  },
  {
    id: "CH-2025-009",
    from: {
      name: "Roche Diagnostics",
      address: "Forrenstrasse 2",
      city: "Rotkreuz",
      zip: "6343",
      lat: 47.1417,
      lng: 8.4306
    },
    to: {
      name: "Universitätsspital Zürich",
      address: "Rämistrasse 100",
      city: "Zürich",
      zip: "8091",
      lat: 47.3763,
      lng: 8.5481
    },
    details: {
      weight: 120,
      pallets: 1,
      type: "Express / Labor",
      goods: "Diagnostik-Geräte"
    },
    status: "zugewiesen",
    price: 180.00,
    pickupDate: addHours(now, 4),
    deliveryDate: addHours(now, 6),
    carrier: "MedLogistics",
    vehicle: "Mercedes Vito"
  },
  {
    id: "CH-2025-010",
    from: {
      name: "IKEA AG",
      address: "Müslistrasse 16",
      city: "Spreitenbach",
      zip: "8957",
      lat: 47.4208,
      lng: 8.3667
    },
    to: {
      name: "Privatkunde Müller",
      address: "Seestrasse 45",
      city: "Thalwil",
      zip: "8800",
      lat: 47.2953,
      lng: 8.5636
    },
    details: {
      weight: 850,
      pallets: 2,
      type: "Hebebühne / Privatlieferung",
      goods: "Möbel"
    },
    status: "offen",
    price: 150.00,
    pickupDate: addDays(now, 2),
    deliveryDate: addDays(now, 2)
  }
];

function subDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() - days);
  return result;
}

function addHours(date: Date, hours: number): Date {
  const result = new Date(date);
  result.setHours(result.getHours() + hours);
  return result;
}
