import {
  fpsCauseType,
  fpsDefensiveActionsType,
  fpsImmediateActionsType,
  fpsProblemType,
} from "@/redux/fps/fpsSlice";

export const problemTypesData = [
  {
    value: "Securite",
    label: "Securite",
    textColor: "text-red-500",
    className: "shadow-red-500 shadow-[0_0_4px] bg-red-500 bg-opacity-10 ",
  },
  {
    value: "Environnement",
    label: "Environnement",
    textColor: "text-greenAccent-800",
    className:
      "shadow-greenAccent-800 shadow-[0_0_4px] bg-greenAccent-800 bg-opacity-10 ",
  },
  {
    value: "Qualite",
    label: "Qualite",
    textColor: "text-pinkAccent",
    className:
      "shadow-pinkAccent shadow-[0_0_4px] bg-pinkAccent bg-opacity-10 ",
  },

  {
    value: "TRS/Efficience",
    label: "TRS/Efficience",
    textColor: "text-greenAccent-700",
    className:
      "shadow-greenAccent-700 shadow-[0_0_4px] bg-greenAccent-700 bg-opacity-10 ",
  },
  {
    value: "Maintenence",
    label: "Maintenence",
    textColor: "text-red-500",
    className: "shadow-red-500 shadow-[0_0_4px] bg-red-500 bg-opacity-10 ",
  },
  {
    value: "Autre",
    label: "Autre",
    textColor: "text-red-500",
    className: "shadow-red-500 shadow-[0_0_4px] bg-red-500 bg-opacity-10 ",
  },
];

export const categoryData = [
  { value: "corporaite", label: "corporaite" },
  { value: "top-management", label: "top management" },
  { value: "midel-management", label: "midel management" },
  { value: "operational", label: "operational" },
];

export const serviceData = [
  {
    value: "productions",
    label: "productions",
  },
  {
    value: "maintenance",
    label: "maintenance",
  },
  {
    value: "logistique",
    label: "logistique",
  },

  {
    value: "qualité",
    label: "qualité",
  },
  {
    value: "ip",
    label: "ip",
  },
  {
    value: "R&D",
    label: "R&D",
  },
  {
    value: "autre",
    label: "autre",
  },
];

export const causeData = [
  {
    value: "Workforce",
    label: "Main d’œuvre",
  },
  {
    value: "method",
    label: "Méthode",
  },
  {
    value: "matter",
    label: "Matière",
  },

  {
    value: "machine",
    label: "Machine",
  },
];

export const initialFpsProblem: fpsProblemType = {
  type: "Autre",
  quoi: "",
  ref: "",
  quand: "",
  ou: "",
  userCategory: "",
  userService: "",
  comment: "",
  combien: "",
  pourquoi: "",
  image: "",
  images: [],
  clientRisk: false, 
};

export const initialFpsImmediateActions: fpsImmediateActionsType = {
  alert: [],
  startSorting: false,
  sortingResults: [
    {
      product: "",
      sortedQuantity: "",
      quantityNOK: "",
      userCategory: "",
      userService: "",
    },
  ],
  concludeFromSorting: "",
  immediatActions: [
    {
      description: "",
      userCategory: "",
      userService: "",
    },
  ],
};

export const initialFpsCause: fpsCauseType = {
  causeList: [],
  whyList: [""],
};

export const initialFpsDefensiveActions: fpsDefensiveActionsType = [
  {
    procedure: "",
    userCategory: "",
    userService: "",
    quand: "",
  },
];
