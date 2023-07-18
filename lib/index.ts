import { noVarRule } from "./rules/noVar.js";

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------

// import all rules in lib/rules

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const rules: any = {
  noVar: noVarRule,
};

export default rules;
