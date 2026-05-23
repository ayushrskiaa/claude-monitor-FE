import { Variants, Transition } from 'framer-motion';

const smooth: Transition = { duration: 0.8, ease: [0.16, 1, 0.3, 1] };
const quick: Transition = { duration: 0.3, ease: [0.16, 1, 0.3, 1] };
const snap: Transition = { duration: 0.2, ease: [0.16, 1, 0.3, 1] };

// ─── Entrance Animations ──────────────────────────────────────────────────────

export const fadeInUp: Variants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: smooth },
  exit: { opacity: 0, y: -10, transition: snap },
};

export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: smooth },
  exit: { opacity: 0, transition: snap },
};

export const fadeInDown: Variants = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0, transition: smooth },
  exit: { opacity: 0, y: -10, transition: snap },
};

export const slideInFromLeft: Variants = {
  initial: { opacity: 0, x: -40 },
  animate: { opacity: 1, x: 0, transition: smooth },
  exit: { opacity: 0, x: -20, transition: snap },
};

export const slideInFromRight: Variants = {
  initial: { opacity: 0, x: 40 },
  animate: { opacity: 1, x: 0, transition: smooth },
  exit: { opacity: 0, x: 20, transition: snap },
};

export const slideInFromTop: Variants = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0, transition: quick },
  exit: { opacity: 0, y: -10, transition: snap },
};

export const slideUp: Variants = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0, transition: smooth },
  exit: { opacity: 0, y: 30, transition: quick },
};

export const scaleIn: Variants = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1, transition: smooth },
  exit: { opacity: 0, scale: 0.95, transition: snap },
};

export const bounceIn: Variants = {
  initial: { opacity: 0, scale: 0.3 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.34, 1.56, 0.64, 1] },
  },
};

export const rotateIn: Variants = {
  initial: { opacity: 0, rotate: -8, scale: 0.92 },
  animate: { opacity: 1, rotate: 0, scale: 1, transition: smooth },
};

export const blurIn: Variants = {
  initial: { opacity: 0, filter: 'blur(10px)' },
  animate: { opacity: 1, filter: 'blur(0px)', transition: smooth },
  exit: { opacity: 0, filter: 'blur(6px)', transition: snap },
};

export const flipIn: Variants = {
  initial: { opacity: 0, rotateX: -90, perspective: 1000 },
  animate: { opacity: 1, rotateX: 0, transition: smooth },
};

// ─── Stagger Containers ───────────────────────────────────────────────────────

export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

export const staggerFast: Variants = {
  initial: {},
  animate: {
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

export const staggerSlow: Variants = {
  initial: {},
  animate: {
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

export const staggerItem: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: smooth },
};

export const listItem: Variants = {
  initial: { opacity: 0, x: -16 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
};

// ─── Scroll Reveal ────────────────────────────────────────────────────────────

export const scrollReveal: Variants = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0, transition: smooth },
};

export const scrollRevealLeft: Variants = {
  initial: { opacity: 0, x: -40 },
  animate: { opacity: 1, x: 0, transition: smooth },
};

export const scrollRevealRight: Variants = {
  initial: { opacity: 0, x: 40 },
  animate: { opacity: 1, x: 0, transition: smooth },
};

// ─── Hover States ─────────────────────────────────────────────────────────────

export const hoverLift = {
  rest: { y: 0, transition: quick },
  hover: { y: -4, transition: quick },
};

export const hoverScale = {
  rest: { scale: 1, transition: quick },
  hover: { scale: 1.02, transition: quick },
};

export const hoverGlow = {
  rest: {
    boxShadow: '0 0 0 1px rgba(255,255,255,0.07)',
    transition: quick,
  },
  hover: {
    boxShadow: '0 0 0 1px rgba(153,69,222,0.45), 0 8px 32px rgba(153,69,222,0.15)',
    transition: quick,
  },
};

export const hoverBright = {
  rest: { opacity: 1 },
  hover: { opacity: 0.85 },
};

// ─── Modal Animations ─────────────────────────────────────────────────────────

export const modalBackdrop: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

export const modalContent: Variants = {
  initial: { opacity: 0, scale: 0.95, y: 12 },
  animate: { opacity: 1, scale: 1, y: 0, transition: quick },
  exit: { opacity: 0, scale: 0.95, y: 8, transition: snap },
};

// ─── Continuous Animations ────────────────────────────────────────────────────

export const floatAnimation = {
  animate: {
    y: [0, -8, 0],
    transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' as const },
  },
};

export const pulseAnimation = {
  animate: {
    scale: [1, 1.15, 1],
    opacity: [1, 0.6, 1],
    transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' as const },
  },
};

export const glowPulse = {
  animate: {
    boxShadow: [
      '0 0 0 0 rgba(153,69,222,0)',
      '0 0 20px 4px rgba(153,69,222,0.35)',
      '0 0 0 0 rgba(153,69,222,0)',
    ],
    transition: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' as const },
  },
};

export const spinSlow = {
  animate: {
    rotate: 360,
    transition: { duration: 8, repeat: Infinity, ease: 'linear' as const },
  },
};

// ─── Event Feed ───────────────────────────────────────────────────────────────

export const newEventAnimation: Variants = {
  initial: { opacity: 0, y: -12, height: 0 },
  animate: {
    opacity: 1,
    y: 0,
    height: 'auto',
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
  },
  exit: { opacity: 0, height: 0, transition: { duration: 0.2 } },
};

// ─── Path / SVG Animations ────────────────────────────────────────────────────

export const drawPath: Variants = {
  initial: { pathLength: 0, opacity: 0 },
  animate: { pathLength: 1, opacity: 1, transition: { duration: 1, ease: 'easeInOut' } },
};

export const expandWidth: Variants = {
  initial: { scaleX: 0, originX: 0 },
  animate: { scaleX: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

// ─── Shimmer Skeleton ─────────────────────────────────────────────────────────

export const shimmerVariant: Variants = {
  initial: { backgroundPosition: '-200% 0' },
  animate: {
    backgroundPosition: '200% 0',
    transition: { duration: 1.5, repeat: Infinity, ease: 'linear' },
  },
};

// ─── Typewriter ───────────────────────────────────────────────────────────────

export const typewriterContainer = (charCount: number): Variants => ({
  initial: { width: 0 },
  animate: {
    width: `${charCount}ch`,
    transition: { duration: charCount * 0.05, ease: 'steps' },
  },
});
