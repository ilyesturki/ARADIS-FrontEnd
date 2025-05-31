import { flexibleTagType, TagActionType } from "@/redux/tag/tagSlice";

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

export const initialTagActions: TagActionType[] = [

];

export const initialTagAction: TagActionType = {
  procedure: "",
  userCategory: "",
  userService: "",
  quand: "",
};
