import { useState } from "react";

// ─── MOODY'S BRAND PALETTE ────────────────────────────────────────────────────
// Primary Blue:   #0028A1   (Moody's signature royal blue)
// Deep Navy:      #001A6E   (dark headers, strong contrast)
// Red Accent:     #CC2030   (alerts, risk, watch items)
// Light Blue:     #4899D4   (secondary, links, highlights)
// Sky Blue:       #B8D4ED   (subtle tints, borders)
// Off-White:      #F4F6FA   (page background)
// Surface White:  #FFFFFF   (card backgrounds)
// Mid Gray:       #8C9DB5   (secondary text)
// Text Dark:      #0A1628   (primary text)
// Border:         #D6DFE9   (dividers)
// ─────────────────────────────────────────────────────────────────────────────

const M = {
  primary:    "#0028A1",
  navy:       "#001A6E",
  red:        "#CC2030",
  lightBlue:  "#4899D4",
  skyBlue:    "#B8D4ED",
  offWhite:   "#F4F6FA",
  white:      "#FFFFFF",
  midGray:    "#8C9DB5",
  textDark:   "#0A1628",
  border:     "#D6DFE9",
  green:      "#1A7A4A",
  amber:      "#C97B00",
  surface:    "#EEF2F8",
};

const lastUpdated = "March 30, 2026";
const whatsNew = [
  "Added Moody's (MCO) as 10th peer company with full AI disclosure history",
  "Expanded Disclosures tab to 70+ entries spanning Q1 2025 through Q1 2026",
  "New Financials tab with sortable revenue growth and margin comparisons",
];

const peers = [
  {
    ticker: "MCO",
    name: "Moody's Corporation",
    sector: "Ratings, Data & Analytics",
    accent: "#0028A1",
    tag: "#F0F4FF",
    tagText: "#0028A1",
    headline: "40% of MA Portfolio Now GenAI-Enabled; Agentic Solutions Live",
    metric: "40%",
    metricLabel: "of MA product ARR with GenAI enablement",
    theme: "Agentic Solutions / MCP",
    status: "leader",
    statusLabel: "Leader",
    aiSummary: "Moody's is scaling 'decision-grade contextual intelligence' into customer workflows via proprietary APIs, MCP servers, and specialized AI agents. Agentic Solutions automates credit assessment, portfolio monitoring, KYC screening, and sales intelligence. GenAI-adopter customer ARR is growing at 2x the rate of Moody's Analytics overall. Research Assistant became the fastest-adopted product in company history with 100K+ interactions.",
    keyFact: "Moody's Analytics ARR reached $3.5B (up 8% YoY). 96% of MA revenue is recurring. Private credit revenue up 60% YoY. Partnerships with Anthropic, Databricks, and OpenAI for MCP server distribution. Data estate covers 600M+ entities globally.",
    quote: "Generative AI represents a once-in-a-generation opportunity to enhance how companies navigate the ever-evolving world of exponential risk.",
    speaker: "CEO Rob Fauber",
    source: "MCO Q4 2025 Earnings Call",
    sourceDate: "Feb 18, 2026",
    sourceUrl: "https://www.fool.com/earnings/call-transcripts/2026/02/18/moodys-mco-q4-2025-earnings-call-transcript/",
    guidance: "High-single-digit rev growth; Adj. op. margin 52–53%; Adj. EPS $16.40–17.00; FCF $2.8–3.0B",
    risk: "Competition from SPGI in AI-driven analytics; regulatory scrutiny on rating agencies; cyclical exposure to debt issuance volumes",
  },
  {
    ticker: "SPGI",
    name: "S&P Global",
    sector: "Ratings, Data & Benchmarks",
    accent: "#001A6E",
    tag: "#F0F1F8",
    tagText: "#001A6E",
    headline: ">50% of Data Workflows Now Automated",
    metric: ">50%",
    metricLabel: "of data workflows automated via AI",
    theme: "AI as Internal Efficiency Engine",
    status: "leader",
    statusLabel: "Leader",
    aiSummary: "AI is primarily an internal efficiency driver today — over half of workflows automated, 10%+ of applications eliminated in 2025. Three strategic pillars at Nov 2025 Investor Day: Advance Market Leadership, Expand High-Growth Adjacencies, and Amplify AI. External AI products are growing but secondary to private markets expansion.",
    keyFact: "Enterprise Data Office targeting >20% run-rate expense reduction by end of 2027. ACV Growth in Market Intelligence: 6.5–7% for two consecutive quarters — accelerating.",
    quote: "Amplify Enterprise Capabilities and AI: Expedite value creation for our customers by deploying more capabilities at scale across the enterprise.",
    speaker: "Investor Day Materials",
    source: "SPGI Investor Day 2025",
    sourceDate: "Nov 13, 2025",
    sourceUrl: "https://investor.spglobal.com/news-releases/news-details/2025/SP-Global-to-Present-Next-Phase-of-its-Growth-Strategy-and-Medium-Term-Financial-Targets-at-Investor-Day-2025/default.aspx",
    guidance: "6–8% organic CCY rev growth; 9–10% Adj. EPS growth; Mobility spin-off filing Q2 2026",
    risk: "AI product narrative less developed vs. TRI/VRSK; Mobility spin creates near-term noise; higher-than-expected bond issuance assumptions in guidance",
  },
  {
    ticker: "TRI",
    name: "Thomson Reuters",
    sector: "Legal & Tax Info Services",
    accent: "#0028A1",
    tag: "#F0F4FF",
    tagText: "#0028A1",
    headline: "28% of ACV Now GenAI-Enabled",
    metric: "28%",
    metricLabel: "GenAI ACV — up from 15% in Q3 2024",
    theme: "Agentic Workflows",
    status: "leader",
    statusLabel: "Leader",
    aiSummary: "Proprietary legal & tax content is the moat. CoCounsel and Westlaw Advantage are live agentic products with accelerating adoption across law firms and corporate legal. Microsoft partnership announced as CoCounsel customer validates the enterprise strategy.",
    keyFact: "85% of employees active on internal AI platform (Open Arena). 300+ AI use cases in development. Magic Quadrant equivalent time savings from internal AI not yet disclosed but margin expansion guidance raised to 100bps/yr through 2028.",
    quote: "Legal AI workflows [are] a significant white space opportunity for TR.",
    speaker: "CEO Steve Hasker",
    source: "TRI Q4 2025 Earnings Call",
    sourceDate: "Feb 5, 2026",
    sourceUrl: "https://www.fool.com/earnings/call-transcripts/2026/02/05/thomson-reuters-tri-q4-2025-earnings-transcript/",
    guidance: "7.5–8% organic rev growth; +100bps EBITDA margin/yr through 2026–2028; ~$2.1B FCF",
    risk: "Stock fell ~7% post-earnings despite beat — market pricing in AI disruption risk from general-purpose models",
  },
  {
    ticker: "LSEG",
    name: "LSEG",
    sector: "Financial Data & Market Infrastructure",
    accent: "#4899D4",
    tag: "#EBF5FB",
    tagText: "#1A6FA0",
    headline: "MCP: The 'Cross-Selling Machine'",
    metric: "60+",
    metricLabel: "financial institutions connected via MCP",
    theme: "LSEG Everywhere / MCP",
    status: "leader",
    statusLabel: "Leader",
    aiSummary: "Partnered with Anthropic, OpenAI, Microsoft, Databricks, Snowflake & Rogo via MCP (Model Context Protocol). 'LSEG Everywhere' strategy embeds trusted financial data into every AI workflow. First financial data provider to enable ChatGPT access to their data.",
    keyFact: "90% of Data & Feeds revenue protected by IP/tech/infrastructure — highly resilient to LLM disruption. £3B share buyback announced for 2026. New KPI: 24% New Product Vitality Index across subscription businesses.",
    quote: "MCP distribution [is] a potential cross-selling machine, because AI tools can draw on multiple datasets to answer customer questions.",
    speaker: "CEO David Schwimmer",
    source: "LSEG FY 2025 Preliminary Results",
    sourceDate: "Feb 26, 2026",
    sourceUrl: "https://www.lseg.com/en/investor-relations/financial-results/2025-preliminary-results",
    guidance: "6.5–7.5% organic rev growth; +80–100bps EBITDA margin; ≥£2.7B FCF (2026)",
    risk: "MCP monetisation is nascent — adoption strong but revenue contribution not yet quantified; consumption pricing model still being developed",
  },
  {
    ticker: "VRSK",
    name: "Verisk Analytics",
    sector: "Insurance Data & Analytics",
    accent: "#1A7A4A",
    tag: "#EDFAF3",
    tagText: "#1A7A4A",
    headline: "35+ Live AI Products in Insurance",
    metric: "35+",
    metricLabel: "AI-powered products live today",
    theme: "Agentic Claims — XactGen",
    status: "leader",
    statusLabel: "Leader",
    aiSummary: "Most operationally specific AI roadmap in the peer group. XactXpert (rules + ML), XactAI (genAI estimating), and XactGen (agentic — near-complete claims estimates from aerial imagery, policyholder photos, and policy data) are all live. The XactGen pipeline is the clearest example of agentic AI replacing manual workflow in this group.",
    keyFact: "XactXpert adopted by 7 of the top 10 homeowners insurers; serves tens of thousands of adjusters. Core Lines Reimagine program: 22 modules released in 2025, 25 planned for 2026.",
    quote: "We have deployed generative and agentic AI solutions that are being used by our clients, and we believe we are uniquely positioned to create value for the industry.",
    speaker: "CEO Lee Shavel",
    source: "VRSK Q4 2025 Earnings Release",
    sourceDate: "Feb 18, 2026",
    sourceUrl: "https://www.stocktitan.net/news/VRSK/verisk-reports-fourth-quarter-and-full-year-2025-financial-b4bhfuj9ttxi.html",
    guidance: "Rev $3.19–3.24B; Adj. EBITDA $1.79–1.83B; Adj. EPS $7.45–7.75 (2026)",
    risk: "Terminated AccuLynx acquisition (FTC review); transactional revenue expected to trough in Q1 2026",
  },
  {
    ticker: "CSGP",
    name: "CoStar Group",
    sector: "Commercial & Residential Real Estate",
    accent: "#7B4FA6",
    tag: "#F5F0FB",
    tagText: "#7B4FA6",
    headline: "Homes AI: 'Most Sophisticated Vertical AI in Real Estate'",
    metric: "+83%",
    metricLabel: "Adj. EBITDA growth FY 2025",
    theme: "Homes AI + Operational Cost Automation",
    status: "leader",
    statusLabel: "Leader",
    aiSummary: "Homes AI launched as the flagship consumer differentiator for Homes.com. AI is also already delivering quantified cost savings in content creation, public records research, code writing, and lease data extraction — savings explicitly included in 2026 guidance. CoStar is using AI both offensively (product) and defensively (cost structure).",
    keyFact: "59th consecutive quarter of double-digit revenue growth. FY 2025 revenue +19% YoY to $3.2B. $700M share repurchase planned in 2026 under the $1.5B authorization.",
    quote: "The launch of Homes AI marks the beginning of a new era for our business. We intend to deploy this transformative capability across every platform in our portfolio.",
    speaker: "CEO Andy Florance",
    source: "CSGP Q4 2025 Earnings / Jan 7 Outlook",
    sourceDate: "Feb 24, 2026",
    sourceUrl: "https://www.costargroup.com/press-room/2026/costar-group-full-year-2025-revenue-increased-19-year-over-year-net-income-7",
    guidance: "Rev $3.78–3.82B; Adj. EBITDA $740–800M (2026 margin ~20% at midpoint)",
    risk: "Homes.com residential investment still maturing; Q4 bookings lighter than some expectations; commercial CRE recovery pace uncertain",
  },
  {
    ticker: "MSCI",
    name: "MSCI Inc.",
    sector: "Indices, Analytics & ESG",
    accent: "#C97B00",
    tag: "#FFF8EC",
    tagText: "#A56500",
    headline: "AI Savings → Reinvested Into Products, Not Margin",
    metric: "25",
    metricLabel: "AI-powered new products launched in 2025",
    theme: "AI-Funded Product Innovation Flywheel",
    status: "laggard",
    statusLabel: "Laggard",
    aiSummary: "Distinctive and deliberate strategy: AI cost savings (targeting 5–15% opex reduction) are to be fully reinvested into new product development rather than taken as margin expansion. 3–4 year AI journey already underway internally. AI used for ESG controversy analysis, private asset data gathering, and factor model development.",
    keyFact: "~$15–20M in AI product revenue from 25 new AI-powered products in 2025 — small but accelerating. CEO Fernandez calls MSCI 'a total AI machine.' $3B additional share repurchase authorized in Q3 2025.",
    quote: "If we apply AI dramatically and lower our operating run-the-business expenses by 5%, 10%, 15%, all of that money can go into investing into the change in the business.",
    speaker: "CEO Henry Fernandez",
    source: "MSCI Q3 2025 Earnings Call",
    sourceDate: "Oct 28, 2025",
    sourceUrl: "https://www.fool.com/earnings/call-transcripts/2025/10/28/msci-msci-q3-2025-earnings-call-transcript/",
    guidance: "$3.3B+ run rate; private markets & wealth management as AI growth vectors; ~$7T index-linked AUM",
    risk: "AI product revenue (~$15–20M) still small vs. total revenue; near-term margin compression as investment cycle ramps; Q1 2026 operating income down ~5%",
  },
  {
    ticker: "NDAQ",
    name: "Nasdaq Inc.",
    sector: "Exchange Technology & FinTech",
    accent: "#0095A8",
    tag: "#EBF9FA",
    tagText: "#007A8A",
    headline: "Agentic Sanctions Analyst Cuts Alert Review Workload 80%+",
    metric: "800+",
    metricLabel: "clients opted into AI tools in BoardVantage",
    theme: "Agentic Anti-Financial Crime",
    status: "leader",
    statusLabel: "Leader",
    aiSummary: "Agentic AI Workforce launched at Verafin — Digital Sanctions Analyst automates screening, documentation, and acknowledgment, reducing human review workload by 80%+. Second agentic worker (Enhanced Due Diligence Analyst) launched in Jan 2026; more planned. Every G-SIB is now a Nasdaq client.",
    keyFact: "Verafin enterprise signings quadrupled YoY. 25 total FinTech cross-sell wins in 2025 (cumulative 42 since Adenza acquisition). FY 2025 net revenues $5.2B — first time over $5B.",
    quote: "Every product roadmap at Nasdaq has AI built into its plans so that we can continue to transform the client experience.",
    speaker: "CEO Adena Friedman",
    source: "NDAQ Q4 2025 Earnings Call",
    sourceDate: "Jan 29, 2026",
    sourceUrl: "https://www.nasdaq.com/newsroom/nasdaq-q4-earnings-outstanding-2025-nasdaq-exceeds-5-billion-net-revenue-first-time",
    guidance: "ARR $3.1B (+10% YoY); Solutions rev $4B; 24% diluted EPS growth FY 2025",
    risk: "Financial crime AI product rollout subject to regulatory approval timelines; margin compression from Adenza integration costs",
  },
  {
    ticker: "IT",
    name: "Gartner",
    sector: "Research & Advisory",
    accent: "#CC2030",
    tag: "#FEF0F2",
    tagText: "#A8001A",
    headline: "AskGartner: 500K Questions Answered — CV Growth Only +1%",
    metric: "500K+",
    metricLabel: "AI questions answered via AskGartner in 2025",
    theme: "AskGartner + Content Transformation",
    status: "laggard",
    statusLabel: "Laggard",
    aiSummary: "Strong leading indicators — 6,000+ AI docs, 1,000+ unique use cases documented, 200K+ in-depth client AI conversations, Magic Quadrant creation time cut 75%, and AskGartner users showing substantially higher renewal rates than non-users. But macro headwinds (DOGE, federal cuts, tariff uncertainty) are masking product improvements and contract value growth.",
    keyFact: "Stock down ~35% YTD. CEO Gene Hall is asking for patience: 12–24 month lag between product improvements and renewal cycle impact. Over $2B in stock repurchases completed in 2025.",
    quote: "It can take a couple of years before investors see the payoff.",
    speaker: "CEO Gene Hall",
    source: "Gartner Q4 2025 Earnings Call",
    sourceDate: "Feb 3, 2026",
    sourceUrl: "https://news.alphastreet.com/gartner-inc-it-q4-2025-earnings-call-transcript/",
    guidance: "FY 2025 rev $6.5B (+4%); Q1 2026 Adj. EBITDA ≥$370M; CV acceleration expected H2 2026",
    risk: "Contract value grew only 1% overall (4% ex-federal); consulting revenue declining YoY; Digital Markets business being divested",
  },
  {
    ticker: "FDS",
    name: "FactSet",
    sector: "Financial Data & Workflow Solutions",
    accent: "#0028A1",
    tag: "#F0F4FF",
    tagText: "#0028A1",
    headline: "45% Sequential Growth in AI Product Launches",
    metric: "45%",
    metricLabel: "sequential growth in AI product launches (Q1 FY26)",
    theme: "AI-Amplified Workstation",
    status: "laggard",
    statusLabel: "Laggard",
    aiSummary: "Methodical, margin-disciplined approach. Pitch Creator, BondCliQ, and new AI-ready data server embedded in Workstation. Recent launch of integrated KYC/AML/financial crime risk management within Workstation is a smart compliance adjacency play. CEO's 'amplify, not replace' framing is deliberate positioning for institutional clients wary of disruption.",
    keyFact: "FY 2025 (ended Aug 2025): 5.4% revenue growth, 5.7% ASV increase. Fiscal year ends August 31 — next report March 2026.",
    quote: "AI doesn't replace what makes FactSet essential. It amplifies it.",
    speaker: "CEO Sanoke Viswanathan",
    source: "FDS Q1 FY2026 Earnings Call",
    sourceDate: "Dec 18, 2025",
    sourceUrl: "https://za.investing.com/news/company-news/factset-q1-2026-slides-revenue-and-eps-beat-expectations-amid-strategic-ai-investments-93CH-4034890",
    guidance: "FY2026 (to Aug 2026): Organic ASV +4–6%; GAAP rev $2.42–2.45B; Adj. EPS ~$17.42",
    risk: "ASV growth needs to accelerate; margins under near-term pressure from AI/tech investment; competitive pressure from Bloomberg & LSEG",
  },
];

