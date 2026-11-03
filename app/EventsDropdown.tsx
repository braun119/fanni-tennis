"use client";

import { useEffect, useRef, useState } from "react";

type EventsDropdownProps = {
  id: string;
  label: string;
  currentEventsLabel: string;
  currentEventsHref: string;
  getawaysLabel: string;
  getawaysHref: string;
  kidsCampsLabel: string;
  kidsCampsHref: string;
  currentEventsActive?: boolean;
  getawaysActive?: boolean;
  onNavigate?: () => void;
};

export default function EventsDropdown({
  id,
  label,
  currentEventsLabel,
  currentEventsHref,
  getawaysLabel,
  getawaysHref,
  kidsCampsLabel,
  kidsCampsHref,
  currentEventsActive = false,
  getawaysActive = false,
  onNavigate,
}: EventsDropdownProps) {
  const [open, setOpen] = useState(false);
  const dropdown = useRef<HTMLDivElement>(null);
  const active = currentEventsActive || getawaysActive;

  useEffect(() => {
    const closeOnOutsideClick = (event: PointerEvent) => {
      if (!dropdown.current?.contains(event.target as Node)) setOpen(false);
    };

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  const handleNavigate = () => {
    setOpen(false);
    onNavigate?.();
  };

  return (
    <div ref={dropdown} className={open ? "nav-dropdown open" : "nav-dropdown"}>
      <button
        className={active ? "nav-dropdown-trigger active" : "nav-dropdown-trigger"}
        type="button"
        aria-expanded={open}
        aria-controls={id}
        aria-haspopup="true"
        onClick={() => setOpen((isOpen) => !isOpen)}
      >
        <span>{label}</span>
        <span className="nav-dropdown-chevron" aria-hidden="true" />
      </button>
      <div className="nav-dropdown-menu" id={id}>
        <a
          className={currentEventsActive ? "active" : undefined}
          href={currentEventsHref}
          aria-current={currentEventsActive ? "location" : undefined}
          onClick={handleNavigate}
        >
          {currentEventsLabel}
        </a>
        <a
          className={getawaysActive ? "active" : undefined}
          href={getawaysHref}
          aria-current={getawaysActive ? "page" : undefined}
          onClick={handleNavigate}
        >
          {getawaysLabel}
        </a>
        <a href={kidsCampsHref} onClick={handleNavigate}>
          {kidsCampsLabel}
        </a>
      </div>
    </div>
  );
}
