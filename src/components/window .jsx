import { DEFAULTS } from "../data";

function formatProp(name, value) {
  if (typeof value === "string") return `${name}="${value}"`;
  if (value === true) return name;
  return `${name}={${value}}`;
}

export default function CodeWindow({ options, query }) {
  const changed = Object.keys(DEFAULTS).filter(
    (name) => options[name] !== DEFAULTS[name],
  );

  const lines = [
    "<Accordion",
    "  items={items}",
    ...changed.map((name) => `  ${formatProp(name, options[name])}`),
    query && `  query="${query}"`,
    "  onChange={setOpenIds}",
    "/>",
  ];

  return <pre className="code">{lines.filter(Boolean).join("\n")}</pre>;
}