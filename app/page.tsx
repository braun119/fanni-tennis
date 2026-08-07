"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

const navigationSections = ["rolam", "szolgaltatasok", "esemenyek", "kapcsolat"] as const;
type NavigationSection = (typeof navigationSections)[number];

const events = [
  {
    title: "Közösségi tenisz",
    text: "Játék, fejlődés és jó hangulat egy inspiráló, egymást támogató közösségben.",
    image: "/images/fanni-01.webp",
    position: "center 42%",
  },
  {
    title: "Tenisz és brunch",
    text: "Könnyed páros játék, közös reggeli és új ismeretségek a pálya mellett.",
    image: "/images/fanni-03.webp",
    position: "center",
  },
  {
    title: "Tematikus edzés",
    text: "Fókuszált gyakorlás minden szinten, hogy örömmel fedezd fel a következő lépést.",
    image: "/images/fanni-07.webp",
    position: "center",
  },
];

const benefits = [
  {
    lead: "A sport öröm, nem kötelesség:",
    text: "imádom a teniszt, rögtön ahogy pályára lépek kialakul egy nagyon pozitív és motiváló atmoszféra, ezáltal könnyedén átadható a tudás.",
  },
  {
    lead: "A fejlődés a legnagyobb motiváció:",
    text: "nagyon motivál ahogy látom a fejlődéseket, minden mozdulatban ott vannak a további lehetőségek, amik újabb kihívásokat tartogatnak.",
  },
  {
    lead: "Gyorsan felmérem, hogyan tudunk a leghatékonyabban fejlődni:",
    text: "az első alkalommal átlátom, kit, miképpen lehet fejleszteni, kivel milyen ütemben célszerű foglalkozni.",
  },
  {
    lead: "Mindenkihez másképpen kapcsolódom:",
    text: "könnyedén összehangolódom az emberekkel, segítem őket átlendülni a nehézségeken. Mindezt vidám hangulatban, hiszen a tanulás legjobb módja, ha nem vesszük túl komolyan magunkat.",
  },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<NavigationSection>("rolam");
  const [sent, setSent] = useState(false);
  const eventTrack = useRef<HTMLDivElement>(null);

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    let animationFrame = 0;

    const updateActiveSection = () => {
      const marker = window.scrollY + 140;
      let currentSection: NavigationSection = "rolam";

      for (const sectionId of navigationSections) {
        const section = document.getElementById(sectionId);
        if (section && section.offsetTop <= marker) currentSection = sectionId;
      }

      const atPageBottom =
        window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
      setActiveSection(atPageBottom ? "kapcsolat" : currentSection);
    };

    const scheduleUpdate = () => {
      if (animationFrame) return;
      animationFrame = window.requestAnimationFrame(() => {
        animationFrame = 0;
        updateActiveSection();
      });
    };

    updateActiveSection();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    window.addEventListener("hashchange", scheduleUpdate);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      window.removeEventListener("hashchange", scheduleUpdate);
    };
  }, []);

  const selectNavigationSection = (section: NavigationSection) => {
    setActiveSection(section);
    closeMenu();
  };

  const moveEvents = (direction: number) => {
    eventTrack.current?.scrollBy({
      left: direction * Math.min(eventTrack.current.clientWidth * 0.86, 390),
      behavior: "smooth",
    });
  };

  const submitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.currentTarget.reset();
    setSent(true);
  };

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" onClick={closeMenu} aria-label="Tennis with Fanni - főoldal">
          TENNIS WITH <em>FANNI</em>
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          aria-label={menuOpen ? "Menü bezárása" : "Menü megnyitása"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
        </button>
        <nav id="primary-navigation" className={menuOpen ? "nav open" : "nav"} aria-label="Fő navigáció">
          <a
            className={activeSection === "rolam" ? "active" : undefined}
            href="#rolam"
            aria-current={activeSection === "rolam" ? "location" : undefined}
            onClick={() => selectNavigationSection("rolam")}
          >Rólam</a>
          <a
            className={activeSection === "szolgaltatasok" ? "active" : undefined}
            href="#szolgaltatasok"
            aria-current={activeSection === "szolgaltatasok" ? "location" : undefined}
            onClick={() => selectNavigationSection("szolgaltatasok")}
          >Szolgáltatások</a>
          <a
            className={activeSection === "esemenyek" ? "active" : undefined}
            href="#esemenyek"
            aria-current={activeSection === "esemenyek" ? "location" : undefined}
            onClick={() => selectNavigationSection("esemenyek")}
          >Események</a>
          <a
            className={activeSection === "kapcsolat" ? "active" : undefined}
            href="#kapcsolat"
            aria-current={activeSection === "kapcsolat" ? "location" : undefined}
            onClick={() => selectNavigationSection("kapcsolat")}
          >Kapcsolat</a>
          <a className="instagram" href="#kapcsolat" onClick={closeMenu} aria-label="Instagram">IG</a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="hero-content">
          <p className="eyebrow">Tennis with Fanni</p>
          <h1>Fedezd fel a tenisz világát egy <em>inspiráló közösségben</em></h1>
          <p>
         Akár most veszed először a kezedbe az ütőt, akár a következő szintre szeretnél
lépni, itt nem csak teniszezni tanulsz meg.
Egy motiváló közösség tagja leszel, ahol a fejlődés, a jó hangulat és az új barátságok
legalább olyan fontosak, mint a tökéletes ütés.
          </p>
          <a className="button button-light" href="#rolam">Megnézem az oktatót</a>
        </div>
        <a className="scroll-cue" href="#rolam" aria-label="Tovább a bemutatkozáshoz">↓</a>
      </section>

      <section className="about section" id="rolam">
        <div className="about-photo image-frame">
          <img src="/images/fanni-04.webp" alt="Fanni a teniszpályán labdákkal és ütővel" />
        </div>
        <div className="about-copy">
          <p className="section-kicker">Ismerj meg</p>
          <h2>Örülök, hogy itt vagy!</h2>
          <p>
            Üdvözöllek! Fricska Fanni vagyok. Hiszek abban, hogy a tenisz sokkal több, mint egy
            sport. Magabiztosságot ad, kikapcsol, feltölt és összehozza az embereket.
          </p>
          <p>
            Az Egyesült Államokban egyetemi ösztöndíjjal teniszeztem, majd több mint 30 év
            tapasztalatát építettem fel játékosként és edzőként. Ma már az motivál a legjobban,
            amikor látom, hogy valaki minden edzés után egy kicsit jobb játékossá – és egy
            kicsit magabiztosabb emberré válik.
          </p>
          <p>
            Nálam mindenki megtalálja a saját tempóját, legyen teljesen kezdő vagy rutinos játékos.
          </p>
          <a className="button button-outline" href="#szolgaltatasok">Megnézem a szolgáltatásokat</a>
        </div>
      </section>

      <aside className="quote-band">
        <blockquote>
          „Nagyon szeretek a pozitív dolgokat kiemelve motiválni, és az emberekből a pályán
          a lehető legjobbat kihozni.”
        </blockquote>
      </aside>

      <section className="career section">
        <div className="career-copy">
          <p className="section-kicker">Az én történetem</p>
          <h2>Edzői szemlélet</h2>
          <p>
            <strong>Miért szeretek tanítani?</strong>
          </p>
          <p>
            Edzőként nem egyszerűen technikát oktatok. Segítek, hogy magabiztosabban mozogj a
            pályán, élvezd a játékot, és olyan közösség részévé válj, ahol mindenki támogatja
            egymást.
          </p>
          <p>
            Hiszem, hogy jó hangulatban sokkal gyorsabban lehet fejlődni. Ezért nálam minden edzés
            egyszerre tanulás, kihívás és feltöltődés.
          </p>
        </div>
        <div className="career-shadow image-frame">
          <img src="/images/fanni-01.webp" alt="Két ember szív alakú árnyéka a teniszpályán" />
        </div>
        <div className="career-coffee image-frame">
          <img src="/images/fanni-03.webp" alt="Kávé és croissant a teniszpálya mellett" />
        </div>
        <div className="career-statement">
          <p>
            A legnagyobb öröm látni, ahogy a játékosaim edzésről edzésre fejlődnek, egyre
            magabiztosabban és felszabadultabban játszanak, miközben valódi közösség és új
            barátságok születnek a pályán.
          </p>
          <a className="button button-outline" href="#esemenyek">Érdekelnek az események</a>
        </div>
      </section>

      <section className="services" id="szolgaltatasok">
        <div className="services-inner">
          <p className="section-kicker light">Találd meg a saját utad</p>
          <h2>Miből választhatok?</h2>
          <div className="service-list">
            <article>
              <h3>Egyéni oktatás</h3>
              <p>Személyre szabott fejlődés, a saját ritmusodhoz igazítva.</p>
            </article>
            <article>
              <h3>Csoportos gyermek foglalkozás</h3>
              <p>Játékos alapok és sok sikerélmény egy támogató csapatban.</p>
            </article>
            <article>
              <h3>Táborok</h3>
              <p>Intenzív, élményekkel teli napok a pályán és azon kívül.</p>
            </article>
          </div>
          <div className="button-row">
            <a className="button button-light" href="#kapcsolat">Kapcsolatba lépek</a>
            <a className="button button-ghost" href="#esemenyek">Megnézem az eseményeket</a>
          </div>
        </div>
      </section>

      <section className="events section" id="esemenyek">
        <div className="section-heading-row">
          <div>
            <p className="section-kicker">Találkozzunk a pályán</p>
            <h2>Ne maradj le a következő élményekről!</h2>
          </div>
          <div className="event-controls" aria-label="Események lapozása">
            <button type="button" onClick={() => moveEvents(-1)} aria-label="Előző esemény">←</button>
            <button type="button" onClick={() => moveEvents(1)} aria-label="Következő esemény">→</button>
          </div>
        </div>
        <div className="event-track" ref={eventTrack}>
          {events.map((event, index) => (
            <article className="event-card" key={event.title}>
              <div className="event-image">
                <img src={event.image} alt="" style={{ objectPosition: event.position }} />
                <span>0{index + 1}</span>
              </div>
              <h3>{event.title}</h3>
              <p>{event.text}</p>
            </article>
          ))}
        </div>
        <a className="button button-outline events-cta" href="#kapcsolat">Kapcsolatba lépek</a>
      </section>

      <section className="testimonial">
        <div className="testimonial-inner">
          <p className="section-kicker light">Visszajelzések</p>
          <h2>Kedves szavak</h2>
          <blockquote>
            „Két éve járok Fannihoz teniszedzésre, ez idő alatt teljesen megszerettette velem ezt
            a sportot, teljesen nulláról indultam. Az órái mindig jó hangulatban telnek,
            motiválóak és élvezetesek. Különösen értékelem, hogy számára nemcsak a szakmai
            fejlődés fontos, hanem a közösségépítés is - igazi összetartó csapatot alakít ki.”
          </blockquote>
          <div className="dots" aria-label="1. vélemény a 3-ból"><b /><span /><span /></div>
        </div>
      </section>

      <section className="benefits section">
        <div className="benefits-heading">
          <p className="section-kicker">A közös játék alapjai</p>
          <h2>Miért válassz engem?</h2>
        </div>
        <ol>
          {benefits.map((benefit) => (
            <li key={benefit.lead}>
              <span className="tennis-ball" aria-hidden="true" />
              <p><strong>{benefit.lead}</strong> {benefit.text}</p>
            </li>
          ))}
        </ol>
        <a className="button button-outline" href="#kapcsolat">Felkereslek</a>
      </section>

      <aside className="quote-band quote-small">
        <blockquote>
          „Számomra a legnagyobb siker nem a tökéletes ütés, hanem amikor valaki mosolyogva megy
          le a pályáról, és már várja a következő edzést.”
        </blockquote>
      </aside>

      <section className="contact section" id="kapcsolat">
        <div className="contact-photo image-frame">
          <img src="/images/fanni-02.webp" alt="Fanni mosolyogva áll a teniszpálya hálójánál" />
        </div>
        <div className="contact-copy">
          <p className="section-kicker">Kezdjük el</p>
          <h2>Kapcsolat</h2>
          <p>Vedd fel velem a kapcsolatot az űrlapon keresztül vagy hívj fel telefonon!</p>
          <a className="phone" href="tel:+36704892542">+36 70 489 2542</a>
          <form onSubmit={submitForm}>
            <div className="field-row">
              <label>
                <span>Név</span>
                <input name="name" type="text" autoComplete="name" required />
              </label>
              <label>
                <span>E-mail</span>
                <input name="email" type="email" autoComplete="email" required />
              </label>
            </div>
            <label>
              <span>Telefonszám</span>
              <input name="phone" type="tel" autoComplete="tel" />
            </label>
            <label>
              <span>Üzenet</span>
              <textarea name="message" rows={3} required />
            </label>
            <label className="consent">
              <input type="checkbox" required />
              <span>Elfogadom az adatkezelési tájékoztatót.</span>
            </label>
            <button className="button button-dark" type="submit">Elküldöm</button>
            <p className="form-status" aria-live="polite">
              {sent ? "Köszönöm! Hamarosan felveszem veled a kapcsolatot." : ""}
            </p>
          </form>
        </div>
      </section>

      <footer>
        <a href="#top">Tennis with Fanni</a>
        <p>© 2026 Tennis with Fanni - Minden jog fenntartva</p>
        <a href="#kapcsolat">Adatkezelési tájékoztató</a>
      </footer>
    </main>
  );
}
