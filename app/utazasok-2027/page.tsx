"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  MapPin,
  Pause,
  Play,
} from "lucide-react";
import EventsDropdown from "../EventsDropdown";
import styles from "./page.module.css";

type Language = "hu" | "en";

const copy = {
  hu: {
    pageTitle: "2027-es teniszutazások | Tennis with Fanni",
    pageDescription:
      "Öt prémium teniszutazás 2027-ben: La Manga, Mallorca és Lošinj a Tennis with Fanni közösségével.",
    homeLabel: "Tennis with Fanni – főoldal",
    navigation: "Fő navigáció",
    about: "Rólam",
    services: "Szolgáltatások",
    events: "Események",
    currentEvents: "Aktuális események",
    kidsCamps: "Gyerektáborok",
    getaways: "2027-es utazások",
    contact: "Kapcsolat",
    instagram: "Instagram profil megnyitása",
    language: "Nyelvválasztás",
    menuOpen: "Menü megnyitása",
    menuClose: "Menü bezárása",
    eyebrow: "Play · Improve · Belong",
    heroTitleLead: "Tenisz.",
    heroTitleEmphasis: "Utazás. Közösség.",
    heroText:
      "2027-ben öt alkalommal visszük a játék örömét a legszebb mediterrán helyszínekre.",
    explore: "Felfedezem az utazásokat",
    heroAlt: "Teniszező közösség a salakpályán",
    introKicker: "A 2027-es naptár",
    introTitle: "Öt utazás, három különleges úti cél",
    introText:
      "Tavasztól őszig olyan napokra készülünk, ahol a minőségi tenisz, az aktív pihenés és a jó társaság természetesen találkozik.",
    tripNumber: "utazás",
    detailsSoon: "Részletek hamarosan",
    interest: "Érdekel ez az utazás",
    momentsKicker: "Közös pillanataink",
    momentsTitle: "Tenisz, feltöltődés és jó társaság",
    momentsRegion: "Utazási fotók",
    previousPhoto: "Előző fotó",
    nextPhoto: "Következő fotó",
    pausePhotos: "Automatikus lapozás megállítása",
    playPhotos: "Automatikus lapozás indítása",
    galleryKicker: "Három mediterrán helyszín",
    galleryTitle: "Minden úti célnak saját karaktere van",
    galleryText:
      "La Manga különleges tengeröble, Mallorca ikonikus fővárosa és Lošinj adriai panorámája ad hátteret a 2027-es közös élményeinknek.",
    destination: "Úti cél",
    ctaKicker: "Tarts velünk 2027-ben",
    ctaTitle: "Melyik úti célon találkozunk?",
    ctaText:
      "Jelezd az érdeklődésed, és elsőként értesülsz a pontos dátumokról, a programról és a foglalás részleteiről.",
    ctaButton: "Jelzem az érdeklődésem",
    backHome: "Vissza a főoldalra",
    rights: "Minden jog fenntartva",
    privacy: "Adatkezelési tájékoztató",
  },
  en: {
    pageTitle: "2027 Tennis Getaways | Tennis with Fanni",
    pageDescription:
      "Five premium tennis getaways in 2027: La Manga, Mallorca and Lošinj with the Tennis with Fanni community.",
    homeLabel: "Tennis with Fanni – home",
    navigation: "Main navigation",
    about: "About",
    services: "Services",
    events: "Events",
    currentEvents: "Current events",
    kidsCamps: "Kids' camps",
    getaways: "2027 Getaways",
    contact: "Contact",
    instagram: "Open Instagram profile",
    language: "Language selection",
    menuOpen: "Open menu",
    menuClose: "Close menu",
    eyebrow: "Play · Improve · Belong",
    heroTitleLead: "Tennis.",
    heroTitleEmphasis: "Travel. Community.",
    heroText:
      "In 2027, we are taking the joy of the game to five beautiful Mediterranean escapes.",
    explore: "Explore the getaways",
    heroAlt: "Tennis community together on a clay court",
    introKicker: "The 2027 calendar",
    introTitle: "Five getaways, three remarkable destinations",
    introText:
      "From spring to autumn, we are planning days where quality tennis, active relaxation and great company come together naturally.",
    tripNumber: "getaway",
    detailsSoon: "Details coming soon",
    interest: "I’m interested in this getaway",
    momentsKicker: "Moments together",
    momentsTitle: "Tennis, time to recharge and great company",
    momentsRegion: "Getaway photos",
    previousPhoto: "Previous photo",
    nextPhoto: "Next photo",
    pausePhotos: "Pause automatic photo rotation",
    playPhotos: "Start automatic photo rotation",
    galleryKicker: "Three Mediterranean settings",
    galleryTitle: "Every destination has its own character",
    galleryText:
      "La Manga’s distinctive lagoon, Mallorca’s iconic capital and Lošinj’s Adriatic panorama set the scene for our shared experiences in 2027.",
    destination: "Destination",
    ctaKicker: "Join us in 2027",
    ctaTitle: "Where will we meet?",
    ctaText:
      "Register your interest and be the first to hear the exact dates, programme and booking details.",
    ctaButton: "Register my interest",
    backHome: "Back to the homepage",
    rights: "All rights reserved",
    privacy: "Privacy policy",
  },
} as const;

