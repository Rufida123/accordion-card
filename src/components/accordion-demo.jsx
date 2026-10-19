import { useEffect, useId, useRef, useState } from "react";
import { ICON_PATHS, INITIAL_OPEN } from "../data";

function Icon({ type }) {
  return (
    <svg
      className={`acc-icon acc-icon--${type}`}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d={ICON_PATHS[type]} />
    </svg>
  );
}

const contains = (text, query) =>
  text.toLowerCase().includes(query.trim().toLowerCase());

function filterItems(items, query) {
  if (!query.trim()) return items;
  return items.filter((item) =>
    contains(`${item.question} ${item.answer}`, query),
  );
}

function Highlight({ text, query }) {
  const needle = query.trim().toLowerCase();
  if (!needle) return text;

  const haystack = text.toLowerCase();
  const parts = [];
  let from = 0;
  let at = haystack.indexOf(needle);

  while (at !== -1) {
    parts.push(text.slice(from, at));
    parts.push(<mark key={at}>{text.slice(at, at + needle.length)}</mark>);
    from = at + needle.length;
    at = haystack.indexOf(needle, from);
  }

  parts.push(text.slice(from));
  return parts;
}

function Accordion({
  items,
  variant = "default",
  iconType = "chevron",
  iconPosition = "end",
  headingLevel = 3,
  size = "md",
  multiple = false,
  collapsible = true,
  animated = true,
  numbered = false,
  query = "",
  defaultOpenIds = [],
  onChange,
}) {
  const uid = useId();
  const [openIds, setOpenIds] = useState(defaultOpenIds);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  useEffect(() => {
    setOpenIds((current) => {
      let next = current.filter((id) =>
        items.some((item) => item.id === id && !item.disabled),
      );
      if (!multiple) next = next.slice(-1);
      if (!collapsible && next.length === 0) {
        const first = items.find((item) => !item.disabled);
        if (first) next = [first.id];
      }
      return next.join() === current.join() ? current : next;
    });
  }, [items, multiple, collapsible]);

  useEffect(() => {
    onChangeRef.current?.(openIds);
  }, [openIds]);

  const toggle = (id) => {
    setOpenIds((current) => {
      if (current.includes(id)) {
        return collapsible || current.length > 1
          ? current.filter((x) => x !== id)
          : current;
      }
      return multiple ? [...current, id] : [id];
    });
  };

  const Heading = `h${headingLevel}`;
  const visible = filterItems(items, query);
  const rootClass = [
    "acc",
    `acc--${variant}`,
    `acc--${size}`,
    `acc--icon-${iconPosition}`,
    animated && "acc--animated",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={rootClass}>
      {visible.length === 0 && (
        <p className="acc-empty">No questions match your search.</p>
      )}
      {visible.map((item) => {
        const isOpen = openIds.includes(item.id);
        const triggerId = `${uid}-trigger-${item.id}`;
        const panelId = `${uid}-panel-${item.id}`;
        const itemClass = [
          "acc-item",
          isOpen && "is-open",
          item.disabled && "is-disabled",
        ]
          .filter(Boolean)
          .join(" ");

        return (
          <div key={item.id} className={itemClass}>
            <Heading className="acc-heading">
              <button
                id={triggerId}
                className="acc-trigger"
                aria-expanded={isOpen}
                aria-controls={panelId}
                disabled={item.disabled}
                onClick={() => toggle(item.id)}
              >
                {numbered && (
                  <span className="acc-num">{items.indexOf(item) + 1}</span>
                )}
                <span className="acc-q">
                  <Highlight text={item.question} query={query} />
                  {query.trim() && !contains(item.question, query) && (
                    <em className="acc-hit">Match in answer</em>
                  )}
                </span>
                <span className="acc-ico">
                  <Icon type={iconType} />
                </span>
              </button>
            </Heading>
            <div
              id={panelId}
              role={items.length <= 6 ? "region" : undefined}
              aria-labelledby={triggerId}
              className="acc-panel"
            >
              <div>
                <p className="acc-answer">
                  <Highlight text={item.answer} query={query} />
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function AccordionPreview({
  items,
  options,
  query,
  onQueryChange,
}) {
  const [open, setOpen] = useState(INITIAL_OPEN);
  const matches = filterItems(items, query).length;

  return (
    <>
      <div className="search">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="11" cy="11" r="7" />
          <path d="M20 20l-3.5-3.5" />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search questions..."
          aria-label="Search questions"
        />
        {query && (
          <button onClick={() => onQueryChange("")} aria-label="Clear search">
            &times;
          </button>
        )}
      </div>

      <p className="meta">
        <span className="chip">
          {matches} of {items.length} questions
        </span>
        <span className="chip">
          Open: <code>[{open.join(", ")}]</code>
        </span>
      </p>

      <Accordion
        items={items}
        query={query}
        defaultOpenIds={INITIAL_OPEN}
        onChange={setOpen}
        {...options}
      />
    </>
  );
}