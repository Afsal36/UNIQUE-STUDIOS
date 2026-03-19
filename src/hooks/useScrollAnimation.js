import { useInView } from 'framer-motion';
import { useRef } from 'react';

const defaultOptions = {
  once: true,
  amount: 0.15,
  margin: '0px 0px -20% 0px',
  fallbackInView: true,
};

export default function useScrollAnimation(options = {}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { ...defaultOptions, ...options });

  return {
    ref,
    isInView,
    variants: {
      hidden: { opacity: 0, y: 40 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
      },
    },
  };
}

