import { useState, useEffect } from "react";

// ── Supabase Config ──────────────────────────────────────────
const SUPABASE_URL = "https://egrgfbqwnxmqlejn.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVncmdmYnF3bnhtcWxlam1wZ2RwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzODEzMDIsImV4cCI6MjA5Njk1NzMwMn0.YgzHpXqpWoAK8mWJBebh-Mh5EAJrWdHS8ENVIZuLIw8";

const T = {
  navy:"#0B0E1A", navyMid:"#131729", navyLight:"#1C2138", navyBorder:"#252A42",
  cream:"#F2EDE4", creamDim:"#9B9488", creamFaint:"#4A4640",
  coral:"#E8593A", coralDim:"#E8593A22",
  sage:"#4A9B7F", sageDim:"#4A9B7F22",
  gold:"#D4A853", goldDim:"#D4A85322",
};

const SCHOLARSHIPS = [
  { id:1, name:"QuestBridge National College Match", org:"QuestBridge", amount:"Full ride — tuition, room & board", amountNum:999999, deadline:"Sep 30, 2026", url:"https://www.questbridge.org", noEssay:false, backgrounds:["all"], gpaMin:3.5, status:["high-school-senior"], description:"Full four-year scholarship to 55 top US colleges. For high-achieving, low-income students. Household income typically under $65K.", urgency:"high" },
  { id:2, name:"Dell Scholars Program", org:"Michael & Susan Dell Foundation", amount:"$20,000 + laptop + advising", amountNum:20000, deadline:"Dec 1, 2026", url:"https://www.dellscholars.org", noEssay:false, backgrounds:["all"], gpaMin:2.4, status:["high-school-senior"], description:"For first-gen, low-income students. Includes $20K, a laptop, Chegg credits, and ongoing support through graduation.", urgency:"high" },
  { id:3, name:"Gates Scholarship", org:"Bill & Melinda Gates Foundation", amount:"Covers full unmet need", amountNum:50000, deadline:"Sep 15, 2026", url:"https://www.thegatesscholarship.org", noEssay:false, backgrounds:["black","hispanic","asian","native-american"], gpaMin:3.3, status:["high-school-senior"], description:"For Pell-eligible minority students. Covers full cost of attendance minus other aid. One of the most generous in the US.", urgency:"high" },
  { id:4, name:"Coca-Cola First Generation Scholarship", org:"Coca-Cola Foundation & HACU", amount:"$5,000", amountNum:5000, deadline:"May 15, 2026", url:"https://hacu.net/programs/hacu-scholarship-program/", noEssay:false, backgrounds:["hispanic"], gpaMin:3.0, status:["high-school-senior","college-student"], description:"17 awards specifically for first-gen Hispanic students at HACU-member institutions. 3.0+ GPA required.", urgency:"high" },
  { id:5, name:"Jack Kent Cooke Transfer Scholarship", org:"Jack Kent Cooke Foundation", amount:"Up to $55,000/year", amountNum:55000, deadline:"Opens Aug 19, 2026", url:"https://www.jkcf.org/our-scholarships/undergraduate-transfer-scholarship/", noEssay:false, backgrounds:["all"], gpaMin:3.5, status:["community-college"], description:"For community college students transferring to a 4-year school. Up to $55K/year — one of the highest-value transfer scholarships.", urgency:"medium" },
  { id:6, name:"Coca-Cola Scholars Program", org:"Coca-Cola Scholars Foundation", amount:"$20,000", amountNum:20000, deadline:"Sep 30, 2026", url:"https://www.coca-colascholarsfoundation.org/apply/", noEssay:false, backgrounds:["all"], gpaMin:3.0, status:["high-school-senior"], description:"150 scholars selected each year. Achievement and leadership focused. One of the most prestigious high school scholarships in the US.", urgency:"high" },
  { id:7, name:"Niche $2,000 No-Essay Scholarship", org:"Niche", amount:"$2,000", amountNum:2000, deadline:"Monthly / Rolling", url:"https://www.niche.com/colleges/scholarships/no-essay-scholarship/", noEssay:true, backgrounds:["all"], gpaMin:0, status:["high-school-student","high-school-senior","college-student","community-college"], description:"Monthly drawing open to all students. No essay, no GPA requirement. Takes 2 minutes. Great for stacking quick applications.", urgency:"low" },
  { id:8, name:"Scholarships360 $10,000 No-Essay Scholarship", org:"Scholarships360", amount:"$10,000", amountNum:10000, deadline:"Jun 30, 2026", url:"https://scholarships360.org", noEssay:true, backgrounds:["all"], gpaMin:0, status:["high-school-student","high-school-senior","college-student","community-college"], description:"Open to all students including undocumented and international. No essay required.", urgency:"medium" },
  { id:9, name:"Kadzai Law First Generation Scholarship", org:"Kadzai Law Group", amount:"$2,500", amountNum:2500, deadline:"Sep 28, 2026", url:"https://www.kadzailawgroup.com/scholarship", noEssay:false, backgrounds:["all"], gpaMin:0, status:["college-student","community-college"], description:"Submit a 3–5 min video about your challenges and goals. No GPA minimum. First-gen students only.", urgency:"medium" },
  { id:10, name:"Hispanic Scholarship Fund", org:"HSF", amount:"$500–$5,000", amountNum:5000, deadline:"Feb 15, 2027", url:"https://www.hsf.net/scholarship", noEssay:false, backgrounds:["hispanic"], gpaMin:3.0, status:["high-school-senior","college-student","community-college"], description:"Open to all students of Hispanic heritage with 3.0+ GPA. One application, considered for multiple awards.", urgency:"medium" },
  { id:11, name:"UNCF General Scholarship", org:"United Negro College Fund", amount:"Up to $5,000", amountNum:5000, deadline:"Mar 31, 2026", url:"https://opportunities.uncf.org", noEssay:false, backgrounds:["black"], gpaMin:2.5, status:["college-student"], description:"One application matches you to multiple UNCF scholarships. Must attend one of 37 UNCF member HBCUs. 2.5+ GPA.", urgency:"high" },
  { id:12, name:"Taco Bell Live Más Scholarship", org:"Taco Bell Foundation", amount:"$5,000–$25,000", amountNum:25000, deadline:"Jan 6, 2027", url:"https://tacobellfoundation.org/live-mas-scholarship/", noEssay:false, backgrounds:["all"], gpaMin:2.4, status:["high-school-student","high-school-senior","college-student","community-college"], description:"Passion-based — submit a short video filmed on your phone. $14.5M awarded in 2026 to 1,000+ students. Ages 16–26.", urgency:"low" },
  { id:13, name:"Florida First Generation Matching Grant", org:"Florida Dept. of Education", amount:"Up to $1,491", amountNum:1491, deadline:"Aug 31, 2026", url:"https://www.floridastudentfinancialaidsg.org", noEssay:true, backgrounds:["all"], gpaMin:0, status:["college-student","community-college"], description:"For Florida residents who are first in their family to earn a bachelor's degree. Enrolled in a Florida state college. No essay.", urgency:"medium" },
  { id:14, name:"QuestBridge College Prep Scholars", org:"QuestBridge", amount:"Resources + college visit opportunities", amountNum:1000, deadline:"Mar 23, 2027", url:"https://www.questbridge.org/apply-to-college/programs/college-prep-scholars-program", noEssay:false, backgrounds:["all"], gpaMin:3.5, status:["high-school-student"], description:"For high school juniors with high achievement and financial need. Provides resources, college visits, and a head start on top applications.", urgency:"low" },
];

const SQ = [
  { id:"status", label:"Where are you right now?", options:[
    { value:"high-school-student", label:"High school (not senior yet)" },
    { value:"high-school-senior", label:"High school senior" },
    { value:"college-student", label:"Current college student" },
    { value:"community-college", label:"Community college (planning to transfer)" },
  ]},
  { id:"background", label:"Which backgrounds apply to you?", options:[
    { value:"all", label:"None of the below / prefer not to say" },
    { value:"hispanic", label:"Hispanic / Latino" },
    { value:"black", label:"Black / African American" },
    { value:"asian", label:"Asian / Pacific Islander" },
    { value:"native-american", label:"Native American / Indigenous" },
  ]},
  { id:"gpa", label:"What's your approximate GPA?", options:[
    { value:"4.0", label:"3.8 or higher" },
    { value:"3.5", label:"3.5 – 3.7" },
    { value:"3.0", label:"3.0 – 3.4" },
    { value:"2.5", label:"2.5 – 2.9" },
    { value:"2.0", label:"Under 2.5" },
  ]},
  { id:"essay", label:"How much effort can you put in?", options:[
    { value:"any", label:"I'll write essays — I want the best matches" },
    { value:"no-essay", label:"Quick applications only (no essay)" },
  ]},
];

