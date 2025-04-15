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

export const initialTagActions: TagActionType[] = [
  // {
  //   procedure: "",
  //   userCategory: "",
  //   userService: "",
  //   quand: "",
  // },
];

export const initialTagAction: TagActionType = {
  procedure: "",
  userCategory: "",
  userService: "",
  quand: "",
};
