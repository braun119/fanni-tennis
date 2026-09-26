"use client";

import { FormEvent, PointerEvent, useEffect, useRef, useState } from "react";
import { englishTranslations, Language, localizedMetadata } from "./translations";

const navigationSections = ["rolam", "szolgaltatasok", "esemenyek", "kapcsolat"] as const;
type NavigationSection = (typeof navigationSections)[number];

const events = [
  {
    title: "NŐI HÁZI BAJNOKSÁG",
    text: "Könnyed játék, sok nevetés és új ismeretségek a pálya mellett.",
    image: "/images/event-community.jpg",
    position: "center 42%",
  },
  {
    title: "Exkluzív Teniszélmény",
    text: "Töltsünk el együtt néhány felejthetetlen napot a tengernél.",
    image: "/images/event-tennis-retreat.jpg",
    position: "center",
  },
  {
    title: "IV. CSALÁDI NAP",
    text: "Szülő és gyermek párban - vidám hangulatú csapatjátékok.",
    image: "/images/event-community-day.jpg",
    position: "center",
  },
  {
    title: "Premium Teniszélmény Losinj Szigetén",
    text: "",
    image: "/images/event-losinj.png",
    position: "center",
  },
];

const benefits = [
  {
    lead: "Jó hangulat minden edzésen",
    text: "Nálam a fejlődés örömmel párosul.",
  },
  {
    lead: "Személyre szabott fejlődés",
    text: "Minden játékos más, ezért minden edzés is az.",
  },
  {
    lead: "Igazi közösség",
    text: "Nemcsak edzőpartnereket, hanem új barátokat is találsz.",
  },
  {
    lead: "Motiváció minden alkalommal",
    text: "Segítek átlépni a saját határaidat.",
  },
];

const testimonials = [
  [
    "Fanni mindig pontos, felkészült, és minden egyes edzést maximálisan kihasznál, mindig azt adja, amire szükségem van. Az órák alatt végig aktívan dolgozik velünk, nincs „alibizés”, érezhető, hogy szívvel-lélekkel végzi a munkáját. Nagyon hálás vagyok neki, mert nemcsak fejlődtem mellette, hanem valóban megszerettem a teniszt is.",
  ],
  [
    "Fél évvel ezelőtt teljesen kezdőként kezdtem el ismerkedni a tenisszel. Így utólag biztosan állíthatom, hogy a legjobb kezekbe kerültem. Fanni segítségével gyorsan és látványosan fejlődtem, rövid idő alatt középhaladó szintre jutottam.",
    "Az órái mindig jó hangulatban telnek, rendkívül lelkes, támogató és türelmes edző. Már az első alkalomtól kezdve ráérzett arra, hogy milyen módszerekkel tud a leghatékonyabban fejleszteni és minden edzést az igényeimhez, céljaimhoz és személyiségemhez igazít.",
    "Nagyon értékelem a rugalmasságát, pozitív hozzáállását és azt, hogy folyamatosan motivál a fejlődésre. Örülök, hogy rátaláltam, és szívből ajánlom mindenkinek, aki egy profi, figyelmes és inspiráló edző mellett szeretné kihozni magából a legtöbbet.",
  ],
  [
    "Az edzőm Fanni, rendkívül kedves, figyelmes és pozitív személyiség, aki mindig jó hangulatot teremt az edzéseken. Az edzések tele vannak vidámsággal, élettel és jókedvvel, így a fejlődés mellett az élmény is garantált. Szakmailag magasan képzett, felkészült és elkötelezett, miközben nagy figyelmet fordít minden apró részletre: az ütőfogásra, a lábmunkára, a mozgásra és a technikai kivitelezésre egyaránt. Nemcsak a technikai fejlődésemben segít sokat, hanem motivációjával és támogató hozzáállásával is. Mellette az edzések egyszerre hatékonyak, élvezetesek és inspirálóak!",
  ],
];

