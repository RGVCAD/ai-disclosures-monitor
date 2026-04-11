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

import { lastUpdated, whatsNew, peers, aiBig4, otherFirms, financials, disclosures, cycleWindow, cycleThemes, cycleCompanySummaries, otherFirmsWhatsNew, otherFirmsCycleThemes, otherFirmsCycleSummaries, differentiationMap, standardsAdoption } from "./data.js";

const statusConfig = {
  leader:      { bg: "#EDFAF3", text: "#1A7A4A", border: "#A8DFC0", dot: "#1A7A4A" },
  laggard:     { bg: "#FEF3E0", text: "#A56500", border: "#F5D8A8", dot: "#C97B00" },
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
      {/* Left accent border — status-driven (green leader / amber laggard / gray other) */}
      <div style={{ display: "flex" }}>
        <div style={{ width: "4px", background: statusConfig[company.status]?.dot || M.border, flexShrink: 0 }} />

        <div style={{ flex: 1, padding: "16px 16px 14px" }}>
          {/* Top row */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "5px", flexWrap: "wrap" }}>
                <span style={{
                  background: M.offWhite, color: M.textDark,
                  border: "1px solid " + M.border,
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
              <div style={{ fontSize: "22px", fontWeight: 800, color: M.textDark, fontFamily: "Arial, monospace", lineHeight: 1 }}>{company.metric}</div>
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
                borderLeft: `3px solid ${M.border}`,
                paddingLeft: "12px", marginBottom: "12px",
                background: M.offWhite, borderRadius: "0 6px 6px 0", padding: "10px 12px 10px 14px",
              }}>
                <div style={{ fontSize: "12px", color: M.textDark, fontStyle: "italic", lineHeight: 1.6, marginBottom: "5px" }}>"{company.quote}"</div>
                <div style={{ fontSize: "10px", color: M.midGray }}>— {company.speaker}</div>
              </div>

              {/* vs. MCO */}
              {company.mcoComparison && company.ticker !== "MCO" && (
                <div style={{
                  background: "#F0F4FF", border: "1px solid #A8BCE8",
                  borderRadius: "6px", padding: "10px 12px", marginBottom: "12px",
                }}>
                  <div style={{ fontSize: "9px", color: M.primary, letterSpacing: "0.12em", fontWeight: 700, marginBottom: "4px", fontFamily: "Arial, monospace" }}>VS. MCO</div>
                  <div style={{ fontSize: "11px", color: M.textDark, lineHeight: 1.65 }}>{company.mcoComparison}</div>
                </div>
              )}

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
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "10px" }}>
      {themes.map((t, i) => (
        <div key={t.title}
          onClick={() => toggleTheme(i)}
          style={{
            background: M.white,
            border: "1px solid " + M.border,
            borderTop: "3px solid " + M.green,
            borderRadius: "6px", padding: "12px 14px",
            cursor: "pointer",
            transition: "background 0.2s",
          }}
          onMouseEnter={e => { e.currentTarget.style.background = M.surface; }}
          onMouseLeave={e => { e.currentTarget.style.background = M.white; }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", minWidth: 0 }}>
            <div title={t.title} style={{ fontSize: "11px", fontWeight: 700, color: M.textDark, fontFamily: "Arial, sans-serif", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", minWidth: 0, flex: 1 }}>{t.title}</div>
            <span style={{ fontSize: "10px", color: M.midGray, transition: "transform 0.2s", transform: expandedThemes[i] ? "rotate(180deg)" : "none", flexShrink: 0, marginLeft: "8px" }}>▾</span>
          </div>
          {expandedThemes[i] && (
            <div style={{ fontSize: "11px", color: "#4A5568", lineHeight: 1.7, marginTop: "10px", paddingTop: "10px", borderTop: "1px solid " + M.border }}>{t.text}</div>
          )}
        </div>
      ))}
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
    { key: "source", label: "Source", w: "auto" },
  ];

  return (
    <div style={{ background: M.white, border: "1px solid " + M.border, borderRadius: "8px", overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "11px", fontFamily: "Arial, sans-serif", whiteSpace: "nowrap" }}>
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

  // Build company metadata lookup keyed by DISCLOSURE company name (matched by ticker).
  // Peers use full names ("Moody's Corporation", "Verisk Analytics", "MSCI Inc.", etc.)
  // but disclosures use short names ("Moody's", "Verisk", "MSCI", "Nasdaq", "Alphabet").
  // Matching on ticker avoids any name-mismatch silently dropping a company.
  const companyMeta = {};
  const companyOrder = [];
  [...peers, ...aiBig4, ...otherFirms].forEach(c => {
    // For unique tickers, match by ticker alone. For shared tickers (e.g. both
    // Anthropic and OpenAI use "PRIVATE"), also require the first word of the
    // peer name to appear in the disclosure company name so they don't collide.
    const firstWord = c.name.toLowerCase().split(/[\s/]/)[0];
    const disclosureName =
      (disclosures.find(d => d.ticker === c.ticker && d.company.toLowerCase().includes(firstWord))
       ?? disclosures.find(d => d.ticker === c.ticker))?.company ?? c.name;
    if (!companyMeta[disclosureName]) {
      // Neutralized — all companies now use the same subtle gray/navy palette.
      // Color only surfaces for Leaders/Laggards badges and MCO status callouts.
      companyMeta[disclosureName] = {
        accent: M.midGray,
        ticker: c.ticker,
        tag: M.offWhite,
        tagText: M.textDark,
      };
      companyOrder.push(disclosureName);
    }
  });

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
          { value: filtered.length, label: filter === "all" ? "TOTAL DISCLOSURES" : "DISCLOSURES", color: M.primary },
          { value: filter === "all" ? new Set(disclosures.map(d => d.company)).size : 1, label: "COMPANIES", color: M.lightBlue },
          { value: new Set(filtered.map(d => d.quarter)).size, label: "QUARTERS TRACKED", color: M.green },
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
        const meta = companyMeta[companyName] || { accent: M.midGray, ticker: "—", tag: M.offWhite, tagText: M.textDark };
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

// ─── STATUS STYLING HELPERS ─────────────────────────────────────────────────
// All Leading/Active/Early/Gap pills render neutral gray — only the MCO callout
// uses Moody's blue. Same treatment applied to the Emerging Standards pills below.
const diffStatusStyles = {
  leading:  { bg: M.offWhite, text: "#4A5568", border: M.border, label: "LEADING" },
  active:   { bg: M.offWhite, text: "#4A5568", border: M.border, label: "ACTIVE" },
  early:    { bg: M.offWhite, text: "#4A5568", border: M.border, label: "EARLY" },
  gap:      { bg: M.offWhite, text: "#4A5568", border: M.border, label: "GAP" },
};
const stdStatusStyles = {
  adopted:  { bg: M.offWhite, text: "#4A5568", border: M.border, label: "ADOPTED" },
  piloting: { bg: M.offWhite, text: "#4A5568", border: M.border, label: "PILOTING" },
  planned:  { bg: M.offWhite, text: "#4A5568", border: M.border, label: "PLANNED" },
  none:     { bg: M.offWhite, text: "#4A5568", border: M.border, label: "NOT STARTED" },
};
// Moody's-blue pill reused by both scorecards for the "MCO:" callout.
const mcoPillStyle = { bg: "#F0F4FF", text: M.primary, border: "#A8BCE8" };

function StatusPill({ status, styles }) {
  const s = styles[status] || styles.gap || styles.none;
  return (
    <span style={{
      display: "inline-block", fontSize: "8px", fontWeight: 700, letterSpacing: "0.08em",
      padding: "2px 6px", borderRadius: "3px", fontFamily: "Arial, monospace",
      background: s.bg, color: s.text, border: "1px solid " + s.border,
    }}>{s.label}</span>
  );
}

// ─── COLLAPSIBLE SECTION WRAPPER ────────────────────────────────────────────
function CollapsibleSection({ title, subtitle, description, defaultOpen = true, accentColor, children }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{
      marginBottom: "16px", borderRadius: "8px", overflow: "hidden",
      border: "1px solid " + M.border,
    }}>
      <div
        onClick={() => setOpen(o => !o)}
        style={{
          cursor: "pointer",
          background: accentColor || M.navy,
          transition: "background 0.15s",
        }}
      >
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "12px 18px 10px",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontSize: "12px", fontWeight: 700, color: "#FFF", letterSpacing: "0.06em", fontFamily: "Arial, sans-serif" }}>
              {title}
            </span>
            {subtitle && (
              <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.55)", fontFamily: "Arial, monospace" }}>
                {subtitle}
              </span>
            )}
          </div>
          <span style={{
            fontSize: "12px", color: "rgba(255,255,255,0.7)",
            transition: "transform 0.2s",
            transform: open ? "rotate(180deg)" : "none",
          }}>▾</span>
        </div>
        {description && (
          <div style={{
            fontSize: "11px", color: "rgba(255,255,255,0.78)",
            lineHeight: 1.55, padding: "0 18px 12px",
            fontFamily: "Arial, sans-serif",
          }}>
            {description}
          </div>
        )}
      </div>
      {open && (
        <div style={{ padding: "16px 18px", background: M.offWhite }}>
          {children}
        </div>
      )}
    </div>
  );
}

