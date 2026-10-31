import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { NAV } from '../data/siteData';

export default function Header({ goInquiry }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-gold/30 bg-forest text-cream">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <a href="#home" className="leading-tight">
          <span className="block font-serif text-xl font-bold tracking-[0.18em] text-cream">NEW SUNLIGHT</span>
          <span className="block text-[10px] tracking-[0.3em] text-gold">HOTEL &amp; PARTY PALACE</span>
        </a>
        <nav className="hidden items-center gap-6 text-sm lg:flex" aria-label="Main">
          {NAV.map(([label, id]) => <a key={id} href={`#${id}`} className="hover:text-gold">{label}</a>)}
          <button className="btn btn-gold !py-2" onClick={() => goInquiry('Room Reservation')}>Book a Room</button>
        </nav>
        <button className="lg:hidden" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav className="border-t border-gold/30 bg-forest px-4 pb-4 lg:hidden" aria-label="Mobile">
          {NAV.map(([label, id]) => (
            <a key={id} href={`#${id}`} onClick={() => setOpen(false)} className="block border-b border-white/10 py-3">{label}</a>
          ))}
          <button className="btn btn-gold mt-4 w-full" onClick={() => { setOpen(false); goInquiry('Room Reservation'); }}>Book a Room</button>
        </nav>
      )}
    </header>
  );
}
