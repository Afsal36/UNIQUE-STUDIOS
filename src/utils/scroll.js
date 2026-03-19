const HEADER_OFFSET = 108;
export const saveScroll = () => {
  sessionStorage.setItem("scroll-position", window.scrollY);
};

export const restoreScroll = () => {
  const saved = sessionStorage.getItem("scroll-position");
  if (saved) {
    window.scrollTo(0, parseInt(saved, 10));
  }
};
export function scrollSectionIntoView(sectionId) {
  const element = document.getElementById(sectionId);
  if (!element) return false;

  const elementTop = element.getBoundingClientRect().top + window.scrollY;

  window.scrollTo({
    top: elementTop - HEADER_OFFSET,
    behavior: "smooth"
  });

  return true;
}

export function getSectionIdFromHash(hash) {
  return hash?.replace("/", "") || "home";
}