export default function Home() {
  const [language, setLanguage] = useState<Language>("hu");
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<NavigationSection>("rolam");
  const [sent, setSent] = useState(false);
  const [activeEvent, setActiveEvent] = useState(0);
  const [eventsPaused, setEventsPaused] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [testimonialPaused, setTestimonialPaused] = useState(false);
  const eventTrack = useRef<HTMLDivElement>(null);
  const testimonialSwipeStart = useRef<number | null>(null);

  const t = (hungarian: string) =>
    language === "en" ? englishTranslations[hungarian] ?? hungarian : hungarian;

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const metadata = localizedMetadata[language];
    document.documentElement.lang = language;
    document.title = metadata.title;
    document
      .querySelector<HTMLMetaElement>('meta[name="description"]')
      ?.setAttribute("content", metadata.description);
  }, [language]);

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

  const selectLanguage = (nextLanguage: Language) => {
    setLanguage(nextLanguage);
    setActiveTestimonial(0);
    setSent(false);
    closeMenu();
  };

  const moveEvents = (direction: number) => {
    setEventsPaused(true);
    setActiveEvent((current) => (current + direction + events.length) % events.length);
  };

  useEffect(() => {
    const track = eventTrack.current;
    const card = track?.children[activeEvent] as HTMLElement | undefined;
    if (!track || !card) return;

    track.scrollTo({
      left: card.offsetLeft - track.offsetLeft,
      behavior: "smooth",
    });
  }, [activeEvent]);

  useEffect(() => {
    if (eventsPaused) return;

    const timer = window.setInterval(() => {
      setActiveEvent((current) => (current + 1) % events.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, [eventsPaused]);

  const moveTestimonial = (direction: number) => {
    setActiveTestimonial((current) =>
      (current + direction + testimonials.length) % testimonials.length,
    );
  };

  useEffect(() => {
    if (testimonialPaused) return;

    const timer = window.setInterval(() => {
      setActiveTestimonial((current) => (current + 1) % testimonials.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, [testimonialPaused]);

  const startTestimonialSwipe = (event: PointerEvent<HTMLDivElement>) => {
    setTestimonialPaused(true);
    testimonialSwipeStart.current = event.clientX;
  };

  const finishTestimonialSwipe = (event: PointerEvent<HTMLDivElement>) => {
    const start = testimonialSwipeStart.current;
    testimonialSwipeStart.current = null;
    if (start === null) return;

    const distance = event.clientX - start;
    if (Math.abs(distance) >= 45) {
      setTestimonialPaused(true);
      moveTestimonial(distance < 0 ? 1 : -1);
    }
  };

  const submitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.currentTarget.reset();
    setSent(true);
  };

  return (
    <main>
      <header className="site-header">
        <a
          className="brand"
          href="#top"
          onClick={closeMenu}
          aria-label={t("Tennis with Fanni - főoldal")}
        >
          <span className="brand-mark" aria-hidden="true">
            <img src="/images/twf-bold.png" alt="" />
          </span>
          <span>PLAY IMPROVE<em> BELONG</em></span>
        </a>

        <nav
          id="primary-navigation"
          className={menuOpen ? "nav open" : "nav"}
          aria-label={t("Fő navigáció")}
        >
          <a
            className={activeSection === "rolam" ? "active" : undefined}
            href="#rolam"
            aria-current={activeSection === "rolam" ? "location" : undefined}
            onClick={() => selectNavigationSection("rolam")}
          >
            {t("Rólam")}
          </a>
          <a
            className={activeSection === "szolgaltatasok" ? "active" : undefined}
            href="#szolgaltatasok"
            aria-current={activeSection === "szolgaltatasok" ? "location" : undefined}
            onClick={() => selectNavigationSection("szolgaltatasok")}
          >
            {t("Szolgáltatások")}
          </a>
          <a
            className={activeSection === "esemenyek" ? "active" : undefined}
            href="#esemenyek"
            aria-current={activeSection === "esemenyek" ? "location" : undefined}
            onClick={() => selectNavigationSection("esemenyek")}
          >
            {t("Események")}
          </a>
          <a
            className={activeSection === "kapcsolat" ? "active" : undefined}
            href="#kapcsolat"
            aria-current={activeSection === "kapcsolat" ? "location" : undefined}
            onClick={() => selectNavigationSection("kapcsolat")}
          >
            {t("Kapcsolat")}
          </a>
          <a className="instagram" href="#kapcsolat" onClick={closeMenu} aria-label="Instagram">
            IG
          </a>
        </nav>

        <div className="language-switcher" role="group" aria-label={t("Nyelvválasztás")}>
          <button
            className={language === "en" ? "active" : undefined}
            type="button"
            lang="en"
            aria-pressed={language === "en"}
            aria-label="Switch to English"
            onClick={() => selectLanguage("en")}
          >
            EN
          </button>
          <button
            className={language === "hu" ? "active" : undefined}
            type="button"
            lang="hu"
            aria-pressed={language === "hu"}
            aria-label="Váltás magyar nyelvre"
            onClick={() => selectLanguage("hu")}
          >
            HU
          </button>
        </div>

        <button
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          aria-label={menuOpen ? t("Menü bezárása") : t("Menü megnyitása")}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
        </button>
      </header>

      <section className="hero" id="top">
        <div className="hero-content">
          <h1>{t("Fedezd fel a tenisz világát egy")} <em>{t("inspiráló közösségben")}</em></h1>
          <p>
            {t("Akár most veszed először a kezedbe az ütőt, akár a következő szintre szeretnél lépni, itt nem csak teniszezni tanulsz meg. Egy motiváló közösség tagja leszel, ahol a fejlődés, a jó hangulat és az új barátságok legalább olyan fontosak, mint a tökéletes ütés.")}
          </p>
          <a className="button button-light" href="#rolam">{t("Ismerj meg jobban!")}</a>
        </div>
        <a className="scroll-cue" href="#rolam" aria-label={t("Tovább a bemutatkozáshoz")}>↓</a>
      </section>

      <section className="about section" id="rolam">
        <div className="about-photo image-frame">
          <img src="/images/fanni-about.webp" alt={t("Fanni a teniszpályán labdákkal és ütővel")} />
        </div>
        <div className="about-copy">
          <h2>{t("Örülök, hogy itt vagy!")}</h2>
          <p>{t("Üdvözöllek! Fricska Fanni vagyok. Hiszek abban, hogy a tenisz sokkal több, mint egy sport. Magabiztosságot ad, kikapcsol, feltölt és összehozza az embereket.")}</p>
          <p>{t("Az Egyesült Államokban egyetemi ösztöndíjjal teniszeztem, majd több mint 30 év tapasztalatát építettem fel játékosként és edzőként. Ma már az motivál a legjobban, amikor látom, hogy valaki minden edzés után egy kicsit jobb játékossá – és egy kicsit magabiztosabb emberré válik.")}</p>
          <p>{t("Nálam mindenki megtalálja a saját tempóját, legyen teljesen kezdő vagy rutinos játékos.")}</p>
          <a className="button button-outline" href="#szolgaltatasok">{t("Szeretném kipróbálni!")}</a>
        </div>
      </section>

      <aside className="quote-band">
        <blockquote>
          „{t("Számomra a legnagyobb siker nem a tökéletes ütés, hanem amikor valaki mosolyogva megy le a pályáról és már várja a következő edzést")}”
        </blockquote>
      </aside>

      <section className="career section">
        <div className="career-copy">
          <h2>{t("Edzői szemlélet")}</h2>
          <p>{t("Edzőként nem egyszerűen technikát oktatok. Azt szeretném, hogy önbizalommal mozogj a pályán, élvezd a játékot, és támogató közösségünk részévé válj!")}</p>
          <p>{t("Hiszem, hogy jó hangulatban sokkal gyorsabban lehet fejlődni. Ezért nálam minden edzés egyszerre tanulás, kihívás és feltöltődés.")}</p>
          <p>{t("Év közben prémium teniszélményekkel színesítjük a palettát azok számára, akik szeretnének személyes szakmai odafigyelést, aktív pihenést és felejthetetlen napokat közösen átélni. Azt vallom, hogy a teniszt érdemes minél szebb helyeken játszani.")}</p>
        </div>
        <div className="career-gallery">
          <div className="career-shadow image-frame">
            <img src="/images/fanni-01.webp" alt={t("Két ember szív alakú árnyéka a teniszpályán")} />
          </div>
          <div className="career-coffee image-frame">
            <img src="/images/fanni-03.webp" alt={t("Kávé és croissant a teniszpálya mellett")} />
          </div>
        </div>
        <div className="career-statement">
          <a className="button button-outline" href="#esemenyek">{t("Érdekelnek az események!")}</a>
        </div>
      </section>

      <section className="services" id="szolgaltatasok">
        <div className="services-inner">
          <h2>{t("Találd meg a hozzád illő programot!")}</h2>
          <div className="service-list">
            <article>
              <h3>{t("Egyéni edzés")}</h3>
              <p>{t("Személyre szabott fejlődés, maximális figyelem, gyors eredmények.")}</p>
            </article>
            <article>
              <h3>{t("Csoportos foglalkozások")}</h3>
              <p>{t("Tanulj együtt másokkal inspiráló, motiváló környezetben.")}</p>
            </article>
            <article>
              <h3>{t("Junior teniszhetek")}</h3>
              <p>{t("Sportolj a szünidőben is, vidám közösségben.")}</p>
            </article>
            <article>
              <h3>{t("Prémium tenisz élmények")}</h3>
              <p>{t("Játssz exkluzív környezetben, új barátokat és közös emlékeket gyűjtve.")}</p>
            </article>
          </div>
          <div className="button-row">
            <a className="button button-light" href="#kapcsolat">{t("Kapcsolatba lépek!")}</a>
            <a className="button button-ghost" href="#esemenyek">{t("Megnézem az eseményeket!")}</a>
          </div>
        </div>
      </section>

      <section className="events section" id="esemenyek">
        <div className="section-heading-row">
          <div><h2>{t("Ne maradj le a következő eseményeinkről!")}</h2></div>
          <div className="event-controls" aria-label={t("Események lapozása")}>
            <button type="button" onClick={() => moveEvents(-1)} aria-label={t("Előző esemény")}>←</button>
            <button
              type="button"
              className="event-autoplay-toggle"
              aria-label={eventsPaused ? t("Automatikus lapozás indítása") : t("Automatikus lapozás megállítása")}
              aria-pressed={eventsPaused}
              onClick={() => setEventsPaused((paused) => !paused)}
            >
              {eventsPaused ? "▶" : "❚❚"}
            </button>
            <button type="button" onClick={() => moveEvents(1)} aria-label={t("Következő esemény")}>→</button>
          </div>
        </div>
        <div
          className="event-track"
          ref={eventTrack}
          onPointerDown={() => setEventsPaused(true)}
          aria-live="polite"
        >
          {events.map((event, index) => (
            <article className="event-card" key={event.title}>
              <div className="event-image">
                <img
                  src={event.image}
                  alt=""
                  style={{
                    objectPosition: event.position,
                    objectFit: index === 1 ? "contain" : undefined,
                  }}
                />
              </div>
              <h3>{t(event.title)}</h3>
              {event.text && <p>{t(event.text)}</p>}
            </article>
          ))}
        </div>
        <a className="button button-outline events-cta" href="#kapcsolat">{t("Kapcsolatba lépek!")}</a>
      </section>

      <section className="testimonial">
        <div
          className="testimonial-inner"
          onPointerDown={startTestimonialSwipe}
          onPointerUp={finishTestimonialSwipe}
          onPointerCancel={() => {
            testimonialSwipeStart.current = null;
          }}
        >
          <h2>{t("Akik már velünk játszanak")}</h2>
          <blockquote key={language + "-" + activeTestimonial}>
            {testimonials[activeTestimonial].map((paragraph, index) => (
              <p key={paragraph}>
                {(index === 0 ? "„" : "") + t(paragraph) +
                  (index === testimonials[activeTestimonial].length - 1 ? "”" : "")}
              </p>
            ))}
          </blockquote>
          <div className="dots" aria-label={t("Vélemény kiválasztása")}>
            {testimonials.map((_, index) => (
              <button
                className={index === activeTestimonial ? "active" : ""}
                type="button"
                key={index}
                aria-label={(index + 1) + ". " + t("vélemény") + " / " + testimonials.length}
                aria-pressed={index === activeTestimonial}
                onClick={() => {
                  setActiveTestimonial(index);
                  setTestimonialPaused(true);
                }}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="benefits section">
        <div className="benefits-heading">
          <h2>{t("Ezért szeretnek nálam edzeni")}</h2>
        </div>
        <ol>
          {benefits.map((benefit) => (
            <li key={benefit.lead}>
              <span className="tennis-ball" aria-hidden="true" />
              <p><strong>{t(benefit.lead)}</strong> {t(benefit.text)}</p>
            </li>
          ))}
        </ol>
        <a className="button button-outline" href="#kapcsolat">{t("Felkereslek!")}</a>
      </section>

      <aside className="quote-band quote-small">
        <blockquote>
          {t("A tenisz nálunk nem ér véget az edzésekkel.")}<br />
          {t("Versenyek, közösségi napok, táborok és különleges programok várnak egész évben.")}
        </blockquote>
      </aside>

      <section className="contact section" id="kapcsolat">
        <div className="contact-photo image-frame">
          <img src="/images/fanni-contact.webp" alt={t("Fanni teniszlabda után nyúl a salakpályán")} />
        </div>
        <div className="contact-copy">
          <h2>{t("Kapcsolat")}</h2>
          <p>{t("Ne halogasd tovább!")}<br />{t("Gyere el egy edzésre és ismerjük meg egymást")}</p>
          <a className="phone" href="tel:+36704892542">+36 70 489 2542</a>
          <form onSubmit={submitForm}>
            <div className="field-row">
              <label>
                <span>{t("Név")}</span>
                <input name="name" type="text" autoComplete="name" required />
              </label>
              <label>
                <span>{t("E-mail")}</span>
                <input name="email" type="email" autoComplete="email" required />
              </label>
            </div>
            <label>
              <span>{t("Telefonszám")}</span>
              <input name="phone" type="tel" autoComplete="tel" />
            </label>
            <label>
              <span>{t("Üzenet")}</span>
              <textarea name="message" rows={3} required />
            </label>
            <label className="consent">
              <input type="checkbox" required />
              <span>{t("Elfogadom az adatkezelési tájékoztatót.")}</span>
            </label>
            <button className="button button-dark" type="submit">{t("Elküldöm")}</button>
            <p className="form-status" aria-live="polite">
              {sent ? t("Köszönöm! Hamarosan felveszem veled a kapcsolatot.") : ""}
            </p>
          </form>
        </div>
      </section>

      <footer>
        <a href="#top">Tennis with Fanni</a>
        <p>© 2026 Tennis with Fanni - {t("Minden jog fenntartva")}</p>
        <a href="#kapcsolat">{t("Adatkezelési tájékoztató")}</a>
      </footer>
    </main>
  );
}
