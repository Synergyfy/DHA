import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';

interface GuideItem {
  id: string;
  category: 'daily-care' | 'kids' | 'treatments' | 'emergency';
  categoryLabel: string;
  title: string;
  readTime: string;
  summary: string;
  icon: string;
  content: string[];
  tips: string[];
}

const GUIDES: GuideItem[] = [
  {
    id: 'guide-1',
    category: 'daily-care',
    categoryLabel: 'Daily Care',
    title: 'The Modified Bass Brushing Technique',
    readTime: '4 min read',
    summary: 'The clinically recommended technique for removing subgingival plaque without abrading tooth enamel.',
    icon: 'dentistry',
    content: [
      'Position the brush bristles at a 45-degree angle pointing toward your gum line.',
      'Apply gentle, vibratory back-and-forth strokes across 2-3 teeth at a time, followed by a gentle sweep away from the gum margin.',
      'Spend at least two full minutes brushing twice daily: in the morning after breakfast and before bedtime.',
      'Use a fluoridated toothpaste (at least 1,000–1,450 ppm fluoride) and spit without rinsing with water immediately afterward to keep protective fluoride on tooth enamel.',
    ],
    tips: [
      'Replace your toothbrush every 3 months or sooner if bristles flare.',
      'Avoid hard-bristle brushes as they cause gingival recession and cervical wear.',
    ],
  },
  {
    id: 'guide-2',
    category: 'daily-care',
    categoryLabel: 'Daily Care',
    title: 'Effective Interdental Flossing',
    readTime: '3 min read',
    summary: 'How to clean the 40% of tooth surfaces that standard toothbrush bristles cannot reach.',
    icon: 'clean_hands',
    content: [
      'Take approximately 45 cm (18 inches) of dental floss and wind most of it around your middle fingers.',
      'Gently guide the floss between teeth using a gentle rubbing motion. Never snap floss into the gums.',
      'Curve the floss into a C-shape against the side of each tooth and gently slide it beneath the gumline.',
      'Clean both adjacent tooth surfaces before moving to the next interproximal space.',
    ],
    tips: [
      'Bleeding during initial flossing is common; it usually resolves within 7–10 days as inflammation subsides.',
      'Consider interdental brushes or water flossers if you have wide spaces or orthodontic appliances.',
    ],
  },
  {
    id: 'guide-3',
    category: 'kids',
    categoryLabel: 'Kids & Pediatric',
    title: 'Child Dental Care: Teething to Permanent Teeth',
    readTime: '5 min read',
    summary: 'Protecting developing dentition, preventing early childhood caries, and pit-and-fissure sealants.',
    icon: 'child_care',
    content: [
      'Begin oral hygiene before the first tooth erupts by wiping infant gums with a clean, damp washcloth after feedings.',
      'Schedule your baby’s first dental visit when the first tooth appears, or by their first birthday.',
      'Use a tiny smear of fluoride toothpaste (rice-grain size) up to age 3, increasing to a pea-sized amount from ages 3 to 6.',
      'Never put babies to bed with a bottle containing milk, formula, juice, or sweetened liquids to prevent Early Childhood Caries (ECC).',
    ],
    tips: [
      'Ask your dentist about pit-and-fissure sealants on permanent first molars (erupting around age 6).',
      'Supervise child brushing until at least age 7 or 8 until they demonstrate good manual dexterity.',
    ],
  },
  {
    id: 'guide-4',
    category: 'emergency',
    categoryLabel: 'Emergency First-Aid',
    title: 'What to Do During a Dental Emergency',
    readTime: '3 min read',
    summary: 'Critical steps for saving an avulsed (knocked-out) permanent tooth, severe toothaches, and fractures.',
    icon: 'health_and_safety',
    content: [
      'For a knocked-out permanent tooth: Pick up the tooth by the crown (top), NEVER by the root.',
      'If dirty, rinse briefly with cold water for 10 seconds. Do not scrub or sterilize with alcohol.',
      'Gently place the tooth back in the socket if possible, or immediately store it in cold milk or saliva inside the cheek.',
      'Reach an accredited dental clinic within 30 to 60 minutes for the highest chance of successful replantation.',
      'For severe toothache: Rinse mouth with warm salt water and take paracetamol/ibuprofen as directed. Do not place aspirin directly on gum tissue.',
    ],
    tips: [
      'Never attempt to replant a primary (baby) tooth as it can damage the developing adult tooth underneath.',
      'Use cold compress on the outside of the cheek for swelling; seek emergency clinical attention immediately.',
    ],
  },
  {
    id: 'guide-5',
    category: 'treatments',
    categoryLabel: 'Dental Treatments',
    title: 'Understanding Caries & Enamel Remineralization',
    readTime: '5 min read',
    summary: 'The science of demineralization, acid attacks, and how early enamel lesions can be reversed without drilling.',
    icon: 'coronavirus',
    content: [
      'Dental caries is an active chemical process caused by bacteria (Streptococcus mutans) fermenting dietary carbohydrates into lactic acid.',
      'Acid dissolves calcium and phosphate minerals from tooth enamel whenever pH drops below 5.5.',
      'In early white-spot lesion stages, fluoride applications and saliva calcium ions can rebuild the crystal lattice through remineralization.',
      'Once a physical cavity (hole) forms into dentin, professional restorative excavation and filling is required.',
    ],
    tips: [
      'Limit sugary snack frequency between meals; snacking keeps oral pH in the danger zone for hours.',
      'Drink plenty of water throughout the day to support healthy saliva flow and natural buffering.',
    ],
  },
  {
    id: 'guide-6',
    category: 'treatments',
    categoryLabel: 'Dental Treatments',
    title: 'Periodontal Health: Gingivitis vs Periodontitis',
    readTime: '4 min read',
    summary: 'Recognizing early gum disease and preventing irreversible alveolar bone loss around teeth.',
    icon: 'healing',
    content: [
      'Gingivitis is the early, reversible inflammation of the gums characterized by redness, swelling, and bleeding on brushing.',
      'Untreated gingivitis can advance to periodontitis, where bacterial infection attacks the alveolar bone and periodontal ligament supporting teeth.',
      'Warning signs include persistent bad breath (halitosis), receding gums, loose teeth, and changes in bite alignment.',
      'Professional scaling and root planing by a dental hygienist or periodontist removes hardened calculus (tartar) that brushing cannot eliminate.',
    ],
    tips: [
      'Healthy gums do not bleed when brushed or flossed gently.',
      'Annual or bi-annual professional prophylaxis scaling is essential for long-term tooth preservation.',
    ],
  },
];

