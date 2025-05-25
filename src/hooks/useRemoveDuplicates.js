export const removeDuplicates = (arr, prop1, prop2) => {
  const result = [];
  const seen = new Set();

  if (!Array.isArray(arr)) {
    console.warn("❗ removeDuplicates expected an array but got:", arr);
    return result;
  }

  for (const obj of arr) {
    if (typeof obj !== "object" || obj === null) continue;

    const key = `${obj[prop1] ?? ""}-${obj[prop2] ?? ""}`;
    if (!seen.has(key)) {
      seen.add(key);
      result.push(obj);
    }
  }

  return result;
};
