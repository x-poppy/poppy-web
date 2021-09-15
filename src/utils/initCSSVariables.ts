export function initCSSVariables(props: Record<string, string>): void {
  if (!props) return;
  let stylesContent = '';
  for (const [key, value] of Object.entries(props)) {
    stylesContent += `${key}:${value}\n`;
  }
  const styleElement = document.createElement('style');
  styleElement.textContent = `:root {\n${stylesContent}\n}`;
  document.head.appendChild(styleElement);
}
