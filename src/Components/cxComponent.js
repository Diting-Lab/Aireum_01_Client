export default function cxComponent(...classNames) {
  return classNames.filter(Boolean).join(' ');
}
