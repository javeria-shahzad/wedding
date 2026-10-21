
import mehndiImage from "./assets/mehndi.png";
import baratImage from "./assets/Barat.png";
import walimaImage from "./assets/walima.jpg";

import { useEffect, useState } from "react";
import {
  ArrowRight,
  Heart,
  MapPin,
  CalendarDays,
  Clock,
  Sparkles,
  Flower2,
  Music,
} from "lucide-react";
import "./App.css";

const weddingDate = new Date("2026-11-10T19:00:00");

const couple = {
  bride: "Mahrukh",
  groom: "Muhammad",
};

const events = [
  {
    name: "Mehndi",
    date: "10 November",
    time: "7:00 PM",
    venue: "Al Fatah Model Town, Phase 3, Mangi House",
    description:
      "An evening filled with colours, music, laughter and beautiful traditions.",
    dress: "Festive traditional attire",
    icon: Flower2,
    theme: "mehndi",
    image: mehndiImage,
  },
  {
    name: "Barat",
    date: "11 November",
    time: "Gathering at 12:00 noon · Rukhsati at 3:00 PM",
    venue: "Grand Marquee Bybass Road Daharki",
    description:
      "Join us for a beautiful new beginning as two families come together.",
    dress: "Formal traditional attire",
    icon: Heart,
    theme: "barat",
    image: baratImage,
  },
  {
    name: "Walima",
    date: "14 November",
    time: "Gathering at 7:00 PM · Dinner at 8:00 PM",
    venue: "Dewan e Khas Marriage Hall Multan",
    description:
      "A joyful gathering to celebrate love, family and new beginnings.",
    dress: "Elegant formal attire",
    icon: Sparkles,
    theme: "walima",
image: walimaImage,
  },
];

function CoupleNames({ small = false }) {
  return (
    <div className={`couple-names ${small ? "small-names" : ""}`}>
      <span>{couple.bride}</span>
      <Heart size={small ? 17 : 24} fill="currentColor" />
      <span>{couple.groom}</span>
    </div>
  );
}