const studentGuide = [
  { emoji:"📧", title:"Emailing a Professor", tag:"Communication", color:T.coral, steps:["Use your school email — not Gmail.",'Open with "Dear Professor [Last Name],"',"State your name and course section.","Ask one clear question.",'Close with "Thank you" and your full name.'], example:'Dear Professor Chen,\n\nMy name is Destiny Williams and I\'m in your BIO 201 lecture (TR 11am). I had a question about whether the lab report should follow APA or MLA format.\n\nThank you,\nDestiny Williams' },
  { emoji:"🏢", title:"Office Hours Explained", tag:"Campus Life", color:T.sage, steps:["Professors sit in their office waiting for you — no appointment needed.","You can ask anything: homework, career advice, rec letters.","Going makes professors remember you positively.","Most students never go. You will stand out immediately."], example:null },
  { emoji:"💰", title:"FAFSA Mistakes to Avoid", tag:"Financial Aid", color:T.gold, steps:["It doesn't auto-renew — refile every October.","Always use prior-prior year tax info.","Dropping below half-time kills your loan eligibility.","You can appeal your aid package — most students don't know this."], example:null },
  { emoji:"🎓", title:"What Academic Advisors Do", tag:"Academics", color:T.coral, steps:["They ensure you're taking the right classes to graduate.","They can waive requirements with good reason.","They know about scholarships you'll never find yourself.","See them every semester — not just in a crisis."], example:null },
  { emoji:"🤝", title:"Networking Without Cringe", tag:"Career", color:T.sage, steps:["It's just talking to people in fields you care about.","Start with professors — they know people.","Make a LinkedIn now, even if it's empty.",'"Informational interview" = 30-min coffee chat to learn. Most people say yes.'], example:null },
  { emoji:"📋", title:"Reading a Syllabus", tag:"Academics", color:T.gold, steps:["The syllabus is a contract — professors can't change grading mid-semester.","Find the late work policy immediately.","Mark every due date in your phone the first week.","Don't buy required materials until week 2."], example:null },
];

const parentGuide = [
  { emoji:"💬", title:"How to Support Without Controlling", tag:"Relationship", color:T.sage, steps:["Ask 'How can I help?' rather than offering unsolicited advice.","Let them make mistakes — that's how college teaches.","Avoid comparing their path to yours or others'.","Celebrate small wins out loud."], example:null },
  { emoji:"💵", title:"Understanding Financial Aid Letters", tag:"Financial Aid", color:T.coral, steps:["'Cost of Attendance' includes tuition, housing, food, and fees.","Grants and scholarships = free money. Loans = debt.","Work-Study must be earned through a campus job — it's not a check.","You can appeal the package if circumstances changed."], example:null },
  { emoji:"📞", title:"When to Step In vs. Step Back", tag:"Relationship", color:T.gold, steps:["Step back: grades, social decisions, roommate conflicts.","Step in: mental health crisis, financial emergency, academic dismissal.","FERPA means the school cannot discuss grades with you without written consent.","Your student is learning to advocate for themselves — that's the goal."], example:null },
  { emoji:"🧠", title:"Signs Your Student Is Struggling", tag:"Wellbeing", color:T.sage, steps:["Withdrawing from family contact more than usual.","Missing classes or losing financial aid.","Expressing feeling like they don't belong.","Sudden changes in mood, sleep, or appetite — connect them to campus counseling."], example:null },
  { emoji:"🗓️", title:"Key Dates Parents Should Know", tag:"Financial Aid", color:T.coral, steps:["October 1: FAFSA opens — file early, aid is first-come.","November–February: Scholarship season.","March: Midterm grades — good check-in moment.","May: Tuition bills for fall arrive."], example:null },
];

const COLLEGES = [
  { name:"UCLA", full:"University of California, Los Angeles", deadlines:[{date:"Nov 30",title:"UC Application Opens",cat:"Applications",urgency:"high"},{date:"Jan 31",title:"UC Application Deadline",cat:"Applications",urgency:"high"},{date:"Mar 1",title:"FAFSA/Dream Act Priority Deadline",cat:"Financial Aid",urgency:"high"},{date:"Apr 1",title:"Admission Decisions Released",cat:"Admissions",urgency:"medium"},{date:"May 1",title:"Enrollment Commitment Deadline",cat:"Admissions",urgency:"high"}]},
  { name:"NYU", full:"New York University", deadlines:[{date:"Nov 1",title:"Early Decision I Deadline",cat:"Applications",urgency:"high"},{date:"Jan 1",title:"Regular Decision Deadline",cat:"Applications",urgency:"high"},{date:"Feb 15",title:"FAFSA Priority Deadline",cat:"Financial Aid",urgency:"high"},{date:"Apr 1",title:"Admission Decisions",cat:"Admissions",urgency:"medium"},{date:"May 1",title:"Enrollment Deadline",cat:"Admissions",urgency:"high"}]},
  { name:"UT Austin", full:"University of Texas at Austin", deadlines:[{date:"Dec 1",title:"Priority Application Deadline",cat:"Applications",urgency:"high"},{date:"Jan 15",title:"FAFSA Priority Deadline",cat:"Financial Aid",urgency:"high"},{date:"Feb 1",title:"Regular Application Deadline",cat:"Applications",urgency:"medium"},{date:"Mar 15",title:"Admission Decisions",cat:"Admissions",urgency:"medium"},{date:"May 1",title:"Enrollment Commitment",cat:"Admissions",urgency:"high"}]},
  { name:"Florida State", full:"Florida State University", deadlines:[{date:"Nov 1",title:"Early Action Deadline",cat:"Applications",urgency:"high"},{date:"Jan 15",title:"FAFSA Priority Deadline",cat:"Financial Aid",urgency:"high"},{date:"Feb 1",title:"Regular Decision Deadline",cat:"Applications",urgency:"medium"},{date:"Mar 1",title:"Scholarship Application Deadline",cat:"Scholarships",urgency:"high"},{date:"May 1",title:"Enrollment Commitment",cat:"Admissions",urgency:"high"}]},
  { name:"Howard University", full:"Howard University", deadlines:[{date:"Nov 1",title:"Early Action Deadline",cat:"Applications",urgency:"high"},{date:"Feb 1",title:"Regular Decision Deadline",cat:"Applications",urgency:"medium"},{date:"Feb 15",title:"FAFSA Priority Deadline",cat:"Financial Aid",urgency:"high"},{date:"Mar 1",title:"Scholarship Deadline",cat:"Scholarships",urgency:"high"},{date:"May 1",title:"Enrollment Commitment",cat:"Admissions",urgency:"high"}]},
  { name:"Michigan", full:"University of Michigan", deadlines:[{date:"Nov 1",title:"Early Action Deadline",cat:"Applications",urgency:"high"},{date:"Feb 1",title:"Regular Decision Deadline",cat:"Applications",urgency:"medium"},{date:"Apr 1",title:"FAFSA Deadline",cat:"Financial Aid",urgency:"high"},{date:"Apr 15",title:"Admission Decisions",cat:"Admissions",urgency:"medium"},{date:"May 1",title:"Enrollment Commitment",cat:"Admissions",urgency:"high"}]},
  { name:"Community College", full:"Your Community College", deadlines:[{date:"Oct 1",title:"FAFSA Opens — File Now",cat:"Financial Aid",urgency:"high"},{date:"Nov 15",title:"Spring Enrollment Opens",cat:"Enrollment",urgency:"medium"},{date:"Jan 15",title:"FAFSA Priority Deadline (most states)",cat:"Financial Aid",urgency:"high"},{date:"Mar 1",title:"Summer/Fall Enrollment Opens",cat:"Enrollment",urgency:"medium"},{date:"Apr 15",title:"Financial Aid Award Letters Arrive",cat:"Financial Aid",urgency:"medium"}]},
];

