import { motion } from "framer-motion";
import { ChevronDown, MapPin } from "lucide-react";
import { useEffect, useRef } from "react";
import { FloralDivider, FloatingPetal } from "../common/Decor";
import { wedding } from "../../data/weddingData";
import { useReducedMotionPreference } from "../../hooks/useReducedMotionPreference";
import { gsap } from "../../lib/gsap";

function GoldCorner({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="56"
      height="56"
      viewBox="0 0 72 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M8 60 C14 40, 26 22, 52 8" stroke="rgba(201,168,124,0.38)" strokeWidth="0.9" strokeLinecap="round" />
      <path d="M22 38 C14 34, 12 26, 18 20 C26 25, 28 32, 22 38Z" fill="rgba(201,168,124,0.07)" stroke="rgba(201,168,124,0.32)" strokeWidth="0.75" />
      <path d="M34 22 C27 15, 30 8, 38 5 C44 13, 42 20, 34 22Z" fill="rgba(240,217,191,0.06)" stroke="rgba(240,217,191,0.3)" strokeWidth="0.75" />
      <path d="M43 16 C51 11, 58 13, 62 21 C53 25, 47 22, 43 16Z" fill="rgba(201,168,124,0.06)" stroke="rgba(201,168,124,0.26)" strokeWidth="0.75" />
      <circle cx="10" cy="58" r="1.2" fill="rgba(201,168,124,0.35)" />
      <circle cx="54" cy="10" r="1.2" fill="rgba(201,168,124,0.35)" />
    </svg>
  );
}

