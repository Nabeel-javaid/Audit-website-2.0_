export type AuditCategory = "defi" | "nft" | "dao" | "gaming";
export type AuditStatus = "Secured" | "Issues Found & Resolved" | "Critical Issues Found";

export interface Audit {
  id: number;
  title: string;
  description: string;
  category: AuditCategory;
  categoryColor: string;
  status: AuditStatus;
  statusColor: string;
  date: string;
  iconSymbol: string;
  iconBg: string;
  reportFile?: string; // Markdown file name in the audit-reports directory
}

export const audits: Audit[] = [
  {
    id: 1,
    title: "FlashLoan Protocol",
    description: "Comprehensive security audit of a DeFi lending protocol with flash loan capabilities.",
    category: "defi",
    categoryColor: "primary",
    status: "Secured",
    statusColor: "green",
    date: "June 2023",
    iconSymbol: "$",
    iconBg: "primary",
    reportFile: "flashloan-protocol.md"
  },
  {
    id: 2,
    title: "CryptoArt Marketplace",
    description: "Security analysis of an NFT marketplace smart contract with royalty distribution.",
    category: "nft",
    categoryColor: "secondary",
    status: "Issues Found & Resolved",
    statusColor: "yellow",
    date: "April 2023",
    iconSymbol: "A",
    iconBg: "secondary",
    reportFile: "cryptoart-marketplace.md"
  },
  {
    id: 3,
    title: "Governance System",
    description: "Audit of a custom DAO governance system with proposal and voting mechanisms.",
    category: "dao",
    categoryColor: "destructive",
    status: "Secured",
    statusColor: "green",
    date: "March 2023",
    iconSymbol: "G",
    iconBg: "destructive",
    reportFile: "governance-system.md"
  },
  {
    id: 4,
    title: "Yield Aggregator",
    description: "Security assessment of a multi-chain yield farming aggregator protocol.",
    category: "defi",
    categoryColor: "primary",
    status: "Critical Issues Found",
    statusColor: "red",
    date: "February 2023",
    iconSymbol: "📈",
    iconBg: "primary",
    reportFile: "yield-aggregator.md"
  },
  {
    id: 5,
    title: "GameFi Platform",
    description: "Thorough audit of a Play-to-Earn gaming platform with in-game asset trading.",
    category: "gaming",
    categoryColor: "secondary",
    status: "Secured",
    statusColor: "green",
    date: "January 2023",
    iconSymbol: "▶️",
    iconBg: "secondary",
    reportFile: "gamefi-platform.md"
  },
  {
    id: 6,
    title: "NFT Staking Protocol",
    description: "Security review of an NFT staking platform with reward distribution system.",
    category: "nft",
    categoryColor: "destructive",
    status: "Issues Found & Resolved",
    statusColor: "yellow",
    date: "December 2022",
    iconSymbol: "🗄️",
    iconBg: "destructive",
    reportFile: "nft-staking-protocol.md"
  },
  {
    id: 7,
    title: "Decentralized Exchange",
    description: "Comprehensive security audit of an AMM-based decentralized exchange.",
    category: "defi",
    categoryColor: "primary",
    status: "Secured",
    statusColor: "green",
    date: "November 2022",
    iconSymbol: "💱",
    iconBg: "primary",
    reportFile: "decentralized-exchange.md"
  },
  {
    id: 8,
    title: "Metaverse Land Registry",
    description: "Security analysis of a virtual land registry and marketplace for a metaverse project.",
    category: "nft",
    categoryColor: "secondary",
    status: "Issues Found & Resolved",
    statusColor: "yellow",
    date: "October 2022",
    iconSymbol: "🏞️",
    iconBg: "secondary",
    reportFile: "metaverse-land-registry.md"
  },
  {
    id: 9,
    title: "Token Bridge",
    description: "Audit of a cross-chain token bridge system connecting multiple blockchains.",
    category: "defi",
    categoryColor: "primary",
    status: "Critical Issues Found",
    statusColor: "red",
    date: "September 2022",
    iconSymbol: "🌉",
    iconBg: "destructive",
    reportFile: "token-bridge.md"
  },
  {
    id: 10,
    title: "DAO Treasury",
    description: "Security assessment of a multi-signature treasury management system for DAOs.",
    category: "dao",
    categoryColor: "destructive",
    status: "Secured",
    statusColor: "green",
    date: "August 2022",
    iconSymbol: "💼",
    iconBg: "primary",
    reportFile: "dao-treasury.md"
  },
  {
    id: 11,
    title: "Play-to-Earn Battle Game",
    description: "Thorough audit of a blockchain-based battle game with NFT characters and rewards.",
    category: "gaming",
    categoryColor: "secondary",
    status: "Issues Found & Resolved",
    statusColor: "yellow",
    date: "July 2022",
    iconSymbol: "⚔️",
    iconBg: "secondary",
    reportFile: "battle-game.md"
  },
  {
    id: 12,
    title: "Stablecoin Protocol",
    description: "Comprehensive security review of an algorithmic stablecoin protocol.",
    category: "defi",
    categoryColor: "primary",
    status: "Secured",
    statusColor: "green",
    date: "June 2022",
    iconSymbol: "💲",
    iconBg: "destructive",
    reportFile: "stablecoin-protocol.md"
  }
];