const anonQuestions = [
  { q:"Is it embarrassing to go to the tutoring center?", a:"No. Smart students use every free resource. The tutoring center exists because everyone needs it.", votes:142 },
  { q:"Can I really negotiate my financial aid?", a:"Yes. Email the financial aid office with a competing offer or changed family circumstances. It works more often than you'd think.", votes:98 },
  { q:"What if I fail a class?", a:"Talk to your advisor immediately. Retaking or academic forgiveness may be options. Don't disappear — that makes it worse.", votes:87 },
  { q:"Do I have to pick a major right away?", a:"Most schools give you until sophomore year. 'Undecided' is a real, valid option.", votes:76 },
];

const UC = (u) => u==="high" ? T.coral : u==="medium" ? T.gold : T.sage;

// ── Auth Modal ─────────────────────────────────────────────────
function AuthModal({ authMode, setAuthMode, authEmail, setAuthEmail, authPassword, setAuthPassword, authName, setAuthName, authError, authLoading, handleAuth, handleForgotPassword, onContinueAsGuest, accent, isHardGate }) {
  if (authMode === "forgot") {
    return (
      <div style={{ position:"fixed", inset:0, zIndex:999, display:"flex", alignItems:"flex-end", justifyContent:"center", background:"rgba(0,0,0,0.7)", backdropFilter:"blur(6px)" }}>
        <div style={{ background:T.navyMid, border:`1px solid ${T.navyBorder}`, borderRadius:"24px 24px 0 0", width:"100%", maxWidth:430, padding:"28px 24px 40px", animation:"slideUp 0.35s ease" }}>
          <div style={{ width:40, height:4, background:T.navyBorder, borderRadius:2, margin:"0 auto 24px" }} />
          <div style={{ textAlign:"center", marginBottom:24 }}>
            <div style={{ fontFamily:"'Playfair Display',serif", fontSize:24, color:T.cream, marginBottom:6 }}>Reset your password</div>
            <div style={{ color:T.creamDim, fontSize:13, lineHeight:1.6 }}>Enter your email and we'll send you a reset link.</div>
          </div>
          <input placeholder="Email address" value={authEmail} onChange={e => setAuthEmail(e.target.value)} type="email" style={{ background:T.navyLight, border:`1px solid ${T.navyBorder}`, borderRadius:12, color:T.cream, fontFamily:"'DM Sans',sans-serif", fontSize:14, padding:"13px 16px", outline:"none", width:"100%", boxSizing:"border-box", marginBottom:16 }} />
          {authError && (
            <div style={{ color: authError.startsWith("Reset link") ? T.sage : T.coral, fontSize:13, marginBottom:12, textAlign:"center", lineHeight:1.5 }}>{authError}</div>
          )}
          <button onClick={handleForgotPassword} disabled={authLoading} style={{ background:accent, color:"#fff", border:"none", borderRadius:14, padding:"15px 24px", fontSize:15, fontWeight:600, cursor:"pointer", width:"100%", fontFamily:"'DM Sans',sans-serif", opacity:authLoading?0.6:1, marginBottom:12 }}>
            {authLoading ? "Sending..." : "Send Reset Link"}
          </button>
          <button onClick={() => setAuthMode("login")} style={{ background:"none", border:"none", color:T.creamDim, fontSize:13, cursor:"pointer", width:"100%", padding:"8px", fontFamily:"'DM Sans',sans-serif" }}>
            ← Back to log in
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ position:"fixed", inset:0, zIndex:999, display:"flex", alignItems:"flex-end", justifyContent:"center", background:"rgba(0,0,0,0.7)", backdropFilter:"blur(6px)" }}>
      <div style={{ background:T.navyMid, border:`1px solid ${T.navyBorder}`, borderRadius:"24px 24px 0 0", width:"100%", maxWidth:430, padding:"28px 24px 40px", animation:"slideUp 0.35s ease" }}>
        {/* Handle bar */}
        <div style={{ width:40, height:4, background:T.navyBorder, borderRadius:2, margin:"0 auto 24px" }} />

        {/* Header */}
        <div style={{ textAlign:"center", marginBottom:24 }}>
          <div style={{ fontFamily:"'Playfair Display',serif", fontSize:24, color:T.cream, marginBottom:6 }}>
            {isHardGate ? "You've seen a preview 👀" : "Create your account"}
          </div>
          <div style={{ color:T.creamDim, fontSize:13, lineHeight:1.6 }}>
            {isHardGate
              ? "Sign up free to unlock everything — scholarships, college deadlines, and more."
              : "Save your progress and get personalized matches."}
          </div>
        </div>

        {/* Toggle */}
        <div style={{ display:"flex", background:T.navyLight, borderRadius:12, padding:4, marginBottom:20 }}>
          {["signup","login"].map(m => (
            <button key={m} onClick={() => setAuthMode(m)} style={{ flex:1, background:authMode===m ? accent : "none", border:"none", borderRadius:9, padding:"9px", fontSize:13, fontWeight:600, color:authMode===m?"#fff":T.creamDim, cursor:"pointer", fontFamily:"'DM Sans',sans-serif", transition:"all 0.2s" }}>
              {m==="signup" ? "Sign Up" : "Log In"}
            </button>
          ))}
        </div>

        {/* Fields */}
        <div style={{ display:"flex", flexDirection:"column", gap:12, marginBottom:8 }}>
          {authMode==="signup" && (
            <input placeholder="Your first name" value={authName} onChange={e => setAuthName(e.target.value)} style={{ background:T.navyLight, border:`1px solid ${T.navyBorder}`, borderRadius:12, color:T.cream, fontFamily:"'DM Sans',sans-serif", fontSize:14, padding:"13px 16px", outline:"none", width:"100%", boxSizing:"border-box" }} />
          )}
          <input placeholder="Email address" value={authEmail} onChange={e => setAuthEmail(e.target.value)} type="email" style={{ background:T.navyLight, border:`1px solid ${T.navyBorder}`, borderRadius:12, color:T.cream, fontFamily:"'DM Sans',sans-serif", fontSize:14, padding:"13px 16px", outline:"none", width:"100%", boxSizing:"border-box" }} />
          <input placeholder="Password (6+ characters)" value={authPassword} onChange={e => setAuthPassword(e.target.value)} type="password" style={{ background:T.navyLight, border:`1px solid ${T.navyBorder}`, borderRadius:12, color:T.cream, fontFamily:"'DM Sans',sans-serif", fontSize:14, padding:"13px 16px", outline:"none", width:"100%", boxSizing:"border-box" }} />
        </div>

        {authMode==="login" && (
          <div style={{ textAlign:"right", marginBottom:16 }}>
            <button onClick={() => setAuthMode("forgot")} style={{ background:"none", border:"none", color:T.creamDim, fontSize:12, cursor:"pointer", fontFamily:"'DM Sans',sans-serif", padding:0 }}>
              Forgot password?
            </button>
          </div>
        )}
        {authMode==="signup" && <div style={{ marginBottom:16 }} />}

        {authError && (
          <div style={{ color: authError.startsWith("Account created") ? T.sage : T.coral, fontSize:13, marginBottom:12, textAlign:"center", lineHeight:1.5 }}>
            {authError}
          </div>
        )}

        <button onClick={handleAuth} disabled={authLoading} style={{ background:accent, color:"#fff", border:"none", borderRadius:14, padding:"15px 24px", fontSize:15, fontWeight:600, cursor:"pointer", width:"100%", fontFamily:"'DM Sans',sans-serif", opacity:authLoading?0.6:1, marginBottom:12 }}>
          {authLoading ? "Just a moment..." : authMode==="signup" ? "Create Free Account" : "Log In"}
        </button>

        {/* Continue as guest — only if not hard gate */}
        {!isHardGate && onContinueAsGuest && (
          <button onClick={onContinueAsGuest} style={{ background:"none", border:"none", color:T.creamDim, fontSize:13, cursor:"pointer", width:"100%", padding:"8px", fontFamily:"'DM Sans',sans-serif" }}>
            Keep exploring as guest →
          </button>
        )}

        {isHardGate && (
          <div style={{ textAlign:"center", color:T.creamFaint, fontSize:12 }}>Free forever. No credit card needed.</div>
        )}
      </div>
    </div>
  );
}