const trips = [
  {
    destination: "La Manga",
    countryHu: "Spanyolország",
    countryEn: "Spain",
    timingHu: "Március",
    timingEn: "March",
    textHu:
      "Indítsuk együtt a szezont a mediterrán napfényben, fókuszált tenisszel és feltöltő közös pillanatokkal.",
    textEn:
      "Let’s begin the season together in the Mediterranean sun, with focused tennis and energising shared moments.",
  },
  {
    destination: "Mallorca",
    countryHu: "Spanyolország",
    countryEn: "Spain",
    timingHu: "Május",
    timingEn: "Early May",
    textHu:
      "Tavaszi teniszélmény szigeti ritmusban: fejlődés a pályán, kikapcsolódás és inspiráló társaság.",
    textEn:
      "A spring tennis experience at island pace: progress on court, time to unwind and inspiring company.",
  },
  {
    destination: "Lošinj",
    countryHu: "Horvátország",
    countryEn: "Croatia",
    timingHu: "Június vége",
    timingEn: "Late June",
    textHu:
      "Nyárindító teniszutazás az Adria egyik legszebb szigetén, fenyőillatú pályákkal és tengerparti estékkel.",
    textEn:
      "A summer-opening tennis escape on one of the Adriatic’s most beautiful islands, with pine-framed courts and evenings by the sea.",
  },
  {
    destination: "Lošinj",
    countryHu: "Horvátország",
    countryEn: "Croatia",
    timingHu: "Szeptember közepe",
    timingEn: "Mid-September",
    textHu:
      "Visszatérés a szigetre a bársonyos utószezonban: aktív napok, személyes figyelem és közös feltöltődés.",
    textEn:
      "A return to the island in the gentle late season: active days, personal attention and time to recharge together.",
  },
  {
    destination: "Mallorca",
    countryHu: "Spanyolország",
    countryEn: "Spain",
    timingHu: "Október",
    timingEn: "October",
    textHu:
      "Zárjuk a szezont napsütésben, lendületes teniszezéssel és a közösséghez méltó mediterrán hangulattal.",
    textEn:
      "Let’s close the season in the sunshine, with energetic tennis and the Mediterranean atmosphere our community loves.",
  },
] as const;

const destinationSignatures = [
  {
    name: "La Manga",
    image: "/images/getaways-2027/la-manga-signature.jpg",
    altHu: "La Manga városképe a Mar Menor partján",
    altEn: "La Manga cityscape beside the Mar Menor",
    credit: "La Manga Club",
    source: "https://www.lamangaclub.com/en/sports/tenis-padel",
  },
  {
    name: "Mallorca",
    image: "/images/getaways-2027/mallorca-signature.jpg",
    altHu: "A palmái katedrális tükröződése a Parc de la Mar vizén",
    altEn: "Palma Cathedral reflected in the water at Parc de la Mar",
    credit: "Sporting Club Portals",
    source: "https://www.sportingclubportals.com",
  },
  {
    name: "Lošinj",
    image: "/images/getaways-2027/losinj-signature.jpg",
    altHu: "Mali Lošinj panorámája az Adria partján",
    altEn: "Panorama of Mali Lošinj on the Adriatic coast",
    credit: "Hotel Bellevue Losinj",
    source: "https://www.losinj-hotels.com/en/hotels-and-villas/hotel-bellevue",
  },
] as const;

