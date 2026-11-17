import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: { extend: { colors: { galaxy: { 950: "#080817", 900: "#10102b", 800: "#191944", blue: "#37c9ff", purple: "#a855f7" } }, boxShadow: { neon: "0 0 32px rgba(168,85,247,.18)" } } },
  plugins: []
};
export default config;
