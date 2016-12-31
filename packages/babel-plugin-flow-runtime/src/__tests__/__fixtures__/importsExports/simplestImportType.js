/* @flow */

export const input = `
  import type { Demo } from './simplestExportType';

  type Local = number;

  type Item = {
    local: Local;
    value: Demo;
  };
`;

export const expected = `
  import t from "flow-runtime";
  import { Demo } from './simplestExportType';

  const Local = t.type("Local", t.number());

  const Item = t.type("Item", t.object(
    t.property("local", Local),
    t.property("value", t.ref(Demo))
  ));
`;