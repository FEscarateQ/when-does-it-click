/**
 * Bootstrap smoke test
 *
 * Purpose: Verify TypeScript + Vitest + Zod integration works.
 * This is a minimal technical validation, not a domain test.
 */

import { describe, it, expect } from 'vitest';
import { z } from 'zod';

describe('Bootstrap smoke test', () => {
  it('TypeScript and Vitest execute correctly', () => {
    const value = 42;
    expect(value).toBe(42);
  });

  it('Zod validation works', () => {
    const BootstrapSchema = z.object({
      name: z.string(),
      version: z.string(),
      ready: z.boolean(),
    });

    const validData = {
      name: 'when-does-it-click',
      version: '0.1.0',
      ready: true,
    };

    const result = BootstrapSchema.parse(validData);
    expect(result.name).toBe('when-does-it-click');
    expect(result.ready).toBe(true);
  });

  it('Zod validation rejects invalid data', () => {
    const StrictSchema = z.object({
      count: z.number().positive(),
    });

    expect(() => {
      StrictSchema.parse({ count: -1 });
    }).toThrow();
  });
});
