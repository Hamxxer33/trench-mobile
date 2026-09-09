import { MOCK_LAUNCHES } from './launches';

export type MockGroupMessage = {
  id: string;
  author: string;
  isCreator: boolean;
  body: string;
  at: string;
};

export type MockGroup = {
  id: string;
  name: string;
  description: string;
  avatarEmoji: string;
  memberCount: number;
  /** Linked launch id, or null if "Launch later" */
  tokenId: string | null;
  inviteCode: string;
  unread: number;
  /** Current user is a member (mock) */
  isMember: boolean;
  /** Linked token just went live — members-first */
  membersFirstLive: boolean;
  messages: MockGroupMessage[];
};

export const MOCK_GROUPS: MockGroup[] = [
  {
    id: 'grp-diggers',
    name: 'Blue Diggers',
    description: 'Early diggers on Base. Members see launches first.',
    avatarEmoji: '🪖',
    memberCount: 24,
    tokenId: 'blue-digger',
    inviteCode: 'DIGG',
    unread: 3,
    isMember: true,
    membersFirstLive: true,
    messages: [
      {
        id: 'm1',
        author: 'you',
        isCreator: true,
        body: 'Group is live — invite the trench.',
        at: '2026-09-09T09:00:00Z',
      },
      {
        id: 'm2',
        author: 'nova',
        isCreator: false,
        body: 'Locked in. When do we launch DIG?',
        at: '2026-09-09T09:12:00Z',
      },
      {
        id: 'm3',
        author: 'you',
        isCreator: true,
        body: 'DIG is live — members saw it first 👀',
        at: '2026-09-09T10:50:00Z',
      },
      {
        id: 'm4',
        author: 'kai',
        isCreator: false,
        body: 'Chart looks clean. Filling already.',
        at: '2026-09-09T11:02:00Z',
      },
    ],
  },
  {
    id: 'grp-ape-den',
    name: 'Ape Den',
    description: 'TAPE holders hanging before the next drop.',
    avatarEmoji: '🦍',
    memberCount: 142,
    tokenId: 'trench-ape',
    inviteCode: 'APED',
    unread: 0,
    isMember: true,
    membersFirstLive: false,
    messages: [
      {
        id: 'm1',
        author: 'you',
        isCreator: true,
        body: 'Welcome to Ape Den — mock thread only.',
        at: '2026-09-08T18:00:00Z',
      },
      {
        id: 'm2',
        author: 'riz',
        isCreator: false,
        body: 'gm trench',
        at: '2026-09-08T18:05:00Z',
      },
    ],
  },
  {
    id: 'grp-prelaunch',
    name: 'Pre-launch Squad',
    description: 'Create a group before you launch — members get first look.',
    avatarEmoji: '🚀',
    memberCount: 7,
    tokenId: null,
    inviteCode: 'PRE1',
    unread: 1,
    isMember: true,
    membersFirstLive: false,
    messages: [
      {
        id: 'm1',
        author: 'you',
        isCreator: true,
        body: 'No token yet — launch later from Create.',
        at: '2026-09-09T14:00:00Z',
      },
      {
        id: 'm2',
        author: 'eli',
        isCreator: false,
        body: 'Standing by for the notify toggle.',
        at: '2026-09-09T14:10:00Z',
      },
    ],
  },
];

/** In-memory created groups this session (mock). */
let sessionGroups: MockGroup[] = [];

export function getAllGroups(): MockGroup[] {
  return [...sessionGroups, ...MOCK_GROUPS];
}

export function getGroupById(id: string): MockGroup | undefined {
  return getAllGroups().find((g) => g.id === id);
}

export function getGroupByInviteCode(code: string): MockGroup | undefined {
  const normalized = code.trim().toUpperCase();
  return getAllGroups().find((g) => g.inviteCode.toUpperCase() === normalized);
}

export function getMyGroups(): MockGroup[] {
  return getAllGroups().filter((g) => g.isMember);
}

/** Launches the current user should see pinned as members-first. */
export function getMembersFirstLaunches() {
  return getMyGroups()
    .filter((g) => g.membersFirstLive && g.tokenId)
    .map((g) => {
      const launch = MOCK_LAUNCHES.find((l) => l.id === g.tokenId);
      return launch ? { launch, group: g } : null;
    })
    .filter((x): x is { launch: (typeof MOCK_LAUNCHES)[number]; group: MockGroup } => x !== null);
}

export function getGroupForLaunch(launchId: string): MockGroup | undefined {
  return getMyGroups().find((g) => g.tokenId === launchId);
}

export function inviteUrl(code: string): string {
  return `trench.app/g/${code.toUpperCase()}`;
}

/** Thread/list header — cap display at 99+. */
export function formatMemberCount(n: number): string {
  return n > 99 ? '99+' : String(n);
}

export type CreateGroupInput = {
  name: string;
  description: string;
  tokenId: string | null;
};

export function createMockGroup(input: CreateGroupInput): MockGroup {
  const code = Math.random().toString(36).slice(2, 6).toUpperCase();
  const group: MockGroup = {
    id: `grp-${Date.now()}`,
    name: input.name.trim(),
    description: input.description.trim() || 'New group (mock)',
    avatarEmoji: '🔵',
    memberCount: 1,
    tokenId: input.tokenId,
    inviteCode: code,
    unread: 0,
    isMember: true,
    membersFirstLive: false,
    messages: [
      {
        id: `m-${Date.now()}`,
        author: 'you',
        isCreator: true,
        body: 'Group created — invite link ready (mock).',
        at: new Date().toISOString(),
      },
    ],
  };
  sessionGroups = [group, ...sessionGroups];
  return group;
}

export function appendLocalMessage(groupId: string, body: string): MockGroupMessage | null {
  const group = getGroupById(groupId);
  if (!group) return null;
  const msg: MockGroupMessage = {
    id: `m-${Date.now()}`,
    author: 'you',
    isCreator: true,
    body: body.trim(),
    at: new Date().toISOString(),
  };
  group.messages = [...group.messages, msg];
  return msg;
}

/** Token picker options for create-group / create-review. */
export function getLinkableTokens() {
  return MOCK_LAUNCHES.map((l) => ({
    id: l.id,
    symbol: l.symbol,
    name: l.name,
  }));
}
