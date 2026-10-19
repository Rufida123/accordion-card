import { useMemo, useState } from "react";
import AccordionPreview from "./components/accordion-demo";
import CodeWindow from "./components/window ";
import Settings from "./components/settings";
import { DEFAULTS, FAQ, INITIAL_COUNT } from "./data";

function Logo() {
  return (
    <svg className="logo" viewBox="0 0 32 32" aria-hidden="true">
      {[0, 72, 144, 216, 288].map((angle) => (
        <ellipse
          key={angle}
          cx="16"
          cy="8.5"
          rx="4.5"
          ry="7"
          transform={`rotate(${angle} 16 16)`}
        />
      ))}
      <circle cx="16" cy="16" r="3" />
    </svg>
  );
}

export default function App() {
  const [options, setOptions] = useState(DEFAULTS);
  const [count, setCount] = useState(INITIAL_COUNT);
  const [query, setQuery] = useState("");

  const items = useMemo(() => FAQ.slice(0, count), [count]);

  const updateOption = (name, value) =>
    setOptions((current) => ({ ...current, [name]: value }));

  const reset = () => {
    setOptions(DEFAULTS);
    setCount(INITIAL_COUNT);
  };

  return (
    <>
      <header className="top">
        <span className="brand">
          <Logo />
          Petal
        </span>
        <nav className="tabs">
          <button className="tab" disabled title="Coming soon">
            Tabs
          </button>
          <button className="tab" aria-current="page">
            Accordion
          </button>
          <button className="tab" disabled title="Coming soon">
            Modal
          </button>
        </nav>
      </header>

      <main className="wrap">
        <h1>Accordion</h1>
        <p className="sub">
          Collapsible questions with motion, icons and a handful of visual
          styles.
        </p>

        <div className="layout">
          <section>
            <AccordionPreview
              items={items}
              options={options}
              query={query}
              onQueryChange={setQuery}
            />
            <CodeWindow options={options} query={query} />
          </section>

          <Settings
            options={options}
            count={count}
            onChange={updateOption}
            onCountChange={setCount}
            onReset={reset}
          />
        </div>
      </main>
    </>
  );
}