const aiNatives = [
  {
    ticker: "PRIVATE",
    name: "Anthropic",
    sector: "Frontier AI Lab — Enterprise Focus",
    accent: "#0028A1",
    tag: "#F0F4FF",
    tagText: "#0028A1",
    headline: "$14B Run-Rate Revenue — 10x Growth for 3 Consecutive Years",
    metric: "$380B",
    metricLabel: "post-money valuation (Series G, Feb 2026)",
    theme: "Enterprise-First / Claude + Claude Code",
    status: "frontrunner",
    statusLabel: "Frontrunner",
    aiSummary: "Enterprise AI market leader by revenue share. 85% of revenue from business customers — the inverse of OpenAI. Claude Code hit $2.5B ARR (doubled since Jan 2026 alone). 500+ customers spending $1M+/yr. 8 of Fortune 10 are customers. Three-year revenue growth: ~$0 → $1B → ~$10B → $14B. IPO preparations underway (Wilson Sonsini engaged).",
    keyFact: "$30B Series G led by GIC & Coatue closed Feb 12, 2026. Partners include Microsoft ($5B), NVIDIA ($10B), Amazon ($4B), Google. The Claude Partner Network launched with $100M investment (Mar 2026). Claude Code: 4% of all public GitHub commits worldwide authored by Claude Code as of Feb 2026.",
    quote: "Claude is increasingly becoming critical to how businesses work.",
    speaker: "CFO Krishna Rao",
    source: "Anthropic Series G Announcement",
    sourceDate: "Feb 12, 2026",
    sourceUrl: "https://techcrunch.com/2026/02/12/anthropic-raises-another-30-billion-in-series-g-with-a-new-value-of-380-billion/",
    guidance: "$14B ARR (Feb 2026); $18–26B ARR target for 2026; FCF positive by 2028",
    risk: "Pentagon supply-chain risk designation effective Jun 30, 2026 — defense contractors required to cut ties. Could open enterprise gov segment to competitors.",
  },
  {
    ticker: "PRIVATE",
    name: "OpenAI",
    sector: "Frontier AI Lab — Consumer + Enterprise",
    accent: "#1A7A4A",
    tag: "#EDFAF3",
    tagText: "#1A7A4A",
    headline: "$25B ARR — 910M Weekly Active Users",
    metric: "$25B",
    metricLabel: "annualized revenue run-rate (Feb 2026)",
    theme: "Practical Adoption — Consumer + Enterprise 2026",
    status: "frontrunner",
    statusLabel: "Frontrunner",
    aiSummary: "Dominant consumer AI brand globally (910M WAU). Pivoting 2026 strategy to 'practical adoption' and enterprise. 9M+ paying business users; ChatGPT Enterprise is the fastest-growing enterprise platform in history. Revenue directly tracks compute capacity — 10x growth from 2023 to 2025. IPO preparations active (H2 2026 filing target).",
    keyFact: "Raised $40B+ in 2025 at $500B valuation. Renegotiated Microsoft deal: 20% revenue share through 2032. Inference costs reached $8.4B in 2025, projected $14.1B in 2026 — a structural constraint. Gross margin 33% vs. Anthropic's improving trajectory.",
    quote: "The priority is closing the gap between what AI now makes possible and how people, companies, and countries are using it day to day.",
    speaker: "CFO Sarah Friar",
    source: "OpenAI Business Strategy Blog",
    sourceDate: "Jan 18, 2026",
    sourceUrl: "https://www.cnbc.com/2026/01/19/openai-to-focus-on-practical-adoption-in-2026-says-finance-chief-sarah-friar.html",
    guidance: "~$25B ARR (Feb 2026); 2026 cash burn ~$8.5B; IPO targeted H2 2026",
    risk: "33% gross margin constrained by $14.1B projected inference costs in 2026; consumer subscription saturation risk in some markets; $13B+ Microsoft revenue share through 2027",
  },
  {
    ticker: "GOOGL",
    name: "Alphabet / Google",
    sector: "Hyperscaler, Frontier AI & Advertising",
    accent: "#4899D4",
    tag: "#EBF5FB",
    tagText: "#1A6FA0",
    headline: "Cloud $70B Run Rate; Gemini Unit Costs Down 78% in 2025",
    metric: "$240B",
    metricLabel: "Google Cloud backlog (up 55% QoQ, 2x YoY)",
    theme: "Full-Stack AI: TPU Chips → Cloud → Consumer",
    status: "frontrunner",
    statusLabel: "Frontrunner",
    aiSummary: "The only company in the entire group that is simultaneously a hyperscaler, frontier model lab, custom chip designer (TPUs), and global advertising platform — and all four are growing. Gemini Enterprise: 8M+ paid seats at 2,800+ companies. Revenue from generative AI solutions +400% YoY in Q4. Alphabet annual revenues exceeded $400B for the first time.",
    keyFact: "Guided $175–185B CapEx for 2026 — nearly doubling 2025. Gemini processes 10B tokens/min via direct API. 750M monthly active users on the Gemini app. Cloud operating margin expanded from 17.5% to 30.1% in Q4 2025.",
    quote: "We were able to lower Gemini serving unit costs by 78% over 2025 through model optimizations, efficiency and utilization improvements.",
    speaker: "CEO Sundar Pichai",
    source: "Alphabet Q4 2025 Earnings Call",
    sourceDate: "Feb 4, 2026",
    sourceUrl: "https://abc.xyz/investor/events/event-details/2026/2025-Q4-Earnings-Call-2026-Dr_C033hS6/default.aspx",
    guidance: "Cloud +48% YoY in Q4 2025; $175–185B CapEx in 2026; Cloud op. margin 30.1%",
    risk: "Antitrust exposure (Search monopoly ruling); $175–185B CapEx requires sustained AI monetisation to justify; Waymo still burning cash",
  },
];


const financials = [
  { name: "Moody's", ticker: "MCO", reportedGrowth: 8.9, organicGrowth: 8.0, adjMargin: 51.1, source: "MCO Q4 2025 Earnings", sourceUrl: "https://ir.moodys.com/press-releases/news-details/2026/Moodys-Corporation-Reports-Results-for-Fourth-Quarter-and-Full-Year-2025/default.aspx" },
  { name: "S&P Global", ticker: "SPGI", reportedGrowth: 8.0, organicGrowth: 8.0, adjMargin: 50.4, source: "SPGI Q4 2025 Earnings", sourceUrl: "https://investor.spglobal.com/news-releases/news-release-details/2026/SP-Global-Reports-Fourth-Quarter-and-Full-Year-2025-Results/default.aspx" },
  { name: "Thomson Reuters", ticker: "TRI", reportedGrowth: 3.0, organicGrowth: 7.0, adjMargin: 39.2, source: "TRI Q4 2025 Earnings", sourceUrl: "https://www.fool.com/earnings/call-transcripts/2026/02/05/thomson-reuters-tri-q4-2025-earnings-transcript/" },
  { name: "LSEG", ticker: "LSEG", reportedGrowth: 5.8, organicGrowth: 7.1, adjMargin: 50.3, source: "LSEG FY 2025 Results", sourceUrl: "https://www.lseg.com/en/investor-relations/financial-results/2025-preliminary-results" },
  { name: "Verisk", ticker: "VRSK", reportedGrowth: 6.6, organicGrowth: 6.6, adjMargin: 56.0, source: "VRSK Q4 2025 Earnings", sourceUrl: "https://www.stocktitan.net/news/VRSK/verisk-reports-fourth-quarter-and-full-year-2025-financial-b4bhfuj9ttxi.html" },
  { name: "CoStar", ticker: "CSGP", reportedGrowth: 19.0, organicGrowth: 19.0, adjMargin: 13.8, source: "CSGP FY 2025 Earnings", sourceUrl: "https://www.costargroup.com/press-room/2026/costar-group-full-year-2025-revenue-increased-19-year-over-year-net-income-7" },
  { name: "MSCI", ticker: "MSCI", reportedGrowth: 10.6, organicGrowth: 10.2, adjMargin: 62.2, source: "MSCI Q4 2025 Earnings", sourceUrl: "https://ir.msci.com/news-releases/news-release-details/msci-reports-financial-results-fourth-quarter-and-full-year-2025" },
  { name: "Nasdaq", ticker: "NDAQ", reportedGrowth: 13.0, organicGrowth: 12.0, adjMargin: 56.0, source: "NDAQ Q4 2025 Earnings", sourceUrl: "https://www.nasdaq.com/newsroom/nasdaq-q4-earnings-outstanding-2025-nasdaq-exceeds-5-billion-net-revenue-first-time" },
  { name: "Gartner", ticker: "IT", reportedGrowth: 4.0, organicGrowth: 3.7, adjMargin: 24.8, source: "Gartner FY 2025 Earnings", sourceUrl: "https://news.alphastreet.com/gartner-inc-it-q4-2025-earnings-call-transcript/" },
  { name: "FactSet", ticker: "FDS", reportedGrowth: 5.4, organicGrowth: 4.4, adjMargin: 36.3, source: "FDS Q1 FY2026 Earnings", sourceUrl: "https://za.investing.com/news/company-news/factset-q1-2026-slides-revenue-and-eps-beat-expectations-amid-strategic-ai-investments-93CH-4034890" },
];

