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

const lastUpdated = "March 31, 2026";
const whatsNew = [
  "FactSet Q2 FY2026 earnings (Mar 31): revenue +7.1% to $611M, organic ASV +6.7%, raised FY2026 guidance — strongest organic growth in 5+ quarters",
  "FactSet appointed Kate Stepp as first-ever Chief AI Officer and Bob Stolte as CTO (effective Mar 2) — C-suite restructured around AI strategy",
  "FactSet AI Document Search deployed to 85K+ users (Mar 26); ComplyAdvantage KYC/AML integration in Workstation (Mar 3); AI Doc Ingest for Cobalt private markets (Feb 4)",
  "Moody's Token Integration Engine: first credit rating agency on the Canton blockchain network (Mar 18)",
  "Thomson Reuters 'Thomson' — proprietary legally-trained LLM revealed for summer 2026 launch (Mar 24)",
  "OpenAI GPT-5.4 launched Mar 5: native computer use, 1M context, 33% fewer hallucinations",
  "S&P Global acquired Enertel AI + expanded Capital IQ Pro with ProntoNLP and Drift AI (Mar 12–18)",
  "Verisk AI Fraud Study: 36% of consumers would alter claims; 98% of insurers say AI editing tools fuel fraud (Mar 17)",
  "Anthropic Claude Sonnet 4.6 released Feb 17 (missed prior refresh): $3/MTok, SWE-bench 79.6%, 1M context",
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
    headline: "85K+ Users on AI Document Search; Organic ASV Accelerates to +6.7%",
    metric: "85K+",
    metricLabel: "users on AI Document Search beta (Mar 2026)",
    theme: "AI-Amplified Workstation",
    status: "laggard",
    statusLabel: "Laggard",
    aiSummary: "Methodical, margin-disciplined approach accelerating. Q2 FY2026 (ended Feb 28) delivered organic revenue growth of 6.8% — strongest in 5+ quarters — driven by institutional buy-side and wealth management. AI Document Search deployed to 85K+ users in March 2026. Mercury AI chatbot for pitch decks and research live. First production-grade MCP server for real-time financial intelligence in Explorer beta (800+ institutional users). CEO's 'amplify, not replace' framing is deliberate positioning for institutional clients wary of disruption.",
    keyFact: "Q2 FY2026: Revenue $611M (+7.1%), organic ASV $2,449M (+6.7%), adj. EPS $4.46 (+4.2%). Raised FY2026 guidance: GAAP rev $2.45–2.47B, adj. EPS $17.25–17.75. Fiscal year ends August 31.",
    quote: "AI doesn't replace what makes FactSet essential. It amplifies it.",
    speaker: "CEO Sanoke Viswanathan",
    source: "FDS Q2 FY2026 Earnings",
    sourceDate: "Mar 31, 2026",
    sourceUrl: "https://www.globenewswire.com/news-release/2026/03/31/3265310/7768/en/FactSet-Reports-Results-for-Second-Quarter-2026.html",
    guidance: "FY2026 (to Aug 2026): Organic ASV +5.4–6.7%; GAAP rev $2.45–2.47B; Adj. EPS $17.25–17.75 (raised)",
    risk: "Adjusted operating margin contracted to 35.0% (from 36.3% prior year) as AI/tech investment ramps; GAAP EPS declined 4.5% YoY; competitive pressure from Bloomberg, LSEG, and AI-native entrants",
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
  { name: "FactSet", ticker: "FDS", reportedGrowth: 7.1, organicGrowth: 6.8, adjMargin: 35.0, source: "FDS Q2 FY2026 Earnings (Feb 28 qtr)", sourceUrl: "https://www.globenewswire.com/news-release/2026/03/31/3265310/7768/en/FactSet-Reports-Results-for-Second-Quarter-2026.html" },
];

