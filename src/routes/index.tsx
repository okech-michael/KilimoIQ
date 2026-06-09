import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import logo from "@/assets/logo.png";
import hero from "@/assets/hero.jpg";
import fields from "@/assets/fields.jpg";
import quality from "@/assets/quality.jpg";
import farmer from "@/assets/farmer.jpg";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import {
  Sparkles, CloudSun, LineChart, Store, MessageCircle, Smartphone, ShieldCheck,
  Leaf, TrendingUp, AlertTriangle, Cpu, Globe, Zap, Phone, Mail, ArrowRight,
  CheckCircle2, BarChart3, Droplets, Sun, Wind, Bot, Send, MapPin, Users,
  Building2, HandCoins, Target, Network, Menu, X,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "KilimoIQ — The Intelligence Layer Powering Africa's Agriculture" },
      { name: "description", content: "AI-powered quality analysis, weather intelligence, market forecasting and digital marketplace for African farmers, buyers, agribusinesses and governments." },
      { property: "og:title", content: "KilimoIQ — Smart Quality. Smart Markets. Smart Agriculture." },
      { property: "og:description", content: "The unified AI platform transforming agriculture across Africa." },
      { property: "og:image", content: hero },
    ],
  }),
  component: Landing,
});

/* ---------- Hooks & helpers ---------- */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("in")),
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const on = () => setY(window.scrollY);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return y;
}

function Counter({ to, suffix = "", duration = 1800 }: { to: number; suffix?: string; duration?: number }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (t: number) => {
            const p = Math.min(1, (t - start) / duration);
            const eased = 1 - Math.pow(1 - p, 3);
            setN(Math.round(to * eased));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      });
    }, { threshold: 0.3 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [to, duration]);
  return <span ref={ref}>{n.toLocaleString()}{suffix}</span>;
}

