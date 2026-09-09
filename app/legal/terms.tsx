import { LegalDoc } from '@/components/LegalDoc';

export default function TermsScreen() {
  return (
    <LegalDoc
      title="Terms of Use"
      body={[
        'These Terms of Use are a placeholder for Play Store / App Store review. Trench is a mock launchpad UI for Base.',
        'By using this app you acknowledge that all balances, trades, groups, and launches are simulated. No real cryptocurrency is transferred.',
        'You must be of legal age in your jurisdiction to use cryptocurrency-related software. Do not use Trench where prohibited.',
        'We may update these terms. Continued use after updates constitutes acceptance of the revised stub.',
        'Contact: legal@trench.app (placeholder).',
      ]}
    />
  );
}
