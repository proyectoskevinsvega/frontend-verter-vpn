/**
 * react-router-dom v7 re-exports everything from react-router.
 * This file augments the module declarations so the VS Code TypeScript
 * language server can resolve the exports correctly, since it doesn't
 * always follow the `export *` chain through conditional exports.
 *
 * `tsc` resolves this correctly without this file — these declarations
 * are only needed for IDE intellisense.
 */
declare module "react-router-dom" {
  export * from "react-router";
  export { HydratedRouter, RouterProvider } from "react-router/dom";
}
