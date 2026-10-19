import { DEFAULTS, FAQ, SELECTS, TOGGLES } from "../data";

export default function Settings({
  options,
  count,
  onChange,
  onCountChange,
  onReset,
}) {
  return (
    <aside className="panel">
      <h2>Props</h2>

      <label className="field">
        <span>
          Questions <b>{count}</b>
        </span>
        <input
          type="range"
          min="2"
          max={FAQ.length}
          value={count}
          onChange={(e) => onCountChange(Number(e.target.value))}
        />
      </label>

      {Object.entries(SELECTS).map(([name, choices]) => (
        <label className="field" key={name}>
          <code>{name}</code>
          <select
            value={options[name]}
            onChange={(e) =>
              onChange(
                name,
                typeof DEFAULTS[name] === "number"
                  ? Number(e.target.value)
                  : e.target.value,
              )
            }
          >
            {choices.map((choice) => (
              <option key={choice}>{choice}</option>
            ))}
          </select>
        </label>
      ))}

      {Object.entries(TOGGLES).map(([name, hint]) => (
        <label className="check" key={name}>
          <input
            type="checkbox"
            checked={options[name]}
            onChange={(e) => onChange(name, e.target.checked)}
          />
          <code>{name}</code>
          <small>{hint}</small>
        </label>
      ))}

      <button className="btn" onClick={onReset}>
        Reset props
      </button>
    </aside>
  );
}