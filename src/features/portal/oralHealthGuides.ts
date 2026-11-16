export interface GuideItem {
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

/**
 * The oral health guide library. Shared by the guide list
 * (`/oral-health-guides`) and the per-guide full page
 * (`/oral-health-guides/:guideId`), which the landing page's "Read Guide"
 * links deep-link into.
 */
export const GUIDES: GuideItem[] = [
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
