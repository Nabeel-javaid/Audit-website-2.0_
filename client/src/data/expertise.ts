export interface ExpertiseCategory {
  title: string;
  description: string;
  iconSymbol: string;
  iconBg: string;
  color: string;
  skills: string[];
}

export const expertiseCategories: ExpertiseCategory[] = [
  {
    title: "Vulnerability Assessment",
    description: "Identifying security vulnerabilities, logical flaws, and potential exploits in smart contract implementations.",
    iconSymbol: "🛡️",
    iconBg: "primary",
    color: "primary",
    skills: ["Re-entrancy Attacks", "Flash Loan Vulnerabilities", "Front-running Prevention"]
  },
  {
    title: "Smart Contract Development",
    description: "Expert-level programming capabilities in blockchain development languages and frameworks.",
    iconSymbol: "💻",
    iconBg: "secondary",
    color: "secondary",
    skills: ["Solidity & Vyper", "ERC Standards Implementation", "Gas Optimization Techniques"]
  },
  {
    title: "Protocol Architecture",
    description: "Designing secure and efficient blockchain protocol architectures and tokenomics models.",
    iconSymbol: "📐",
    iconBg: "destructive",
    color: "destructive",
    skills: ["DeFi Protocol Design", "Cross-chain Solutions", "Token Economic Models"]
  },
  {
    title: "Compliance & Standards",
    description: "Ensuring smart contracts adhere to industry best practices and relevant regulatory frameworks.",
    iconSymbol: "⚖️",
    iconBg: "primary",
    color: "primary",
    skills: ["OpenZeppelin Standards", "OWASP Guidelines", "Regulatory Compliance"]
  },
  {
    title: "Formal Verification",
    description: "Applying mathematical methods and formal proofs to verify smart contract correctness.",
    iconSymbol: "✓",
    iconBg: "secondary",
    color: "secondary",
    skills: ["Theorem Proving", "Model Checking", "Symbolic Execution"]
  },
  {
    title: "Advanced Auditing Tools",
    description: "Expertise with specialized tools and frameworks for thorough smart contract auditing.",
    iconSymbol: "🔍",
    iconBg: "destructive",
    color: "destructive",
    skills: ["Mythril & Slither", "Echidna & Manticore", "Custom Analysis Tools"]
  }
];

export interface Technology {
  name: string;
  iconSymbol: string;
  iconBg: string;
  iconColor: string;
}

export const technologies: Technology[] = [
  {
    name: "Ethereum",
    iconSymbol: "Ξ",
    iconBg: "primary/10",
    iconColor: "primary"
  },
  {
    name: "Solana",
    iconSymbol: "S",
    iconBg: "secondary/10",
    iconColor: "secondary"
  },
  {
    name: "Polkadot",
    iconSymbol: "•••",
    iconBg: "destructive/10",
    iconColor: "destructive"
  },
  {
    name: "Avalanche",
    iconSymbol: "A",
    iconBg: "primary/10",
    iconColor: "primary"
  },
  {
    name: "Binance Smart Chain",
    iconSymbol: "B",
    iconBg: "secondary/10",
    iconColor: "secondary"
  }
];
