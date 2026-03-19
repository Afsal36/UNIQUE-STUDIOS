// import { useEffect } from 'react';
// import { useLocation } from 'react-router-dom';

// export default function ScrollToHash() {
//   const { hash } = useLocation();

//   useEffect(() => {
//     if (!hash) return;

//     const element = document.querySelector(hash);
//     if (!element) return;

//     const timer = window.setTimeout(() => {
//       element.scrollIntoView({ behavior: 'smooth', block: 'start' });
//     }, 100);

//     return () => window.clearTimeout(timer);
//   }, [hash]);

//   return null;
// }
