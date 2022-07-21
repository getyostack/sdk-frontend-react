import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import { terser } from "rollup-plugin-terser";
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import multi from '@rollup/plugin-multi-entry';

const packageJson = require("./package.json");

export default [
    {
        input: ["src/**/*.ts", "src/**/*.tsx"],
        output: [
            {
                file: packageJson.main,
                format: "cjs",
                sourcemap: true,
            }
        ],
        plugins: [
            peerDepsExternal(),
            resolve(),
            commonjs(),
            typescript({ tsconfig: "./tsconfig.json" }),
            //terser(),
            multi(),
        ],
    },
    {
        input: ["dist/dts/**/*.ts"],
        output: [{ file: "dist/index.d.ts", format: "esm" }],
        plugins: [dts(), multi()]
    },
];