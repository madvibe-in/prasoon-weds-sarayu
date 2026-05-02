import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { FloralDivider } from "../common/Decor";
import { footerLinks, wedding } from "../../data/weddingData";
import { useReducedMotionPreference } from "../../hooks/useReducedMotionPreference";
import { gsap } from "../../lib/gsap";

export default function ElegantFooter() {
  const rootRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotionPreference();

  useEffect(() => {
    if (!rootRef.current || prefersReducedMotion) {
      return undefined;
    }

    const ctx = gsap.context(() => {
      gsap.from(".footer-reveal", {
        y: 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 80%"
        }
      });
    }, rootRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <footer
      ref={rootRef}
      className="relative min-h-[400px] bg-[linear-gradient(180deg,var(--plum)_0%,#2e2028_100%)] px-4 py-20 text-center md:px-8"
    >
      <div className="mx-auto flex max-w-4xl flex-col items-center">
        <FloralDivider muted className="footer-reveal" />
        <div className="footer-reveal mt-8 flex flex-col items-center font-script leading-none text-[var(--champagne)]">
          <span className="text-[52px]">{wedding.groomFirst}</span>
          <span className="-my-1 font-display text-[24px] italic text-[rgba(240,217,191,0.72)]">&</span>
          <span className="text-[52px]">{wedding.brideFirst}</span>
        </div>
        <p className="footer-reveal mt-5 font-body text-[13px] uppercase tracking-[0.16em] text-[rgba(255,250,247,0.5)]">
          {wedding.date} - {wedding.city}
        </p>
        <FloralDivider muted className="footer-reveal mt-8 rotate-180" />

        <div className="footer-reveal mt-10 flex items-center justify-center gap-3">
          {footerLinks.map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              aria-label={link.label}
              className="dark-focus flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(217,182,176,0.2)] bg-[rgba(255,250,247,0.08)] text-[var(--pearl)]"
              whileHover={{ scale: 1.12, rotate: 5 }}
              whileTap={{ scale: 0.96 }}
            >
              <link.Icon size={18} aria-hidden="true" />
            </motion.a>
          ))}
        </div>

        <p className="footer-reveal mt-8 font-display text-xl italic text-[rgba(255,250,247,0.6)]">
          We can't wait to celebrate with you.
        </p>

        <div className="footer-reveal mt-10 h-px w-full max-w-md bg-[rgba(217,182,176,0.2)]" />

        <p className="footer-reveal mt-8 max-w-md font-body text-[11px] leading-relaxed text-[rgba(255,250,247,0.38)]">
          Invitation website crafted by madvibe.designer. For custom event invitation websites, call{" "}
          <a className="dark-focus text-[rgba(240,217,191,0.74)]" href="tel:+919949199787">
            9949199787
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
