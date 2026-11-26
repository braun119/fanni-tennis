"use client";

import { useEffect, useState } from "react";
import EventsDropdown from "../../EventsDropdown";
import styles from "./page.module.css";

type Language = "hu" | "en";

const copy = {
  hu: {
    pageTitle: "Tenerife Tennis Holiday 2027 | Tennis with Fanni",
    pageDescription:
      "Hat éjszakás tenerifei teniszutazás a Bahia del Duque hotelben, 10-14 óra teniszedzéssel.",
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
    heroTitle: "Tenerife",
    heroEmphasis: "Tennis Holiday",
    intro:
      "Egyik kedvenc szigetemre, Tenerifére szervezem a következő közös teniszes utunkat. Hat éjszakát töltünk egy gyönyörű tengerparti hotelben, öt napon át teniszezünk, és közben jut idő pihenésre, kirándulásra és a sziget felfedezésére is.",
    summaryLabel: "Az utazás röviden",
    summary: [
      { value: "Január 24.", label: "Érkezés" },
      { value: "6 éjszaka", label: "Tenerifén" },
      { value: "10-14 óra", label: "Teniszedzés" },
      { value: "3-5 fő", label: "Kis létszámú csapat" },
    ],
    stayKicker: "Bahia del Duque",
    stayTitle: "Szállás és helyszín",
    stayTextOne:
      "Tenerife egyik legszebb szállodájában, az ötcsillagos Bahia del Duque-ban szállunk meg. Kétágyas, erkélyes szobák várnak ránk, reggelivel.",
    stayTextTwo:
      "A teniszpályák a hotel területén vannak, a szállodának pedig saját strandja is van. Minden egy helyen.",
    tennisTitle: "Teniszprogram",
    tennisTextOne:
      "Öt napon át minden nap kétórás teniszedzésünk lesz. Szerdán és pénteken plusz kétórás blokkot tartunk, pontjátékokkal színesítve. Így összesen 10-14 óra tenisz vár ránk.",
    tennisTextTwo:
      "A szabad délutánokon élvezhetjük a hotel szolgáltatásait, pihenhetünk a parton, vagy választhatunk a fakultatív programok és kirándulások közül.",
    travelTitle: "Időpont és utazás",
    arrivalLabel: "Érkezés",
    arrival: "január 24., vasárnap",
    departureLabel: "Hazautazás",
    departure: "január 30., szombat",
    priceTitle: "Részvételi díj",
    earlyBirdLabel: "Early bird díj december 15-ig",
    earlyBird: "2600 EUR",
    regularLabel: "December 15. után",
    regular: "2800 EUR",
    group:
      "Az utazás minimum 3, maximum 5 fő részvételével indul, így végig kis létszámú csapatban leszünk.",
    includedTitle: "Az ár tartalmazza",
    included: [
      "6 éjszaka, reggelivel az ötcsillagos Bahia del Duque hotelben",
      "kétágyas, erkélyes szobákban",
      "összesen 10-14 óra teniszedzés az 5 nap alatt",
    ],
    excludedTitle: "Az ár nem tartalmazza",
    excluded: [
      "az utazási költséget",
      "a biztosítást",
      "a reptéri transzfert",
      "a reggelin kívüli étkezéseket",
      "egyéb költségeket",
    ],
    momentsKicker: "A hét hangulata",
    momentsTitle: "Tenisz, tengerpart és közös élmények",
    galleryAlts: [
      "Teniszező csoport a salakos pályán",
      "Koccintás a teniszpálya mellett",
      "Napfény csillog a tengeren Tenerifén",
    ],
    signupTitle: "Biztosítsd a helyed a csapatban",
    deposit:
      "A helyedet 1500 EUR befizetésével tudod biztosítani. Várom jelentkezésed!",
    balance: "A fennmaradó összeget december 31-ig szükséges rendezni.",
    callButton: "Jelentkezem!",
    back: "Vissza a 2027-es utazásokhoz",
    rights: "Minden jog fenntartva",
    privacy: "Adatkezelési tájékoztató",
  },
  en: {
    pageTitle: "Tenerife Tennis Holiday 2027 | Tennis with Fanni",
    pageDescription:
      "A six-night Tenerife tennis holiday at Bahia del Duque with 10-14 hours of coached tennis.",
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
    heroTitle: "Tenerife",
    heroEmphasis: "Tennis Holiday",
    intro:
      "I am organising our next tennis holiday on one of my favourite islands, Tenerife. We will spend six nights at a beautiful seaside hotel, play tennis over five days, and still have time to relax, explore and discover the island.",
    summaryLabel: "The getaway at a glance",
    summary: [
      { value: "24 January", label: "Arrival" },
      { value: "6 nights", label: "In Tenerife" },
      { value: "10-14 hours", label: "Coached tennis" },
      { value: "3-5 guests", label: "Small group" },
    ],
    stayKicker: "Bahia del Duque",
    stayTitle: "Hotel and location",
    stayTextOne:
      "We will stay at one of Tenerife's finest hotels, the five-star Bahia del Duque. Twin rooms with balconies and breakfast are included.",
    stayTextTwo:
      "The tennis courts are on the hotel grounds, and the hotel also has its own beach. Everything is in one place.",
    tennisTitle: "Tennis programme",
    tennisTextOne:
      "We will have a two-hour tennis session every day for five days. On Wednesday and Friday, we will hold an additional two-hour block, enhanced with point play. That gives us 10-14 hours of tennis in total.",
    tennisTextTwo:
      "Free afternoons can be spent enjoying the hotel's facilities, relaxing by the sea, or joining optional programmes and excursions.",
    travelTitle: "Dates and travel",
    arrivalLabel: "Arrival",
    arrival: "Sunday, 24 January",
    departureLabel: "Departure",
    departure: "Saturday, 30 January",
    priceTitle: "Participation fee",
    earlyBirdLabel: "Early bird price until 15 December",
    earlyBird: "EUR 2600",
    regularLabel: "After 15 December",
    regular: "EUR 2800",
    group:
      "The getaway runs with a minimum of 3 and a maximum of 5 guests, so we will remain a small group throughout.",
    includedTitle: "The price includes",
    included: [
      "6 nights at the five-star Bahia del Duque with breakfast",
      "twin rooms with balconies",
      "10-14 hours of tennis training over 5 days",
    ],
    excludedTitle: "The price does not include",
    excluded: [
      "travel costs",
      "insurance",
      "airport transfers",
      "meals other than breakfast",
      "other personal expenses",
    ],
    momentsKicker: "The feeling of the week",
    momentsTitle: "Tennis, the coast and time together",
    galleryAlts: [
      "A tennis group on the clay court",
      "A toast beside the tennis court",
      "Sunlight sparkling on the sea in Tenerife",
    ],
    signupTitle: "Secure your place in the group",
    deposit:
      "You can secure your place with a EUR 1500 payment. I look forward to hearing from you!",
    balance: "The remaining balance is due by 31 December.",
    callButton: "Register!",
    back: "Back to the 2027 getaways",
    rights: "All rights reserved",
    privacy: "Privacy policy",
  },
} as const;

