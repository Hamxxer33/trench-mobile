import { LegalDoc } from '@/components/LegalDoc';

export default function LicensesScreen() {
  return (
    <LegalDoc
      title="Open source licenses"
      body={[
        'Trench mobile is built with Expo, React Native, Expo Router, and related open-source packages.',
        'Full license texts for third-party dependencies will ship with production builds. This screen is a store-required stub.',
        'Expo SDK and React Native are licensed under their respective MIT / Apache-style licenses.',
        'Space Mono font is used under the SIL Open Font License.',
        'For the complete attribution list, see package-lock.json and vendor notices in a future release.',
      ]}
    />
  );
}
