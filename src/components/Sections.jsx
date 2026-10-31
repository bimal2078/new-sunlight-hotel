import { useState, useEffect, useRef } from 'react';
import { BedDouble, UtensilsCrossed, HeartHandshake, MapPin, Copy, Check, X, Star } from 'lucide-react';
import { SITE, ROOMS, EVENT_TYPES, GALLERY, GALLERY_CATEGORIES, REVIEWS, listingUrl, mapsSearchUrl } from '../data/siteData';
import Img from './Img';

// One gentle fade-in used for section content.
function Reveal({ children, className = '' }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) { el?.classList.add('in'); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add('in'); io.disconnect(); } }, { threshold: 0.12 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>;
}

const Section = ({ id, className = '', children }) => (
  <section id={id} className={`px-4 py-20 ${className}`}><div className="mx-auto max-w-6xl">{children}</div></section>
);
const Title = ({ children, sub, light }) => (
  <div className="mb-10 max-w-2xl">
    <h2 className={`text-4xl font-semibold md:text-5xl ${light ? '!text-cream' : ''}`}>{children}</h2>
    {sub && <p className={`mt-3 ${light ? 'text-cream/80' : 'text-charcoal/75'}`}>{sub}</p>}
  </div>
);

export function Hero({ goInquiry }) {
  return (
    <section id="home" className="relative flex min-h-[85vh] items-center overflow-hidden bg-forest px-4 pb-24 pt-16">
      {/* Replace with a real hotel photo: <Img src="/images/hero.jpg" ... /> */}
      <Img src={null} alt="Hotel hero" label="Add a verified hotel photograph (public/images/hero.jpg)" className="absolute inset-0 h-full w-full opacity-40" />
      <div className="absolute inset-0 bg-forest/70" />
      <div className="relative mx-auto w-full max-w-6xl">
        <h1 className="max-w-3xl text-5xl font-semibold leading-tight !text-cream md:text-7xl">Your Comfort, Our Hospitality.</h1>
        <p className="mt-5 max-w-xl text-lg text-cream/90">Enjoy comfortable stays, delicious food, and warm hospitality at New Sunlight Hotel &amp; Party Palace, near Khaireni and Butwal, Nepal.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <button className="btn btn-gold" onClick={() => goInquiry('Room Reservation')}>Book Your Stay</button>
          <a href="#about" className="btn btn-line">Explore Our Hotel</a>
        </div>
        <a href={listingUrl} target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-2 text-sm text-cream/90 hover:text-gold">
          <Star size={16} className="fill-gold text-gold" /> Rated {SITE.rating}/5 on Google · {SITE.reviewCount} Reviews
        </a>
      </div>
    </section>
  );
}

export function About() {
  return (
    <Section id="about">
      <Reveal className="grid items-center gap-10 md:grid-cols-2">
        <Img src={null} alt="New Sunlight Hotel" className="h-80 w-full rounded-2xl md:h-[26rem]" />
        <div>
          <h2 className="text-4xl font-semibold md:text-5xl">Experience Warm Hospitality Near Butwal</h2>
          <p className="mt-5 leading-relaxed">Welcome to New Sunlight Hotel &amp; Party Palace, a welcoming destination near Khaireni on Mahendra Highway in Devdaha Municipality, Nepal. Whether you're traveling with family, stopping by for a meal, or planning a special celebration, we aim to make your experience comfortable and memorable.</p>
          <p className="mt-4 leading-relaxed">Guests have appreciated our peaceful environment, clean rooms, delicious food, convenient parking, and friendly service. We look forward to welcoming you.</p>
        </div>
      </Reveal>
    </Section>
  );
}

