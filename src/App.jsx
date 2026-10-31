import { useState } from 'react';
import Header from './components/Header';
import { QuickInquiry, ContactForm } from './components/Forms';
import { Hero, About, Why, Rooms, Restaurant, Party, Gallery, Reviews, Location, Footer } from './components/Sections';

const EMPTY = { name: '', phone: '', email: '', type: 'General Inquiry', checkIn: '', checkOut: '', guests: 2, room: '', message: '' };

export default function App() {
  const [form, setForm] = useState(EMPTY);

  // Any "Enquire" button presets the inquiry type (and room) then scrolls to the form.
  const goInquiry = (type, room) => {
    setForm((f) => ({ ...f, type, message: room ? `I would like to enquire about: ${room}.` : f.message }));
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Header goInquiry={goInquiry} />
      <main>
        <Hero goInquiry={goInquiry} />
        <div className="px-4"><QuickInquiry form={form} setForm={setForm} goInquiry={goInquiry} /></div>
        <About />
        <Why />
        <Rooms goInquiry={goInquiry} />
        <Restaurant goInquiry={goInquiry} />
        <Party goInquiry={goInquiry} />
        <Gallery />
        <Reviews />
        <Location />
        <section id="contact" className="px-4 py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-8 text-4xl font-semibold md:text-5xl">We'd Love to Welcome You</h2>
            <ContactForm form={form} setForm={setForm} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
