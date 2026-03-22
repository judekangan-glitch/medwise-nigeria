import nafdacDrugs from '../data/nafdac_drugs.json';

export function verifyNafdac(input) {
  const normalized = input.trim().toLowerCase();
  return nafdacDrugs.find(
    drug =>
      drug.nrn.toLowerCase() === normalized ||
      drug.name.toLowerCase() === normalized
  );
}
