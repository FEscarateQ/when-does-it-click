/**
 * ReactHydrationProbe
 *
 * Bootstrap-only technical component.
 * Purpose: Prove that React island renders and hydrates correctly in Astro.
 *
 * TODO: Replace with first real interactive feature slice.
 */

import { useState } from 'react';

export function ReactHydrationProbe() {
  const [count, setCount] = useState(0);

  return (
    <div
      style={{
        padding: '1rem',
        border: '1px solid #ccc',
        borderRadius: '4px',
        marginTop: '1rem',
      }}
    >
      <h2>React Hydration Probe</h2>
      <p>
        This is a bootstrap-only component to verify React island hydration.
      </p>
      <p>Button clicks: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
