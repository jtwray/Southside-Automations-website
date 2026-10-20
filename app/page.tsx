import AuditForm from "./audit-form";

const problems = [
  "Return missed calls hours later because everyone was working",
  "Copy customer details from emails into spreadsheets",
  "Chase technicians for photos, materials, or job notes",
  "Forget to follow up on estimates",
  "Enter the same information in multiple systems",
  "Wait days to invoice completed work",
  "Search through emails to find a job's status",
  "Keep important business information in someone's head",
];

const offers = [
  {
    number: "01", name: "Lead Rescue", title: "Stop losing jobs because you're busy doing the work.",
    problem: "A customer calls while everyone is working. The call goes to voicemail. Someone means to call back, but the day gets busy.",
    flow: ["Missed call or inquiry", "Quick response", "Customer intake", "Owner notified", "Follow-up reminders"],
    result: "Every inquiry gets acknowledged quickly and every open lead has a visible next step.",
  },
  {
    number: "02", name: "Revenue Recovery", title: "Stop estimates from quietly disappearing.",
    problem: "An estimate goes out. The customer says they'll think about it. Weeks later, someone realizes nobody followed up.",
    flow: ["Estimate sent", "Follow-up scheduled", "Customer reminded", "Response captured", "Owner alerted"],
    result: "Open estimates stay visible instead of depending on somebody remembering them.",
  },
  {
    number: "03", name: "Field-to-Cash", title: "Get completed work from the truck to the invoice.",
    problem: "The job is finished, but photos are on one phone and material notes are elsewhere. The office has to chase the crew before billing.",
    flow: ["Mobile job form", "Labor, materials & photos", "Signature if needed", "Office record", "Invoice workflow"],
    result: "When the truck leaves, the office has what it needs to finish the paperwork and bill.",
  },
  {
    number: "04", name: "System Bridge", title: "Make the software you already pay for work together.",
    problem: "Customer information lives in your website form, inbox, schedule, spreadsheet, and accounting system. Somebody copies it again and again.",
    flow: ["Website inquiry", "Customer record", "Scheduling", "Confirmation", "Accounting & follow-up"],
    result: "Information moves between systems instead of being entered repeatedly.",
  },
];

function Flow({ steps }: { steps: string[] }) {
  return <div className="flow" aria-label={`Example workflow: ${steps.join(" then ")}`}>{steps.map((step, index) => <span className="flow-piece" key={step}><span>{step}</span>{index < steps.length - 1 && <b aria-hidden="true">→</b>}</span>)}</div>;
}

