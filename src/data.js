export const FAQ = [
  {
    id: "masks",
    question: "How often should I use a face mask?",
    answer:
      "Hydrating masks work well two or three times a week. Exfoliating masks are best kept to once a week so your skin stays calm.",
  },
  {
    id: "sensitive",
    question: "Are your products safe for sensitive skin?",
    answer:
      "Yes. Every formula is fragrance-free, alcohol-free and dermatologist tested. Still, try a small amount behind your ear before your first full application.",
  },
  {
    id: "serum",
    question: "What is the difference between a serum and a moisturizer?",
    answer:
      "A serum is lightweight and full of active ingredients that sink in deeper. A moisturizer seals hydration onto the surface. Apply the serum first, then the moisturizer.",
  },
  {
    id: "sunscreen",
    question: "When should I apply sunscreen?",
    answer:
      "Sunscreen is the last step of your morning routine, about 15 minutes before you head out. Reapply every two hours in direct sun.",
  },
  {
    id: "disabled",
    question: "Disabled question",
    answer: "This one cannot be opened.",
    disabled: true,
  },
  {
    id: "returns",
    question: "Can I return a product after trying it?",
    answer:
      "Unopened products can be returned within 14 days. For opened ones you receive store credit for the full value.",
  },
  {
    id: "minis",
    question: "Do you sell travel-size products?",
    answer:
      "Yes. Every product comes in a mini size at a lower price, so you can try it before committing to the full bottle.",
  },
  {
    id: "storage",
    question: "How should I store my skincare?",
    answer:
      "Keep it away from heat and direct sunlight, and close each lid tightly after use. Some serums last longer in the fridge.",
  },
];

export const INITIAL_COUNT = 5;
export const INITIAL_OPEN = ["masks"];

export const DEFAULTS = {
  variant: "default",
  iconType: "chevron",
  iconPosition: "end",
  headingLevel: 3,
  size: "md",
  multiple: false,
  collapsible: true,
  animated: true,
  numbered: false,
};

export const SELECTS = {
  variant: ["default", "separated", "filled", "outlined"],
  iconType: ["chevron", "plus", "arrow", "heart"],
  iconPosition: ["end", "start"],
  headingLevel: [2, 3, 4, 5, 6],
  size: ["sm", "md", "lg"],
};

export const TOGGLES = {
  multiple: "Keep several questions open at once",
  collapsible: "Allow every question to be closed",
  animated: "Animate opening and closing",
  numbered: "Show a number before each question",
};

export const ICON_PATHS = {
  chevron: "M6 9l6 6 6-6",
  plus: "M12 5v14M5 12h14",
  arrow: "M12 5v14M6 13l6 6 6-6",
  heart: "M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.6-7 10-7 10z",
};