import {
  editedDefensiveActionType,
  editedFpsImmediateActionsType,
  editedImmediatActionsType,
  editedSortingResultsType,
  flexibleFpsType,
  fpsCauseType,
  fpsProblemType,
} from "@/redux/fps/fpsSlice";

export const problemTypesData = [
  {
    value: "Securite",
    label: "Securite",
    textColor: "text-red-500",
    className: "bg-red-500 shadow-red-500 !bg-opacity-10",
  },
  {
    value: "Environnement",
    label: "Environnement",
    textColor: "text-greenAccent-600",
    className: "shadow-greenAccent-600 bg-greenAccent-600 !bg-opacity-10",
  },
  {
    value: "Qualite",
    label: "Qualite",
    textColor: "text-pinkAccent",
    className: "shadow-pinkAccent bg-pinkAccent !bg-opacity-10",
  },

  {
    value: "TRS/Efficience",
    label: "TRS/Efficience",
    textColor: "text-greenAccent-500",
    className: "shadow-greenAccent-500 bg-greenAccent-500 !bg-opacity-10",
  },
  {
    value: "Maintenence",
    label: "Maintenence",
    textColor: "text-red-500",
    className: "shadow-red-500 bg-red-500 !bg-opacity-10",
  },
  {
    value: "Autre",
    label: "Autre",
    textColor: "text-red-500",
    className: "shadow-red-500 bg-red-500 !bg-opacity-10",
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

export const machineData = [
  {
    value: "machine1",
    label: "Machine 1",
  },
  {
    value: "machine2",
    label: "Machine 2",
  },
  { 
    value: "machine3",
    label: "Machine 3",
  },
  {
    value: "machine4",
    label: "Machine 4",
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
  machine: "",
};

export const initialFpsImmediateActions: editedFpsImmediateActionsType = {
  startSorting: false,
  sortingResults: [],
  concludeFromSorting: "",
  immediateActions: [],
};

export const initialSortingResultAction: editedSortingResultsType = {
  product: "",
  sortedQuantity: "",
  quantityNOK: "",
  userCategory: "",
  userService: "",
};

export const initialImmediateActionAction: editedImmediatActionsType = {
  description: "",
  userCategory: "",
  userService: "",
};

export const initialFpsCause: fpsCauseType = {
  causeList: [],
  whyList: [""],
};

export const initialFpsDefensiveActions: editedDefensiveActionType[] = [];

export const initialFpsDefensiveAction: editedDefensiveActionType = {
  procedure: "",
  userCategory: "",
  userService: "",
  quand: "",
};

export const initialFpsValidation: flexibleFpsType = {
  status: "failed",
};