const disclosures = [
  // ── Q1 2026 ──────────────────────────────────────────────
  { date: "Mar 27, 2026", company: "Anthropic", ticker: "PRIVATE", quarter: "Q1 2026", summary: "Anthropic weighing IPO as soon as October 2026 with Wilson Sonsini engaged. Company at $14B ARR with 85% from enterprise customers. Would be first direct investor access to a frontier AI model company.", source: "Bloomberg - Anthropic IPO Report", sourceUrl: "https://www.bloomberg.com/news/articles/2026-03-27/claude-ai-maker-anthropic-said-to-weigh-ipo-as-soon-as-october" },
  { date: "Mar 11, 2026", company: "OpenAI", ticker: "PRIVATE", quarter: "Q1 2026", summary: "GPT-5.4 mini rolled out to Free and Go tier users. GPT-5.1 deprecated with auto-migration to current models. Continued push to democratize access to frontier capabilities.", source: "OpenAI Model Updates", sourceUrl: "https://openai.com/index/new-tools-and-features-in-chatgpt/" },
  { date: "Mar 6, 2026", company: "Anthropic", ticker: "PRIVATE", quarter: "Q1 2026", summary: "Claude Marketplace launched with single billing for six partner tools. MCP reached 97M downloads — 4,750% growth since November 2025. Paid consumer subscriptions doubled in Jan-Feb 2026.", source: "TechCrunch - Claude Subscriptions", sourceUrl: "https://techcrunch.com/2026/03/28/anthropics-claude-popularity-with-paying-consumers-is-skyrocketing/" },
  { date: "Mar 5, 2026", company: "Verisk", ticker: "VRSK", quarter: "Q1 2026", summary: "Investor Day outlined three-year growth strategy with AI-enabled automation central to margin expansion. Medium-term targets: 6-8% OCC revenue growth, 7-10% adjusted EBITDA growth. Proprietary data assets and AI innovation provide path to compounding growth.", source: "Verisk 2026 Investor Day", sourceUrl: "https://www.verisk.com/company/newsroom/verisk-reiterates-its-growth-targets-and-outlines-strategy-for-its-next-phase-of-compounding-growth-at-2026-investor-day/" },
  { date: "Feb 27, 2026", company: "OpenAI", ticker: "PRIVATE", quarter: "Q1 2026", summary: "Closed $110B funding round — largest private round in history — at $840B valuation. Investors include $50B from Amazon, $30B each from Nvidia and SoftBank. Company at $25B ARR but inference costs projected at $14.1B in 2026.", source: "TechCrunch - OpenAI $110B Round", sourceUrl: "https://techcrunch.com/2026/02/27/openai-raises-110b-in-one-of-the-largest-private-funding-rounds-in-history/" },
  { date: "Feb 26, 2026", company: "LSEG", ticker: "LSEG", quarter: "Q1 2026", summary: "FY 2025 results: EBITDA margin surpassed 50% for first time. AI-ready data partnerships with Anthropic, Databricks, Microsoft, OpenAI, Rogo, and Snowflake based on MCP infrastructure. Workspace AI tools with natural language launching H1 2026. 90% of data revenue from non-replicable content.", source: "LSEG 2025 Preliminary Results", sourceUrl: "https://www.lseg.com/content/dam/lseg/en_us/documents/investor-relations/financial-results/preliminary-results/rns/lseg-2025-preliminary-results-rns-26feb2026.pdf" },
  { date: "Feb 24, 2026", company: "CoStar Group", ticker: "CSGP", quarter: "Q1 2026", summary: "FY 2025 revenue $3.2B (+19% YoY), Q4 revenue $900M (+27% YoY). Adjusted EBITDA surged 83%. Described Homes AI as 'most sophisticated vertical AI application in real estate' marking 'beginning of new era for business.'", source: "CSGP FY 2025 Earnings", sourceUrl: "https://www.costargroup.com/press-room/2026/costar-group-full-year-2025-revenue-increased-19-year-over-year-net-income-7" },
  { date: "Feb 24, 2026", company: "Thomson Reuters", ticker: "TRI", quarter: "Q1 2026", summary: "CoCounsel reached 1 million users across 107 countries — nearly three years after launch. Milestone represents significant adoption of agentic AI across legal, tax, accounting, audit, risk, and compliance sectors.", source: "TRI - CoCounsel 1M Users", sourceUrl: "https://www.prnewswire.com/news-releases/one-million-professionals-turn-to-cocounsel-as-thomson-reuters-scales-ai-for-regulated-industries-302694903.html" },
  { date: "Feb 18, 2026", company: "Moody's", ticker: "MCO", quarter: "Q1 2026", summary: "FY 2025 revenue $7.7B (+9% YoY), adjusted EPS $14.94 (+20%). Debt rated totaled all-time high of $6.6T with $70B from AI-driven companies like Alphabet, Amazon, Meta. AI-enabled solutions including CreditLens and AgenTix deployed across customer base.", source: "MCO Q4 2025 Earnings Call", sourceUrl: "https://www.fool.com/earnings/call-transcripts/2026/02/18/moodys-mco-q4-2025-earnings-call-transcript/" },
  { date: "Feb 18, 2026", company: "Verisk", ticker: "VRSK", quarter: "Q1 2026", summary: "Released 22 customer-facing AI modules in 2025 (ahead of 20-target), with 25 more planned for 2026. Introduced XactGen — agentic AI estimating using aerial imagery, policyholder photos, and policy data for near-complete claims estimates. Over 35 AI projects in use.", source: "VRSK Q4 2025 Earnings", sourceUrl: "https://www.fool.com/earnings/call-transcripts/2026/02/18/verisk-vrsk-q4-2025-earnings-call-transcript/" },
  { date: "Feb 17, 2026", company: "CoStar Group", ticker: "CSGP", quarter: "Q1 2026", summary: "Launched Homes AI powered by Microsoft Azure — first major real estate portal with conversational AI. Natural real-time voice/text conversations for home search drawing from property data, Matterport 3D tours, school data, neighborhood insights.", source: "CSGP Homes AI Launch", sourceUrl: "https://www.costargroup.com/press-room/2026/costar-group-launches-transformative-ai-experience-homescom-redefining-future-home" },
  { date: "Feb 12, 2026", company: "Anthropic", ticker: "PRIVATE", quarter: "Q1 2026", summary: "Closed $30B Series G at $380B valuation led by GIC & Coatue — second-largest venture round ever. Revenue at $14B ARR. Claude Code responsible for 4% of all public GitHub commits worldwide. 500+ customers spending $1M+/yr.", source: "Anthropic Series G", sourceUrl: "https://www.cnbc.com/2026/02/12/anthropic-closes-30-billion-funding-round-at-380-billion-valuation.html" },
  { date: "Feb 10, 2026", company: "S&P Global", ticker: "SPGI", quarter: "Q1 2026", summary: "Q4 2025/FY 2025: revenue $3.92B in Q4, 8% full-year growth. Management called 2025 a 'breakthrough year for AI' with product launches in every division. Enterprise Data Office automation at 50%+, 10%+ of applications eliminated.", source: "SPGI Q4 2025 Earnings", sourceUrl: "https://www.fool.com/earnings/call-transcripts/2026/02/10/sp-global-spgi-q4-2025-earnings-call-transcript/" },
  { date: "Feb 5, 2026", company: "Thomson Reuters", ticker: "TRI", quarter: "Q1 2026", summary: "FY 2025: 7% organic revenue growth. AI-enabled products reached 28% of ACV (up from 15% a year ago). 85%+ employee adoption of internal AI platform with 300+ use cases. Guiding 7.5-8% organic growth for 2026 with 100bps/yr AI margin expansion.", source: "TRI Q4 2025 Earnings", sourceUrl: "https://www.fool.com/earnings/call-transcripts/2026/02/05/thomson-reuters-tri-q4-2025-earnings-transcript/" },
  { date: "Feb 4, 2026", company: "Alphabet", ticker: "GOOGL", quarter: "Q1 2026", summary: "Q4 2025: $113.8B revenue (+18% YoY), Cloud $17.7B (+48%). Full-year exceeded $400B. Gemini unit costs down 78% in 2025. 750M+ Gemini MAU, 8M Enterprise seats sold in 4 months. AI product revenue nearly 400% YoY growth. Guided $175-185B CapEx for 2026.", source: "Alphabet Q4 2025 Earnings", sourceUrl: "https://www.cnbc.com/2026/02/04/alphabet-googl-q4-2025-earnings.html" },
  { date: "Feb 3, 2026", company: "Gartner", ticker: "IT", quarter: "Q1 2026", summary: "Q4 2025: EPS $3.94 exceeded forecast by 12%. AskGartner processed 500K+ questions in 2025 with licensed users showing significantly higher renewal rates. 6,000+ AI documents, 1,000+ unique use cases, 200K+ in-depth client conversations. But CV grew only 1%.", source: "Gartner Q4 2025 Earnings", sourceUrl: "https://www.fool.com/earnings/call-transcripts/2026/02/03/gartner-it-q4-2025-earnings-call-transcript/" },
  { date: "Jan 29, 2026", company: "Nasdaq", ticker: "NDAQ", quarter: "Q1 2026", summary: "Q4 2025: double-digit revenue growth, first year exceeding $5B. AI adoption accelerated with Agentic AI Workforce and Verafin enhancements. EPS $0.96 exceeded $0.91 forecast. Additional AI-enabled product launches planned for 2026.", source: "NDAQ Q4 2025 Earnings", sourceUrl: "https://www.fool.com/earnings/call-transcripts/2026/01/29/nasdaq-ndaq-q4-2025-earnings-call-transcript/" },
  { date: "Jan 28, 2026", company: "MSCI", ticker: "MSCI", quarter: "Q1 2026", summary: "Q4 2025: adjusted EPS $4.66 beat $4.58 forecast. CEO Fernandez emphasized transformation into 'total AI machine' — AI lowering run-rate expenses and reallocating savings toward innovation. 25 AI-powered products launched in 2025.", source: "MSCI Q4 2025 Earnings", sourceUrl: "https://www.investing.com/news/company-news/msci-q4-2025-presentation-doubledigit-growth-continues-as-index-business-thrives-93CH-4470933" },
  { date: "Jan 2026", company: "OpenAI", ticker: "PRIVATE", quarter: "Q1 2026", summary: "Announced Stargate Project — $500B AI infrastructure initiative over 4 years. CFO Sarah Friar outlined 2026 pivot to 'practical adoption' and enterprise focus. 910M weekly active users, 9M+ paying business users.", source: "OpenAI Stargate Announcement", sourceUrl: "https://openai.com/index/announcing-the-stargate-project/" },
  // ── Q4 2025 ──────────────────────────────────────────────
  { date: "Dec 18, 2025", company: "FactSet", ticker: "FDS", quarter: "Q4 2025", summary: "Q1 FY2026: EPS $4.51 beat $4.35 forecast. Revenue $608M (+6.9% YoY). 45% sequential growth in AI product launches. Continued investments in Mercury AI chatbot and AI-ready data server embedded in Workstation.", source: "FDS Q1 FY2026 Earnings", sourceUrl: "https://www.fool.com/earnings/call-transcripts/2025/12/18/factset-fds-q1-2026-earnings-call-transcript/" },
  { date: "Dec 17, 2025", company: "Alphabet", ticker: "GOOGL", quarter: "Q4 2025", summary: "Launched Gemini 3 Flash as default model in Gemini app and Search. Priced at $0.50 per 1M input tokens. Part of rapid model iteration cycle that saw Gemini 3 full release in November 2025.", source: "TechCrunch - Gemini 3 Flash", sourceUrl: "https://techcrunch.com/2025/12/17/google-launches-gemini-3-flash-makes-it-the-default-model-in-the-gemini-app/" },
  { date: "Dec 10, 2025", company: "S&P Global", ticker: "SPGI", quarter: "Q4 2025", summary: "Announced multi-year strategic partnership with Google Cloud to accelerate enterprise-wide transformation across agentic innovation, data distribution, and workflow automation. Unifying proprietary data on BigQuery.", source: "SPGI - Google Cloud Partnership", sourceUrl: "https://press.spglobal.com/2025-12-10-S-P-Global-Advances-AI-Powered-Enterprise-Transformation-Through-Strategic-Partnership-with-Google-Cloud" },
  { date: "Dec 9, 2025", company: "Anthropic", ticker: "PRIVATE", quarter: "Q4 2025", summary: "Accenture partnership launched with 30,000 professionals trained on Claude. Multi-year engagement to drive enterprise AI innovation across industries.", source: "Accenture-Anthropic Partnership", sourceUrl: "https://newsroom.accenture.com/news/2025/accenture-and-anthropic-launch-multi-year-partnership-to-drive-enterprise-ai-innovation-and-value-across-industries" },
  { date: "Dec 3, 2025", company: "LSEG", ticker: "LSEG", quarter: "Q4 2025", summary: "Partnership with OpenAI to integrate financial data into ChatGPT via MCP connector. ChatGPT Enterprise deployed for 4,000 LSEG employees. Part of 'LSEG Everywhere' distribution strategy.", source: "LSEG - OpenAI Collaboration", sourceUrl: "https://www.lseg.com/en/media-centre/press-releases/2025/lseg-announces-new-collaboration-with-openai" },
  { date: "Nov 10, 2025", company: "LSEG", ticker: "LSEG", quarter: "Q4 2025", summary: "Innovation Forum presented comprehensive AI strategy across three pillars: Trusted Data (non-replicable, regulated data partnerships), Transformative Products (AI-enabled workflows), and Intelligent Enterprise (internal AI deployment).", source: "LSEG Innovation Forum", sourceUrl: "https://www.lseg.com/en/investor-relations/lseg-innovation-forum-november-2025" },
  { date: "Nov 4, 2025", company: "Thomson Reuters", ticker: "TRI", quarter: "Q4 2025", summary: "Q3 2025: 7% organic revenue growth, 10% adjusted EBITDA growth with 240bp margin expansion. AI-enabled ACV reached 24% (up from 22% in Q2). Raised 2026 guidance citing 100bp/yr EBITDA margin expansion through 2028 from AI.", source: "TRI Q3 2025 Earnings", sourceUrl: "https://www.fool.com/earnings/call-transcripts/2025/11/04/thomson-reuters-tri-q3-2025-earnings-transcript/" },
  { date: "Nov 4, 2025", company: "Gartner", ticker: "IT", quarter: "Q4 2025", summary: "Q3 2025: AskGartner completed rollout from beta and released to all clients at no additional charge. Enhanced capabilities delivering improved client experience and engagement metrics.", source: "Gartner Q3 2025 Earnings", sourceUrl: "https://seekingalpha.com/article/4837423-gartner-inc-it-q3-2025-earnings-call-transcript" },
  { date: "Oct 30, 2025", company: "S&P Global", ticker: "SPGI", quarter: "Q4 2025", summary: "Q3 2025: record results with 9% revenue growth, 22% adjusted EPS growth. Reported investing over $1B in AI across three stages since Kensho acquisition in 2018. Raised full-year guidance.", source: "SPGI Q3 2025 Earnings", sourceUrl: "https://www.investing.com/news/transcripts/earnings-call-transcript-sp-global-beats-q3-2025-forecasts-stock-rises-93CH-4320418" },
  { date: "Oct 29, 2025", company: "Moody's", ticker: "MCO", quarter: "Q4 2025", summary: "Q3 2025: record revenue of $2B (+11% YoY), adjusted EPS $3.92 beat $3.67. Expanded Salesforce partnership for AgentForce 360. Raised full-year guidance citing accelerating AI monetization.", source: "MCO Q3 2025 Earnings", sourceUrl: "https://seekingalpha.com/article/4831939-moodys-corporation-mco-q3-2025-earnings-call-transcript" },
  { date: "Oct 29, 2025", company: "Alphabet", ticker: "GOOGL", quarter: "Q4 2025", summary: "Q3 2025: first $100B revenue quarter ($102.35B). Cloud $15.2B (+34%). Gemini processing 7B tokens/min via API. 650M+ consumer app users (3x from Q2). Cloud backlog reached $155B (+55% QoQ).", source: "Alphabet Q3 2025 Earnings", sourceUrl: "https://www.fool.com/earnings/call-transcripts/2025/11/27/alphabet-googl-q3-2025-earnings-call-transcript/" },
  { date: "Oct 29, 2025", company: "Verisk", ticker: "VRSK", quarter: "Q4 2025", summary: "Q3 2025: revenue $768.3M with solid performance. Continuing AI product rollouts focused on embedding generative AI in core products through Core Lines Reimagine initiative.", source: "VRSK Q3 2025 Earnings", sourceUrl: "https://seekingalpha.com/article/4834658-verisk-analytics-inc-vrsk-q3-2025-earnings-call-transcript" },
  { date: "Oct 28, 2025", company: "CoStar Group", ticker: "CSGP", quarter: "Q4 2025", summary: "Q3 2025: 20% YoY revenue growth to $834M (58th consecutive quarter double-digit growth). Investing 50% of Homes.com software development in AI. Adjusted EBITDA rose 51% YoY. AI spend is allocation of existing resources, not new spend.", source: "CSGP Q3 2025 Earnings", sourceUrl: "https://www.fool.com/earnings/call-transcripts/2025/10/28/costar-csgp-q3-2025-earnings-call-transcript/" },
  { date: "Oct 28, 2025", company: "MSCI", ticker: "MSCI", quarter: "Q4 2025", summary: "Q3 2025: broad-based revenue growth. Launched MSCI PAX — AI-powered Private Asset Classification Standard covering private companies, real estate, and infrastructure. CEO called MSCI 'a total AI machine' with 5-15% opex target reinvested into products.", source: "MSCI Q3 2025 Earnings", sourceUrl: "https://www.fool.com/earnings/call-transcripts/2025/10/28/msci-msci-q3-2025-earnings-call-transcript/" },
  { date: "Oct 27, 2025", company: "LSEG", ticker: "LSEG", quarter: "Q4 2025", summary: "Announced collaboration with Anthropic granting Claude for Enterprise customers access to LSEG data. MCP server went live in Claude MCP Partner Directory. Part of LSEG Everywhere strategy.", source: "LSEG - Anthropic Collaboration", sourceUrl: "https://www.lseg.com/en/media-centre/press-releases/2025/lseg-announces-collaboration-with-anthropic" },
  { date: "Oct 23, 2025", company: "LSEG", ticker: "LSEG", quarter: "Q4 2025", summary: "Q3 2025 update: digital market infrastructure on Microsoft technology went live. New Workspace AI tools with natural language capabilities coming H1 2026. 90% of data and feeds revenue from data non-replicable by LLMs.", source: "LSEG Q3 2025 Trading Update", sourceUrl: "https://www.lseg.com/content/dam/lseg/en_us/documents/investor-relations/financial-results/trading-statement/presentation/lseg-q3-trading-update-results-presentation-23oct2025.pdf" },
  { date: "Oct 22, 2025", company: "S&P Global", ticker: "SPGI", quarter: "Q4 2025", summary: "Launched AI-powered Document Intelligence 2.0 and ChatIQ in Capital IQ Pro — multi-document research and analysis tool for accelerating financial analysis and decision-making.", source: "SPGI - Capital IQ Pro AI", sourceUrl: "https://www.prnewswire.com/news-releases/sp-global-redefines-financial-insights-with-new-ai-powered-multi-document-research-and-analysis-tool-in-capital-iq-pro-chatiq-302590794.html" },
  { date: "Oct 21, 2025", company: "Nasdaq", ticker: "NDAQ", quarter: "Q4 2025", summary: "Q3 2025: 11% YoY revenue increase to $1.3B, solutions revenues exceeding $1B for first time. CEO Friedman sees AI as significant opportunity with two programs: product development and business operations.", source: "NDAQ Q3 2025 Earnings", sourceUrl: "https://finance.yahoo.com/news/nasdaq-inc-ndaq-q3-2025-190104827.html" },
  { date: "Oct 16, 2025", company: "Nasdaq", ticker: "NDAQ", quarter: "Q4 2025", summary: "Embedded AI in market surveillance platform at every stage of market abuse investigation. Pilot with Capital Markets Authority identified 80% of pump-and-dump schemes vs traditional methods. Rollout to all customers starting Q4 2025.", source: "NDAQ - Surveillance AI", sourceUrl: "https://ir.nasdaq.com/news-releases/news-release-details/nasdaq-embeds-innovative-ai-capabilities-within-its-surveillance" },
  { date: "Oct 15, 2025", company: "MSCI", ticker: "MSCI", quarter: "Q4 2025", summary: "Launched MSCI Global Artificial Intelligence Index capturing performance of 100 leading global companies advancing AI. Uses AI relevance scoring methodology across MSCI World, China, and Korea universes.", source: "MSCI Global AI Index Launch", sourceUrl: "https://www.msci.com/indexes/index/763670" },
  { date: "Oct 8, 2025", company: "S&P Global", ticker: "SPGI", quarter: "Q4 2025", summary: "Partnership with IBM to deploy watsonx Orchestrate agentic framework into S&P Global offerings, starting with supply chain management.", source: "SPGI/IBM Partnership", sourceUrl: "https://newsroom.ibm.com/2025-10-08-s-p-global-and-ibm-deploy-agentic-ai-to-improve-enterprise-operations" },
  // ── Q3 2025 ──────────────────────────────────────────────
  { date: "Sep 30, 2025", company: "Verisk", ticker: "VRSK", quarter: "Q3 2025", summary: "Launched XactAI suite for property claims including note summarization, automatic photo labeling, and transcription summary. Built on secure cloud-native infrastructure with enterprise-grade security.", source: "Verisk XactAI Launch", sourceUrl: "https://www.verisk.com/company/newsroom/verisk-introduces-new-ai-tools-to-streamline-the-property-claims-experience/" },
  { date: "Sep 23, 2025", company: "LSEG", ticker: "LSEG", quarter: "Q3 2025", summary: "Partnered with Databricks to deliver LSEG data natively via Delta Sharing. Launching with Lipper Fund Data & Cross Asset Analytics. Enables customers to build and deploy AI agents on enterprise data.", source: "LSEG - Databricks Partnership", sourceUrl: "https://www.lseg.com/en/media-centre/press-releases/2025/lseg-databricks-partner-bring-ai-ready-financial-data-natively-analytics-ai-apps-agents" },
  { date: "Sep 18, 2025", company: "FactSet", ticker: "FDS", quarter: "Q3 2025", summary: "Q4 FY2025: GAAP revenue $596.9M (+6.2% YoY). Reaffirmed six AI-powered solutions launched in FY2025 embedding platform deeper into client operations including Pitch Creator and AI-driven workflow tools.", source: "FDS Q4 FY2025 Earnings", sourceUrl: "https://www.fool.com/earnings/call-transcripts/2025/09/18/factset-fds-q4-2025-earnings-call-transcript/" },
  { date: "Sep 16, 2025", company: "Moody's", ticker: "MCO", quarter: "Q3 2025", summary: "Launched Agentic Solutions — suite of AI-powered offerings including Smart APIs and MCP servers. Made GenAI-ready data available through Salesforce AgentForce 360. Added agentic AI sales tool for lead prioritization.", source: "MCO Agentic Solutions", sourceUrl: "https://www.moodys.com/web/en/us/creditview/blog/agentic-solutions-announcement.html" },
  { date: "Aug 26, 2025", company: "Gartner", ticker: "IT", quarter: "Q3 2025", summary: "Major prediction: 40% of enterprise applications will feature task-specific AI agents by 2026, up from less than 5% in 2025. Reflects rapid acceleration of AI adoption in enterprise software.", source: "Gartner AI Agents Prediction", sourceUrl: "https://www.gartner.com/en/newsroom/press-releases/2025-08-26-gartner-predicts-40-percent-of-enterprise-apps-will-feature-task-specific-ai-agents-by-2026-up-from-less-than-5-percent-in-2025" },
  { date: "Aug 7, 2025", company: "Thomson Reuters", ticker: "TRI", quarter: "Q3 2025", summary: "Q2 2025: revenue $1.78B (+7% YoY), Big Three segments 9% organic growth. 22% of ACV now GenAI-enabled. Agentic AI offerings across legal, tax, and accounting embedding AI deeper into customer workflows.", source: "TRI Q2 2025 Earnings", sourceUrl: "https://www.investing.com/news/transcripts/earnings-call-transcript-thomson-reuters-q2-2025-sees-ai-driven-growth-93CH-4173737" },
  { date: "Aug 5, 2025", company: "Thomson Reuters", ticker: "TRI", quarter: "Q3 2025", summary: "Launched CoCounsel Legal with agentic AI Deep Research — the legal industry's first professional-grade agentic AI research capability. Enables multi-step legal task automation grounded in Westlaw and Practical Law content.", source: "TRI CoCounsel Legal Launch", sourceUrl: "https://www.prnewswire.com/news-releases/thomson-reuters-launches-cocounsel-legal-transforming-legal-work-with-agentic-ai-and-deep-research-302521761.html" },
  { date: "Aug 5, 2025", company: "Gartner", ticker: "IT", quarter: "Q3 2025", summary: "Q2 2025: 5% CV growth, 6% revenue increase to $1.7B. Beta launch of AskGartner with pilot clients reporting 75% improvement in efficiencies. One client called it a 'game changer.'", source: "Gartner Q2 2025 Earnings", sourceUrl: "https://seekingalpha.com/article/4808951-gartner-inc-it-q2-2025-earnings-call-transcript" },
  { date: "Aug 2025", company: "CoStar Group", ticker: "CSGP", quarter: "Q3 2025", summary: "Launched Smart Search on Homes.com using proprietary AI and natural language capabilities enabling voice-based property search. Feature enhanced user engagement by 69%.", source: "CSGP Smart Search Launch", sourceUrl: "https://www.costargroup.com/press-room/2025/homescom-launches-smart-search-feature-enabling-users-search-way-you-speak" },
  { date: "Jul 30, 2025", company: "Verisk", ticker: "VRSK", quarter: "Q3 2025", summary: "Q2 2025: launched Premium Audit Advisory Service AI — first-to-market AI chatbot enabling insurers to research classifications and rules. Information retrievable 95% faster than legacy solutions with strong client adoption.", source: "VRSK Q2 2025 Earnings", sourceUrl: "https://s29.q4cdn.com/767340216/files/doc_financials/2025/q2/CORRECTED-TRANSCRIPT_-Verisk-Analytics-Inc-VRSK-US-Q2-2025-Earnings-Call-30-July-2025-8_30-AM-ET.pdf" },
  { date: "Jul 29, 2025", company: "S&P Global", ticker: "SPGI", quarter: "Q3 2025", summary: "Q2 2025: EPS $4.43 beat $4.20, revenue $3.76B (+6%). Highlighted 'incredible progress' in AI and data distribution strategy working with hyperscale partners. Anthropic collaboration for data distribution underway.", source: "SPGI Q2 2025 Earnings", sourceUrl: "https://www.investing.com/news/transcripts/earnings-call-transcript-sp-global-beats-q2-2025-expectations-93CH-4203357" },
  { date: "Jul 24, 2025", company: "Nasdaq", ticker: "NDAQ", quarter: "Q3 2025", summary: "Q2 2025: Financial Technology revenue +10%, Capital Access Platforms +11%. AI-enhanced solutions driving product innovation across divisions.", source: "NDAQ Q2 2025 Earnings", sourceUrl: "https://www.fool.com/earnings/call-transcripts/2025/07/24/nasdaq-ndaq-q2-2025-earnings-call-transcript/" },
  { date: "Jul 23, 2025", company: "Moody's", ticker: "MCO", quarter: "Q3 2025", summary: "Q2 2025: adjusted EPS $3.56 beat $3.38. Approximately 40% of products by ARR include GenAI enablement. GenAI adopter cohort ARR approaching $200M, growing at 2x the MA rate. CreditLens achieved low teens growth from Numerated AI integration.", source: "MCO Q2 2025 Earnings", sourceUrl: "https://www.fool.com/earnings/call-transcripts/2025/07/23/moodys-mco-q2-2025-earnings-call-transcript/" },
  { date: "Jul 23, 2025", company: "Alphabet", ticker: "GOOGL", quarter: "Q3 2025", summary: "Q2 2025: $96.4B revenue (+14%), Cloud $13.6B (+32%). 85,000+ enterprises building with Gemini including LVMH, Salesforce, DBS Bank — driving 35x Gemini usage growth YoY. Raised CapEx guidance to $85B.", source: "Alphabet Q2 2025 Earnings", sourceUrl: "https://blog.google/company-news/inside-google/message-ceo/alphabet-earnings-q2-2025/" },
  { date: "Jul 22, 2025", company: "CoStar Group", ticker: "CSGP", quarter: "Q3 2025", summary: "Q2 2025: 15% YoY revenue growth to $781M, all-time high net new bookings of $93M. Continued development of AI-powered Smart Search with voice and natural language capabilities on Homes.com.", source: "CSGP Q2 2025 Earnings", sourceUrl: "https://investors.costargroup.com/news-releases/news-release-details/costar-group-q2-revenue-increases-15-year-over-year-achieves-all" },
  { date: "Jul 22, 2025", company: "MSCI", ticker: "MSCI", quarter: "Q3 2025", summary: "Q2 2025: record quarterly asset-based fee revenue driven by strong ETF inflows. 17% growth with wealth managers, 12% with asset owners. AI-powered solutions contributing to business expansion.", source: "MSCI Q2 2025 Earnings", sourceUrl: "https://www.fool.com/earnings/call-transcripts/2025/07/22/msci-msci-q2-2025-earnings-call-transcript/" },
  { date: "Jul 21, 2025", company: "Nasdaq", ticker: "NDAQ", quarter: "Q3 2025", summary: "Verafin announced Agentic AI Workforce launch — suite of digital workers automating AML compliance. Digital Sanctions Analyst and EDD Analyst show 80% reduction in alert review workload.", source: "NDAQ Verafin Agentic AI", sourceUrl: "https://ir.nasdaq.com/news-releases/news-release-details/nasdaq-verafin-announces-launch-its-agentic-ai-workforce" },
  { date: "Jul 15, 2025", company: "S&P Global", ticker: "SPGI", quarter: "Q3 2025", summary: "Announced integration of S&P Global data into Claude using MCP. Kensho developed MCP server enabling LLMs to access Capital IQ Financials and earnings call transcripts.", source: "SPGI - Anthropic MCP Integration", sourceUrl: "https://press.spglobal.com/2025-07-15-S-P-Global-and-Anthropic-Announce-Integration-of-S-P-Globals-Trusted-Financial-Data-into-Claude" },
  { date: "Jul 2025", company: "LSEG", ticker: "LSEG", quarter: "Q3 2025", summary: "H1 2025: AI-powered Question and Answer Service in use by 80%+ of customer cases across 1,000 agents, resolving 50% of queries within an hour (up from 35% in 2024). Deepening Microsoft partnership for Copilot integration.", source: "LSEG H1 2025 Interim Results", sourceUrl: "https://www.lseg.com/content/dam/lseg/en_us/documents/investor-relations/financial-results/interim-results/transcripts/lseg-h1-2025-interim-results-transcript-31july2025.pdf" },
  { date: "Jun 23, 2025", company: "FactSet", ticker: "FDS", quarter: "Q3 2025", summary: "Q3 FY2025: revenue $586M beat forecast. EPS $4.27 slightly below. Organic revenue grew 4.4% YoY. Anticipated 30-50 basis points contribution from GenAI initiatives.", source: "FDS Q3 FY2025 Earnings", sourceUrl: "https://www.insidermonkey.com/blog/factset-research-systems-inc-nysefds-q3-2025-earnings-call-transcript-1556870/" },
  // ── Q2 2025 ──────────────────────────────────────────────
  { date: "May 7, 2025", company: "Verisk", ticker: "VRSK", quarter: "Q2 2025", summary: "Q1 2025: double-digit subscription growth. AI-powered XactAnalysis and Radar boosted operational efficiency. Willis Towers Watson partnership embedded ISO Electronic Rating Content into Radar for real-time pricing.", source: "VRSK Q1 2025 Earnings", sourceUrl: "https://s29.q4cdn.com/767340216/files/doc_financials/2025/q1/CORRECTED-TRANSCRIPT_-Verisk-Analytics-Inc-VRSK-US-Q1-2025-Earnings-Call-7-May-2025-8_30-AM-ET.pdf" },
  { date: "May 6, 2025", company: "Gartner", ticker: "IT", quarter: "Q2 2025", summary: "Q1 2025: 7% CV growth, 4% revenue increase. AI is highest-spend topic for clients. Implemented approximately 50 custom AI applications internally to improve productivity.", source: "Gartner Q1 2025 Earnings", sourceUrl: "https://seekingalpha.com/article/4782297-gartner-inc-it-q1-2025-earnings-call-transcript" },
  { date: "May 6, 2025", company: "CoStar Group", ticker: "CSGP", quarter: "Q2 2025", summary: "Q1 2025: 12% YoY revenue growth to $732M (56th consecutive quarter double-digit growth). Began deployment of AI capabilities including Homes.com voice search and Matterport 3D tours.", source: "CSGP Q1 2025 Earnings", sourceUrl: "https://seekingalpha.com/article/4779553-costar-group-inc-csgp-q1-2025-earnings-call-transcript" },
  { date: "May 1, 2025", company: "LSEG", ticker: "LSEG", quarter: "Q2 2025", summary: "Q1 2025 trading update: AI-enhanced Analytics API contributed to analytics division growth. Evaluating how to adjust products with agentic AI to deliver maximum customer value.", source: "LSEG Q1 2025 Trading Update", sourceUrl: "https://www.lseg.com/content/dam/lseg/en_us/documents/investor-relations/financial-results/trading-statement/transcripts/lseg-q1-2025-trading-update-transcript-01may2025.pdf" },
  { date: "May 1, 2025", company: "Thomson Reuters", ticker: "TRI", quarter: "Q2 2025", summary: "Q1 2025: 6% organic revenue growth, Big Three segments 9%. $200M+ spent on GenAI tools including CoCounsel for legal, tax, and accounting professionals with healthy adoption rates.", source: "TRI Q1 2025 Earnings", sourceUrl: "https://www.investing.com/news/transcripts/earnings-call-transcript-thomson-reuters-q1-2025-sees-robust-revenue-growth-93CH-4017122" },
  { date: "Apr 29, 2025", company: "S&P Global", ticker: "SPGI", quarter: "Q2 2025", summary: "Q1 2025: EPS $4.37 beat $4.23, revenue $3.78B (+8% YoY). AI and data innovations driving Market Intelligence growth at 7%. GenAI products being developed across all divisions.", source: "SPGI Q1 2025 Earnings", sourceUrl: "https://www.investing.com/news/transcripts/earnings-call-transcript-sp-global-beats-q1-2025-earnings-expectations-93CH-4010447" },
  { date: "Apr 24, 2025", company: "Nasdaq", ticker: "NDAQ", quarter: "Q2 2025", summary: "Q1 2025: 24% EPS growth, record free cash flow, 12.5% revenue increase to $1.2B. Enhanced partnership with AWS to modernize global financial infrastructure. Published formal AI data usage policy.", source: "NDAQ Q1 2025 Earnings", sourceUrl: "https://www.fool.com/earnings/call-transcripts/2025/04/24/nasdaq-ndaq-q1-2025-earnings-call-transcript/" },
  { date: "Apr 24, 2025", company: "Alphabet", ticker: "GOOGL", quarter: "Q2 2025", summary: "Q1 2025: $90.23B revenue (+12% YoY), Cloud $12.3B (+28%). AI Overviews reached 1.5B monthly users in Search. Gemini 2.5 Pro Experimental ranked #1 on LMArena.", source: "Alphabet Q1 2025 Earnings", sourceUrl: "https://blog.google/inside-google/message-ceo/alphabet-earnings-q1-2025/" },
  { date: "Apr 22, 2025", company: "Moody's", ticker: "MCO", quarter: "Q2 2025", summary: "Q1 2025: record revenue $1.9B (+8% YoY), adjusted EPS $3.83 beat forecasts. Strong uptake of Research Assistant. Launched automated credit memo, early warning system, and KYC AI agent.", source: "MCO Q1 2025 Earnings", sourceUrl: "https://www.investing.com/news/transcripts/earnings-call-transcript-moodys-q1-2025-beats-eps-forecasts-stock-rises-93CH-3996255" },
  { date: "Apr 22, 2025", company: "MSCI", ticker: "MSCI", quarter: "Q2 2025", summary: "Q1 2025: 10% organic revenue growth, 11% adjusted EBITDA growth. Strong index deal wins and product innovation as growth drivers. AI implementation contributing to operational efficiency.", source: "MSCI Q1 2025 Earnings", sourceUrl: "https://www.insidermonkey.com/blog/msci-inc-nysemsci-q1-2025-earnings-call-transcript-1514703/" },
  { date: "Mar 22, 2025", company: "FactSet", ticker: "FDS", quarter: "Q2 2025", summary: "Q2 FY2025: EPS $4.28 beat $4.17, revenue $571M (+4.5% YoY). Launched six GenAI SKUs and expanded private company data coverage.", source: "FDS Q2 FY2025 Earnings", sourceUrl: "https://www.investing.com/news/transcripts/earnings-call-transcript-factset-q2-2025-beats-eps-forecast-despite-stock-dip-93CH-3939777" },
  { date: "Mar 2025", company: "Anthropic", ticker: "PRIVATE", quarter: "Q2 2025", summary: "Closed $3.5B Series E at $61.5B valuation to fuel AI ambitions. Revenue approaching $1B annual run rate with 30% growth in H1 2025. Enterprise customer base expanding rapidly.", source: "TechCrunch - Anthropic Series E", sourceUrl: "https://techcrunch.com/2025/03/03/anthropic-raises-3-5b-to-fuel-its-ai-ambitions/" },
  { date: "Mar 2025", company: "OpenAI", ticker: "PRIVATE", quarter: "Q2 2025", summary: "Closed $40B funding round led by SoftBank — largest VC round ever at the time — at $300B valuation. 500M weekly active users, up from 400M prior month.", source: "CNBC - OpenAI $40B Round", sourceUrl: "https://www.cnbc.com/2025/03/31/openai-closes-40-billion-in-funding-the-largest-private-fundraise-in-history-softbank-chatgpt.html" },
  // ── Q1 2025 ──────────────────────────────────────────────
  { date: "Feb 4, 2025", company: "S&P Global", ticker: "SPGI", quarter: "Q1 2025", summary: "Launched AI-powered Automated Data Ingestion (ADI) in iLEVEL for private markets portfolio monitoring. Automatically extracts and maps uploaded documents into the platform.", source: "SPGI - iLEVEL AI Launch", sourceUrl: "https://press.spglobal.com/2025-02-04-S-P-Global-Market-Intelligence-Launches-High-Scale-Data-Automation-in-iLEVEL,-Transforming-Private-Markets-Portfolio-Monitoring-with-AI-Powered-Technology" },
  { date: "Jan 15, 2025", company: "FactSet", ticker: "FDS", quarter: "Q1 2025", summary: "Launched Pitch Creator — GenAI-powered solution automating pitchbook creation for investment banks. Leverages Mercury AI chatbot to reduce hours of manual work into minutes.", source: "FDS Pitch Creator Launch", sourceUrl: "https://investor.factset.com/news-releases/news-release-details/factset-launches-ai-powered-pitch-creator" },
  { date: "Jan 13, 2025", company: "Moody's", ticker: "MCO", quarter: "Q1 2025", summary: "Announced acquisition of CAPE Analytics — AI-powered geospatial intelligence for residential and commercial properties. Adds computer vision and ML capabilities to Moody's insurance solutions.", source: "MCO - CAPE Analytics Acquisition", sourceUrl: "https://ir.moodys.com/press-releases/news-details/2025/Moodys-to-Acquire-CAPE-Analytics-Adding-AI-Powered-Geospatial-Property-Risk-Intelligence-to-Its-Industry-Leading-Insurance-Risk-Models/default.aspx" },
  { date: "Jan 2025", company: "OpenAI", ticker: "PRIVATE", quarter: "Q1 2025", summary: "Launched ChatGPT Pro ($200/month) and Advanced Voice upgrade with enhanced naturalness. Beginning of push toward premium enterprise and professional tiers.", source: "OpenAI Product Updates", sourceUrl: "https://openai.com/index/new-tools-and-features-in-chatgpt/" },
  { date: "Jan 2025", company: "Anthropic", ticker: "PRIVATE", quarter: "Q1 2025", summary: "Launched Claude Cowork alongside 30+ products with eleven open-source plugins. Expanded Claude for Enterprise with HIPAA compliance for healthcare and life sciences.", source: "Anthropic Product Updates", sourceUrl: "https://www.anthropic.com/news" },
];

