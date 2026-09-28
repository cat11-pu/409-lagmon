import assert from "node:assert";
import { lagOf, staleOf, updatedInto } from "../lagmon.js";
import { step, close } from "../lagrun.js";
import { render } from "../app.js";

const base = {
  budget: 1, limit: 5,
  state: { samples: [], stale: [], covers: 0, asks: [], ledger: [], applied: [] },
  events: [{ id: 1, kind: "beat", target: "a", born: 0, seen: 3 }],
  bad_target_code: "E_BAD_TARGET", bad_time_code: "E_BAD_TIME",
  no_sample_code: "E_NO_SAMPLE", event_error_code: "E_BAD_EVENT"
};

let failed = 0;
function check(name, fn) {
  try { fn(); console.log("ok " + name); } catch (e) { failed += 1; console.log("FAIL " + name + " :: " + e.message); }
}

check("lagOf returns a number", () => {
  assert.strictEqual(typeof lagOf(3, 10), "number");
});

check("staleOf returns a list", () => {
  assert.ok(Array.isArray(staleOf([["a", 0, 9]], 5)));
});

check("updatedInto returns a list", () => {
  assert.ok(Array.isArray(updatedInto([["a", 0, 3]], "a", 1, 2)));
});

check("step returns a state", () => {
  assert.strictEqual(typeof step(base).state, "object");
});

check("render counts events", () => {
  assert.strictEqual(typeof render(base).count_events, "number");
});

console.log("5 cases, " + failed + " failed");
process.exit(failed === 0 ? 0 : 1);