/* ---------- Demo Form Modal ---------- */
function DemoModal({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const [submitting, setSubmitting] = useState(false);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[560px] bg-surface border-border">
        <DialogHeader>
          <DialogTitle className="text-2xl font-display">Request a Live Demo</DialogTitle>
          <DialogDescription>
            Tell us a bit about you. Our team will reach out within 24 hours to schedule your KilimoIQ demonstration.
          </DialogDescription>
        </DialogHeader>
        <form
          className="grid gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitting(true);
            setTimeout(() => {
              setSubmitting(false);
              onOpenChange(false);
              toast.success("Thank you. Our team will contact you shortly to schedule a live KilimoIQ demonstration.");
            }, 900);
          }}
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="grid gap-1.5"><Label htmlFor="n">Full name</Label><Input id="n" required /></div>
            <div className="grid gap-1.5"><Label htmlFor="o">Organization</Label><Input id="o" /></div>
            <div className="grid gap-1.5"><Label htmlFor="e">Email</Label><Input id="e" type="email" required /></div>
            <div className="grid gap-1.5"><Label htmlFor="p">Phone</Label><Input id="p" type="tel" /></div>
            <div className="grid gap-1.5"><Label htmlFor="c">Country</Label><Input id="c" placeholder="Kenya" /></div>
            <div className="grid gap-1.5">
              <Label>User type</Label>
              <Select>
                <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent>
                  {["Farmer","Buyer","Government","NGO","Investor","Agribusiness","Cooperative"].map(t =>
                    <SelectItem key={t} value={t}>{t}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid gap-1.5"><Label htmlFor="m">Message</Label><Textarea id="m" rows={3} placeholder="What would you like to see in the demo?" /></div>
          <DialogFooter>
            <Button type="submit" disabled={submitting} className="bg-primary hover:bg-primary/90 text-primary-foreground glow-green">
              {submitting ? "Sending..." : <>Request Demo <ArrowRight className="ml-1 size-4" /></>}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

/* ---------- Sections ---------- */
function Nav({ onDemo }: { onDemo: () => void }) {
  const y = useScrollY();
  const [menu, setMenu] = useState(false);
  const scrolled = y > 24;
  const links = [
    { h: "#problem", t: "Problem" },
    { h: "#solution", t: "Solution" },
    { h: "#features", t: "Features" },
    { h: "#impact", t: "Impact" },
    { h: "#roadmap", t: "Roadmap" },
    { h: "#partners", t: "Partners" },
  ];
  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? "py-3" : "py-5"}`}>
      <div className={`mx-auto max-w-7xl px-4 sm:px-6 flex items-center justify-between transition-all ${scrolled ? "glass rounded-2xl" : ""}`}>
        <a href="#top" className="flex items-center gap-2 py-2 px-2">
          <img src={logo} alt="KilimoIQ" className="size-9" width={36} height={36} />
          <span className="text-lg font-display font-bold tracking-tight">KilimoIQ</span>
        </a>
        <nav className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
          {links.map(l => <a key={l.h} href={l.h} className="hover:text-foreground transition">{l.t}</a>)}
        </nav>
        <div className="hidden md:flex items-center gap-2">
          <Button variant="ghost" onClick={() => location.href = "tel:0741145911"}>Talk to us</Button>
          <Button onClick={onDemo} className="bg-primary hover:bg-primary/90 text-primary-foreground">Request Demo</Button>
        </div>
        <button className="md:hidden p-2" aria-label="Menu" onClick={() => setMenu(v => !v)}>
          {menu ? <X /> : <Menu />}
        </button>
      </div>
      {menu && (
        <div className="md:hidden mx-4 mt-2 glass rounded-2xl p-4 flex flex-col gap-3">
          {links.map(l => <a key={l.h} href={l.h} onClick={() => setMenu(false)} className="py-1">{l.t}</a>)}
          <Button onClick={() => { setMenu(false); onDemo(); }} className="bg-primary text-primary-foreground">Request Demo</Button>
        </div>
      )}
    </header>
  );
}

function Hero({ onDemo }: { onDemo: () => void }) {
  const y = useScrollY();
  const scale = 1 + Math.min(y / 1400, 0.25);
  const translate = Math.min(y * 0.25, 120);
  return (
    <section id="top" className="relative pt-36 pb-24 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-32 -right-32 size-[600px] rounded-full bg-primary/20 blur-[140px]" />
        <div className="absolute top-1/2 -left-32 size-[500px] rounded-full bg-orange-glow/20 blur-[120px]" />
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 grid lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-6 animate-rise">
          <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1.5 text-xs text-muted-foreground mb-6">
            <span className="size-1.5 rounded-full bg-orange-glow animate-pulse" />
            Now live in Kenya · Expanding across East Africa
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.02] tracking-tight">
            The <span className="text-gradient-hero">Intelligence Layer</span> Powering Africa's Agriculture
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-xl">
            KilimoIQ unifies AI quality assessment, weather forecasting, market intelligence and digital commerce
            into one platform — helping farmers, buyers, agribusinesses and governments make smarter decisions.
          </p>
          <p className="mt-3 text-sm text-muted-foreground/80 max-w-xl">
            From crop quality verification to price forecasting and climate intelligence — increase productivity,
            reduce losses, improve market access, and strengthen food security across Africa.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg" onClick={onDemo} className="bg-primary hover:bg-primary/90 text-primary-foreground glow-green h-12 px-6">
              Request a Demo <ArrowRight className="ml-1 size-4" />
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-6 border-border bg-surface/40" onClick={() => location.href = "tel:0741145911"}>
              Talk to Our Team
            </Button>
          </div>
          <div className="mt-10 flex items-center gap-6 text-xs text-muted-foreground">
            <div className="flex items-center gap-2"><ShieldCheck className="size-4 text-primary" /> Built for scale</div>
            <div className="flex items-center gap-2"><Globe className="size-4 text-harvest" /> Pan-African ready</div>
            <div className="flex items-center gap-2"><Zap className="size-4 text-orange-glow" /> Realtime AI</div>
          </div>
        </div>

        <div className="lg:col-span-6 relative">
          <div
            className="relative aspect-[16/11] rounded-3xl overflow-hidden glass glow-green grain"
            style={{ transform: `scale(${scale}) translateY(-${translate * 0.1}px)`, transition: "transform 80ms linear" }}
          >
            <img src={hero} alt="African farmer using KilimoIQ AI" className="absolute inset-0 size-full object-cover" width={1600} height={1024} />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
            {/* Floating cards */}
            <div className="absolute top-5 left-5 glass rounded-2xl p-3 animate-float">
              <div className="flex items-center gap-2 text-xs"><Leaf className="size-4 text-primary" /> Quality grade</div>
              <div className="text-2xl font-display font-bold text-gradient-green">A+ · 94</div>
            </div>
            <div className="absolute bottom-6 right-5 glass rounded-2xl p-3 animate-float" style={{ animationDelay: "1s" }}>
              <div className="flex items-center gap-2 text-xs"><CloudSun className="size-4 text-harvest" /> Rain in 36h</div>
              <div className="text-xs text-muted-foreground">Plant within 24h window</div>
            </div>
            <div className="absolute bottom-6 left-5 glass rounded-2xl p-3 animate-float" style={{ animationDelay: "2s" }}>
              <div className="flex items-center gap-2 text-xs"><TrendingUp className="size-4 text-orange-glow" /> Maize +12% wk</div>
              <div className="text-xs text-muted-foreground">Nairobi market</div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 mt-20 grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { n: 5000, s: "+", l: "Farmers Empowered" },
          { n: 12000, s: "+", l: "Market Listings" },
          { n: 25000, s: "+", l: "AI Quality Assessments" },
          { n: 15000, s: "+", l: "Weather Intelligence Reports" },
        ].map((s, i) => (
          <div key={i} className="glass rounded-2xl p-6 reveal grain">
            <div className="text-3xl sm:text-4xl font-display font-bold text-gradient-green">
              <Counter to={s.n} suffix={s.s} />
            </div>
            <div className="mt-1 text-sm text-muted-foreground">{s.l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function SectionHeading({ eyebrow, title, sub }: { eyebrow: string; title: React.ReactNode; sub?: string }) {
  return (
    <div className="max-w-3xl reveal">
      <div className="text-xs uppercase tracking-[0.2em] text-orange-glow mb-3">{eyebrow}</div>
      <h2 className="text-4xl sm:text-5xl font-bold leading-[1.05]">{title}</h2>
      {sub && <p className="mt-4 text-muted-foreground text-lg">{sub}</p>}
    </div>
  );
}

function Problem() {
  const items = [
    { i: AlertTriangle, t: "Post-harvest losses", d: "Up to 40% of African harvests are lost before reaching markets due to poor storage, handling and quality info." },
    { i: LineChart, t: "Market uncertainty", d: "Farmers sell blind. Brokers exploit information asymmetry. Real prices never reach the farm gate." },
    { i: CloudSun, t: "Unpredictable weather", d: "Climate volatility destroys yields. Most farmers operate without reliable, local forecasts." },
    { i: ShieldCheck, t: "Poor quality verification", d: "Buyers can't trust grading. Premium producers can't prove value. Trade breaks down." },
    { i: Network, t: "Fragmented relationships", d: "Buyers and sellers are scattered across informal channels with no transparent matching." },
    { i: Bot, t: "Limited expertise access", d: "Extension officers are scarce. Farmers need an expert in their pocket, 24/7." },
  ];
  return (
    <section id="problem" className="relative py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="The Problem"
          title={<>Agriculture feeds Africa. <span className="text-gradient-hero">Yet farmers still lack intelligence.</span></>}
          sub="Africa holds 60% of the world's uncultivated arable land — but smallholder farmers operate without the tools to compete, plan or scale."
        />
        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((it, i) => (
            <div key={i} className="reveal glass rounded-2xl p-6 hover:-translate-y-1 transition-transform duration-500 grain group">
              <div className="size-11 rounded-xl bg-orange-glow/10 border border-orange-glow/30 flex items-center justify-center text-orange-glow mb-4 group-hover:bg-orange-glow/20 transition">
                <it.i className="size-5" />
              </div>
              <h3 className="text-xl font-semibold">{it.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{it.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Solution() {
  const features = [
    { i: Sparkles, t: "AI Quality Analysis", d: "Instant grade, score, defects and price estimation from a single photo." },
    { i: CloudSun, t: "Weather Intelligence", d: "Hyperlocal rainfall, temperature and risk alerts tied to actions." },
    { i: LineChart, t: "Market Intelligence", d: "Demand, supply and price forecasts across regional markets." },
    { i: Store, t: "Smart Marketplace", d: "Direct buyer-seller listings with verified quality and pricing." },
    { i: MessageCircle, t: "Buyer-Seller Negotiation", d: "Built-in messaging and offer flows that close deals faster." },
    { i: Bot, t: "AI Farming Assistant", d: "Agronomy expertise on demand — in English, Swahili and local languages." },
    { i: Smartphone, t: "SMS & USSD Access", d: "Reach every farmer — connected or not — with feature-phone access." },
  ];
  return (
    <section id="solution" className="relative py-28">
      <div className="absolute inset-0 -z-10 opacity-40">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 size-[700px] rounded-full bg-primary/20 blur-[160px]" />
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="The Solution"
          title={<>One platform. <span className="text-gradient-green">Every farming decision.</span></>}
          sub="KilimoIQ stitches together the data, intelligence and commerce layers that African agriculture has always needed — into a single, unified ecosystem."
        />
        <div id="features" className="mt-14 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((f, i) => (
            <div key={i} className={`reveal glass rounded-2xl p-6 grain ${i === 0 ? "lg:col-span-2" : ""}`}>
              <div className="size-11 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center text-primary mb-4">
                <f.i className="size-5" />
              </div>
              <h3 className="text-lg font-semibold">{f.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function QualityAI() {
  return (
    <section className="relative py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 grid lg:grid-cols-2 gap-12 items-center">
        <div className="reveal">
          <SectionHeading
            eyebrow="AI Quality Analysis"
            title={<>Know the value of your produce <span className="text-gradient-hero">instantly.</span></>}
            sub="Upload a single photo. Our vision models return commercial-grade results in under 3 seconds — calibrated to East African crop varieties."
          />
          <ul className="mt-8 grid sm:grid-cols-2 gap-3 text-sm">
            {["Quality grade","Quality score","Defect detection","Market readiness","Estimated shelf life","Price estimation"].map(x => (
              <li key={x} className="flex items-center gap-2"><CheckCircle2 className="size-4 text-primary" /> {x}</li>
            ))}
          </ul>
        </div>
        <div className="relative reveal">
          <div className="relative aspect-square rounded-3xl overflow-hidden glass glow-green grain">
            <img src={quality} alt="AI scanning crop" className="absolute inset-0 size-full object-cover" loading="lazy" width={1200} height={1200} />
            <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-harvest to-transparent animate-scan" />
            <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
              <div className="glass rounded-xl px-3 py-2 text-xs">Scanning · Maize lot #A24</div>
              <div className="glass rounded-xl px-3 py-2 text-xs text-orange-glow">LIVE</div>
            </div>
            <div className="absolute bottom-4 left-4 right-4 grid grid-cols-3 gap-2">
              {[{l:"Grade",v:"A+"},{l:"Score",v:"94/100"},{l:"Est. KES/kg",v:"58"}].map(x => (
                <div key={x.l} className="glass rounded-xl p-3 text-center">
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{x.l}</div>
                  <div className="text-lg font-display font-bold text-gradient-green">{x.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Weather() {
  const days = [
    { d: "Mon", i: Sun, t: "28°", r: "0mm" },
    { d: "Tue", i: CloudSun, t: "26°", r: "2mm" },
    { d: "Wed", i: Droplets, t: "23°", r: "18mm" },
    { d: "Thu", i: Droplets, t: "22°", r: "24mm" },
    { d: "Fri", i: CloudSun, t: "25°", r: "5mm" },
    { d: "Sat", i: Sun, t: "29°", r: "0mm" },
    { d: "Sun", i: Wind, t: "27°", r: "1mm" },
  ];
  return (
    <section className="relative py-28 bg-surface/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 grid lg:grid-cols-2 gap-12 items-center">
        <div className="relative reveal order-2 lg:order-1">
          <div className="glass rounded-3xl p-6 grain">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-xs text-muted-foreground">7-day forecast · Nakuru</div>
                <div className="text-xl font-display font-bold">Plant before Wednesday</div>
              </div>
              <div className="glass rounded-full px-3 py-1 text-xs text-harvest">High confidence</div>
            </div>
            <div className="grid grid-cols-7 gap-2">
              {days.map(d => (
                <div key={d.d} className="rounded-xl bg-background/60 border border-border p-3 text-center">
                  <div className="text-[10px] text-muted-foreground">{d.d}</div>
                  <d.i className="mx-auto my-2 size-5 text-harvest" />
                  <div className="text-sm font-semibold">{d.t}</div>
                  <div className="text-[10px] text-primary">{d.r}</div>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-xl bg-orange-glow/10 border border-orange-glow/30 p-3 text-sm flex items-start gap-2">
              <AlertTriangle className="size-4 text-orange-glow mt-0.5" />
              Heavy rainfall expected Wed–Thu. Recommended: complete top-dressing by Tue evening; delay fungicide spray to Fri.
            </div>
          </div>
        </div>
        <div className="reveal order-1 lg:order-2">
          <SectionHeading
            eyebrow="Weather Intelligence"
            title={<>Turn weather into <span className="text-gradient-green">an advantage.</span></>}
            sub="Hyperlocal forecasts tied to specific agricultural actions — not just numbers, but the right move at the right time."
          />
          <div className="mt-6 grid sm:grid-cols-2 gap-3 text-sm">
            {["Rainfall forecasts","Temperature trends","Crop-specific recommendations","Risk alerts","Pest & disease windows","Irrigation planning"].map(x =>
              <div key={x} className="flex items-center gap-2"><CheckCircle2 className="size-4 text-primary" /> {x}</div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Market() {
  const bars = [42, 55, 48, 63, 70, 65, 78, 82, 76, 88, 92, 95];
  return (
    <section className="relative py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 grid lg:grid-cols-2 gap-12 items-center">
        <div className="reveal">
          <SectionHeading
            eyebrow="Market Intelligence"
            title={<>Sell smarter. <span className="text-gradient-hero">Buy smarter.</span></>}
            sub="Real-time market signals across counties and crops. Farmers price with confidence, buyers source with insight."
          />
          <div className="mt-8 grid grid-cols-3 gap-3">
            {[{l:"Avg uplift",v:"+23%"},{l:"Markets tracked",v:"48"},{l:"Forecast accuracy",v:"91%"}].map(x => (
              <div key={x.l} className="glass rounded-xl p-4">
                <div className="text-2xl font-display font-bold text-gradient-green">{x.v}</div>
                <div className="text-xs text-muted-foreground">{x.l}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="reveal">
          <div className="glass rounded-3xl p-6 grain">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="text-xs text-muted-foreground">Maize · 12-week trend</div>
                <div className="text-xl font-display font-bold">KES 52 → 64 / kg</div>
              </div>
              <BarChart3 className="size-5 text-primary" />
            </div>
            <div className="flex items-end gap-2 h-44">
              {bars.map((b, i) => (
                <div key={i} className="flex-1 rounded-t-lg bg-gradient-to-t from-primary/40 to-harvest shimmer" style={{ height: `${b}%` }} />
              ))}
            </div>
            <div className="mt-4 grid grid-cols-3 text-xs text-muted-foreground">
              <div>Demand <span className="text-foreground font-semibold">High</span></div>
              <div>Supply <span className="text-foreground font-semibold">Tight</span></div>
              <div>Recommendation <span className="text-harvest font-semibold">Hold 7 days</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Marketplace() {
  const items = [
    { c: "Maize · Grade A", q: "5,200 kg · Kitale", p: "KES 58/kg", img: fields },
    { c: "Tomatoes · Premium", q: "1,400 kg · Naivasha", p: "KES 95/kg", img: quality },
    { c: "Avocado · Hass", q: "3,800 kg · Murang'a", p: "KES 120/kg", img: hero },
  ];
  return (
    <section className="relative py-28 bg-surface/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Digital Marketplace"
          title={<>Connecting farmers <span className="text-gradient-green">directly to buyers.</span></>}
          sub="A transparent marketplace with verified quality, real prices and built-in negotiation — no more middlemen siphoning value."
        />
        <div className="mt-14 grid md:grid-cols-3 gap-5">
          {items.map((it, i) => (
            <div key={i} className="reveal glass rounded-2xl overflow-hidden hover:-translate-y-1 transition-transform duration-500">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={it.img} alt={it.c} loading="lazy" className="size-full object-cover transition-transform duration-700 hover:scale-110" />
                <div className="absolute top-3 left-3 glass rounded-full px-3 py-1 text-xs">Verified · A+</div>
              </div>
              <div className="p-5">
                <div className="font-semibold">{it.c}</div>
                <div className="text-xs text-muted-foreground mt-1">{it.q}</div>
                <div className="mt-3 flex items-center justify-between">
                  <div className="text-gradient-green font-display font-bold">{it.p}</div>
                  <Button size="sm" variant="outline" className="border-border">Negotiate</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Assistant() {
  const chat = [
    { r: "u", t: "When should I plant maize in Eldoret this season?" },
    { r: "a", t: "Based on the long-rains forecast for Uasin Gishu, plant between March 18–28. Soil moisture is ideal after Mar 16. Use DH04 variety for your altitude (1,900m)." },
    { r: "u", t: "How do I manage fall armyworm?" },
    { r: "a", t: "Scout weekly at dawn. Use pheromone traps now. If infestation >5 larvae per 10 plants, apply emamectin benzoate. Rotate with neem oil to prevent resistance." },
  ];
  return (
    <section className="relative py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 grid lg:grid-cols-2 gap-12 items-center">
        <div className="reveal">
          <SectionHeading
            eyebrow="AI Farming Assistant"
            title={<>An agricultural expert <span className="text-gradient-hero">available 24/7.</span></>}
            sub="Trained on African agronomy, climate data and local crop varieties — KilimoIQ's assistant answers in seconds, in the languages farmers actually speak."
          />
          <div className="mt-6 flex flex-wrap gap-2 text-xs">
            {["English","Swahili","Kikuyu","Luo","Kalenjin","Amharic","Hausa"].map(l =>
              <span key={l} className="glass rounded-full px-3 py-1">{l}</span>
            )}
          </div>
        </div>
        <div className="reveal">
          <div className="glass rounded-3xl p-5 grain max-w-lg ml-auto">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border">
              <div className="size-9 rounded-full bg-primary/20 grid place-items-center"><Bot className="size-5 text-primary" /></div>
              <div>
                <div className="font-semibold text-sm">KilimoIQ Assistant</div>
                <div className="text-xs text-muted-foreground flex items-center gap-1.5"><span className="size-1.5 rounded-full bg-primary animate-pulse" /> Online</div>
              </div>
            </div>
            <div className="space-y-3 max-h-80 overflow-hidden">
              {chat.map((m, i) => (
                <div key={i} className={`flex ${m.r === "u" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${m.r === "u" ? "bg-primary text-primary-foreground" : "bg-background/60 border border-border"}`}>{m.t}</div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-2 rounded-full bg-background/60 border border-border px-4 py-2">
              <input className="flex-1 bg-transparent outline-none text-sm" placeholder="Ask KilimoIQ anything..." />
              <button className="size-8 rounded-full bg-primary grid place-items-center text-primary-foreground"><Send className="size-4" /></button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Access() {
  const channels = [
    { i: Smartphone, t: "Mobile App", d: "Rich Android experience for connected farmers and field officers." },
    { i: Globe, t: "Web Platform", d: "Powerful dashboards for buyers, cooperatives and governments." },
    { i: MessageCircle, t: "SMS Access", d: "Price alerts, weather and quality info — no internet required." },
    { i: Phone, t: "USSD Access", d: "Dial in to list produce, check prices or get advice on any phone." },
  ];
  return (
    <section className="relative py-28 bg-surface/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Accessibility"
          title={<>Built for smartphones. <span className="text-gradient-green">Built for feature phones.</span></>}
          sub="Inclusion is not an afterthought. KilimoIQ reaches every farmer — from Nairobi to the most underserved village."
        />
        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {channels.map((c, i) => (
            <div key={i} className="reveal glass rounded-2xl p-6 grain text-center">
              <div className="size-12 mx-auto rounded-xl bg-harvest/15 border border-harvest/40 flex items-center justify-center text-harvest mb-4">
                <c.i className="size-6" />
              </div>
              <h3 className="font-semibold">{c.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{c.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyNow() {
  const points = [
    { i: Cpu, t: "AI breakthroughs", d: "Vision and language models are finally cheap, accurate and fast enough to deploy at the farm gate." },
    { i: Smartphone, t: "Smartphone adoption", d: "Africa added over 100M smartphone users in the last 3 years — and that curve keeps steepening." },
    { i: AlertTriangle, t: "Climate volatility", d: "Erratic seasons demand a new layer of intelligence between weather and decisions." },
    { i: Users, t: "Food demand growth", d: "Africa will feed 2.5B people by 2050. Productivity per farmer must double — or triple." },
    { i: Network, t: "Digital transformation", d: "Mobile money proved Africa can leapfrog. Agriculture is the next frontier." },
  ];
  return (
    <section className="relative py-28">
      <div className="absolute inset-0 -z-10 opacity-50">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[800px] rounded-full bg-orange-glow/10 blur-[180px]" />
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Why Now"
          title={<>A defining moment for <span className="text-gradient-hero">African agriculture.</span></>}
        />
        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-5 gap-4">
          {points.map((p, i) => (
            <div key={i} className="reveal glass rounded-2xl p-5 grain">
              <p.i className="size-6 text-orange-glow mb-3" />
              <div className="font-semibold">{p.t}</div>
              <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{p.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Impact() {
  const stats = [
    { v: 23, s: "%", l: "Higher farmer income" },
    { v: 38, s: "%", l: "Reduction in losses" },
    { v: 91, s: "%", l: "Forecast accuracy" },
    { v: 3, s: "x", l: "Faster buyer matching" },
  ];
  return (
    <section id="impact" className="relative py-28 bg-surface/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Impact"
          title={<>Transforming agriculture <span className="text-gradient-green">at scale.</span></>}
          sub="Every metric we move compounds across millions of farmers, billions of dollars in trade, and the food security of an entire continent."
        />
        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <div key={i} className="reveal glass rounded-2xl p-8 grain">
              <div className="text-5xl font-display font-bold text-gradient-hero">
                <Counter to={s.v} suffix={s.s} />
              </div>
              <div className="mt-2 text-sm text-muted-foreground">{s.l}</div>
            </div>
          ))}
        </div>
        <div className="mt-10 grid md:grid-cols-3 gap-4">
          {[
            { i: HandCoins, t: "Higher Farmer Income" },
            { i: ShieldCheck, t: "Improved Food Security" },
            { i: Network, t: "Stronger Ecosystems" },
          ].map((x,i) => (
            <div key={i} className="reveal glass rounded-2xl p-6 flex items-center gap-4">
              <div className="size-12 rounded-xl bg-primary/15 border border-primary/30 grid place-items-center text-primary"><x.i /></div>
              <div className="font-semibold">{x.t}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Roadmap() {
  const phases = [
    { p: "Phase 1", t: "Kenya", d: "Establish category leadership across counties, cooperatives and value chains." },
    { p: "Phase 2", t: "East Africa", d: "Expand to Uganda, Tanzania, Rwanda and Ethiopia with localized intelligence." },
    { p: "Phase 3", t: "Africa", d: "Scale across West, Central and Southern Africa with sovereign partnerships." },
    { p: "Phase 4", t: "Global Network", d: "Connect African producers to global agricultural intelligence and trade flows." },
  ];
  return (
    <section id="roadmap" className="relative py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Roadmap"
          title={<>From Kenya to the <span className="text-gradient-green">continent — and beyond.</span></>}
        />
        <div className="mt-14 relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/60 via-harvest/40 to-orange-glow/60" />
          <div className="space-y-10">
            {phases.map((ph, i) => (
              <div key={i} className={`reveal relative md:grid md:grid-cols-2 md:gap-12 ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
                <div className={`pl-12 md:pl-0 ${i % 2 ? "md:text-left md:pl-12" : "md:text-right md:pr-12"}`}>
                  <div className="text-xs uppercase tracking-[0.2em] text-orange-glow">{ph.p}</div>
                  <div className="text-2xl font-display font-bold mt-1">{ph.t}</div>
                  <p className="text-sm text-muted-foreground mt-2 max-w-sm md:inline-block">{ph.d}</p>
                </div>
                <div className="absolute left-2 md:left-1/2 top-1 -translate-x-1/2 size-5 rounded-full bg-primary border-4 border-background animate-pulse-ring" />
                <div />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const t = [
    { q: "I used to sell my maize for whatever price the broker said. Now I check KilimoIQ first — I made 30% more last harvest.", n: "Esther W.", r: "Smallholder Farmer · Nakuru", img: farmer },
    { q: "We source 80 tonnes of premium avocado weekly. KilimoIQ's quality verification removed weeks of negotiation friction.", n: "Daniel M.", r: "Buyer · Export Co." },
    { q: "Their weather-tied recommendations changed how our cooperative plans seasons. Yields up double-digits across 400 farms.", n: "Grace K.", r: "Cooperative Manager" },
    { q: "An indispensable layer for any AgriTech strategy on the continent. We've integrated KilimoIQ into 3 country programs.", n: "Tomas L.", r: "NGO · Food Systems" },
  ];
  return (
    <section className="relative py-28 bg-surface/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Social Proof"
          title={<>Trusted by the people <span className="text-gradient-hero">building African agriculture.</span></>}
        />
        <div className="mt-14 grid md:grid-cols-2 gap-5">
          {t.map((it, i) => (
            <figure key={i} className="reveal glass rounded-2xl p-7 grain">
              <blockquote className="text-lg leading-relaxed">"{it.q}"</blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <div className="size-10 rounded-full overflow-hidden bg-primary/20 grid place-items-center">
                  {it.img ? <img src={it.img} alt="" className="size-full object-cover" loading="lazy" /> : <Users className="size-5 text-primary" />}
                </div>
                <div>
                  <div className="font-semibold text-sm">{it.n}</div>
                  <div className="text-xs text-muted-foreground">{it.r}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Partners({ onDemo }: { onDemo: () => void }) {
  const cats = [
    { i: Building2, t: "Governments" },
    { i: Globe, t: "NGOs" },
    { i: HandCoins, t: "Investors" },
    { i: Target, t: "Agribusinesses" },
    { i: Users, t: "Cooperatives" },
    { i: Network, t: "Development Orgs" },
  ];
  return (
    <section id="partners" className="relative py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Investors & Partners"
          title={<>Building Africa's <span className="text-gradient-green">agricultural intelligence layer.</span></>}
          sub="KilimoIQ combines AI, agricultural intelligence, climate insights, quality assessment and digital commerce into one scalable ecosystem designed for Africa's rapidly growing agricultural economy."
        />
        <div className="mt-14 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {cats.map((c, i) => (
            <div key={i} className="reveal glass rounded-2xl p-5 text-center grain">
              <c.i className="size-6 mx-auto text-harvest mb-2" />
              <div className="text-sm font-semibold">{c.t}</div>
            </div>
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <Button size="lg" onClick={onDemo} className="bg-orange-glow hover:bg-orange-glow/90 text-accent-foreground glow-orange h-12 px-6">
            Become a Strategic Partner <ArrowRight className="ml-1 size-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}

function DemoRequest({ onDemo }: { onDemo: () => void }) {
  return (
    <section id="demo" className="relative py-28 bg-surface/40">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="glass rounded-3xl p-10 sm:p-14 grain text-center glow-green">
          <SectionHeading
            eyebrow="Get Started"
            title={<>Ready to see KilimoIQ <span className="text-gradient-hero">in action?</span></>}
            sub="Schedule a live demonstration and discover how KilimoIQ is transforming agricultural decision-making across Africa."
          />
          <div className="mt-10 grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
            <a href="tel:0741145911" className="glass rounded-2xl p-5 hover:-translate-y-0.5 transition flex items-center gap-3">
              <Phone className="size-5 text-primary" />
              <div className="text-left">
                <div className="text-xs text-muted-foreground">Call</div>
                <div className="font-semibold">0741 145 911</div>
              </div>
            </a>
            <a href="mailto:info@terraseptsolutions.com" className="glass rounded-2xl p-5 hover:-translate-y-0.5 transition flex items-center gap-3">
              <Mail className="size-5 text-orange-glow" />
              <div className="text-left">
                <div className="text-xs text-muted-foreground">Email</div>
                <div className="font-semibold text-sm">info@terraseptsolutions.com</div>
              </div>
            </a>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button size="lg" onClick={onDemo} className="bg-primary hover:bg-primary/90 text-primary-foreground h-12 px-6 glow-green">Request Demo</Button>
            <Button size="lg" variant="outline" className="h-12 px-6 border-border" onClick={() => location.href = "tel:0741145911"}>Call Now</Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function FinalCTA({ onDemo }: { onDemo: () => void }) {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <img src={fields} alt="" className="size-full object-cover opacity-30" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/70 to-background" />
      </div>
      <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center reveal">
        <h2 className="text-5xl sm:text-6xl font-bold leading-[1.05]">
          The future of African agriculture <span className="text-gradient-hero">starts here.</span>
        </h2>
        <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
          Join the movement bringing intelligence, transparency, and opportunity to agriculture across Africa.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button size="lg" onClick={onDemo} className="bg-primary hover:bg-primary/90 text-primary-foreground h-12 px-6 glow-green">Request Demo</Button>
          <Button size="lg" variant="outline" onClick={onDemo} className="h-12 px-6 border-border">Become a Partner</Button>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative border-t border-border py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 grid md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <img src={logo} alt="KilimoIQ" className="size-9" width={36} height={36} />
            <span className="text-lg font-display font-bold">KilimoIQ</span>
          </div>
          <p className="mt-3 text-sm text-muted-foreground max-w-sm">Smart Quality. Smart Markets. Smart Agriculture.</p>
          <p className="mt-1 text-xs text-muted-foreground">Powered by TerraSept Solutions</p>
          <div className="mt-5 space-y-2 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground"><Phone className="size-4 text-primary" /> 0741 145 911</div>
            <div className="flex items-center gap-2 text-muted-foreground"><Mail className="size-4 text-orange-glow" /> info@terraseptsolutions.com</div>
            <div className="flex items-center gap-2 text-muted-foreground"><MapPin className="size-4 text-harvest" /> Nairobi, Kenya</div>
          </div>
        </div>
        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">Platform</div>
          <ul className="space-y-2 text-sm">
            {[["Home","#top"],["Solution","#solution"],["Features","#features"],["Impact","#impact"],["Roadmap","#roadmap"]].map(([t,h]) =>
              <li key={t}><a href={h} className="text-muted-foreground hover:text-foreground">{t}</a></li>)}
          </ul>
        </div>
        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">Connect</div>
          <ul className="space-y-2 text-sm">
            <li><a href="#demo" className="text-muted-foreground hover:text-foreground">Request Demo</a></li>
            <li><a href="#partners" className="text-muted-foreground hover:text-foreground">Partners</a></li>
            <li><a href="mailto:info@terraseptsolutions.com" className="text-muted-foreground hover:text-foreground">Contact</a></li>
          </ul>
          <div className="mt-5 flex gap-2">
            {["X","in","fb","ig"].map(s => (
              <a key={s} href="#" aria-label={s} className="size-9 rounded-full glass grid place-items-center text-xs hover:bg-primary/20 transition">{s}</a>
            ))}
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 mt-10 pt-6 border-t border-border flex flex-wrap items-center justify-between text-xs text-muted-foreground">
        <div>© {new Date().getFullYear()} TerraSept Solutions. All rights reserved.</div>
        <div>Built for the future of African agriculture.</div>
      </div>
    </footer>
  );
}

/* ---------- Page ---------- */
function Landing() {
  const [open, setOpen] = useState(false);
  useReveal();
  return (
    <main className="relative">
      <Toaster />
      <Nav onDemo={() => setOpen(true)} />
      <Hero onDemo={() => setOpen(true)} />
      <Problem />
      <Solution />
      <QualityAI />
      <Weather />
      <Market />
      <Marketplace />
      <Assistant />
      <Access />
      <WhyNow />
      <Impact />
      <Roadmap />
      <Testimonials />
      <Partners onDemo={() => setOpen(true)} />
      <DemoRequest onDemo={() => setOpen(true)} />
      <FinalCTA onDemo={() => setOpen(true)} />
      <Footer />
      <DemoModal open={open} onOpenChange={setOpen} />
    </main>
  );
}