export default function Home() {
  return <>
    <header className="site-header"><div className="wrap header-inner"><a className="brand" href="#top" aria-label="Southside Automation home"><span className="brand-mark" aria-hidden="true">S<span>↗</span></span><span>Southside<br/><strong>Automation</strong></span></a><nav aria-label="Main navigation"><a href="#solutions">What we solve</a><a href="#approach">How we start</a><a className="nav-cta" href="#audit">Request an audit <span aria-hidden="true">↗</span></a></nav></div></header>
    <main id="top">
      <section className="hero"><div className="wrap hero-grid"><div><p className="eyebrow"><span className="eyebrow-line"/> LOCAL SOFTWARE • SOUTHSIDE VIRGINIA</p><h1>Stop losing time and money <em>between the steps.</em></h1><p className="hero-lead">Your phone, field crews, spreadsheets, email, and accounting software should work together.</p><p className="hero-copy">We build practical software automations for trades, service businesses, contractors, and small manufacturers in Southside Virginia and surrounding areas. We connect the software you already use — and build the missing pieces when off-the-shelf tools don't fit.</p><a className="button" href="#audit">Find a Workflow We Can Automate <span aria-hidden="true">↗</span></a><p className="hero-note">Start with one annoying process. No big system replacement required.</p></div><div className="hero-panel" aria-label="Example of an inquiry workflow"><div className="panel-top"><span>THE HANDOFF THAT MATTERS</span><span>EXAMPLE WORKFLOW</span></div><div className="panel-step"><span className="step-num">01</span><span>Customer calls while the crew is on a job</span></div><div className="panel-line"/><div className="panel-step active"><span className="step-num">02</span><span>Inquiry gets a prompt response and a record</span></div><div className="panel-line"/><div className="panel-step"><span className="step-num">03</span><span>Office sees who needs to follow up</span></div><div className="panel-bottom">A clear next step, even on a busy day.</div></div></div></section>
      <section className="problem-section" id="problems"><div className="wrap"><div className="section-heading"><p className="eyebrow">SOUND FAMILIAR?</p><h2>Does your business still do any of this manually?</h2></div><div className="problem-grid">{problems.map((item, i) => <div className="problem" key={item}><span className="problem-index">{String(i+1).padStart(2,"0")}</span><p>{item}</p></div>)}</div><p className="statement">Those are exactly the kinds of problems we solve. <a href="#audit">Show us yours <span aria-hidden="true">↗</span></a></p></div></section>
      <section className="solutions-section" id="solutions"><div className="wrap"><div className="section-heading split-heading"><div><p className="eyebrow">PRACTICAL STARTING POINTS</p><h2>One workflow at a time.</h2></div><p>These are examples of what we could build with a business like yours. The right setup depends on your current process and tools.</p></div><div className="offers">{offers.map(offer => <article className="offer" key={offer.name}><div className="offer-label"><span>{offer.number}</span><strong>{offer.name}</strong></div><div className="offer-body"><h3>{offer.title}</h3><p><strong>Common problem</strong> {offer.problem}</p><div className="flow-label">EXAMPLE WORKFLOW</div><Flow steps={offer.flow}/><p className="outcome"><strong>What this could change</strong> {offer.result}</p></div></article>)}</div><div className="bridge-note"><strong>Already using different tools?</strong><span>We can look at QuickBooks, Gmail or Outlook, Google Workspace or Microsoft 365, spreadsheets, CRM and scheduling tools, website forms, payments, industry software, and older custom systems.</span></div></div></section>
      <section className="dashboard-section"><div className="wrap dashboard-grid"><div><p className="eyebrow">05 / OWNER'S MORNING DASHBOARD</p><h2>See what needs your attention without asking everyone first.</h2><p>A useful dashboard answers one question: <strong>What needs attention today?</strong> It can pull a short action list from the information your business already has.</p><p className="small-disclaimer">Illustrative example only — figures below are sample data.</p></div><div className="dashboard" aria-label="Illustrative dashboard sample data"><div className="dash-head"><strong>Today's attention list</strong><span>EXAMPLE</span></div><div className="dash-row"><span>New leads needing response</span><b>4</b></div><div className="dash-row"><span>Estimates waiting more than 3 days</span><b>3</b></div><div className="dash-row"><span>Estimates awaiting approval</span><b>$8,420</b></div><div className="dash-row"><span>Completed jobs not yet invoiced</span><b>2</b></div><div className="dash-row"><span>Overdue invoices</span><b>$6,730</b></div><div className="dash-row"><span>Jobs scheduled tomorrow</span><b>3</b></div><div className="dash-row"><span>Missing field reports</span><b>1</b></div></div></div></section>
      <section className="manufacturing" id="manufacturing"><div className="wrap manufacturing-grid"><div><p className="eyebrow">FOR SMALL MANUFACTURERS</p><h2>RFQ → Quote Pipeline</h2><p>RFQs arrive by email with PDFs, drawings, quantities, deadlines, and notes. Someone downloads files, updates a spreadsheet, forwards attachments, and tries to remember which quote is waiting on whom.</p><p className="manufacturing-result">Give every RFQ an owner, a status, and a next step.</p></div><div className="manufacturing-flow"><span>Incoming RFQ</span><span>Attachments organized</span><span>Key details captured</span><span>Estimator assigned</span><span>Status & stalled-RFQ reminder</span><span>Follow-up after quote</span><small>EXAMPLE WORKFLOW</small></div></div></section>
      <section className="audit-section" id="approach"><div className="wrap audit-grid"><div><p className="eyebrow">START SMALL</p><h2>Start With One Annoying Workflow</h2><p>You don't need to replace your entire business system. Start with one repetitive process that wastes time, gets forgotten, creates mistakes, or delays money.</p><div className="audit-offer"><h3>Free Workflow Leak Audit</h3><p>Show us one process your business handles manually. We'll look for ways to cut repetitive work, prevent missed follow-ups, connect systems, improve visibility, or speed up invoicing.</p><strong>If automation isn't worth doing, we'll tell you.</strong></div><a href="#audit" className="text-link">Show Us Your Workflow <span aria-hidden="true">↗</span></a></div><div className="form-card" id="audit"><div className="form-heading"><span>01 / TELL US WHAT'S STUCK</span><h3>Find your automation opportunity.</h3><p>A short description is enough. We'll follow up to learn how the process works today.</p></div><AuditForm/></div></div></section>
    </main><footer><div className="wrap footer-inner"><div><strong>Southside Automation</strong><p>Local software development and business-process automation for Southside Virginia and surrounding communities.</p></div><p>Connect what you have. Automate what you repeat. Build what's missing.</p></div></footer>
  </>;
}
