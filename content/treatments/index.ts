export type TreatmentCategory =
  | 'cosmetic'
  | 'restorative'
  | 'orthodontic'
  | 'preventive'
  | 'specialist';

type FAQ = { q: string; a: string };
export type Treatment = {
  category: TreatmentCategory;
  slug: string;
  name: string;
  summary: string;
  intro: string;
  howItWorks: string;
  benefits: string[];
  aftercare: string[];
  modelSrc: string;
  heroImage: string;
  posterImage?: string;
  faqs: FAQ[];
  priceGuide: string;
  appointmentLength?: string;
  timeToResult: string;
  durability: string;
  downtime: string;
  risks: string[];
  indications: string[];
  contraindications: string[];
  keywords: string[];
  readingList: { title: string; url: string }[];
  beforeImage?: string;
  afterImage?: string;
  steps: string[];
};

export const TREATMENT_CATEGORY_TITLES: Record<TreatmentCategory, string> = {
  cosmetic: 'Cosmetic Dentistry',
  restorative: 'Restorative Dentistry',
  orthodontic: 'Orthodontics',
  preventive: 'Preventive Care',
  specialist: 'Specialist Treatments',
};

export const treatments: Treatment[] = [
  {
    category: 'cosmetic',
    slug: '3d-printed-veneers',
    name: '3D Printed Veneers',
    summary:
      'Digitally designed veneers printed chairside for a precise fit and minimal preparation, delivering a luminous smile in a single visit.',
    intro:
      'Our 3D printed veneers blend digital scanning, AI design, and micro-layered printing to deliver veneers that look luminous and feel impossibly natural. From the first scan to bonded smile, the entire journey can be completed in as little as one visit.',
    howItWorks: `### Consultation & Smile Preview
We capture a 3D scan and design a digital smile mock-up tailored to your facial proportions.

### 3D Printing & Refinement
Veneers are printed in ultra-thin layers for translucency, then hand-polished by our cosmetic dentists.

### Precise Bonding
A guided bonding protocol ensures each veneer is seated accurately for long-term stability.`,
    benefits: [
      'Same-day smile transformation with digital precision.',
      'Minimal enamel preparation preserves healthy tooth structure.',
      'Layered printing mimics the fluorescence and depth of natural enamel.',
    ],
    aftercare: [
      'Wear the provided night guard for the first week to protect your new veneers.',
      'Avoid extremely hard foods for 48 hours while the adhesive reaches full strength.',
      'Schedule a review appointment after two weeks to fine-tune bite and polish.',
    ],
    modelSrc: '/models/example.glb',
    heroImage: '/gradients/hero-gradient-soft.webp',
    posterImage: '/gradients/hero-gradient-fallback.webp',
    faqs: [
      {
        q: 'How long do 3D printed veneers last?',
        a: 'With careful home care and yearly reviews, 3D printed veneers typically last 7–10 years before considering a refresh.',
      },
      {
        q: 'Will my teeth be shaved down?',
        a: 'Preparation is ultraconservative. In many cases we only smooth the surface enamel to provide a key for bonding.',
      },
      {
        q: 'Can I preview the result first?',
        a: 'Yes. We provide a digital smile design and can even 3D print a try-in for you to wear before committing.',
      },
    ],
    priceGuide: 'From £2,200 for four veneers. Finance from £89/month.',
    appointmentLength: 'Approx. 120 minutes including design review.',
    timeToResult: 'Same-day fit after digital planning.',
    durability: '7–10 years with professional maintenance.',
    downtime: 'Return to routine immediately after treatment.',
    risks: [
      'Temporary tooth sensitivity.',
      'Minor adjustments may be needed after settling.',
      'Chipping if subjected to biting on hard objects.',
    ],
    indications: ['Smile makeovers', 'Peg laterals', 'Discoloured teeth resistant to whitening'],
    contraindications: ['Severe bruxism without guard', 'Advanced gum disease', 'Untreated decay'],
    keywords: ['3D veneers', 'same-day veneers', 'digital smile design', 'cosmetic dentistry'],
    readingList: [
      { title: 'Digital Smile Design Overview', url: 'https://www.straumann.com/dsd/en/home.html' },
      { title: 'Longevity of Additive Veneers', url: 'https://onlinelibrary.wiley.com' },
    ],
    beforeImage: '/gradients/hero-gradient-fallback.webp',
    afterImage: '/gradients/hero-gradient-soft.webp',
    steps: [
      'Digital consultation and smile capture',
      'AI-assisted smile design preview',
      '3D printing and multi-layer finishing',
      'Guided bonding with translucent resin',
      'Review and fine-tune bite contacts',
    ],
  },
  {
    category: 'cosmetic',
    slug: 'composite-bonding',
    name: 'Composite Bonding Refinement',
    summary:
      'Sculpted composite artistry to balance symmetry, close gaps, and repair micro chips without drilling healthy enamel.',
    intro:
      'Composite bonding is a swift, artistic treatment that lets us close spaces, soften edges, and rebalance each tooth with a hand-layered resin that mimics enamel. Our team uses colour-calibrated lighting to blend the material seamlessly with your natural smile.',
    howItWorks: `### Smile Mapping
We map facial midlines, tooth proportions, and surface texture to plan the outcome in 3D.

### Layered Placement
Nano-hybrid composite is layered in micro-films, imitating dentine body shades and enamel translucency.

### Gloss & Protection
Surfaces are polished through multiple grit stages to achieve a glass-like gloss that resists staining.`,
    benefits: [
      'No drilling of healthy enamel for most cases.',
      'Completed in one appointment per arch.',
      'Reversible and adjustable over time.',
    ],
    aftercare: [
      'Avoid tea, coffee, and red wine for 48 hours while the surface seals.',
      'Use a soft polishing toothpaste to maintain lustre.',
      'Book maintenance polishing every 12 months.',
    ],
    modelSrc: '/models/example.glb',
    heroImage: '/gradients/hero-gradient-soft.webp',
    posterImage: '/gradients/hero-gradient-fallback.webp',
    faqs: [
      { q: 'Does bonding hurt?', a: 'The procedure is painless. We work on the outer enamel without injections in most cases.' },
      {
        q: 'How long will results last?',
        a: 'Expect 5–7 years depending on diet and home care. Periodic polishing keeps the resin looking luminous.',
      },
      {
        q: 'Can bonding fix worn edges?',
        a: 'Yes, composite is ideal for restoring chipped or worn incisal edges in a minimally invasive way.',
      },
    ],
    priceGuide: 'From £280 per tooth. Finance options available.',
    appointmentLength: '45–90 minutes depending on scope.',
    timeToResult: 'Results visible immediately after sculpting.',
    durability: '5–7 years before resurfacing.',
    downtime: 'Immediate return to normal routine.',
    risks: ['Surface staining over time', 'Chipping if biting on hard items', 'Requires periodic polishing'],
    indications: ['Diastema closure', 'Edge wear and chips', 'Minor asymmetry corrections'],
    contraindications: ['Heavy grinders without guard', 'Active gum disease', 'Large structural cracks needing crowns'],
    keywords: ['composite bonding', 'minimally invasive dentistry', 'edge bonding'],
    readingList: [
      { title: 'Edge Bonding Case Studies', url: 'https://www.dental-update.co.uk' },
      { title: 'Composite Layering Techniques', url: 'https://journals.sagepub.com' },
    ],
    beforeImage: '/gradients/hero-gradient-fallback.webp',
    afterImage: '/gradients/hero-gradient-soft.webp',
    steps: [
      'Smile design and shade calibration',
      'Micro abrasion and surface priming',
      'Incremental composite layering',
      'Sculpting and texturing',
      'High-gloss polishing and review',
    ],
  },
  {
    category: 'cosmetic',
    slug: 'porcelain-veneers',
    name: 'Porcelain Veneers',
    summary:
      'Hand-crafted porcelain veneers that provide luminous, colour-stable aesthetics for comprehensive smile makeovers.',
    intro:
      'Porcelain veneers deliver durable, colour-perfect transformations where symmetry, surface texture, and shade matching need the ultimate level of artistry.',
    howItWorks: `### Smile Vision Planning
We use mock-ups and temporaries to ensure shape, length, and bite harmony before final porcelain is crafted.

### Ultrathin Preparation
Microscopic enamel reduction allows the porcelain to seat without feeling bulky.

### Master Ceramist Fabrication
Our ceramist layers porcelains with varying translucencies to mimic natural enamel light behaviour.`,
    benefits: [
      'Ultimate control over shape, shade, and translucency.',
      'Porcelain resists staining and maintains lustre for a decade or longer.',
      'Temporaries allow you to trial the new smile before bonding.',
    ],
    aftercare: [
      'Wear a night guard if you clench or grind.',
      'Attend review and polish appointments every six months.',
      'Avoid using teeth to open packaging to prevent edge microfractures.',
    ],
    modelSrc: '/models/example.glb',
    heroImage: '/gradients/hero-gradient-soft.webp',
    posterImage: '/gradients/hero-gradient-fallback.webp',
    faqs: [
      {
        q: 'How long do porcelain veneers last?',
        a: '10–15 years is typical when combined with excellent home care and professional maintenance.',
      },
      { q: 'Can veneers look natural?', a: 'Yes. Layered porcelains can replicate enamel fluorescence, texture, and translucency.' },
      {
        q: 'What if I change my mind?',
        a: 'We provide a provisional stage where adjustments can be made before final bonding, ensuring you love the result.',
      },
    ],
    priceGuide: 'From £950 per veneer.',
    appointmentLength: 'Two visits of 90 minutes plus review.',
    timeToResult: 'Two to three visits including smile design.',
    durability: '10–15 years.',
    downtime: 'Mild sensitivity for 24 hours.',
    risks: ['Temporary sensitivity', 'Need for replacements over time', 'Potential edge chipping without protection'],
    indications: ['Discolouration', 'Wear and erosion', 'Smile redesign'],
    contraindications: ['High-risk bruxism without protection', 'Severe misalignment requiring orthodontics first'],
    keywords: ['porcelain veneers', 'ceramic veneers', 'cosmetic dentist'],
    readingList: [{ title: 'Veneer Longevity Research', url: 'https://www.ncbi.nlm.nih.gov' }],
    beforeImage: '/gradients/hero-gradient-fallback.webp',
    afterImage: '/gradients/hero-gradient-soft.webp',
    steps: [
      'Digital planning and wax-up',
      'Trial smile and feedback session',
      'Minimal enamel preparation',
      'Master ceramist fabrication',
      'Precise bonding and polishing',
    ],
  },
  {
    category: 'restorative',
    slug: 'implants',
    name: 'Dental Implants',
    summary: 'Titanium implants digitally guided for predictable tooth replacement and jaw preservation.',
    intro:
      'Implants restore missing teeth with a titanium root and handcrafted crown, supporting long-term oral health and chewing comfort.',
    howItWorks: `### Guided Planning
3D CBCT scans map the bone and vital structures. A printed surgical guide directs implant placement to the millimetre.

### Implant Placement
Under local anaesthetic (and sedation if desired) the implant is gently inserted with minimal trauma.

### Restoration Phase
After integration, a custom abutment and crown are fitted to blend seamlessly with surrounding teeth.`,
    benefits: ['Preserves bone structure and facial contours.', 'Restores full chewing ability.', 'Long-term investment with high success rates.'],
    aftercare: ['Maintain meticulous oral hygiene with interdental brushes.', 'Attend implant maintenance reviews twice yearly.', 'Avoid smoking for optimal healing.'],
    modelSrc: '/models/example.glb',
    heroImage: '/gradients/hero-gradient-soft.webp',
    posterImage: '/gradients/hero-gradient-fallback.webp',
    faqs: [
      { q: 'Is implant surgery painful?', a: 'Most patients report implant placement is more comfortable than expected thanks to local anaesthetic and gentle technique.' },
      { q: 'How long does healing take?', a: 'Implants typically integrate within 8–12 weeks depending on bone quality.' },
      { q: 'Are implants suitable for everyone?', a: 'Most adults can have implants. We assess bone volume, gum health, and medical history before planning treatment.' },
    ],
    priceGuide: 'From £2,800 including restoration.',
    appointmentLength: '60–90 minutes for placement; review visits shorter.',
    timeToResult: '3–6 months from placement to final crown.',
    durability: '20+ years with maintenance.',
    downtime: 'Return to desk work within 24 hours.',
    risks: ['Post-operative swelling', 'Implant failure if healing compromised', 'Temporary numbness in rare cases'],
    indications: ['Single missing tooth', 'Multiple missing teeth', 'Denture stabilisation'],
    contraindications: ['Uncontrolled diabetes', 'Smoking more than 10/day', 'Radiation therapy to jaw'],
    keywords: ['dental implants', 'tooth replacement', 'guided implant surgery'],
    readingList: [
      { title: 'Implant Success Rates', url: 'https://pubmed.ncbi.nlm.nih.gov' },
      { title: 'CBCT Planning in Implant Dentistry', url: 'https://www.sciencedirect.com' },
    ],
    beforeImage: '/gradients/hero-gradient-fallback.webp',
    afterImage: '/gradients/hero-gradient-soft.webp',
    steps: [
      'Assessment and 3D imaging',
      'Guided surgical planning',
      'Implant placement',
      'Healing and integration',
      'Restorative phase',
    ],
  },
  {
    category: 'restorative',
    slug: 'inlays-onlays',
    name: 'Ceramic Inlays & Onlays',
    summary: 'Precision-milled ceramic inlays/onlays to repair cracked or heavily filled teeth with strength and beauty.',
    intro:
      'Inlays and onlays preserve more natural tooth structure than crowns while reinforcing weakened areas using bonded ceramic or composite.',
    howItWorks: `### Digital Impression
We scan the prepared tooth to create a 3D model.

### Custom Milling
Using CAD/CAM or lab fabrication, the restoration is milled from high-strength ceramic.

### Bonding
The inlay/onlay is bonded under isolation to seal the tooth and restore strength.`,
    benefits: ['Strengthens cracked teeth', 'Matches natural tooth shade', 'Preserves more tooth than a crown'],
    aftercare: ['Avoid chewing hard foods for 24 hours', 'Use high-fluoride toothpaste during the first week', 'Schedule regular bite reviews'],
    modelSrc: '/models/example.glb',
    heroImage: '/gradients/hero-gradient-soft.webp',
    posterImage: '/gradients/hero-gradient-fallback.webp',
    faqs: [
      { q: 'When is an onlay recommended?', a: 'When a filling is too large but a full crown would be excessive, an onlay adds strength without heavy preparation.' },
      { q: 'How long will it last?', a: 'Ceramic onlays often last 10–15 years with good care.' },
      { q: 'Is the process quick?', a: 'Same-day appointments are available with in-house milling for many cases.' },
    ],
    priceGuide: 'From £695 per tooth.',
    appointmentLength: '60 minutes per tooth for preparation and bonding.',
    timeToResult: 'One to two visits depending on fabrication method.',
    durability: '10–15 years.',
    downtime: 'Mild sensitivity for 48 hours.',
    risks: ['Temporary sensitivity', 'Need for replacement if decay recurs', 'Rare debonding requiring re-cementation'],
    indications: ['Large failing fillings', 'Cracked cusps', 'Replacement of amalgam'],
    contraindications: ['Very little tooth structure remaining', 'Active decay', 'Bruxism without protection'],
    keywords: ['ceramic onlay', 'inlay restoration', 'CAD/CAM dentistry'],
    readingList: [{ title: 'Bonded Indirect Restorations', url: 'https://www.researchgate.net' }],
    beforeImage: '/gradients/hero-gradient-fallback.webp',
    afterImage: '/gradients/hero-gradient-soft.webp',
    steps: [
      'Assessment and planning',
      'Preparation and scanning',
      'Fabrication of the restoration',
      'Bonding and finishing',
    ],
  },
  {
    category: 'orthodontic',
    slug: 'aligners',
    name: 'Clear Aligners',
    summary: 'Virtually invisible aligners that guide teeth into position using 3D-planned movements and weekly changes.',
    intro:
      'Clear aligners make orthodontics discreet and lifestyle-friendly. We map each movement in 3D so you can preview the transformation before it starts.',
    howItWorks: `### Smile Simulation
We scan your teeth and simulate the final alignment using advanced software.

### Aligner Sequence
A series of aligners is printed, each moving teeth fractionally each week.

### Refinement & Retention
Finishing refinements are included, followed by custom retainers to maintain your new smile.`,
    benefits: ['Discreet and removable', 'Fewer in-practice visits', 'Digital tracking of progress'],
    aftercare: ['Wear retainers nightly', 'Clean aligners with approved solutions', 'Attend review appointments every 6–8 weeks'],
    modelSrc: '/models/example.glb',
    heroImage: '/gradients/hero-gradient-soft.webp',
    posterImage: '/gradients/hero-gradient-fallback.webp',
    faqs: [
      { q: 'How long does treatment take?', a: 'Most cases take 6–12 months, though complex movements can take longer.' },
      { q: 'Will aligners affect my speech?', a: 'You may notice a slight lisp for 1–2 days which quickly resolves as you adapt.' },
      { q: 'Do I need attachments?', a: 'Small tooth-coloured attachments may be placed to assist specific movements. They are discreet and temporary.' },
    ],
    priceGuide: 'From £3,200 including retainers.',
    appointmentLength: 'Initial fitting 60 minutes; reviews every 6–8 weeks.',
    timeToResult: '6–18 months depending on complexity.',
    durability: 'Permanent retainers recommended after treatment.',
    downtime: 'No downtime; aligners are removable.',
    risks: ['Transient discomfort with new aligners', 'Possible attachment staining', 'Relapse without retainers'],
    indications: ['Crowding', 'Spacing', 'Relapse after braces'],
    contraindications: ['Severe skeletal discrepancies', 'Untreated gum disease'],
    keywords: ['clear aligners', 'invisible braces', 'orthodontics'],
    readingList: [{ title: 'Clinical Effectiveness of Aligners', url: 'https://www.ajodo.org' }],
    beforeImage: '/gradients/hero-gradient-fallback.webp',
    afterImage: '/gradients/hero-gradient-soft.webp',
    steps: [
      'Digital scan and smile simulation',
      'Aligner series manufacture',
      'Sequential aligner wear',
      'Refinement and detailing',
      'Retention strategy',
    ],
  },
];

export function getTreatment(category: string, slug: string): Treatment | undefined {
  return treatments.find((t) => t.category === category && t.slug === slug);
}

export function listTreatmentCategories(): TreatmentCategory[] {
  const set = new Set<TreatmentCategory>();
  treatments.forEach((t) => set.add(t.category));
  return Array.from(set);
}

export function treatmentsByCategory() {
  return treatments.reduce<Record<TreatmentCategory, Treatment[]>>((acc, treatment) => {
    if (!acc[treatment.category]) {
      acc[treatment.category] = [];
    }
    acc[treatment.category]!.push(treatment);
    return acc;
  }, {} as Record<TreatmentCategory, Treatment[]>);
}

export function buildTreatmentMenu() {
  const grouped = treatmentsByCategory();
  return Object.entries(grouped).map(([key, list]) => {
    const category = key as TreatmentCategory;
    return {
      key: category,
      title: TREATMENT_CATEGORY_TITLES[category] ?? category,
      items: list.map((item) => ({
        slug: item.slug,
        label: item.name,
        href: `/treatments/${item.category}/${item.slug}`,
      })),
    };
  });
}
