// src/utils/motionVariants.js

// Container for staggering multiple cards
export const cardsContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Each card’s entry animation
export const cardVariant = {
  hidden: {
    opacity: 0,
    y: 32,
    scale: 0.98,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

// Inner‐content sequencing; `i` is the index (0,1,2…)
export const detailVariant = {
  hidden: {
    opacity: 0,
    y: 16,
  },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
      delay: i * 0.1,
    },
  }),
};
