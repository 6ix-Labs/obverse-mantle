import { describe, expect, it } from "vitest";
import { resolveChainConfig } from "./chainRegistry";

describe("chainRegistry Base alias resolution", () => {
    it("resolves Base mainnet aliases", () => {
        const inputs = [
            "base",
            "base-mainnet",
            "base mainnet",
            "base_mainnet",
            "basemainnet",
            "eip155:8453",
            "8453",
        ];

        for (const input of inputs) {
            const resolved = resolveChainConfig(input);
            expect(resolved?.key).toBe("base-mainnet");
            expect(resolved?.family).toBe("evm");
        }
    });

    it("resolves Base Sepolia aliases", () => {
        const inputs = [
            "base-sepolia",
            "base sepolia",
            "base_sepolia",
            "basesepolia",
            "eip155:84532",
            "84532",
        ];

        for (const input of inputs) {
            const resolved = resolveChainConfig(input);
            expect(resolved?.key).toBe("base-sepolia");
            expect(resolved?.family).toBe("evm");
        }
    });
});