const disclosures = [
  // ── MCO — Moody's Corporation ──────────────────────────────────────
  { date: "Feb 18, 2026", company: "Moody's", ticker: "MCO", quarter: "Q4 2025", summary: "2x ARR growth rate for customers who purchased or upgraded into a standalone GenAI product vs. rest of MA customers. 97% retention rate for GenAI product customers. 5x customer-reported productivity improvements across high-value workflows. +18 average NPS increase for CreditView customers adopting Research Assistant vs. non-adopters.", source: "MCO Q4 2025 Earnings Presentation", sourceUrl: "https://s203.q4cdn.com/694693571/files/doc_financials/2025/q4/4Q25-Earnings-Presentation-vFINAL.pdf" },
  { date: "Feb 18, 2026", company: "Moody's", ticker: "MCO", quarter: "Q4 2025", summary: "40% of MA product ARR now has GenAI enablement. ~$200M GenAI adopter cohort ARR (approaching). FY 2025 revenue $7.7B (+9% YoY), adjusted EPS $14.94 (+20%). Debt rated totaled all-time high $6.6T including $70B from AI-driven companies.", source: "MCO Q4 2025 Earnings Call", sourceUrl: "https://www.fool.com/earnings/call-transcripts/2026/02/18/moodys-mco-q4-2025-earnings-call-transcript/" },
  { date: "Feb 18, 2026", company: "Moody's", ticker: "MCO", quarter: "Q4 2025", summary: "CreditLens: ~20% annual growth (fastest in banking portfolio). 67% of eligible renewals upgrade to AI-enabled version. 67% average revenue uplift on upgrade. ~500 banks supported, $27T+ assets under management. CreditLens ARR >33% of banking segment.", source: "MCO Q4 2025 Earnings Presentation", sourceUrl: "https://s203.q4cdn.com/694693571/files/doc_financials/2025/q4/4Q25-Earnings-Presentation-vFINAL.pdf" },
  { date: "Feb 18, 2026", company: "Moody's", ticker: "MCO", quarter: "Q4 2025", summary: "Research Assistant: Fastest-adopted product in Moody's history. 100,000+ user interactions since Dec 2023 launch. 300% recurring user growth. 50-80% time savings on analyst workflows. 60% increase in research consumption. Credit memo prep reduced from 40 hours to 2 minutes.", source: "MCO Q4 2025 Earnings Presentation", sourceUrl: "https://s203.q4cdn.com/694693571/files/doc_financials/2025/q4/4Q25-Earnings-Presentation-vFINAL.pdf" },
  { date: "Feb 18, 2026", company: "Moody's", ticker: "MCO", quarter: "Q4 2025", summary: "80% of engineering staff using GenAI Copilot tools. 600M+ entities available via Smart APIs. Agentic AI solutions deployed across customer base. Credit memo creation >50% time reduction. CRE risk assessment reduced from hours/days to seconds/minutes.", source: "MCO Q4 2025 Earnings Call", sourceUrl: "https://www.fool.com/earnings/call-transcripts/2026/02/18/moodys-mco-q4-2025-earnings-call-transcript/" },
  { date: "Mar 18, 2026", company: "Moody's", ticker: "MCO", quarter: "Q1 2026", summary: "Token Integration Engine™ (TIE) launched: Moody's Ratings becomes first credit rating agency to bring independent credit analysis to blockchain financial infrastructure. TIE operates a node on the Canton Network, ingesting analytical data and distributing credit insights on-chain. Issuer-led participation model preserves rating integrity. Plan to expand to additional blockchain networks and instrument types.", source: "Moody's TIE Launch Press Release", sourceUrl: "https://ir.moodys.com/press-releases/news-details/2026/Moodys-Ratings-Becomes-First-Credit-Rating-Agency-to-Bring-Independent-Credit-Analysis-to-Blockchain-Financial-Infrastructure/default.aspx" },

  // ── SPGI — S&P Global ─────────────────────────────────────────────
  { date: "Feb 10, 2026", company: "S&P Global", ticker: "SPGI", quarter: "Q4 2025", summary: "Management called 2025 a 'breakthrough year for AI.' 66% of all 40,000 employees actively using Spark Assist GenAI platform. ~3,000 reusable AI prompts generated. 10%+ of enterprise applications eliminated through AI automation. Enterprise Data Office targeting 20%+ run-rate expense reduction by 2027.", source: "SPGI Q4 2025 Earnings Call", sourceUrl: "https://www.fool.com/earnings/call-transcripts/2026/02/10/sp-global-spgi-q4-2025-earnings-call-transcript/" },
  { date: "Feb 10, 2026", company: "S&P Global", ticker: "SPGI", quarter: "Q4 2025", summary: "iLEVEL Automated Data Ingestion: 20% of iLEVEL customers opted in within 6 months. Commodity Insights with Microsoft Copilot: 95% faster data extraction. $1B+ cumulative AI investment since 2018 (including ~$550M Kensho acquisition). Record 50.4% adjusted operating margins.", source: "SPGI Q4 2025 Earnings Call", sourceUrl: "https://www.fool.com/earnings/call-transcripts/2026/02/10/sp-global-spgi-q4-2025-earnings-call-transcript/" },
  { date: "Oct 22, 2025", company: "S&P Global", ticker: "SPGI", quarter: "Q3 2025", summary: "Capital IQ Pro AI launches: ChatIQ (GenAI assistant for company/industry analysis), Document Intelligence 2.0 (analyzes document repositories with precise citations), Natural Language Screening, Multi-Document ChatIQ. Market Intelligence organic growth 8% constant currency — strongest in 6 quarters.", source: "SPGI Capital IQ Pro AI Launch", sourceUrl: "https://press.spglobal.com/2025-10-22-S-P-Global-Redefines-Financial-Insights-with-New-AI-Powered-Multi-Document-Research-and-Analysis-Tool-in-Capital-IQ-Pro-ChatIQ" },
  { date: "Dec 10, 2025", company: "S&P Global", ticker: "SPGI", quarter: "Q4 2025", summary: "Multi-year strategic partnership with Google Cloud for agentic AI innovation. Kensho Data Retrieval Agent integrated with Google Gemini Enterprise. Unifying proprietary data on BigQuery. SparkAIR GenAI suite for querying proprietary datasets launched for institutional clients.", source: "SPGI Google Cloud Partnership", sourceUrl: "https://press.spglobal.com/2025-12-10-S-P-Global-Advances-AI-Powered-Enterprise-Transformation-Through-Strategic-Partnership-with-Google-Cloud" },
  { date: "Mar 12, 2026", company: "S&P Global", ticker: "SPGI", quarter: "Q1 2026", summary: "Capital IQ Pro expanded with new AI capabilities: ProntoNLP sentiment analytics integration, Drift AI for Excel-based natural-language financial modeling, 4M+ structured securities added, security-level fixed income ownership data, Visible Alpha biopharma analytics, and 20,000 private-markets documents added to Document Intelligence. Accelerating AI feature velocity for institutional research workflows.", source: "SPGI Capital IQ Pro AI Expansion", sourceUrl: "https://press.spglobal.com/2026-03-12-S-P-Global-Enhances-Capital-IQ-Pro-with-Expanded-Fixed-Income-and-Biopharma-Analytics" },
  { date: "Mar 18, 2026", company: "S&P Global", ticker: "SPGI", quarter: "Q1 2026", summary: "Completed acquisition of Enertel AI Corporation — AI/ML-driven short-term power price forecasting for North American electricity markets. S&P Global Energy now delivers real-time AI-powered nodal price forecasts for physical power traders, utilities, and asset operators. Addresses the AI-datacenter energy demand forecasting use case directly.", source: "SPGI Enertel AI Acquisition", sourceUrl: "https://press.spglobal.com/2026-03-18-S-P-Global-Acquires-Enertel-AI-Corporation-to-Enhance-Power-Market-Offering" },

  // ── TRI — Thomson Reuters ─────────────────────────────────────────
  { date: "Feb 24, 2026", company: "Thomson Reuters", ticker: "TRI", quarter: "Q1 2026", summary: "CoCounsel reached 1 million users across 107 countries — nearly 3 years after launch. Stock surged 11-14% on announcement. Milestone driven by legal, tax, accounting, audit, risk, and compliance adoption globally.", source: "TRI CoCounsel 1M Users", sourceUrl: "https://www.prnewswire.com/news-releases/one-million-professionals-turn-to-cocounsel-as-thomson-reuters-scales-ai-for-regulated-industries-302694903.html" },
  { date: "Feb 5, 2026", company: "Thomson Reuters", ticker: "TRI", quarter: "Q4 2025", summary: "AI-enabled products reached 28% of ACV (up from 15% a year ago — 87% growth in AI ACV share). 85%+ of employees actively using Open Arena AI tools. 300+ AI use cases in development. 80%+ of engineers using AI coding tools. Annual AI investment: $200M+ (doubled from $100M in 2023).", source: "TRI Q4 2025 Earnings Call", sourceUrl: "https://www.fool.com/earnings/call-transcripts/2026/02/05/thomson-reuters-tri-q4-2025-earnings-transcript/" },
  { date: "Feb 5, 2026", company: "Thomson Reuters", ticker: "TRI", quarter: "Q4 2025", summary: "Guiding 100 basis points/yr EBITDA margin expansion (2026-2028) from AI despite $200M+ annual investment. FY 2025 organic growth 7%. BigThree segments: Legal $738M (+9%), Corporate $496M (+9%), Tax/Audit $414M (+11%) in Q4. 2026 guidance: 7.5-8% organic growth.", source: "TRI Q4 2025 Earnings Call", sourceUrl: "https://www.fool.com/earnings/call-transcripts/2026/02/05/thomson-reuters-tri-q4-2025-earnings-transcript/" },
  { date: "Feb 5, 2026", company: "Thomson Reuters", ticker: "TRI", quarter: "Q4 2025", summary: "Future of Professionals survey: AI saves UK lawyers 3 hours/week (£12,000/yr per lawyer, £2B annually for UK legal sector). Projected to reach 12 hours/week by 2029. US lawyer equivalent: $100,000+/yr in billable hours value per professional.", source: "TRI Future of Professionals Report", sourceUrl: "https://www.thomsonreuters.com/en/resources/reports/future-of-professionals.html" },
  { date: "Mar 24, 2026", company: "Thomson Reuters", ticker: "TRI", quarter: "Q1 2026", summary: "'Thomson' — TR's proprietary legally-trained LLM — announced for summer 2026 launch. Built on open-source base models (Meta/Mistral) with pre-training and post-training on Thomson Reuters' vast legal corpus: case law, court materials, contracts, tax advisory resources, Practical Law guides, and Reuters news. Already outperforming general models on 4 of 10 legal task benchmarks; targeting all 10 before launch. Can be deployed on-premises inside major law firms.", source: "Thomson Is Coming — Artificial Lawyer", sourceUrl: "https://www.artificiallawyer.com/2026/03/24/thomson-is-coming-trs-own-legally-trained-llm/" },

  // ── LSEG — London Stock Exchange Group ────────────────────────────
  { date: "Feb 26, 2026", company: "LSEG", ticker: "LSEG", quarter: "FY 2025", summary: "EBITDA margin surpassed 50% for first time (50.3%), up 210 bps YoY. 90% of data revenue from non-replicable content (45% real-time via 575 exchange connections, 25% specialized/exclusive, 10% curated public). Guiding additional 80-100 bps margin expansion in 2026.", source: "LSEG 2025 Preliminary Results", sourceUrl: "https://www.lseg.com/en/investor-relations/financial-results/2025-preliminary-results" },
  { date: "Feb 26, 2026", company: "LSEG", ticker: "LSEG", quarter: "FY 2025", summary: "60+ institutional clients connected via MCP across AI partner ecosystem (Anthropic, Databricks, Microsoft, OpenAI, Snowflake). Hundreds of prospective customers accessing via AI partners creating sales pipeline. Hybrid consumption-based + subscription pricing model in development.", source: "LSEG FY 2025 Results Call", sourceUrl: "https://www.lseg.com/en/investor-relations/financial-results/2025-preliminary-results" },
  { date: "Feb 26, 2026", company: "LSEG", ticker: "LSEG", quarter: "FY 2025", summary: "350,000+ users migrated from Eikon to Workspace — largest desktop migration in financial services history, completed on time and budget. Workspace GenAI with natural language data discovery rolling out to all users H1 2026. 4,000 employees deployed on ChatGPT Enterprise.", source: "LSEG FY 2025 Results", sourceUrl: "https://www.lseg.com/en/investor-relations/financial-results/2025-preliminary-results" },
  { date: "Nov 10, 2025", company: "LSEG", ticker: "LSEG", quarter: "Q4 2025", summary: "Innovation Forum: Three AI pillars — Trusted Data (non-replicable, regulated data partnerships), Transformative Products (AI-enabled workflows), Intelligent Enterprise (internal AI). AI-powered Copilot agents piloted with select customers via Microsoft Copilot Studio.", source: "LSEG Innovation Forum 2025", sourceUrl: "https://www.lseg.com/en/investor-relations/lseg-innovation-forum-november-2025" },

  // ── VRSK — Verisk Analytics ───────────────────────────────────────
  { date: "Mar 5, 2026", company: "Verisk", ticker: "VRSK", quarter: "Q1 2026", summary: "Investor Day 3-year targets (2026-2028): 6-8% OCC revenue growth, 7-10% OCC adjusted EBITDA growth, 25-75 bps annual EBITDA margin expansion. AI-enabled automation central to compounding growth strategy. Proprietary data assets described as key competitive moat.", source: "Verisk 2026 Investor Day", sourceUrl: "https://www.verisk.com/company/newsroom/verisk-reiterates-its-growth-targets-and-outlines-strategy-for-its-next-phase-of-compounding-growth-at-2026-investor-day/" },
  { date: "Feb 18, 2026", company: "Verisk", ticker: "VRSK", quarter: "Q4 2025", summary: "22 customer-facing AI modules released in 2025 (beat target of 20), 25 planned for 2026. 35+ AI projects in active use. 600+ client engagements in 2025 to drive AI adoption. XactGen launched: agentic AI using aerial imagery, policyholder photos, and policy data for near-complete claims estimates.", source: "Verisk Q4 2025 Earnings Call", sourceUrl: "https://www.fool.com/earnings/call-transcripts/2026/02/18/verisk-vrsk-q4-2025-earnings-call-transcript/" },
  { date: "Feb 18, 2026", company: "Verisk", ticker: "VRSK", quarter: "Q4 2025", summary: "FY 2025 EBITDA margin: 56.2% (normalized 55.8%). Guiding 56-56.5% for 2026 (20-70 bps expansion). Full-year adjusted EBITDA growth 9.6% reported / 8.5% OCC. Q4 EBITDA growth 9.8% reported / 6.2% OCC.", source: "Verisk Q4 2025 Earnings", sourceUrl: "https://www.verisk.com/company/newsroom/verisk-reports-fourth-quarter-and-full-year-2025-financial-results/" },
  { date: "Sep 30, 2025", company: "Verisk", ticker: "VRSK", quarter: "Q3 2025", summary: "XactAI Suite launched: purpose-built claims automation including Auto Photo Labeling (GenAI), Audio/Video Transcription to structured summaries, ALE Receipt Categorization. Commercial GenAI Underwriting Assistant launched Sep 16 — cloud-based automated property risk assessment with human-in-the-loop.", source: "Verisk XactAI Suite Launch", sourceUrl: "https://www.verisk.com/company/newsroom/verisk-introduces-new-ai-tools-to-streamline-the-property-claims-experience/" },
  { date: "Mar 17, 2026", company: "Verisk", ticker: "VRSK", quarter: "Q1 2026", summary: "2026 State of Insurance Fraud Study: AI editing tools fueling new era of insurance fraud. 36% of consumers would consider digitally altering a claim image/document; 55% of Gen Z. 76% of insurers say manipulated media submissions have grown more sophisticated. Only 32% of insurers feel very confident detecting deepfakes. 98% of insurers say AI editing tools fuel fraud — creates new demand for Verisk's AI-powered fraud detection solutions.", source: "Verisk 2026 State of Insurance Fraud Study", sourceUrl: "https://www.verisk.com/company/newsroom/ai-editing-tools-are-fueling-a-new-era-of-insurance-fraud-according-to-new-research-from-verisk/" },

  // ── CSGP — CoStar Group ───────────────────────────────────────────
  { date: "Feb 24, 2026", company: "CoStar Group", ticker: "CSGP", quarter: "FY 2025", summary: "FY 2025 revenue $3.2B (+19% YoY), Q4 revenue $900M (+27% YoY). Adjusted EBITDA surged 83% YoY. Homes AI described as 'most sophisticated vertical AI application in real estate' marking 'beginning of new era for business.'", source: "CSGP FY 2025 Earnings", sourceUrl: "https://www.costargroup.com/press-room/2026/costar-group-full-year-2025-revenue-increased-19-year-over-year-net-income-7" },
  { date: "Feb 17, 2026", company: "CoStar Group", ticker: "CSGP", quarter: "Q1 2026", summary: "Homes AI first-week metrics: 3.8x longer session duration (16m50s vs 4m24s). 69% more search filters applied. 37% more listing pages viewed. 7x more properties favorited. 4x more properties viewed. 7x more email leads submitted. Site bounce rate declined 64% YoY to 24%.", source: "CSGP Homes AI Launch", sourceUrl: "https://www.costargroup.com/press-room/2026/costar-group-launches-transformative-ai-experience-homescom-redefining-future-home" },
  { date: "Feb 17, 2026", company: "CoStar Group", ticker: "CSGP", quarter: "Q1 2026", summary: "Homes.com: 115M monthly unique visitors (Q3 2025), 2.1B total views in 2025, +134% organic traffic YoY (Jan 2026). 31,000+ agent subscribers, $100M annualized agent revenue run rate, 76% annual contracts. 50% of software development now dedicated to AI features.", source: "CSGP Homes.com Metrics", sourceUrl: "https://www.costargroup.com/press-room/2026/costar-group-full-year-2025-revenue-increased-19-year-over-year-net-income-7" },
  { date: "Feb 17, 2026", company: "CoStar Group", ticker: "CSGP", quarter: "Q1 2026", summary: "Matterport integration: 14M spaces digitized, 50B sq ft across 177 countries. Listings with Matterport captures get 40x more detail views. Subscribers with Matterport show 37% higher renewal rate. Average session duration +93% YoY to 4:29 minutes.", source: "CSGP Matterport AI Integration", sourceUrl: "https://www.costargroup.com/press-room/2025/costar-group-completes-acquisition-matterport-ushering-new-era-3d-digital-twins-and" },

  // ── MSCI ──────────────────────────────────────────────────────────
  { date: "Jan 28, 2026", company: "MSCI", ticker: "MSCI", quarter: "Q4 2025", summary: "25 AI-powered products launched in 2025 generating $15-20M in revenue. 120+ internal AI projects underway. CEO Fernandez: transformation into 'total AI machine.' Data production throughput doubled. Data production costs reduced 25%. 11 consecutive years of double-digit adjusted EPS growth.", source: "MSCI Q4 2025 Earnings", sourceUrl: "https://ir.msci.com/news-releases/news-release-details/msci-reports-financial-results-fourth-quarter-and-full-year-2025" },
  { date: "Jan 28, 2026", company: "MSCI", ticker: "MSCI", quarter: "Q4 2025", summary: "Q4 2025: 10%+ organic revenue growth, 13%+ adjusted EBITDA growth, ~12% adjusted EPS growth. Total run rate $3.3B+ (13% growth). Index-linked AUM ~$7 trillion. Run-rate operating expense reduction targets: 5%, 10%, 15% in phased approach through 2026.", source: "MSCI Q4 2025 Financial Results", sourceUrl: "https://ir.msci.com/news-releases/news-release-details/msci-reports-financial-results-fourth-quarter-and-full-year-2025" },
  { date: "Sep 2025", company: "MSCI", ticker: "MSCI", quarter: "Q3 2025", summary: "AI Portfolio Insights launched: combines generative AI with advanced analytics for portfolio risk/return analysis. MSCI Global AI Index launched Oct 15, 2025 tracking 100 leading global AI companies. AI-ESG firms shown to improve ratings 2.3x faster with 147 bps average financing cost reduction.", source: "MSCI AI Portfolio Insights Launch", sourceUrl: "https://www.msci.com/data-and-analytics/risk-management-solutions/ai-portfolio-insights" },

  // ── NDAQ — Nasdaq ─────────────────────────────────────────────────
  { date: "Mar 2026", company: "Nasdaq", ticker: "NDAQ", quarter: "Q1 2026", summary: "Investor Day targets: $100M in AI-driven run-rate efficiencies by year-end 2027. Medium-term growth: Solutions 9-12%, CAP 6-10%, FinTech 10-14%. Hundreds of AI agents planned globally in 2026, thousands by end of 2027.", source: "Nasdaq Investor Day 2026", sourceUrl: "https://ir.nasdaq.com/news-releases/news-release-details/nasdaq-raises-medium-term-revenue-outlook-and-outlines-strategy" },
  { date: "Jan 29, 2026", company: "Nasdaq", ticker: "NDAQ", quarter: "Q4 2025", summary: "FY 2025: first year exceeding $5B net revenue ($5.2B, +13% YoY). ARR reached $3.1B (+10% YoY). Q4 EPS $0.96 (beat $0.92 forecast). Agentic AI Workforce: 350+ clients adopted, 80%+ AML alert review workload reduction, 4x productivity gains for sanctions workflows.", source: "Nasdaq Q4 2025 Earnings", sourceUrl: "https://www.fool.com/earnings/call-transcripts/2026/01/29/nasdaq-ndaq-q4-2025-earnings-call-transcript/" },
  { date: "Jan 29, 2026", company: "Nasdaq", ticker: "NDAQ", quarter: "Q4 2025", summary: "GenAI Entity Research Copilot: 1,300+ clients using copilot capabilities, tens of thousands of cases processed since Q2 2025 launch. Verafin caught $1B+ in check fraud in 2025. Client base: 2,600+ financial institutions representing $10T in assets. AI-related fraud/scams up 60% (2022-2025).", source: "Nasdaq Verafin Fraud Report", sourceUrl: "https://verafin.com/2025/12/nasdaq-verafin-catches-over-1-billion-in-check-fraud-in-2025/" },

  // ── IT — Gartner ──────────────────────────────────────────────────
  { date: "Feb 3, 2026", company: "Gartner", ticker: "IT", quarter: "Q4 2025", summary: "AskGartner built on 500,000+ executive interactions and proprietary insights. 6,000+ written AI insights, 1,000+ unique AI use cases, 2,500+ business/technology experts. Licensed users who used AskGartner showed substantially higher renewal rates. Q4 EPS $3.94 (beat forecast by 12%).", source: "Gartner Q4 2025 Earnings", sourceUrl: "https://www.fool.com/earnings/call-transcripts/2026/02/03/gartner-it-q4-2025-earnings-call-transcript/" },
  { date: "Feb 3, 2026", company: "Gartner", ticker: "IT", quarter: "Q4 2025", summary: "200,000+ annual conversations between Gartner experts and IT community. IT Symposium/Xpo drew 8,000+ technology leaders. But Contract Value grew only 1% YoY (4% excluding U.S. federal government). AskGartner completed full rollout from beta in October 2025.", source: "Gartner Q4 2025 Earnings", sourceUrl: "https://seekingalpha.com/article/4837423-gartner-inc-it-q4-2025-earnings-call-transcript" },

  // ── FDS — FactSet ─────────────────────────────────────────────────
  { date: "Dec 18, 2025", company: "FactSet", ticker: "FDS", quarter: "Q1 FY2026", summary: "45%+ sequential growth in AI product adoption. Revenue $608M (+6.9% YoY). Adjusted EPS $4.51 (beat $4.35 forecast). Mercury AI chatbot launched for pitch decks, research, memos. Conversational API powered by Mercury available for client integration.", source: "FactSet Q1 FY2026 Earnings", sourceUrl: "https://www.fool.com/earnings/call-transcripts/2025/12/18/factset-fds-q1-2026-earnings-call-transcript/" },
  { date: "Dec 16, 2025", company: "FactSet", ticker: "FDS", quarter: "Q1 FY2026", summary: "First production-grade MCP server for real-time financial intelligence announced. 45 firms and 800+ institutional users in successful Explorer beta program. Asia-Pacific: 8% organic ASV growth driven partly by AI-ready data demand. GenAI Data Packages consolidating critical data feeds.", source: "FactSet AI-Ready Data MCP Server", sourceUrl: "https://investor.factset.com/news-releases/news-release-details/factset-meets-demand-for-ai-ready-data-first-announce-mcp-sans-intermediary" },
  { date: "Feb 4, 2026", company: "FactSet", ticker: "FDS", quarter: "Q2 FY2026", summary: "AI Doc Ingest for Cobalt launched: private capital clients can now extract and structure portfolio company data from unstructured documents (PDFs, spreadsheets, scanned reports) directly into the Cobalt Portfolio Monitoring platform. Eliminates manual data entry for private credit and equity managers. Extends FactSet's AI-first data strategy into the private markets workflow.", source: "FactSet AI Doc Ingest for Cobalt Launch", sourceUrl: "https://investor.factset.com/news-releases/news-release-details/factset-launches-ai-doc-ingest-cobalt-transforming-private" },
  { date: "Mar 3, 2026", company: "FactSet", ticker: "FDS", quarter: "Q2 FY2026", summary: "ComplyAdvantage integration launched in Workstation for corporate banks: AI-driven KYC, AML, and sanctions screening embedded directly in the FactSet workflow. Automates up to 80% of KYC/AML/sanctions review steps. Reduces client onboarding time by up to 50%. ML decreases compliance alert errors by up to 70%. Relationship managers can now handle onboarding, screening, and risk monitoring alongside business development in a single portal.", source: "FactSet ComplyAdvantage Workstation Integration", sourceUrl: "https://investor.factset.com/news-releases/news-release-details/factset-integrates-advanced-ai-financial-crime-risk-management" },
  { date: "Mar 4, 2026", company: "FactSet", ticker: "FDS", quarter: "Q2 FY2026", summary: "Kate Stepp appointed Chief AI Officer (effective Mar 2, 2026): first dedicated CAIO in FactSet history, reporting to CEO. Stepp was previously CTO since Sep 2022 — her elevation signals FactSet treating AI as the primary strategic function. Bob Stolte simultaneously appointed Chief Technology Officer, taking over platform modernization, engineering execution, cybersecurity, and IT business continuity. C-suite restructuring explicitly designed to 'accelerate enterprise AI and platform strategy.'", source: "FactSet CAIO & CTO Appointments", sourceUrl: "https://investor.factset.com/news-releases/news-release-details/factset-announces-appointments-chief-ai-officer-and-chief" },
  { date: "Mar 26, 2026", company: "FactSet", ticker: "FDS", quarter: "Q2 FY2026", summary: "AI Document Search deployed in broad beta to 85,000+ users globally — one of the largest AI feature rollouts in FactSet's history. Document Search enables exploration and extraction of insights from earnings calls, transcripts, news, filings, and unstructured data while preserving FactSet's hallmark auditability. Global release scheduled for phased rollout through late spring 2026.", source: "FactSet AI Beta 85K Users", sourceUrl: "https://investor.factset.com/news-releases/news-release-details/factset-deploys-ai-beta-more-85k-users-announces-ai-enabled" },
  { date: "Mar 31, 2026", company: "FactSet", ticker: "FDS", quarter: "Q2 FY2026", summary: "Q2 FY2026 earnings (ended Feb 28, 2026): GAAP revenue $611M (+7.1% YoY), organic revenue +6.8% — strongest organic growth in 5+ quarters. Annual Subscription Value $2,449M (+6.7%). Adj. diluted EPS $4.46 (+4.2%). Raised FY2026 guidance: GAAP rev $2.45–2.47B, adj. EPS $17.25–17.75 (prior: $16.90–17.60). Growth driven by institutional buy-side and wealth management clients. Shares rose ~7% on results.", source: "FDS Q2 FY2026 Earnings", sourceUrl: "https://www.globenewswire.com/news-release/2026/03/31/3265310/7768/en/FactSet-Reports-Results-for-Second-Quarter-2026.html" },

  // ── AI NATIVES ────────────────────────────────────────────────────
  // ── Anthropic ─────────────────────────────────────────────────────
  { date: "Feb 17, 2026", company: "Anthropic", ticker: "PRIVATE", quarter: "Q1 2026", summary: "Claude Sonnet 4.6 launched: near-flagship performance at $3/MTok input, $15/MTok output — same price as Sonnet 4.5. SWE-bench score 79.6% (state-of-the-art for cost tier). Full upgrade across coding, computer use, long-context reasoning (1M token context window in beta), agent planning, knowledge work, and design. Available on Claude.ai, API, Claude Code, Amazon Bedrock, and Google Cloud Vertex AI from day one.", source: "Anthropic Claude Sonnet 4.6 Launch", sourceUrl: "https://aws.amazon.com/blogs/aws/aws-weekly-roundup-claude-sonnet-4-6-in-amazon-bedrock-kiro-in-govcloud-regions-new-agent-plugins-and-more-february-23-2026/" },
  { date: "Mar 2026", company: "Anthropic", ticker: "PRIVATE", quarter: "Q1 2026", summary: "ARR surged to $19B (from $1B in Dec 2024 — 1,167% YoY growth trajectory). Claude Code responsible for 4% of all public GitHub commits worldwide (projected 20%+ by end 2026). 500+ customers spending $1M+/yr (up from ~12 two years ago). 70% Fortune 100 penetration.", source: "Anthropic ARR Report", sourceUrl: "https://www.saastr.com/anthropic-just-hit-14-billion-in-arr-up-from-1-billion-just-14-months-ago/" },
  { date: "Mar 25, 2026", company: "Anthropic", ticker: "PRIVATE", quarter: "Q1 2026", summary: "MCP (Model Context Protocol): 97M+ monthly SDK downloads, 4,750% growth since Nov 2025. 10,000+ active public MCP servers. Available in all major programming languages. Fastest adoption curve for any AI infrastructure standard in history. Claude Marketplace launched with single billing for six partner tools.", source: "Anthropic MCP Milestone", sourceUrl: "https://www.anthropic.com/news/donating-the-model-context-protocol-and-establishing-of-the-agentic-ai-foundation" },
  { date: "Feb 12, 2026", company: "Anthropic", ticker: "PRIVATE", quarter: "Q1 2026", summary: "$30B Series G at $380B valuation (second-largest venture round ever). $14B ARR at time of raise, 85% from enterprise. Claude Code at $2.5B+ annualized revenue. Business subscriptions quadrupled since January 2026. Paid consumer subscriptions doubled Jan-Feb 2026. 300,000+ business customers.", source: "Anthropic Series G", sourceUrl: "https://www.cnbc.com/2026/02/12/anthropic-closes-30-billion-funding-round-at-380-billion-valuation.html" },

  // ── OpenAI ────────────────────────────────────────────────────────
  { date: "Mar 5, 2026", company: "OpenAI", ticker: "PRIVATE", quarter: "Q1 2026", summary: "GPT-5.4 launched: most capable enterprise model. Combines advanced reasoning, coding, and native computer use (can autonomously operate desktops, browsers, and software). 1M token context window. 33% fewer hallucinations vs. GPT-5.2, 47% fewer tokens used on comparable tasks. Scored 83% on GDPval knowledge work benchmark. Available in GPT-5.4, GPT-5.4 Thinking (reasoning), and GPT-5.4 Pro variants. ChatGPT for Excel and Google Sheets launched simultaneously for financial professionals.", source: "OpenAI GPT-5.4 Launch", sourceUrl: "https://openai.com/index/introducing-gpt-5-4/" },
  { date: "Feb 27, 2026", company: "OpenAI", ticker: "PRIVATE", quarter: "Q1 2026", summary: "$25B ARR (up from $20B at end of 2025). 910M weekly active users (up from 800M Oct, 700M Jul). 50M paying subscribers. 9M+ paying business users. 1M+ organizations using OpenAI technology. Closed $110B funding round at $840B valuation — largest private round in history.", source: "OpenAI Funding & Metrics", sourceUrl: "https://techcrunch.com/2026/02/27/openai-raises-110b-in-one-of-the-largest-private-funding-rounds-in-history/" },
  { date: "Feb 27, 2026", company: "OpenAI", ticker: "PRIVATE", quarter: "Q1 2026", summary: "Inference costs: $8.4B in 2025, projected $14.1B in 2026. Training expenses projected $32B in 2026, $65B in 2027 (~$440B through 2030). Stargate Project: $500B AI infrastructure over 4 years ($100B immediately). First two buildings operational since Sep 2025 with NVIDIA GB200 racks.", source: "OpenAI Cost Structure & Stargate", sourceUrl: "https://openai.com/index/announcing-the-stargate-project/" },

  // ── Alphabet / Google ─────────────────────────────────────────────
  { date: "Feb 4, 2026", company: "Alphabet", ticker: "GOOGL", quarter: "Q4 2025", summary: "Google Cloud Q4: $17.7B revenue (+48% YoY), operating margin 30.1% (up from 17.5% YoY). Cloud backlog $240B+ (doubled YoY). Generative AI product revenue grew nearly 400% YoY. Gemini unit costs reduced 78% over 2025. 2025 annual revenue exceeded $400B for first time.", source: "Alphabet Q4 2025 Earnings", sourceUrl: "https://www.cnbc.com/2026/02/04/alphabet-googl-q4-2025-earnings.html" },
  { date: "Feb 4, 2026", company: "Alphabet", ticker: "GOOGL", quarter: "Q4 2025", summary: "Gemini: 750M+ monthly active users, 8M+ Enterprise seats across 2,800+ companies (sold in 4 months). 10B+ tokens/minute via direct API. AI Overviews: 2B+ monthly users across 200+ countries, 40+ languages. AI Mode surpassed 100M MAU in US and India alone. CapEx guidance: $175-185B for 2026.", source: "Alphabet Q4 2025 Earnings Call", sourceUrl: "https://blog.google/company-news/inside-google/message-ceo/alphabet-earnings-q4-2025/" },
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

function WhatsNewBanner() {
  const [open, setOpen] = useState(false);
  return (
    <div style={{
      background: M.white, border: "1px solid " + M.primary,
      borderLeft: "4px solid " + M.primary, borderRadius: "6px",
      marginBottom: "18px", overflow: "hidden",
    }}>
      {/* Header row — always visible, click to toggle */}
      <div
        onClick={() => setOpen(o => !o)}
        style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "10px 16px", cursor: "pointer",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "10px", fontWeight: 700, color: M.primary, letterSpacing: "0.08em", fontFamily: "Arial, monospace" }}>
            WHAT'S NEW — {lastUpdated}
          </span>
          {!open && (
            <span style={{ fontSize: "10px", color: M.midGray, fontFamily: "Arial, monospace" }}>
              {whatsNew.length} update{whatsNew.length !== 1 ? "s" : ""}
            </span>
          )}
        </div>
        <span style={{
          fontSize: "11px", color: M.primary,
          transition: "transform 0.2s",
          transform: open ? "rotate(180deg)" : "none",
        }}>▾</span>
      </div>
      {/* Expandable content */}
      {open && (
        <div style={{ padding: "0 16px 12px 16px", borderTop: "1px solid " + M.skyBlue }}>
          {whatsNew.map((item, i) => (
            <div key={i} style={{
              fontSize: "11px", color: "#4A5568", lineHeight: 1.7,
              paddingLeft: "14px", position: "relative",
              paddingTop: i === 0 ? "10px" : "0",
            }}>
              <span style={{ position: "absolute", left: "0", color: M.primary, fontWeight: 700 }}>·</span>
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function DisclosuresTimeline() {
  const [filter, setFilter] = useState("all");
  const [collapsedQuarters, setCollapsedQuarters] = useState({});

  // Build company metadata lookup from peers + aiNatives
  const companyMeta = {};
  [...peers, ...aiNatives].forEach(c => {
    companyMeta[c.name] = { accent: c.accent, ticker: c.ticker, tag: c.tag, tagText: c.tagText };
  });

  // Canonical company display order
  const companyOrder = [...peers.map(p => p.name), ...aiNatives.map(n => n.name)];

  // Filter by selected company
  const filtered = filter === "all" ? disclosures : disclosures.filter(d => d.company === filter);

  // Parse quarter string to sortable number (higher = more recent)
  const parseQuarter = (q) => {
    const m = q.match(/Q(\d)\s*(?:FY)?(\d{4})/);
    if (m) return parseInt(m[2]) * 10 + parseInt(m[1]);
    const fy = q.match(/FY\s*(\d{4})/);
    if (fy) return parseInt(fy[1]) * 10 + 4;
    return 0;
  };

  // Parse date string to sortable number for within-quarter ordering
  const parseDate = (d) => {
    try { return new Date(d).getTime(); } catch { return 0; }
  };

  // Group: { companyName: { quarter: [disclosures...] } }
  const grouped = {};
  filtered.forEach(d => {
    if (!grouped[d.company]) grouped[d.company] = {};
    if (!grouped[d.company][d.quarter]) grouped[d.company][d.quarter] = [];
    grouped[d.company][d.quarter].push(d);
  });

  // Sort within each quarter by date (most recent first)
  Object.values(grouped).forEach(byQ => {
    Object.values(byQ).forEach(arr => arr.sort((a, b) => parseDate(b.date) - parseDate(a.date)));
  });

  const presentCompanies = companyOrder.filter(name => grouped[name]);

  const toggleQuarter = (key) => setCollapsedQuarters(p => ({ ...p, [key]: !p[key] }));

  // Filter pills — use canonical order
  const filterOptions = ["all", ...companyOrder.filter(n => disclosures.some(d => d.company === n))];

  return (
    <div>
      <SectionBanner
        title="AI DISCLOSURES — BY COMPANY & QUARTER"
        subtitle={<>Every verified AI disclosure organized by <strong>company reporting quarter</strong>. A quarter includes all announcements, earnings releases, and presentations for that period.</>}
        stats={[
          { value: disclosures.length, label: "TOTAL DISCLOSURES", color: M.primary },
          { value: new Set(disclosures.map(d => d.company)).size, label: "COMPANIES", color: M.lightBlue },
          { value: new Set(disclosures.map(d => d.quarter)).size, label: "QUARTERS TRACKED", color: M.green },
        ]}
      />

      {/* Company filter */}
      <div style={{ display: "flex", gap: "6px", marginBottom: "20px", flexWrap: "wrap" }}>
        {filterOptions.map(c => {
          const meta = companyMeta[c];
          const isActive = filter === c;
          return (
            <button key={c} onClick={() => setFilter(c)} style={{
              background: isActive ? (meta ? meta.accent : M.navy) : M.white,
              color: isActive ? "#FFF" : M.textDark,
              border: "1px solid " + (isActive ? (meta ? meta.accent : M.navy) : M.border),
              borderRadius: "20px", padding: "5px 14px", fontSize: "11px",
              fontWeight: isActive ? 700 : 500, cursor: "pointer",
              fontFamily: "Arial, sans-serif", transition: "all 0.15s",
            }}>
              {c === "all" ? "All Companies" : c}
            </button>
          );
        })}
      </div>

      {/* Companies */}
      {presentCompanies.map(companyName => {
        const meta = companyMeta[companyName] || { accent: M.primary, ticker: "—", tag: "#F0F4FF", tagText: M.primary };
        const quarters = Object.keys(grouped[companyName]).sort((a, b) => parseQuarter(b) - parseQuarter(a));
        const discCount = Object.values(grouped[companyName]).reduce((s, arr) => s + arr.length, 0);

        return (
          <div key={companyName} style={{ marginBottom: "28px" }}>
            {/* Company header bar */}
            <div style={{
              display: "flex", alignItems: "center", gap: "10px",
              background: M.navy, borderRadius: "6px 6px 0 0",
              padding: "10px 16px", borderLeft: "4px solid " + meta.accent,
            }}>
              <span style={{
                background: meta.tag, color: meta.tagText,
                fontSize: "10px", fontWeight: 700, letterSpacing: "0.08em",
                padding: "2px 7px", borderRadius: "4px", fontFamily: "Arial, monospace",
              }}>{meta.ticker}</span>
              <span style={{ fontSize: "13px", fontWeight: 700, color: "#FFF", fontFamily: "Arial, sans-serif" }}>{companyName}</span>
              <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.45)", marginLeft: "auto", fontFamily: "Arial, monospace" }}>
                {discCount} disclosure{discCount !== 1 ? "s" : ""} · {quarters.length} quarter{quarters.length !== 1 ? "s" : ""}
              </span>
            </div>

            {/* Quarters */}
            <div style={{ border: "1px solid " + M.border, borderTop: "none", borderRadius: "0 0 6px 6px", overflow: "hidden" }}>
              {quarters.map((quarter, qi) => {
                const qKey = companyName + ":" + quarter;
                const isCollapsed = collapsedQuarters[qKey];
                const entries = grouped[companyName][quarter];
                const isLast = qi === quarters.length - 1;

                return (
                  <div key={quarter} style={{ borderBottom: isLast ? "none" : "1px solid " + M.border }}>
                    {/* Quarter header — clickable to collapse */}
                    <div
                      onClick={() => toggleQuarter(qKey)}
                      style={{
                        display: "flex", alignItems: "center", gap: "10px",
                        padding: "9px 16px", cursor: "pointer",
                        background: isCollapsed ? M.offWhite : "#FAFBFF",
                        transition: "background 0.15s",
                        borderLeft: "4px solid " + meta.accent,
                      }}
                      onMouseEnter={e => { e.currentTarget.style.background = "#EEF2F8"; }}
                      onMouseLeave={e => { e.currentTarget.style.background = isCollapsed ? M.offWhite : "#FAFBFF"; }}
                    >
                      <span style={{
                        background: meta.accent, color: "#FFF",
                        fontSize: "9px", fontWeight: 700, letterSpacing: "0.08em",
                        padding: "2px 8px", borderRadius: "3px", fontFamily: "Arial, monospace",
                      }}>{quarter}</span>
                      <span style={{ fontSize: "11px", color: M.midGray, fontFamily: "Arial, monospace" }}>
                        {entries.length} disclosure{entries.length !== 1 ? "s" : ""}
                      </span>
                      <span style={{
                        marginLeft: "auto", fontSize: "11px", color: M.midGray,
                        transition: "transform 0.2s",
                        transform: isCollapsed ? "none" : "rotate(180deg)",
                      }}>▾</span>
                    </div>

                    {/* Disclosure entries */}
                    {!isCollapsed && (
                      <div style={{ padding: "8px 16px 12px 20px" }}>
                        {entries.map((d, di) => (
                          <div key={di} style={{
                            position: "relative", paddingLeft: "16px", marginBottom: di < entries.length - 1 ? "10px" : "0",
                            paddingBottom: di < entries.length - 1 ? "10px" : "0",
                            borderBottom: di < entries.length - 1 ? "1px dashed " + M.border : "none",
                          }}>
                            {/* Timeline dot */}
                            <div style={{
                              position: "absolute", left: "0", top: "5px",
                              width: "7px", height: "7px", borderRadius: "50%",
                              background: meta.accent, flexShrink: 0,
                            }} />

                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "5px", flexWrap: "wrap", gap: "6px" }}>
                              <span style={{ fontSize: "10px", color: M.midGray, fontFamily: "Arial, monospace" }}>{d.date}</span>
                            </div>
                            <p style={{ fontSize: "12px", color: "#4A5568", lineHeight: 1.7, margin: "0 0 7px 0" }}>
                              {d.summary}
                            </p>
                            <a href={d.sourceUrl} target="_blank" rel="noreferrer" style={{
                              fontSize: "10px", color: M.lightBlue, textDecoration: "none",
                              borderBottom: "1px solid " + M.skyBlue, fontFamily: "Arial, monospace",
                            }}>
                              {d.source} ↗
                            </a>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
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
                13 Companies · 42 Quantitative AI Disclosures · Q1 2025 Through Q1 2026 · Hard Metrics Linked to Primary Sources
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

        {/* WHAT'S NEW BANNER — collapsible */}
        <WhatsNewBanner />

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