const galleryImages = [
  "/images/getaways-2027/tennis-group-cropped.png",
  "/images/getaways-2027/courtside-toast.jpg",
  "/images/getaways-2027/sunlit-sea.jpg",
] as const;

export default function TenerifeDetails() {
  const [language, setLanguage] = useState<Language>("hu");
  const [menuOpen, setMenuOpen] = useState(false);
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

  return (
    <main className={styles.page}>
      <header className={`site-header ${styles.header}`}>
        <a className="brand" href="/" aria-label={t.homeLabel}>
          <span className="brand-mark" aria-hidden="true">
            <img src="/images/twf-bold-transparent.png" alt="" />
          </span>
          <span>PLAY IMPROVE<em> BELONG</em></span>
        </a>

        <nav
          id="tenerife-navigation"
          className={menuOpen ? "nav open" : "nav"}
          aria-label={t.navigation}
        >
          <a href="/#rolam" onClick={() => setMenuOpen(false)}>{t.about}</a>
          <a href="/#szolgaltatasok" onClick={() => setMenuOpen(false)}>{t.services}</a>
          <EventsDropdown
            id="tenerife-events-dropdown"
            label={t.events}
            currentEventsLabel={t.currentEvents}
            currentEventsHref="/#esemenyek"
            getawaysLabel={t.getaways}
            getawaysHref="/utazasok-2027#utazasok"
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
            aria-controls="tenerife-navigation"
            aria-label={menuOpen ? t.menuClose : t.menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      <section className={styles.hero} id="top">
        <img
          className={styles.heroImage}
          src="/images/getaways-2027/bahia-del-duque.jpg"
          alt="Bahia del Duque, Tenerife"
        />
        <div className={styles.heroShade} aria-hidden="true" />
        <div className={styles.heroCopy}>
          <h1>{t.heroTitle}<em>{t.heroEmphasis}</em></h1>
          <p className={styles.heroIntro}>{t.intro}</p>
        </div>
      </section>

      <section className={styles.summary} aria-label={t.summaryLabel}>
        {t.summary.map((item) => (
          <div className={styles.summaryItem} key={item.label}>
            <strong>{item.value}</strong>
            <span>{item.label}</span>
          </div>
        ))}
      </section>

      <section className={styles.contentSection}>
        <div className={styles.sectionHeading}>
          <p className="section-kicker">
            <a
              className={styles.kickerLink}
              href="https://thetaishotels.com/en/bahia-del-duque/"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t.stayKicker}
            </a>
          </p>
          <h2>{t.stayTitle}</h2>
        </div>
        <div className={styles.sectionBody}>
          <p>{t.stayTextOne}</p>
          <p>{t.stayTextTwo}</p>
        </div>
      </section>

      <section className={`${styles.contentSection} ${styles.darkSection}`}>
        <div className={styles.sectionHeading}>
          <h2>{t.tennisTitle}</h2>
        </div>
        <div className={styles.sectionBody}>
          <p>{t.tennisTextOne}</p>
          <p>{t.tennisTextTwo}</p>
        </div>
      </section>

      <section className={styles.travelSection}>
        <div className={styles.sectionHeading}>
          <h2>{t.travelTitle}</h2>
        </div>
        <div className={styles.travelDetails}>
          <p><strong>{t.arrivalLabel}</strong><span>{t.arrival}</span></p>
          <p><strong>{t.departureLabel}</strong><span>{t.departure}</span></p>
        </div>
      </section>

      <section className={styles.priceSection}>
        <div className={styles.priceIntro}>
          <h2>{t.priceTitle}</h2>
          <p>{t.group}</p>
        </div>
        <div className={styles.priceOptions}>
          <div>
            <span>{t.earlyBirdLabel}</span>
            <strong>{t.earlyBird}</strong>
          </div>
          <div>
            <span>{t.regularLabel}</span>
            <strong>{t.regular}</strong>
          </div>
        </div>
      </section>

      <section className={styles.inclusionsSection}>
        <div>
          <h2>{t.includedTitle}</h2>
          <ul>
            {t.included.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
        <div>
          <h2>{t.excludedTitle}</h2>
          <ul>
            {t.excluded.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
      </section>

      <section className={styles.gallerySection} aria-label={t.momentsTitle}>
        <div className={styles.galleryHeading}>
          <p className="section-kicker">{t.momentsKicker}</p>
          <h2>{t.momentsTitle}</h2>
        </div>
        <div className={styles.gallery}>
          {galleryImages.map((image, index) => (
            <figure key={image}>
              <img src={image} alt={t.galleryAlts[index]} />
            </figure>
          ))}
        </div>
      </section>

      <section className={styles.signupSection}>
        <h2>{t.signupTitle}</h2>
        <p>{t.deposit}</p>
        <p>{t.balance}</p>
        <div className={styles.signupActions}>
          <a className="button button-dark" href="tel:+36704892542">{t.callButton}</a>
          <a className={styles.backLink} href="/utazasok-2027#utazasok">{t.back}</a>
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