export default function HeroInvitation() {
  const rootRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotionPreference();
  const hasOpenedRef = useRef(false);

  const unlockScroll = () => {
    document.body.style.overflow = "";
    document.documentElement.style.overflow = "";
  };

  const openEnvelope = () => {
    if (hasOpenedRef.current) return;
    hasOpenedRef.current = true;

    if (prefersReducedMotion) {
      gsap.set(".envelope-shell", { opacity: 0, pointerEvents: "none" });
      gsap.set(".wedding-card", { opacity: 1 });
      gsap.set(".card-reveal", { y: 0, opacity: 1 });
      gsap.set(".hero-scroll-hint", { opacity: 1 });
      unlockScroll();
      return;
    }

    const tl = gsap.timeline({ onComplete: unlockScroll });

    tl
      // Phase 1: envelope interior disappears
      .to(".envelope-copy", { y: -28, opacity: 0, duration: 0.3, ease: "power2.inOut" })
      .to(".envelope-seal", { scale: 0.6, opacity: 0, y: -18, duration: 0.3, ease: "power2.inOut" }, 0.1)

      // Phase 2: flaps open outward
      .to(".envelope-top-flap", { rotateX: -170, duration: 0.8, ease: "power3.inOut" }, 0.2)
      .to(".envelope-left-fold", { xPercent: -100, duration: 0.7, ease: "power3.inOut" }, 0.3)
      .to(".envelope-right-fold", { xPercent: 100, duration: 0.7, ease: "power3.inOut" }, 0.3)
      .to(".envelope-bottom-pocket", { yPercent: 80, duration: 0.7, ease: "power3.inOut" }, 0.4)

      // Phase 3: simultaneous cross-dissolve — envelope out + content in, zero gap
      .to(".envelope-shell", { opacity: 0, duration: 0.7, ease: "power2.inOut", pointerEvents: "none" }, 0.8)
      .to(".wedding-card", { opacity: 1, duration: 0.7, ease: "power2.inOut" }, 0.8)

      // Phase 4: stagger the individual content items once container is opaque
      .to(".card-reveal", { y: 0, opacity: 1, stagger: 0.08, duration: 0.36, ease: "power2.out" }, 0.98)

      // Phase 5: scroll hint fades in after everything settles
      .to(".hero-scroll-hint", { opacity: 1, duration: 0.4, ease: "power2.out" }, 1.62);
  };

  // Lock scroll on mount — user must tap the envelope first
  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    return unlockScroll; // safety cleanup on unmount
  }, []);

  // Set initial GSAP states + ambient petal float
  useEffect(() => {
    if (!rootRef.current) return undefined;

    const ctx = gsap.context(() => {
      gsap.set(".wedding-card", { opacity: 0 });
      gsap.set(".card-reveal", { y: 14, opacity: 0 });
      gsap.set(".hero-scroll-hint", { opacity: 0 });
      gsap.set(".envelope-top-flap", {
        rotateX: 0,
        transformPerspective: 1200,
        transformOrigin: "50% 0%"
      });

      if (!prefersReducedMotion) {
        gsap.utils.toArray<HTMLElement>(".hero-petal").forEach((petal, i) => {
          gsap.to(petal, {
            x: i % 2 === 0 ? 8 : -8,
            y: i % 2 === 0 ? -12 : 12,
            rotate: i % 2 === 0 ? 8 : -8,
            duration: 5 + i,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
          });
        });
      }
    }, rootRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      id="hero"
      ref={rootRef}
      className="relative h-[100svh] overflow-hidden"
    >
      {/* Portrait bg — anchored top so subjects stay in frame on mobile */}
      <div
        className="absolute inset-0 bg-[url('/bg-full.webp')] bg-cover bg-top bg-no-repeat"
        aria-hidden="true"
      />
      {/* Mobile: light at top (couple visible) → nearly black at bottom (text zone) */}
      <div
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,2,0,0.22)_0%,rgba(4,2,0,0.14)_28%,rgba(4,2,0,0.52)_56%,rgba(4,2,0,0.91)_80%,rgba(2,1,0,0.97)_100%)] sm:bg-[linear-gradient(180deg,rgba(4,2,0,0.72)_0%,rgba(8,4,1,0.55)_35%,rgba(8,4,1,0.60)_65%,rgba(4,2,0,0.92)_100%)]"
        aria-hidden="true"
      />
      {/* Vignette — bottom-anchored ellipse for portrait framing */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_110%_70%_at_50%_80%,transparent_35%,rgba(0,0,0,0.48)_100%)] sm:bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,transparent_30%,rgba(0,0,0,0.62)_100%)]"
        aria-hidden="true"
      />

      {/* ── Envelope ── */}
      <div className="envelope-shell absolute inset-x-0 top-0 bottom-[-120px] z-10 overflow-hidden bg-[linear-gradient(145deg,#fff8ee_0%,#f2dfc8_46%,#dec09a_100%)] shadow-[inset_0_0_90px_rgba(78,61,66,0.08)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_8%,rgba(255,253,249,0.82),transparent_36%),radial-gradient(ellipse_at_50%_72%,rgba(185,136,63,0.16),transparent_46%),linear-gradient(180deg,rgba(255,250,247,0.52),rgba(240,217,191,0.12))]" />
        <div className="envelope-paper-grain absolute inset-0 opacity-45" />

        {/* Envelope Liner Frame & Corners (Visible when open) */}
        <div className="absolute inset-x-4 top-4 bottom-[140px] border-[0.5px] border-[rgba(201,168,124,0.3)] sm:inset-x-8 sm:top-8" />
        <GoldCorner className="absolute left-5 top-5 opacity-40 sm:left-9 sm:top-9" />
        <GoldCorner className="absolute right-5 top-5 rotate-90 opacity-40 sm:right-9 sm:top-9" />

        <div className="envelope-top-flap absolute inset-x-0 top-0 z-40 h-[62dvh] [backface-visibility:hidden] [clip-path:polygon(0_0,100%_0,100%_65%,50%_100%,0_65%)] [transform-style:preserve-3d] bg-[linear-gradient(180deg,#fffaf4_0%,#f3e4d2_48%,#ddc29f_100%)] shadow-[0_26px_58px_rgba(78,61,66,0.16),inset_0_-1px_0_rgba(133,92,58,0.13)]">
          {/* Subtle ornate stamp on the top flap */}
          <div className="absolute top-6 left-1/2 -translate-x-1/2 scale-75 opacity-30 sm:top-8 sm:scale-90">
            <FloralDivider />
          </div>
        </div>
        <div className="envelope-left-fold absolute top-0 bottom-[-120px] left-0 z-30 w-[12vw] bg-[linear-gradient(90deg,rgba(209,176,169,0.58)_0%,rgba(250,239,226,0.1)_100%)] shadow-[1px_0_10px_rgba(0,0,0,0.05)] sm:w-[8vw]" />
        <div className="envelope-right-fold absolute top-0 bottom-[-120px] right-0 z-30 w-[12vw] bg-[linear-gradient(-90deg,rgba(203,191,215,0.4)_0%,rgba(250,239,226,0.1)_100%)] shadow-[-1px_0_10px_rgba(0,0,0,0.05)] sm:w-[8vw]" />
        <div className="envelope-bottom-pocket absolute inset-x-0 bottom-[-120px] z-[35] h-[calc(70dvh+120px)] bg-[linear-gradient(180deg,#f0d8b8_0%,#fff8ef_42%,#e5c99f_100%)] shadow-[0_-12px_36px_rgba(78,61,66,0.15),inset_0_1px_0_rgba(255,255,255,0.74)]">
          {/* Inner foil frame on the pocket */}
          <div className="absolute inset-x-4 top-4 bottom-[136px] border-[0.5px] border-[rgba(201,168,124,0.4)] sm:inset-x-8 sm:top-6 sm:bottom-[140px]" />
          <GoldCorner className="absolute left-5 top-5 opacity-50 sm:left-9 sm:top-7" />
          <GoldCorner className="absolute right-5 top-5 rotate-90 opacity-50 sm:right-9 sm:top-7" />
        </div>

        <FloatingPetal className="hero-petal absolute left-[9%] top-[16%] z-[55] h-5 w-4 -rotate-12 opacity-60" />
        <FloatingPetal className="hero-petal absolute right-[11%] top-[19%] z-[55] h-5 w-4 rotate-12 opacity-60" />
        <FloatingPetal className="hero-petal absolute bottom-[24%] left-[14%] z-[55] h-5 w-4 rotate-6 opacity-55" />
        <FloatingPetal className="hero-petal absolute bottom-[19%] right-[14%] z-[55] h-5 w-4 -rotate-6 opacity-55" />

        {/* Names shown on closed envelope */}
        <div className="absolute inset-x-0 top-[14%] z-[60] flex justify-center px-6 sm:top-[16%]">
          <div className="envelope-copy flex w-full max-w-[340px] flex-col items-center text-center">
            <div className="mb-5 h-px w-24 bg-[linear-gradient(90deg,transparent,rgba(133,92,58,0.22),transparent)]" aria-hidden="true" />
            <p className="font-body text-[8px] font-semibold uppercase tracking-[0.28em] text-[rgba(78,61,66,0.46)] [text-shadow:0_1px_0_rgba(255,255,255,0.58)]">
              Together with their families
            </p>
            <p className="mt-8 font-script text-[52px] leading-[0.88] text-[rgba(78,61,66,0.88)] drop-shadow-[0_1px_0_rgba(255,255,255,0.78)] sm:text-[74px]">
              {wedding.brideFirst}
            </p>
            <span className="my-4 font-display text-[22px] italic leading-none text-[rgba(133,92,58,0.58)]">
              weds
            </span>
            <p className="font-script text-[52px] leading-[0.88] text-[rgba(78,61,66,0.88)] drop-shadow-[0_1px_0_rgba(255,255,255,0.78)] sm:text-[74px]">
              {wedding.groomFirst}
            </p>
            <div className="mt-6 h-px w-20 bg-[linear-gradient(90deg,transparent,rgba(133,92,58,0.18),transparent)]" aria-hidden="true" />
          </div>
        </div>

        {/* Tap-to-open seal button */}
        <div className="absolute inset-x-0 top-[62dvh] z-[65] flex justify-center -translate-y-1/2">
          <button
            type="button"
            onClick={openEnvelope}
            className="envelope-seal wax-seal light-focus relative isolate flex h-16 w-16 items-center justify-center rounded-full border border-[rgba(255,250,247,0.62)] bg-[radial-gradient(circle_at_34%_28%,#f5d99e_0%,#d1a45d_34%,#a97831_78%,#81551f_100%)] shadow-[0_12px_24px_rgba(78,61,66,0.4),inset_0_2px_4px_rgba(255,255,255,0.38),inset_0_-8px_16px_rgba(86,48,18,0.22)] transition-transform duration-300 hover:scale-[1.04] active:scale-95 sm:h-[78px] sm:w-[78px]"
            aria-label="Open wedding invitation"
          >
            <span className="absolute inset-[9px] rounded-full border border-[rgba(88,51,20,0.28)] shadow-[inset_0_1px_3px_rgba(255,250,247,0.28)]" aria-hidden="true" />
            <span className="relative z-10 font-display text-[8px] font-bold uppercase tracking-[0.2em] text-[rgba(70,42,20,0.82)] [text-shadow:0_1px_0_rgba(255,250,247,0.28)] sm:text-[9px]">
              Open
            </span>
          </button>
        </div>

        {/* Date shown on the lower portion of the envelope */}
        <div className="absolute inset-x-0 top-[76dvh] z-[60] flex justify-center px-6">
          <div className="envelope-copy flex w-full flex-col items-center text-center">
            <p className="font-body text-[9.5px] font-semibold uppercase tracking-[0.28em] text-[rgba(78,61,66,0.65)] [text-shadow:0_1px_0_rgba(255,255,255,0.65)]">
              {wedding.date}
            </p>
            <div className="mt-4 h-px w-16 bg-[linear-gradient(90deg,transparent,rgba(133,92,58,0.2),transparent)]" aria-hidden="true" />
          </div>
        </div>
      </div>

      {/* ── Revealed content — overlays the bg image directly ── */}
      <div
        className={`wedding-card pointer-events-none absolute inset-x-0 top-0 z-20 flex justify-center px-6 pt-5 sm:pt-6 ${prefersReducedMotion ? "opacity-100" : "opacity-0"
          }`}
      >
        <div
          className="absolute inset-x-0 top-[-10px] h-[92px] bg-[linear-gradient(180deg,rgba(2,1,0,0.9)_0%,rgba(4,2,0,0.68)_46%,rgba(4,2,0,0)_100%)] sm:h-[108px]"
          aria-hidden="true"
        />
        <div className="card-reveal relative flex w-full max-w-[360px] items-center justify-center gap-2 sm:max-w-[460px] sm:gap-4">
          <div className="h-px w-5 bg-[linear-gradient(90deg,transparent,rgba(201,168,124,0.5))] sm:w-12" />
          <p className="whitespace-nowrap font-display text-[14px] font-semibold uppercase leading-none tracking-[0.16em] text-[rgba(240,217,191,0.88)] [text-shadow:0_2px_16px_rgba(201,168,124,0.24)] sm:text-[18px] sm:tracking-[0.22em]">
            Wedding Invitation
          </p>
          <div className="h-px w-5 bg-[linear-gradient(90deg,rgba(201,168,124,0.5),transparent)] sm:w-12" />
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex flex-col items-center justify-end pb-10 sm:inset-0 sm:justify-center sm:pb-0">
        <article
          className={`wedding-card relative flex w-full max-w-[360px] flex-col items-center px-6 text-center sm:max-w-[420px] sm:px-8 ${prefersReducedMotion ? "opacity-100" : "opacity-0"
            }`}
        >
          {/* Decorative gold corners — hidden on mobile, shown sm+ */}
          <GoldCorner className="pointer-events-none absolute -left-2 -top-6 hidden opacity-75 sm:block sm:-left-8 sm:-top-8" />
          <GoldCorner className="pointer-events-none absolute -bottom-6 -right-2 hidden rotate-180 opacity-75 sm:block sm:-bottom-8 sm:-right-8" />

          {/* Couple names */}
          <h1 className="card-reveal flex flex-col items-center">
            <span className="font-script text-[64px] leading-none text-white [text-shadow:0_3px_24px_rgba(201,168,124,0.2)] sm:text-[88px] md:text-[104px]">
              {wedding.brideFirst}
            </span>
            <span className="font-display text-[22px] italic leading-none text-[rgba(201,168,124,0.68)] sm:text-[28px]">
              weds
            </span>
            <span className="font-script text-[64px] leading-none text-white [text-shadow:0_3px_24px_rgba(201,168,124,0.2)] sm:text-[88px] md:text-[104px]">
              {wedding.groomFirst}
            </span>
          </h1>

          {/* Floral divider */}
          <div className="card-reveal mt-5 opacity-65 [filter:brightness(1.7)_saturate(0.45)] sm:mt-7">
            <FloralDivider />
          </div>

          {/* Date */}
          <div className="card-reveal mt-5 sm:mt-7">
            <p className="font-body text-[12px] font-semibold uppercase tracking-[0.26em] text-[rgba(240,217,191,0.84)] sm:text-[14px]">
              {wedding.date}
            </p>
            <p className="mt-1 font-body text-[9px] font-semibold uppercase tracking-[0.2em] text-[rgba(240,217,191,0.66)] sm:text-[10px]">
              Sumuhurtham at {wedding.muhurthamTime}
            </p>
            <p className="mt-2 font-script text-[34px] leading-none text-[rgba(240,217,191,0.9)] [text-shadow:0_3px_22px_rgba(201,168,124,0.2)] sm:text-[42px]">
              Save the date
            </p>
          </div>

          {/* Venue */}
          <div className="card-reveal mt-4 flex items-start justify-center gap-1.5 sm:mt-5">
            <MapPin size={12} className="mt-[3px] shrink-0 text-[rgba(217,182,176,0.7)]" aria-hidden="true" />
            <p className="font-body text-[10px] font-medium uppercase leading-[1.8] tracking-[0.13em] text-[rgba(255,250,247,0.45)]">
              {wedding.venue}
              <span className="block">{wedding.city}</span>
            </p>
          </div>

          {/* Rule */}
          <div className="card-reveal mt-6 h-px w-20 bg-[linear-gradient(90deg,transparent,rgba(201,168,124,0.28),transparent)] sm:mt-8" />
        </article>
      </div>

      {/* Scroll hint — hidden until animation completes */}
      <div className="absolute inset-x-0 bottom-3 z-40 flex justify-center sm:bottom-6">
        <div className="hero-scroll-hint flex flex-col items-center text-[rgba(201,168,124,0.48)]">
          <span className="h-6 w-px bg-[rgba(201,168,124,0.25)] sm:h-7" />
          <motion.span
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden="true"
          >
            <ChevronDown size={16} />
          </motion.span>
          <span className="sr-only">Scroll to explore</span>
        </div>
      </div>
    </section>
  );
}