export const OralHealthGuidesScreen: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeGuide, setActiveGuide] = useState<GuideItem | null>(null);

  const filteredGuides = useMemo(() => {
    return GUIDES.filter((guide) => {
      const matchesCategory = selectedCategory === 'all' || guide.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        guide.title.toLowerCase().includes(q) ||
        guide.summary.toLowerCase().includes(q) ||
        guide.categoryLabel.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-[#faf8ff] text-[#131b2e] font-['Inter'] flex flex-col antialiased">
      {/* Top Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-[#eaedff] shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-10 h-10 rounded-xl bg-[#006194] flex items-center justify-center text-white shadow-sm">
              <Icon name="dentistry" className="text-[24px]" />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold font-['Plus_Jakarta_Sans'] text-[#131b2e] leading-tight">DHA</span>
              <span className="text-[10px] text-[#707881] uppercase tracking-wider font-semibold">Dental Health</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <button
              onClick={() => navigate('/')}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-[#3f4850] hover:text-[#131b2e] hover:bg-[#f2f3ff] transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => navigate('/about')}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-[#3f4850] hover:text-[#131b2e] hover:bg-[#f2f3ff] transition-colors"
            >
              About DHA
            </button>
            <button
              onClick={() => navigate('/for-professionals')}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-[#3f4850] hover:text-[#131b2e] hover:bg-[#f2f3ff] transition-colors"
            >
              For Professionals
            </button>
            <button
              onClick={() => navigate('/oral-health-guides')}
              className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-[#cce5ff] text-[#001d31] transition-colors"
            >
              Oral Health Guides
            </button>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/login')}
              className="text-xs font-semibold text-[#3f4850] hover:text-[#006194] px-3 py-2 transition-colors"
            >
              Log In
            </button>
            <button
              onClick={() => navigate('/onboarding/get-started')}
              className="h-10 px-4 rounded-xl bg-[#006194] text-white text-xs font-semibold hover:bg-[#007bb9] shadow-sm transition-all active:scale-[0.98]"
            >
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 w-full pb-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-[#f2f3ff] to-[#faf8ff] py-14 sm:py-18 border-b border-[#eaedff]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center gap-3">
            <h1 className="text-3xl sm:text-4xl font-extrabold font-['Plus_Jakarta_Sans'] text-[#131b2e] tracking-tight">
              Evidence-Based Oral Health Guides
            </h1>
            <p className="text-sm text-[#3f4850] max-w-xl leading-relaxed">
              Clinician-approved guides on preventive hygiene, pediatric dental wellness, emergency care, and treatment
              expectations tailored for Nigerian families.
            </p>

            {/* Search Input */}
            <div className="w-full max-w-md mt-4 relative">
              <Icon
                name="search"
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#707881] text-[20px] pointer-events-none"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search brushing, flossing, teething, emergencies..."
                className="w-full h-12 pl-11 pr-10 rounded-2xl bg-white border border-[#eaedff] text-sm text-[#131b2e] placeholder:text-[#707881] shadow-xs focus:outline-none focus:ring-2 focus:ring-[#006194]/20 focus:border-[#006194]/40"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#707881] hover:text-[#131b2e] p-1"
                >
                  <Icon name="cancel" className="text-[18px]" />
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Category Filters */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            {[
              { id: 'all', label: 'All Guides' },
              { id: 'daily-care', label: 'Daily Care & Hygiene' },
              { id: 'kids', label: 'Kids & Pediatric' },
              { id: 'emergency', label: 'Emergency First-Aid' },
              { id: 'treatments', label: 'Dental Treatments' },
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all shrink-0 ${
                  selectedCategory === cat.id
                    ? 'bg-[#006194] text-white shadow-sm'
                    : 'bg-white border border-[#eaedff] text-[#3f4850] hover:bg-[#f2f3ff]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </section>

        {/* Guides Grid */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {filteredGuides.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGuides.map((guide) => (
                <article
                  key={guide.id}
                  onClick={() => setActiveGuide(guide)}
                  className="group rounded-2xl bg-white border border-[#eaedff] p-5 sm:p-6 shadow-sm hover:shadow-md hover:border-[#006194]/40 cursor-pointer transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="w-10 h-10 rounded-xl bg-[#eaedff] flex items-center justify-center text-[#006194] group-hover:scale-105 transition-transform">
                        <Icon name={guide.icon} className="text-[22px]" />
                      </span>
                      <span className="text-[11px] font-semibold text-[#707881] bg-[#f2f3ff] px-2.5 py-0.5 rounded-full">
                        {guide.readTime}
                      </span>
                    </div>

                    <span className="text-[11px] font-semibold text-[#006a61] uppercase tracking-wider">
                      {guide.categoryLabel}
                    </span>
                    <h3 className="text-base font-bold font-['Plus_Jakarta_Sans'] text-[#131b2e] mt-1 group-hover:text-[#006194] transition-colors leading-snug">
                      {guide.title}
                    </h3>
                    <p className="text-xs text-[#3f4850] mt-2 leading-relaxed line-clamp-3">{guide.summary}</p>
                  </div>

                  <div className="pt-4 border-t border-[#eaedff]/60 mt-4 flex items-center justify-between text-xs font-semibold text-[#006194]">
                    <span>Read Full Guide</span>
                    <Icon name="arrow_forward" className="text-[16px] group-hover:translate-x-1 transition-transform" />
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center rounded-2xl bg-white border border-[#eaedff] max-w-md mx-auto">
              <Icon name="search_off" className="text-[32px] text-[#707881] mb-2" />
              <h3 className="text-sm font-bold text-[#131b2e]">No guides found</h3>
              <p className="text-xs text-[#707881] mt-1">Try another keyword or select All Guides.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="mt-4 px-4 py-2 rounded-xl bg-[#006194] text-white text-xs font-semibold"
              >
                Reset Search
              </button>
            </div>
          )}
        </section>

        {/* Find Clinic Consultation Callout */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <div className="p-6 sm:p-8 rounded-3xl bg-[#f2f3ff] border border-[#eaedff] flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#006194] flex items-center justify-center text-white shrink-0">
                <Icon name="calendar_month" className="text-[24px]" />
              </div>
              <div>
                <h3 className="text-base font-bold font-['Plus_Jakarta_Sans'] text-[#131b2e]">
                  Need a Comprehensive In-Person Checkup?
                </h3>
                <p className="text-xs sm:text-sm text-[#3f4850]">
                  Find licensed dental practices, check verified clinician reviews, and book appointments near you.
                </p>
              </div>
            </div>
            <button
              onClick={() => navigate('/patient-dashboard/discovery')}
              className="h-11 px-5 rounded-xl bg-[#006194] text-white text-xs font-semibold hover:bg-[#007bb9] shrink-0"
            >
              Find Clinics Near Me
            </button>
          </div>
        </section>
      </main>

      {/* Guide Detail Modal */}
      {activeGuide && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-[#eaedff] p-6 sm:p-8 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-[#eaedff] flex items-center justify-center text-[#006194] shrink-0">
                  <Icon name={activeGuide.icon} className="text-[22px]" />
                </span>
                <div>
                  <span className="text-[11px] font-semibold text-[#006a61] uppercase tracking-wider">
                    {activeGuide.categoryLabel} &bull; {activeGuide.readTime}
                  </span>
                  <h2 className="text-xl font-bold font-['Plus_Jakarta_Sans'] text-[#131b2e] leading-snug">
                    {activeGuide.title}
                  </h2>
                </div>
              </div>
              <button
                onClick={() => setActiveGuide(null)}
                className="w-8 h-8 rounded-full hover:bg-[#f2f3ff] flex items-center justify-center text-[#707881] shrink-0"
              >
                <Icon name="close" className="text-[20px]" />
              </button>
            </div>

            <p className="text-xs sm:text-sm text-[#3f4850] italic border-l-2 border-[#006194] pl-3 py-1 bg-[#f2f3ff]/50 rounded-r-lg">
              {activeGuide.summary}
            </p>

            {/* Step-by-Step Instructions */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#131b2e]">Clinical Step-by-Step</h3>
              <ol className="space-y-2.5">
                {activeGuide.content.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-[#3f4850]">
                    <span className="w-5 h-5 rounded-full bg-[#cce5ff] text-[#001d31] text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Clinical Tips */}
            <div className="p-4 rounded-2xl bg-[#86f2e4]/20 border border-[#86f2e4]/40 space-y-2">
              <div className="flex items-center gap-2 text-[#005049] text-xs font-bold uppercase tracking-wider">
                <Icon name="lightbulb" className="text-[16px] text-[#006a61]" filled={true} />
                <span>Dentist Practical Tips</span>
              </div>
              <ul className="space-y-1.5">
                {activeGuide.tips.map((tip, idx) => (
                  <li key={idx} className="text-xs text-[#005049] flex items-start gap-2">
                    <span className="text-[#006a61] mt-0.5">&bull;</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setActiveGuide(null)}
                className="px-6 py-2.5 rounded-xl bg-[#006194] text-white text-xs font-semibold hover:bg-[#007bb9]"
              >
                Close Guide
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="w-full bg-[#f2f3ff] border-t border-[#eaedff] py-10 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#707881]">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-[#006194] flex items-center justify-center text-white">
              <Icon name="dentistry" className="text-[14px]" />
            </div>
            <span className="font-semibold text-[#131b2e]">DHA Dental Health Authority</span>
          </div>
          <span>&copy; 2026 DHA. All rights reserved. Public Educational Resources.</span>
        </div>
      </footer>
    </div>
  );
};