const statusConfig = {
  leader:      { bg: "#EDFAF3", text: "#1A7A4A", border: "#A8DFC0", dot: "#1A7A4A" },
  laggard:     { bg: "#FEF0F2", text: "#A8001A", border: "#F5B8BE", dot: "#CC2030" },
  frontrunner: { bg: "#F0F4FF", text: "#0028A1", border: "#A8BCE8", dot: "#0028A1" },
};

function Badge({ status, label }) {
  const s = statusConfig[status] || statusConfig.building;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: "5px",
      background: s.bg, color: s.text,
      border: `1px solid ${s.border}`,
      borderRadius: "20px", padding: "3px 9px",
      fontSize: "10px", fontWeight: 700, letterSpacing: "0.06em",
      fontFamily: "Arial, monospace",
    }}>
      <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: s.dot, flexShrink: 0 }} />
      {label}
    </span>
  );
}

function CompanyCard({ company, expanded, onToggle }) {
  return (
    <div
      onClick={onToggle}
      style={{
        background: M.white,
        border: `1px solid ${M.border}`,
        borderRadius: "8px",
        overflow: "hidden",
        cursor: "pointer",
        transition: "box-shadow 0.2s, transform 0.15s",
        boxShadow: expanded ? "0 4px 20px rgba(0,40,161,0.10)" : "0 1px 4px rgba(0,40,161,0.05)",
        transform: expanded ? "translateY(-1px)" : "none",
      }}
      onMouseEnter={e => { if (!expanded) { e.currentTarget.style.boxShadow = "0 3px 12px rgba(0,40,161,0.10)"; }}}
      onMouseLeave={e => { if (!expanded) { e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,40,161,0.05)"; }}}
    >
      {/* Left accent border */}
      <div style={{ display: "flex" }}>
        <div style={{ width: "4px", background: company.accent, flexShrink: 0 }} />

        <div style={{ flex: 1, padding: "16px 16px 14px" }}>
          {/* Top row */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "5px", flexWrap: "wrap" }}>
                <span style={{
                  background: company.tag, color: company.tagText,
                  fontSize: "10px", fontWeight: 700, letterSpacing: "0.08em",
                  padding: "2px 7px", borderRadius: "4px",
                  fontFamily: "Arial, monospace",
                }}>{company.ticker}</span>
                <Badge status={company.status} label={company.statusLabel} />
              </div>
              <div style={{ fontSize: "15px", fontWeight: 700, color: M.textDark, fontFamily: "Arial, sans-serif", lineHeight: 1.2 }}>{company.name}</div>
              <div style={{ fontSize: "10px", color: M.midGray, marginTop: "2px", letterSpacing: "0.03em" }}>{company.sector}</div>
            </div>
            <div style={{ textAlign: "right", flexShrink: 0, marginLeft: "12px" }}>
              <div style={{ fontSize: "22px", fontWeight: 800, color: company.accent, fontFamily: "Arial, monospace", lineHeight: 1 }}>{company.metric}</div>
              <div style={{ fontSize: "10px", color: M.midGray, marginTop: "2px", maxWidth: "130px", textAlign: "right", lineHeight: 1.4 }}>{company.metricLabel}</div>
            </div>
          </div>

          {/* Headline */}
          <div style={{
            fontSize: "12px", fontWeight: 600, color: M.textDark,
            marginBottom: "8px", lineHeight: 1.4,
            paddingBottom: "8px", borderBottom: `1px solid ${M.border}`,
          }}>
            {company.headline}
          </div>

          {/* Theme pill */}
          <div style={{
            display: "inline-block", fontSize: "10px",
            color: M.midGray, background: M.offWhite,
            border: `1px solid ${M.border}`, padding: "2px 8px",
            borderRadius: "20px", marginBottom: "8px",
            letterSpacing: "0.04em",
          }}>
            {company.theme}
          </div>

          {/* Summary preview */}
          {!expanded && (
            <p style={{
              fontSize: "11px", color: "#6B7A8F", lineHeight: 1.65,
              margin: 0,
              display: "-webkit-box", WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical", overflow: "hidden",
            }}>
              {company.aiSummary}
            </p>
          )}

          {/* Expanded */}
          {expanded && (
            <div>
              <p style={{ fontSize: "12px", color: "#4A5568", lineHeight: 1.7, marginBottom: "14px", marginTop: "4px" }}>
                {company.aiSummary}
              </p>

              {/* Key Fact */}
              <div style={{
                background: M.offWhite, border: `1px solid ${M.border}`,
                borderRadius: "6px", padding: "10px 12px", marginBottom: "12px",
              }}>
                <div style={{ fontSize: "9px", color: M.midGray, letterSpacing: "0.12em", fontWeight: 700, marginBottom: "4px", fontFamily: "Arial, monospace" }}>KEY FACT</div>
                <div style={{ fontSize: "11px", color: M.textDark, lineHeight: 1.65 }}>{company.keyFact}</div>
              </div>

              {/* Quote */}
              <div style={{
                borderLeft: `3px solid ${company.accent}`,
                paddingLeft: "12px", marginBottom: "12px",
                background: company.tag, borderRadius: "0 6px 6px 0", padding: "10px 12px 10px 14px",
              }}>
                <div style={{ fontSize: "12px", color: M.textDark, fontStyle: "italic", lineHeight: 1.6, marginBottom: "5px" }}>"{company.quote}"</div>
                <div style={{ fontSize: "10px", color: M.midGray }}>— {company.speaker}</div>
              </div>

              {/* Guidance + Risk */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "12px" }}>
                <div style={{
                  background: "#EDFAF3", border: "1px solid #A8DFC0",
                  borderRadius: "6px", padding: "8px 10px",
                }}>
                  <div style={{ fontSize: "9px", color: M.green, letterSpacing: "0.1em", fontWeight: 700, marginBottom: "4px", fontFamily: "Arial, monospace" }}>GUIDANCE / OUTLOOK</div>
                  <div style={{ fontSize: "10px", color: "#2D4A3E", lineHeight: 1.6 }}>{company.guidance}</div>
                </div>
                <div style={{
                  background: "#FEF0F2", border: "1px solid #F5B8BE",
                  borderRadius: "6px", padding: "8px 10px",
                }}>
                  <div style={{ fontSize: "9px", color: M.red, letterSpacing: "0.1em", fontWeight: 700, marginBottom: "4px", fontFamily: "Arial, monospace" }}>WATCH / RISK</div>
                  <div style={{ fontSize: "10px", color: "#5A1820", lineHeight: 1.6 }}>{company.risk}</div>
                </div>
              </div>

              {/* Source */}
              <div style={{ display: "flex", alignItems: "center", gap: "6px", paddingTop: "8px", borderTop: `1px solid ${M.border}` }}>
                <span style={{ fontSize: "9px", color: M.midGray, letterSpacing: "0.08em", fontFamily: "Arial, monospace" }}>SOURCE:</span>
                <a href={company.sourceUrl} target="_blank" rel="noreferrer"
                  onClick={e => e.stopPropagation()}
                  style={{ fontSize: "10px", color: M.lightBlue, textDecoration: "none", borderBottom: `1px solid ${M.skyBlue}` }}>
                  {company.source} · {company.sourceDate} ↗
                </a>
              </div>
            </div>
          )}

          {/* Expand indicator */}
          <div style={{
            textAlign: "right", marginTop: "6px",
            color: M.midGray, fontSize: "11px",
            transition: "transform 0.2s",
            transform: expanded ? "rotate(180deg)" : "none",
          }}>▾</div>
        </div>
      </div>
    </div>
  );
}

