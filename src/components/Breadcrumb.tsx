import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Home, Compass } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { projects } from '../data/projects';
import { motion } from 'motion/react';

export default function Breadcrumb() {
  const { lang, t, isRTL } = useLanguage();
  const location = useLocation();

  // Split and filter empty pathnames
  const pathnames = location.pathname.split('/').filter((x) => x);

  // If we are on the Home page, we don't render breadcrumbs
  if (pathnames.length === 0) {
    return null;
  }

  // Helper to translate route segments to localized readable names
  const getSegmentName = (segment: string) => {
    switch (segment.toLowerCase()) {
      case 'about':
        return t.nav.about;
      case 'services':
        return t.nav.services;
      case 'portfolio':
        return t.nav.portfolio;
      case 'blog':
        return t.nav.blog;
      case 'careers':
        return t.nav.careers;
      case 'contact':
        return t.nav.contact;
      default: {
        // Check if segment is a specific project ID
        const matchedProject = projects.find((p) => String(p.id) === segment);
        if (matchedProject) {
          return lang === 'fr' ? matchedProject.fr.title : matchedProject.ar.title;
        }
        // General capitalization fallback
        return segment.charAt(0).toUpperCase() + segment.slice(1).replace(/[-_]/g, ' ');
      }
    }
  };

  // Icon for separating items (switches orientation based on text direction)
  const SeparatorIcon = isRTL ? ChevronLeft : ChevronRight;

  // Staggered variants for entering animation
  const containerVariants = {
    hidden: { opacity: 0, y: -5 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: isRTL ? 10 : -10 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <nav
      aria-label="breadcrumb"
      className="inline-flex py-3 px-6 rounded-2xl bg-white/[0.03] border border-white/5 backdrop-blur-md select-none"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <motion.ol
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex items-center gap-3 text-xs font-mono tracking-wider text-gray-400"
      >
        {/* Link back to Home */}
        <motion.li variants={itemVariants} className="flex items-center">
          <Link
            to="/"
            className="flex items-center gap-1.5 text-gray-500 hover:text-sky-400 transition-colors focus:outline-none focus:text-sky-400"
            title={t.nav.home}
          >
            <Home size={13} className="shrink-0" />
            <span className="sr-only">{t.nav.home}</span>
          </Link>
        </motion.li>

        {/* Dynamic trail segments */}
        {pathnames.map((value, index) => {
          const last = index === pathnames.length - 1;
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;
          const localizedName = getSegmentName(value);

          return (
            <React.Fragment key={to}>
              <motion.li variants={itemVariants} className="flex items-center text-gray-600">
                <SeparatorIcon size={12} className="shrink-0" />
              </motion.li>

              <motion.li variants={itemVariants} className="flex items-center">
                {last ? (
                  <span
                    className="text-sky-400 font-bold"
                    aria-current="page"
                  >
                    {localizedName}
                  </span>
                ) : (
                  <Link
                    to={to}
                    className="text-gray-500 hover:text-white transition-colors focus:outline-none focus:text-white"
                  >
                    {localizedName}
                  </Link>
                )}
              </motion.li>
            </React.Fragment>
          );
        })}
      </motion.ol>
    </nav>
  );
}