// ── Scholarship Results ────────────────────────────────────────
function ScholarshipResults({ results, expandedSch, setExpandedSch, onReset, accent, savedScholarships, toggleSaveScholarship, user, onRequireAuth }) {
  return (
    <div className="slide">
      <button onClick={onReset} style={{ background:"none", border:"none", color:accent, cursor:"pointer", fontSize:13, marginBottom:18, padding:0 }}>← Start Over</button>
      <div style={{ fontFamily:"'Playfair Display',serif", fontSize:26, marginBottom:4 }}>Your Matches</div>
      <div style={{ color:T.creamDim, fontSize:13, marginBottom:24 }}>{results.length} scholarships matched your profile</div>
      {results.length===0 && (
        <div style={{ background:T.navyMid, border:`1px solid ${T.navyBorder}`, borderRadius:18, padding:24, textAlign:"center" }}>
          <div style={{ fontSize:32, marginBottom:12 }}>🔍</div>
          <div style={{ color:T.creamDim, fontSize:14 }}>No exact matches. Go back and select "any" for the essay question to see more.</div>
        </div>
      )}
      <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
        {results.map((s,i) => {
          const isSaved = savedScholarships.includes(s.id);
          return (
          <div key={s.id} style={{ background:T.navyMid, border:`1px solid ${expandedSch===s.id?`${UC(s.urgency)}50`:T.navyBorder}`, borderRadius:18, overflow:"hidden", animation:`slideUp 0.35s ease ${i*0.06}s forwards`, opacity:0, position:"relative" }}>
            <button onClick={() => { if (!user) { onRequireAuth(); return; } toggleSaveScholarship(s.id); }} style={{ position:"absolute", top:14, right:14, background:"none", border:"none", cursor:"pointer", fontSize:20, zIndex:2, lineHeight:1 }} title={isSaved ? "Remove bookmark" : "Save scholarship"}>
              {isSaved ? "⭐" : "☆"}
            </button>
            <button onClick={() => setExpandedSch(expandedSch===s.id?null:s.id)} style={{ background:"none", border:"none", width:"100%", padding:"18px", cursor:"pointer", textAlign:"left" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:10 }}>
                <div style={{ flex:1, paddingRight:36 }}>
                  <div style={{ color:T.cream, fontSize:15, fontWeight:600, lineHeight:1.4, marginBottom:5 }}>{s.name}</div>
                  <div style={{ color:T.creamDim, fontSize:12, marginBottom:8 }}>{s.org}</div>
                  <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                    <span style={{ fontSize:10, fontWeight:600, letterSpacing:"0.1em", textTransform:"uppercase", padding:"3px 9px", borderRadius:20, background:`${UC(s.urgency)}18`, color:UC(s.urgency) }}>{s.deadline}</span>
                    {s.noEssay && <span style={{ fontSize:10, fontWeight:600, letterSpacing:"0.1em", textTransform:"uppercase", padding:"3px 9px", borderRadius:20, background:`${T.sage}18`, color:T.sage }}>No Essay</span>}
                  </div>
                </div>
                <div style={{ textAlign:"right", flexShrink:0, paddingTop:2 }}>
                  <div style={{ fontFamily:"'Playfair Display',serif", fontSize:16, color:UC(s.urgency), lineHeight:1.2 }}>{s.amount}</div>
                  <div style={{ color:T.creamFaint, fontSize:16, marginTop:6 }}>{expandedSch===s.id?"↑":"↓"}</div>
                </div>
              </div>
            </button>
            {expandedSch===s.id && (
              <div style={{ padding:"0 18px 18px", borderTop:`1px solid ${T.navyBorder}`, paddingTop:16 }}>
                <div style={{ fontSize:14, color:T.creamDim, lineHeight:1.7, marginBottom:14 }}>{s.description}</div>
                <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:16 }}>
                  {s.gpaMin>0 ? <span style={{ fontSize:10, fontWeight:600, textTransform:"uppercase", padding:"3px 9px", borderRadius:20, background:T.navyLight, color:T.creamDim }}>GPA {s.gpaMin}+</span> : <span style={{ fontSize:10, fontWeight:600, textTransform:"uppercase", padding:"3px 9px", borderRadius:20, background:`${T.sage}15`, color:T.sage }}>No GPA minimum</span>}
                  {s.noEssay ? <span style={{ fontSize:10, fontWeight:600, textTransform:"uppercase", padding:"3px 9px", borderRadius:20, background:`${T.sage}15`, color:T.sage }}>No essay needed</span> : <span style={{ fontSize:10, fontWeight:600, textTransform:"uppercase", padding:"3px 9px", borderRadius:20, background:T.navyLight, color:T.creamDim }}>Essay required</span>}
                </div>
                <a href={s.url} target="_blank" rel="noopener noreferrer" style={{ display:"block", background:UC(s.urgency), color:"#fff", borderRadius:12, padding:"13px 18px", textAlign:"center", textDecoration:"none", fontSize:14, fontWeight:600 }}>
                  Apply Now →
                </a>
              </div>
            )}
          </div>
          );
        })}
      </div>
      {results.length>0 && (
        <div style={{ marginTop:20, background:T.navyLight, borderRadius:14, padding:16, fontSize:13, color:T.creamDim, lineHeight:1.6 }}>
          {user
            ? <>💡 <strong style={{color:T.cream}}>Tip:</strong> Tap ☆ to save a scholarship — it'll be here next time you log in.</>
            : <>💡 <strong style={{color:T.cream}}>Tip:</strong> Sign up to save scholarships and come back to them anytime.</>}
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
export default function App() {

  // ── Auth ───────────────────────────────────────────────────
  const [user, setUser] = useState(null);
  const [showAuth, setShowAuth] = useState(false);
  const [isHardGate, setIsHardGate] = useState(false);
  const [authMode, setAuthMode] = useState("signup");
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authName, setAuthName] = useState("");
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [clicks, setClicks] = useState(0);
  const FREE_CLICKS = 4;

  const gate = (fn) => () => {
    if (user) { fn(); return; }
    const next = clicks + 1;
    setClicks(next);
    if (next >= FREE_CLICKS) {
      setIsHardGate(true);
      setShowAuth(true);
      return;
    }
    fn();
  };

  const handleAuth = async () => {
    setAuthError("");
    if (authMode==="signup" && !authName.trim()) { setAuthError("Please enter your name."); return; }
    if (!authEmail.includes("@")) { setAuthError("Please enter a valid email."); return; }
    if (authPassword.length < 6) { setAuthError("Password must be at least 6 characters."); return; }
    setAuthLoading(true);

    try {
      if (authMode === "signup") {
        const res = await fetch(`${SUPABASE_URL}/auth/v1/signup`, {
          method: "POST",
          headers: { "Content-Type": "application/json", "apikey": SUPABASE_KEY },
          body: JSON.stringify({
            email: authEmail,
            password: authPassword,
            data: { name: authName.trim() },
          }),
        });
        const data = await res.json();
        if (!res.ok) {
          setAuthError(data.msg || data.error_description || "Couldn't create account. Try a different email.");
          setAuthLoading(false);
          return;
        }
        if (data.access_token) {
          // Email confirmation disabled — logged in immediately
          setUser({ id: data.user?.id, name: authName.split(" ")[0], email: authEmail, token: data.access_token });
          setShowAuth(false);
          setIsHardGate(false);
          setClicks(0);
        } else {
          // Email confirmation required
          setAuthError("");
          setAuthMode("login");
          setAuthError("Account created! Check your email to confirm, then log in.");
        }
      } else {
        // LOGIN
        const res = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
          method: "POST",
          headers: { "Content-Type": "application/json", "apikey": SUPABASE_KEY },
          body: JSON.stringify({ email: authEmail, password: authPassword }),
        });
        const data = await res.json();
        if (!res.ok) {
          setAuthError(data.error_description || data.msg || "Invalid email or password.");
          setAuthLoading(false);
          return;
        }
        const name = data.user?.user_metadata?.name || authEmail.split("@")[0];
        setUser({ id: data.user?.id, name: name.split(" ")[0], email: authEmail, token: data.access_token });
        setShowAuth(false);
        setIsHardGate(false);
        setClicks(0);
      }
    } catch (err) {
      setAuthError("Connection error. Please try again.");
    }
    setAuthLoading(false);
  };

  const handleForgotPassword = async () => {
    setAuthError("");
    if (!authEmail.includes("@")) { setAuthError("Please enter a valid email."); return; }
    setAuthLoading(true);
    try {
      const res = await fetch(`${SUPABASE_URL}/auth/v1/recover`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "apikey": SUPABASE_KEY },
        body: JSON.stringify({ email: authEmail }),
      });
      let data = null;
      try { data = await res.json(); } catch { /* empty body is fine on success */ }
      if (res.ok) {
        setAuthError("Reset link sent! Check your email.");
      } else {
        setAuthError(
          (data && (data.msg || data.error_description || data.error)) ||
          `Couldn't send reset link (error ${res.status}).`
        );
      }
    } catch (err) {
      setAuthError(`Connection error: ${err.message || "couldn't reach server"}.`);
    }
    setAuthLoading(false);
  };

  const handleContinueAsGuest = () => {
    setShowAuth(false);
    setIsHardGate(false);
    setClicks(FREE_CLICKS - 2); // give 2 more clicks
  };

  // ── App state ──────────────────────────────────────────────
  const [mode, setMode] = useState(null);
  const [screen, setScreen] = useState("home");
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [collegeQuery, setCollegeQuery] = useState("");
  const [collegeResults, setCollegeResults] = useState([]);
  const [selectedCollege, setSelectedCollege] = useState(null);
  const [searchLoading, setSearchLoading] = useState(false);
  const [decodeText, setDecodeText] = useState("");
  const [decodeResult, setDecodeResult] = useState("");
  const [decoding, setDecoding] = useState(false);
  const [votes, setVotes] = useState({});
  const [schStep, setSchStep] = useState(0);
  const [schAnswers, setSchAnswers] = useState({});
  const [expandedSch, setExpandedSch] = useState(null);
  const [savedScholarships, setSavedScholarships] = useState([]);

  // Load saved scholarships + quiz answers from Supabase on login
  useEffect(() => {
    if (!user?.token) { setSavedScholarships([]); return; }

    // Load saved scholarship bookmarks
    fetch(`${SUPABASE_URL}/rest/v1/saved_scholarships?select=scholarship_id&user_id=eq.${user.id}`, {
      headers: { "apikey": SUPABASE_KEY, "Authorization": `Bearer ${user.token}` },
    })
      .then(r => r.ok ? r.json() : [])
      .then(rows => setSavedScholarships(rows.map(r => r.scholarship_id)))
      .catch(() => {});

    // Load saved quiz answers
    fetch(`${SUPABASE_URL}/rest/v1/quiz_answers?select=answers&user_id=eq.${user.id}`, {
      headers: { "apikey": SUPABASE_KEY, "Authorization": `Bearer ${user.token}` },
    })
      .then(r => r.ok ? r.json() : [])
      .then(rows => {
        if (rows[0]?.answers) {
          setSchAnswers(rows[0].answers);
          setSchStep(SQ.length + 1); // jump straight to results
        }
      })
      .catch(() => {});
  }, [user?.id, user?.token]);

  const toggleSaveScholarship = async (scholarshipId) => {
    if (!user?.token) return;
    const isSaved = savedScholarships.includes(scholarshipId);
    if (isSaved) {
      setSavedScholarships(prev => prev.filter(id => id !== scholarshipId));
      fetch(`${SUPABASE_URL}/rest/v1/saved_scholarships?user_id=eq.${user.id}&scholarship_id=eq.${scholarshipId}`, {
        method: "DELETE",
        headers: { "apikey": SUPABASE_KEY, "Authorization": `Bearer ${user.token}` },
      }).catch(() => {});
    } else {
      setSavedScholarships(prev => [...prev, scholarshipId]);
      fetch(`${SUPABASE_URL}/rest/v1/saved_scholarships`, {
        method: "POST",
        headers: { "apikey": SUPABASE_KEY, "Authorization": `Bearer ${user.token}`, "Content-Type": "application/json", "Prefer": "return=minimal" },
        body: JSON.stringify({ user_id: user.id, scholarship_id: scholarshipId }),
      }).catch(() => {});
    }
  };

  const saveQuizAnswers = async (answers) => {
    if (!user?.token) return;
    fetch(`${SUPABASE_URL}/rest/v1/quiz_answers`, {
      method: "POST",
      headers: { "apikey": SUPABASE_KEY, "Authorization": `Bearer ${user.token}`, "Content-Type": "application/json", "Prefer": "resolution=merge-duplicates,return=minimal" },
      body: JSON.stringify({ user_id: user.id, answers }),
    }).catch(() => {});
  };

  const accent = mode==="parent" ? T.sage : T.coral;
  const accentDim = mode==="parent" ? T.sageDim : T.coralDim;
  const guide = mode==="parent" ? parentGuide : studentGuide;

  const handleCollegeSearch = async (q) => {
    setCollegeQuery(q);
    if (!q.trim()) { setCollegeResults([]); return; }
    setSearchLoading(true);
    await new Promise(r => setTimeout(r, 300));
    const filtered = COLLEGES.filter(c => c.name.toLowerCase().includes(q.toLowerCase()) || c.full.toLowerCase().includes(q.toLowerCase()));
    if (filtered.length > 0) { setCollegeResults(filtered); setSearchLoading(false); return; }
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({ model:"claude-sonnet-4-20250514", max_tokens:800, messages:[{ role:"user", content:`Return ONLY a JSON object (no markdown) for "${q}" college: {"name":"Short Name","full":"Full Official Name","deadlines":[{"date":"Mon D","title":"Deadline Name","cat":"Category","urgency":"high|medium|low"}]} — 5 real key deadlines.` }] }) });
      const data = await res.json();
      const parsed = JSON.parse(data.content?.[0]?.text?.replace(/```json|```/g,"").trim() || "{}");
      setCollegeResults(parsed.name ? [parsed] : []);
    } catch { setCollegeResults([]); }
    setSearchLoading(false);
  };

  const handleDecode = async () => {
    if (!decodeText.trim()) return;
    setDecoding(true); setDecodeResult("");
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({ model:"claude-sonnet-4-20250514", max_tokens:1000, messages:[{ role:"user", content:`You help a first-generation college ${mode==="parent"?"student's parent":"student"} understand confusing college documents. Explain in plain English using bullet points. Flag anything important with ⚠️. Be warm and direct.\n\n"${decodeText}"` }] }) });
      const data = await res.json();
      setDecodeResult(data.content?.[0]?.text || "Couldn't decode that. Try again.");
    } catch { setDecodeResult("Something went wrong. Please try again."); }
    setDecoding(false);
  };

  const getSchResults = () => {
    const { status, background, gpa, essay } = schAnswers;
    const gpaNum = parseFloat(gpa) || 0;
    return SCHOLARSHIPS.filter(s => {
      if (status && !s.status.includes(status)) return false;
      if (background && background !== "all" && !s.backgrounds.includes("all") && !s.backgrounds.includes(background)) return false;
      if (gpaNum < s.gpaMin) return false;
      if (essay === "no-essay" && !s.noEssay) return false;
      return true;
    }).sort((a,b) => b.amountNum - a.amountNum);
  };

  const handleSchAnswer = (qId, value) => {
    const newA = { ...schAnswers, [qId]: value };
    setSchAnswers(newA);
    setTimeout(() => {
      setSchStep(s => s + 1);
      if (qId === SQ[SQ.length - 1].id) saveQuizAnswers(newA);
    }, 220);
  };

  const CSS = `
    @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,700;1,500&display=swap');
    * { box-sizing:border-box; margin:0; padding:0; }
    ::-webkit-scrollbar { display:none; }
    .slide { animation:slideUp 0.3s ease; }
    @keyframes slideUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
    @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
    .fu { animation:fadeUp 0.45s ease forwards; }
    .nav-item { background:none; border:none; cursor:pointer; display:flex; flex-direction:column; align-items:center; gap:3px; padding:6px 8px; }
    input, textarea { background:${T.navyLight}; border:1px solid ${T.navyBorder}; border-radius:12px; color:${T.cream}; font-family:'DM Sans',sans-serif; font-size:14px; padding:13px 16px; width:100%; outline:none; transition:border-color 0.2s; box-sizing:border-box; }
    textarea { resize:none; }
    .btn { background:${accent}; color:#fff; border:none; border-radius:14px; padding:15px 24px; font-size:15px; font-weight:600; cursor:pointer; width:100%; font-family:'DM Sans',sans-serif; }
    .btn:disabled { opacity:0.4; cursor:not-allowed; }
    .pulse { animation:pulse 1.8s infinite; }
    @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
  `;

  // ── MODE SELECTOR ──────────────────────────────────────────
  if (!mode) return (
    <div style={{ minHeight:"100vh", background:T.navy, display:"flex", flexDirection:"column", fontFamily:"'DM Sans',sans-serif" }}>
      <style>{CSS}</style>
      <div style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"32px 24px", gap:40 }}>
        <div className="fu" style={{ textAlign:"center" }}>
          <div style={{ fontFamily:"'Playfair Display',serif", fontSize:13, letterSpacing:"0.25em", color:T.creamDim, textTransform:"uppercase", marginBottom:10 }}>Welcome to</div>
          <div style={{ fontFamily:"'Playfair Display',serif", fontSize:52, color:T.cream, lineHeight:1, marginBottom:8 }}>FirstGen</div>
          <div style={{ fontFamily:"'Playfair Display',serif", fontStyle:"italic", fontSize:18, color:T.creamDim }}>The guide they forgot to give you</div>
        </div>
        <div className="fu" style={{ width:"100%", maxWidth:360, animationDelay:"0.15s", opacity:0 }}>
          <div style={{ color:T.creamDim, fontSize:12, letterSpacing:"0.15em", textTransform:"uppercase", textAlign:"center", marginBottom:18 }}>I am a</div>
          <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
            {[
              { m:"student", icon:"🎓", title:"Student", sub:"First in my family to go to college", border:T.coral },
              { m:"parent", icon:"👨‍👩‍👧", title:"Parent", sub:"Supporting my first-gen student", border:T.sage },
            ].map(item => (
              <button key={item.m} onClick={gate(() => { setMode(item.m); setScreen("home"); })} style={{ background:T.navyMid, border:`1.5px solid ${item.border}`, borderRadius:20, padding:"22px 24px", cursor:"pointer", textAlign:"left", display:"flex", alignItems:"center", gap:18, transition:"background 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.background=`${item.border}15`}
                onMouseLeave={e => e.currentTarget.style.background=T.navyMid}
              >
                <div style={{ fontSize:34 }}>{item.icon}</div>
                <div>
                  <div style={{ fontFamily:"'Playfair Display',serif", fontSize:22, color:T.cream, marginBottom:3 }}>{item.title}</div>
                  <div style={{ fontSize:13, color:T.creamDim }}>{item.sub}</div>
                </div>
                <div style={{ marginLeft:"auto", color:item.border, fontSize:20 }}>›</div>
              </button>
            ))}
          </div>
          <div style={{ marginTop:20, display:"flex", justifyContent:"center" }}>
            <button onClick={() => { setAuthMode("login"); setShowAuth(true); setIsHardGate(false); }} style={{ background:"none", border:"none", color:T.creamDim, fontSize:13, cursor:"pointer", fontFamily:"'DM Sans',sans-serif" }}>
              Already have an account? <span style={{ color:T.coral }}>Log in</span>
            </button>
          </div>
        </div>
      </div>
      {showAuth && <AuthModal {...{authMode,setAuthMode,authEmail,setAuthEmail,authPassword,setAuthPassword,authName,setAuthName,authError,authLoading,handleAuth,handleForgotPassword,onContinueAsGuest:handleContinueAsGuest,accent:T.coral,isHardGate}} />}
    </div>
  );

  // ── MAIN APP ───────────────────────────────────────────────
  const navItems = [
    { icon:"🏠", label:"Home", s:"home" },
    { icon:"📖", label:"Guide", s:"guide" },
    { icon:"🏫", label:"Colleges", s:"colleges" },
    { icon:"🎓", label:"Scholarships", s:"scholarships" },
    { icon:"🗂️", label:"Decode", s:"decode" },
    { icon:"🙋", label:"Ask", s:"ask" },
  ];

  return (
    <div style={{ minHeight:"100vh", background:T.navy, color:T.cream, fontFamily:"'DM Sans',sans-serif", maxWidth:430, margin:"0 auto", position:"relative" }}>
      <style>{CSS}</style>

      {/* Auth modal overlay */}
      {showAuth && <AuthModal {...{authMode,setAuthMode,authEmail,setAuthEmail,authPassword,setAuthPassword,authName,setAuthName,authError,authLoading,handleAuth,handleForgotPassword,onContinueAsGuest:!isHardGate?handleContinueAsGuest:null,accent,isHardGate}} />}

      {/* Header */}
      <div style={{ padding:"16px 20px 14px", display:"flex", justifyContent:"space-between", alignItems:"center", borderBottom:`1px solid ${T.navyBorder}` }}>
        <div>
          <div style={{ fontFamily:"'Playfair Display',serif", fontSize:22, color:T.cream }}>FirstGen</div>
          <div style={{ fontSize:10, color:T.creamDim, letterSpacing:"0.12em", textTransform:"uppercase", marginTop:1 }}>{mode==="parent" ? "Parent Guide" : "Student Guide"}</div>
        </div>
        <div style={{ display:"flex", gap:8, alignItems:"center" }}>
          {user ? (
            <button onClick={() => { setUser(null); setClicks(0); }} style={{ background:accentDim, border:`1px solid ${accent}40`, borderRadius:10, color:accent, fontSize:11, fontWeight:600, padding:"6px 12px", cursor:"pointer", fontFamily:"'DM Sans',sans-serif" }} title="Tap to log out">
              👋 {user.name}
            </button>
          ) : (
            <button onClick={() => { setAuthMode("signup"); setIsHardGate(false); setShowAuth(true); }} style={{ background:accentDim, border:`1px solid ${accent}40`, borderRadius:10, color:accent, fontSize:11, fontWeight:600, padding:"6px 12px", cursor:"pointer", fontFamily:"'DM Sans',sans-serif" }}>
              Sign Up
            </button>
          )}
          <button onClick={() => { setMode(null); setScreen("home"); setSelectedTopic(null); setSelectedCollege(null); setSchStep(0); setSchAnswers({}); }} style={{ background:T.navyLight, border:`1px solid ${T.navyBorder}`, borderRadius:10, color:T.creamDim, fontSize:11, fontWeight:600, padding:"6px 12px", cursor:"pointer", fontFamily:"'DM Sans',sans-serif" }}>
            Switch
          </button>
        </div>
      </div>

      {/* Guest banner */}
      {!user && (
        <div style={{ background:`${T.coral}12`, borderBottom:`1px solid ${T.coral}25`, padding:"10px 20px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <div style={{ fontSize:12, color:T.creamDim }}>👀 Exploring as guest ({FREE_CLICKS - clicks} free clicks left)</div>
          <button onClick={() => { setAuthMode("signup"); setIsHardGate(false); setShowAuth(true); }} style={{ background:"none", border:"none", color:T.coral, fontSize:12, fontWeight:600, cursor:"pointer", fontFamily:"'DM Sans',sans-serif" }}>
            Sign up free →
          </button>
        </div>
      )}

      {/* Scrollable Content */}
      <div style={{ padding:"20px 20px 120px", overflowY:"auto", maxHeight:"calc(100vh - 130px)" }}>

        {/* ── HOME ── */}
        {screen==="home" && (
          <div className="slide">
            <div style={{ marginBottom:28 }}>
              <div style={{ fontFamily:"'Playfair Display',serif", fontSize:30, lineHeight:1.2, marginBottom:8 }}>
                {mode==="parent" ? <>Everything you need to <em style={{color:accent}}>support</em> them.</> : <>The rules they <em style={{color:accent}}>forgot</em> to tell you.</>}
              </div>
              <div style={{ color:T.creamDim, fontSize:14, lineHeight:1.6 }}>
                {mode==="parent" ? "A guide for parents navigating college alongside their first-gen student." : "What college-educated families already know — now yours too."}
              </div>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:24 }}>
              {[
                { icon:"📖", label:"Survival Guide", s:"guide", color:accent },
                { icon:"🏫", label:"College Search", s:"colleges", color:T.gold },
                { icon:"🎓", label:"Find Scholarships", s:"scholarships", color:mode==="parent"?T.coral:T.sage },
                { icon:"🗂️", label:"Decode a Letter", s:"decode", color:T.creamDim },
              ].map(t => (
                <button key={t.s} onClick={gate(() => setScreen(t.s))} style={{ background:T.navyMid, border:`1px solid ${t.color}30`, borderRadius:18, padding:"20px 16px", cursor:"pointer", textAlign:"left", transition:"border-color 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.borderColor=`${t.color}70`}
                  onMouseLeave={e => e.currentTarget.style.borderColor=`${t.color}30`}
                >
                  <div style={{ fontSize:26, marginBottom:10 }}>{t.icon}</div>
                  <div style={{ color:T.cream, fontSize:13, fontWeight:600 }}>{t.label}</div>
                </button>
              ))}
            </div>
            <div style={{ background:T.navyMid, border:`1px solid ${T.navyBorder}`, borderRadius:18, padding:20, borderLeft:`3px solid ${accent}` }}>
              <div style={{ fontSize:10, fontWeight:600, letterSpacing:"0.1em", textTransform:"uppercase", padding:"3px 9px", borderRadius:20, background:accentDim, color:accent, display:"inline-block", marginBottom:10 }}>{mode==="parent"?"👋 For Parents":"💡 Did You Know"}</div>
              <div style={{ fontSize:14, lineHeight:1.7, color:T.creamDim }}>
                {mode==="parent" ? <>FERPA means your student's school <strong style={{color:T.cream}}>cannot share grades with you</strong> without their written consent.</> : <>You can <strong style={{color:T.cream}}>appeal your financial aid package</strong> — most students don't know this. One email can get you more money.</>}
              </div>
            </div>
            <div style={{ marginTop:16, background:T.navyLight, borderRadius:18, padding:20, textAlign:"center" }}>
              <div style={{ fontFamily:"'Playfair Display',serif", fontSize:44, color:accent }}>{mode==="parent"?"1 in 3":"89%"}</div>
              <div style={{ color:T.creamDim, fontSize:13, marginTop:6, lineHeight:1.5 }}>{mode==="parent"?"college students today are the first in their family to attend.":"of first-gen students say nobody explained how college actually works."}</div>
            </div>
          </div>
        )}

        {/* ── GUIDE ── */}
        {screen==="guide" && !selectedTopic && (
          <div className="slide">
            <div style={{ fontFamily:"'Playfair Display',serif", fontSize:26, marginBottom:4 }}>{mode==="parent"?"Parent Guide":"Survival Guide"}</div>
            <div style={{ color:T.creamDim, fontSize:13, marginBottom:20 }}>{mode==="parent"?"How to help without overstepping":"The unwritten rules of college life"}</div>
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {guide.map((t,i) => (
                <button key={i} onClick={gate(() => setSelectedTopic(t))} style={{ background:T.navyMid, border:`1px solid ${T.navyBorder}`, borderRadius:16, padding:16, cursor:"pointer", textAlign:"left", display:"flex", alignItems:"center", gap:14, transition:"border-color 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.borderColor=`${t.color}60`}
                  onMouseLeave={e => e.currentTarget.style.borderColor=T.navyBorder}
                >
                  <div style={{ fontSize:24, width:46, height:46, background:`${t.color}15`, borderRadius:12, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>{t.emoji}</div>
                  <div style={{ flex:1 }}>
                    <div style={{ color:T.cream, fontSize:14, fontWeight:600, marginBottom:5 }}>{t.title}</div>
                    <span style={{ fontSize:10, fontWeight:600, letterSpacing:"0.1em", textTransform:"uppercase", padding:"3px 9px", borderRadius:20, background:`${t.color}18`, color:t.color }}>{t.tag}</span>
                  </div>
                  <div style={{ color:T.creamFaint, fontSize:18 }}>›</div>
                </button>
              ))}
            </div>
          </div>
        )}
        {screen==="guide" && selectedTopic && (
          <div className="slide">
            <button onClick={() => setSelectedTopic(null)} style={{ background:"none", border:"none", color:accent, cursor:"pointer", fontSize:14, marginBottom:18, padding:0 }}>← Back</button>
            <div style={{ fontSize:38, marginBottom:10 }}>{selectedTopic.emoji}</div>
            <div style={{ fontFamily:"'Playfair Display',serif", fontSize:24, marginBottom:8 }}>{selectedTopic.title}</div>
            <span style={{ fontSize:10, fontWeight:600, letterSpacing:"0.1em", textTransform:"uppercase", padding:"3px 9px", borderRadius:20, background:`${selectedTopic.color}18`, color:selectedTopic.color, marginBottom:22, display:"inline-block" }}>{selectedTopic.tag}</span>
            <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:20 }}>
              {selectedTopic.steps.map((s,i) => (
                <div key={i} style={{ background:T.navyMid, border:`1px solid ${T.navyBorder}`, borderRadius:12, padding:"14px 16px", fontSize:14, lineHeight:1.6, color:T.creamDim, display:"flex", gap:12 }}>
                  <span style={{ color:selectedTopic.color, fontWeight:700, flexShrink:0 }}>→</span><span>{s}</span>
                </div>
              ))}
            </div>
            {selectedTopic.example && (
              <div style={{ background:"#0A0D18", border:`1px solid ${selectedTopic.color}35`, borderRadius:14, padding:18 }}>
                <div style={{ fontSize:10, fontWeight:600, letterSpacing:"0.1em", textTransform:"uppercase", padding:"3px 9px", borderRadius:20, background:`${selectedTopic.color}18`, color:selectedTopic.color, display:"inline-block", marginBottom:12 }}>Example Email</div>
                <div style={{ fontSize:13, color:"#AAA", lineHeight:1.8, whiteSpace:"pre-wrap", fontFamily:"monospace" }}>{selectedTopic.example}</div>
              </div>
            )}
          </div>
        )}

        {/* ── COLLEGES ── */}
        {screen==="colleges" && !selectedCollege && (
          <div className="slide">
            <div style={{ fontFamily:"'Playfair Display',serif", fontSize:26, marginBottom:4 }}>College Deadlines</div>
            <div style={{ color:T.creamDim, fontSize:13, marginBottom:20 }}>Search your school and never miss a date</div>
            <div style={{ position:"relative", marginBottom:8 }}>
              <input placeholder="Search a college or university..." value={collegeQuery} onChange={e => handleCollegeSearch(e.target.value)} style={{ paddingLeft:44 }} />
              <div style={{ position:"absolute", left:14, top:"50%", transform:"translateY(-50%)", fontSize:18, pointerEvents:"none" }}>🔍</div>
            </div>
            {searchLoading && <div style={{ textAlign:"center", padding:20, color:T.creamDim }} className="pulse">Looking up deadlines...</div>}
            {collegeResults.length>0 && (
              <div style={{ background:T.navyMid, border:`1px solid ${T.navyBorder}`, borderRadius:14, overflow:"hidden", marginBottom:16 }}>
                {collegeResults.map((c,i) => (
                  <button key={i} onClick={gate(() => { setSelectedCollege(c); setCollegeQuery(""); setCollegeResults([]); })} style={{ background:"none", border:"none", width:"100%", padding:"14px 18px", textAlign:"left", cursor:"pointer", borderBottom:i<collegeResults.length-1?`1px solid ${T.navyBorder}`:"none", display:"flex", gap:12, alignItems:"center" }}>
                    <div style={{ fontSize:22 }}>🏫</div>
                    <div><div style={{ color:T.cream, fontSize:14, fontWeight:600 }}>{c.name}</div><div style={{ color:T.creamDim, fontSize:12 }}>{c.full}</div></div>
                    <div style={{ marginLeft:"auto", color:T.creamFaint }}>›</div>
                  </button>
                ))}
              </div>
            )}
            <div style={{ color:T.creamDim, fontSize:11, letterSpacing:"0.12em", textTransform:"uppercase", marginBottom:12, marginTop:8 }}>Quick picks</div>
            <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
              {COLLEGES.map((c,i) => (
                <button key={i} onClick={gate(() => setSelectedCollege(c))} style={{ background:T.navyMid, border:`1px solid ${T.navyBorder}`, borderRadius:10, color:T.creamDim, fontSize:13, padding:"8px 14px", cursor:"pointer", transition:"all 0.15s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor=`${accent}60`; e.currentTarget.style.color=T.cream; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor=T.navyBorder; e.currentTarget.style.color=T.creamDim; }}
                >{c.name}</button>
              ))}
            </div>
          </div>
        )}
        {screen==="colleges" && selectedCollege && (
          <div className="slide">
            <button onClick={() => setSelectedCollege(null)} style={{ background:"none", border:"none", color:accent, cursor:"pointer", fontSize:14, marginBottom:18, padding:0 }}>← Back</button>
            <div style={{ fontFamily:"'Playfair Display',serif", fontSize:24, marginBottom:4 }}>{selectedCollege.name}</div>
            <div style={{ color:T.creamDim, fontSize:13, marginBottom:22 }}>{selectedCollege.full}</div>
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {selectedCollege.deadlines.map((d,i) => (
                <div key={i} style={{ background:T.navyMid, border:`1px solid ${T.navyBorder}`, borderRadius:18, padding:16, display:"flex", gap:14, alignItems:"flex-start" }}>
                  <div style={{ background:`${UC(d.urgency)}18`, color:UC(d.urgency), borderRadius:10, padding:"8px 10px", fontSize:11, fontWeight:700, flexShrink:0, textAlign:"center", lineHeight:1.4, minWidth:44 }}>
                    {d.date.split(" ")[0]}<br />{d.date.split(" ")[1]||""}
                  </div>
                  <div>
                    <div style={{ fontSize:14, fontWeight:600, marginBottom:6, color:T.cream }}>{d.title}</div>
                    <span style={{ fontSize:11, fontWeight:600, letterSpacing:"0.08em", textTransform:"uppercase", padding:"4px 10px", borderRadius:20, background:`${UC(d.urgency)}15`, color:UC(d.urgency) }}>{d.cat}</span>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop:16, background:T.navyLight, borderRadius:14, padding:16, fontSize:13, color:T.creamDim, lineHeight:1.6 }}>
              ⚠️ Deadlines vary year to year. Always confirm on your college's official website.
            </div>
          </div>
        )}

        {/* ── SCHOLARSHIPS ── */}
        {screen==="scholarships" && schStep===0 && (
          <div className="slide">
            <div style={{ fontSize:40, marginBottom:16 }}>🎓</div>
            <div style={{ fontFamily:"'Playfair Display',serif", fontSize:28, lineHeight:1.2, marginBottom:10 }}>
              Find scholarships<br /><em style={{ color:accent }}>you actually qualify for.</em>
            </div>
            <div style={{ color:T.creamDim, fontSize:14, lineHeight:1.7, marginBottom:28 }}>
              Real, verified scholarships — not fake listings. Answer 4 quick questions and we'll match you with the ones worth your time.
            </div>
            <button onClick={gate(() => setSchStep(1))} style={{ background:accent, color:"#fff", border:"none", borderRadius:14, padding:"15px 24px", fontSize:15, fontWeight:600, cursor:"pointer", width:"100%", fontFamily:"'DM Sans',sans-serif" }}>
              Find My Scholarships →
            </button>
            <div style={{ marginTop:14, textAlign:"center", color:T.creamFaint, fontSize:12 }}>{SCHOLARSHIPS.length} verified scholarships in our database</div>
          </div>
        )}
        {screen==="scholarships" && schStep>=1 && schStep<=SQ.length && (
          <div className="slide" key={schStep}>
            <div style={{ display:"flex", gap:6, marginBottom:28 }}>
              {SQ.map((_,i) => <div key={i} style={{ height:3, flex:1, borderRadius:2, background:i<schStep?accent:T.navyBorder, transition:"background 0.3s" }} />)}
            </div>
            <div style={{ color:T.creamDim, fontSize:12, letterSpacing:"0.15em", textTransform:"uppercase", marginBottom:10 }}>Question {schStep} of {SQ.length}</div>
            <div style={{ fontFamily:"'Playfair Display',serif", fontSize:24, marginBottom:26, lineHeight:1.3 }}>{SQ[schStep-1].label}</div>
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {SQ[schStep-1].options.map(opt => (
                <button key={opt.value} onClick={() => handleSchAnswer(SQ[schStep-1].id, opt.value)} style={{ background:schAnswers[SQ[schStep-1].id]===opt.value?`${accent}20`:T.navyMid, border:`1.5px solid ${schAnswers[SQ[schStep-1].id]===opt.value?accent:T.navyBorder}`, borderRadius:14, padding:"16px 18px", cursor:"pointer", textAlign:"left", color:T.cream, fontSize:14, fontWeight:500, fontFamily:"'DM Sans',sans-serif", transition:"all 0.15s" }}>
                  {opt.label}
                </button>
              ))}
            </div>
            {schStep>1 && <button onClick={() => setSchStep(s=>s-1)} style={{ background:"none", border:"none", color:T.creamDim, cursor:"pointer", fontSize:13, marginTop:18, padding:0, fontFamily:"'DM Sans',sans-serif" }}>← Back</button>}
          </div>
        )}
        {screen==="scholarships" && schStep > SQ.length && (
          <ScholarshipResults results={getSchResults()} expandedSch={expandedSch} setExpandedSch={setExpandedSch} onReset={() => { setSchStep(0); setSchAnswers({}); setExpandedSch(null); }} accent={accent} savedScholarships={savedScholarships} toggleSaveScholarship={toggleSaveScholarship} user={user} onRequireAuth={() => { setAuthMode("signup"); setIsHardGate(true); setShowAuth(true); }} />
        )}

        {/* ── DECODE ── */}
        {screen==="decode" && (
          <div className="slide">
            <div style={{ fontFamily:"'Playfair Display',serif", fontSize:26, marginBottom:4 }}>Decode a Letter</div>
            <div style={{ color:T.creamDim, fontSize:13, marginBottom:20 }}>Paste any financial aid letter, tuition bill, or confusing school email</div>
            <textarea rows={6} placeholder="Paste the confusing text here..." value={decodeText} onChange={e => setDecodeText(e.target.value)} style={{ marginBottom:12 }} />
            <button style={{ background:accent, color:"#fff", border:"none", borderRadius:14, padding:"15px 24px", fontSize:15, fontWeight:600, cursor:"pointer", width:"100%", fontFamily:"'DM Sans',sans-serif", opacity:decoding||!decodeText.trim()?0.4:1 }} onClick={handleDecode} disabled={decoding||!decodeText.trim()}>
              {decoding ? "Decoding..." : "Explain This to Me"}
            </button>
            {decoding && <div style={{ textAlign:"center", padding:32, color:T.creamDim }}><div className="pulse" style={{ fontSize:32, marginBottom:8 }}>🧠</div><div style={{ fontSize:13 }}>Breaking it down...</div></div>}
            {decodeResult && (
              <div style={{ marginTop:20, background:T.navyMid, border:`1px solid ${accent}35`, borderRadius:16, padding:20 }}>
                <div style={{ fontSize:10, fontWeight:600, letterSpacing:"0.1em", textTransform:"uppercase", padding:"3px 9px", borderRadius:20, background:accentDim, color:accent, display:"inline-block", marginBottom:14 }}>Plain English</div>
                <div style={{ fontSize:14, lineHeight:1.8, color:T.creamDim, whiteSpace:"pre-wrap" }}>{decodeResult}</div>
              </div>
            )}
          </div>
        )}

        {/* ── ASK ── */}
        {screen==="ask" && (
          <div className="slide">
            <div style={{ fontFamily:"'Playfair Display',serif", fontSize:26, marginBottom:4 }}>Ask Anything</div>
            <div style={{ color:T.creamDim, fontSize:13, marginBottom:20 }}>No dumb questions. Real answers from people who've been through it.</div>
            <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
              {anonQuestions.map((item,i) => (
                <div key={i} style={{ background:T.navyMid, border:`1px solid ${T.navyBorder}`, borderRadius:18, padding:18 }}>
                  <div style={{ fontSize:14, fontWeight:600, marginBottom:10, color:T.cream, lineHeight:1.5 }}>❓ {item.q}</div>
                  <div style={{ fontSize:13, color:T.creamDim, lineHeight:1.7, marginBottom:14, paddingLeft:14, borderLeft:`2px solid ${accent}` }}>{item.a}</div>
                  <button onClick={gate(() => setVotes(v => ({...v,[i]:true})))} style={{ background:votes[i]?accentDim:T.navyLight, border:`1px solid ${votes[i]?accent:T.navyBorder}`, borderRadius:8, color:votes[i]?accent:T.creamDim, fontSize:12, padding:"7px 14px", cursor:"pointer", fontFamily:"'DM Sans',sans-serif" }}>
                    {votes[i]?"✓ Helpful":"👍 This helped"} · {item.votes+(votes[i]?1:0)}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Bottom Nav */}
      <div style={{ position:"fixed", bottom:0, left:"50%", transform:"translateX(-50%)", width:"100%", maxWidth:430, background:T.navy, borderTop:`1px solid ${T.navyBorder}`, display:"flex", justifyContent:"space-around", padding:"10px 0 18px" }}>
        {navItems.map(n => (
          <button key={n.s} className="nav-item" onClick={gate(() => { setScreen(n.s); setSelectedTopic(null); setSelectedCollege(null); })}>
            <span style={{ fontSize:20 }}>{n.icon}</span>
            <span style={{ fontSize:8, color:screen===n.s?accent:T.creamFaint, fontWeight:screen===n.s?600:400, letterSpacing:"0.04em" }}>{n.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
