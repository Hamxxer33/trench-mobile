import { LegalDoc } from '@/components/LegalDoc';

export default function PrivacyScreen() {
  return (
    <LegalDoc
      title="Privacy Policy"
      body={[
        'This Privacy Policy stub describes how Trench would handle data in a production build. The current app is mock-only.',
        'We do not collect personal data in this mock build. Privy login is simulated locally — no real OAuth or embedded wallet SDK.',
        'If analytics or crash reporting are added later, they will be disclosed here and gated behind consent where required.',
        'Mock invite links (trench.app/g/XXXX) do not transmit data off-device in this build.',
        'Contact: privacy@trench.app (placeholder).',
      ]}
    />
  );
}