export function Why() {
  const items = [
    [BedDouble, 'Comfortable Accommodation', 'A welcoming place to relax during your journey.'],
    [UtensilsCrossed, 'Delicious Food', 'Enjoy flavorful meals and the Nepali Thakali Thali, appreciated by guests.'],
    [HeartHandshake, 'Friendly Hospitality', 'Experience attentive service and a warm welcome.'],
    [MapPin, 'Convenient Location', 'Find us near Khaireni on Mahendra Highway in Devdaha Municipality.'],
  ];
  return (
    <Section className="bg-white">
      <Title>Why Choose Us</Title>
      <Reveal className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map(([Icon, t, d]) => (
          <div key={t} className="rounded-2xl border border-gold/30 bg-cream p-6 transition-shadow hover:shadow-md">
            <Icon className="text-gold-dark" />
            <h3 className="mt-4 text-2xl font-semibold">{t}</h3>
            <p className="mt-2 text-sm text-charcoal/80">{d}</p>
          </div>
        ))}
      </Reveal>
    </Section>
  );
}

export function Rooms({ goInquiry }) {
  return (
    <Section id="rooms">
      <Title sub="Room details are placeholders until the hotel confirms categories, amenities and rates.">Find Your Comfortable Stay</Title>
      <div className="grid gap-6 md:grid-cols-3">
        {ROOMS.map((r) => (
          <article key={r.id} className="overflow-hidden rounded-2xl bg-white shadow-md">
            <Img src={r.image} alt={r.category} className="h-48 w-full" />
            <div className="p-5">
              <h3 className="text-2xl font-semibold">{r.category}</h3>
              <p className="mt-2 text-sm text-charcoal/80">{r.desc}</p>
              {r.amenities.length > 0 && <ul className="mt-3 flex flex-wrap gap-2 text-xs">{r.amenities.map((a) => <li key={a} className="rounded-full bg-cream px-3 py-1">{a}</li>)}</ul>}
              {r.price && <p className="mt-3 font-semibold">{r.price}</p>}
              <button className="btn btn-forest mt-4" onClick={() => goInquiry('Room Reservation', r.category)}>Enquire Now</button>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}

export function Restaurant({ goInquiry }) {
  return (
    <Section id="restaurant" className="bg-forest">
      <div className="grid items-center gap-10 md:grid-cols-2">
        <div>
          <Title light sub="Discover the flavors of Nepali cuisine and enjoy a satisfying meal in a welcoming setting.">Good Food, Great Memories</Title>
          <p className="font-serif text-3xl text-gold">Nepali Thakali Thali</p>
          <p className="mt-2 text-sm text-cream/80">A dish our guests specifically mention in their reviews.</p>
          <button className="btn btn-gold mt-6" onClick={() => goInquiry('Restaurant Inquiry')}>Ask About Our Menu</button>
        </div>
        <Img src={null} alt="Nepali Thakali Thali" label="Add a photo of the hotel's Thakali Thali" className="h-80 w-full rounded-2xl" />
      </div>
    </Section>
  );
}

export function Party({ goInquiry }) {
  return (
    <Section id="party">
      <div className="grid items-center gap-10 md:grid-cols-2">
        <Img src={null} alt="Party palace" label="Add a photo of the party palace" className="order-2 h-80 w-full rounded-2xl md:order-1" />
        <div className="order-1 md:order-2">
          <Title sub="Planning a special occasion? Contact New Sunlight Hotel & Party Palace to discuss your event requirements and explore the available arrangements.">Make Every Celebration Special</Title>
          <ul className="mb-6 grid grid-cols-2 gap-2 text-sm">{EVENT_TYPES.map((e) => <li key={e} className="rounded-lg border border-gold/40 bg-white px-3 py-2">{e}</li>)}</ul>
          <button className="btn btn-forest" onClick={() => goInquiry('Party Palace/Event Inquiry')}>Enquire About Your Event</button>
        </div>
      </div>
    </Section>
  );
}

export function Gallery() {
  const [cat, setCat] = useState('All');
  const [open, setOpen] = useState(null);
  const list = GALLERY.filter((g) => cat === 'All' || g.cat === cat);
  useEffect(() => {
    const h = (e) => e.key === 'Escape' && setOpen(null);
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, []);
  return (
    <Section id="gallery" className="bg-white">
      <Title sub="Placeholders until real hotel photographs are added in siteData.js.">Gallery</Title>
      <div className="mb-6 flex flex-wrap gap-2">
        {GALLERY_CATEGORIES.map((c) => (
          <button key={c} onClick={() => setCat(c)} aria-pressed={cat === c}
            className={`rounded-full px-4 py-1.5 text-sm ${cat === c ? 'bg-forest text-cream' : 'bg-cream hover:bg-gold/20'}`}>{c}</button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {list.map((g) => (
          <button key={g.id} onClick={() => setOpen(g)} aria-label={`View ${g.alt}`} className="overflow-hidden rounded-xl">
            <Img src={g.src} alt={g.alt} label={g.cat} className="h-40 w-full transition-transform hover:scale-105 md:h-56" />
          </button>
        ))}
      </div>
      {open && (
        <div role="dialog" aria-modal="true" aria-label={open.alt} className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4" onClick={() => setOpen(null)}>
          <button className="absolute right-4 top-4 text-white" aria-label="Close" onClick={() => setOpen(null)}><X /></button>
          <Img src={open.src} alt={open.alt} label={open.cat} className="max-h-[80vh] w-full max-w-4xl rounded-xl md:h-[70vh]" />
        </div>
      )}
    </Section>
  );
}

export function Reviews() {
  return (
    <Section>
      <Title sub={`${SITE.rating}/5 · ${SITE.reviewCount} Google reviews`}>What Our Guests Say</Title>
      <div className="grid gap-6 md:grid-cols-3">
        {REVIEWS.map((r) => (
          <figure key={r.name} className="rounded-2xl border-l-4 border-gold bg-white p-6 shadow-md">
            <blockquote className="leading-relaxed">“{r.text}”</blockquote>
            <figcaption className="mt-4 text-sm font-semibold text-forest">{r.name}</figcaption>
          </figure>
        ))}
      </div>
      <a href={listingUrl} target="_blank" rel="noreferrer" className="mt-8 inline-block text-sm font-semibold text-forest underline">Read more on Google Maps</a>
    </Section>
  );
}

export function Location() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText(SITE.addressLines.join(' ')); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch { /* clipboard unavailable */ }
  };
  return (
    <Section id="location" className="bg-white">
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <Title>Find Us Near Khaireni, Devdaha</Title>
          <address className="not-italic leading-relaxed">{SITE.addressLines.map((l) => <span key={l} className="block">{l}</span>)}</address>
          <div className="mt-6 flex flex-wrap gap-3">
            <a className="btn btn-forest" href={mapsSearchUrl} target="_blank" rel="noreferrer">Get Directions</a>
            <button className="btn border border-forest text-forest" onClick={copy}>{copied ? <><Check size={16} className="mr-2" />Copied</> : <><Copy size={16} className="mr-2" />Copy address</>}</button>
          </div>
        </div>
        <iframe title="Map to New Sunlight Hotel" loading="lazy" className="h-72 w-full rounded-2xl border-0"
          src={`https://www.google.com/maps?q=${encodeURIComponent(SITE.mapsQuery)}&output=embed`} />
      </div>
    </Section>
  );
}

export function Footer() {
  return (
    <footer className="bg-forest px-4 py-12 text-cream">
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
        <div><p className="font-serif text-2xl">{SITE.name}</p><p className="mt-2 text-sm text-cream/70">Comfortable stays, good food and celebrations near Butwal.</p></div>
        <address className="text-sm not-italic text-cream/80"><p className="mb-1 font-semibold text-gold">Location</p>{SITE.addressLines.map((l) => <span key={l} className="block">{l}</span>)}</address>
        <nav className="text-sm" aria-label="Footer"><p className="mb-1 font-semibold text-gold">Explore</p>
          {[['Rooms', 'rooms'], ['Restaurant', 'restaurant'], ['Party Palace', 'party'], ['Contact', 'contact']].map(([l, id]) => <a key={id} href={`#${id}`} className="block py-0.5 hover:text-gold">{l}</a>)}
        </nav>
      </div>
      <p className="mx-auto mt-8 max-w-6xl border-t border-white/10 pt-4 text-xs text-cream/60">© {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
    </footer>
  );
}
