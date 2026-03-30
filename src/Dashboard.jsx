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
  { date: "Mar 2026", company: "Anthropic", ticker: "PRIVATE", summary: "Launched the Claude Partner Network with $100M investment, expanding enterprise AI ecosystem through certified implementation partners and pre-built integrations.", source: "Claude Partner Network Launch", sourceUrl: "https://techcrunch.com/2026/02/12/anthropic-raises-another-30-billion-in-series-g-with-a-new-value-of-380-billion/" },
  { date: "Feb 26, 2026", company: "LSEG", ticker: "LSEG", summary: "Reported 60+ financial institutions connected via Model Context Protocol. Announced partnerships with Anthropic, OpenAI, Microsoft, Databricks, Snowflake & Rogo. First financial data provider to enable ChatGPT access to their data.", source: "LSEG FY 2025 Preliminary Results", sourceUrl: "https://www.lseg.com/en/investor-relations/financial-results/2025-preliminary-results" },
  { date: "Feb 24, 2026", company: "CoStar Group", ticker: "CSGP", summary: "Launched Homes AI as flagship consumer differentiator for Homes.com. AI delivering quantified cost savings in content creation, public records research, code writing, and lease data extraction — savings explicitly included in 2026 guidance.", source: "CSGP Q4 2025 Earnings", sourceUrl: "https://www.costargroup.com/press-room/2026/costar-group-full-year-2025-revenue-increased-19-year-over-year-net-income-7" },
  { date: "Feb 18, 2026", company: "Moody's", ticker: "MCO", summary: "Disclosed 40% of Moody's Analytics product portfolio now GenAI-enabled by ARR. GenAI-adopter customers growing at 2x the overall MA rate. Research Assistant logged 100K+ interactions and became fastest-adopted product in company history.", source: "MCO Q4 2025 Earnings Call", sourceUrl: "https://www.fool.com/earnings/call-transcripts/2026/02/18/moodys-mco-q4-2025-earnings-call-transcript/" },
  { date: "Feb 18, 2026", company: "Verisk", ticker: "VRSK", summary: "XactGen agentic AI produces near-complete claims estimates from aerial imagery and policyholder photos. XactXpert adopted by 7 of top 10 homeowners insurers. 35+ live AI products in insurance.", source: "VRSK Q4 2025 Earnings", sourceUrl: "https://www.stocktitan.net/news/VRSK/verisk-reports-fourth-quarter-and-full-year-2025-financial-b4bhfuj9ttxi.html" },
  { date: "Feb 12, 2026", company: "Anthropic", ticker: "PRIVATE", summary: "Closed $30B Series G at $380B valuation led by GIC & Coatue. Revenue at $14B ARR with 85% from enterprise customers. Claude Code responsible for 4% of all public GitHub commits worldwide.", source: "Anthropic Series G Announcement", sourceUrl: "https://techcrunch.com/2026/02/12/anthropic-raises-another-30-billion-in-series-g-with-a-new-value-of-380-billion/" },
  { date: "Feb 5, 2026", company: "Thomson Reuters", ticker: "TRI", summary: "GenAI-enabled ACV reached 28%, up from 15% in Q3 2024. 85% of employees active on internal AI platform (Open Arena). 300+ AI use cases in development. Microsoft announced as CoCounsel customer.", source: "TRI Q4 2025 Earnings Call", sourceUrl: "https://www.fool.com/earnings/call-transcripts/2026/02/05/thomson-reuters-tri-q4-2025-earnings-transcript/" },
  { date: "Feb 4, 2026", company: "Alphabet", ticker: "GOOGL", summary: "Google Cloud reached $70B run rate with backlog of $240B. Gemini unit costs reduced 78% in 2025. Revenue from generative AI solutions grew 400% YoY in Q4. Guided $175-185B CapEx for 2026.", source: "Alphabet Q4 2025 Earnings Call", sourceUrl: "https://abc.xyz/investor/events/event-details/2026/2025-Q4-Earnings-Call-2026-Dr_C033hS6/default.aspx" },
  { date: "Feb 3, 2026", company: "Gartner", ticker: "IT", summary: "AskGartner answered 500K+ AI questions in 2025. Users showing substantially higher renewal rates. Magic Quadrant creation time cut 75%. But contract value grew only 1% overall amid federal budget headwinds.", source: "Gartner Q4 2025 Earnings Call", sourceUrl: "https://news.alphastreet.com/gartner-inc-it-q4-2025-earnings-call-transcript/" },
  { date: "Jan 29, 2026", company: "Nasdaq", ticker: "NDAQ", summary: "Launched Agentic AI Workforce at Verafin — Digital Sanctions Analyst automates screening and reduces review workload by 80%+. Second agentic worker (Enhanced Due Diligence Analyst) launched. Every G-SIB is now a Nasdaq client.", source: "NDAQ Q4 2025 Earnings Call", sourceUrl: "https://www.nasdaq.com/newsroom/nasdaq-q4-earnings-outstanding-2025-nasdaq-exceeds-5-billion-net-revenue-first-time" },
  { date: "Jan 18, 2026", company: "OpenAI", ticker: "PRIVATE", summary: "CFO Sarah Friar outlined 2026 pivot to 'practical adoption' and enterprise. 910M weekly active users, 9M+ paying business users. Revenue at $25B ARR but inference costs projected at $14.1B in 2026.", source: "OpenAI Business Strategy Blog", sourceUrl: "https://www.cnbc.com/2026/01/19/openai-to-focus-on-practical-adoption-in-2026-says-finance-chief-sarah-friar.html" },
  { date: "Dec 18, 2025", company: "FactSet", ticker: "FDS", summary: "45% sequential growth in AI product launches in Q1 FY26. Launched Pitch Creator, BondCliQ, and AI-ready data server. New integrated KYC/AML/financial crime risk management within Workstation.", source: "FDS Q1 FY2026 Earnings Call", sourceUrl: "https://za.investing.com/news/company-news/factset-q1-2026-slides-revenue-and-eps-beat-expectations-amid-strategic-ai-investments-93CH-4034890" },
  { date: "Nov 13, 2025", company: "S&P Global", ticker: "SPGI", summary: "Investor Day revealed >50% of data workflows automated via AI and 10%+ of applications eliminated in 2025. Enterprise Data Office targeting >20% run-rate expense reduction by end of 2027.", source: "SPGI Investor Day 2025", sourceUrl: "https://investor.spglobal.com/news-releases/news-details/2025/SP-Global-to-Present-Next-Phase-of-its-Growth-Strategy-and-Medium-Term-Financial-Targets-at-Investor-Day-2025/default.aspx" },
  { date: "Oct 28, 2025", company: "MSCI", ticker: "MSCI", summary: "CEO called MSCI 'a total AI machine.' 25 AI-powered products launched in 2025 generating ~$15-20M revenue. AI cost savings (5-15% opex target) being fully reinvested into new product development.", source: "MSCI Q3 2025 Earnings Call", sourceUrl: "https://www.fool.com/earnings/call-transcripts/2025/10/28/msci-msci-q3-2025-earnings-call-transcript/" },
  { date: "Sep 16, 2025", company: "Moody's", ticker: "MCO", summary: "Launched Agentic Solutions to automate complex workflows across credit assessment, portfolio monitoring, KYC screening, and sales intelligence. Described as 'a paradigm shift' by GM Cristina Pieretti.", source: "Moody's Agentic Solutions Announcement", sourceUrl: "https://www.businesswire.com/news/home/20250916574541/en/Moodys-Agentic-Solutions-to-Automate-Complex-Workflows-and-Speed-Human-Decision-Making" },
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
                13 Companies · Most Recent Earnings & Investor Disclosures · All Claims Verified Against Primary Sources
              </p>
            </div>
            <div style={{ display: "flex", gap: "24px", paddingBottom: "2px" }}>
              {[
                { v: "13", l: "COMPANIES", c: M.lightBlue },
                { v: "Mar '26", l: "DATA AS OF", c: "#FFF" },
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
      <div style={{ background: M.white, borderTop: `1px solid ${M.border}`, padding: "12px 28px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px" }}>
        <div style={{ fontSize: "10px", color: M.midGray, fontFamily: "Arial, monospace" }}>
          All claims verified against primary source earnings transcripts, SEC filings &amp; official press releases · Click any card to expand · Click source links to verify directly
        </div>
        <div style={{ fontSize: "10px", color: M.midGray, fontFamily: "Arial, monospace" }}>Data as of March 30, 2026</div>
      </div>
    </div>
  );
}