// ─── WHAT'S NEW THIS CYCLE ──────────────────────────────────────────────────
function CycleBriefing({ themes = cycleThemes, summaries = cycleCompanySummaries, lookupPool = peers }) {
  const [viewMode, setViewMode] = useState("themes"); // "themes" | "companies"
  const [expandedTheme, setExpandedTheme] = useState(null);

  return (
    <div>
      {/* View toggle */}
      <div style={{ display: "flex", gap: "4px", marginBottom: "14px" }}>
        {[
          { id: "themes", label: "By Theme" },
          { id: "companies", label: "By Company" },
        ].map(v => (
          <button key={v.id} onClick={() => setViewMode(v.id)} style={{
            background: viewMode === v.id ? M.primary : M.white,
            color: viewMode === v.id ? "#FFF" : M.textDark,
            border: "1px solid " + (viewMode === v.id ? M.primary : M.border),
            borderRadius: "4px", padding: "5px 14px", fontSize: "10px", fontWeight: 600,
            cursor: "pointer", fontFamily: "Arial, sans-serif",
            transition: "all 0.15s",
          }}>{v.label}</button>
        ))}
      </div>

      {/* Theme View */}
      {viewMode === "themes" && (
        <div>
          {themes.map((t, i) => (
            <div key={t.theme} style={{
              marginBottom: i < themes.length - 1 ? "10px" : 0,
              border: "1px solid " + M.border, borderRadius: "6px",
              overflow: "hidden",
            }}>
              <div
                onClick={() => setExpandedTheme(expandedTheme === i ? null : i)}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "10px 14px", cursor: "pointer",
                  background: expandedTheme === i ? M.offWhite : M.white,
                  transition: "background 0.15s",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = M.offWhite; }}
                onMouseLeave={e => { if (expandedTheme !== i) e.currentTarget.style.background = M.white; }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{ fontSize: "12px", fontWeight: 700, color: M.textDark }}>{t.theme}</span>
                  <span style={{ fontSize: "10px", color: M.midGray, fontFamily: "Arial, monospace" }}>
                    {t.highlights.length} compan{t.highlights.length === 1 ? "y" : "ies"}
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  {/* Show ticker pills in collapsed state */}
                  {expandedTheme !== i && t.highlights.slice(0, 5).map(h => (
                    <span key={h.ticker} style={{
                      fontSize: "9px", fontWeight: 700, color: M.primary,
                      background: "#F0F4FF", padding: "1px 5px", borderRadius: "3px",
                      fontFamily: "Arial, monospace",
                    }}>{h.ticker}</span>
                  ))}
                  <span style={{
                    fontSize: "11px", color: M.midGray,
                    transition: "transform 0.2s",
                    transform: expandedTheme === i ? "rotate(180deg)" : "none",
                    marginLeft: "4px",
                  }}>▾</span>
                </div>
              </div>
              {expandedTheme === i && (
                <div style={{ padding: "0 14px 12px 26px" }}>
                  {t.highlights.map((h, hi) => (
                    <div key={h.ticker} style={{
                      display: "flex", gap: "10px", alignItems: "flex-start",
                      paddingTop: "10px",
                      borderTop: hi > 0 ? "1px dashed " + M.border : "none",
                      marginTop: hi > 0 ? "8px" : 0,
                    }}>
                      <span style={{
                        fontSize: "9px", fontWeight: 700, color: M.primary,
                        background: "#F0F4FF", padding: "2px 6px", borderRadius: "3px",
                        fontFamily: "Arial, monospace", flexShrink: 0, marginTop: "2px",
                      }}>{h.ticker}</span>
                      <span style={{ fontSize: "11px", color: "#4A5568", lineHeight: 1.65 }}>{h.text}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Company View */}
      {viewMode === "companies" && (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "10px" }}>
            {summaries.map(c => {
              const peerData = lookupPool.find(p => p.ticker === c.ticker);
              return (
                <div key={c.ticker} style={{
                  border: "1px solid " + M.border, borderRadius: "6px",
                  padding: "10px 14px",
                  background: M.white,
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                    <span style={{
                      fontSize: "10px", fontWeight: 700, color: M.textDark,
                      background: M.offWhite, border: "1px solid " + M.border,
                      padding: "2px 7px", borderRadius: "4px", fontFamily: "Arial, monospace",
                    }}>{c.ticker}</span>
                    <span style={{ fontSize: "12px", fontWeight: 600, color: M.textDark }}>{peerData ? peerData.name : c.ticker}</span>
                  </div>
                  <p style={{ fontSize: "11px", color: "#4A5568", lineHeight: 1.65, margin: 0 }}>{c.summary}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── ENHANCED DIFFERENTIATION OPPORTUNITIES ─────────────────────────────────
function DifferentiationScorecard() {
  const [expanded, setExpanded] = useState(null);

  return (
    <div>
        {differentiationMap.map((item, i) => {
          const isExpanded = expanded === i;
          const leaders = item.peers.filter(p => p.status === "leading").length;
          const gaps = item.peers.filter(p => p.status === "gap").length;
          const mcoStyle = diffStatusStyles[item.mcoPosition];

          return (
            <div key={item.title} style={{
              marginBottom: "12px", paddingBottom: "12px",
              borderBottom: i < differentiationMap.length - 1 ? "1px solid " + M.border : "none",
            }}>
              <div
                onClick={() => setExpanded(isExpanded ? null : i)}
                style={{ cursor: "pointer" }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                  <div style={{ fontSize: "12px", fontWeight: 700, color: M.textDark, flex: 1 }}>{item.title}</div>
                  <span style={{
                    fontSize: "9px", fontWeight: 700, color: mcoPillStyle.text,
                    background: mcoPillStyle.bg, border: "1px solid " + mcoPillStyle.border,
                    padding: "2px 7px", borderRadius: "3px", fontFamily: "Arial, monospace",
                  }}>MCO: {mcoStyle.label}</span>
                  <span style={{
                    fontSize: "11px", color: M.midGray,
                    transition: "transform 0.2s",
                    transform: isExpanded ? "rotate(180deg)" : "none",
                  }}>▾</span>
                </div>
                <div style={{ fontSize: "11px", color: "#4A5568", lineHeight: 1.65 }}>{item.desc}</div>
                {/* Summary counts — all neutral gray */}
                <div style={{ display: "flex", gap: "12px", marginTop: "6px" }}>
                  <span style={{ fontSize: "10px", color: M.midGray, fontFamily: "Arial, monospace" }}>{leaders} leading</span>
                  <span style={{ fontSize: "10px", color: M.midGray, fontFamily: "Arial, monospace" }}>{item.peers.filter(p => p.status === "active").length} active</span>
                  <span style={{ fontSize: "10px", color: M.midGray, fontFamily: "Arial, monospace" }}>{item.peers.filter(p => p.status === "early").length} early</span>
                  <span style={{ fontSize: "10px", color: M.midGray, fontFamily: "Arial, monospace" }}>{gaps} gap</span>
                </div>
              </div>

              {isExpanded && (
                <div style={{ marginTop: "10px" }}>
                  {/* MCO Position callout — always Moody's blue */}
                  <div style={{
                    background: mcoPillStyle.bg, border: "1px solid " + mcoPillStyle.border,
                    borderRadius: "6px", padding: "10px 12px", marginBottom: "12px",
                    borderLeft: "3px solid " + mcoPillStyle.text,
                  }}>
                    <div style={{ fontSize: "9px", fontWeight: 700, color: mcoPillStyle.text, letterSpacing: "0.1em", marginBottom: "4px", fontFamily: "Arial, monospace" }}>MCO POSITION</div>
                    <div style={{ fontSize: "11px", color: M.textDark, lineHeight: 1.65 }}>{item.mcoNote}</div>
                  </div>

                  {/* Peer grid */}
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "6px" }}>
                    {item.peers.map(p => (
                      <div key={p.ticker} style={{
                        display: "flex", alignItems: "flex-start", gap: "8px",
                        padding: "8px 10px", borderRadius: "4px",
                        background: p.ticker === "MCO" ? "#F0F4FF" : M.offWhite,
                        border: p.ticker === "MCO" ? "1px solid #A8BCE8" : "1px solid " + M.border,
                      }}>
                        <div style={{ display: "flex", flexDirection: "column", gap: "3px", flexShrink: 0, alignItems: "center", minWidth: "42px" }}>
                          <span style={{
                            fontSize: "9px", fontWeight: 700, fontFamily: "Arial, monospace",
                            color: p.ticker === "MCO" ? M.primary : M.textDark,
                          }}>{p.ticker}</span>
                          <StatusPill status={p.status} styles={diffStatusStyles} />
                        </div>
                        <span style={{ fontSize: "10px", color: "#4A5568", lineHeight: 1.55 }}>{p.evidence}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
    </div>
  );
}

// ─── ENHANCED EMERGING STANDARDS & PROTOCOLS ────────────────────────────────
function StandardsScorecard() {
  const [expanded, setExpanded] = useState(null);

  return (
    <div>
        {standardsAdoption.map((item, i) => {
          const isExpanded = expanded === i;
          const adopted = item.peers.filter(p => p.status === "adopted").length;
          const notStarted = item.peers.filter(p => p.status === "none").length;
          const mcoEntry = item.peers.find(p => p.ticker === "MCO");
          const mcoStatus = mcoEntry ? mcoEntry.status : "none";

          return (
            <div key={item.title} style={{
              marginBottom: "12px", paddingBottom: "12px",
              borderBottom: i < standardsAdoption.length - 1 ? "1px solid " + M.border : "none",
            }}>
              <div
                onClick={() => setExpanded(isExpanded ? null : i)}
                style={{ cursor: "pointer" }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                  <div style={{ fontSize: "12px", fontWeight: 700, color: M.textDark, flex: 1 }}>{item.title}</div>
                  <span style={{
                    fontSize: "9px", fontWeight: 700,
                    color: mcoPillStyle.text,
                    background: mcoPillStyle.bg,
                    border: "1px solid " + mcoPillStyle.border,
                    padding: "2px 7px", borderRadius: "3px", fontFamily: "Arial, monospace",
                  }}>MCO: {stdStatusStyles[mcoStatus].label}</span>
                  <span style={{
                    fontSize: "11px", color: M.midGray,
                    transition: "transform 0.2s",
                    transform: isExpanded ? "rotate(180deg)" : "none",
                  }}>▾</span>
                </div>
                <div style={{ fontSize: "11px", color: "#4A5568", lineHeight: 1.65 }}>{item.desc}</div>
                {/* Summary counts — all neutral gray */}
                <div style={{ display: "flex", gap: "12px", marginTop: "6px" }}>
                  <span style={{ fontSize: "10px", color: M.midGray, fontFamily: "Arial, monospace" }}>{adopted} adopted</span>
                  <span style={{ fontSize: "10px", color: M.midGray, fontFamily: "Arial, monospace" }}>{item.peers.filter(p => p.status === "piloting").length} piloting</span>
                  <span style={{ fontSize: "10px", color: M.midGray, fontFamily: "Arial, monospace" }}>{item.peers.filter(p => p.status === "planned").length} planned</span>
                  <span style={{ fontSize: "10px", color: M.midGray, fontFamily: "Arial, monospace" }}>{notStarted} not started</span>
                </div>
              </div>

              {isExpanded && (
                <div style={{ marginTop: "10px" }}>
                  {/* Peer grid */}
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "6px" }}>
                    {item.peers.map(p => (
                      <div key={p.ticker} style={{
                        display: "flex", alignItems: "flex-start", gap: "8px",
                        padding: "8px 10px", borderRadius: "4px",
                        background: p.ticker === "MCO" ? "#F0F4FF" : M.offWhite,
                        border: p.ticker === "MCO" ? "1px solid #A8BCE8" : "1px solid " + M.border,
                      }}>
                        <div style={{ display: "flex", flexDirection: "column", gap: "3px", flexShrink: 0, alignItems: "center", minWidth: "50px" }}>
                          <span style={{
                            fontSize: "9px", fontWeight: 700, fontFamily: "Arial, monospace",
                            color: p.ticker === "MCO" ? M.primary : M.textDark,
                          }}>{p.ticker}</span>
                          <StatusPill status={p.status} styles={stdStatusStyles} />
                        </div>
                        <span style={{ fontSize: "10px", color: "#4A5568", lineHeight: 1.55 }}>{p.evidence}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
    </div>
  );
}

export default function Dashboard() {
  const [expandedPeers, setExpandedPeers] = useState({});
  const [expandedNatives, setExpandedNatives] = useState({});
  const [expandedOther, setExpandedOther] = useState({});
  const [activeTab, setActiveTab] = useState("peers");

  const togglePeer = i => setExpandedPeers(p => ({ ...p, [i]: !p[i] }));
  const toggleNative = i => setExpandedNatives(p => ({ ...p, [i]: !p[i] }));
  const toggleOther = i => setExpandedOther(p => ({ ...p, [i]: !p[i] }));

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
                {[...peers, ...aiBig4, ...otherFirms].length} Companies · {disclosures.length} Quantitative AI Disclosures · Hard Metrics Linked to Primary Sources
              </p>
            </div>
            <div style={{ display: "flex", gap: "24px", paddingBottom: "2px" }}>
              {[
                { v: [...peers, ...aiBig4, ...otherFirms].length, l: "COMPANIES", c: M.lightBlue },
                { v: lastUpdated.split(",")[0].replace("March ", "Mar "), l: "DATA AS OF", c: "#FFF" },
                { v: peers.filter(p => p.status === "leader").length, l: "LEADERS", c: "#6ED9A0" },
                { v: peers.filter(p => p.status === "laggard").length, l: "LAGGARDS", c: "#F5B478" },
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
              { id: "peers", label: "Peers", sub: `${peers.length} companies`, count: peers.length },
              { id: "natives", label: "AI Big 4", sub: `${aiBig4.length} companies`, count: aiBig4.length },
              { id: "otherfirms", label: "Other Firms", sub: `${otherFirms.length} companies`, count: otherFirms.length },
              { id: "timeline", label: "AI Disclosures", sub: "by date", count: disclosures.length },
              { id: "financials", label: "Peer Financials", sub: "peer comparison", count: financials.length },
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
            {/* ── 1. PEER GROUP (collapsible) ─────────────────────── */}
            <CollapsibleSection
              title="PEER GROUP"
              description="Overview of the 10 peers we track, how they're grouped, and their sector roles."
              defaultOpen={false}
              accentColor={M.navy}
            >
              <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "8px" }}>
                {peers.map(p => (
                  <div key={p.ticker} style={{
                    background: M.white, border: "1px solid " + M.border,
                    borderRadius: "6px", padding: "10px 12px",
                    display: "flex", flexDirection: "column", gap: "6px",
                    minWidth: 0,
                  }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "6px" }}>
                      <span style={{
                        fontSize: "10px", fontWeight: 700, fontFamily: "Arial, monospace",
                        color: M.textDark,
                      }}>{p.ticker}</span>
                      <Badge status={p.status} label={p.statusLabel} />
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontSize: "11px", fontWeight: 600, color: M.textDark, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.name}</div>
                      <div style={{ fontSize: "9px", color: M.midGray, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.sector}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CollapsibleSection>

            {/* ── 2. RECENT HIGHLIGHTS (collapsible) ──────────────── */}
            <CollapsibleSection
              title="RECENT HIGHLIGHTS"
              description="The five most significant AI disclosures across the peer group in the last few days."
              defaultOpen={false}
              accentColor={M.primary}
            >
              <div style={{
                background: M.white, border: "1px solid " + M.border,
                borderRadius: "6px", padding: "14px 18px",
              }}>
                {whatsNew.map((item, i) => (
                  <div key={i} style={{
                    fontSize: "12px", color: "#4A5568", lineHeight: 1.75,
                    paddingLeft: "16px", position: "relative",
                    marginBottom: i < whatsNew.length - 1 ? "8px" : "0",
                  }}>
                    <span style={{ position: "absolute", left: "4px", top: "0", color: M.primary, fontWeight: 700 }}>·</span>
                    {item}
                  </div>
                ))}
              </div>
            </CollapsibleSection>

            {/* ── 3. CROSS-GROUP THEMES (collapsible) ─────────────── */}
            <CollapsibleSection
              title="CROSS-GROUP THEMES"
              description="The AI themes that cut across multiple peers this cycle — agentic workflows, MCP distribution, internal AI efficiency, and more."
              defaultOpen={false}
              accentColor={M.navy}
            >
            <ThemeGrid themes={[
              { title: "Proprietary Data as the Moat", text: "Every peer group company makes the same core strategic argument: curated, domain-specific, licensed data cannot be replicated by general-purpose LLMs. Moody's (600M+ entities), LSEG (90% IP-protected revenue), Verisk (insurance loss data spanning decades), and Thomson Reuters (legal/tax corpus) all position their data estates as the irreplaceable foundation that AI enhances rather than disrupts. The companies monetizing this thesis fastest are those embedding AI directly into existing subscription workflows rather than selling AI as a standalone product.", color: M.lightBlue },
              { title: "Agentic AI Is Replacing Manual Workflows", text: "The frontier has moved from chatbots and copilots to autonomous multi-step agents. Moody's Agentic Solutions automates credit assessment and KYC screening. Verisk's XactGen produces near-complete insurance claims estimates from aerial imagery alone. Nasdaq's Digital Sanctions Analyst cuts human review workload by 80%+. Thomson Reuters' CoCounsel handles legal research workflows end-to-end. CoStar's Homes AI spans the full real estate search experience. The common pattern: these aren't demos — they're live products processing real customer workloads.", color: "#6ED9A0" },
              { title: "MCP as the Financial Data Standard", text: "Model Context Protocol (MCP) is emerging as the de facto API standard for connecting enterprise AI models to proprietary financial data. LSEG has 60+ institutions connected and partnerships with Anthropic, OpenAI, Microsoft, Databricks, Snowflake, and Rogo. Moody's is distributing MCP servers through Databricks Marketplace and Claude for Financial Services. This infrastructure layer is critical — whoever controls the data plumbing for AI workflows controls the customer relationship.", color: "#FFD166" },
              { title: "AI Investment Is Self-Funding", text: "The most disciplined operators are using AI savings to fund AI investment, creating a virtuous cycle. S&P Global has automated >50% of data workflows and eliminated 10%+ of applications. Thomson Reuters is guiding 100bps of annual margin expansion through 2028 from AI efficiencies. MSCI is targeting 5-15% opex reduction to reinvest entirely into new products. CoStar's AI cost savings are explicitly included in 2026 guidance. Even FactSet's 'amplify, not replace' strategy is designed to protect margins while investing.", color: "#F59090" },
              { title: "GenAI Adoption Accelerating Revenue Growth", text: "Companies that can quantify GenAI's impact on customer economics are seeing accelerating revenue. Thomson Reuters' GenAI ACV doubled from 15% to 28% in three quarters. Moody's GenAI-adopter customers are growing at 2x the overall MA rate. Nasdaq's Verafin enterprise signings quadrupled YoY. Verisk's XactXpert is adopted by 7 of the top 10 homeowners insurers. The inflection from 'we're building AI' to 'AI is driving our numbers' happened in late 2025 for the leaders.", color: "#A8BCE8" },
              { title: "The Execution Gap Is Widening", text: "A clear bifurcation is emerging between leaders with live, monetized AI products and laggards still in the 'building' or 'experimenting' phase. Gartner's AskGartner shows strong leading indicators but contract value grew only 1%, with the stock down 35% YTD. FactSet's methodical approach is sound but ASV growth needs to accelerate. MSCI's AI revenue (~$15-20M) remains small relative to total revenue. The market is increasingly pricing in execution speed, not just strategy articulation.", color: M.amber },
            ]} />
            </CollapsibleSection>

            {/* ── 4. WHAT'S NEW THIS CYCLE (collapsible) ────────── */}
            <CollapsibleSection
              title="WHAT'S NEW THIS CYCLE"
              description="Theme-grouped competitive briefing covering the most important peer AI disclosures from the last ~90 days."
              defaultOpen={false}
              accentColor={M.primary}
            >
              <CycleBriefing />
            </CollapsibleSection>

            {/* ── 5. COMPANY PROFILES (collapsible) ──────────────── */}
            <CollapsibleSection
              title="COMPANY PROFILES"
              description="One-card summary per peer with headline metric, AI strategy, key quote, guidance, and risks. Leader/Laggard status is shown on each card."
              defaultOpen={false}
              accentColor={M.navy}
            >
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(330px, 1fr))", gap: "12px" }}>
                {peers.map((c, i) => (
                  <CompanyCard key={c.ticker + i} company={c} expanded={!!expandedPeers[i]} onToggle={() => togglePeer(i)} />
                ))}
              </div>
            </CollapsibleSection>

            {/* ── 6 + 7. DIFFERENTIATION OPPORTUNITIES + EMERGING STANDARDS ── */}
            {/* Side-by-side 2-column grid on wider screens */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(420px, 1fr))", gap: "16px" }}>
              <CollapsibleSection
                title="DIFFERENTIATION OPPORTUNITIES"
                description="Five AI themes where MCO could win or lose ground, with every peer's execution status and MCO's current position called out."
                defaultOpen={false}
                accentColor={M.navy}
              >
                <DifferentiationScorecard />
              </CollapsibleSection>

              <CollapsibleSection
                title="EMERGING STANDARDS"
                description="Adoption scorecard for new AI protocols and practices — MCP, governance, consumption pricing, AI-adjusted guidance, and agentic compliance."
                defaultOpen={false}
                accentColor={M.navy}
              >
                <StandardsScorecard />
              </CollapsibleSection>
            </div>

          </>
        )}


        {/* FINANCIALS TAB */}
        {activeTab === "financials" && (
          <div style={{ position: "relative" }}>
            {/* WIP WATERMARK OVERLAY */}
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none", zIndex: 10 }}>
              <div style={{
                fontSize: "220px",
                fontWeight: 900,
                fontFamily: "Arial, sans-serif",
                color: "rgba(220, 38, 38, 0.13)",
                letterSpacing: "30px",
                transform: "rotate(-25deg)",
                userSelect: "none",
              }}>WIP</div>
            </div>
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
          </div>
        )}

        {/* AI NATIVES TAB */}
        {activeTab === "natives" && (
          <>
            <SectionBanner
              title="AI BIG 4 — FRONTIER MODEL LABS & HYPERSCALERS"
              subtitle={<>Anthropic, OpenAI, Alphabet, and Meta — simultaneously <strong>suppliers, partners, and competitive threats</strong> to the peer group. Understanding their trajectory is essential for any AI disruption risk assessment of the peers above.</>}
              stats={[
                { value: "$14B", label: "ANTHROPIC ARR", color: M.primary },
                { value: "$25B", label: "OPENAI ARR", color: M.green },
                { value: "$403B", label: "ALPHABET REV", color: M.lightBlue },
              ]}
            />

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))", gap: "14px" }}>
              {aiBig4.map((c, i) => (
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

        {/* OTHER FIRMS TAB — minimal: profile cards + disclosures log */}
        {activeTab === "otherfirms" && (
          <>
            <SectionBanner
              title="OTHER FIRMS — AI DISCLOSURE LEADERS OUTSIDE THE PEER GROUP"
              subtitle={<>Companies that are <strong>not DAIS peers and not AI-native labs</strong>, but are leading in AI disclosures and worth tracking for benchmarking. Starting with Accenture and Salesforce. Deeper research coming in a future cycle.</>}
              stats={[
                { value: otherFirms.length, label: "COMPANIES", color: M.primary },
                { value: otherFirmsWhatsNew.length, label: "CYCLE UPDATES", color: M.amber },
              ]}
            />

            {/* ── RECENT HIGHLIGHTS (collapsible) ──────────────── */}
            <CollapsibleSection
              title="RECENT HIGHLIGHTS"
              description="The most significant AI disclosures from non-peer firms in the current cycle."
              defaultOpen={false}
              accentColor={M.primary}
            >
              <div style={{
                background: M.white, border: "1px solid " + M.border,
                borderRadius: "6px", padding: "14px 18px",
              }}>
                {otherFirmsWhatsNew.map((item, i) => (
                  <div key={i} style={{
                    fontSize: "12px", color: "#4A5568", lineHeight: 1.75,
                    paddingLeft: "16px", position: "relative",
                    marginBottom: i < otherFirmsWhatsNew.length - 1 ? "8px" : "0",
                  }}>
                    <span style={{ position: "absolute", left: "4px", top: "0", color: M.primary, fontWeight: 700 }}>·</span>
                    {item}
                  </div>
                ))}
              </div>
            </CollapsibleSection>

            {/* ── WHAT'S NEW THIS CYCLE (collapsible) ────────── */}
            <CollapsibleSection
              title="WHAT'S NEW THIS CYCLE"
              description="Theme-grouped briefing covering the most important non-peer AI disclosures from the last ~90 days."
              defaultOpen={false}
              accentColor={M.primary}
            >
              <CycleBriefing
                themes={otherFirmsCycleThemes}
                summaries={otherFirmsCycleSummaries}
                lookupPool={[...aiBig4, ...otherFirms]}
              />
            </CollapsibleSection>

            <CollapsibleSection
              title="COMPANY PROFILES"
              subtitle={`${otherFirms.length} firms`}
              description="One-card summary per firm with headline metric, AI strategy, key quote, guidance, and risks."
              defaultOpen={true}
              accentColor={M.navy}
            >
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))", gap: "14px" }}>
                {otherFirms.map((c, i) => (
                  <CompanyCard key={c.ticker + i} company={c} expanded={!!expandedOther[i]} onToggle={() => toggleOther(i)} />
                ))}
              </div>
            </CollapsibleSection>
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