const experiencePhotos = [
  {
    image: "/images/getaways-2027/tennis-community.jpg",
    altHu: "Teniszező közösség a salakpályán",
    altEn: "Tennis community together on a clay court",
  },
  {
    image: "/images/getaways-2027/courtside-toast.jpg",
    altHu: "Koccintás a teniszpálya mellett",
    altEn: "A toast beside the tennis court",
  },
  {
    image: "/images/getaways-2027/losinj-harbour.jpg",
    altHu: "Lošinj kikötője alkonyatkor",
    altEn: "Lošinj harbour at dusk",
  },
  {
    image: "/images/getaways-2027/courtside-selfie.jpg",
    altHu: "Vidám közös szelfi a teniszpályán",
    altEn: "A cheerful group selfie on the tennis court",
  },
  {
    image: "/images/getaways-2027/hotel-evening.jpg",
    altHu: "Esti séta a szálloda kertjében",
    altEn: "An evening walk through the hotel garden",
  },
  {
    image: "/images/getaways-2027/sunlit-sea.jpg",
    altHu: "Napfény csillog a tengeren",
    altEn: "Sunlight sparkling on the sea",
  },
] as const;

export default function Getaways2027() {
  const [language, setLanguage] = useState<Language>("hu");
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeExperience, setActiveExperience] = useState(0);
  const [experiencePaused, setExperiencePaused] = useState(false);
  const experienceTrack = useRef<HTMLDivElement>(null);
  const t = copy[language];

  useEffect(() => {
    document.documentElement.lang = language;
    document.title = t.pageTitle;
    document
      .querySelector<HTMLMetaElement>('meta[name="description"]')
      ?.setAttribute("content", t.pageDescription);
  }, [language, t.pageDescription, t.pageTitle]);

  const selectLanguage = (nextLanguage: Language) => {
    setLanguage(nextLanguage);
    setMenuOpen(false);
  };

  const moveExperience = (direction: number) => {
    setExperiencePaused(true);
    setActiveExperience(
      (current) =>
        (current + direction + experiencePhotos.length) % experiencePhotos.length,
    );
  };

  useEffect(() => {
    const track = experienceTrack.current;
    const card = track?.children[activeExperience] as HTMLElement | undefined;
    if (!track || !card) return;

    track.scrollTo({
      left: card.offsetLeft - track.offsetLeft,
      behavior: "smooth",
    });
  }, [activeExperience]);

  useEffect(() => {
    if (experiencePaused) return;

    const timer = window.setInterval(() => {
      setActiveExperience((current) => (current + 1) % experiencePhotos.length);
    }, 3600);

    return () => window.clearInterval(timer);
  }, [experiencePaused]);

  return (
    <main className={styles.getawaysPage}>
      <header className={`site-header ${styles.header}`}>
        <a className="brand" href="/" aria-label={t.homeLabel}>
          <span className="brand-mark" aria-hidden="true">
            <img src="/images/twf-bold-transparent.png" alt="" />
          </span>
          <span>PLAY IMPROVE<em> BELONG</em></span>
        </a>

        <nav
          id="getaways-navigation"
          className={menuOpen ? "nav open" : "nav"}
          aria-label={t.navigation}
        >
          <a href="/#rolam" onClick={() => setMenuOpen(false)}>{t.about}</a>
          <a href="/#szolgaltatasok" onClick={() => setMenuOpen(false)}>{t.services}</a>
          <EventsDropdown
            id="getaways-events-dropdown"
            label={t.events}
            currentEventsLabel={t.currentEvents}
            currentEventsHref="/#esemenyek"
            getawaysLabel={t.getaways}
            getawaysHref="#utazasok"
            kidsCampsLabel={t.kidsCamps}
            kidsCampsHref="/#szolgaltatasok"
            getawaysActive
            onNavigate={() => setMenuOpen(false)}
          />
          <a href="/#kapcsolat" onClick={() => setMenuOpen(false)}>{t.contact}</a>
        </nav>

        <div className="header-actions">
          <div className="language-switcher" role="group" aria-label={t.language}>
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

          <a
            className="instagram-link"
            href="https://www.instagram.com/tenniswithfanni/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t.instagram}
          >
            <svg
              aria-hidden="true"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
            </svg>
          </a>

          <button
            className="menu-toggle"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="getaways-navigation"
            aria-label={menuOpen ? t.menuClose : t.menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      <section className={styles.hero} id="top">
        <div className={styles.heroCopy}>
          <p className={styles.heroEyebrow}>{t.eyebrow}</p>
          <h1>
            {t.heroTitleLead}
            <em>{t.heroTitleEmphasis}</em>
          </h1>
        </div>
      </section>

      <section className={styles.gallerySection}>
        <div className={styles.gallery}>
          {destinationSignatures.map((destination) => (
            <figure className={styles.signatureCard} key={destination.name}>
              <img
                src={destination.image}
                alt={language === "hu" ? destination.altHu : destination.altEn}
              />
              <figcaption>
                <h3>{destination.name}</h3>
                <a href={destination.source} target="_blank" rel="noopener noreferrer">
                  {destination.credit}
                </a>
              </figcaption>
            </figure>
          ))}
        </div>
        <div className={styles.galleryAction}>
          <a className="button button-light" href="#utazasok">
            {t.explore}
            <ArrowDown aria-hidden="true" size={16} strokeWidth={1.8} />
          </a>
        </div>
      </section>

      <section className={styles.intro} id="utazasok">
        <div>
          <p className="section-kicker">{t.introKicker}</p>
          <h2>{t.introTitle}</h2>
        </div>
        <p>{t.introText}</p>
      </section>

      <section className={styles.tripList} aria-label={t.getaways}>
        {trips.map((trip, index) => (
          <article className={styles.tripCard} key={`${trip.destination}-${index}`}>
            <div className={styles.tripCopy}>
              <h3>{trip.destination}</h3>
              <div className={styles.tripMeta}>
                <span><CalendarDays aria-hidden="true" size={17} />{language === "hu" ? trip.timingHu : trip.timingEn}</span>
                <span><MapPin aria-hidden="true" size={17} />{language === "hu" ? trip.countryHu : trip.countryEn}</span>
              </div>
              <p className={styles.tripDescription}>{language === "hu" ? trip.textHu : trip.textEn}</p>
              <p className={styles.soon}>{t.detailsSoon}</p>
              <a className={styles.textLink} href="/#kapcsolat">
                {t.interest}<ArrowUpRight aria-hidden="true" size={17} />
              </a>
            </div>
          </article>
        ))}
      </section>

      <section className={styles.momentsSection} aria-label={t.momentsRegion}>
        <div className={styles.momentsHeading}>
          <div>
            <p className="section-kicker">{t.momentsKicker}</p>
            <h2>{t.momentsTitle}</h2>
          </div>
          <div className={styles.momentsControls}>
            <button type="button" onClick={() => moveExperience(-1)} aria-label={t.previousPhoto}>
              <ArrowLeft aria-hidden="true" size={19} strokeWidth={1.8} />
            </button>
            <button
              className={styles.autoplayButton}
              type="button"
              aria-label={experiencePaused ? t.playPhotos : t.pausePhotos}
              aria-pressed={experiencePaused}
              onClick={() => setExperiencePaused((paused) => !paused)}
            >
              {experiencePaused ? (
                <Play aria-hidden="true" size={16} strokeWidth={2} />
              ) : (
                <Pause aria-hidden="true" size={16} strokeWidth={2} />
              )}
            </button>
            <button type="button" onClick={() => moveExperience(1)} aria-label={t.nextPhoto}>
              <ArrowRight aria-hidden="true" size={19} strokeWidth={1.8} />
            </button>
          </div>
        </div>
        <div
          className={styles.momentsTrack}
          ref={experienceTrack}
          onPointerDown={() => setExperiencePaused(true)}
          aria-live="polite"
        >
          {experiencePhotos.map((photo) => (
            <figure className={styles.momentCard} key={photo.image}>
              <img
                src={photo.image}
                alt={language === "hu" ? photo.altHu : photo.altEn}
              />
            </figure>
          ))}
        </div>
      </section>

      <section className={styles.cta}>
        <p className="section-kicker">{t.ctaKicker}</p>
        <h2>{t.ctaTitle}</h2>
        <p>{t.ctaText}</p>
        <div className={styles.ctaActions}>
          <a className="button button-dark" href="/#kapcsolat">{t.ctaButton}</a>
          <a className={styles.backLink} href="/">{t.backHome}</a>
        </div>
      </section>

      <footer>
        <a href="/">Tennis with Fanni</a>
        <p>© 2026 Tennis with Fanni - {t.rights}</p>
        <a href="/adatkezelesi-tajekoztato.pdf" target="_blank" rel="noopener noreferrer">
          {t.privacy}
        </a>
      </footer>
    </main>
  );
}
