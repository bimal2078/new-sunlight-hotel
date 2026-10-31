import { useState } from 'react';
import { SITE } from '../data/siteData';

const today = () => new Date().toISOString().split('T')[0];
export const INQUIRY_TYPES = ['Room Reservation', 'Restaurant Inquiry', 'Party Palace/Event Inquiry', 'General Inquiry'];

function Field({ label, error, children }) {
  return (
    <label className="block text-sm font-medium">
      {label}
      <div className="mt-1">{children}</div>
      {error && <span role="alert" className="mt-1 block text-xs text-red-700">{error}</span>}
    </label>
  );
}

// Fast panel under the hero: validates, then hands the details to the main inquiry form.
export function QuickInquiry({ form, setForm, goInquiry }) {
  const [err, setErr] = useState({});
  const submit = (e) => {
    e.preventDefault();
    const x = {};
    if (!form.checkIn) x.checkIn = 'Choose a check-in date.';
    if (!form.checkOut) x.checkOut = 'Choose a check-out date.';
    else if (form.checkIn && form.checkOut <= form.checkIn) x.checkOut = 'Check-out must be after check-in.';
    if (!(Number(form.guests) >= 1)) x.guests = 'Enter at least 1 guest.';
    setErr(x);
    if (!Object.keys(x).length) goInquiry('Room Reservation');
  };
  return (
    <form onSubmit={submit} noValidate className="relative z-10 mx-auto -mt-10 max-w-5xl rounded-2xl bg-white p-5 shadow-lg">
      <div className="grid gap-4 md:grid-cols-5 md:items-start">
        <Field label="Check-in" error={err.checkIn}><input type="date" min={today()} className="field" value={form.checkIn} onChange={(e) => setForm({ ...form, checkIn: e.target.value })} /></Field>
        <Field label="Check-out" error={err.checkOut}><input type="date" min={form.checkIn || today()} className="field" value={form.checkOut} onChange={(e) => setForm({ ...form, checkOut: e.target.value })} /></Field>
        <Field label="Guests" error={err.guests}><input type="number" min="1" className="field" value={form.guests} onChange={(e) => setForm({ ...form, guests: e.target.value })} /></Field>
        <Field label="Room inquiry"><input type="text" placeholder="e.g. family room" className="field" value={form.room} onChange={(e) => setForm({ ...form, room: e.target.value })} /></Field>
        <button className="btn btn-forest md:mt-6">Check Availability</button>
      </div>
      <p className="mt-3 text-xs text-charcoal/60">This sends an inquiry to the hotel. It does not check live room availability.</p>
    </form>
  );
}

export function ContactForm({ form, setForm }) {
  const [err, setErr] = useState({});
  const [status, setStatus] = useState('idle'); // idle | loading | success | error | unconfigured
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const isStay = form.type === 'Room Reservation';

  const submit = async (e) => {
    e.preventDefault();
    const x = {};
    if (!form.name.trim()) x.name = 'Enter your full name.';
    if (!/^[+\d][\d\s-]{6,}$/.test(form.phone.trim())) x.phone = 'Enter a valid phone number.';
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) x.email = 'Enter a valid email address.';
    if (isStay && form.checkIn && form.checkOut && form.checkOut <= form.checkIn) x.checkOut = 'Check-out must be after check-in.';
    if (!form.message.trim()) x.message = 'Write a short message.';
    setErr(x);
    if (Object.keys(x).length) return;
    if (!SITE.contact.formEndpoint) { setStatus('unconfigured'); return; }
    setStatus('loading');
    try {
      const r = await fetch(SITE.contact.formEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(form) });
      setStatus(r.ok ? 'success' : 'error');
    } catch { setStatus('error'); }
  };

  return (
    <form onSubmit={submit} noValidate className="grid gap-4 rounded-2xl bg-white p-6 shadow-md md:grid-cols-2">
      <Field label="Full name *" error={err.name}><input className="field" value={form.name} onChange={set('name')} autoComplete="name" /></Field>
      <Field label="Phone number *" error={err.phone}><input type="tel" className="field" value={form.phone} onChange={set('phone')} autoComplete="tel" /></Field>
      <Field label="Email (optional)" error={err.email}><input type="email" className="field" value={form.email} onChange={set('email')} autoComplete="email" /></Field>
      <Field label="Inquiry type"><select className="field" value={form.type} onChange={set('type')}>{INQUIRY_TYPES.map((t) => <option key={t}>{t}</option>)}</select></Field>
      {isStay && <>
        <Field label="Check-in"><input type="date" className="field" value={form.checkIn} onChange={set('checkIn')} /></Field>
        <Field label="Check-out" error={err.checkOut}><input type="date" className="field" value={form.checkOut} onChange={set('checkOut')} /></Field>
      </>}
      <Field label="Number of guests"><input type="number" min="1" className="field" value={form.guests} onChange={set('guests')} /></Field>
      <div className="md:col-span-2"><Field label="Message *" error={err.message}><textarea rows="4" className="field" value={form.message} onChange={set('message')} /></Field></div>
      <div className="md:col-span-2">
        <button disabled={status === 'loading'} className="btn btn-forest w-full disabled:opacity-60 md:w-auto">{status === 'loading' ? 'Sending…' : 'Submit Inquiry'}</button>
        <div aria-live="polite" className="mt-3 text-sm">
          {status === 'success' && <p className="text-forest">Thank you. Your inquiry has been sent and the hotel will contact you.</p>}
          {status === 'error' && <p className="text-red-700">Your inquiry could not be sent. Please try again or contact the hotel directly.</p>}
          {status === 'unconfigured' && <p className="text-red-700">Inquiry sending is not connected yet. The site owner must add a form endpoint in src/data/siteData.js before going live. Nothing was sent.</p>}
        </div>
      </div>
    </form>
  );
}
