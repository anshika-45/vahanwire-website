export const pricingData = {
  car: {
    luxury: {
      premium: { name: "Premium Care", price: 3499, originalPrice: 5999, discount: "30% Off" },
      standard: { name: "Standard Care", price: 2549, originalPrice: 3999, discount: "15% Off" },
      basic: { name: "Basic Care", price: 1999, originalPrice: null, discount: null },
    },
    premium: {
      premium: { name: "Premium Care", price: 3009, originalPrice: 4499, discount: "25% Off" },
      standard: { name: "Standard Care", price: 3009, originalPrice: 3499, discount: "20% Off" },
      basic: { name: "Basic Care", price: 1309, originalPrice: null, discount: null },
    },
  },
  bike: {
    luxury: {
      premium: { name: "Premium Care", price: 999, originalPrice: 3499, discount: "30% Off" },
      standard: { name: "Standard Care", price: 999, originalPrice: 2799, discount: "15% Off" },
      basic: { name: "Basic Care", price: 999, originalPrice: null, discount: null },
    },
    premium: {
      premium: { name: "Premium Care", price: 999, originalPrice: 2999, discount: "25% Off" },
      standard: { name: "Standard Care", price: 999, originalPrice: 2299, discount: "20% Off" },
      basic: { name: "Basic Care", price:1999, originalPrice: null, discount: null },
    },
  },
};

export const comparePlans = [
  { key: "silver", name: "Premium care", price: "3,499" },
  { key: "gold", name: "Standard Care", price: "2,549" },
  { key: "platinum", name: "Basic Care", price: 999 },
];
export const featuresCar = [
  {
    label: "Validity",
    values: { silver: "365 days", gold: "365 days", platinum: "365 days" },
  },
  {
    label: "Number of Service Per Year",
    values: { silver: "Unlimited", gold: "5", platinum: "3" },
  },
  {
    label: "Accidental Towing",
    values: { silver: "Up to 250 kms", gold: false, platinum: false },
    details:
      "Accidental towing service will only be provided in case of an accident and the vehicle is not in a fit to drive.",
  },
  {
    label: "Flat Tyre (Tube)",
    values: { silver: true, gold: true, platinum: true },
    details:
      "In the event of a flat tyre, we will support the customer by fixing the puncture or by fixing the valve pin or by replacing the tube, based on the nature of the repair needed.",
  },
  {
    label: "Flat Tyre (Tubeless)",
    values: { silver: true, gold: true, platinum: true },
    details:
      "In the event of a flat tyre, we will support the customer by fixing the puncture or by fixing the valve pin, Based on the nature of the repair needed.",
  },
  {
    label: "Battery Jumpstart",
    values: { silver: true, gold: true, platinum: true },
    details:
      "If the customer vehicle doesn't start due to low battery then we would support the customer by jumpstarting the vehicle using an alternate battery.",
  },
  {
    label: "Battery Swapping",
    values: { silver: true, gold: false, platinum: false },
    details:
      "In the event of a fully drained or dead battery for EV vehicles, ReadyAssist will assist in getting replacement battery for swapping from nearest authorized personnel or entity.",
  },
  {
    label: "Custody Service",
    values: { silver: true, gold: false, platinum: false },
    details:
      "In the event of an accident or breakdown where the customer has requested for ReadyAssist service and if the ETA is more than 60 min then, customers at urgency can request for a custody service from Readyassist.",
  },
  {
    label: "Key Unlock Assistance",
    values: { silver: true, gold: true, platinum: true },
    details:
      "In the event of a key locked-out assistance due to broken key, lost key or key locked inside, ReadyAssist will assist the customer with appropriate assistance required for the situation and arrange a spare key if required.",
  },
  {
    label: "Fuel Delivery",
    values: { silver: true, gold: false, platinum: false },
    details:
      "In the event a customer runs out of fuel on the road, we will deliver up to 2/5 Litres of fuel. Delivery charges will be free and fuel charges to be borne by the customer on actuals.",
  },
  {
    label: "Breakdown Towing",
    values: { silver: "Up to 250 kms", gold: false, platinum: false },
    details:
      "Flatbed towing can be availed by customer in case of a breakdown or accident which requires towing the vehicle to a workshop for repairs.",
  },
  {
    label: "Starting Problem",
    values: { silver: true, gold: true, platinum: true },
    details:
      "Starting problem includes any minor repair which cause for the starting problem , like fuse issues, cable issue, spark plus issues etc. incase of multiple issues then price will be charged accordingly.",
  },
];

export const featuresBike = [
  {
    label: "Validity",
    values: { silver: "365 days", gold: "365 days", platinum: "365 days" },
  },
  {
    label: "Number of Service Per Year",
    values: { silver: "Unlimited", gold: "4", platinum: "2" },
  },
  {
    label: "Accidental Towing",
    values: { silver: "Up to 250 kms", gold: "Up to 50 kms", platinum: false },
    details:
      "Accidental towing service will only be provided in case of an accident and the vehicle is not in a fit to drive.",
  },
  {
    label: "Flat Tyre (Tube)",
    values: { silver: true, gold: true, platinum: true },
    details:
      "In the event of a flat tyre, we will support the customer by fixing the puncture or by fixing the valve pin or by replacing the tube, based on the nature of the repair needed.",
  },
  {
    label: "Flat Tyre (Tubeless)",
    values: { silver: true, gold: true, platinum: true },
    details:
      "In the event of a flat tyre, we will support the customer by fixing the puncture or by fixing the valve pin, Based on the nature of the repair needed.",
  },
  {
    label: "Battery Jumpstart",
    values: { silver: true, gold: true, platinum: true },
    details:
      "If the customer vehicle doesn't start due to low battery then we would support the customer by jumpstarting the vehicle using an alternate battery.",
  },
  {
    label: "Key Unlock Assistance",
    values: { silver: true, gold: true, platinum: true },
    details:
      "In the event of a key locked-out assistance due to broken key, lost key or key locked inside, ReadyAssist will assist the customer with appropriate assistance required for the situation and arrange a spare key if required.",
  },
  {
    label: "Fuel Delivery",
    values: { silver: true, gold: true, platinum: true },
    details:
      "Fuel delivery is not available for two-wheeler vehicles.",
  },
  {
    label: "Breakdown Towing",
    values: { silver: "Up to 150 kms", gold: true, platinum: false },
    details:
      "Towing can be availed by customer in case of a breakdown or accident which requires towing the vehicle to a workshop for repairs.",
  },
    {
    label: "Accidental Towing",
    values: { silver: "Up to 250 kms", gold: "Up to 50 kms", platinum: false },
    details:
      "Accidental towing service will only be provided in case of an accident and the vehicle is not in a fit to drive.",
  },
  {
    label: "Starting Problem",
    values: { silver: true, gold: true, platinum: true },
    details:
      "Starting problem includes any minor repair which cause for the starting problem , like fuse issues, cable issue, spark plus issues etc. incase of multiple issues then price will be charged accordingly.",
  },
    {
    label: "Accidental Towing",
    values: { silver: "Up to 250 kms", gold: "Up to 50 kms", platinum: false },
    details:
      "Accidental towing service will only be provided in case of an accident and the vehicle is not in a fit to drive.",
  },
];
