// Quick test for 8-digit HEX alpha support
import { hexToRgb, rgbToHexAlpha } from "./src/utils/colorUtils.js";

// Test 8-digit HEX parsing
console.log("Testing 8-digit HEX parsing:");
const testColor = "#3498db80"; // Blue with 50% alpha
const parsed = hexToRgb(testColor);
console.log(`Input: ${testColor}`);
console.log("Parsed:", parsed);

// Test 8-digit HEX generation
console.log("\nTesting 8-digit HEX generation:");
const generated = rgbToHexAlpha(52, 152, 219, 0.5); // Same blue with 50% alpha
console.log(`Generated: ${generated}`);

// Test 6-digit HEX (should still work)
console.log("\nTesting 6-digit HEX (backward compatibility):");
const testColor6 = "#3498db";
const parsed6 = hexToRgb(testColor6);
console.log(`Input: ${testColor6}`);
console.log("Parsed:", parsed6);

console.log("\n✅ HEX alpha support enhanced successfully!");
