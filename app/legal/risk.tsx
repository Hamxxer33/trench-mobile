import { LegalDoc } from '@/components/LegalDoc';

export default function RiskScreen() {
  return (
    <LegalDoc
      title="Risk disclosure"
      body={[
        'Cryptocurrency and token launches are highly speculative. You can lose all capital you deploy.',
        'Trench presents one-sided Uniswap v4 LP / pool UX for educational mock purposes. Past mock performance is not indicative of future results.',
        'Anti-snipe fee curves (99% → 1% over 20s), pool fill %, and fee splits shown in-app are illustrative chrome only.',
        'Do not treat this app as financial, legal, or tax advice. Verify any production contracts independently before use.',
        'Launchpad risk includes smart-contract bugs, liquidity failure, rug pulls, and regulatory change.',
      ]}
    />
  );
}