function SectionBanner({ title, subtitle, stats }) {
  return (
    <div style={{
      background: M.white, border: `1px solid ${M.border}`,
      borderRadius: "8px", padding: "14px 18px", marginBottom: "18px",
      display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px",
    }}>
      <div>
        <div style={{ fontSize: "11px", fontWeight: 700, color: M.primary, letterSpacing: "0.08em", marginBottom: "3px", fontFamily: "Arial, monospace" }}>{title}</div>
        <div style={{ fontSize: "12px", color: "#4A5568", maxWidth: "620px", lineHeight: 1.6 }}>{subtitle}</div>
      </div>
      <div style={{ display: "flex", gap: "20px" }}>
        {stats.map(s => (
          <div key={s.label} style={{ textAlign: "center" }}>
            <div style={{ fontSize: "22px", fontWeight: 800, color: s.color, fontFamily: "Arial, monospace", lineHeight: 1 }}>{s.value}</div>
            <div style={{ fontSize: "9px", color: M.midGray, letterSpacing: "0.08em", marginTop: "2px" }}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ThemeGrid({ themes }) {
  const [expandedThemes, setExpandedThemes] = useState({});
  const toggleTheme = (i) => setExpandedThemes(p => ({ ...p, [i]: !p[i] }));

  return (
    <div style={{ marginBottom: "20px" }}>
      <div style={{
        background: M.navy, borderRadius: "8px", padding: "18px 20px",
      }}>
        <div style={{ fontSize: "12px", fontWeight: 700, color: "#FFFFFF", letterSpacing: "0.06em", marginBottom: "14px", fontFamily: "Arial, sans-serif" }}>
          Cross-Group Themes
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "10px" }}>
          {themes.map((t, i) => (
            <div key={t.title}
              onClick={() => toggleTheme(i)}
              style={{
                background: expandedThemes[i] ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: "6px", padding: "12px 14px",
                borderTop: "3px solid " + t.color,
                cursor: "pointer",
                transition: "background 0.2s",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.12)"; }}
              onMouseLeave={e => { if (!expandedThemes[i]) e.currentTarget.style.background = "rgba(255,255,255,0.07)"; }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ fontSize: "11px", fontWeight: 700, color: "#FFFFFF", fontFamily: "Arial, sans-serif" }}>{t.title}</div>
                <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.5)", transition: "transform 0.2s", transform: expandedThemes[i] ? "rotate(180deg)" : "none", flexShrink: 0, marginLeft: "8px" }}>▾</span>
              </div>
              {expandedThemes[i] && (
                <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.72)", lineHeight: 1.7, marginTop: "10px", paddingTop: "10px", borderTop: "1px solid rgba(255,255,255,0.12)" }}>{t.text}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


function FinancialsTable() {
  const [sortKey, setSortKey] = useState("ticker");
  const [sortDir, setSortDir] = useState(1);

  const handleSort = (key) => {
    if (sortKey === key) setSortDir(d => d * -1);
    else { setSortKey(key); setSortDir(key === "ticker" || key === "name" ? 1 : -1); }
  };

  const sorted = [...financials].sort((a, b) => {
    const av = a[sortKey], bv = b[sortKey];
    if (typeof av === "string") return av.localeCompare(bv) * sortDir;
    return (av - bv) * sortDir;
  });

  const cols = [
    { key: "ticker", label: "Ticker", w: "70px" },
    { key: "name", label: "Company", w: "140px" },
    { key: "reportedGrowth", label: "Reported Rev Growth", w: "auto" },
    { key: "organicGrowth", label: "Organic CCY Growth", w: "auto" },
    { key: "adjMargin", label: "Adj. Operating Margin", w: "auto" },
    { key: "source", label: "Source", w: "180px" },
  ];

  return (
    <div style={{ background: M.white, border: "1px solid " + M.border, borderRadius: "8px", overflow: "hidden" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "11px", fontFamily: "Arial, sans-serif" }}>
        <thead>
          <tr style={{ background: M.navy }}>
            {cols.map(c => (
              <th key={c.key} onClick={() => handleSort(c.key)} style={{
                padding: "10px 12px", textAlign: c.key === "ticker" || c.key === "name" || c.key === "source" ? "left" : "right",
                color: "#FFF", fontWeight: 700, fontSize: "10px", letterSpacing: "0.06em",
                cursor: "pointer", userSelect: "none", width: c.w, whiteSpace: "nowrap",
              }}>
                {c.label} {sortKey === c.key ? (sortDir > 0 ? "▲" : "▼") : ""}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.map((f, i) => (
            <tr key={f.ticker} style={{ background: i % 2 === 0 ? M.white : M.offWhite, borderBottom: "1px solid " + M.border }}>
              <td style={{ padding: "8px 12px", fontWeight: 700, color: M.primary }}>{f.ticker}</td>
              <td style={{ padding: "8px 12px", color: M.textDark }}>{f.name}</td>
              <td style={{ padding: "8px 12px", textAlign: "right", fontWeight: 600, color: f.reportedGrowth >= 8 ? M.green : f.reportedGrowth < 5 ? M.red : M.textDark }}>{f.reportedGrowth}%</td>
              <td style={{ padding: "8px 12px", textAlign: "right", fontWeight: 600, color: f.organicGrowth >= 8 ? M.green : f.organicGrowth < 5 ? M.red : M.textDark }}>{f.organicGrowth}%</td>
              <td style={{ padding: "8px 12px", textAlign: "right", fontWeight: 600, color: M.textDark }}>{f.adjMargin}%</td>
              <td style={{ padding: "8px 12px" }}>
                <a href={f.sourceUrl} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()} style={{ fontSize: "10px", color: M.lightBlue, textDecoration: "none", borderBottom: "1px solid " + M.skyBlue }}>{f.source} ↗</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function DisclosuresTimeline() {
  const [filter, setFilter] = useState("all");
  const companies = ["all", ...Array.from(new Set(disclosures.map(d => d.company)))];
  const filtered = filter === "all" ? disclosures : disclosures.filter(d => d.company === filter);

  return (
    <div>
      <SectionBanner
        title="AI DISCLOSURES TIMELINE"
        subtitle={<>Every AI-related disclosure across all tracked companies, organized by date. Each entry links to its <strong>primary source document</strong>.</>}
        stats={[
          { value: disclosures.length, label: "TOTAL DISCLOSURES", color: M.primary },
          { value: new Set(disclosures.map(d => d.company)).size, label: "COMPANIES", color: M.lightBlue },
        ]}
      />

      {/* Company filter */}
      <div style={{ display: "flex", gap: "6px", marginBottom: "16px", flexWrap: "wrap" }}>
        {companies.map(c => (
          <button key={c} onClick={() => setFilter(c)} style={{
            background: filter === c ? M.navy : M.white,
            color: filter === c ? "#FFF" : M.textDark,
            border: "1px solid " + (filter === c ? M.navy : M.border),
            borderRadius: "20px", padding: "5px 14px", fontSize: "11px",
            fontWeight: filter === c ? 700 : 500, cursor: "pointer",
            fontFamily: "Arial, sans-serif", transition: "all 0.15s",
          }}>
            {c === "all" ? "All Companies" : c}
          </button>
        ))}
      </div>

      {/* Timeline entries */}
      <div style={{ position: "relative", paddingLeft: "24px" }}>
        {/* Vertical line */}
        <div style={{ position: "absolute", left: "7px", top: "0", bottom: "0", width: "2px", background: M.border }} />

        {filtered.map((d, i) => (
          <div key={i} style={{ position: "relative", marginBottom: "16px" }}>
            {/* Dot */}
            <div style={{ position: "absolute", left: "-20px", top: "6px", width: "10px", height: "10px", borderRadius: "50%", background: M.primary, border: "2px solid " + M.white, boxShadow: "0 0 0 2px " + M.border }} />

            <div style={{
              background: M.white, border: "1px solid " + M.border, borderRadius: "8px",
              padding: "14px 16px", transition: "box-shadow 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 3px 12px rgba(0,40,161,0.08)"; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px", flexWrap: "wrap", gap: "8px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ fontSize: "10px", fontWeight: 700, color: M.primary, background: "#F0F4FF", padding: "2px 7px", borderRadius: "4px", fontFamily: "Arial, monospace" }}>{d.ticker}</span>
                  <span style={{ fontSize: "12px", fontWeight: 600, color: M.textDark }}>{d.company}</span>
                </div>
                <span style={{ fontSize: "10px", color: M.midGray, fontFamily: "Arial, monospace" }}>{d.date}</span>
              </div>

              <p style={{ fontSize: "12px", color: "#4A5568", lineHeight: 1.7, margin: "0 0 10px 0" }}>
                {d.summary}
              </p>

              <a href={d.sourceUrl} target="_blank" rel="noreferrer" style={{
                fontSize: "10px", color: M.lightBlue, textDecoration: "none",
                borderBottom: "1px solid " + M.skyBlue, fontFamily: "Arial, monospace",
              }}>
                {d.source} ↗
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [expandedPeers, setExpandedPeers] = useState({});
  const [expandedNatives, setExpandedNatives] = useState({});
  const [activeTab, setActiveTab] = useState("peers");

  const togglePeer = i => setExpandedPeers(p => ({ ...p, [i]: !p[i] }));
  const toggleNative = i => setExpandedNatives(p => ({ ...p, [i]: !p[i] }));

  return (
    <div style={{ background: M.offWhite, minHeight: "100vh", fontFamily: "Arial, sans-serif", color: M.textDark }}>
      <style>{`
        
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: ${M.offWhite}; }
        ::-webkit-scrollbar-thumb { background: ${M.skyBlue}; border-radius: 3px; }
      `}</style>

      {/* ── HEADER ─────────────────────────────────────────────────── */}
      <div style={{ background: M.navy, borderBottom: `3px solid ${M.primary}` }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "22px 28px 0" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "16px", marginBottom: "20px" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                {/* Moody's-style wordmark placeholder */}
                <div style={{
                  background: M.primary, color: "#FFF",
                  fontSize: "11px", fontWeight: 800, letterSpacing: "0.12em",
                  padding: "3px 10px", borderRadius: "3px",
                  fontFamily: "Arial, sans-serif",
                }}>INTELLIGENCE</div>
                <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.45)", letterSpacing: "0.1em", fontFamily: "Arial, monospace" }}>DASHBOARD</div>
              </div>
              <h1 style={{
                fontFamily: "Arial, sans-serif", fontSize: "24px", fontWeight: 800,
                color: "#FFFFFF", lineHeight: 1.15, letterSpacing: "-0.02em",
              }}>
                AI Disclosures Monitor
              </h1>
              <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "12px", marginTop: "5px" }}>
                13 Companies · 70+ Verified Disclosures · Q1 2025 Through Q1 2026 · All Claims Linked to Primary Sources
              </p>
            </div>
            <div style={{ display: "flex", gap: "24px", paddingBottom: "2px" }}>
              {[
                { v: "13", l: "COMPANIES", c: M.lightBlue },
                { v: lastUpdated.split(",")[0].replace("March ", "Mar "), l: "DATA AS OF", c: "#FFF" },
                { v: "8", l: "LEADERS", c: "#6ED9A0" },
                { v: "3", l: "LAGGARDS", c: "#F59090" },
              ].map(s => (
                <div key={s.l} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "20px", fontWeight: 800, color: s.c, fontFamily: "Arial, monospace", lineHeight: 1 }}>{s.v}</div>
                  <div style={{ fontSize: "9px", color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em", marginTop: "3px" }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Tabs */}
          <div style={{ display: "flex", gap: "3px" }}>
            {[
              { id: "peers", label: "Peer Group", sub: "10 companies", count: 10 },
              { id: "natives", label: "AI Natives", sub: "3 companies", count: 3 },
              { id: "financials", label: "Financials", sub: "peer comparison", count: 10 },
              { id: "timeline", label: "Disclosures", sub: "by date", count: disclosures.length },
            ].map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
                background: activeTab === tab.id ? M.white : "transparent",
                color: activeTab === tab.id ? M.primary : "rgba(255,255,255,0.55)",
                border: "none", padding: "9px 18px 10px",
                borderRadius: "6px 6px 0 0",
                cursor: "pointer", fontSize: "12px", fontWeight: 700,
                fontFamily: "Arial, sans-serif", letterSpacing: "0.03em",
                transition: "all 0.2s",
                display: "flex", alignItems: "center", gap: "7px",
              }}>
                {tab.label}
                <span style={{
                  background: activeTab === tab.id ? M.surface : "rgba(255,255,255,0.12)",
                  color: activeTab === tab.id ? M.primary : "rgba(255,255,255,0.55)",
                  fontSize: "9px", padding: "1px 6px",
                  borderRadius: "10px", fontFamily: "Arial, monospace",
                }}>{tab.count}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── CONTENT ────────────────────────────────────────────────── */}
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "22px 28px 40px" }}>

        {/* WHAT'S NEW BANNER */}
        <div style={{ background: M.white, border: "1px solid " + M.primary, borderLeft: "4px solid " + M.primary, borderRadius: "6px", padding: "12px 16px", marginBottom: "18px" }}>
          <div style={{ fontSize: "10px", fontWeight: 700, color: M.primary, letterSpacing: "0.08em", marginBottom: "6px", fontFamily: "Arial, monospace" }}>WHAT'S NEW — {lastUpdated}</div>
          {whatsNew.map((item, i) => (
            <div key={i} style={{ fontSize: "11px", color: "#4A5568", lineHeight: 1.6, paddingLeft: "12px", position: "relative" }}>
              <span style={{ position: "absolute", left: "0", color: M.primary }}>•</span>{item}
            </div>
          ))}
        </div>

        {/* PEER GROUP TAB */}
        {activeTab === "peers" && (
          <>
            <SectionBanner
              title="PEER GROUP — DATA, ANALYTICS & INFORMATION SERVICES"
              subtitle={<>MCO, SPGI, TRI, LSEG, VRSK, CSGP, MSCI, Nasdaq, Gartner, FactSet — all incumbents navigating AI as both opportunity and threat. Shared thesis: <strong>proprietary data + domain expertise = durable moat.</strong> Key divergence: speed of AI monetisation.</>}
              stats={[
                { value: peers.filter(p => p.status === "leader").length, label: "LEADERS", color: M.green },
                { value: peers.filter(p => p.status === "laggard").length, label: "LAGGARDS", color: M.red },
              ]}
            />
            <ThemeGrid themes={[
              { title: "Proprietary Data as the Moat", text: "Every peer group company makes the same core strategic argument: curated, domain-specific, licensed data cannot be replicated by general-purpose LLMs. Moody's (600M+ entities), LSEG (90% IP-protected revenue), Verisk (insurance loss data spanning decades), and Thomson Reuters (legal/tax corpus) all position their data estates as the irreplaceable foundation that AI enhances rather than disrupts. The companies monetizing this thesis fastest are those embedding AI directly into existing subscription workflows rather than selling AI as a standalone product.", color: M.lightBlue },
              { title: "Agentic AI Is Replacing Manual Workflows", text: "The frontier has moved from chatbots and copilots to autonomous multi-step agents. Moody's Agentic Solutions automates credit assessment and KYC screening. Verisk's XactGen produces near-complete insurance claims estimates from aerial imagery alone. Nasdaq's Digital Sanctions Analyst cuts human review workload by 80%+. Thomson Reuters' CoCounsel handles legal research workflows end-to-end. CoStar's Homes AI spans the full real estate search experience. The common pattern: these aren't demos — they're live products processing real customer workloads.", color: "#6ED9A0" },
              { title: "MCP Is Becoming the Standard for Financial Data Access", text: "Model Context Protocol (MCP) is emerging as the de facto API standard for connecting enterprise AI models to proprietary financial data. LSEG has 60+ institutions connected and partnerships with Anthropic, OpenAI, Microsoft, Databricks, Snowflake, and Rogo. Moody's is distributing MCP servers through Databricks Marketplace and Claude for Financial Services. This infrastructure layer is critical — whoever controls the data plumbing for AI workflows controls the customer relationship.", color: "#FFD166" },
              { title: "AI Investment Is Self-Funding", text: "The most disciplined operators are using AI savings to fund AI investment, creating a virtuous cycle. S&P Global has automated >50% of data workflows and eliminated 10%+ of applications. Thomson Reuters is guiding 100bps of annual margin expansion through 2028 from AI efficiencies. MSCI is targeting 5-15% opex reduction to reinvest entirely into new products. CoStar's AI cost savings are explicitly included in 2026 guidance. Even FactSet's 'amplify, not replace' strategy is designed to protect margins while investing.", color: "#F59090" },
              { title: "GenAI Adoption Accelerating Revenue Growth", text: "Companies that can quantify GenAI's impact on customer economics are seeing accelerating revenue. Thomson Reuters' GenAI ACV doubled from 15% to 28% in three quarters. Moody's GenAI-adopter customers are growing at 2x the overall MA rate. Nasdaq's Verafin enterprise signings quadrupled YoY. Verisk's XactXpert is adopted by 7 of the top 10 homeowners insurers. The inflection from 'we're building AI' to 'AI is driving our numbers' happened in late 2025 for the leaders.", color: "#A8BCE8" },
              { title: "The Execution Gap Is Widening", text: "A clear bifurcation is emerging between leaders with live, monetized AI products and laggards still in the 'building' or 'experimenting' phase. Gartner's AskGartner shows strong leading indicators but contract value grew only 1%, with the stock down 35% YTD. FactSet's methodical approach is sound but ASV growth needs to accelerate. MSCI's AI revenue (~$15-20M) remains small relative to total revenue. The market is increasingly pricing in execution speed, not just strategy articulation.", color: M.red },
            ]} />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(330px, 1fr))", gap: "12px" }}>
              {peers.map((c, i) => (
                <CompanyCard key={c.ticker + i} company={c} expanded={!!expandedPeers[i]} onToggle={() => togglePeer(i)} />
              ))}
            </div>

            {/* ── STRATEGIC INSIGHTS ─────────────────────────────────── */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginTop: "24px" }}>

              {/* Differentiation Opportunities */}
              <div style={{ background: M.white, border: "1px solid " + M.border, borderRadius: "8px", overflow: "hidden" }}>
                <div style={{ background: "linear-gradient(135deg, #0028A1, #001A6E)", padding: "14px 18px" }}>
                  <div style={{ fontSize: "12px", fontWeight: 700, color: "#FFF", letterSpacing: "0.06em", fontFamily: "Arial, sans-serif" }}>
                    Differentiation Opportunities
                  </div>
                  <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.6)", marginTop: "3px" }}>Where leaders can pull ahead of the pack</div>
                </div>
                <div style={{ padding: "14px 18px" }}>
                  {[
                    { title: "Agentic Workflows That Replace, Not Assist", desc: "Verisk's XactGen and Nasdaq's Digital Sanctions Analyst are the clearest examples of AI replacing entire manual processes rather than augmenting them. Companies that can demonstrate measurable headcount displacement or cycle-time elimination at their customers will command premium pricing and stickier contracts. Moody's Agentic Solutions and Thomson Reuters' CoCounsel are positioned to follow this path.", color: M.green },
                    { title: "Becoming the Data Layer for Third-Party AI", desc: "LSEG's MCP strategy — making its data available inside ChatGPT, Claude, and Databricks — creates a distribution advantage that's difficult to replicate. Moody's is following with MCP servers on Databricks Marketplace. The opportunity is to become the trusted, governed data source that every AI model in financial services pulls from, regardless of which model the customer chooses.", color: M.lightBlue },
                    { title: "Vertical AI Products With Consumption Pricing", desc: "The shift from flat subscription to consumption-based pricing for AI features is nascent but potentially transformative. Companies that can meter usage of AI agents — per query, per analysis, per automated workflow — can capture value proportional to the efficiency gains delivered. LSEG is developing this model; first movers will set pricing benchmarks for the industry.", color: M.amber },
                    { title: "Proprietary Training Data as a Licensing Business", desc: "As frontier models require ever-larger datasets, companies with unique proprietary corpora (Moody's credit data, Verisk's insurance loss history, Thomson Reuters' legal precedent library) have an emerging licensing opportunity. This is a new revenue stream that didn't exist two years ago — selling data access to model providers for training or RAG, separate from the core analytics business.", color: "#7B4FA6" },
                    { title: "AI-Powered Cross-Sell Into Adjacent Markets", desc: "CoStar's expansion from commercial to residential real estate via Homes AI, S&P Global's push into private markets, and Moody's private credit revenue (up 60% YoY) all show how AI can lower the cost of entering adjacent verticals. The companies with the broadest data estates and most flexible AI infrastructure will be best positioned to expand TAM without proportional cost increases.", color: M.primary },
                  ].map(item => (
                    <div key={item.title} style={{ marginBottom: "14px", paddingBottom: "14px", borderBottom: "1px solid " + M.border }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                        <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: item.color, flexShrink: 0 }} />
                        <div style={{ fontSize: "12px", fontWeight: 700, color: M.textDark }}>{item.title}</div>
                      </div>
                      <div style={{ fontSize: "11px", color: "#4A5568", lineHeight: 1.7, paddingLeft: "16px" }}>{item.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Emerging Standards & Protocols */}
              <div style={{ background: M.white, border: "1px solid " + M.border, borderRadius: "8px", overflow: "hidden" }}>
                <div style={{ background: "linear-gradient(135deg, #001A6E, #0028A1)", padding: "14px 18px" }}>
                  <div style={{ fontSize: "12px", fontWeight: 700, color: "#FFF", letterSpacing: "0.06em", fontFamily: "Arial, sans-serif" }}>
                    Emerging Standards & Protocols
                  </div>
                  <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.6)", marginTop: "3px" }}>Industry norms being established in real time</div>
                </div>
                <div style={{ padding: "14px 18px" }}>
                  {[
                    { title: "Model Context Protocol (MCP) as Financial Data API", desc: "MCP is rapidly becoming the standard for how AI models access proprietary financial data. LSEG and Moody's are the earliest movers, distributing MCP servers through multiple channels (Anthropic, OpenAI, Databricks, Snowflake). Any company not developing an MCP strategy risks being excluded from the AI workflow layer where customer decisions are increasingly being made.", color: "#FFD166" },
                    { title: "AI Governance & Explainability Requirements", desc: "Moody's emphasis on 'decision-grade' and 'accurate, explainable and defensible' AI outputs is setting an implicit industry standard. As regulators (EU AI Act, potential U.S. frameworks) formalize AI governance requirements, companies with built-in explainability, audit trails, and human-in-the-loop safeguards will have a compliance advantage. This is becoming table stakes for selling AI into regulated financial institutions.", color: M.lightBlue },
                    { title: "AI-Adjusted Financial Guidance", desc: "A new disclosure norm is emerging: companies are explicitly quantifying AI's financial impact in forward guidance. Thomson Reuters guides 100bps annual margin expansion from AI. CoStar includes AI cost savings in 2026 numbers. S&P Global targets >20% run-rate expense reduction from AI by 2027. Investors are beginning to expect this level of specificity — companies that can't quantify AI's P&L impact will face valuation pressure.", color: M.green },
                    { title: "Consumption-Based AI Pricing Models", desc: "The subscription-to-consumption pricing transition is being pioneered by LSEG and Nasdaq in financial data. As AI features deliver variable value (an agentic workflow that saves one client 100 hours saves another 1,000), consumption pricing aligns revenue with customer value. The companies establishing these pricing frameworks now are setting norms that the rest of the industry will follow.", color: M.primary },
                    { title: "Agentic AI Compliance & Oversight Standards", desc: "Nasdaq's rollout of agentic workers in anti-financial crime (with 80%+ workload reduction) is creating precedent for how autonomous AI agents operate in regulated environments. The emerging standard includes: human oversight for high-stakes decisions, full audit trails for every agent action, regulatory approval workflows, and clear accountability when agents make errors. These guardrails are being defined by early adopters before regulators formalize them.", color: M.red },
                  ].map(item => (
                    <div key={item.title} style={{ marginBottom: "14px", paddingBottom: "14px", borderBottom: "1px solid " + M.border }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                        <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: item.color, flexShrink: 0 }} />
                        <div style={{ fontSize: "12px", fontWeight: 700, color: M.textDark }}>{item.title}</div>
                      </div>
                      <div style={{ fontSize: "11px", color: "#4A5568", lineHeight: 1.7, paddingLeft: "16px" }}>{item.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </>
        )}


        {/* FINANCIALS TAB */}
        {activeTab === "financials" && (
          <>
            <SectionBanner
              title="FINANCIAL COMPARISON — 10 PEER COMPANIES"
              subtitle={<>Reported revenue growth, organic constant-currency revenue growth, and adjusted operating margin from most recent full-year results. <strong>All figures from primary earnings releases.</strong></>}
              stats={[
                { value: Math.max(...financials.map(f => f.organicGrowth)).toFixed(1) + "%", label: "HIGHEST ORG. GROWTH", color: M.green },
                { value: Math.max(...financials.map(f => f.adjMargin)).toFixed(1) + "%", label: "HIGHEST ADJ. MARGIN", color: M.primary },
              ]}
            />

            {/* Bar Charts */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "14px", marginBottom: "20px" }}>
              {[
                { key: "reportedGrowth", label: "Reported Revenue Growth (%)", color: M.lightBlue },
                { key: "organicGrowth", label: "Organic CCY Revenue Growth (%)", color: M.green },
                { key: "adjMargin", label: "Adjusted Operating Margin (%)", color: M.primary },
              ].map(chart => (
                <div key={chart.key} style={{ background: M.white, border: "1px solid " + M.border, borderRadius: "8px", padding: "16px" }}>
                  <div style={{ fontSize: "11px", fontWeight: 700, color: M.textDark, marginBottom: "14px", fontFamily: "Arial, sans-serif" }}>{chart.label}</div>
                  {[...financials].sort((a, b) => b[chart.key] - a[chart.key]).map(f => (
                    <div key={f.ticker} style={{ marginBottom: "6px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "2px" }}>
                        <span style={{ fontSize: "10px", color: M.textDark }}>{f.ticker}</span>
                        <span style={{ fontSize: "10px", fontWeight: 600, color: chart.color, fontFamily: "Arial, monospace" }}>{f[chart.key]}%</span>
                      </div>
                      <div style={{ height: "6px", background: M.offWhite, borderRadius: "3px", border: "1px solid " + M.border }}>
                        <div style={{ height: "100%", width: Math.max(2, (f[chart.key] / Math.max(...financials.map(x => x[chart.key]))) * 100) + "%", background: chart.color, borderRadius: "3px", transition: "width 0.3s" }} />
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Sortable Table */}
            <FinancialsTable />
          </>
        )}

        {/* AI NATIVES TAB */}
        {activeTab === "natives" && (
          <>
            <SectionBanner
              title="AI NATIVES — FRONTIER MODEL LABS & HYPERSCALERS"
              subtitle={<>Anthropic, OpenAI, and Alphabet — simultaneously <strong>suppliers, partners, and competitive threats</strong> to the peer group. Understanding their trajectory is essential for any AI disruption risk assessment of the peers above.</>}
              stats={[
                { value: "$14B", label: "ANTHROPIC ARR", color: M.primary },
                { value: "$25B", label: "OPENAI ARR", color: M.green },
                { value: "$403B", label: "ALPHABET REV", color: M.lightBlue },
              ]}
            />

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))", gap: "14px" }}>
              {aiNatives.map((c, i) => (
                <CompanyCard key={c.name} company={c} expanded={!!expandedNatives[i]} onToggle={() => toggleNative(i)} />
              ))}
            </div>

            {/* Revenue scale */}
            <div style={{ background: M.white, border: `1px solid ${M.border}`, borderRadius: "8px", padding: "18px 20px", marginTop: "20px" }}>
              <div style={{ fontSize: "12px", fontWeight: 700, color: M.textDark, marginBottom: "16px", fontFamily: "Arial, sans-serif" }}>Revenue Scale — All 13 Companies</div>
              {[
                { name: "Alphabet", rev: "$403B total", growth: "+15% YoY", pct: 100, color: "#4899D4" },
                { name: "OpenAI", rev: "~$25B ARR", growth: "~10x/3yr", pct: 6.2, color: "#1A7A4A" },
                { name: "Anthropic", rev: "~$14B ARR", growth: ">10x/yr", pct: 3.5, color: "#0028A1" },
                { name: "LSEG", rev: "~£12.5B", growth: "+7.1% organic", pct: 3.1, color: "#4899D4" },
                { name: "Gartner", rev: "$6.5B", growth: "+4% YoY", pct: 1.6, color: "#CC2030" },
                { name: "Thomson Reuters", rev: "$7.5B", growth: "+7% organic", pct: 1.9, color: "#0028A1" },
                { name: "S&P Global", rev: "~$5.5B", growth: "~7% organic", pct: 1.4, color: "#001A6E" },
                { name: "CoStar Group", rev: "$3.2B", growth: "+19% YoY", pct: 0.80, color: "#7B4FA6" },
                { name: "Verisk", rev: "$3.1B", growth: "+6.6% OCC", pct: 0.77, color: "#1A7A4A" },
                { name: "Nasdaq Inc.", rev: "$5.2B", growth: "+12% YoY", pct: 1.3, color: "#0095A8" },
                { name: "MSCI", rev: "~$3.3B RR", growth: "+9% organic", pct: 0.82, color: "#C97B00" },
                { name: "FactSet", rev: "~$2.4B", growth: "+5.4% YoY", pct: 0.60, color: "#0028A1" },
              ].map(item => (
                <div key={item.name} style={{ marginBottom: "9px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "3px", alignItems: "baseline" }}>
                    <div style={{ fontSize: "11px", color: M.textDark, fontWeight: 500 }}>{item.name}</div>
                    <div style={{ fontSize: "11px", color: M.midGray, fontFamily: "Arial, monospace" }}>
                      {item.rev} <span style={{ color: item.color, fontWeight: 600 }}>{item.growth}</span>
                    </div>
                  </div>
                  <div style={{ height: "5px", background: M.offWhite, borderRadius: "3px", overflow: "hidden", border: `1px solid ${M.border}` }}>
                    <div style={{ height: "100%", width: `${item.pct}%`, background: item.color, borderRadius: "3px" }} />
                  </div>
                </div>
              ))}
              <div style={{ fontSize: "9px", color: M.midGray, marginTop: "10px", fontFamily: "Arial, monospace" }}>
                * Alphabet shown as 100% baseline · ARR figures for private companies are run-rate estimates from public disclosures
              </div>
            </div>

            <ThemeGrid themes={[
              { title: "Partners or Threats?", text: "LSEG has MCP partnerships with both Anthropic AND OpenAI. TRI defends its content moat against the same general LLMs it uses internally. The supplier/competitor boundary is blurring.", color: M.lightBlue },
              { title: "Pentagon Risk Deadline: Jun 30, 2026", text: "DoD declared Anthropic a supply-chain risk. Defense contractors must cut ties by Jun 30, 2026. This opens gov/defense enterprise to OpenAI, Google & Azure-native models.", color: M.red },
              { title: "Enterprise vs. Consumer Economics", text: "Anthropic (85% enterprise) projects FCF positive by 2028. OpenAI (majority consumer) carries $14B+ inference costs in 2026. Enterprise-first is proving superior unit economics.", color: "#6ED9A0" },
              { title: "Two Historic IPOs Coming", text: "Anthropic (Wilson Sonsini engaged) & OpenAI (H2 2026 filing target) are both prepping public offerings. First-ever direct investor access to frontier AI models.", color: "#FFD166" },
            ]} />
          </>
        )}

        {/* DISCLOSURES TIMELINE TAB */}
        {activeTab === "timeline" && (
          <DisclosuresTimeline />
        )}
      </div>

      {/* ── FOOTER ─────────────────────────────────────────────────── */}
      <div style={{ background: M.white, borderTop: "1px solid " + M.border, padding: "16px 28px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "12px", marginBottom: "10px" }}>
            <div style={{ fontSize: "10px", color: M.midGray, fontFamily: "Arial, monospace", maxWidth: "700px", lineHeight: 1.6 }}>
              All claims verified against primary source earnings transcripts, SEC filings &amp; official press releases. Click any card to expand. Click source links to verify directly.
            </div>
            <div style={{ fontSize: "10px", color: M.midGray, fontFamily: "Arial, monospace" }}>Last updated: {lastUpdated}</div>
          </div>
          <div style={{ borderTop: "1px solid " + M.border, paddingTop: "10px" }}>
            <div style={{ fontSize: "9px", color: M.midGray, fontFamily: "Arial, monospace", lineHeight: 1.7, maxWidth: "900px" }}>
              <strong style={{ color: M.textDark }}>Methodology:</strong> This dashboard tracks AI-related disclosures from 13 companies across earnings call transcripts, investor day presentations, SEC filings, and official press releases. "Leader" and "Laggard" classifications reflect the maturity and monetization of each company's AI strategy relative to peers, based on publicly disclosed metrics. Financial data sourced from most recent full-year or fiscal-year earnings releases. Every data point links to its primary source document for independent verification. This dashboard is not investment advice.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
