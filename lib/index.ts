import { noVarRule } from "./rules/noVar.js";
import { subscribeRule } from "./rules/subscribe.js";

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------

// import all rules in lib/rules

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const rulesExport: any = {
  noVar: noVarRule,
  subscribe: subscribeRule,
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
export const rules = rulesExport;
