import { CarbunclePlushySettings } from './CarbunclePlushySettings.ts';

export function parseCarbunclePlushySettings(settings: string): CarbunclePlushySettings | null {
  try {
    const importedSettings = JSON.parse(settings) as CarbunclePlushySettings;
    if (
      !importedSettings.completed ||
      !Array.isArray(importedSettings.completed) ||
      !importedSettings.filters.patch ||
      !Array.isArray(importedSettings.filters.patch)
    ) {
      // Enforce required properties
      return null;
    }
    return importedSettings;
  } catch (ex) {
    return null;
  }
}

export function getCarbunclePlushyPatches(settings: CarbunclePlushySettings): Set<string> {
  const patches = new Set([
    // Converts numerical 4 to a 4.0 string
    ...settings.filters.patch.map((p) => p.toLocaleString('en-US', { minimumFractionDigits: 1 })),
  ]);

  // x.5 is split into x.5 and x.55 here for SHB/EW
  if (settings.filters.patch.includes(5.5)) {
    patches.add('5.55');
  }
  if (settings.filters.patch.includes(6.5)) {
    patches.add('6.55');
  }

  return patches;
}
