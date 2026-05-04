import nafdacDrugs from '../data/nafdac_drugs.json';

// Total count for display purposes
export const NAFDAC_DRUG_COUNT = nafdacDrugs.length;

/**
 * Exact lookup by NRN number or full drug name.
 * Returns the matched drug object or undefined.
 */
export function verifyNafdac(input) {
  const normalized = input.trim().toLowerCase();
  return nafdacDrugs.find(
    drug =>
      drug.nrn.toLowerCase() === normalized ||
      drug.name.toLowerCase() === normalized
  );
}

/**
 * Fuzzy search: returns up to `limit` drugs whose name or
 * active ingredient contains the query string (case-insensitive).
 */
export function searchDrugs(query, limit = 10) {
  if (!query || query.trim().length < 2) return [];
  const q = query.trim().toLowerCase();
  const results = [];
  for (const drug of nafdacDrugs) {
    if (
      drug.name.toLowerCase().includes(q) ||
      (drug.activeIngredient && drug.activeIngredient.toLowerCase().includes(q))
    ) {
      results.push(drug);
      if (results.length >= limit) break;
    }
  }
  return results;
}
