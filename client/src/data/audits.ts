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
    iconBg: "destructive"
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
    iconBg: "primary"
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
    iconBg: "secondary"
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
    iconBg: "destructive"
  }
];