function Countdown() {
  const calculate = () => {
    const remaining = Math.max(0, weddingDate.getTime() - Date.now());

    return {
      Days: Math.floor(remaining / 86400000),
      Hours: Math.floor((remaining / 3600000) % 24),
      Minutes: Math.floor((remaining / 60000) % 60),
      Seconds: Math.floor((remaining / 1000) % 60),
    };
  };

  const [time, setTime] = useState(calculate);

  useEffect(() => {
    const timer = setInterval(() => setTime(calculate()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="countdown">
      {Object.entries(time).map(([label, value]) => (
        <div className="countdown-item" key={label}>
          <strong>{String(value).padStart(2, "0")}</strong>
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}

function EventCard({ event, onClick }) {
  const Icon = event.icon;

  return (
    <button className="schedule-card" onClick={onClick} type="button">
      <img src={event.image} alt={`${event.name} celebration`} />

      <div className="schedule-card-content">
        <Icon size={24} />
        <h3>{event.name}</h3>

        <p>
          <CalendarDays size={15} />
          {event.date}
        </p>

        <p>
          <Clock size={15} />
          {event.time}
        </p>

        <p>
          <MapPin size={15} />
          {event.venue}
        </p>

        <span className="text-link">
          View invitation <ArrowRight size={16} />
        </span>
      </div>
    </button>
  );
}

function App() {
  const [page, setPage] = useState("cover");
  const [musicOn, setMusicOn] = useState(false);

  const goTo = (nextPage) => {
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const isEvent = page.startsWith("event-");
  const eventIndex = isEvent ? Number(page.split("-")[1]) : -1;
  const currentEvent = isEvent ? events[eventIndex] : null;

  return (
    <main className={`website ${currentEvent ? currentEvent.theme : ""}`}>
      <header className="topbar">
        <button
          className="brand"
          onClick={() => goTo("cover")}
          type="button"
        >
          <span className="brand-icon">
            <Heart size={17} fill="currentColor" />
          </span>
          M & M
        </button>

        <span className="topbar-caption">A WEDDING CELEBRATION</span>

        <button
          className={`music-button ${musicOn ? "active" : ""}`}
          onClick={() => setMusicOn(!musicOn)}
          type="button"
        >
          <Music size={17} />
          <span>{musicOn ? "Music on" : "Our day"}</span>
        </button>
      </header>

      <nav className="progress-nav" aria-label="Invitation sections">
        {["cover", "announcement", "event-0", "event-1", "event-2", "schedule", "finale"].map(
          (item, index) => (
            <button
              key={item}
              className={page === item ? "current" : ""}
              onClick={() => goTo(item)}
              type="button"
              title={item}
              aria-label={`Go to section ${index + 1}`}
            />
          )
        )}
      </nav>

      {/* COVER PAGE */}

      {page === "cover" && (
        <section className="cover page-section">
          <div className="cover-photo" />

          <div className="cover-ornament ornament-one">✿</div>
          <div className="cover-ornament ornament-two">✿</div>

          <div className="cover-content">
            <span className="eyebrow">
              <Sparkles size={15} />
              YOU ARE CORDIALLY INVITED
            </span>

            <p className="script-label">The wedding celebration of</p>

            <CoupleNames />

            <div className="cover-rule">
              <span>✦</span>
            </div>

            <p className="cover-date">
              10 · 11 · 14 November
            </p>

            <p className="cover-hint">
              A little love, a little magic, a lifetime together.
            </p>

            
<button
  className="primary-button"
  onClick={() => goTo("announcement")}
  type="button"
>
  Open Invitation <ArrowRight size={17} />
</button>

<div className="creator-signature">
  <span>Thoughtfully designed & created by</span>
  <strong>Javeria Shahzad</strong>
  <span className="signature-heart">♡</span>
</div>

          </div>

          <div className="cover-bottom">MADE WITH LOVE & DUAS</div>
        </section>
      )}

      {/* ANNOUNCEMENT AND COUNTDOWN */}

      {page === "announcement" && (
        <section className="page-section announcement">
          {/* <div className="announcement-image">
            <img
              src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1400&q=85"
              alt="Wedding celebration"
            />
            <span className="photo-caption">
              A beautiful new beginning
            </span>
          </div> */}

          <div className="announcement-copy">
            <span className="eyebrow">
              BISMILLAH IR-RAHMAN IR-RAHEEM
            </span>

            <div className="bismillah">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </div>

            <p className="script-label">With the blessings of Allah</p>

            <h1>
              Two hearts.
              <br />
              <em>One beautiful journey.</em>
            </h1>

            <p className="body-copy">
              With the blessings of Allah and the love of our families,
              we invite you to join us as we begin this beautiful journey
              together. Your presence and duas will make our celebration
              even more special.
            </p>

            <CoupleNames small />

            <p className="script-label">Counting down to the celebrations</p>

            <Countdown />

            <button
              className="primary-button"
              onClick={() => goTo("event-0")}
              type="button"
            >
              Explore the celebrations <ArrowRight size={17} />
            </button>
          </div>
        </section>
      )}

      {/* INDIVIDUAL EVENT INVITATIONS */}

      {isEvent && currentEvent && (
        <section className={`page-section event-page ${currentEvent.theme}`}>
          <div
            className="event-photo"
            style={{ backgroundImage: `url("${currentEvent.image}")` }}
          />

          <div className="event-overlay" />

          <div className="event-details">
            <span className="eyebrow">
              JOIN US FOR A BEAUTIFUL CELEBRATION
            </span>

            <div className="event-icon">
              {(() => {
                const Icon = currentEvent.icon;
                return <Icon size={29} />;
              })()}
            </div>

            <p className="script-label">Let the celebrations begin</p>

            <h1>{currentEvent.name}</h1>

            <p className="event-description">
              {currentEvent.description}
            </p>

            <div className="event-info">
              <div>
                <CalendarDays />
                <span>
                  <small>DATE</small>
                  <strong>{currentEvent.date}</strong>
                </span>
              </div>

              <div>
                <Clock />
                <span>
                  <small>TIME</small>
                  <strong>{currentEvent.time}</strong>
                </span>
              </div>

              <div>
                <MapPin />
                <span>
                  <small>VENUE</small>
                  <strong>{currentEvent.venue}</strong>
                </span>
              </div>
            </div>

            <p className="dress-code">
              ATTIRE · {currentEvent.dress}
            </p>

            <div className="button-row centered">
              {eventIndex > 0 && (
                <button
                  className="secondary-button"
                  onClick={() => goTo(`event-${eventIndex - 1}`)}
                  type="button"
                >
                  Previous
                </button>
              )}

              <button
                className="primary-button"
                onClick={() =>
                  goTo(
                    eventIndex < events.length - 1
                      ? `event-${eventIndex + 1}`
                      : "schedule"
                  )
                }
                type="button"
              >
                {eventIndex < events.length - 1
                  ? "Next celebration"
                  : "Wedding schedule"}
                <ArrowRight size={17} />
              </button>
            </div>
          </div>
        </section>
      )}

      {/* ALL EVENTS AT A GLANCE */}

      {page === "schedule" && (
        <section className="page-section schedule-page">
          <div className="section-heading">
            <span className="eyebrow">SAVE THESE SPECIAL DATES</span>

            <h1>
              The wedding <em>schedule</em>
            </h1>

            <p>
              Three beautiful occasions. One unforgettable celebration.
            </p>
          </div>

          <div className="schedule-grid">
            {events.map((event, index) => (
              <EventCard
                key={event.name}
                event={event}
                onClick={() => goTo(`event-${index}`)}
              />
            ))}
          </div>

          <div className="schedule-note">
            <Heart size={18} />
            We look forward to celebrating with you.
          </div>

          <button
            className="primary-button"
            onClick={() => goTo("finale")}
            type="button"
          >
            With love, from our family <Heart size={17} />
          </button>
        </section>
      )}

      {/* FINAL WELCOME PAGE — NO COUPLE PHOTOS */}

      {page === "finale" && (
        <section className="page-section finale-page">
          <div
            className="finale-image"
            style={{
              backgroundImage:
                'url("https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1600&q=85")',
            }}
          />

          <div className="finale-card">
            <Sparkles size={27} />

            <p className="script-label">With love in our hearts</p>

            <h1>
              We can't wait
              <br />
              to welcome <em>you!</em>
            </h1>

            <div className="finale-floral-divider">
              <span>✿</span>
              <Heart size={20} fill="currentColor" />
              <span>✿</span>
            </div>

            {/* <p className="finale-welcome">
              We can't wait to welcome
            </p> */}

            <h2 className="family-name">
              Mr. &amp; Mrs. Amjad Hussain
            </h2>

            <p className="body-copy">
              Your presence, love and duas will make these celebrations
              even more beautiful. We look forward to sharing these
              precious moments with you.
            </p>

            <div className="cover-rule">
              <span>✦</span>
            </div>

            <p className="cover-date">
              Mehndi · Barat · Walima
            </p>

            <button
              className="secondary-button"
              onClick={() => goTo("cover")}
              type="button"
            >
              Back to invitation
            </button>
          </div>
        </section>
      )}

      <footer className="site-footer">
        <span>
          MADE WITH <Heart size={12} fill="currentColor" /> LOVE
        </span>

        <span className="creator-credit">
          Website created by <strong>Javeria Shahzad</strong>
        </span>

        <span>
          {couple.bride} &amp; {couple.groom}
        </span>
      </footer>
    </main>
  );
}

export default App;
