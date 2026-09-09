import { Redirect, useLocalSearchParams } from 'expo-router';

/**
 * Alternate join route `/groups/join?code=XXXX` → `/g/[code]`.
 */
export default function GroupsJoinAlias() {
  const { code } = useLocalSearchParams<{ code?: string }>();
  const normalized = String(code ?? 'DIGG').toUpperCase();
  return <Redirect href={`/g/${normalized}`} />;
}
