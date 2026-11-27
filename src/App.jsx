import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInAnonymously,
  onAuthStateChanged,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  setDoc,
  addDoc,
  deleteDoc,
  onSnapshot,
  collection,
  increment,
} from 'firebase/firestore';
import {
  Sparkles,
  Palette,
  Search,
  BookOpen,
  Award,
  GraduationCap,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Copy,
  Check,
  X,
  Plus,
  Trash2,
  Heart,
  Bookmark,
  Sliders,
  Shuffle,
  Command,
  Send,
  Image as ImageIcon,
  Upload,
  Edit3,
  ArrowUpRight,
  Globe,
  MessageSquare,
  Menu,
  Eye,
  EyeOff,
  RefreshCw,
  ShieldCheck,
  AlertTriangle,
  Mic,
  Users,
  Inbox,
  Quote,
  Maximize2,
  Wand2,
  Compass,
  FileText,
  Layers,
  RotateCcw,
  ChevronDown,
} from 'lucide-react';

/* ============================================================================
   1. FIREBASE INITIALIZATION (OUTSIDE COMPONENT — MANDATORY PATTERN)
   ============================================================================ */
const firebaseConfig = {
  apiKey: "AIzaSyD2SQow3pfBjrprrhWOGlu7pdUOolss_qQ",
  authDomain: "mithula-portfolio.firebaseapp.com",
  databaseURL: "https://mithula-portfolio-default-rtdb.firebaseio.com",
  projectId: "mithula-portfolio",
  storageBucket: "mithula-portfolio.firebasestorage.app",
  messagingSenderId: "282964194433",
  appId: "1:282964194433:web:284b5ff91ea5af8c774980",
  measurementId: "G-DFLSYFTSG7",
};

let app = null;
let auth = null;
let db = null;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
} catch (err) {
  console.warn('Firebase initialization skipped or offline mode active:', err);
}

const appId = typeof __app_id !== 'undefined' ? __app_id : 'mithula-portfolio';

/* ============================================================================
   WEB3FORMS EMAIL DELIVERY SETUP (FREE — NO BACKEND REQUIRED)
   1. Go to https://web3forms.com and enter mithula.thomas@gmail.com
   2. Click "Create your Access Key" and copy the key from Gmail
   3. Paste it below OR save it live anytime in Studio Admin -> Settings
   ============================================================================ */
const DEFAULT_WEB3FORMS_ACCESS_KEY = 'YOUR_WEB3FORMS_ACCESS_KEY';

/* ============================================================================
   2. VERIFIED ACADEMIC SEED DATA — DR. MITHULA THOMAS, PhD
   ============================================================================ */
const RESEARCH_DOMAINS = [
  {
    id: 'trauma',
    name: 'Trauma Studies',
    short: 'Trauma',
    angle: 0,
    description: 'Memory, ethical choice, vulnerability, resilience, and narrative rupture in contemporary fiction and cinema.',
  },
  {
    id: 'dh',
    name: 'Digital Humanities',
    short: 'Digital Humanities',
    angle: 60,
    description: 'Digital culture, algorithmic platforms, online feminist discourse, and technology-mediated scholarship.',
  },
  {
    id: 'gender',
    name: 'Feminist Theory & Gender Studies',
    short: 'Gender Studies',
    angle: 120,
    description: 'Agency, bodily autonomy, desire, temporal politics, and counter-narratives across literature and screen.',
  },
  {
    id: 'cultural',
    name: 'Cultural Studies',
    short: 'Cultural Studies',
    angle: 180,
    description: 'Public discourse, parrhesia, indigenous ritualistic performance, and shifting Indian cultural landscapes.',
  },
  {
    id: 'film',
    name: 'Film & Media Studies',
    short: 'Film & Media',
    angle: 240,
    description: 'South Indian and Malayalam cinema, dystopian aesthetics, posthuman screen agency, and media desire.',
  },
  {
    id: 'ai',
    name: 'AI and Language',
    short: 'AI & Language',
    angle: 300,
    description: 'Algorithmic narratives, AI-assisted pedagogy, human-machine language ethics, and communication design.',
  },
];

const INITIAL_PROFILE = {
  name: 'Dr. Mithula Thomas, PhD',
  role: 'Assistant Professor of English | Interdisciplinary Academic | Researcher',
  department: 'Department of English, School of Social Sciences & Languages',
  institution: 'VIT University, Vellore, India',
  tenure: 'March 2026 – Present',
  email: 'mithula.thomas@gmail.com',
  phone: '+91 9946920695',
  orcid: '0009-0002-8525-6488',
  orcidUrl: 'https://orcid.org/0009-0002-8525-6488',
  linkedinUrl: 'https://www.linkedin.com/in/dr-mithula-thomas-39a45060',
  instagramUrl: 'https://www.instagram.com/mithularesearch',
  instagramHandle: '@mithularesearch',
  vitDirectoryUrl: 'https://vit.ac.in/school/allfaculty/ssl/english',
  bio: 'Dr. Mithula Thomas is an Assistant Professor of English and an interdisciplinary academic whose scholarship bridges literature, culture, film and media studies, digital humanities, gender studies, and emerging technologies. As a researcher, educator, and curriculum designer, she examines how narratives shape identity, agency, memory, technology, and contemporary cultural experience—extending from British fiction into South Indian cinema, algorithmic narratives, posthuman perspectives, AI and language, and representations of gender and desire.',
  dissertation: {
    title: 'Between Resilience and Ruin: Representations of Trauma and Choice in Select Novels of Ian McEwan',
    degree: 'PhD in English Literature',
    institution: 'University of Calicut (Farook College Research Centre)',
    year: '2025',
    guide: 'Dr. Basheer Kotta',
    summary: 'Examines the intricate relationship between trauma, memory, agency, and ethical decision-making across contemporary British fiction.',
  },
  portraitUrl: '',
};

const SEED_WORKS = [
  // --- PEER-REVIEWED PUBLICATIONS (6) ---
  {
    id: 'pub-01',
    category: 'Publications',
    year: '2025',
    dateSort: 202506,
    title: 'Dystopian Societies in South Indian Cinema: A Young Adult Perspective',
    venue: 'Calicut University Research Journal',
    authors: 'Mithula Thomas',
    domains: ['Film & Media Studies', 'Cultural Studies'],
    summary: 'Investigates dystopian spatiality and socio-political anxieties in contemporary South Indian cinema through the interpretive lens of young adult audiences.',
    badge: 'Peer-Reviewed Journal',
    url: '',
  },
  {
    id: 'pub-02',
    category: 'Publications',
    year: '2024',
    dateSort: 202408,
    title: 'Empowering Narratives and Unveiling Realities: Breast Positivity in Cinema Through B32 Muthal 44 Vare',
    venue: 'Ishal Paithrukam (UGC CARE Listed)',
    authors: 'Mithula Thomas',
    domains: ['Feminist Theory & Gender Studies', 'Film & Media Studies'],
    summary: 'Analyzes body politics, agency, and counter-narratives of breast positivity and lived bodily reality in contemporary Malayalam cinema.',
    badge: 'UGC CARE',
    url: 'https://ojs.ishalpaithrkam.info/index.php/journal/article/view/78',
  },
  {
    id: 'pub-03',
    category: 'Publications',
    year: '2019',
    dateSort: 201909,
    title: 'From Modern to Metaphysical: A Study on Select Indian English Poets',
    venue: 'International Journal of Language, Literature in Humanities',
    authors: 'Mithula Thomas',
    domains: ['Cultural Studies'],
    summary: 'Traces thematic, linguistic, and philosophical shifts from modernist aesthetics to metaphysical inquiry in select Indian English poetic canons.',
    badge: 'Peer-Reviewed Journal',
    url: '',
  },
  {
    id: 'pub-04',
    category: 'Publications',
    year: '2019',
    dateSort: 201906,
    title: 'The Courage of Truth: Parrhesia and its Deliberations in India Today',
    venue: 'Journal of Emerging Technologies and Innovative Research',
    authors: 'Mithula Thomas & Muneera K. T.',
    domains: ['Cultural Studies'],
    summary: 'Co-authored critical study exploring Foucauldian parrhesia (fearless speech) and its ethical and socio-cultural deliberations in contemporary India.',
    badge: 'Co-Authored',
    url: '',
  },
  {
    id: 'pub-05',
    category: 'Publications',
    year: '2019',
    dateSort: 201903,
    title: 'Saga of Coloured Women: The Plight of Non-Caucasian Femininity in the New World',
    venue: 'Research Scholar',
    authors: 'Mithula Thomas',
    domains: ['Feminist Theory & Gender Studies'],
    summary: 'Examines intersections of race, colonial displacement, and gendered marginalization in literary representations of non-Caucasian womanhood.',
    badge: 'Peer-Reviewed Journal',
    url: '',
  },
  {
    id: 'pub-06',
    category: 'Publications',
    year: '2018',
    dateSort: 201808,
    title: 'Breast Politics and Ceaseless Quest for Power in Contemporary Society',
    venue: 'Singularities',
    authors: 'Mithula Thomas',
    domains: ['Feminist Theory & Gender Studies', 'Cultural Studies'],
    summary: 'Critiques patriarchal surveillance, bodily discipline, and socio-cultural power struggles inscribed onto the female body.',
    badge: 'Peer-Reviewed Journal',
    url: '',
  },

  // --- TALKS, KEYNOTES & ACADEMIC SESSIONS (8) ---
  {
    id: 'talk-07',
    category: 'Talks & Keynotes',
    year: '2026',
    dateSort: 202610,
    title: 'Webinar on Abstract Writing',
    venue: 'Campuzine Scholars Edu Hub · Online (6 October 2026)',
    authors: 'Mithula Thomas (Resource Person)',
    domains: ['AI and Language', 'Digital Humanities'],
    summary: 'Interactive academic research session guiding scholars on crafting precise, high-impact conference and publication abstracts.',
    badge: 'Resource Person',
    url: '',
  },
  {
    id: 'talk-08',
    category: 'Talks & Keynotes',
    year: '2026',
    dateSort: 202608,
    title: 'Erotica in Absentia: The Seduction of the Unseen',
    venue: 'Thinksphere Two-Day International Conference: Deciphering the World of Erotica · Online (21–22 August 2026)',
    authors: 'Mithula Thomas (Keynote Speaker)',
    domains: ['Film & Media Studies', 'Feminist Theory & Gender Studies'],
    summary: 'International keynote examining desire, visual absence, fantasy, and the aesthetics of the unseen where erotica meets contemporary media.',
    badge: 'Keynote Speaker',
    url: '',
  },
  {
    id: 'talk-09',
    category: 'Talks & Keynotes',
    year: '2026',
    dateSort: 202608,
    title: 'The Abstract Blueprint: Writing for Publication',
    venue: 'MET Arts and Science College, Calicut · Online (8 August 2026)',
    authors: 'Mithula Thomas (Resource Person)',
    domains: ['Digital Humanities'],
    summary: 'Academic workshop equipping postgraduate scholars and faculty with frameworks for framing research gaps and structuring publication-ready abstracts.',
    badge: 'Resource Person',
    url: '',
  },
  {
    id: 'talk-10',
    category: 'Talks & Keynotes',
    year: '2026',
    dateSort: 202607,
    title: 'Constructing the Academic Thesis: Writing Challenges and Pitfalls',
    venue: 'Wordsmith Symposium Series · Online (22 July 2026)',
    authors: 'Mithula Thomas (Guest Speaker)',
    domains: ['Digital Humanities'],
    summary: 'Focused academic address tackling thesis architecture, argumentation coherence, literature synthesis, and scholarly writing pitfalls.',
    badge: 'Guest Speaker',
    url: '',
  },
  {
    id: 'talk-11',
    category: 'Talks & Keynotes',
    year: '2026',
    dateSort: 202605,
    title: 'Pedagogy Reimagined: Blended Learning, Active Classrooms and AI-Assisted Teaching',
    venue: 'VIT University, Vellore · One-Day Faculty Development Symposium (28 May 2026, Offline)',
    authors: 'Mithula Thomas (Resource Person)',
    domains: ['AI and Language', 'Digital Humanities'],
    summary: 'Faculty development session demonstrating practical models for active classrooms, blended curricula, and ethical AI-assisted language pedagogy.',
    badge: 'Faculty Development',
    url: '',
  },
  {
    id: 'talk-12',
    category: 'Talks & Keynotes',
    year: '2026',
    dateSort: 202604,
    title: 'The Politics of Waiting: Rethinking Women, Time and Agency',
    venue: 'Whispered Bliss Panel Series 1: From Silence to Voice (25 April 2026)',
    authors: 'Mithula Thomas (Panelist)',
    domains: ['Feminist Theory & Gender Studies', 'Cultural Studies'],
    summary: 'Panel intervention unpacking gendered temporality, waiting as a cultural structure, desire, and reclaiming narrative agency.',
    badge: 'Panelist',
    url: '',
  },
  {
    id: 'talk-13',
    category: 'Talks & Keynotes',
    year: '2020–2021',
    dateSort: 202105,
    title: 'English Language & Communication Skills (2021) & Why Study English? (2020)',
    venue: 'Sullamussalam Science College (2021) · CMS College, Coimbatore (2020)',
    authors: 'Mithula Thomas (Invited Speaker)',
    domains: ['Cultural Studies', 'AI and Language'],
    summary: 'Invited institutional lectures examining the academic and career prospects of English studies alongside practical communication mastery.',
    badge: 'Invited Speaker',
    url: '',
  },
  {
    id: 'talk-14',
    category: 'Talks & Keynotes',
    year: '2019',
    dateSort: 201907,
    title: 'An Introduction to English Literature & Mechanics of Research Writing',
    venue: 'KMO College (2019) · KAHM Unity Women’s College (2019)',
    authors: 'Mithula Thomas (Invited Speaker)',
    domains: ['Digital Humanities', 'Cultural Studies'],
    summary: 'Foundational sessions introducing undergraduate scholars to literary interpretation, citation rigor, and the mechanics of academic research writing.',
    badge: 'Invited Speaker',
    url: '',
  },

  // --- CONFERENCE PRESENTATIONS (9) ---
  {
    id: 'conf-15',
    category: 'Conferences',
    year: '2026',
    dateSort: 202603,
    title: 'When the Cinema Begins to Think for Itself: Posthuman Agency and Algorithmic Quietude in Contemporary Malayalam Cinema',
    venue: 'Academic Conference Presentation (2026)',
    authors: 'Mithula Thomas',
    domains: ['AI and Language', 'Film & Media Studies'],
    summary: 'Explores posthuman cinematic perception, machine-inflected narration, and algorithmic stillness across contemporary Malayalam screen narratives.',
    badge: 'Conference Paper',
    url: '',
  },
  {
    id: 'conf-16',
    category: 'Conferences',
    year: '2023',
    dateSort: 202311,
    title: 'The Aging Female Body in Popular Culture: Challenging Stereotypes and Promoting Inclusivity',
    venue: 'Academic Conference Presentation (2023)',
    authors: 'Mithula Thomas',
    domains: ['Feminist Theory & Gender Studies', 'Cultural Studies'],
    summary: 'Interrogates ageist cultural erasure of older women in popular media and examines emerging inclusive visual narratives.',
    badge: 'Conference Paper',
    url: '',
  },
  {
    id: 'conf-17',
    category: 'Conferences',
    year: '2023',
    dateSort: 202310,
    title: 'Gender Discrimination and Alterity in the Digital Space: An Analysis of Google’s Practices',
    venue: 'Academic Conference Presentation (2023)',
    authors: 'Mithula Thomas',
    domains: ['Digital Humanities', 'Feminist Theory & Gender Studies', 'AI and Language'],
    summary: 'Critically assesses algorithmic representation, digital alterity, and systemic gender bias embedded in contemporary search ecosystems.',
    badge: 'Conference Paper',
    url: '',
  },
  {
    id: 'conf-18',
    category: 'Conferences',
    year: '2023',
    dateSort: 202309,
    title: 'Dystopian Societies in Southern Indian Cinema: A Young Adult Perspective',
    venue: 'Academic Conference Presentation (2023)',
    authors: 'Mithula Thomas',
    domains: ['Film & Media Studies'],
    summary: 'Examines how dystopian world-building in Southern Indian cinema articulates youth alienation, resistance, and future imaginaries.',
    badge: 'Conference Paper',
    url: '',
  },
  {
    id: 'conf-19',
    category: 'Conferences',
    year: '2023',
    dateSort: 202308,
    title: 'Expounding Female Subjectivities in the Liminal Space: Nomadic Transpositions in the Ritualistic Performances of Indigenous Tribal Settlements in Kerala',
    venue: 'IIT Madras (2023)',
    authors: 'Mithula Thomas',
    domains: ['Cultural Studies', 'Feminist Theory & Gender Studies'],
    summary: 'Investigates liminal performance spaces, embodied memory, and nomadic female subjectivity within Kerala’s indigenous tribal rituals.',
    badge: 'IIT Madras',
    url: '',
  },
  {
    id: 'conf-20',
    category: 'Conferences',
    year: '2023',
    dateSort: 202307,
    title: 'New Faces of Digital Feminism in India',
    venue: 'Academic Conference Presentation (2023)',
    authors: 'Mithula Thomas',
    domains: ['Digital Humanities', 'Feminist Theory & Gender Studies'],
    summary: 'Maps contemporary Indian digital feminist activism, hashtag solidarity, and evolving intersections of online voice and identity.',
    badge: 'Conference Paper',
    url: '',
  },
  {
    id: 'conf-21',
    category: 'Conferences',
    year: '2023',
    dateSort: 202306,
    title: 'Women and Their Bodies: Exploring the Diversity of Trauma and Violations in B32 Muthal 44 Vare',
    venue: 'REVA University (2023)',
    authors: 'Mithula Thomas',
    domains: ['Trauma Studies', 'Feminist Theory & Gender Studies', 'Film & Media Studies'],
    summary: 'Analyzes multi-layered bodily trauma, everyday violations, and collective resilience portrayed in contemporary Malayalam cinema.',
    badge: 'REVA University',
    url: '',
  },
  {
    id: 'conf-22',
    category: 'Conferences',
    year: '2023',
    dateSort: 202305,
    title: 'Phallocentrism and Psychoanalysis: A Feministic Review',
    venue: 'Academic Conference Presentation (2023)',
    authors: 'Mithula Thomas',
    domains: ['Feminist Theory & Gender Studies', 'Trauma Studies'],
    summary: 'Re-evaluates classical psychoanalytic theory through feminist interventions questioning phallocentric structures of language and psyche.',
    badge: 'Conference Paper',
    url: '',
  },
  {
    id: 'conf-23',
    category: 'Conferences',
    year: '2018',
    dateSort: 201805,
    title: 'The Voyage of Discovery through Reminiscence: A Study in Contemporary Scottish Women Authors',
    venue: 'Academic Conference Presentation (2018)',
    authors: 'Mithula Thomas',
    domains: ['Trauma Studies', 'Feminist Theory & Gender Studies'],
    summary: 'Explores memory, narrative reminiscence, and identity reconstruction in fiction by contemporary Scottish women writers.',
    badge: 'Conference Paper',
    url: '',
  },

  // --- CURRICULUM DESIGN & PEDAGOGICAL INNOVATION (3) ---
  {
    id: 'curr-24',
    category: 'Curriculum',
    year: '2026',
    dateSort: 202604,
    title: 'Technical English — Course Coordinator & Curriculum Design',
    venue: 'VIT University, Vellore (March 2026 – Present)',
    authors: 'Mithula Thomas',
    domains: ['AI and Language'],
    summary: 'Leading syllabus coordination, assessment rubric design, academic writing modules, and student communication mentorship for Technical English.',
    badge: 'Course Coordinator',
    url: '',
  },
  {
    id: 'curr-25',
    category: 'Curriculum',
    year: '2026',
    dateSort: 202601,
    title: 'Eloquent Communication — Integrated Engineering Communication Curriculum',
    venue: 'Chanakya University, Bangalore (2026)',
    authors: 'Mithula Thomas',
    domains: ['AI and Language'],
    summary: 'Architected an integrated curriculum uniting Academic Writing, Critical Thinking, Presentation & Interview Skills, and Global Communication Competencies aligned with international proficiency standards.',
    badge: 'Curriculum Architect',
    url: '',
  },
  {
    id: 'curr-26',
    category: 'Curriculum',
    year: '2018–2020',
    dateSort: 202006,
    title: 'Blended & Online English Language Curricula (Basic, Intermediate, Advanced)',
    venue: 'English House, Calicut (2018–2020)',
    authors: 'Mithula Thomas',
    domains: ['Digital Humanities'],
    summary: 'Designed tiered digital and blended English language learning tracks emphasizing practical fluency, grammar mastery, and structured vocabulary acquisition.',
    badge: 'Digital Pedagogy',
    url: '',
  },
];

const APPOINTMENTS = [
  {
    period: 'Mar 2026 – Present',
    role: 'Assistant Professor of English',
    institution: 'VIT University, Vellore, India',
    highlights: [
      'Course Coordinator for Technical English & Secretary, Research Forum (VIT University).',
      'Teaching communication, academic writing, language, and literary studies courses.',
      'Engaged in curriculum design, assessment development, mentoring, and interdisciplinary research across digital humanities, film, media, and AI.',
    ],
  },
  {
    period: 'Jan 2026 – Feb 2026',
    role: 'Assistant Professor of English',
    institution: 'Chanakya University, Bangalore',
    highlights: [
      'Designed and developed Eloquent Communication, an integrated communication curriculum for engineering students.',
      'Aligned course outcomes and assessment rubrics with international language proficiency frameworks.',
    ],
  },
  {
    period: 'Jul 2018 – Dec 2020',
    role: 'Freelance Language Coach & Digital Educator',
    institution: 'English House, Calicut',
    highlights: [
      'Created multi-tier digital learning curricula (Basic, Intermediate, Advanced).',
      'Delivered blended language learning programmes and communication skills workshops.',
    ],
  },
  {
    period: 'Oct 2017 – Feb 2018',
    role: 'Assistant Professor of English',
    institution: 'KAHM Unity Women’s College, Manjeri',
    highlights: [
      'Taught undergraduate and postgraduate courses in English Language and Literature.',
      'Mentored students in critical literary analysis and scholarly research writing.',
    ],
  },
];

const EDUCATION = [
  {
    year: '2025',
    degree: 'PhD in English Literature',
    institution: 'University of Calicut (Farook College Research Centre)',
    detail: 'Dissertation: Between Resilience and Ruin: Representations of Trauma and Choice in Select Novels of Ian McEwan · Guide: Dr. Basheer Kotta',
  },
  {
    year: '2017',
    degree: 'PG Diploma in Journalism & Mass Communication',
    institution: 'Madras Christian College',
    detail: 'Media studies, editorial communication, and mass cultural analysis.',
  },
  {
    year: '2016',
    degree: 'MA English Language and Literature',
    institution: 'Mahatma Gandhi University',
    detail: 'Recipient of Best Outgoing Student & Most Meritorious Student Awards.',
  },
  {
    year: '2014',
    degree: 'BA English Language and Literature',
    institution: 'Bharathiar University',
    detail: 'Foundational literary history, linguistics, and critical theory.',
  },
];

const LEADERSHIP = [
  { role: 'Secretary', org: 'Research Forum, VIT University' },
  { role: 'Co-Editor', org: 'Time and Text: Indian History and Literature in Dialogue' },
  { role: 'Joint Secretary', org: 'Research Forum, Farook College' },
  { role: 'Literary Association Secretary', org: 'Departmental Literary Forum' },
  { role: 'Chairperson', org: 'School of Languages' },
  { role: 'School Leader', org: 'Student Academic Leadership' },
];

const AWARDS = [
  'Aspire Scholarship for Academic Excellence',
  'Best Outgoing Student Award (MA English)',
  'Most Meritorious Student Award (MA English)',
  'Best Debater Award',
];

const CERTIFICATIONS = [
  { title: 'Business English Certificate (BEC)', issuer: 'Cambridge University ESOL' },
  { title: 'Introduction to Literary Analysis', issuer: 'University of Newcastle, Australia' },
];

const LANGUAGES = [
  { name: 'English', level: 'Fluent', pct: 100 },
  { name: 'Malayalam', level: 'Native', pct: 100 },
  { name: 'Tamil', level: 'Working Proficiency', pct: 74 },
  { name: 'Hindi', level: 'Working Proficiency', pct: 74 },
];

const DIGITAL_TECH = [
  'Learning Management Systems',
  'AI-Assisted Research Tools',
  'Digital Teaching Platforms',
  'Online Academic Content Development',
];

const ACADEMIC_REFERENCES = [
  {
    name: 'Dr. Zeenath Muhamed Kunhi',
    title: 'Associate Professor, Farook College',
    email: 'zeenathmk@farookcollege.ac.in',
    phone: '+91 9747873638',
  },
  {
    name: 'Dr. Anil Premraj J',
    title: 'Assistant Professor, VIT University, Vellore',
    email: 'anilpremraj.j@vit.ac.in',
    phone: '+91 76539473566',
  },
];

const DEFAULT_GALLERY_ITEMS = [
  {
    id: 'art-1',
    title: 'Keynote Aesthetics — Erotica in Absentia',
    caption: 'Thinksphere Two-Day International Conference (August 2026) · Visual essay exploring absence, media framing, and desire.',
    category: 'Keynote & Talks',
    year: '2026',
    isArtCard: true,
    artStyle: 'keynote',
  },
  {
    id: 'art-2',
    title: 'Doctoral Monograph — Between Resilience and Ruin',
    caption: 'University of Calicut / Farook College (2025) · Trauma, memory, and ethical choice in Ian McEwan’s contemporary fiction.',
    category: 'Doctoral Research',
    year: '2025',
    isArtCard: true,
    artStyle: 'monograph',
  },
  {
    id: 'art-3',
    title: 'Pedagogy Reimagined — VIT Vellore FDP',
    caption: 'Faculty Development Symposium (May 2026) · Blended classrooms, active pedagogy, and AI-assisted teaching methodologies.',
    category: 'VIT University',
    year: '2026',
    isArtCard: true,
    artStyle: 'pedagogy',
  },
  {
    id: 'art-4',
    title: 'Posthuman Agency & Malayalam Cinema',
    caption: 'Contemporary film scholarship (2026) · Algorithmic quietude, dystopian narratives, and bodily politics on screen.',
    category: 'Film & Media',
    year: '2026',
    isArtCard: true,
    artStyle: 'cinema',
  },
];

/* ============================================================================
   3. CHROMATIC UNIVERSE ENGINE — COLOR MATH, HARMONIES, WCAG & 12 PRESETS
   ============================================================================ */
const HARMONY_MODES = [
  { id: 'complementary', label: 'Complementary', offsets: [180, 150] },
  { id: 'analogous', label: 'Analogous', offsets: [30, -30] },
  { id: 'triadic', label: 'Triadic', offsets: [120, 240] },
  { id: 'split', label: 'Split-Comp', offsets: [150, 210] },
  { id: 'tetradic', label: 'Tetradic', offsets: [90, 180] },
  { id: 'monochromatic', label: 'Monochromatic', offsets: [0, 0] },
];

const CHROMATIC_PRESETS = [
  {
    name: 'Ivory Editorial',
    hue: 348, sat: 58, light: 36,
    surfaceMode: 'light', harmony: 'analogous',
    bgHex: '#FAF8F4', inkHex: '#1C1917',
  },
  {
    name: 'Obsidian Ink',
    hue: 22, sat: 78, light: 65,
    surfaceMode: 'dark', harmony: 'complementary',
    bgHex: '#0F1115', inkHex: '#F3F1EC',
  },
  {
    name: 'Emerald Scholar',
    hue: 158, sat: 64, light: 30,
    surfaceMode: 'light', harmony: 'analogous',
    bgHex: '#F4F8F6', inkHex: '#12211B',
  },
  {
    name: 'Velvet Burgundy',
    hue: 342, sat: 72, light: 64,
    surfaceMode: 'tinted', harmony: 'split',
    bgHex: '#1D1015', inkHex: '#FAF1F3',
  },
  {
    name: 'Kyoto Paper',
    hue: 16, sat: 62, light: 44,
    surfaceMode: 'light', harmony: 'triadic',
    bgHex: '#F6F1E7', inkHex: '#251F1B',
  },
  {
    name: 'Midnight Indigo',
    hue: 228, sat: 84, light: 68,
    surfaceMode: 'dark', harmony: 'triadic',
    bgHex: '#0D1020', inkHex: '#EEF1FA',
  },
  {
    name: 'Bauhaus Signal',
    hue: 4, sat: 82, light: 48,
    surfaceMode: 'light', harmony: 'triadic',
    bgHex: '#F7F6F2', inkHex: '#111111',
  },
  {
    name: 'Terracotta Clay',
    hue: 18, sat: 66, light: 45,
    surfaceMode: 'tinted', harmony: 'analogous',
    bgHex: '#FBF3EC', inkHex: '#2B1B14',
  },
  {
    name: 'Nordic Frost',
    hue: 206, sat: 70, light: 40,
    surfaceMode: 'light', harmony: 'monochromatic',
    bgHex: '#F2F6FA', inkHex: '#10202F',
  },
  {
    name: 'Champagne Noir',
    hue: 41, sat: 62, light: 62,
    surfaceMode: 'oled', harmony: 'analogous',
    bgHex: '#050505', inkHex: '#F7F2E8',
  },
  {
    name: 'Cyber Brutalist',
    hue: 154, sat: 94, light: 48,
    surfaceMode: 'oled', harmony: 'complementary',
    bgHex: '#06080A', inkHex: '#F0F5F2',
  },
  {
    name: 'Botanical Sage',
    hue: 132, sat: 36, light: 36,
    surfaceMode: 'tinted', harmony: 'split',
    bgHex: '#F2F5F0', inkHex: '#1A241B',
  },
];

/** Clamp helper */
function clamp(v, min, max) {
  return Math.min(max, Math.max(min, v));
}

/** Normalize angle into [0, 360) */
function wrapHue(h) {
  return ((h % 360) + 360) % 360;
}

/** Convert HSL (0-360, 0-100, 0-100) to Hex #RRGGBB */
function hslToHex(h, s, l) {
  const hh = wrapHue(h) / 360;
  const ss = clamp(s, 0, 100) / 100;
  const ll = clamp(l, 0, 100) / 100;

  let r, g, b;
  if (ss === 0) {
    r = g = b = ll;
  } else {
    const hue2rgb = (p, q, t) => {
      let tt = t;
      if (tt < 0) tt += 1;
      if (tt > 1) tt -= 1;
      if (tt < 1 / 6) return p + (q - p) * 6 * tt;
      if (tt < 1 / 2) return q;
      if (tt < 2 / 3) return p + (q - p) * (2 / 3 - tt) * 6;
      return p;
    };
    const q = ll < 0.5 ? ll * (1 + ss) : ll + ss - ll * ss;
    const p = 2 * ll - q;
    r = hue2rgb(p, q, hh + 1 / 3);
    g = hue2rgb(p, q, hh);
    b = hue2rgb(p, q, hh - 1 / 3);
  }
  const toHex = (x) =>
    Math.round(x * 255)
      .toString(16)
      .padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

/** Parse Hex #RRGGBB to { r, g, b } */
function hexToRgb(hex) {
  const cleaned = String(hex || '#000000').replace('#', '').trim();
  const full =
    cleaned.length === 3
      ? cleaned
          .split('')
          .map((c) => c + c)
          .join('')
      : cleaned.padEnd(6, '0').slice(0, 6);
  const num = parseInt(full, 16);
  if (Number.isNaN(num)) return { r: 20, g: 20, b: 20 };
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

/** Convert Hex to { h, s, l } */
function hexToHsl(hex) {
  const { r: r255, g: g255, b: b255 } = hexToRgb(hex);
  const r = r255 / 255;
  const g = g255 / 255;
  const b = b255 / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      default:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

/** WCAG 2.1 Relative Luminance */
function getRelativeLuminance(hex) {
  const { r, g, b } = hexToRgb(hex);
  const srgb = [r, g, b].map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * srgb[0] + 0.7152 * srgb[1] + 0.0722 * srgb[2];
}

/** WCAG 2.1 Contrast Ratio (1.0 to 21.0) */
function getContrastRatio(hexA, hexB) {
  const l1 = getRelativeLuminance(hexA);
  const l2 = getRelativeLuminance(hexB);
  const bright = Math.max(l1, l2);
  const dark = Math.min(l1, l2);
  return (bright + 0.05) / (dark + 0.05);
}

/** Blend hex with alpha as rgba(...) */
function hexToRgba(hex, alpha) {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/** Compute full CSS token map from Chromatic Universe state */
function computeChromaticTokens(theme) {
  const accentHex = hslToHex(theme.hue, theme.sat, theme.light);
  const harmonyObj = HARMONY_MODES.find((m) => m.id === theme.harmony) || HARMONY_MODES[0];

  const accent2Hex =
    theme.harmony === 'monochromatic'
      ? hslToHex(theme.hue, clamp(theme.sat - 16, 15, 100), clamp(theme.light + (theme.light > 55 ? -18 : 16), 18, 86))
      : hslToHex(theme.hue + harmonyObj.offsets[0], clamp(theme.sat - 4, 25, 95), clamp(theme.light, 28, 74));

  const accent3Hex =
    theme.harmony === 'monochromatic'
      ? hslToHex(theme.hue, clamp(theme.sat - 28, 10, 90), clamp(theme.light + (theme.light > 55 ? -30 : 28), 16, 88))
      : hslToHex(theme.hue + harmonyObj.offsets[1], clamp(theme.sat - 8, 25, 92), clamp(theme.light, 28, 74));

  const bgLum = getRelativeLuminance(theme.bgHex);
  const isDarkBg = bgLum < 0.35;
  const bgHsl = hexToHsl(theme.bgHex);

  const surfaceHex = isDarkBg
    ? hslToHex(bgHsl.h, clamp(bgHsl.s, 0, 34), clamp(bgHsl.l + 5, 6, 22))
    : hslToHex(bgHsl.h, clamp(bgHsl.s, 0, 28), clamp(bgHsl.l + 3.5, 96, 100));

  const surface2Hex = isDarkBg
    ? hslToHex(bgHsl.h, clamp(bgHsl.s, 0, 38), clamp(bgHsl.l + 10, 10, 28))
    : hslToHex(bgHsl.h, clamp(bgHsl.s + 4, 0, 32), clamp(bgHsl.l - 4, 88, 96));

  const borderHex = isDarkBg
    ? hslToHex(bgHsl.h, clamp(bgHsl.s, 0, 28), clamp(bgHsl.l + 16, 16, 34))
    : hslToHex(bgHsl.h, clamp(bgHsl.s, 0, 24), clamp(bgHsl.l - 11, 76, 90));

  const mutedHex = isDarkBg
    ? hslToHex(bgHsl.h, 12, 68)
    : hslToHex(bgHsl.h, 10, 42);

  const accentContrast =
    getContrastRatio(accentHex, '#FFFFFF') >= getContrastRatio(accentHex, '#111111')
      ? '#FFFFFF'
      : '#111111';

  const contrastRatio = getContrastRatio(theme.bgHex, theme.inkHex);

  return {
    bg: theme.bgHex,
    surface: surfaceHex,
    surface2: surface2Hex,
    ink: theme.inkHex,
    muted: mutedHex,
    accent: accentHex,
    accent2: accent2Hex,
    accent3: accent3Hex,
    accentSoft: hexToRgba(accentHex, isDarkBg ? 0.16 : 0.1),
    accentBorder: hexToRgba(accentHex, isDarkBg ? 0.38 : 0.28),
    accentContrast,
    border: borderHex,
    navBg: hexToRgba(theme.bgHex, 0.84),
    glow: hexToRgba(accentHex, isDarkBg ? 0.24 : 0.16),
    isDarkBg,
    contrastRatio,
  };
}

/* ============================================================================
   4. CITATION FORMATTER (APA 7th, MLA 9th, Chicago, BibTeX)
   ============================================================================ */
function generateCitations(work) {
  const year = work.year || 'n.d.';
  const title = work.title || 'Untitled';
  const venue = work.venue || 'Academic Venue';
  const rawAuthors = work.authors || 'Mithula Thomas';
  const isCoAuthored = rawAuthors.includes('Muneera');
  const apaAuthors = isCoAuthored ? 'Thomas, M., & Muneera, K. T.' : 'Thomas, M.';
  const mlaAuthors = isCoAuthored ? 'Thomas, Mithula, and Muneera K. T.' : 'Thomas, Mithula';
  const chicagoAuthors = mlaAuthors;
  const bibKey = `thomas${String(year).slice(0, 4)}${title.toLowerCase().replace(/[^a-z]/g, '').slice(0, 10)}`;
  const urlPart = work.url ? ` ${work.url}` : '';

  return {
    APA: `${apaAuthors} (${year}). ${title}. ${venue}.${urlPart}`,
    MLA: `${mlaAuthors}. "${title}." ${venue}, ${year}.${urlPart}`,
    Chicago: `${chicagoAuthors}. "${title}." ${venue} (${year}).${urlPart}`,
    BibTeX: `@article{${bibKey},\n  author  = {${isCoAuthored ? 'Thomas, Mithula and Muneera, K. T.' : 'Thomas, Mithula'}},\n  title   = {${title}},\n  journal = {${venue}},\n  year    = {${String(year).slice(0, 4)}}${work.url ? `,\n  url     = {${work.url}}` : ''}\n}`,
  };
}

/* ============================================================================
   5. IMAGE COMPRESSION HELPER (CANVAS -> DATA URL < 120KB FOR FIRESTORE)
   ============================================================================ */
function compressImageFile(file, maxDimension = 760, quality = 0.74) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Failed to read image file.'));
    reader.onload = () => {
      const img = new window.Image();
      img.onerror = () => reject(new Error('Invalid image file.'));
      img.onload = () => {
        let { width, height } = img;
        if (width > maxDimension || height > maxDimension) {
          if (width >= height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(dataUrl);
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

/* ============================================================================
   6. INTERACTIVE HTML5 CANVAS HERO BACKGROUND (NARRATIVE CONSTELLATION)
   ============================================================================ */
function NarrativeConstellationCanvas({ tokens, reducedMotion }) {
  const canvasRef = useRef(null);
  const pointerRef = useRef({ x: -9999, y: -9999, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId = null;
    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const accentRgb = hexToRgb(tokens.accent);
    const accent2Rgb = hexToRgb(tokens.accent2);
    const inkRgb = hexToRgb(tokens.ink);

    const nodes = [];
    const initNodes = () => {
      nodes.length = 0;
      const count = Math.min(54, Math.max(22, Math.floor((width * height) / 24000)));
      for (let i = 0; i < count; i++) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.32,
          vy: (Math.random() - 0.5) * 0.32,
          r: 1.5 + Math.random() * 2.2,
          tint: i % 3 === 0 ? accentRgb : i % 3 === 1 ? accent2Rgb : inkRgb,
        });
      }
    };

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      width = parent.clientWidth;
      height = parent.clientHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initNodes();
    };

    resize();
    window.addEventListener('resize', resize);

    const handleMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      pointerRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };
    const handleLeave = () => {
      pointerRef.current.active = false;
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    window.addEventListener('mouseleave', handleLeave);

    const drawFrame = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        if (!reducedMotion) {
          n.x += n.vx;
          n.y += n.vy;

          if (n.x < 0 || n.x > width) n.vx *= -1;
          if (n.y < 0 || n.y > height) n.vy *= -1;

          if (pointerRef.current.active) {
            const dx = pointerRef.current.x - n.x;
            const dy = pointerRef.current.y - n.y;
            const dist = Math.hypot(dx, dy);
            if (dist < 160 && dist > 1) {
              n.x += (dx / dist) * 0.35;
              n.y += (dy / dist) * 0.35;
            }
          }
        }

        // Narrative connecting threads
        for (let j = i + 1; j < nodes.length; j++) {
          const m = nodes[j];
          const d = Math.hypot(n.x - m.x, n.y - m.y);
          if (d < 135) {
            const alpha = (1 - d / 135) * (tokens.isDarkBg ? 0.22 : 0.14);
            ctx.strokeStyle = `rgba(${accentRgb.r}, ${accentRgb.g}, ${accentRgb.b}, ${alpha.toFixed(3)})`;
            ctx.lineWidth = 0.9;
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(m.x, m.y);
            ctx.stroke();
          }
        }

        // Cursor thread
        if (pointerRef.current.active && !reducedMotion) {
          const pd = Math.hypot(pointerRef.current.x - n.x, pointerRef.current.y - n.y);
          if (pd < 155) {
            const pa = (1 - pd / 155) * 0.32;
            ctx.strokeStyle = `rgba(${accent2Rgb.r}, ${accent2Rgb.g}, ${accent2Rgb.b}, ${pa.toFixed(3)})`;
            ctx.lineWidth = 1.1;
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(pointerRef.current.x, pointerRef.current.y);
            ctx.stroke();
          }
        }

        // Particle dot
        ctx.fillStyle = `rgba(${n.tint.r}, ${n.tint.g}, ${n.tint.b}, ${tokens.isDarkBg ? 0.55 : 0.38})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!reducedMotion) {
        animId = window.requestAnimationFrame(drawFrame);
      }
    };

    drawFrame();

    return () => {
      if (animId) window.cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseleave', handleLeave);
    };
  }, [tokens.accent, tokens.accent2, tokens.ink, tokens.isDarkBg, reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}

/* ============================================================================
   7. INTERACTIVE RESEARCH KNOWLEDGE GRAPH (6 DOMAINS <-> 26+ WORKS)
   ============================================================================ */
function ResearchKnowledgeGraph({ works, selectedDomain, onSelectDomain, onOpenWork, tokens }) {
  const [hoveredDomain, setHoveredDomain] = useState(null);
  const [hoveredWorkId, setHoveredWorkId] = useState(null);

  const cx = 420;
  const cy = 240;
  const domainRadius = 112;
  const workRadius = 198;

  const domainNodes = useMemo(() => {
    return RESEARCH_DOMAINS.map((d, idx) => {
      const rad = ((idx * 60 - 90) * Math.PI) / 180;
      const connectedWorks = works.filter((w) => (w.domains || []).includes(d.name));
      return {
        ...d,
        x: cx + Math.cos(rad) * domainRadius,
        y: cy + Math.sin(rad) * domainRadius,
        count: connectedWorks.length,
      };
    });
  }, [works]);

  const workNodes = useMemo(() => {
    const total = works.length || 1;
    return works.map((w, idx) => {
      const rad = ((idx * (360 / total) - 90) * Math.PI) / 180;
      const rJitter = idx % 2 === 0 ? workRadius : workRadius - 18;
      return {
        ...w,
        x: cx + Math.cos(rad) * rJitter,
        y: cy + Math.sin(rad) * rJitter,
      };
    });
  }, [works]);

  const activeDomainName = hoveredDomain || selectedDomain;
  const hoveredWork = workNodes.find((w) => w.id === hoveredWorkId);
  const activeDomainObj = domainNodes.find((d) => d.name === activeDomainName);

  return (
    <div
      className="relative overflow-hidden rounded-2xl border p-4 sm:p-6 transition-colors"
      style={{
        backgroundColor: 'var(--surface)',
        borderColor: 'var(--border)',
      }}
    >
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <span
            className="font-mono text-[11px] uppercase tracking-[0.16em]"
            style={{ color: 'var(--accent)' }}
          >
            Interactive Semantic Network
          </span>
          <h3 className="font-serif text-xl sm:text-2xl font-semibold mt-0.5">
            Interdisciplinary Research Knowledge Graph
          </h3>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {selectedDomain && (
            <button
              type="button"
              onClick={() => onSelectDomain(null)}
              className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition hover:opacity-85 cursor-pointer"
              style={{
                backgroundColor: 'var(--accent-soft)',
                borderColor: 'var(--accent-border)',
                color: 'var(--accent)',
              }}
            >
              <X className="h-3.5 w-3.5" />
              Clear Domain: {selectedDomain}
            </button>
          )}
          <span className="font-mono text-xs" style={{ color: 'var(--muted)' }}>
            Click a domain node to filter archive
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
        {/* Interactive SVG Orbital Constellation */}
        <div className="lg:col-span-8 w-full">
          <svg
            viewBox="0 0 840 480"
            className="w-full h-auto select-none"
            role="img"
            aria-label="Interactive knowledge graph linking six research domains to Dr. Mithula Thomas's academic works"
          >
            <defs>
              <radialGradient id="hubGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor={tokens.accent} stopOpacity="0.28" />
                <stop offset="100%" stopColor={tokens.accent} stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Orbital Guide Rings */}
            <circle cx={cx} cy={cy} r={domainRadius} fill="none" stroke={tokens.border} strokeDasharray="3 5" strokeWidth="1" />
            <circle cx={cx} cy={cy} r={workRadius - 9} fill="none" stroke={tokens.border} strokeDasharray="2 6" strokeWidth="1" opacity="0.7" />
            <circle cx={cx} cy={cy} r="96" fill="url(#hubGlow)" />

            {/* Spokes from Center Hub to 6 Domains */}
            {domainNodes.map((dn) => {
              const isHot = !activeDomainName || activeDomainName === dn.name;
              return (
                <line
                  key={`hub-${dn.id}`}
                  x1={cx}
                  y1={cy}
                  x2={dn.x}
                  y2={dn.y}
                  stroke={activeDomainName === dn.name ? tokens.accent : tokens.border}
                  strokeWidth={activeDomainName === dn.name ? 2 : 1.1}
                  opacity={isHot ? 0.85 : 0.25}
                />
              );
            })}

            {/* Semantic Edges between Domains and Works */}
            {workNodes.map((wn) =>
              (wn.domains || []).map((domName) => {
                const dn = domainNodes.find((d) => d.name === domName);
                if (!dn) return null;
                const isHighlighted =
                  hoveredWorkId === wn.id ||
                  activeDomainName === domName;
                const isDimmed =
                  (hoveredWorkId && hoveredWorkId !== wn.id) ||
                  (activeDomainName && activeDomainName !== domName);
                return (
                  <line
                    key={`${wn.id}-${dn.id}`}
                    x1={dn.x}
                    y1={dn.y}
                    x2={wn.x}
                    y2={wn.y}
                    stroke={isHighlighted ? tokens.accent : tokens.muted}
                    strokeWidth={isHighlighted ? 1.7 : 0.75}
                    opacity={isHighlighted ? 0.85 : isDimmed ? 0.08 : 0.28}
                  />
                );
              })
            )}

            {/* Outer Work Nodes */}
            {workNodes.map((wn) => {
              const belongsToActive =
                !activeDomainName || (wn.domains || []).includes(activeDomainName);
              const isHot = hoveredWorkId === wn.id;
              const nodeColor =
                wn.category === 'Publications'
                  ? tokens.accent
                  : wn.category === 'Talks & Keynotes'
                  ? tokens.accent2
                  : wn.category === 'Conferences'
                  ? tokens.accent3
                  : tokens.ink;
              return (
                <g
                  key={wn.id}
                  onMouseEnter={() => setHoveredWorkId(wn.id)}
                  onMouseLeave={() => setHoveredWorkId(null)}
                  onClick={() => onOpenWork(wn)}
                  className="cursor-pointer"
                  opacity={belongsToActive || isHot ? 1 : 0.22}
                >
                  <circle
                    cx={wn.x}
                    cy={wn.y}
                    r={isHot ? 9.5 : 5.5}
                    fill={nodeColor}
                    stroke={tokens.surface}
                    strokeWidth="2"
                    style={{ transition: 'all 180ms ease' }}
                  />
                </g>
              );
            })}

            {/* 6 Research Domain Nodes */}
            {domainNodes.map((dn) => {
              const isSelected = selectedDomain === dn.name;
              const isHovered = hoveredDomain === dn.name;
              const active = isSelected || isHovered;
              const labelOffsetY = dn.y < cy ? -26 : 32;
              return (
                <g
                  key={dn.id}
                  onMouseEnter={() => setHoveredDomain(dn.name)}
                  onMouseLeave={() => setHoveredDomain(null)}
                  onClick={() => onSelectDomain(isSelected ? null : dn.name)}
                  className="cursor-pointer"
                >
                  <circle
                    cx={dn.x}
                    cy={dn.y}
                    r={active ? 22 : 18}
                    fill={active ? tokens.accent : tokens.surface2}
                    stroke={tokens.accent}
                    strokeWidth={active ? 2.5 : 1.5}
                    style={{ transition: 'all 200ms ease' }}
                  />
                  <text
                    x={dn.x}
                    y={dn.y + 4}
                    textAnchor="middle"
                    fontSize="11"
                    fontWeight="700"
                    fontFamily="JetBrains Mono, monospace"
                    fill={active ? tokens.accentContrast : tokens.ink}
                  >
                    {dn.count}
                  </text>
                  <text
                    x={dn.x}
                    y={dn.y + labelOffsetY}
                    textAnchor="middle"
                    fontSize="11.5"
                    fontWeight={active ? '700' : '600'}
                    fill={active ? tokens.accent : tokens.ink}
                  >
                    {dn.short}
                  </text>
                </g>
              );
            })}

            {/* Central Scholar Hub */}
            <g>
              <circle
                cx={cx}
                cy={cy}
                r="36"
                fill={tokens.surface}
                stroke={tokens.accent}
                strokeWidth="2"
              />
              <text
                x={cx}
                y={cy - 3}
                textAnchor="middle"
                fontSize="11"
                fontWeight="700"
                fontFamily="Cormorant Garamond, serif"
                fill={tokens.ink}
              >
                Dr. Mithula
              </text>
              <text
                x={cx}
                y={cy + 12}
                textAnchor="middle"
                fontSize="9"
                fontFamily="JetBrains Mono, monospace"
                fill={tokens.accent}
              >
                {works.length} WORKS
              </text>
            </g>
          </svg>
        </div>

        {/* Right Telemetry Inspector Panel */}
        <div className="lg:col-span-4 flex flex-col gap-3">
          <div
            className="rounded-xl border p-4"
            style={{
              backgroundColor: 'var(--surface-2)',
              borderColor: 'var(--border)',
            }}
          >
            <div className="font-mono text-[10px] uppercase tracking-widest mb-1.5" style={{ color: 'var(--accent)' }}>
              {hoveredWork ? 'Selected Work Node' : activeDomainObj ? 'Active Research Domain' : 'Graph Legend & Explorer'}
            </div>

            {hoveredWork ? (
              <div>
                <div className="font-mono text-[11px] mb-1" style={{ color: 'var(--muted)' }}>
                  {hoveredWork.category} · {hoveredWork.year}
                </div>
                <div className="font-serif text-base font-semibold leading-snug mb-2">
                  {hoveredWork.title}
                </div>
                <p className="text-xs leading-relaxed mb-2" style={{ color: 'var(--muted)' }}>
                  {hoveredWork.venue}
                </p>
                <div className="flex flex-wrap gap-1">
                  {(hoveredWork.domains || []).map((dom) => (
                    <span
                      key={dom}
                      className="rounded-full px-2 py-0.5 font-mono text-[10px]"
                      style={{ backgroundColor: 'var(--accent-soft)', color: 'var(--accent)' }}
                    >
                      {dom}
                    </span>
                  ))}
                </div>
              </div>
            ) : activeDomainObj ? (
              <div>
                <div className="font-serif text-lg font-semibold mb-1">{activeDomainObj.name}</div>
                <p className="text-xs leading-relaxed mb-3" style={{ color: 'var(--muted)' }}>
                  {activeDomainObj.description}
                </p>
                <div className="flex items-center justify-between text-xs font-mono">
                  <span>Connected Scholarship</span>
                  <span style={{ color: 'var(--accent)' }}>{activeDomainObj.count} entries</span>
                </div>
              </div>
            ) : (
              <p className="text-xs leading-relaxed" style={{ color: 'var(--muted)' }}>
                Hover any node to inspect semantic links across literature, film, digital culture, gender, trauma, and AI. Click any of the 6 domain circles to filter the Research Archive below.
              </p>
            )}
          </div>

          {/* Quick Domain Selector Pills */}
          <div className="grid grid-cols-2 gap-1.5">
            {domainNodes.map((dn) => {
              const isSelected = selectedDomain === dn.name;
              return (
                <button
                  key={dn.id}
                  type="button"
                  onMouseEnter={() => setHoveredDomain(dn.name)}
                  onMouseLeave={() => setHoveredDomain(null)}
                  onClick={() => onSelectDomain(isSelected ? null : dn.name)}
                  className="flex items-center justify-between rounded-lg border px-2.5 py-2 text-left text-xs font-medium transition cursor-pointer"
                  style={{
                    backgroundColor: isSelected ? 'var(--accent)' : 'var(--surface)',
                    borderColor: isSelected ? 'var(--accent)' : 'var(--border)',
                    color: isSelected ? 'var(--accent-contrast)' : 'var(--ink)',
                  }}
                >
                  <span className="truncate">{dn.short}</span>
                  <span className="font-mono text-[10px] opacity-80 ml-1">{dn.count}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
   8. 3D POINTER-TRACKING SPOTLIGHT TILT CARD
   ============================================================================ */
function TiltWorkCard({
  work,
  endorseCount,
  isEndorsed,
  isBookmarked,
  onEndorse,
  onBookmark,
  onOpen,
  reducedMotion,
}) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, mx: 50, my: 50, active: false });

  const handleMouseMove = (e) => {
    if (reducedMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    setTilt({
      rx: (0.5 - py) * 7,
      ry: (px - 0.5) * 7,
      mx: px * 100,
      my: py * 100,
      active: true,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ rx: 0, ry: 0, mx: 50, my: 50, active: false });
  };

  return (
    <article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onOpen(work)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpen(work);
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`Open citation and details for ${work.title}`}
      className="group relative flex flex-col rounded-2xl border p-5 cursor-pointer select-none focus:outline-none"
      style={{
        backgroundColor: 'var(--surface)',
        borderColor: tilt.active ? 'var(--accent-border)' : 'var(--border)',
        transform:
          !reducedMotion && tilt.active
            ? `perspective(900px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) translateY(-4px)`
            : 'perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0px)',
        transition: tilt.active
          ? 'transform 90ms ease-out, border-color 180ms ease'
          : 'transform 320ms cubic-bezier(0.16, 1, 0.3, 1), border-color 220ms ease',
        boxShadow: tilt.active ? '0 18px 36px -18px var(--glow)' : 'none',
      }}
    >
      {/* Pointer-following radial sheen */}
      {!reducedMotion && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-200"
          style={{
            opacity: tilt.active ? 1 : 0,
            background: `radial-gradient(360px circle at ${tilt.mx}% ${tilt.my}%, var(--glow), transparent 65%)`,
          }}
        />
      )}

      <div className="relative z-10 flex items-center justify-between gap-2 mb-3">
        <span
          className="rounded-full px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider"
          style={{
            backgroundColor: 'var(--accent-soft)',
            color: 'var(--accent)',
          }}
        >
          {work.badge || work.category}
        </span>
        <span className="font-mono text-xs" style={{ color: 'var(--muted)' }}>
          {work.year}
        </span>
      </div>

      <h3 className="relative z-10 font-serif text-lg font-semibold leading-snug mb-2 group-hover:underline decoration-1 underline-offset-4">
        {work.title}
      </h3>

      <p className="relative z-10 text-xs font-medium mb-2.5" style={{ color: 'var(--accent)' }}>
        {work.venue}
      </p>

      <p
        className="relative z-10 text-xs leading-relaxed mb-4 line-clamp-3"
        style={{ color: 'var(--muted)' }}
      >
        {work.summary}
      </p>

      {/* Domain Chips & Interactive Endorse/Bookmark Row */}
      <div
        className="relative z-10 mt-auto pt-3 border-t flex items-center justify-between gap-2"
        style={{ borderColor: 'var(--border)' }}
      >
        <div className="flex flex-wrap gap-1 min-w-0">
          {(work.domains || []).slice(0, 2).map((d) => (
            <span
              key={d}
              className="truncate max-w-[130px] rounded px-1.5 py-0.5 font-mono text-[10px]"
              style={{ backgroundColor: 'var(--surface-2)', color: 'var(--muted)' }}
            >
              {d.split('&')[0].trim()}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onEndorse(work.id);
            }}
            aria-label={`Endorse ${work.title}`}
            className="inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-mono transition cursor-pointer"
            style={{
              backgroundColor: isEndorsed ? 'var(--accent)' : 'var(--surface-2)',
              borderColor: isEndorsed ? 'var(--accent)' : 'var(--border)',
              color: isEndorsed ? 'var(--accent-contrast)' : 'var(--ink)',
            }}
          >
            <Heart className={`h-3 w-3 ${isEndorsed ? 'fill-current' : ''}`} />
            <span>{endorseCount}</span>
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onBookmark(work.id);
            }}
            aria-label={`Bookmark ${work.title}`}
            className="inline-flex h-7 w-7 items-center justify-center rounded-full border transition cursor-pointer"
            style={{
              backgroundColor: isBookmarked ? 'var(--accent-soft)' : 'var(--surface-2)',
              borderColor: isBookmarked ? 'var(--accent)' : 'var(--border)',
              color: isBookmarked ? 'var(--accent)' : 'var(--muted)',
            }}
          >
            <Bookmark className={`h-3 w-3 ${isBookmarked ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>
    </article>
  );
}

/* ============================================================================
   9. ARTISTIC LITERARY SVG GALLERY FRAME (DEFAULT VISUALS WHEN NO PHOTO YET)
   ============================================================================ */
function EditorialArtFrame({ styleType, tokens }) {
  return (
    <svg
      viewBox="0 0 400 260"
      className="h-full w-full object-cover"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`grad-${styleType}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={tokens.accent} stopOpacity="0.26" />
          <stop offset="55%" stopColor={tokens.accent2} stopOpacity="0.18" />
          <stop offset="100%" stopColor={tokens.surface2} stopOpacity="0.95" />
        </linearGradient>
      </defs>
      <rect width="400" height="260" fill={`url(#grad-${styleType})`} />

      {styleType === 'keynote' && (
        <g stroke={tokens.accent} fill="none" opacity="0.72">
          <circle cx="200" cy="130" r="78" strokeWidth="1.2" strokeDasharray="4 4" />
          <circle cx="200" cy="130" r="48" strokeWidth="1.5" />
          <path d="M90 130 Q200 40 310 130 Q200 220 90 130 Z" strokeWidth="1.3" />
          <circle cx="200" cy="130" r="14" fill={tokens.accent} opacity="0.45" />
        </g>
      )}

      {styleType === 'monograph' && (
        <g stroke={tokens.accent} fill="none" opacity="0.75">
          <rect x="120" y="42" width="160" height="176" rx="4" strokeWidth="1.4" />
          <line x1="142" y1="42" x2="142" y2="218" strokeWidth="1.2" />
          <line x1="162" y1="88" x2="256" y2="88" strokeWidth="1.4" />
          <line x1="162" y1="106" x2="240" y2="106" strokeWidth="1" opacity="0.7" />
          <line x1="162" y1="124" x2="248" y2="124" strokeWidth="1" opacity="0.7" />
          <circle cx="209" cy="168" r="22" stroke={tokens.accent2} strokeWidth="1.2" />
        </g>
      )}

      {styleType === 'pedagogy' && (
        <g stroke={tokens.accent} fill="none" opacity="0.72">
          {[0, 1, 2, 3, 4].map((i) => (
            <ellipse
              key={i}
              cx="200"
              cy="130"
              rx={35 + i * 26}
              ry={18 + i * 15}
              strokeWidth="1.1"
              transform={`rotate(${i * 18} 200 130)`}
            />
          ))}
          <circle cx="200" cy="130" r="9" fill={tokens.accent2} />
        </g>
      )}

      {styleType === 'cinema' && (
        <g stroke={tokens.accent} fill="none" opacity="0.75">
          <rect x="65" y="55" width="270" height="150" rx="6" strokeWidth="1.3" />
          {[85, 125, 165, 205, 245, 285].map((x) => (
            <rect key={x} x={x} y="65" width="20" height="10" rx="2" fill={tokens.accent} opacity="0.35" />
          ))}
          {[85, 125, 165, 205, 245, 285].map((x) => (
            <rect key={`b-${x}`} x={x} y="185" width="20" height="10" rx="2" fill={tokens.accent} opacity="0.35" />
          ))}
          <path d="M120 152 C155 95, 245 165, 280 108" stroke={tokens.accent2} strokeWidth="2" />
        </g>
      )}
    </svg>
  );
}

/* ============================================================================
   9B. FULL-SCREEN WEBGL "PORTRAIT IN DOTS" OPENING STAGE
   - Orthographic 1:1 projection so dots at rest align pixel-for-pixel with portrait
   - Dark crimson circular preloader (0–100%) launching 56,000+ dots into 3D bust
   - Procedural Dr. Mithula Thomas bust + live Photo-to-3D-Dots processor
   - 30° eased head tracking (shoulders follow subtly) + cursor spotlight
   - 3.6-second sweeping reveal band + WebGL halftone circle-growth transition
   ============================================================================ */
const PORTRAIT_TEX_W = 512;
const PORTRAIT_TEX_H = 640;
const PORTRAIT_ASPECT = PORTRAIT_TEX_W / PORTRAIT_TEX_H;
const TOTAL_BUST_DOTS = 56000;
const TOTAL_DUST_DOTS = 220;

/**
 * Generates a high-detail studio bust portrait styled to match Dr. Mithula Thomas
 * (swept-up dark hair, smooth sculptural face oval, open-collar white shirt, navy blazer)
 * used as the default source before a custom portrait photo is uploaded.
 */
function renderProceduralBustCanvas() {
  const c = document.createElement('canvas');
  c.width = PORTRAIT_TEX_W;
  c.height = PORTRAIT_TEX_H;
  const ctx = c.getContext('2d');

  // Deep neutral studio backdrop (segmented cleanly as background)
  ctx.fillStyle = '#07080a';
  ctx.fillRect(0, 0, PORTRAIT_TEX_W, PORTRAIT_TEX_H);

  // Subtle dark studio rim vignette (kept very dark so silhouette extractor stays sharp)
  const bgGrad = ctx.createRadialGradient(256, 245, 30, 256, 280, 310);
  bgGrad.addColorStop(0, '#101216');
  bgGrad.addColorStop(1, '#060709');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, PORTRAIT_TEX_W, PORTRAIT_TEX_H);

  // --- Swept-up Back Hair Volume ---
  ctx.save();
  ctx.fillStyle = '#18161a';
  ctx.beginPath();
  ctx.ellipse(260, 178, 102, 114, -0.06, 0, Math.PI * 2);
  ctx.fill();
  // Soft swept bun/chignon on upper-right side
  ctx.beginPath();
  ctx.ellipse(330, 198, 42, 62, 0.28, 0, Math.PI * 2);
  ctx.fill();
  // Crown lift
  ctx.beginPath();
  ctx.ellipse(252, 106, 80, 56, -0.1, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // --- Navy Blazer Shoulders & Torso ---
  ctx.save();
  const blazerGrad = ctx.createLinearGradient(70, 410, 445, 640);
  blazerGrad.addColorStop(0, '#1c2b47');
  blazerGrad.addColorStop(0.5, '#132038');
  blazerGrad.addColorStop(1, '#0d1629');
  ctx.fillStyle = blazerGrad;
  ctx.beginPath();
  ctx.moveTo(42, 640);
  ctx.quadraticCurveTo(54, 492, 118, 452);
  ctx.quadraticCurveTo(166, 424, 212, 412);
  ctx.lineTo(304, 412);
  ctx.quadraticCurveTo(356, 425, 402, 456);
  ctx.quadraticCurveTo(460, 498, 474, 640);
  ctx.closePath();
  ctx.fill();

  // Blazer shoulder rim highlights
  ctx.strokeStyle = 'rgba(130, 160, 210, 0.32)';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(118, 452);
  ctx.quadraticCurveTo(164, 424, 204, 416);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(310, 416);
  ctx.quadraticCurveTo(358, 426, 402, 456);
  ctx.stroke();

  // Crisp White Open-Collar Shirt (V-opening)
  const shirtGrad = ctx.createLinearGradient(175, 420, 330, 640);
  shirtGrad.addColorStop(0, '#f0f2f6');
  shirtGrad.addColorStop(0.55, '#dfe4ec');
  shirtGrad.addColorStop(1, '#c3cbd8');
  ctx.fillStyle = shirtGrad;
  ctx.beginPath();
  ctx.moveTo(192, 414);
  ctx.lineTo(322, 414);
  ctx.lineTo(348, 640);
  ctx.lineTo(166, 640);
  ctx.closePath();
  ctx.fill();

  // Left & Right Blazer Lapels
  ctx.fillStyle = '#1f3152';
  ctx.beginPath();
  ctx.moveTo(192, 412);
  ctx.lineTo(148, 466);
  ctx.lineTo(182, 502);
  ctx.lineTo(164, 530);
  ctx.lineTo(228, 640);
  ctx.lineTo(198, 640);
  ctx.lineTo(136, 526);
  ctx.closePath();
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(322, 412);
  ctx.lineTo(368, 466);
  ctx.lineTo(334, 502);
  ctx.lineTo(352, 530);
  ctx.lineTo(290, 640);
  ctx.lineTo(318, 640);
  ctx.lineTo(380, 526);
  ctx.closePath();
  ctx.fill();

  // Lapel edge crease highlights for crisp dot definition
  ctx.strokeStyle = 'rgba(180, 200, 232, 0.36)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(192, 414);
  ctx.lineTo(234, 640);
  ctx.moveTo(322, 414);
  ctx.lineTo(284, 640);
  ctx.stroke();

  // Shirt Collar Wings & Center Placket
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.moveTo(206, 396);
  ctx.lineTo(176, 444);
  ctx.lineTo(212, 496);
  ctx.lineTo(238, 468);
  ctx.closePath();
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(306, 396);
  ctx.lineTo(336, 444);
  ctx.lineTo(300, 496);
  ctx.lineTo(274, 468);
  ctx.closePath();
  ctx.fill();

  ctx.strokeStyle = 'rgba(70, 82, 102, 0.45)';
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.moveTo(206, 396);
  ctx.lineTo(176, 444);
  ctx.lineTo(212, 496);
  ctx.moveTo(306, 396);
  ctx.lineTo(336, 444);
  ctx.lineTo(300, 496);
  ctx.moveTo(256, 492);
  ctx.lineTo(256, 640);
  ctx.stroke();
  ctx.restore();

  // --- Neck ---
  ctx.save();
  const neckGrad = ctx.createLinearGradient(212, 340, 304, 460);
  neckGrad.addColorStop(0, '#c69878');
  neckGrad.addColorStop(0.5, '#d6aa8a');
  neckGrad.addColorStop(1, '#a97b5c');
  ctx.fillStyle = neckGrad;
  ctx.beginPath();
  ctx.moveTo(214, 344);
  ctx.quadraticCurveTo(216, 405, 204, 442);
  ctx.quadraticCurveTo(256, 502, 308, 442);
  ctx.quadraticCurveTo(296, 405, 298, 344);
  ctx.closePath();
  ctx.fill();

  // Soft chin shadow on neck
  ctx.fillStyle = 'rgba(78, 48, 34, 0.38)';
  ctx.beginPath();
  ctx.ellipse(256, 368, 44, 24, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // --- Smooth Sculptural Face Oval ---
  ctx.save();
  const faceGrad = ctx.createRadialGradient(240, 232, 22, 256, 258, 128);
  faceGrad.addColorStop(0, '#e3bc9d');
  faceGrad.addColorStop(0.58, '#cfa180');
  faceGrad.addColorStop(0.88, '#b58465');
  faceGrad.addColorStop(1, '#94674c');
  ctx.fillStyle = faceGrad;
  ctx.beginPath();
  ctx.moveTo(256, 148);
  ctx.bezierCurveTo(318, 148, 336, 206, 326, 272);
  ctx.bezierCurveTo(318, 326, 286, 368, 256, 370);
  ctx.bezierCurveTo(226, 368, 194, 326, 186, 272);
  ctx.bezierCurveTo(176, 206, 194, 148, 256, 148);
  ctx.closePath();
  ctx.fill();

  // Cheekbone & forehead soft specular
  ctx.fillStyle = 'rgba(255, 234, 214, 0.22)';
  ctx.beginPath();
  ctx.ellipse(222, 274, 26, 16, -0.18, 0, Math.PI * 2);
  ctx.ellipse(288, 274, 24, 15, 0.18, 0, Math.PI * 2);
  ctx.ellipse(252, 194, 38, 18, 0, 0, Math.PI * 2);
  ctx.fill();

  // Eyebrows
  ctx.strokeStyle = '#241c1a';
  ctx.lineWidth = 4.6;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(205, 232);
  ctx.quadraticCurveTo(224, 224, 242, 230);
  ctx.moveTo(270, 230);
  ctx.quadraticCurveTo(288, 224, 307, 232);
  ctx.stroke();

  // Eyes (expressive, calm academic gaze)
  const drawEye = (ex, ey) => {
    ctx.fillStyle = '#f3efea';
    ctx.beginPath();
    ctx.ellipse(ex, ey, 14, 6.2, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#251a16';
    ctx.beginPath();
    ctx.arc(ex, ey, 5.4, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(ex - 2, ey - 1.8, 1.6, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#1b1412';
    ctx.lineWidth = 2.4;
    ctx.beginPath();
    ctx.moveTo(ex - 15, ey);
    ctx.quadraticCurveTo(ex, ey - 8.5, ex + 15, ey);
    ctx.stroke();
  };
  drawEye(224, 248);
  drawEye(288, 248);

  // Sculpted Nose Bridge & Tip
  ctx.strokeStyle = 'rgba(130, 86, 62, 0.5)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(256, 246);
  ctx.lineTo(253, 286);
  ctx.quadraticCurveTo(256, 294, 265, 290);
  ctx.stroke();
  ctx.fillStyle = 'rgba(255, 232, 212, 0.25)';
  ctx.beginPath();
  ctx.ellipse(255, 270, 4.5, 16, 0, 0, Math.PI * 2);
  ctx.fill();

  // Natural Composed Smile Lips
  ctx.fillStyle = '#9c5a57';
  ctx.beginPath();
  ctx.moveTo(232, 318);
  ctx.quadraticCurveTo(246, 310, 256, 314);
  ctx.quadraticCurveTo(266, 310, 280, 318);
  ctx.quadraticCurveTo(256, 333, 232, 318);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = 'rgba(72, 34, 34, 0.55)';
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  ctx.moveTo(233, 318);
  ctx.quadraticCurveTo(256, 322, 279, 318);
  ctx.stroke();
  ctx.restore();

  // --- Swept Front Hairline & Luminous Strands (Edge-Contrast Detail) ---
  ctx.save();
  ctx.fillStyle = '#171519';
  ctx.beginPath();
  ctx.moveTo(182, 234);
  ctx.bezierCurveTo(176, 152, 204, 102, 258, 96);
  ctx.bezierCurveTo(322, 92, 348, 154, 334, 236);
  ctx.bezierCurveTo(324, 190, 306, 158, 268, 152);
  ctx.bezierCurveTo(222, 146, 196, 182, 182, 234);
  ctx.closePath();
  ctx.fill();

  // Fine swept hair strand highlights so local-contrast detection illuminates the coiffure
  ctx.strokeStyle = 'rgba(135, 126, 138, 0.42)';
  ctx.lineWidth = 1.6;
  for (let i = 0; i < 24; i++) {
    const t = i / 24;
    ctx.beginPath();
    ctx.moveTo(188 + t * 140, 175 - Math.sin(t * Math.PI) * 58);
    ctx.bezierCurveTo(
      210 + t * 120,
      115 - Math.sin(t * Math.PI) * 26,
      280 + t * 65,
      118 + t * 24,
      328 + Math.sin(t * 5) * 18,
      180 + t * 44
    );
    ctx.stroke();
  }
  ctx.restore();

  return c;
}

/**
 * Loads an image URL or Data URL onto a 512x640 cover-cropped canvas.
 */
function loadPortraitToCanvas(imageUrl) {
  return new Promise((resolve) => {
    if (!imageUrl) {
      resolve(renderProceduralBustCanvas());
      return;
    }
    const img = new window.Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const c = document.createElement('canvas');
      c.width = PORTRAIT_TEX_W;
      c.height = PORTRAIT_TEX_H;
      const ctx = c.getContext('2d');
      const imgAspect = img.width / img.height;
      let sx = 0;
      let sy = 0;
      let sw = img.width;
      let sh = img.height;
      if (imgAspect > PORTRAIT_ASPECT) {
        sw = img.height * PORTRAIT_ASPECT;
        sx = (img.width - sw) * 0.5;
      } else {
        sh = img.width / PORTRAIT_ASPECT;
        sy = (img.height - sh) * 0.25;
      }
      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, PORTRAIT_TEX_W, PORTRAIT_TEX_H);
      resolve(c);
    };
    img.onerror = () => resolve(renderProceduralBustCanvas());
    img.src = imageUrl;
  });
}

/**
 * Extracts subject silhouette, ellipsoidal 3D head-and-shoulders depth map,
 * normals, and local-contrast edge brightness, then samples ~56,000 dots.
 */
function buildPortraitPointCloud(sourceCanvas, isRealPhoto) {
  const W = PORTRAIT_TEX_W;
  const H = PORTRAIT_TEX_H;
  const ctx = sourceCanvas.getContext('2d');
  const imgData = ctx.getImageData(0, 0, W, H);
  const px = imgData.data;

  // Estimate background color from top corners for real-photo silhouette extraction
  let bgR = 0;
  let bgG = 0;
  let bgB = 0;
  let bgSamples = 0;
  for (let y = 0; y < 28; y += 2) {
    for (let x = 0; x < 28; x += 2) {
      const iL = (y * W + x) * 4;
      const iR = (y * W + (W - 1 - x)) * 4;
      bgR += px[iL] + px[iR];
      bgG += px[iL + 1] + px[iR + 1];
      bgB += px[iL + 2] + px[iR + 2];
      bgSamples += 2;
    }
  }
  bgR /= bgSamples;
  bgG /= bgSamples;
  bgB /= bgSamples;

  const mask = new Float32Array(W * H);
  const luma = new Float32Array(W * H);
  const edge = new Float32Array(W * H);

  // Pass 1: Luminance + Subject Silhouette Mask
  for (let y = 0; y < H; y++) {
    const ny = y / H; // 0 top .. 1 bottom
    for (let x = 0; x < W; x++) {
      const nx = x / W;
      const idx = y * W + x;
      const p = idx * 4;
      const r = px[p];
      const g = px[p + 1];
      const b = px[p + 2];
      luma[idx] = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

      // Ellipsoidal head + shoulders anatomical prior
      const hx = (nx - 0.5) / 0.25;
      const hy = (ny - 0.34) / 0.27;
      const headPrior = 1.0 - Math.sqrt(hx * hx + hy * hy);

      const sx = (nx - 0.5) / 0.45;
      const sy = (ny - 0.92) / 0.34;
      const shoulderPrior = 1.0 - Math.sqrt(sx * sx + sy * sy);

      const neckX = (nx - 0.5) / 0.12;
      const neckY = (ny - 0.62) / 0.16;
      const neckPrior = 1.0 - Math.sqrt(neckX * neckX + neckY * neckY);

      const anatomical = Math.max(headPrior, shoulderPrior, neckPrior);

      if (!isRealPhoto) {
        // Procedural portrait has clean near-black studio background
        const distFromDark = Math.hypot(r - 7, g - 8, b - 10) / 255;
        const m = clamp((distFromDark - 0.045) * 9.0, 0, 1);
        mask[idx] = m;
      } else {
        // Real photo: combine border-color separation with anatomical bust prior
        const colorDist = Math.hypot(r - bgR, g - bgG, b - bgB) / 255;
        const colorKeep = clamp((colorDist - 0.11) * 4.2, 0, 1);
        const priorBoost = clamp((anatomical + 0.14) * 3.0, 0, 1);
        const outerFade = clamp((anatomical + 0.34) * 2.5, 0, 1);
        mask[idx] = clamp(Math.max(colorKeep * outerFade, priorBoost * 0.85), 0, 1);
      }
    }
  }

  // Pass 2: Local-contrast Sobel edge brightness (hair strands, hairline, collar, blazer folds)
  for (let y = 1; y < H - 1; y++) {
    for (let x = 1; x < W - 1; x++) {
      const idx = y * W + x;
      const gx =
        -luma[(y - 1) * W + (x - 1)] +
        luma[(y - 1) * W + (x + 1)] -
        2 * luma[y * W + (x - 1)] +
        2 * luma[y * W + (x + 1)] -
        luma[(y + 1) * W + (x - 1)] +
        luma[(y + 1) * W + (x + 1)];
      const gy =
        -luma[(y - 1) * W + (x - 1)] -
        2 * luma[(y - 1) * W + x] -
        luma[(y - 1) * W + (x + 1)] +
        luma[(y + 1) * W + (x - 1)] +
        2 * luma[(y + 1) * W + x] +
        luma[(y + 1) * W + (x + 1)];
      edge[idx] = clamp(Math.hypot(gx, gy) * 1.4, 0, 1);
    }
  }

  // Build masked portrait texture canvas so halftone reveal only shows the subject cleanly
  const maskedCanvas = document.createElement('canvas');
  maskedCanvas.width = W;
  maskedCanvas.height = H;
  const mCtx = maskedCanvas.getContext('2d');
  const outImg = mCtx.createImageData(W, H);
  for (let i = 0; i < W * H; i++) {
    const p = i * 4;
    outImg.data[p] = px[p];
    outImg.data[p + 1] = px[p + 1];
    outImg.data[p + 2] = px[p + 2];
    outImg.data[p + 3] = Math.round(mask[i] * 255);
  }
  mCtx.putImageData(outImg, 0, 0);

  // Pass 3: Importance-sampled ~56,000 3D bust dots + 220 atmospheric dust dots
  const totalCount = TOTAL_BUST_DOTS + TOTAL_DUST_DOTS;
  const targetPos = new Float32Array(totalCount * 3);
  const startPos = new Float32Array(totalCount * 3);
  const normals = new Float32Array(totalCount * 3);
  const photoColors = new Float32Array(totalCount * 3);
  const dotMeta = new Float32Array(totalCount * 4); // [size, headWeight, brightness, rand]

  let placed = 0;
  let attempts = 0;
  const maxAttempts = TOTAL_BUST_DOTS * 16;

  // Helper to compute smooth ellipsoidal 3D head-and-shoulders depth
  const evalDepth = (nx, ny) => {
    // Head ellipsoid centered around (0.5, 0.36)
    const hx = (nx - 0.5) / 0.21;
    const hy = (ny - 0.37) / 0.24;
    const hd2 = hx * hx + hy * hy;
    const zHead = hd2 < 1.0 ? Math.sqrt(1.0 - hd2) * 0.24 : 0.0;

    // Nose & central facial projection boost
    const noseX = (nx - 0.5) / 0.055;
    const noseY = (ny - 0.43) / 0.08;
    const nd2 = noseX * noseX + noseY * noseY;
    const zNose = nd2 < 1.0 ? Math.pow(1.0 - nd2, 1.5) * 0.055 : 0.0;

    // Neck cylinder
    const neckX = (nx - 0.5) / 0.11;
    const neckY = (ny - 0.62) / 0.14;
    const zNeck =
      Math.abs(neckX) < 1.0 && Math.abs(neckY) < 1.0
        ? Math.sqrt(Math.max(0, 1.0 - neckX * neckX)) * 0.11 * (1.0 - Math.abs(neckY) * 0.4)
        : 0.0;

    // Shoulders & blazer torso ellipsoid
    const sx = (nx - 0.5) / 0.44;
    const sy = (ny - 0.94) / 0.36;
    const sd2 = sx * sx + sy * sy;
    const zShoulders = sd2 < 1.0 ? Math.sqrt(1.0 - sd2) * 0.18 : 0.0;

    return Math.max(zHead + zNose, zNeck, zShoulders);
  };

  while (placed < TOTAL_BUST_DOTS && attempts < maxAttempts) {
    attempts++;
    const x = Math.floor(Math.random() * (W - 2)) + 1;
    const y = Math.floor(Math.random() * (H - 2)) + 1;
    const idx = y * W + x;
    const m = mask[idx];
    if (m < 0.22) continue;

    const nx = x / W;
    const ny = y / H;
    const lum = luma[idx];
    const ed = edge[idx];

    // Smooth face oval zone vs high-contrast hair/collar/blazer edges
    const fx = (nx - 0.5) / 0.15;
    const fy = (ny - 0.4) / 0.18;
    const inFaceOval = fx * fx + fy * fy < 1.0;

    const weight = inFaceOval
      ? 0.42 + lum * 0.42 + ed * 0.35
      : 0.24 + lum * 0.35 + ed * 0.85;

    if (Math.random() > clamp(weight * m, 0.08, 1.0)) continue;

    // Normalized portrait plane coordinates: u in [-0.5, 0.5], v in [-0.5, 0.5] (top = +0.5)
    const u = nx - 0.5 + (Math.random() - 0.5) / W;
    const v = 0.5 - ny + (Math.random() - 0.5) / H;
    const z = evalDepth(nx, ny);

    // Finite-difference surface normal for key + rim lighting
    const eps = 0.008;
    const dzdx = (evalDepth(nx + eps, ny) - evalDepth(nx - eps, ny)) / (2 * eps);
    const dzdy = (evalDepth(nx, ny - eps) - evalDepth(nx, ny + eps)) / (2 * eps);
    let nrmX = -dzdx * 0.45;
    let nrmY = -dzdy * 0.45;
    let nrmZ = 1.0;
    const nLen = Math.hypot(nrmX, nrmY, nrmZ) || 1;
    nrmX /= nLen;
    nrmY /= nLen;
    nrmZ /= nLen;

    // Head rotation weight: 1.0 on head/hair, tapering smoothly to 0.22 on shoulders
    const headWeight = clamp((0.68 - ny) / 0.22, 0.22, 1.0);

    // Preloader ring launch origin (circle in NDC around center)
    const angle = Math.random() * Math.PI * 2;
    const ringR = 0.175 + (Math.random() - 0.5) * 0.012;
    const i3 = placed * 3;
    const i4 = placed * 4;

    targetPos[i3] = u;
    targetPos[i3 + 1] = v;
    targetPos[i3 + 2] = z;

    startPos[i3] = Math.cos(angle) * ringR;
    startPos[i3 + 1] = Math.sin(angle) * ringR;
    startPos[i3 + 2] = (Math.random() - 0.5) * 0.05;

    normals[i3] = nrmX;
    normals[i3 + 1] = nrmY;
    normals[i3 + 2] = nrmZ;

    const p = idx * 4;
    photoColors[i3] = px[p] / 255;
    photoColors[i3 + 1] = px[p + 1] / 255;
    photoColors[i3 + 2] = px[p + 2] / 255;

    // Varying dot sizes & edge-enhanced brightness
    const baseSize = inFaceOval
      ? 1.55 + Math.random() * 2.1
      : 1.7 + ed * 1.9 + Math.random() * 2.4;
    const bright = clamp(0.42 + lum * 0.34 + ed * 0.55, 0.25, 1.25);

    dotMeta[i4] = baseSize;
    dotMeta[i4 + 1] = headWeight;
    dotMeta[i4 + 2] = bright;
    dotMeta[i4 + 3] = Math.random(); // stagger seed

    placed++;
  }

  // Append faint atmospheric dust particles (tagged with negative size)
  for (let d = 0; d < TOTAL_DUST_DOTS; d++) {
    const idx = TOTAL_BUST_DOTS + d;
    const i3 = idx * 3;
    const i4 = idx * 4;
    targetPos[i3] = (Math.random() - 0.5) * 1.9;
    targetPos[i3 + 1] = (Math.random() - 0.5) * 1.9;
    targetPos[i3 + 2] = (Math.random() - 0.5) * 0.2;

    startPos[i3] = targetPos[i3];
    startPos[i3 + 1] = targetPos[i3 + 1];
    startPos[i3 + 2] = 0;

    normals[i3] = 0;
    normals[i3 + 1] = 0;
    normals[i3 + 2] = 1;

    photoColors[i3] = 0.64;
    photoColors[i3 + 1] = 0.04;
    photoColors[i3 + 2] = 0.06;

    dotMeta[i4] = -(1.4 + Math.random() * 2.2); // negative marks dust particle
    dotMeta[i4 + 1] = 0.0;
    dotMeta[i4 + 2] = 0.22 + Math.random() * 0.25;
    dotMeta[i4 + 3] = Math.random();
  }

  return {
    count: placed + TOTAL_DUST_DOTS,
    targetPos,
    startPos,
    normals,
    photoColors,
    dotMeta,
    maskedCanvas,
  };
}

function PortraitInDotsIntro({ portraitUrl, onUploadPortrait, onEnterPortfolio, reducedMotion }) {
  const canvasRef = useRef(null);
  const [loadPct, setLoadPct] = useState(0);
  const [ready, setReady] = useState(false);
  const [revealState, setRevealState] = useState('dots'); // 'dots' | 'revealing' | 'revealed' | 'reversing'
  const [backdropCrimsonPct, setBackdropCrimsonPct] = useState(0); // 0..100 synced to sweeping band
  const [curtainOut, setCurtainOut] = useState(false);

  // Mutable animation controller ref (keeps 60fps WebGL loop decoupled from React re-renders)
  const animRef = useRef({
    launchStart: 0,
    launched: false,
    introSweepStart: 0,
    revealMode: 'dots', // 'dots' | 'centering' | 'revealing' | 'revealed' | 'reversing'
    revealStart: 0,
    revealProgress: 0, // 0 (dots) .. 1 (full portrait)
    pointerX: 0,
    pointerY: 0,
    hasMovedPointer: false,
    curYaw: 0,
    curPitch: 0,
    curLightX: 0.25,
    curLightY: 0.25,
    curLightStrength: 0.0,
  });

  // Trigger Reveal / Back to dots
  const handleToggleReveal = () => {
    const st = animRef.current;
    if (!ready) return;
    if (st.revealMode === 'dots') {
      st.revealMode = 'centering';
      st.revealStart = performance.now();
      setRevealState('revealing');
    } else if (st.revealMode === 'revealed' || st.revealMode === 'revealing') {
      st.revealMode = 'reversing';
      st.revealStart = performance.now();
      setRevealState('reversing');
    }
  };

  // Smooth curtain transition into main portfolio website
  const triggerEnterPortfolio = useCallback(() => {
    if (curtainOut) return;
    setCurtainOut(true);
    setTimeout(() => {
      onEnterPortfolio();
    }, reducedMotion ? 80 : 620);
  }, [curtainOut, onEnterPortfolio, reducedMotion]);

  // Allow gentle wheel-down gesture once loaded to enter portfolio
  useEffect(() => {
    if (!ready) return;
    let wheelAccum = 0;
    const onWheel = (e) => {
      if (e.deltaY > 18) {
        wheelAccum += e.deltaY;
        if (wheelAccum > 260) {
          triggerEnterPortfolio();
        }
      }
    };
    window.addEventListener('wheel', onWheel, { passive: true });
    return () => window.removeEventListener('wheel', onWheel);
  }, [ready, triggerEnterPortfolio]);

  // Main WebGL Engine & Real-Progress Preloader Lifecycle
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl', {
      alpha: true,
      antialias: true,
      premultipliedAlpha: false,
    });
    if (!gl) {
      setLoadPct(100);
      setReady(true);
      return;
    }

    let cancelled = false;
    let rafId = null;
    let pointCloud = null;

    // Reset state on portrait source change
    setReady(false);
    setLoadPct(4);
    setRevealState('dots');
    setBackdropCrimsonPct(0);
    animRef.current.launched = false;
    animRef.current.revealMode = 'dots';
    animRef.current.revealProgress = 0;

    // --- 1. Compile Shaders (Halftone Portrait Quad + 3D Dot Sculpture) ---
    const compileShader = (type, src) => {
      const sh = gl.createShader(type);
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      return sh;
    };

    const createProgram = (vsSrc, fsSrc) => {
      const p = gl.createProgram();
      gl.attachShader(p, compileShader(gl.VERTEX_SHADER, vsSrc));
      gl.attachShader(p, compileShader(gl.FRAGMENT_SHADER, fsSrc));
      gl.linkProgram(p);
      return p;
    };

    // Halftone Portrait Quad Program
    const quadProgram = createProgram(
      `
      attribute vec2 aQuadPos;
      attribute vec2 aQuadUv;
      uniform vec2 uPlaneScale;
      varying vec2 vUv;
      void main() {
        vUv = aQuadUv;
        gl_Position = vec4(aQuadPos * uPlaneScale, 0.0, 1.0);
      }
      `,
      `
      precision mediump float;
      uniform sampler2D uTex;
      uniform float uSweepY;      // 1.12 (top) -> -0.12 (bottom)
      uniform float uShowPortrait;
      varying vec2 vUv;

      void main() {
        if (uShowPortrait < 0.001) discard;
        vec4 tex = texture2D(uTex, vec2(vUv.x, 1.0 - vUv.y));
        if (tex.a < 0.05) discard;

        // Distance above the sweeping reveal band (vUv.y = 1 at top, 0 at bottom)
        float above = (vUv.y - uSweepY) / 0.22;
        float prog = clamp(above, 0.0, 1.0);
        if (prog <= 0.001) discard;

        // Halftone grid of tiny circles that grow until they seamlessly join
        vec2 gridRes = vec2(108.0, 135.0);
        vec2 cell = fract(vUv * gridRes) - 0.5;
        float dist = length(cell);
        float radius = mix(0.0, 0.78, smoothstep(0.0, 1.0, prog));
        float circleMask = 1.0 - smoothstep(radius - 0.06, radius + 0.06, dist);

        // Luminous leading band glow
        float bandGlow = exp(-pow((vUv.y - uSweepY) / 0.028, 2.0));
        vec3 col = tex.rgb + vec3(0.85, 0.18, 0.22) * bandGlow * 0.45;

        float finalAlpha = tex.a * circleMask * uShowPortrait;
        if (finalAlpha < 0.01) discard;
        gl_FragColor = vec4(col, finalAlpha);
      }
      `
    );

    // 3D Dot Sculpture + Atmospheric Dust Program
    const dotProgram = createProgram(
      `
      precision mediump float;
      attribute vec3 aTargetPos;
      attribute vec3 aStartPos;
      attribute vec3 aNormal;
      attribute vec3 aPhotoColor;
      attribute vec4 aMeta; // [size, headWeight, brightness, rand]

      uniform vec2 uPlaneScale;
      uniform float uAspect;
      uniform float uDpr;
      uniform float uTime;
      uniform float uLaunch;      // 0 (preloader ring) -> 1 (3D bust)
      uniform float uIntroBandY;  // single top-to-bottom light band after launch
      uniform float uYaw;
      uniform float uPitch;
      uniform vec2 uCursorPos;    // normalized -1..1
      uniform float uCursorPower;
      uniform float uSweepY;      // 1.12 -> -0.12 during 3.6s Reveal
      uniform float uRevealActive;

      varying vec3 vColor;
      varying float vAlpha;

      void main() {
        float rawSize = aMeta.x;
        float headWeight = aMeta.y;
        float bright = aMeta.z;
        float seed = aMeta.w;

        // Faint drifting atmospheric dust particles
        if (rawSize < 0.0) {
          vec2 drift = vec2(
            aTargetPos.x + sin(uTime * 0.22 + seed * 18.0) * 0.06,
            aTargetPos.y + mod(uTime * 0.018 + seed, 1.0) * 0.4 - 0.2
          );
          gl_Position = vec4(drift, 0.0, 1.0);
          gl_PointSize = abs(rawSize) * uDpr;
          vColor = vec3(0.68, 0.08, 0.11);
          vAlpha = bright * 0.35 * uLaunch * (1.0 - uRevealActive * 0.65);
          return;
        }

        // Staggered launch out of the crimson preloader ring
        float localLaunch = clamp((uLaunch - seed * 0.24) / 0.76, 0.0, 1.0);
        float easeLaunch = 1.0 - pow(1.0 - localLaunch, 3.0);

        // Reveal progress for this dot's vertical position (vUvY: 0 bottom .. 1 top)
        float vUvY = aTargetPos.y + 0.5;
        float revealAbove = clamp((vUvY - uSweepY) / 0.16, 0.0, 1.0) * uRevealActive;
        float bandPulse = exp(-pow((vUvY - uSweepY) / 0.032, 2.0)) * uRevealActive;

        // Press flat onto the portrait plane above the sweeping reveal band
        float zFlat = aTargetPos.z * (1.0 - revealAbove);

        // Rotate head up to ~30 deg toward cursor; shoulders follow slightly via headWeight
        float yaw = uYaw * headWeight * (1.0 - revealAbove);
        float pitch = uPitch * headWeight * (1.0 - revealAbove);

        float xLocal = aTargetPos.x * 0.8; // portrait aspect
        float yLocal = aTargetPos.y - 0.04;
        float zLocal = zFlat;

        float cy = cos(yaw);
        float sy = sin(yaw);
        float cx = cos(pitch);
        float sx = sin(pitch);

        // Rotate Y then X
        float rx = xLocal * cy + zLocal * sy;
        float rz1 = -xLocal * sy + zLocal * cy;
        float ry = yLocal * cx - rz1 * sx;
        float rz = yLocal * sx + rz1 * cx;

        // Rotate normal for shading
        vec3 n = aNormal;
        vec3 nY = vec3(n.x * cy + n.z * sy, n.y, -n.x * sy + n.z * cy);
        vec3 nRot = normalize(vec3(nY.x, nY.y * cx - nY.z * sx, nY.y * sx + nY.z * cx));

        vec2 bustNdc = vec2((rx / 0.8) * uPlaneScale.x, (ry + 0.04) * uPlaneScale.y);

        // Preloader ring position (aspect-corrected circle)
        vec2 ringNdc = vec2(aStartPos.x / uAspect, aStartPos.y);

        // Arc flight from ring to bust
        vec2 posNdc = mix(ringNdc, bustNdc, easeLaunch);
        posNdc.y += sin(easeLaunch * 3.14159) * (seed - 0.5) * 0.06;

        gl_Position = vec4(posNdc, 0.0, 1.0);
        gl_PointSize = rawSize * uDpr * mix(0.75, 1.0, easeLaunch) * (1.0 + bandPulse * 0.45);

        // Mostly even shading + soft key light + subtle rim light
        vec3 keyDir = normalize(vec3(-0.35, 0.42, 0.84));
        float keyLight = max(dot(nRot, keyDir), 0.0);
        float rimLight = pow(1.0 - clamp(nRot.z, 0.0, 1.0), 2.4);

        // Cursor soft spotlight brightening the side of the bust it approaches
        float cursorDist = length(posNdc - uCursorPos);
        float cursorGlow = exp(-cursorDist * cursorDist * 4.5) * uCursorPower * (1.0 - uRevealActive);

        // Single intro light band sweeping top-to-bottom once after launch
        float introPulse = exp(-pow((vUvY - uIntroBandY) / 0.055, 2.0));

        // Signature dark crimson (0.64, 0.035, 0.055)
        vec3 crimson = vec3(0.64, 0.035, 0.055);
        float shade = (0.62 + keyLight * 0.36 + rimLight * 0.32) * bright;
        vec3 dotCol = crimson * shade;
        dotCol += vec3(0.95, 0.24, 0.28) * (cursorGlow * 0.52 + introPulse * 0.65 + bandPulse * 0.9);

        // Above sweeping reveal band: adopt real photo colors and fade as halftone joins
        vec3 finalCol = mix(dotCol, aPhotoColor * 1.15, revealAbove);
        float fadeOut = 1.0 - smoothstep(0.35, 1.0, revealAbove);

        vColor = finalCol;
        vAlpha = clamp((0.36 + bright * 0.34 + cursorGlow * 0.25 + introPulse * 0.28 + bandPulse * 0.4) * easeLaunch * fadeOut, 0.0, 1.0);
      }
      `,
      `
      precision mediump float;
      varying vec3 vColor;
      varying float vAlpha;
      void main() {
        vec2 c = gl_PointCoord - 0.5;
        float r2 = dot(c, c);
        if (r2 > 0.25) discard;
        // Soft round radial falloff
        float soft = exp(-r2 * 10.5);
        gl_FragColor = vec4(vColor, vAlpha * soft);
      }
      `
    );

    // Buffers & Texture
    const quadPosBuf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, quadPosBuf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-0.5, -0.5, 0.5, -0.5, -0.5, 0.5, 0.5, 0.5]),
      gl.STATIC_DRAW
    );

    const quadUvBuf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, quadUvBuf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([0, 0, 1, 0, 0, 1, 1, 1]),
      gl.STATIC_DRAW
    );

    const targetBuf = gl.createBuffer();
    const startBuf = gl.createBuffer();
    const normalBuf = gl.createBuffer();
    const colorBuf = gl.createBuffer();
    const metaBuf = gl.createBuffer();
    const portraitTex = gl.createTexture();

    // Pointer tracking listeners
    const onPointerMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      animRef.current.pointerX = clamp(nx, -1, 1);
      animRef.current.pointerY = clamp(ny, -1, 1);
      animRef.current.hasMovedPointer = true;
    };
    window.addEventListener('pointermove', onPointerMove, { passive: true });

    // Resize handler
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.clientWidth || window.innerWidth;
      const h = canvas.clientHeight || window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener('resize', resize);

    // Asynchronous real-progress pipeline
    const sleepFrame = () => new Promise((r) => setTimeout(r, 45));

    (async () => {
      if (cancelled) return;
      setLoadPct(18);
      await sleepFrame();

      const srcCanvas = await loadPortraitToCanvas(portraitUrl);
      if (cancelled) return;
      setLoadPct(44);
      await sleepFrame();

      pointCloud = buildPortraitPointCloud(srcCanvas, Boolean(portraitUrl));
      if (cancelled) return;
      setLoadPct(78);
      await sleepFrame();

      // Upload Point Cloud Buffers
      gl.bindBuffer(gl.ARRAY_BUFFER, targetBuf);
      gl.bufferData(gl.ARRAY_BUFFER, pointCloud.targetPos, gl.STATIC_DRAW);
      gl.bindBuffer(gl.ARRAY_BUFFER, startBuf);
      gl.bufferData(gl.ARRAY_BUFFER, pointCloud.startPos, gl.STATIC_DRAW);
      gl.bindBuffer(gl.ARRAY_BUFFER, normalBuf);
      gl.bufferData(gl.ARRAY_BUFFER, pointCloud.normals, gl.STATIC_DRAW);
      gl.bindBuffer(gl.ARRAY_BUFFER, colorBuf);
      gl.bufferData(gl.ARRAY_BUFFER, pointCloud.photoColors, gl.STATIC_DRAW);
      gl.bindBuffer(gl.ARRAY_BUFFER, metaBuf);
      gl.bufferData(gl.ARRAY_BUFFER, pointCloud.dotMeta, gl.STATIC_DRAW);

      // Upload Masked Portrait Texture
      gl.bindTexture(gl.TEXTURE_2D, portraitTex);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        pointCloud.maskedCanvas
      );

      setLoadPct(100);
      await new Promise((r) => setTimeout(r, 220));
      if (cancelled) return;

      const now = performance.now();
      animRef.current.launchStart = now;
      animRef.current.launched = true;
      animRef.current.introSweepStart = now + (reducedMotion ? 50 : 1450);
      setReady(true);

      // --- 60fps Render Loop ---
      const render = (t) => {
        if (cancelled) return;
        const st = animRef.current;
        const sec = t * 0.001;

        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);

        const viewW = canvas.width || 1;
        const viewH = canvas.height || 1;
        const viewAspect = viewW / viewH;

        // Exact orthographic 1:1 portrait plane scale
        let planeH = 1.66;
        let planeW = (planeH * PORTRAIT_ASPECT) / viewAspect;
        if (planeW > 1.72) {
          planeW = 1.72;
          planeH = (planeW * viewAspect) / PORTRAIT_ASPECT;
        }

        // 1. Launch progress (ring -> 3D bust)
        const launchDur = reducedMotion ? 10 : 1600;
        const launchProg = clamp((t - st.launchStart) / launchDur, 0, 1);

        // 2. Single top-to-bottom intro light band once after launch
        let introBandY = -2.0;
        if (t >= st.introSweepStart && !reducedMotion) {
          const sp = (t - st.introSweepStart) / 1350;
          if (sp <= 1.2) {
            introBandY = 1.12 - sp * 1.25;
          }
        }

        // 3. Reveal state machine (centering -> 3.6s sweep -> revealed -> reversing)
        let revealActive = 0.0;
        let sweepY = 1.15;

        if (st.revealMode === 'centering') {
          // Smoothly ease head straight forward before sweep begins
          const cDur = reducedMotion ? 10 : 420;
          if (t - st.revealStart >= cDur) {
            st.revealMode = 'revealing';
            st.revealStart = t;
          }
        } else if (st.revealMode === 'revealing') {
          const rDur = reducedMotion ? 120 : 3600; // exact 3.6-second reveal
          const p = clamp((t - st.revealStart) / rDur, 0, 1);
          st.revealProgress = p;
          revealActive = 1.0;
          sweepY = 1.12 - p * 1.28;
          setBackdropCrimsonPct(Math.round(p * 100));
          if (p >= 1) {
            st.revealMode = 'revealed';
            setRevealState('revealed');
          }
        } else if (st.revealMode === 'revealed') {
          st.revealProgress = 1.0;
          revealActive = 1.0;
          sweepY = -0.16;
        } else if (st.revealMode === 'reversing') {
          const revDur = reducedMotion ? 120 : 2200;
          const p = 1.0 - clamp((t - st.revealStart) / revDur, 0, 1);
          st.revealProgress = p;
          revealActive = p > 0.01 ? 1.0 : 0.0;
          sweepY = 1.12 - p * 1.28;
          setBackdropCrimsonPct(Math.round(p * 100));
          if (p <= 0) {
            st.revealMode = 'dots';
            setRevealState('dots');
          }
        }

        // 4. Cursor tracking & gentle organic idle drift (disabled when revealed/centering)
        const allowTracking = st.revealMode === 'dots' && !reducedMotion;
        let targetYaw = 0;
        let targetPitch = 0;
        let targetLightPower = 0;

        if (allowTracking) {
          if (st.hasMovedPointer) {
            targetYaw = clamp(st.pointerX, -1, 1) * 0.52; // ~30 degrees max
            targetPitch = clamp(-st.pointerY, -1, 1) * 0.22;
            targetLightPower = 1.0;
          } else {
            // Gentle organic idle drift before first mouse movement
            targetYaw = Math.sin(sec * 0.55) * 0.14;
            targetPitch = Math.cos(sec * 0.42) * 0.06;
            targetLightPower = 0.25;
          }
        }

        const damp = st.revealMode === 'centering' ? 0.14 : 0.065;
        st.curYaw += (targetYaw - st.curYaw) * damp;
        st.curPitch += (targetPitch - st.curPitch) * damp;
        st.curLightX += (st.pointerX - st.curLightX) * 0.12;
        st.curLightY += (st.pointerY - st.curLightY) * 0.12;
        st.curLightStrength += (targetLightPower - st.curLightStrength) * 0.08;

        // --- PASS A: Halftone Portrait Quad (Standard Alpha Blending) ---
        if (revealActive > 0.001) {
          gl.enable(gl.BLEND);
          gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
          gl.useProgram(quadProgram);

          const locPos = gl.getAttribLocation(quadProgram, 'aQuadPos');
          gl.bindBuffer(gl.ARRAY_BUFFER, quadPosBuf);
          gl.enableVertexAttribArray(locPos);
          gl.vertexAttribPointer(locPos, 2, gl.FLOAT, false, 0, 0);

          const locUv = gl.getAttribLocation(quadProgram, 'aQuadUv');
          gl.bindBuffer(gl.ARRAY_BUFFER, quadUvBuf);
          gl.enableVertexAttribArray(locUv);
          gl.vertexAttribPointer(locUv, 2, gl.FLOAT, false, 0, 0);

          gl.activeTexture(gl.TEXTURE0);
          gl.bindTexture(gl.TEXTURE_2D, portraitTex);
          gl.uniform1i(gl.getUniformLocation(quadProgram, 'uTex'), 0);
          gl.uniform2f(gl.getUniformLocation(quadProgram, 'uPlaneScale'), planeW, planeH);
          gl.uniform1f(gl.getUniformLocation(quadProgram, 'uSweepY'), sweepY);
          gl.uniform1f(gl.getUniformLocation(quadProgram, 'uShowPortrait'), revealActive);

          gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        }

        // --- PASS B: 56,000+ Additive-Blended Crimson 3D Dots ---
        if (pointCloud && st.revealMode !== 'revealed') {
          gl.enable(gl.BLEND);
          gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
          gl.useProgram(dotProgram);

          const bindAttr = (name, buf, size) => {
            const loc = gl.getAttribLocation(dotProgram, name);
            if (loc < 0) return;
            gl.bindBuffer(gl.ARRAY_BUFFER, buf);
            gl.enableVertexAttribArray(loc);
            gl.vertexAttribPointer(loc, size, gl.FLOAT, false, 0, 0);
          };

          bindAttr('aTargetPos', targetBuf, 3);
          bindAttr('aStartPos', startBuf, 3);
          bindAttr('aNormal', normalBuf, 3);
          bindAttr('aPhotoColor', colorBuf, 3);
          bindAttr('aMeta', metaBuf, 4);

          gl.uniform2f(gl.getUniformLocation(dotProgram, 'uPlaneScale'), planeW, planeH);
          gl.uniform1f(gl.getUniformLocation(dotProgram, 'uAspect'), viewAspect);
          gl.uniform1f(gl.getUniformLocation(dotProgram, 'uDpr'), dpr);
          gl.uniform1f(gl.getUniformLocation(dotProgram, 'uTime'), sec);
          gl.uniform1f(gl.getUniformLocation(dotProgram, 'uLaunch'), launchProg);
          gl.uniform1f(gl.getUniformLocation(dotProgram, 'uIntroBandY'), introBandY);
          gl.uniform1f(gl.getUniformLocation(dotProgram, 'uYaw'), st.curYaw);
          gl.uniform1f(gl.getUniformLocation(dotProgram, 'uPitch'), st.curPitch);
          gl.uniform2f(gl.getUniformLocation(dotProgram, 'uCursorPos'), st.curLightX, st.curLightY);
          gl.uniform1f(gl.getUniformLocation(dotProgram, 'uCursorPower'), st.curLightStrength);
          gl.uniform1f(gl.getUniformLocation(dotProgram, 'uSweepY'), sweepY);
          gl.uniform1f(gl.getUniformLocation(dotProgram, 'uRevealActive'), revealActive);

          gl.drawArrays(gl.POINTS, 0, pointCloud.count);
        }

        rafId = window.requestAnimationFrame(render);
      };

      rafId = window.requestAnimationFrame(render);
    })();

    return () => {
      cancelled = true;
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('resize', resize);
    };
  }, [portraitUrl, reducedMotion]);

  const ringCircumference = 2 * Math.PI * 52;
  const ringOffset = ringCircumference * (1 - loadPct / 100);

  return (
    <div
      className={`fixed inset-0 z-[200] overflow-hidden select-none transition-all duration-700 ${
        curtainOut ? 'opacity-0 scale-[1.03] pointer-events-none' : 'opacity-100 scale-100'
      }`}
      style={{ backgroundColor: '#050507' }}
      aria-label="Portrait in Dots Interactive Opening Stage"
    >
      {/* Massive "SCHOLAR" Anton Background Typography (Grey -> Crimson in sync with Reveal band) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
      >
        <div className="relative w-full text-center">
          {/* Base Grey Vertical-Fade Word */}
          <div
            style={{
              fontFamily: "'Anton', Impact, sans-serif",
              fontSize: 'clamp(5.2rem, 23vw, 25rem)',
              lineHeight: 0.86,
              letterSpacing: '0.02em',
              background:
                'linear-gradient(180deg, rgba(168,168,176,0.34) 0%, rgba(78,78,86,0.14) 62%, rgba(5,5,7,0) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            SCHOLAR
          </div>

          {/* Crimson Reveal Layer Clipped in Exact Sync with 3.6s Sweep */}
          <div
            className="absolute inset-0"
            style={{
              fontFamily: "'Anton', Impact, sans-serif",
              fontSize: 'clamp(5.2rem, 23vw, 25rem)',
              lineHeight: 0.86,
              letterSpacing: '0.02em',
              background:
                'linear-gradient(180deg, rgba(163,9,14,0.92) 0%, rgba(112,7,12,0.36) 66%, rgba(5,5,7,0) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              clipPath: `inset(0 0 ${100 - backdropCrimsonPct}% 0)`,
              transition: 'clip-path 60ms linear',
            }}
          >
            SCHOLAR
          </div>
        </div>

        {/* Subtle Center Silhouette Dimming Behind the Bust */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 26% 48% at 50% 52%, rgba(5,5,7,0.58) 0%, rgba(5,5,7,0) 100%)',
          }}
        />
      </div>

      {/* Main Full-Screen Orthographic WebGL Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      {/* Subtle Film Grain Overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.045] mix-blend-overlay"
        style={{
          backgroundImage:
            'radial-gradient(rgba(255,255,255,0.6) 0.5px, transparent 0.5px)',
          backgroundSize: '3px 3px',
        }}
      />

      {/* Minimalist Preloader Ring (Displays ONLY real loading percentage 0% -> 100%) */}
      {!ready && (
        <div
          className="absolute inset-0 z-20 flex items-center justify-center"
          style={{ backgroundColor: '#050507' }}
        >
          <div className="relative flex h-32 w-32 items-center justify-center">
            <svg className="h-32 w-32 -rotate-90" viewBox="0 0 120 120">
              <circle
                cx="60"
                cy="60"
                r="52"
                fill="none"
                stroke="rgba(163, 9, 14, 0.18)"
                strokeWidth="2.5"
              />
              <circle
                cx="60"
                cy="60"
                r="52"
                fill="none"
                stroke="#a3090e"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray={ringCircumference}
                strokeDashoffset={ringOffset}
                style={{ transition: 'stroke-dashoffset 120ms ease-out' }}
              />
            </svg>
            <span
              className="absolute font-mono text-sm tracking-widest"
              style={{ color: '#e5e5e7' }}
            >
              {loadPct}%
            </span>
          </div>
        </div>
      )}

      {/* Discreet Corner Upload Portrait Control (Syncs directly with Studio Admin & Firestore) */}
      {ready && (
        <div className="absolute top-5 right-5 z-20 flex items-center gap-2">
          <label
            title="Upload a portrait photo to map 3D dots directly onto it"
            className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] font-medium tracking-wide transition hover:bg-white/10 cursor-pointer backdrop-blur-md"
            style={{
              borderColor: 'rgba(255,255,255,0.14)',
              backgroundColor: 'rgba(10,10,14,0.55)',
              color: 'rgba(240,240,245,0.78)',
            }}
          >
            <Upload className="h-3 w-3" />
            <span>Upload Portrait</span>
            <input
              type="file"
              accept="image/*"
              onChange={onUploadPortrait}
              className="hidden"
            />
          </label>
        </div>
      )}

      {/* Minimalist Bottom Controls: Single "Reveal" / "Back to dots" + "Enter Portfolio" */}
      {ready && (
        <div className="absolute inset-x-0 bottom-7 z-20 flex flex-col items-center gap-3 px-4">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={handleToggleReveal}
              disabled={revealState === 'revealing' || revealState === 'reversing'}
              className="rounded-full border px-7 py-2.5 text-xs font-medium uppercase tracking-[0.2em] transition-all duration-300 cursor-pointer hover:scale-[1.03] disabled:opacity-50"
              style={{
                borderColor:
                  revealState === 'revealed'
                    ? 'rgba(255,255,255,0.28)'
                    : 'rgba(163, 9, 14, 0.78)',
                backgroundColor:
                  revealState === 'revealed'
                    ? 'rgba(12, 12, 16, 0.72)'
                    : 'rgba(163, 9, 14, 0.18)',
                color: '#f5f5f7',
                backdropFilter: 'blur(10px)',
              }}
            >
              {revealState === 'revealed' ? 'Back to dots' : 'Reveal'}
            </button>

            <button
              type="button"
              onClick={triggerEnterPortfolio}
              className="inline-flex items-center gap-2 rounded-full border px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] transition-all duration-300 cursor-pointer hover:scale-[1.03]"
              style={{
                borderColor:
                  revealState === 'revealed'
                    ? '#a3090e'
                    : 'rgba(255,255,255,0.16)',
                backgroundColor:
                  revealState === 'revealed'
                    ? '#a3090e'
                    : 'rgba(12, 12, 16, 0.52)',
                color: '#ffffff',
                backdropFilter: 'blur(10px)',
              }}
            >
              <span>Enter Portfolio</span>
              <ChevronDown className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ============================================================================
   10. MAIN APPLICATION COMPONENT (DEFAULT EXPORT: App)
   ============================================================================ */
export default function App() {
  // --- Opening Stage State ("Portrait in Dots" -> Main Portfolio) ---
  const [showIntro, setShowIntro] = useState(true);

  // --- Auth & Cloud Sync State ---
  const [user, setUser] = useState(null);
  const [cloudStatus, setCloudStatus] = useState(db ? 'connecting' : 'local');

  // --- Chromatic Universe Theme State ---
  const [theme, setTheme] = useState(CHROMATIC_PRESETS[0]);
  const [chromaticOpen, setChromaticOpen] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  // --- Live Full-Stack Data State ---
  const [profile, setProfile] = useState(INITIAL_PROFILE);
  const [customWorks, setCustomWorks] = useState([]);
  const [endorsements, setEndorsements] = useState({});
  const [userEndorsedIds, setUserEndorsedIds] = useState([]);
  const [bookmarkedIds, setBookmarkedIds] = useState([]);
  const [galleryPhotos, setGalleryPhotos] = useState([]);
  const [inquiries, setInquiries] = useState([]);

  // --- UI & Navigation State ---
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedDomain, setSelectedDomain] = useState(null);
  const [showBookmarkedOnly, setShowBookmarkedOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // --- Modals & Drawers ---
  const [activeWorkModal, setActiveWorkModal] = useState(null);
  const [citationFormat, setCitationFormat] = useState('APA');
  const [lightboxItem, setLightboxItem] = useState(null);
  const [cmdOpen, setCmdOpen] = useState(false);
  const [cmdQuery, setCmdQuery] = useState('');
  const [studioOpen, setStudioOpen] = useState(false);
  const [studioTab, setStudioTab] = useState('photos'); // photos | works | profile | inbox | settings
  const [toast, setToast] = useState(null);

  // --- Web3Forms Live Access Key State ---
  const [web3formsKey, setWeb3formsKey] = useState(DEFAULT_WEB3FORMS_ACCESS_KEY);
  const [web3formsKeyInput, setWeb3formsKeyInput] = useState(
    DEFAULT_WEB3FORMS_ACCESS_KEY === 'YOUR_WEB3FORMS_ACCESS_KEY' ? '' : DEFAULT_WEB3FORMS_ACCESS_KEY
  );

  // --- Contact & Speaking Portal Form ---
  const [inquiryForm, setInquiryForm] = useState({
    name: '',
    affiliation: '',
    email: '',
    type: 'Speaking Invitation',
    proposedDate: '',
    message: '',
    isPublicGuestbook: false,
    botcheck: false,
  });
  const [submittingInquiry, setSubmittingInquiry] = useState(false);
  const [inquiryStatus, setInquiryStatus] = useState(null); // { type: 'success' | 'info' | 'warning', text: string }

  // --- Studio Admin Form States ---
  const [photoForm, setPhotoForm] = useState({
    title: '',
    caption: '',
    category: 'Keynote & Talks',
    year: '2026',
    imageUrl: '',
  });
  const [newWorkForm, setNewWorkForm] = useState({
    title: '',
    category: 'Publications',
    year: '2026',
    venue: '',
    authors: 'Mithula Thomas',
    badge: 'New Publication',
    summary: '',
    url: '',
    domains: ['Digital Humanities'],
  });
  const [profileEditForm, setProfileEditForm] = useState({
    role: INITIAL_PROFILE.role,
    institution: INITIAL_PROFILE.institution,
    bio: INITIAL_PROFILE.bio,
    portraitUrl: '',
  });
  const [uploadingPhoto, setUploadingPhoto] = useState(false);

  const toastTimerRef = useRef(null);
  const showToast = useCallback((msg) => {
    setToast(msg);
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => setToast(null), 2800);
  }, []);

  /* --------------------------------------------------------------------------
     INJECT GOOGLE FONTS & REDUCED MOTION PREFERENCE
     -------------------------------------------------------------------------- */
  useEffect(() => {
    const linkId = 'mithula-google-fonts';
    if (!document.getElementById(linkId)) {
      const link = document.createElement('link');
      link.id = linkId;
      link.rel = 'stylesheet';
      link.href =
        'https://fonts.googleapis.com/css2?family=Anton&family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500;1,600&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Playfair+Display:ital,wght@0,600;0,700;1,500&display=swap';
      document.head.appendChild(link);
    }

    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setReducedMotion(true);
    }
  }, []);

  /* --------------------------------------------------------------------------
     SCROLL PROGRESS BAR TRACKER
     -------------------------------------------------------------------------- */
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(h > 0 ? clamp((window.scrollY / h) * 100, 0, 100) : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* --------------------------------------------------------------------------
     GLOBAL KEYBOARD SHORTCUTS (Ctrl+K / Cmd+K & Escape)
     -------------------------------------------------------------------------- */
  useEffect(() => {
    const onKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCmdOpen((prev) => !prev);
      } else if (e.key === 'Escape') {
        setCmdOpen(false);
        setActiveWorkModal(null);
        setLightboxItem(null);
        setChromaticOpen(false);
        setStudioOpen(false);
        setMobileNavOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  /* --------------------------------------------------------------------------
     FIREBASE AUTHENTICATION (FIRST useEffect — MANDATORY RULE 3)
     -------------------------------------------------------------------------- */
  useEffect(() => {
    if (!auth) {
      setCloudStatus('local');
      return;
    }

    const initAuth = async () => {
      try {
        await signInAnonymously(auth);
      } catch (err) {
        console.error('Firebase Auth error:', err);
        setCloudStatus('local');
      }
    };

    initAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setCloudStatus('connected');
      }
    });
    return () => unsubscribe();
  }, []);

  /* --------------------------------------------------------------------------
     FIREBASE REAL-TIME FIRESTORE SUBSCRIPTIONS (SECOND useEffect — RULE 1, 2, 3)
     -------------------------------------------------------------------------- */
  useEffect(() => {
    if (!user || !db) return;

    const unsubs = [];

    // 1. Live Site Config (Theme & Editable Profile)
    const configRef = collection(db, 'artifacts', appId, 'public', 'data', 'site_config');
    unsubs.push(
      onSnapshot(
        configRef,
        (snap) => {
          snap.forEach((docSnap) => {
            const data = docSnap.data();
            if (docSnap.id === 'theme' && data && typeof data.hue === 'number') {
              setTheme((prev) => ({ ...prev, ...data }));
            }
            if (docSnap.id === 'profile' && data) {
              setProfile((prev) => ({ ...prev, ...data }));
              setProfileEditForm((prev) => ({
                role: data.role || prev.role,
                institution: data.institution || prev.institution,
                bio: data.bio || prev.bio,
                portraitUrl: data.portraitUrl !== undefined ? data.portraitUrl : prev.portraitUrl,
              }));
            }
            if (docSnap.id === 'email_settings' && data && typeof data.web3formsKey === 'string') {
              const savedKey = data.web3formsKey.trim();
              setWeb3formsKey(savedKey || DEFAULT_WEB3FORMS_ACCESS_KEY);
              setWeb3formsKeyInput(
                savedKey === 'YOUR_WEB3FORMS_ACCESS_KEY' ? '' : savedKey
              );
            }
          });
        },
        (err) => console.error('site_config listener error:', err)
      )
    );

    // 2. Custom CMS Works
    const worksRef = collection(db, 'artifacts', appId, 'public', 'data', 'custom_works');
    unsubs.push(
      onSnapshot(
        worksRef,
        (snap) => {
          const loaded = [];
          snap.forEach((d) => loaded.push({ id: d.id, isCustom: true, ...d.data() }));
          loaded.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
          setCustomWorks(loaded);
        },
        (err) => console.error('custom_works listener error:', err)
      )
    );

    // 3. Research Endorsements
    const endorseRef = collection(db, 'artifacts', appId, 'public', 'data', 'endorsements');
    unsubs.push(
      onSnapshot(
        endorseRef,
        (snap) => {
          const map = {};
          snap.forEach((d) => {
            map[d.id] = d.data()?.count || 0;
          });
          setEndorsements(map);
        },
        (err) => console.error('endorsements listener error:', err)
      )
    );

    // 4. Live Photo Gallery
    const galleryRef = collection(db, 'artifacts', appId, 'public', 'data', 'gallery_photos');
    unsubs.push(
      onSnapshot(
        galleryRef,
        (snap) => {
          const items = [];
          snap.forEach((d) => items.push({ id: d.id, ...d.data() }));
          items.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
          setGalleryPhotos(items);
        },
        (err) => console.error('gallery_photos listener error:', err)
      )
    );

    // 5. Inquiries & Academic Guestbook
    const inquiriesRef = collection(db, 'artifacts', appId, 'public', 'data', 'inquiries');
    unsubs.push(
      onSnapshot(
        inquiriesRef,
        (snap) => {
          const items = [];
          snap.forEach((d) => items.push({ id: d.id, ...d.data() }));
          items.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
          setInquiries(items);
        },
        (err) => console.error('inquiries listener error:', err)
      )
    );

    return () => unsubs.forEach((fn) => fn && fn());
  }, [user]);

  /* --------------------------------------------------------------------------
     COMPUTED CHROMATIC TOKENS & MERGED WORKS
     -------------------------------------------------------------------------- */
  const tokens = useMemo(() => computeChromaticTokens(theme), [theme]);

  const allWorks = useMemo(() => {
    const merged = [...customWorks, ...SEED_WORKS];
    return merged.sort((a, b) => (b.dateSort || 202600) - (a.dateSort || 202600));
  }, [customWorks]);

  const categories = ['All', 'Publications', 'Talks & Keynotes', 'Conferences', 'Curriculum'];

  const filteredWorks = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return allWorks.filter((w) => {
      const catOk = activeCategory === 'All' || w.category === activeCategory;
      const domOk = !selectedDomain || (w.domains || []).includes(selectedDomain);
      const bmOk = !showBookmarkedOnly || bookmarkedIds.includes(w.id);
      const qOk =
        !q ||
        w.title.toLowerCase().includes(q) ||
        w.venue.toLowerCase().includes(q) ||
        String(w.year).toLowerCase().includes(q) ||
        (w.summary || '').toLowerCase().includes(q) ||
        (w.domains || []).some((d) => d.toLowerCase().includes(q));
      return catOk && domOk && bmOk && qOk;
    });
  }, [allWorks, activeCategory, selectedDomain, showBookmarkedOnly, bookmarkedIds, searchQuery]);

  const publicGuestbook = useMemo(
    () => inquiries.filter((inq) => inq.isPublicGuestbook),
    [inquiries]
  );

  const displayedGallery = useMemo(() => {
    return [...galleryPhotos, ...DEFAULT_GALLERY_ITEMS];
  }, [galleryPhotos]);

  /* --------------------------------------------------------------------------
     CLIPBOARD COPY HELPER (RELIABLE IN IFRAMES)
     -------------------------------------------------------------------------- */
  const copyText = useCallback(
    (text, label) => {
      try {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.setAttribute('readonly', '');
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        showToast(`${label} copied to clipboard`);
      } catch (e) {
        showToast(`Could not copy ${label}`);
      }
    },
    [showToast]
  );

  /* --------------------------------------------------------------------------
     CHROMATIC UNIVERSE ACTIONS (SHUFFLE, SURFACE MODES, AUTO-FIX, SAVE TO CLOUD)
     -------------------------------------------------------------------------- */
  const applySurfaceMode = (mode) => {
    setTheme((prev) => {
      const h = prev.hue;
      if (mode === 'light') {
        return {
          ...prev,
          surfaceMode: mode,
          bgHex: hslToHex(h, 16, 97),
          inkHex: hslToHex(h, 14, 12),
          light: clamp(prev.light, 28, 48),
        };
      }
      if (mode === 'dark') {
        return {
          ...prev,
          surfaceMode: mode,
          bgHex: hslToHex(h, 22, 9),
          inkHex: hslToHex(h, 12, 94),
          light: clamp(prev.light, 56, 74),
        };
      }
      if (mode === 'oled') {
        return {
          ...prev,
          surfaceMode: mode,
          bgHex: '#050507',
          inkHex: '#F6F5F2',
          light: clamp(prev.light, 56, 76),
        };
      }
      // Tinted surface
      const tintedDark = getRelativeLuminance(prev.bgHex) < 0.35;
      return {
        ...prev,
        surfaceMode: mode,
        bgHex: tintedDark ? hslToHex(h, 34, 11) : hslToHex(h, 32, 95),
        inkHex: tintedDark ? hslToHex(h, 18, 95) : hslToHex(h, 28, 13),
      };
    });
  };

  const shuffleChromaticUniverse = () => {
    const randomHue = Math.floor(Math.random() * 360);
    const randomSat = 48 + Math.floor(Math.random() * 44);
    const modes = ['light', 'dark', 'tinted', 'oled'];
    const randomMode = modes[Math.floor(Math.random() * modes.length)];
    const randomHarmony = HARMONY_MODES[Math.floor(Math.random() * HARMONY_MODES.length)].id;

    let bgHex = '#FAF8F5';
    let inkHex = '#18181B';
    let light = 40;

    if (randomMode === 'light') {
      bgHex = hslToHex(randomHue, 18, 97);
      inkHex = hslToHex(randomHue, 16, 12);
      light = 32 + Math.floor(Math.random() * 16);
    } else if (randomMode === 'dark') {
      bgHex = hslToHex(randomHue, 24, 9);
      inkHex = hslToHex(randomHue, 14, 94);
      light = 58 + Math.floor(Math.random() * 16);
    } else if (randomMode === 'oled') {
      bgHex = '#050608';
      inkHex = '#F5F5F7';
      light = 58 + Math.floor(Math.random() * 18);
    } else {
      const darkTinted = Math.random() > 0.5;
      bgHex = darkTinted ? hslToHex(randomHue, 34, 11) : hslToHex(randomHue, 30, 95);
      inkHex = darkTinted ? hslToHex(randomHue, 18, 95) : hslToHex(randomHue, 26, 13);
      light = darkTinted ? 64 : 38;
    }

    setTheme({
      name: `Universe #${randomHue}°`,
      hue: randomHue,
      sat: randomSat,
      light,
      surfaceMode: randomMode,
      harmony: randomHarmony,
      bgHex,
      inkHex,
    });
    showToast(`Synthesized ${randomHue}° ${randomHarmony} palette`);
  };

  const autoFixContrast = () => {
    const bgLum = getRelativeLuminance(theme.bgHex);
    const fixedInk = bgLum < 0.35 ? '#F7F6F2' : '#141312';
    setTheme((prev) => ({ ...prev, inkHex: fixedInk }));
    showToast('WCAG AAA contrast restored');
  };

  const saveThemeToCloud = async () => {
    if (!db || !user) {
      showToast('Theme applied locally (connect cloud to sync)');
      return;
    }
    try {
      await setDoc(doc(db, 'artifacts', appId, 'public', 'data', 'site_config', 'theme'), {
        ...theme,
        updatedAt: Date.now(),
      });
      showToast('Chromatic Universe saved live to cloud');
    } catch (err) {
      console.error('Save theme error:', err);
      showToast('Unable to save theme right now');
    }
  };

  /* --------------------------------------------------------------------------
     FULL-STACK ACTIONS: ENDORSE, BOOKMARK, PHOTO UPLOAD, CMS, INQUIRIES
     -------------------------------------------------------------------------- */
  const handleEndorse = async (workId) => {
    const already = userEndorsedIds.includes(workId);
    if (already) {
      showToast('Already endorsed this work');
      return;
    }
    setUserEndorsedIds((prev) => [...prev, workId]);
    setEndorsements((prev) => ({ ...prev, [workId]: (prev[workId] || 0) + 1 }));

    if (db && user) {
      try {
        await setDoc(
          doc(db, 'artifacts', appId, 'public', 'data', 'endorsements', workId),
          { count: increment(1), updatedAt: Date.now() },
          { merge: true }
        );
      } catch (err) {
        console.error('Endorse error:', err);
      }
    }
    showToast('Endorsement recorded');
  };

  const handleBookmark = (workId) => {
    setBookmarkedIds((prev) => {
      const exists = prev.includes(workId);
      showToast(exists ? 'Removed from reading list' : 'Saved to reading list');
      return exists ? prev.filter((id) => id !== workId) : [...prev, workId];
    });
  };

  const handlePortraitFileSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingPhoto(true);
    try {
      const compressed = await compressImageFile(file, 640, 0.78);
      setProfileEditForm((prev) => ({ ...prev, portraitUrl: compressed }));
      setProfile((prev) => ({ ...prev, portraitUrl: compressed }));
      if (db && user) {
        await setDoc(
          doc(db, 'artifacts', appId, 'public', 'data', 'site_config', 'profile'),
          { portraitUrl: compressed, updatedAt: Date.now() },
          { merge: true }
        );
      }
      showToast('Portrait updated & saved');
    } catch (err) {
      showToast('Could not process portrait image');
    } finally {
      setUploadingPhoto(false);
    }
  };

  const handleGalleryFileSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingPhoto(true);
    try {
      const compressed = await compressImageFile(file, 760, 0.74);
      setPhotoForm((prev) => ({ ...prev, imageUrl: compressed }));
      showToast('Image compressed & ready to publish');
    } catch (err) {
      showToast('Could not compress image');
    } finally {
      setUploadingPhoto(false);
    }
  };

  const handleAddGalleryPhoto = async (e) => {
    e.preventDefault();
    if (!photoForm.title.trim() || !photoForm.imageUrl.trim()) {
      showToast('Please provide a title and upload or paste an image URL');
      return;
    }
    const payload = {
      title: photoForm.title.trim(),
      caption: photoForm.caption.trim() || 'Academic & research highlight',
      category: photoForm.category,
      year: photoForm.year || '2026',
      imageUrl: photoForm.imageUrl.trim(),
      createdAt: Date.now(),
    };

    if (db && user) {
      try {
        await addDoc(collection(db, 'artifacts', appId, 'public', 'data', 'gallery_photos'), payload);
        showToast('Photo published to live gallery');
      } catch (err) {
        console.error('Add photo error:', err);
        showToast('Could not publish photo');
      }
    } else {
      setGalleryPhotos((prev) => [{ id: `local-${Date.now()}`, ...payload }, ...prev]);
      showToast('Photo added locally');
    }
    setPhotoForm({ title: '', caption: '', category: 'Keynote & Talks', year: '2026', imageUrl: '' });
  };

  const handleDeleteGalleryPhoto = async (id) => {
    if (db && user && !String(id).startsWith('local-')) {
      try {
        await deleteDoc(doc(db, 'artifacts', appId, 'public', 'data', 'gallery_photos', id));
        showToast('Photo removed from gallery');
      } catch (err) {
        console.error('Delete photo error:', err);
      }
    } else {
      setGalleryPhotos((prev) => prev.filter((p) => p.id !== id));
      showToast('Photo removed');
    }
  };

  const handleAddCustomWork = async (e) => {
    e.preventDefault();
    if (!newWorkForm.title.trim() || !newWorkForm.venue.trim()) {
      showToast('Please enter a title and venue');
      return;
    }
    const yearNum = parseInt(String(newWorkForm.year).slice(0, 4), 10) || 2026;
    const payload = {
      title: newWorkForm.title.trim(),
      category: newWorkForm.category,
      year: newWorkForm.year.trim() || '2026',
      dateSort: yearNum * 100 + 12,
      venue: newWorkForm.venue.trim(),
      authors: newWorkForm.authors.trim() || 'Mithula Thomas',
      badge: newWorkForm.badge.trim() || newWorkForm.category,
      summary: newWorkForm.summary.trim() || 'Published academic contribution.',
      url: newWorkForm.url.trim(),
      domains: newWorkForm.domains.length ? newWorkForm.domains : ['Digital Humanities'],
      createdAt: Date.now(),
    };

    if (db && user) {
      try {
        await addDoc(collection(db, 'artifacts', appId, 'public', 'data', 'custom_works'), payload);
        showToast('Academic entry published to cloud archive');
      } catch (err) {
        console.error('Add work error:', err);
        showToast('Could not publish entry');
      }
    } else {
      setCustomWorks((prev) => [{ id: `local-work-${Date.now()}`, isCustom: true, ...payload }, ...prev]);
      showToast('Academic entry added locally');
    }

    setNewWorkForm({
      title: '',
      category: 'Publications',
      year: '2026',
      venue: '',
      authors: 'Mithula Thomas',
      badge: 'New Publication',
      summary: '',
      url: '',
      domains: ['Digital Humanities'],
    });
  };

  const handleDeleteCustomWork = async (id) => {
    if (db && user && !String(id).startsWith('local-')) {
      try {
        await deleteDoc(doc(db, 'artifacts', appId, 'public', 'data', 'custom_works', id));
        showToast('Entry removed from archive');
      } catch (err) {
        console.error('Delete work error:', err);
      }
    } else {
      setCustomWorks((prev) => prev.filter((w) => w.id !== id));
      showToast('Entry removed');
    }
  };

  const handleSaveProfileEdit = async (e) => {
    e.preventDefault();
    const updated = {
      role: profileEditForm.role.trim() || INITIAL_PROFILE.role,
      institution: profileEditForm.institution.trim() || INITIAL_PROFILE.institution,
      bio: profileEditForm.bio.trim() || INITIAL_PROFILE.bio,
      portraitUrl: profileEditForm.portraitUrl.trim(),
      updatedAt: Date.now(),
    };
    setProfile((prev) => ({ ...prev, ...updated }));

    if (db && user) {
      try {
        await setDoc(
          doc(db, 'artifacts', appId, 'public', 'data', 'site_config', 'profile'),
          updated,
          { merge: true }
        );
        showToast('Profile saved live to cloud');
      } catch (err) {
        console.error('Save profile error:', err);
        showToast('Could not save profile to cloud');
      }
    } else {
      showToast('Profile updated locally');
    }
  };

  const handleSaveWeb3FormsKey = async (e) => {
    e.preventDefault();
    const cleaned = web3formsKeyInput.trim();
    const effective = cleaned || DEFAULT_WEB3FORMS_ACCESS_KEY;
    setWeb3formsKey(effective);

    if (db && user) {
      try {
        await setDoc(
          doc(db, 'artifacts', appId, 'public', 'data', 'site_config', 'email_settings'),
          { web3formsKey: cleaned, updatedAt: Date.now() },
          { merge: true }
        );
        showToast(
          cleaned
            ? 'Web3Forms Access Key saved live to cloud'
            : 'Web3Forms Access Key cleared'
        );
      } catch (err) {
        console.error('Save Web3Forms key error:', err);
        showToast('Could not save Web3Forms key to cloud');
      }
    } else {
      showToast('Web3Forms Access Key updated for this session');
    }
  };

  const handleSubmitInquiry = async (e) => {
    e.preventDefault();
    // Honeypot spam guard
    if (inquiryForm.botcheck) {
      return;
    }
    if (!inquiryForm.name.trim() || !inquiryForm.message.trim()) {
      showToast('Please enter your name and message');
      return;
    }
    setSubmittingInquiry(true);
    setInquiryStatus(null);

    const activeKey = (web3formsKey || '').trim();
    const hasValidKey = Boolean(activeKey && activeKey !== 'YOUR_WEB3FORMS_ACCESS_KEY');

    let emailStatus = 'studio_only';

    if (hasValidKey) {
      try {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            access_key: activeKey,
            subject: `Academic Invitation: ${inquiryForm.type} — ${inquiryForm.name.trim()}`,
            from_name: 'Dr. Mithula Thomas Portfolio',
            replyto: inquiryForm.email.trim() || undefined,
            botcheck: inquiryForm.botcheck,
            Name: inquiryForm.name.trim(),
            Email: inquiryForm.email.trim() || 'Not provided',
            Institution: inquiryForm.affiliation.trim() || 'Academic Visitor',
            'Event Type': inquiryForm.type,
            'Proposed Date': inquiryForm.proposedDate.trim() || 'Flexible / Not specified',
            Message: inquiryForm.message.trim(),
          }),
        });
        const result = await response.json();
        if (response.ok && result.success) {
          emailStatus = 'emailed';
        } else {
          emailStatus = 'failed';
        }
      } catch (err) {
        console.error('Web3Forms submission error:', err);
        emailStatus = 'failed';
      }
    }

    const payload = {
      name: inquiryForm.name.trim(),
      affiliation: inquiryForm.affiliation.trim() || 'Academic Visitor',
      email: inquiryForm.email.trim(),
      type: inquiryForm.type,
      proposedDate: inquiryForm.proposedDate.trim(),
      message: inquiryForm.message.trim(),
      isPublicGuestbook: inquiryForm.isPublicGuestbook,
      emailStatus,
      createdAt: Date.now(),
    };

    if (db && user) {
      try {
        await addDoc(collection(db, 'artifacts', appId, 'public', 'data', 'inquiries'), payload);
      } catch (err) {
        console.error('Inquiry submit error:', err);
      }
    } else {
      setInquiries((prev) => [{ id: `local-inq-${Date.now()}`, ...payload }, ...prev]);
    }

    if (emailStatus === 'emailed') {
      const msg = 'Invitation emailed directly to mithula.thomas@gmail.com and logged in Studio.';
      setInquiryStatus({ type: 'success', text: msg });
      showToast('Invitation emailed & saved!');
    } else if (emailStatus === 'studio_only') {
      const msg =
        'Invitation saved to Studio Admin. Add your free Web3Forms Access Key in Studio → Settings (or in code) to enable direct Gmail delivery.';
      setInquiryStatus({ type: 'info', text: msg });
      showToast('Saved to Studio Admin');
    } else {
      const msg =
        'Saved to Studio Admin, but email delivery failed. Please check your Web3Forms Access Key.';
      setInquiryStatus({ type: 'warning', text: msg });
      showToast('Saved to Studio, but email failed');
    }

    setInquiryForm({
      name: '',
      affiliation: '',
      email: '',
      type: 'Speaking Invitation',
      proposedDate: '',
      message: '',
      isPublicGuestbook: false,
      botcheck: false,
    });
    setSubmittingInquiry(false);
  };

  /* --------------------------------------------------------------------------
     COMMAND PALETTE RESULTS
     -------------------------------------------------------------------------- */
  const commandResults = useMemo(() => {
    const q = cmdQuery.trim().toLowerCase();
    const sections = [
      { id: 'sec-about', label: 'Jump to Hero & Bio', hint: '#about', action: () => scrollToId('about') },
      { id: 'sec-graph', label: 'Jump to Research Knowledge Graph', hint: '#graph', action: () => scrollToId('graph') },
      { id: 'sec-works', label: 'Jump to Research Archive (26+ Works)', hint: '#works', action: () => scrollToId('works') },
      { id: 'sec-gallery', label: 'Jump to Academic & Keynote Gallery', hint: '#gallery', action: () => scrollToId('gallery') },
      { id: 'sec-career', label: 'Jump to Appointments & Education', hint: '#career', action: () => scrollToId('career') },
      { id: 'sec-contact', label: 'Jump to Speaking Portal & Guestbook', hint: '#contact', action: () => scrollToId('contact') },
      { id: 'act-chroma', label: 'Open Chromatic Universe Studio', hint: 'Color Engine', action: () => setChromaticOpen(true) },
      { id: 'act-shuffle', label: 'Infinite Universe Shuffle (Random Theme)', hint: '360° Spectrum', action: shuffleChromaticUniverse },
      { id: 'act-studio', label: 'Open Photo & CMS Studio Admin', hint: 'Full-Stack CMS', action: () => setStudioOpen(true) },
      { id: 'act-intro', label: 'Replay "Portrait in Dots" WebGL Intro', hint: 'Opening Stage', action: () => setShowIntro(true) },
    ];

    const presetCmds = CHROMATIC_PRESETS.map((p) => ({
      id: `preset-${p.name}`,
      label: `Theme Preset: ${p.name}`,
      hint: `${p.hue}° ${p.surfaceMode}`,
      action: () => {
        setTheme(p);
        showToast(`Switched to ${p.name}`);
      },
    }));

    const workCmds = allWorks.map((w) => ({
      id: `work-${w.id}`,
      label: w.title,
      hint: `${w.category} · ${w.year}`,
      action: () => setActiveWorkModal(w),
    }));

    const allCmds = [...sections, ...presetCmds, ...workCmds];
    if (!q) return allCmds.slice(0, 12);
    return allCmds.filter(
      (c) => c.label.toLowerCase().includes(q) || c.hint.toLowerCase().includes(q)
    ).slice(0, 14);
  }, [cmdQuery, allWorks, showToast]);

  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
  };

  /* --------------------------------------------------------------------------
     ROOT CSS CUSTOM PROPERTIES
     -------------------------------------------------------------------------- */
  const rootStyle = {
    '--bg': tokens.bg,
    '--surface': tokens.surface,
    '--surface-2': tokens.surface2,
    '--ink': tokens.ink,
    '--muted': tokens.muted,
    '--accent': tokens.accent,
    '--accent-2': tokens.accent2,
    '--accent-3': tokens.accent3,
    '--accent-soft': tokens.accentSoft,
    '--accent-border': tokens.accentBorder,
    '--accent-contrast': tokens.accentContrast,
    '--border': tokens.border,
    '--nav-bg': tokens.navBg,
    '--glow': tokens.glow,
    backgroundColor: 'var(--bg)',
    color: 'var(--ink)',
    fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
  };

  const wcagGrade =
    tokens.contrastRatio >= 7 ? 'AAA' : tokens.contrastRatio >= 4.5 ? 'AA' : 'LOW';

  return (
    <div style={rootStyle} className="min-h-screen transition-colors duration-300 selection:bg-[var(--accent)] selection:text-[var(--accent-contrast)]">
      {/* Full-Screen WebGL "Portrait in Dots" Interactive Opening Stage */}
      {showIntro && (
        <PortraitInDotsIntro
          portraitUrl={profile.portraitUrl}
          onUploadPortrait={handlePortraitFileSelect}
          onEnterPortfolio={() => setShowIntro(false)}
          reducedMotion={reducedMotion}
        />
      )}

      {/* Embedded Editorial Typography & Motion Keyframes */}
      <style>{`
        .font-serif { font-family: 'Cormorant Garamond', 'Playfair Display', Georgia, serif; }
        .font-mono { font-family: 'JetBrains Mono', ui-monospace, monospace; }
        @keyframes kineticMarquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track {
          display: flex;
          width: max-content;
          animation: kineticMarquee 36s linear infinite;
        }
        .marquee-paused .marquee-track,
        .marquee-track:hover {
          animation-play-state: paused;
        }
        @keyframes softFadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-up {
          animation: softFadeUp 580ms cubic-bezier(0.16, 1, 0.3, 1) both;
        }
      `}</style>

      {/* Scroll Progress Indicator */}
      <div
        className="fixed top-0 left-0 z-[120] h-[3px] transition-all duration-75"
        style={{
          width: `${scrollProgress}%`,
          background: 'linear-gradient(90deg, var(--accent), var(--accent-2), var(--accent-3))',
        }}
      />

      {/* ====================================================================
          1. STICKY EDITORIAL NAVBAR
          ==================================================================== */}
      <header
        className="sticky top-0 z-[90] border-b backdrop-blur-md transition-colors"
        style={{
          backgroundColor: 'var(--nav-bg)',
          borderColor: 'var(--border)',
        }}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 gap-3">
          <button
            type="button"
            onClick={() => scrollToId('about')}
            className="flex items-center gap-2.5 text-left cursor-pointer"
          >
            <span
              className="flex h-8 w-8 items-center justify-center rounded-full font-serif text-sm font-bold"
              style={{
                backgroundColor: 'var(--accent)',
                color: 'var(--accent-contrast)',
              }}
            >
              MT
            </span>
            <div className="leading-tight">
              <div className="font-serif text-base sm:text-lg font-bold tracking-tight">
                Dr. Mithula Thomas
              </div>
              <div className="hidden sm:block font-mono text-[10px]" style={{ color: 'var(--muted)' }}>
                VIT Vellore · PhD English
              </div>
            </div>
          </button>

          {/* Desktop Links */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Primary navigation">
            {[
              { label: 'Profile', id: 'about' },
              { label: 'Knowledge Graph', id: 'graph' },
              { label: 'Archive', id: 'works' },
              { label: 'Gallery', id: 'gallery' },
              { label: 'Career', id: 'career' },
              { label: 'Connect', id: 'contact' },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToId(item.id)}
                className="rounded-full px-3 py-1.5 text-xs font-medium transition hover:opacity-100 cursor-pointer"
                style={{ color: 'var(--muted)' }}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Power Action Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Replay Portrait in Dots Intro */}
            <button
              type="button"
              onClick={() => setShowIntro(true)}
              title="Replay Portrait in Dots WebGL Intro"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition cursor-pointer hover:opacity-90"
              style={{
                backgroundColor: 'var(--surface)',
                borderColor: 'var(--border)',
                color: 'var(--muted)',
              }}
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span className="hidden xl:inline">Replay Intro</span>
            </button>

            {/* Command Palette Launcher */}
            <button
              type="button"
              onClick={() => setCmdOpen(true)}
              title="Command Palette (Ctrl+K)"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-mono transition cursor-pointer hover:opacity-90"
              style={{
                backgroundColor: 'var(--surface)',
                borderColor: 'var(--border)',
                color: 'var(--muted)',
              }}
            >
              <Command className="h-3.5 w-3.5" />
              <span>⌘K</span>
            </button>

            {/* Chromatic Universe Studio Trigger */}
            <button
              type="button"
              onClick={() => setChromaticOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition cursor-pointer hover:scale-[1.02]"
              style={{
                backgroundColor: 'var(--accent-soft)',
                borderColor: 'var(--accent-border)',
                color: 'var(--accent)',
              }}
            >
              <Palette className="h-3.5 w-3.5" />
              <span className="hidden md:inline">Colors</span>
            </button>

            {/* Studio Admin / Photo CMS Trigger */}
            <button
              type="button"
              onClick={() => setStudioOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition cursor-pointer"
              style={{
                backgroundColor: 'var(--surface)',
                borderColor: 'var(--border)',
                color: 'var(--ink)',
              }}
            >
              <Edit3 className="h-3.5 w-3.5" />
              <span className="hidden md:inline">Studio</span>
            </button>

            {/* Reduce Motion Toggle */}
            <button
              type="button"
              onClick={() => {
                setReducedMotion((prev) => {
                  showToast(!prev ? 'Reduced motion enabled' : 'Animations enabled');
                  return !prev;
                });
              }}
              aria-label="Toggle reduced motion"
              title={reducedMotion ? 'Enable animations' : 'Reduce motion'}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border transition cursor-pointer"
              style={{
                backgroundColor: 'var(--surface)',
                borderColor: 'var(--border)',
                color: reducedMotion ? 'var(--accent)' : 'var(--muted)',
              }}
            >
              {reducedMotion ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
            </button>

            {/* Mobile Hamburger */}
            <button
              type="button"
              onClick={() => setMobileNavOpen((p) => !p)}
              aria-label="Toggle menu"
              className="inline-flex lg:hidden h-8 w-8 items-center justify-center rounded-full border cursor-pointer"
              style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
            >
              {mobileNavOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileNavOpen && (
          <div
            className="lg:hidden border-t px-4 py-3 flex flex-col gap-1"
            style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
          >
            {[
              { label: 'Profile & Bio', id: 'about' },
              { label: 'Research Knowledge Graph', id: 'graph' },
              { label: 'Research Archive (26+)', id: 'works' },
              { label: 'Academic & Keynote Gallery', id: 'gallery' },
              { label: 'Appointments & Education', id: 'career' },
              { label: 'Speaking Portal & Guestbook', id: 'contact' },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  scrollToId(item.id);
                  setMobileNavOpen(false);
                }}
                className="rounded-lg px-3 py-2 text-left text-sm font-medium cursor-pointer"
                style={{ color: 'var(--ink)' }}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* ====================================================================
          2. HERO SECTION WITH CANVAS CONSTELLATION & EDITORIAL PORTRAIT STUDIO
          ==================================================================== */}
      <section id="about" className="relative overflow-hidden border-b" style={{ borderColor: 'var(--border)' }}>
        <NarrativeConstellationCanvas tokens={tokens} reducedMotion={reducedMotion} />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 sm:py-20 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Left Scholarly Identity Column */}
            <div className={`lg:col-span-7 ${reducedMotion ? '' : 'fade-up'}`}>
              <div className="flex flex-wrap items-center gap-2 mb-5">
                <span
                  className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold"
                  style={{
                    backgroundColor: 'var(--accent-soft)',
                    borderColor: 'var(--accent-border)',
                    color: 'var(--accent)',
                  }}
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  {profile.institution}
                </span>
                <span
                  className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px]"
                  style={{
                    backgroundColor: 'var(--surface)',
                    borderColor: 'var(--border)',
                    color: 'var(--muted)',
                  }}
                >
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: cloudStatus === 'connected' ? '#22c55e' : 'var(--accent)' }}
                  />
                  {cloudStatus === 'connected' ? 'Cloud Sync Live' : 'Interactive Studio'}
                </span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08] mb-4">
                {profile.name}
              </h1>

              <p className="text-base sm:text-lg font-medium mb-2" style={{ color: 'var(--accent)' }}>
                {profile.role}
              </p>
              <p className="font-mono text-xs mb-6" style={{ color: 'var(--muted)' }}>
                {profile.department} · {profile.tenure}
              </p>

              <p className="text-sm sm:text-base leading-relaxed mb-7 max-w-2xl" style={{ color: 'var(--muted)' }}>
                {profile.bio}
              </p>

              {/* Verified Quick Links */}
              <div className="flex flex-wrap items-center gap-2.5 mb-8">
                <button
                  type="button"
                  onClick={() => scrollToId('contact')}
                  className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs sm:text-sm font-semibold transition cursor-pointer hover:opacity-90"
                  style={{
                    backgroundColor: 'var(--accent)',
                    color: 'var(--accent-contrast)',
                  }}
                >
                  <Send className="h-4 w-4" />
                  Invite for Keynote / Collaboration
                </button>

                <a
                  href={profile.orcidUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border px-4 py-2.5 text-xs font-medium transition hover:opacity-85"
                  style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
                >
                  ORCID
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>

                <a
                  href={profile.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border px-4 py-2.5 text-xs font-medium transition hover:opacity-85"
                  style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
                >
                  LinkedIn
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>

                <a
                  href={profile.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border px-4 py-2.5 text-xs font-medium transition hover:opacity-85"
                  style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
                >
                  {profile.instagramHandle}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>

                <a
                  href={profile.vitDirectoryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border px-4 py-2.5 text-xs font-medium transition hover:opacity-85"
                  style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
                >
                  VIT Directory
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>

              {/* 6 Interactive Research Interest Nodes */}
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.16em] mb-2.5" style={{ color: 'var(--muted)' }}>
                  Core Research Domains — Click to Explore
                </div>
                <div className="flex flex-wrap gap-2">
                  {RESEARCH_DOMAINS.map((dom) => (
                    <button
                      key={dom.id}
                      type="button"
                      onClick={() => {
                        setSelectedDomain(dom.name);
                        scrollToId('works');
                      }}
                      className="rounded-full border px-3 py-1 text-xs font-medium transition cursor-pointer hover:scale-[1.03]"
                      style={{
                        backgroundColor: selectedDomain === dom.name ? 'var(--accent)' : 'var(--surface)',
                        borderColor: selectedDomain === dom.name ? 'var(--accent)' : 'var(--border)',
                        color: selectedDomain === dom.name ? 'var(--accent-contrast)' : 'var(--ink)',
                      }}
                    >
                      {dom.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Editorial Portrait Frame & Doctoral Monograph Card */}
            <div className="lg:col-span-5 flex flex-col gap-5">
              {/* Editorial Portrait Studio Frame */}
              <div
                className="relative overflow-hidden rounded-3xl border p-4"
                style={{
                  backgroundColor: 'var(--surface)',
                  borderColor: 'var(--border)',
                  boxShadow: '0 24px 48px -24px var(--glow)',
                }}
              >
                <div
                  className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border flex items-center justify-center"
                  style={{
                    backgroundColor: 'var(--surface-2)',
                    borderColor: 'var(--border)',
                  }}
                >
                  {profile.portraitUrl ? (
                    <img
                      src={profile.portraitUrl}
                      alt={profile.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="relative h-full w-full flex flex-col items-center justify-center p-6 text-center">
                      {/* Artistic Literary Monogram Portrait */}
                      <svg
                        viewBox="0 0 360 270"
                        className="absolute inset-0 h-full w-full opacity-55"
                        aria-hidden="true"
                      >
                        <defs>
                          <radialGradient id="portraitAura" cx="50%" cy="45%" r="55%">
                            <stop offset="0%" stopColor={tokens.accent} stopOpacity="0.36" />
                            <stop offset="65%" stopColor={tokens.accent2} stopOpacity="0.14" />
                            <stop offset="100%" stopColor={tokens.surface2} stopOpacity="0" />
                          </radialGradient>
                        </defs>
                        <rect width="360" height="270" fill="url(#portraitAura)" />
                        <circle cx="180" cy="128" r="88" fill="none" stroke={tokens.accent} strokeWidth="1" strokeDasharray="3 5" opacity="0.7" />
                        <circle cx="180" cy="128" r="64" fill="none" stroke={tokens.accent2} strokeWidth="1.2" opacity="0.6" />
                        <path d="M50 220 Q180 165 310 220" fill="none" stroke={tokens.accent} strokeWidth="1" opacity="0.45" />
                      </svg>
                      <div
                        className="relative z-10 flex h-24 w-24 items-center justify-center rounded-full border-2 font-serif text-4xl font-bold shadow-lg mb-3"
                        style={{
                          backgroundColor: 'var(--surface)',
                          borderColor: 'var(--accent)',
                          color: 'var(--accent)',
                        }}
                      >
                        MT
                      </div>
                      <div className="relative z-10 font-serif text-lg font-semibold">
                        Dr. Mithula Thomas, PhD
                      </div>
                      <div className="relative z-10 font-mono text-[11px] mt-0.5" style={{ color: 'var(--muted)' }}>
                        ORCID {profile.orcid}
                      </div>
                    </div>
                  )}

                  {/* Quick Upload Portrait Overlay Button */}
                  <button
                    type="button"
                    onClick={() => {
                      setStudioTab('photos');
                      setStudioOpen(true);
                    }}
                    className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] font-medium backdrop-blur-md transition cursor-pointer hover:scale-105"
                    style={{
                      backgroundColor: 'var(--nav-bg)',
                      borderColor: 'var(--border)',
                      color: 'var(--ink)',
                    }}
                  >
                    <Upload className="h-3 w-3" />
                    {profile.portraitUrl ? 'Change Portrait' : 'Upload Portrait'}
                  </button>
                </div>

                {/* Live Academic Metrics Strip */}
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {[
                    { num: allWorks.filter((w) => w.category === 'Publications').length, label: 'Publications' },
                    { num: allWorks.filter((w) => w.category === 'Talks & Keynotes').length, label: 'Keynotes & Talks' },
                    { num: allWorks.filter((w) => w.category === 'Conferences').length, label: 'Conferences' },
                  ].map((st) => (
                    <div
                      key={st.label}
                      className="rounded-xl border px-2 py-2.5 text-center"
                      style={{ backgroundColor: 'var(--surface-2)', borderColor: 'var(--border)' }}
                    >
                      <div className="font-serif text-2xl font-bold leading-none" style={{ color: 'var(--accent)' }}>
                        {st.num}
                      </div>
                      <div className="mt-1 text-[11px]" style={{ color: 'var(--muted)' }}>
                        {st.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Doctoral Dissertation Callout */}
              <div
                className="rounded-2xl border p-5"
                style={{
                  backgroundColor: 'var(--surface)',
                  borderColor: 'var(--border)',
                  borderLeftWidth: '4px',
                  borderLeftColor: 'var(--accent)',
                }}
              >
                <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest mb-2" style={{ color: 'var(--accent)' }}>
                  <BookOpen className="h-3.5 w-3.5" />
                  Doctoral Dissertation · {profile.dissertation.year}
                </div>
                <h2 className="font-serif text-lg sm:text-xl italic font-semibold leading-snug mb-2">
                  “{profile.dissertation.title}”
                </h2>
                <p className="text-xs leading-relaxed mb-2" style={{ color: 'var(--muted)' }}>
                  {profile.dissertation.summary}
                </p>
                <div className="font-mono text-[11px]" style={{ color: 'var(--muted)' }}>
                  {profile.dissertation.institution} · Guide: {profile.dissertation.guide}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          3. KINETIC MARQUEE OF RESEARCH THEMES & INSTITUTIONS
          ==================================================================== */}
      <div
        className={`overflow-hidden border-b py-3.5 ${reducedMotion ? 'marquee-paused' : ''}`}
        style={{
          backgroundColor: 'var(--surface)',
          borderColor: 'var(--border)',
        }}
        aria-hidden="true"
      >
        <div className="marquee-track items-center gap-8 font-mono text-xs uppercase tracking-[0.18em]">
          {[...Array(2)].map((_, idx) => (
            <div key={idx} className="flex items-center gap-8 pr-8">
              {[
                'Trauma Studies',
                'Digital Humanities',
                'VIT University Vellore',
                'Feminist Theory & Gender Studies',
                'South Indian & Malayalam Cinema',
                'AI & Language',
                'Posthuman Agency',
                'University of Calicut PhD',
                'Algorithmic Narratives',
                'UGC CARE Scholarship',
              ].map((item) => (
                <span key={`${idx}-${item}`} className="flex items-center gap-8 whitespace-nowrap" style={{ color: 'var(--muted)' }}>
                  <span>{item}</span>
                  <span style={{ color: 'var(--accent)' }}>✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ====================================================================
          4. INTERACTIVE RESEARCH KNOWLEDGE GRAPH SECTION
          ==================================================================== */}
      <section id="graph" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <ResearchKnowledgeGraph
          works={allWorks}
          selectedDomain={selectedDomain}
          onSelectDomain={(dom) => {
            setSelectedDomain(dom);
            if (dom) showToast(`Filtered archive by ${dom}`);
          }}
          onOpenWork={(w) => setActiveWorkModal(w)}
          tokens={tokens}
        />
      </section>

      {/* ====================================================================
          5. RESEARCH, PUBLICATIONS & ACADEMIC WORKS ARCHIVE (26+ SEEDED + CMS)
          ==================================================================== */}
      <section
        id="works"
        className="border-t py-14 sm:py-20"
        style={{ borderColor: 'var(--border)' }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.16em]" style={{ color: 'var(--accent)' }}>
                Scholarly Archive · {allWorks.length} Indexed Works
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold mt-1 mb-2">
                Research, Keynotes, Conferences &amp; Curriculum
              </h2>
              <p className="text-sm max-w-2xl" style={{ color: 'var(--muted)' }}>
                Click any card to generate instant APA, MLA, Chicago, or BibTeX citations. Endorse works live in cloud storage or curate your reading list.
              </p>
            </div>

            {/* Search Box */}
            <div className="relative w-full lg:w-80">
              <Search
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4"
                style={{ color: 'var(--muted)' }}
              />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search title, venue, year, theme..."
                className="w-full rounded-full border py-2.5 pl-10 pr-9 text-sm focus:outline-none"
                style={{
                  backgroundColor: 'var(--surface)',
                  borderColor: 'var(--border)',
                  color: 'var(--ink)',
                }}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                  style={{ color: 'var(--muted)' }}
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          {/* Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-7">
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => {
                const count = allWorks.filter(
                  (w) =>
                    (cat === 'All' || w.category === cat) &&
                    (!selectedDomain || (w.domains || []).includes(selectedDomain))
                ).length;
                const active = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveCategory(cat)}
                    className="inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition cursor-pointer"
                    style={{
                      backgroundColor: active ? 'var(--accent)' : 'var(--surface)',
                      borderColor: active ? 'var(--accent)' : 'var(--border)',
                      color: active ? 'var(--accent-contrast)' : 'var(--ink)',
                    }}
                  >
                    <span>{cat}</span>
                    <span
                      className="rounded-full px-1.5 py-0.5 font-mono text-[10px]"
                      style={{
                        backgroundColor: active ? 'rgba(255,255,255,0.22)' : 'var(--surface-2)',
                      }}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}

              <button
                type="button"
                onClick={() => setShowBookmarkedOnly((p) => !p)}
                className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition cursor-pointer"
                style={{
                  backgroundColor: showBookmarkedOnly ? 'var(--accent-soft)' : 'var(--surface)',
                  borderColor: showBookmarkedOnly ? 'var(--accent)' : 'var(--border)',
                  color: showBookmarkedOnly ? 'var(--accent)' : 'var(--muted)',
                }}
              >
                <Bookmark className="h-3.5 w-3.5" />
                Saved ({bookmarkedIds.length})
              </button>
            </div>

            <div className="flex items-center gap-3 font-mono text-xs" style={{ color: 'var(--muted)' }}>
              {selectedDomain && (
                <button
                  type="button"
                  onClick={() => setSelectedDomain(null)}
                  className="inline-flex items-center gap-1 rounded-full border px-2.5 py-1 cursor-pointer"
                  style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}
                >
                  {selectedDomain} <X className="h-3 w-3" />
                </button>
              )}
              <span>Showing {filteredWorks.length} entries</span>
            </div>
          </div>

          {/* 3D Spotlight Works Grid */}
          {filteredWorks.length === 0 ? (
            <div
              className="rounded-2xl border border-dashed p-12 text-center"
              style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
            >
              <p className="font-serif text-xl font-semibold mb-1">No matching academic works found</p>
              <p className="text-xs mb-4" style={{ color: 'var(--muted)' }}>
                Adjust your keyword search, domain filter, or bookmark toggle.
              </p>
              <button
                type="button"
                onClick={() => {
                  setActiveCategory('All');
                  setSelectedDomain(null);
                  setShowBookmarkedOnly(false);
                  setSearchQuery('');
                }}
                className="rounded-full px-4 py-2 text-xs font-semibold cursor-pointer"
                style={{ backgroundColor: 'var(--accent)', color: 'var(--accent-contrast)' }}
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredWorks.map((work) => (
                <TiltWorkCard
                  key={work.id}
                  work={work}
                  endorseCount={endorsements[work.id] || 0}
                  isEndorsed={userEndorsedIds.includes(work.id)}
                  isBookmarked={bookmarkedIds.includes(work.id)}
                  onEndorse={handleEndorse}
                  onBookmark={handleBookmark}
                  onOpen={(w) => {
                    setCitationFormat('APA');
                    setActiveWorkModal(w);
                  }}
                  reducedMotion={reducedMotion}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ====================================================================
          6. ACADEMIC & KEYNOTE PHOTO GALLERY (LIVE FIRESTORE + LIGHTBOX)
          ==================================================================== */}
      <section
        id="gallery"
        className="border-t py-14 sm:py-20"
        style={{ borderColor: 'var(--border)' }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.16em]" style={{ color: 'var(--accent)' }}>
                Visual &amp; Keynote Chronicle
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold mt-1">
                Academic &amp; Keynote Gallery
              </h2>
              <p className="text-sm mt-1 max-w-2xl" style={{ color: 'var(--muted)' }}>
                Curated visual records of keynotes, faculty symposia, and research milestones. Upload Dr. Mithula Thomas’s photographs directly to cloud storage at any time.
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                setStudioTab('photos');
                setStudioOpen(true);
              }}
              className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold transition cursor-pointer hover:opacity-90"
              style={{
                backgroundColor: 'var(--accent-soft)',
                borderColor: 'var(--accent-border)',
                color: 'var(--accent)',
              }}
            >
              <ImageIcon className="h-4 w-4" />
              Upload / Manage Photos
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {displayedGallery.map((item) => (
              <div
                key={item.id}
                onClick={() => setLightboxItem(item)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setLightboxItem(item);
                  }
                }}
                className="group overflow-hidden rounded-2xl border cursor-pointer transition-all duration-300 hover:-translate-y-1"
                style={{
                  backgroundColor: 'var(--surface)',
                  borderColor: 'var(--border)',
                }}
              >
                <div className="relative aspect-[16/11] w-full overflow-hidden">
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <EditorialArtFrame styleType={item.artStyle || 'keynote'} tokens={tokens} />
                  )}
                  <div
                    className="absolute top-2.5 left-2.5 rounded-full px-2.5 py-0.5 font-mono text-[10px] backdrop-blur-md"
                    style={{
                      backgroundColor: 'var(--nav-bg)',
                      color: 'var(--ink)',
                    }}
                  >
                    {item.category} · {item.year}
                  </div>
                  <div
                    className="absolute bottom-2.5 right-2.5 flex h-7 w-7 items-center justify-center rounded-full opacity-0 transition-opacity group-hover:opacity-100"
                    style={{
                      backgroundColor: 'var(--accent)',
                      color: 'var(--accent-contrast)',
                    }}
                  >
                    <Maximize2 className="h-3.5 w-3.5" />
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-serif text-base font-semibold leading-snug mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs line-clamp-2" style={{ color: 'var(--muted)' }}>
                    {item.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          7. CAREER APPOINTMENTS, EDUCATION, LEADERSHIP & COMPETENCIES
          ==================================================================== */}
      <section
        id="career"
        className="border-t py-14 sm:py-20"
        style={{ borderColor: 'var(--border)' }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <span className="font-mono text-xs uppercase tracking-[0.16em]" style={{ color: 'var(--accent)' }}>
              Trajectory &amp; Credentials
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold mt-1">
              Academic Appointments, Education &amp; Service
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
            {/* Appointments Vertical Timeline */}
            <div className="lg:col-span-7">
              <h3 className="font-serif text-2xl font-semibold mb-5 flex items-center gap-2">
                <Compass className="h-5 w-5" style={{ color: 'var(--accent)' }} />
                Academic Appointments
              </h3>
              <div className="relative pl-6 space-y-5 before:absolute before:left-[7px] before:top-2 before:bottom-2 before:w-[2px] before:bg-[var(--border)]">
                {APPOINTMENTS.map((ap, i) => (
                  <div
                    key={i}
                    className="relative rounded-2xl border p-5"
                    style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
                  >
                    <span
                      className="absolute -left-[22px] top-6 h-3 w-3 rounded-full ring-4"
                      style={{
                        backgroundColor: 'var(--accent)',
                        '--tw-ring-color': 'var(--bg)',
                      }}
                    />
                    <div className="font-mono text-[11px] font-semibold mb-1" style={{ color: 'var(--accent)' }}>
                      {ap.period}
                    </div>
                    <h4 className="font-serif text-xl font-semibold">{ap.role}</h4>
                    <div className="text-xs font-semibold mb-3" style={{ color: 'var(--muted)' }}>
                      {ap.institution}
                    </div>
                    <ul className="space-y-1.5 text-xs leading-relaxed" style={{ color: 'var(--muted)' }}>
                      {ap.highlights.map((h, j) => (
                        <li key={j} className="flex gap-2">
                          <span style={{ color: 'var(--accent)' }}>•</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Education & Leadership Column */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <h3 className="font-serif text-2xl font-semibold mb-5 flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" style={{ color: 'var(--accent)' }} />
                  Education
                </h3>
                <div className="space-y-3">
                  {EDUCATION.map((ed, i) => (
                    <div
                      key={i}
                      className="rounded-xl border p-4"
                      style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
                    >
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="font-serif text-base font-bold">{ed.degree}</span>
                        <span className="font-mono text-xs font-semibold" style={{ color: 'var(--accent)' }}>
                          {ed.year}
                        </span>
                      </div>
                      <div className="text-xs font-medium mb-1">{ed.institution}</div>
                      <p className="text-xs" style={{ color: 'var(--muted)' }}>
                        {ed.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-serif text-2xl font-semibold mb-4 flex items-center gap-2">
                  <Users className="h-5 w-5" style={{ color: 'var(--accent)' }} />
                  Academic Leadership &amp; Editorial Service
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {LEADERSHIP.map((ld, i) => (
                    <div
                      key={i}
                      className="rounded-xl border p-3.5"
                      style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
                    >
                      <div className="text-xs font-semibold">{ld.role}</div>
                      <div className="text-[11px] mt-0.5" style={{ color: 'var(--muted)' }}>
                        {ld.org}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Awards, Certifications, Languages & Digital Competencies */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div
              className="rounded-2xl border p-5"
              style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
            >
              <h3 className="font-serif text-xl font-semibold mb-4 flex items-center gap-2">
                <Award className="h-4 w-4" style={{ color: 'var(--accent)' }} />
                Awards &amp; Honours
              </h3>
              <ul className="space-y-2.5 text-xs">
                {AWARDS.map((aw) => (
                  <li key={aw} className="flex items-start gap-2">
                    <span style={{ color: 'var(--accent)' }}>✦</span>
                    <span className="font-medium">{aw}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div
              className="rounded-2xl border p-5"
              style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
            >
              <h3 className="font-serif text-xl font-semibold mb-4 flex items-center gap-2">
                <FileText className="h-4 w-4" style={{ color: 'var(--accent)' }} />
                Certifications &amp; Digital Tech
              </h3>
              <div className="space-y-2.5 mb-4">
                {CERTIFICATIONS.map((c) => (
                  <div key={c.title} className="text-xs">
                    <div className="font-semibold">{c.title}</div>
                    <div style={{ color: 'var(--muted)' }}>{c.issuer}</div>
                  </div>
                ))}
              </div>
              <div className="pt-3 border-t flex flex-wrap gap-1.5" style={{ borderColor: 'var(--border)' }}>
                {DIGITAL_TECH.map((t) => (
                  <span
                    key={t}
                    className="rounded-full px-2.5 py-1 font-mono text-[10px]"
                    style={{ backgroundColor: 'var(--surface-2)', color: 'var(--ink)' }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div
              className="rounded-2xl border p-5"
              style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
            >
              <h3 className="font-serif text-xl font-semibold mb-4 flex items-center gap-2">
                <Globe className="h-4 w-4" style={{ color: 'var(--accent)' }} />
                Languages
              </h3>
              <div className="space-y-3">
                {LANGUAGES.map((l) => (
                  <div key={l.name}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="font-semibold">{l.name}</span>
                      <span className="font-mono text-[10px]" style={{ color: 'var(--muted)' }}>
                        {l.level}
                      </span>
                    </div>
                    <div className="h-1.5 w-full rounded-full overflow-hidden" style={{ backgroundColor: 'var(--surface-2)' }}>
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${l.pct}%`, backgroundColor: 'var(--accent)' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Academic References */}
          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-5">
            {ACADEMIC_REFERENCES.map((refItem) => (
              <div
                key={refItem.email}
                className="rounded-2xl border p-5 flex flex-col justify-between gap-2"
                style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
              >
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-widest mb-1" style={{ color: 'var(--accent)' }}>
                    Academic Reference
                  </div>
                  <h4 className="font-serif text-lg font-bold">{refItem.name}</h4>
                  <p className="text-xs" style={{ color: 'var(--muted)' }}>
                    {refItem.title}
                  </p>
                </div>
                <div className="pt-2 border-t flex flex-wrap items-center justify-between gap-2 font-mono text-[11px]" style={{ borderColor: 'var(--border)', color: 'var(--muted)' }}>
                  <a href={`mailto:${refItem.email}`} className="hover:underline">
                    {refItem.email}
                  </a>
                  <span>{refItem.phone}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          8. SPEAKING INVITATION PORTAL, CONTACT & LIVE ACADEMIC GUESTBOOK
          ==================================================================== */}
      <section
        id="contact"
        className="border-t py-14 sm:py-20"
        style={{ borderColor: 'var(--border)' }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <span className="font-mono text-xs uppercase tracking-[0.16em]" style={{ color: 'var(--accent)' }}>
              Academic Dialogue &amp; Inquiries
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold mt-1">
              Speaking Portal, Contact &amp; Scholarly Guestbook
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Direct Contact Cards & Live Guestbook */}
            <div className="lg:col-span-5 space-y-5">
              <div
                className="rounded-2xl border p-5 space-y-4"
                style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-3 min-w-0">
                    <Mail className="h-4 w-4 shrink-0" style={{ color: 'var(--accent)' }} />
                    <div className="min-w-0">
                      <div className="font-mono text-[10px] uppercase" style={{ color: 'var(--muted)' }}>
                        Email
                      </div>
                      <a href={`mailto:${profile.email}`} className="text-sm font-medium truncate block hover:underline">
                        {profile.email}
                      </a>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyText(profile.email, 'Email')}
                    className="rounded-full border px-2.5 py-1 text-[11px] font-mono cursor-pointer"
                    style={{ borderColor: 'var(--border)' }}
                  >
                    Copy
                  </button>
                </div>

                <div className="flex items-center justify-between gap-2 border-t pt-3" style={{ borderColor: 'var(--border)' }}>
                  <div className="flex items-center gap-3 min-w-0">
                    <Phone className="h-4 w-4 shrink-0" style={{ color: 'var(--accent)' }} />
                    <div>
                      <div className="font-mono text-[10px] uppercase" style={{ color: 'var(--muted)' }}>
                        Phone
                      </div>
                      <a href={`tel:${profile.phone.replace(/\s+/g, '')}`} className="text-sm font-medium hover:underline">
                        {profile.phone}
                      </a>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyText(profile.phone, 'Phone')}
                    className="rounded-full border px-2.5 py-1 text-[11px] font-mono cursor-pointer"
                    style={{ borderColor: 'var(--border)' }}
                  >
                    Copy
                  </button>
                </div>

                <div className="flex items-center justify-between gap-2 border-t pt-3" style={{ borderColor: 'var(--border)' }}>
                  <div className="flex items-center gap-3 min-w-0">
                    <ShieldCheck className="h-4 w-4 shrink-0" style={{ color: 'var(--accent)' }} />
                    <div>
                      <div className="font-mono text-[10px] uppercase" style={{ color: 'var(--muted)' }}>
                        ORCID iD
                      </div>
                      <a
                        href={profile.orcidUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-mono font-medium hover:underline"
                      >
                        {profile.orcid}
                      </a>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyText(profile.orcid, 'ORCID iD')}
                    className="rounded-full border px-2.5 py-1 text-[11px] font-mono cursor-pointer"
                    style={{ borderColor: 'var(--border)' }}
                  >
                    Copy
                  </button>
                </div>

                <div className="flex items-start gap-3 border-t pt-3" style={{ borderColor: 'var(--border)' }}>
                  <MapPin className="h-4 w-4 shrink-0 mt-0.5" style={{ color: 'var(--accent)' }} />
                  <div>
                    <div className="font-mono text-[10px] uppercase" style={{ color: 'var(--muted)' }}>
                      Institutional Office
                    </div>
                    <div className="text-xs leading-relaxed">
                      {profile.department}, {profile.institution}
                    </div>
                  </div>
                </div>
              </div>

              {/* Live Public Academic Guestbook */}
              <div
                className="rounded-2xl border p-5"
                style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-serif text-xl font-semibold flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" style={{ color: 'var(--accent)' }} />
                    Academic Guestbook
                  </h3>
                  <span className="font-mono text-[10px]" style={{ color: 'var(--muted)' }}>
                    {publicGuestbook.length} notes
                  </span>
                </div>
                {publicGuestbook.length === 0 ? (
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--muted)' }}>
                    Be the first scholar, student, or collaborator to leave a public reflection using the portal on the right.
                  </p>
                ) : (
                  <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                    {publicGuestbook.map((note) => (
                      <div
                        key={note.id}
                        className="rounded-xl border p-3"
                        style={{ backgroundColor: 'var(--surface-2)', borderColor: 'var(--border)' }}
                      >
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="font-semibold">{note.name}</span>
                          <span className="font-mono text-[10px]" style={{ color: 'var(--accent)' }}>
                            {note.type}
                          </span>
                        </div>
                        <div className="text-[11px] mb-1.5" style={{ color: 'var(--muted)' }}>
                          {note.affiliation}
                        </div>
                        <p className="text-xs leading-relaxed">“{note.message}”</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right Interactive Speaking & Collaboration Form */}
            <div className="lg:col-span-7">
              <form
                onSubmit={handleSubmitInquiry}
                className="rounded-2xl border p-6 sm:p-7 space-y-4"
                style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
              >
                {/* Hidden Honeypot Spam Protection Field */}
                <input
                  type="checkbox"
                  name="botcheck"
                  checked={inquiryForm.botcheck}
                  onChange={(e) => setInquiryForm({ ...inquiryForm, botcheck: e.target.checked })}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                  <div className="flex items-center gap-2">
                    <Mic className="h-4 w-4" style={{ color: 'var(--accent)' }} />
                    <h3 className="font-serif text-2xl font-semibold">
                      Send an Invitation, Pitch or Guestbook Note
                    </h3>
                  </div>
                  <span
                    className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[10px]"
                    style={{
                      backgroundColor: 'var(--surface-2)',
                      borderColor: 'var(--border)',
                      color:
                        web3formsKey && web3formsKey !== 'YOUR_WEB3FORMS_ACCESS_KEY'
                          ? '#16a34a'
                          : 'var(--muted)',
                    }}
                  >
                    <Mail className="h-3 w-3" />
                    {web3formsKey && web3formsKey !== 'YOUR_WEB3FORMS_ACCESS_KEY'
                      ? 'Direct Gmail Active'
                      : 'Studio Inbox'}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-[10px] uppercase mb-1.5" style={{ color: 'var(--muted)' }}>
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={inquiryForm.name}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, name: e.target.value })}
                      placeholder="Dr. / Prof. / Scholar Name"
                      className="w-full rounded-xl border px-3.5 py-2.5 text-sm focus:outline-none"
                      style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--ink)' }}
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[10px] uppercase mb-1.5" style={{ color: 'var(--muted)' }}>
                      Institution / Affiliation
                    </label>
                    <input
                      type="text"
                      value={inquiryForm.affiliation}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, affiliation: e.target.value })}
                      placeholder="University, Journal, or Organization"
                      className="w-full rounded-xl border px-3.5 py-2.5 text-sm focus:outline-none"
                      style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--ink)' }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-[10px] uppercase mb-1.5" style={{ color: 'var(--muted)' }}>
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={inquiryForm.email}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, email: e.target.value })}
                      placeholder="name@university.edu"
                      className="w-full rounded-xl border px-3.5 py-2.5 text-sm focus:outline-none"
                      style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--ink)' }}
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[10px] uppercase mb-1.5" style={{ color: 'var(--muted)' }}>
                      Inquiry Type
                    </label>
                    <select
                      value={inquiryForm.type}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, type: e.target.value })}
                      className="w-full rounded-xl border px-3.5 py-2.5 text-sm focus:outline-none"
                      style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--ink)' }}
                    >
                      <option>Speaking Invitation</option>
                      <option>Research Collaboration</option>
                      <option>Peer Review / Editorial</option>
                      <option>Student Mentorship</option>
                      <option>Academic Reflection</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-[10px] uppercase mb-1.5" style={{ color: 'var(--muted)' }}>
                    Proposed Date / Timeline (Optional)
                  </label>
                  <input
                    type="text"
                    value={inquiryForm.proposedDate}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, proposedDate: e.target.value })}
                    placeholder="e.g., March 2027, October 15, or Flexible"
                    className="w-full rounded-xl border px-3.5 py-2.5 text-sm focus:outline-none"
                    style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--ink)' }}
                  />
                </div>

                <div>
                  <label className="block font-mono text-[10px] uppercase mb-1.5" style={{ color: 'var(--muted)' }}>
                    Message / Proposal *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={inquiryForm.message}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, message: e.target.value })}
                    placeholder="Share conference details, dates, collaborative research topics, or a reflection..."
                    className="w-full rounded-xl border px-3.5 py-2.5 text-sm focus:outline-none"
                    style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--ink)' }}
                  />
                </div>

                <label className="flex items-center gap-2.5 text-xs cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={inquiryForm.isPublicGuestbook}
                    onChange={(e) =>
                      setInquiryForm({ ...inquiryForm, isPublicGuestbook: e.target.checked })
                    }
                    className="h-4 w-4 accent-[var(--accent)]"
                  />
                  <span>Also display publicly in the Academic Guestbook feed</span>
                </label>

                <button
                  type="submit"
                  disabled={submittingInquiry}
                  className="inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold transition cursor-pointer hover:opacity-90 disabled:opacity-50"
                  style={{
                    backgroundColor: 'var(--accent)',
                    color: 'var(--accent-contrast)',
                  }}
                >
                  <Send className="h-4 w-4" />
                  {submittingInquiry ? 'Sending...' : 'Submit Message'}
                </button>

                {/* Honest Delivery Status Feedback Banner */}
                {inquiryStatus && (
                  <div
                    role="status"
                    className="rounded-xl border px-4 py-3 text-xs leading-relaxed flex items-start gap-2.5"
                    style={{
                      backgroundColor: 'var(--surface-2)',
                      borderColor:
                        inquiryStatus.type === 'success'
                          ? '#16a34a'
                          : inquiryStatus.type === 'warning'
                          ? '#d97706'
                          : 'var(--accent-border)',
                      color: 'var(--ink)',
                    }}
                  >
                    {inquiryStatus.type === 'success' ? (
                      <Check className="h-4 w-4 shrink-0 mt-0.5 text-green-600" />
                    ) : inquiryStatus.type === 'warning' ? (
                      <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5 text-amber-500" />
                    ) : (
                      <Mail className="h-4 w-4 shrink-0 mt-0.5" style={{ color: 'var(--accent)' }} />
                    )}
                    <span>{inquiryStatus.text}</span>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          FOOTER
          ==================================================================== */}
      <footer className="border-t py-8" style={{ borderColor: 'var(--border)' }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4 text-xs" style={{ color: 'var(--muted)' }}>
          <div>
            © {new Date().getFullYear()} {profile.name} · {profile.institution}
          </div>
          <div className="flex items-center gap-3 font-mono text-[11px]">
            <span>Active Theme: {theme.name} ({theme.hue}°)</span>
            <span>·</span>
            <span>Contrast {tokens.contrastRatio.toFixed(1)}:1 ({wcagGrade})</span>
          </div>
        </div>
      </footer>

      {/* ====================================================================
          FLOATING PRISM BUTTON (QUICK CHROMATIC UNIVERSE LAUNCHER)
          ==================================================================== */}
      <button
        type="button"
        onClick={() => setChromaticOpen(true)}
        aria-label="Open Chromatic Universe Studio"
        title="Chromatic Universe Studio — Every Color Combination"
        className="fixed bottom-5 right-5 z-[85] flex h-12 w-12 items-center justify-center rounded-full shadow-xl transition-transform hover:scale-110 cursor-pointer"
        style={{
          background: 'conic-gradient(from 0deg, var(--accent), var(--accent-2), var(--accent-3), var(--accent))',
          color: '#ffffff',
        }}
      >
        <div
          className="flex h-9 w-9 items-center justify-center rounded-full"
          style={{ backgroundColor: 'var(--surface)', color: 'var(--accent)' }}
        >
          <Palette className="h-4 w-4" />
        </div>
      </button>

      {/* ====================================================================
          SLIDE-OVER 1: CHROMATIC UNIVERSE STUDIO (360° HSL + HARMONIES + WCAG)
          ==================================================================== */}
      {chromaticOpen && (
        <div className="fixed inset-0 z-[130] flex justify-end bg-black/50 backdrop-blur-xs">
          <div
            className="h-full w-full max-w-md overflow-y-auto border-l p-5 sm:p-6 shadow-2xl"
            style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
          >
            <div className="flex items-center justify-between pb-4 border-b" style={{ borderColor: 'var(--border)' }}>
              <div>
                <div className="font-mono text-[10px] uppercase tracking-widest" style={{ color: 'var(--accent)' }}>
                  16.7M+ RGB · Continuous 360° HSL
                </div>
                <h2 className="font-serif text-2xl font-bold">Chromatic Universe Studio</h2>
              </div>
              <button
                type="button"
                onClick={() => setChromaticOpen(false)}
                aria-label="Close Chromatic Studio"
                className="flex h-8 w-8 items-center justify-center rounded-full border cursor-pointer"
                style={{ borderColor: 'var(--border)' }}
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="py-5 space-y-6">
              {/* Live Swatch Strip + Shuffle / Cloud Save */}
              <div className="space-y-3">
                <div className="grid grid-cols-5 h-10 rounded-xl overflow-hidden border" style={{ borderColor: 'var(--border)' }}>
                  <div title="Canvas" style={{ backgroundColor: tokens.bg }} />
                  <div title="Surface" style={{ backgroundColor: tokens.surface2 }} />
                  <div title="Primary Accent" style={{ backgroundColor: tokens.accent }} />
                  <div title="Harmony 2" style={{ backgroundColor: tokens.accent2 }} />
                  <div title="Harmony 3" style={{ backgroundColor: tokens.accent3 }} />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={shuffleChromaticUniverse}
                    className="inline-flex items-center justify-center gap-1.5 rounded-xl border px-3 py-2.5 text-xs font-semibold cursor-pointer transition hover:opacity-90"
                    style={{
                      backgroundColor: 'var(--accent)',
                      borderColor: 'var(--accent)',
                      color: 'var(--accent-contrast)',
                    }}
                  >
                    <Shuffle className="h-3.5 w-3.5" />
                    Infinite Shuffle
                  </button>
                  <button
                    type="button"
                    onClick={saveThemeToCloud}
                    className="inline-flex items-center justify-center gap-1.5 rounded-xl border px-3 py-2.5 text-xs font-semibold cursor-pointer transition hover:opacity-90"
                    style={{
                      backgroundColor: 'var(--surface-2)',
                      borderColor: 'var(--border)',
                      color: 'var(--ink)',
                    }}
                  >
                    <Wand2 className="h-3.5 w-3.5" />
                    Save Live Theme
                  </button>
                </div>
              </div>

              {/* Real-Time WCAG 2.1 Contrast Meter */}
              <div
                className="rounded-xl border p-3.5 flex items-center justify-between gap-3"
                style={{ backgroundColor: 'var(--surface-2)', borderColor: 'var(--border)' }}
              >
                <div>
                  <div className="font-mono text-[10px] uppercase" style={{ color: 'var(--muted)' }}>
                    WCAG 2.1 Luminance Contrast
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="font-mono text-base font-bold">
                      {tokens.contrastRatio.toFixed(2)}:1
                    </span>
                    <span
                      className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-mono text-[10px] font-bold"
                      style={{
                        backgroundColor: wcagGrade === 'LOW' ? '#ef4444' : '#16a34a',
                        color: '#ffffff',
                      }}
                    >
                      {wcagGrade === 'LOW' ? (
                        <AlertTriangle className="h-3 w-3" />
                      ) : (
                        <ShieldCheck className="h-3 w-3" />
                      )}
                      {wcagGrade}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={autoFixContrast}
                  className="rounded-full border px-3 py-1.5 text-[11px] font-semibold cursor-pointer"
                  style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
                >
                  Auto-Fix
                </button>
              </div>

              {/* Surface Modes */}
              <div>
                <label className="block font-mono text-[10px] uppercase tracking-wider mb-2" style={{ color: 'var(--muted)' }}>
                  Surface Mode
                </label>
                <div className="grid grid-cols-4 gap-1.5">
                  {['light', 'dark', 'tinted', 'oled'].map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => applySurfaceMode(m)}
                      className="rounded-lg border py-1.5 text-xs font-medium capitalize cursor-pointer"
                      style={{
                        backgroundColor: theme.surfaceMode === m ? 'var(--accent)' : 'var(--surface-2)',
                        borderColor: theme.surfaceMode === m ? 'var(--accent)' : 'var(--border)',
                        color: theme.surfaceMode === m ? 'var(--accent-contrast)' : 'var(--ink)',
                      }}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              {/* Continuous 360° HSL Spectrum Sliders */}
              <div className="space-y-3.5">
                <div>
                  <div className="flex justify-between font-mono text-[11px] mb-1">
                    <span>Accent Hue (0–360°)</span>
                    <span>{theme.hue}°</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="360"
                    value={theme.hue}
                    onChange={(e) =>
                      setTheme((prev) => ({
                        ...prev,
                        name: 'Custom Spectrum',
                        hue: Number(e.target.value),
                      }))
                    }
                    className="w-full h-2.5 rounded-full appearance-none cursor-pointer"
                    style={{
                      background:
                        'linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)',
                    }}
                  />
                </div>

                <div>
                  <div className="flex justify-between font-mono text-[11px] mb-1">
                    <span>Saturation</span>
                    <span>{theme.sat}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={theme.sat}
                    onChange={(e) =>
                      setTheme((prev) => ({
                        ...prev,
                        name: 'Custom Spectrum',
                        sat: Number(e.target.value),
                      }))
                    }
                    className="w-full accent-[var(--accent)] cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between font-mono text-[11px] mb-1">
                    <span>Lightness</span>
                    <span>{theme.light}%</span>
                  </div>
                  <input
                    type="range"
                    min="12"
                    max="88"
                    value={theme.light}
                    onChange={(e) =>
                      setTheme((prev) => ({
                        ...prev,
                        name: 'Custom Spectrum',
                        light: Number(e.target.value),
                      }))
                    }
                    className="w-full accent-[var(--accent)] cursor-pointer"
                  />
                </div>
              </div>

              {/* Native Hex Pickers (Accent, Canvas, Ink) */}
              <div className="grid grid-cols-3 gap-2">
                <label className="rounded-xl border p-2.5 flex flex-col gap-1.5 cursor-pointer" style={{ borderColor: 'var(--border)' }}>
                  <span className="font-mono text-[10px] uppercase" style={{ color: 'var(--muted)' }}>
                    Accent
                  </span>
                  <div className="flex items-center gap-1.5">
                    <input
                      type="color"
                      value={tokens.accent}
                      onChange={(e) => {
                        const hsl = hexToHsl(e.target.value);
                        setTheme((prev) => ({
                          ...prev,
                          name: 'Custom Hex',
                          hue: hsl.h,
                          sat: hsl.s,
                          light: hsl.l,
                        }));
                      }}
                      className="h-6 w-6 rounded cursor-pointer border-0 bg-transparent"
                    />
                    <span className="font-mono text-[10px]">{tokens.accent}</span>
                  </div>
                </label>

                <label className="rounded-xl border p-2.5 flex flex-col gap-1.5 cursor-pointer" style={{ borderColor: 'var(--border)' }}>
                  <span className="font-mono text-[10px] uppercase" style={{ color: 'var(--muted)' }}>
                    Canvas
                  </span>
                  <div className="flex items-center gap-1.5">
                    <input
                      type="color"
                      value={theme.bgHex}
                      onChange={(e) =>
                        setTheme((prev) => ({ ...prev, name: 'Custom Hex', bgHex: e.target.value.toUpperCase() }))
                      }
                      className="h-6 w-6 rounded cursor-pointer border-0 bg-transparent"
                    />
                    <span className="font-mono text-[10px]">{theme.bgHex}</span>
                  </div>
                </label>

                <label className="rounded-xl border p-2.5 flex flex-col gap-1.5 cursor-pointer" style={{ borderColor: 'var(--border)' }}>
                  <span className="font-mono text-[10px] uppercase" style={{ color: 'var(--muted)' }}>
                    Ink
                  </span>
                  <div className="flex items-center gap-1.5">
                    <input
                      type="color"
                      value={theme.inkHex}
                      onChange={(e) =>
                        setTheme((prev) => ({ ...prev, name: 'Custom Hex', inkHex: e.target.value.toUpperCase() }))
                      }
                      className="h-6 w-6 rounded cursor-pointer border-0 bg-transparent"
                    />
                    <span className="font-mono text-[10px]">{theme.inkHex}</span>
                  </div>
                </label>
              </div>

              {/* Mathematical Color Harmony Engine */}
              <div>
                <label className="block font-mono text-[10px] uppercase tracking-wider mb-2" style={{ color: 'var(--muted)' }}>
                  Mathematical Harmony Rule
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {HARMONY_MODES.map((hm) => (
                    <button
                      key={hm.id}
                      type="button"
                      onClick={() => setTheme((prev) => ({ ...prev, harmony: hm.id }))}
                      className="rounded-lg border px-2 py-1.5 text-[11px] font-medium cursor-pointer"
                      style={{
                        backgroundColor: theme.harmony === hm.id ? 'var(--accent-soft)' : 'var(--surface-2)',
                        borderColor: theme.harmony === hm.id ? 'var(--accent)' : 'var(--border)',
                        color: theme.harmony === hm.id ? 'var(--accent)' : 'var(--ink)',
                      }}
                    >
                      {hm.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 12 Curated 2026 Editorial Portfolio Presets */}
              <div>
                <label className="block font-mono text-[10px] uppercase tracking-wider mb-2.5" style={{ color: 'var(--muted)' }}>
                  12 Curated Portfolio Presets
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {CHROMATIC_PRESETS.map((preset) => {
                    const pAccent = hslToHex(preset.hue, preset.sat, preset.light);
                    const isSelected = theme.name === preset.name;
                    return (
                      <button
                        key={preset.name}
                        type="button"
                        onClick={() => setTheme(preset)}
                        className="flex items-center gap-2.5 rounded-xl border p-2.5 text-left transition cursor-pointer hover:scale-[1.01]"
                        style={{
                          backgroundColor: isSelected ? 'var(--accent-soft)' : 'var(--surface-2)',
                          borderColor: isSelected ? 'var(--accent)' : 'var(--border)',
                        }}
                      >
                        <div className="flex -space-x-1 shrink-0">
                          <span className="h-5 w-5 rounded-full border" style={{ backgroundColor: preset.bgHex, borderColor: 'var(--border)' }} />
                          <span className="h-5 w-5 rounded-full border" style={{ backgroundColor: pAccent, borderColor: 'var(--border)' }} />
                        </div>
                        <span className="text-xs font-medium truncate">{preset.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ====================================================================
          SLIDE-OVER 2: FULL-STACK STUDIO ADMIN (PHOTOS, WORKS CMS, PROFILE, INBOX)
          ==================================================================== */}
      {studioOpen && (
        <div className="fixed inset-0 z-[130] flex justify-end bg-black/50 backdrop-blur-xs">
          <div
            className="h-full w-full max-w-lg overflow-y-auto border-l p-5 sm:p-6 shadow-2xl"
            style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
          >
            <div className="flex items-center justify-between pb-4 border-b" style={{ borderColor: 'var(--border)' }}>
              <div>
                <div className="font-mono text-[10px] uppercase tracking-widest" style={{ color: 'var(--accent)' }}>
                  Live Cloud Portfolio CMS
                </div>
                <h2 className="font-serif text-2xl font-bold">Studio Admin &amp; Media Manager</h2>
              </div>
              <button
                type="button"
                onClick={() => setStudioOpen(false)}
                aria-label="Close Studio Admin"
                className="flex h-8 w-8 items-center justify-center rounded-full border cursor-pointer"
                style={{ borderColor: 'var(--border)' }}
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Studio Tabs */}
            <div className="grid grid-cols-5 gap-1.5 my-4">
              {[
                { id: 'photos', label: 'Photos', icon: ImageIcon },
                { id: 'works', label: 'Works', icon: Plus },
                { id: 'profile', label: 'Profile', icon: Edit3 },
                { id: 'inbox', label: `Inbox (${inquiries.length})`, icon: Inbox },
                { id: 'settings', label: 'Settings', icon: Sliders },
              ].map((t) => {
                const Icon = t.icon;
                const active = studioTab === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setStudioTab(t.id)}
                    className="flex items-center justify-center gap-1 rounded-lg border py-2 px-1 text-[11px] font-semibold cursor-pointer"
                    style={{
                      backgroundColor: active ? 'var(--accent)' : 'var(--surface-2)',
                      borderColor: active ? 'var(--accent)' : 'var(--border)',
                      color: active ? 'var(--accent-contrast)' : 'var(--ink)',
                    }}
                  >
                    <Icon className="h-3.5 w-3.5 shrink-0" />
                    <span className="truncate">{t.label}</span>
                  </button>
                );
              })}
            </div>

            {/* TAB 1: PHOTOS & PORTRAIT STUDIO */}
            {studioTab === 'photos' && (
              <div className="space-y-6">
                {/* Hero Portrait Uploader */}
                <div className="rounded-xl border p-4 space-y-3" style={{ backgroundColor: 'var(--surface-2)', borderColor: 'var(--border)' }}>
                  <div className="text-xs font-semibold">Hero Portrait of Dr. Mithula Thomas</div>
                  <p className="text-[11px]" style={{ color: 'var(--muted)' }}>
                    Upload a photograph from your device (auto-compressed for instant cloud sync) or paste an image URL below.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <label
                      className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold cursor-pointer"
                      style={{ backgroundColor: 'var(--accent)', color: 'var(--accent-contrast)' }}
                    >
                      <Upload className="h-3.5 w-3.5" />
                      {uploadingPhoto ? 'Processing...' : 'Upload Portrait File'}
                      <input type="file" accept="image/*" onChange={handlePortraitFileSelect} className="hidden" />
                    </label>
                    {profile.portraitUrl && (
                      <button
                        type="button"
                        onClick={async () => {
                          setProfile((p) => ({ ...p, portraitUrl: '' }));
                          setProfileEditForm((p) => ({ ...p, portraitUrl: '' }));
                          if (db && user) {
                            await setDoc(
                              doc(db, 'artifacts', appId, 'public', 'data', 'site_config', 'profile'),
                              { portraitUrl: '' },
                              { merge: true }
                            );
                          }
                          showToast('Reverted to monogram portrait');
                        }}
                        className="rounded-full border px-3 py-1.5 text-xs cursor-pointer"
                        style={{ borderColor: 'var(--border)' }}
                      >
                        Reset to Art Monogram
                      </button>
                    )}
                  </div>
                </div>

                {/* Add New Gallery Photo Form */}
                <form onSubmit={handleAddGalleryPhoto} className="rounded-xl border p-4 space-y-3" style={{ borderColor: 'var(--border)' }}>
                  <div className="text-xs font-semibold">Add Conference / Keynote Photograph to Gallery</div>
                  <input
                    type="text"
                    required
                    value={photoForm.title}
                    onChange={(e) => setPhotoForm({ ...photoForm, title: e.target.value })}
                    placeholder="Photo Title (e.g., Keynote at Thinksphere 2026)"
                    className="w-full rounded-lg border px-3 py-2 text-xs"
                    style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--ink)' }}
                  />
                  <input
                    type="text"
                    value={photoForm.caption}
                    onChange={(e) => setPhotoForm({ ...photoForm, caption: e.target.value })}
                    placeholder="Short caption or venue description"
                    className="w-full rounded-lg border px-3 py-2 text-xs"
                    style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--ink)' }}
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={photoForm.category}
                      onChange={(e) => setPhotoForm({ ...photoForm, category: e.target.value })}
                      placeholder="Category"
                      className="rounded-lg border px-3 py-2 text-xs"
                      style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--ink)' }}
                    />
                    <input
                      type="text"
                      value={photoForm.year}
                      onChange={(e) => setPhotoForm({ ...photoForm, year: e.target.value })}
                      placeholder="Year"
                      className="rounded-lg border px-3 py-2 text-xs"
                      style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--ink)' }}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <label
                      className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-medium cursor-pointer shrink-0"
                      style={{ backgroundColor: 'var(--surface-2)', borderColor: 'var(--border)' }}
                    >
                      <Upload className="h-3.5 w-3.5" />
                      Choose File
                      <input type="file" accept="image/*" onChange={handleGalleryFileSelect} className="hidden" />
                    </label>
                    <input
                      type="text"
                      value={photoForm.imageUrl}
                      onChange={(e) => setPhotoForm({ ...photoForm, imageUrl: e.target.value })}
                      placeholder="...or paste direct image URL"
                      className="w-full rounded-lg border px-3 py-2 text-xs"
                      style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--ink)' }}
                    />
                  </div>
                  {photoForm.imageUrl && (
                    <img src={photoForm.imageUrl} alt="Preview" className="h-28 w-full object-cover rounded-lg border" />
                  )}
                  <button
                    type="submit"
                    className="w-full rounded-full py-2 text-xs font-semibold cursor-pointer"
                    style={{ backgroundColor: 'var(--accent)', color: 'var(--accent-contrast)' }}
                  >
                    Publish to Live Gallery
                  </button>
                </form>

                {/* Manage Uploaded Photos */}
                {galleryPhotos.length > 0 && (
                  <div className="space-y-2">
                    <div className="font-mono text-[10px] uppercase" style={{ color: 'var(--muted)' }}>
                      Uploaded Cloud Photos ({galleryPhotos.length})
                    </div>
                    {galleryPhotos.map((ph) => (
                      <div
                        key={ph.id}
                        className="flex items-center justify-between gap-2 rounded-xl border p-2.5"
                        style={{ borderColor: 'var(--border)' }}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <img src={ph.imageUrl} alt={ph.title} className="h-10 w-12 rounded object-cover shrink-0" />
                          <div className="truncate text-xs font-medium">{ph.title}</div>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleDeleteGalleryPhoto(ph.id)}
                          aria-label="Delete photo"
                          className="p-1.5 text-red-500 cursor-pointer"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: ADD / MANAGE ACADEMIC WORKS */}
            {studioTab === 'works' && (
              <div className="space-y-6">
                <form onSubmit={handleAddCustomWork} className="rounded-xl border p-4 space-y-3" style={{ borderColor: 'var(--border)' }}>
                  <div className="text-xs font-semibold">Publish New Academic Entry</div>
                  <input
                    type="text"
                    required
                    value={newWorkForm.title}
                    onChange={(e) => setNewWorkForm({ ...newWorkForm, title: e.target.value })}
                    placeholder="Title of paper, keynote, conference or course *"
                    className="w-full rounded-lg border px-3 py-2 text-xs"
                    style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--ink)' }}
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <select
                      value={newWorkForm.category}
                      onChange={(e) => setNewWorkForm({ ...newWorkForm, category: e.target.value })}
                      className="rounded-lg border px-3 py-2 text-xs"
                      style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--ink)' }}
                    >
                      <option>Publications</option>
                      <option>Talks &amp; Keynotes</option>
                      <option>Conferences</option>
                      <option>Curriculum</option>
                    </select>
                    <input
                      type="text"
                      value={newWorkForm.year}
                      onChange={(e) => setNewWorkForm({ ...newWorkForm, year: e.target.value })}
                      placeholder="Year (e.g., 2026)"
                      className="rounded-lg border px-3 py-2 text-xs"
                      style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--ink)' }}
                    />
                  </div>
                  <input
                    type="text"
                    required
                    value={newWorkForm.venue}
                    onChange={(e) => setNewWorkForm({ ...newWorkForm, venue: e.target.value })}
                    placeholder="Journal, Conference, or Institution *"
                    className="w-full rounded-lg border px-3 py-2 text-xs"
                    style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--ink)' }}
                  />
                  <textarea
                    rows={3}
                    value={newWorkForm.summary}
                    onChange={(e) => setNewWorkForm({ ...newWorkForm, summary: e.target.value })}
                    placeholder="Abstract / summary..."
                    className="w-full rounded-lg border px-3 py-2 text-xs"
                    style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--ink)' }}
                  />
                  <input
                    type="url"
                    value={newWorkForm.url}
                    onChange={(e) => setNewWorkForm({ ...newWorkForm, url: e.target.value })}
                    placeholder="DOI / Article URL (optional)"
                    className="w-full rounded-lg border px-3 py-2 text-xs"
                    style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--ink)' }}
                  />
                  <div>
                    <div className="font-mono text-[10px] uppercase mb-1.5" style={{ color: 'var(--muted)' }}>
                      Link Research Domains (updates Knowledge Graph)
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {RESEARCH_DOMAINS.map((dom) => {
                        const checked = newWorkForm.domains.includes(dom.name);
                        return (
                          <button
                            key={dom.id}
                            type="button"
                            onClick={() =>
                              setNewWorkForm((prev) => ({
                                ...prev,
                                domains: checked
                                  ? prev.domains.filter((x) => x !== dom.name)
                                  : [...prev.domains, dom.name],
                              }))
                            }
                            className="rounded-full border px-2.5 py-1 text-[10px] cursor-pointer"
                            style={{
                              backgroundColor: checked ? 'var(--accent)' : 'var(--surface-2)',
                              borderColor: checked ? 'var(--accent)' : 'var(--border)',
                              color: checked ? 'var(--accent-contrast)' : 'var(--ink)',
                            }}
                          >
                            {dom.short}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full rounded-full py-2 text-xs font-semibold cursor-pointer"
                    style={{ backgroundColor: 'var(--accent)', color: 'var(--accent-contrast)' }}
                  >
                    Publish Entry to Archive
                  </button>
                </form>

                {customWorks.length > 0 && (
                  <div className="space-y-2">
                    <div className="font-mono text-[10px] uppercase" style={{ color: 'var(--muted)' }}>
                      Custom Published Entries ({customWorks.length})
                    </div>
                    {customWorks.map((cw) => (
                      <div
                        key={cw.id}
                        className="flex items-center justify-between gap-2 rounded-xl border p-3"
                        style={{ borderColor: 'var(--border)' }}
                      >
                        <div className="min-w-0">
                          <div className="text-xs font-semibold truncate">{cw.title}</div>
                          <div className="font-mono text-[10px]" style={{ color: 'var(--muted)' }}>
                            {cw.category} · {cw.year}
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleDeleteCustomWork(cw.id)}
                          aria-label="Delete work"
                          className="p-1.5 text-red-500 cursor-pointer"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: LIVE PROFILE EDITOR */}
            {studioTab === 'profile' && (
              <form onSubmit={handleSaveProfileEdit} className="space-y-3.5">
                <div>
                  <label className="block font-mono text-[10px] uppercase mb-1" style={{ color: 'var(--muted)' }}>
                    Headline / Academic Role
                  </label>
                  <input
                    type="text"
                    value={profileEditForm.role}
                    onChange={(e) => setProfileEditForm({ ...profileEditForm, role: e.target.value })}
                    className="w-full rounded-lg border px-3 py-2 text-xs"
                    style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--ink)' }}
                  />
                </div>
                <div>
                  <label className="block font-mono text-[10px] uppercase mb-1" style={{ color: 'var(--muted)' }}>
                    Institution
                  </label>
                  <input
                    type="text"
                    value={profileEditForm.institution}
                    onChange={(e) => setProfileEditForm({ ...profileEditForm, institution: e.target.value })}
                    className="w-full rounded-lg border px-3 py-2 text-xs"
                    style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--ink)' }}
                  />
                </div>
                <div>
                  <label className="block font-mono text-[10px] uppercase mb-1" style={{ color: 'var(--muted)' }}>
                    Direct Portrait Image URL (optional)
                  </label>
                  <input
                    type="text"
                    value={profileEditForm.portraitUrl}
                    onChange={(e) => setProfileEditForm({ ...profileEditForm, portraitUrl: e.target.value })}
                    placeholder="https://... or upload in Photos tab"
                    className="w-full rounded-lg border px-3 py-2 text-xs"
                    style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--ink)' }}
                  />
                </div>
                <div>
                  <label className="block font-mono text-[10px] uppercase mb-1" style={{ color: 'var(--muted)' }}>
                    Academic Biography
                  </label>
                  <textarea
                    rows={6}
                    value={profileEditForm.bio}
                    onChange={(e) => setProfileEditForm({ ...profileEditForm, bio: e.target.value })}
                    className="w-full rounded-lg border px-3 py-2 text-xs leading-relaxed"
                    style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--ink)' }}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-full py-2.5 text-xs font-semibold cursor-pointer"
                  style={{ backgroundColor: 'var(--accent)', color: 'var(--accent-contrast)' }}
                >
                  Save Profile Changes Live
                </button>
              </form>
            )}

            {/* TAB 4: ADMIN INBOX (SUBMITTED INVITATIONS & INQUIRIES) */}
            {studioTab === 'inbox' && (
              <div className="space-y-3">
                {inquiries.length === 0 ? (
                  <p className="text-xs py-8 text-center" style={{ color: 'var(--muted)' }}>
                    No speaking invitations or inquiries submitted yet.
                  </p>
                ) : (
                  inquiries.map((inq) => {
                    const statusLabel =
                      inq.emailStatus === 'emailed'
                        ? 'Emailed via Web3Forms'
                        : inq.emailStatus === 'failed'
                        ? 'Email Failed · Studio Only'
                        : 'Studio Only';
                    const statusColor =
                      inq.emailStatus === 'emailed'
                        ? '#16a34a'
                        : inq.emailStatus === 'failed'
                        ? '#d97706'
                        : 'var(--muted)';
                    return (
                      <div
                        key={inq.id}
                        className="rounded-xl border p-3.5 space-y-1.5"
                        style={{ backgroundColor: 'var(--surface-2)', borderColor: 'var(--border)' }}
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span className="text-xs font-bold">{inq.name}</span>
                          <div className="flex items-center gap-1.5">
                            <span
                              className="rounded-full px-2 py-0.5 font-mono text-[10px]"
                              style={{ backgroundColor: 'var(--accent-soft)', color: 'var(--accent)' }}
                            >
                              {inq.type}
                            </span>
                            <span
                              className="rounded-full border px-2 py-0.5 font-mono text-[10px]"
                              style={{ borderColor: 'var(--border)', color: statusColor }}
                            >
                              {statusLabel}
                            </span>
                          </div>
                        </div>
                        <div className="text-[11px]" style={{ color: 'var(--muted)' }}>
                          {inq.affiliation}
                          {inq.email ? ` · ${inq.email}` : ''}
                          {inq.proposedDate ? ` · Date: ${inq.proposedDate}` : ''}
                        </div>
                        <p className="text-xs leading-relaxed pt-1">{inq.message}</p>
                      </div>
                    );
                  })
                )}
              </div>
            )}

            {/* TAB 5: EMAIL DELIVERY SETTINGS (WEB3FORMS) */}
            {studioTab === 'settings' && (
              <form
                onSubmit={handleSaveWeb3FormsKey}
                className="rounded-xl border p-4 space-y-4"
                style={{ backgroundColor: 'var(--surface-2)', borderColor: 'var(--border)' }}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h3 className="text-sm font-semibold">Email Delivery (Web3Forms)</h3>
                    <span
                      className="rounded-full px-2 py-0.5 font-mono text-[10px] font-semibold"
                      style={{
                        backgroundColor:
                          web3formsKey && web3formsKey !== 'YOUR_WEB3FORMS_ACCESS_KEY'
                            ? 'rgba(22, 163, 74, 0.16)'
                            : 'var(--accent-soft)',
                        color:
                          web3formsKey && web3formsKey !== 'YOUR_WEB3FORMS_ACCESS_KEY'
                            ? '#16a34a'
                            : 'var(--accent)',
                      }}
                    >
                      {web3formsKey && web3formsKey !== 'YOUR_WEB3FORMS_ACCESS_KEY'
                        ? 'Active'
                        : 'Not Configured'}
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--muted)' }}>
                    Connect a free Web3Forms Access Key to automatically forward Speaking &amp; Invitation submissions to{' '}
                    <strong>mithula.thomas@gmail.com</strong> while keeping a backup in Studio Admin.
                  </p>
                </div>

                <div>
                  <label className="block font-mono text-[10px] uppercase mb-1.5" style={{ color: 'var(--muted)' }}>
                    Web3Forms Access Key
                  </label>
                  <input
                    type="text"
                    value={web3formsKeyInput}
                    onChange={(e) => setWeb3formsKeyInput(e.target.value)}
                    placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                    className="w-full rounded-lg border px-3 py-2 font-mono text-xs"
                    style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--ink)' }}
                  />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2">
                  <a
                    href="https://web3forms.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-medium underline underline-offset-2"
                    style={{ color: 'var(--accent)' }}
                  >
                    Get free key at web3forms.com
                    <ExternalLink className="h-3 w-3" />
                  </a>

                  <button
                    type="submit"
                    className="rounded-full px-4 py-2 text-xs font-semibold cursor-pointer"
                    style={{ backgroundColor: 'var(--accent)', color: 'var(--accent-contrast)' }}
                  >
                    Save Access Key
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ====================================================================
          MODAL 1: INTERACTIVE CITATION GENERATOR & WORK DETAILS
          ==================================================================== */}
      {activeWorkModal && (
        <div
          className="fixed inset-0 z-[140] flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs"
          onClick={() => setActiveWorkModal(null)}
        >
          <div
            className="relative w-full max-w-2xl max-h-[88vh] overflow-y-auto rounded-3xl border p-6 sm:p-7 shadow-2xl"
            style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveWorkModal(null)}
              aria-label="Close modal"
              className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full border cursor-pointer"
              style={{ borderColor: 'var(--border)' }}
            >
              <X className="h-4 w-4" />
            </button>

            <div className="flex flex-wrap items-center gap-2 pr-10 mb-3">
              <span
                className="rounded-full px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase"
                style={{ backgroundColor: 'var(--accent-soft)', color: 'var(--accent)' }}
              >
                {activeWorkModal.badge || activeWorkModal.category}
              </span>
              <span className="font-mono text-xs" style={{ color: 'var(--muted)' }}>
                {activeWorkModal.year}
              </span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl font-bold leading-snug mb-2">
              {activeWorkModal.title}
            </h2>

            <p className="text-sm font-medium mb-1" style={{ color: 'var(--accent)' }}>
              {activeWorkModal.venue}
            </p>
            <p className="font-mono text-xs mb-4" style={{ color: 'var(--muted)' }}>
              {activeWorkModal.authors}
            </p>

            <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--muted)' }}>
              {activeWorkModal.summary}
            </p>

            {/* Live Citation Generator (APA / MLA / Chicago / BibTeX) */}
            {(() => {
              const citations = generateCitations(activeWorkModal);
              const currentCite = citations[citationFormat];
              return (
                <div
                  className="rounded-2xl border p-4 mb-5"
                  style={{ backgroundColor: 'var(--surface-2)', borderColor: 'var(--border)' }}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider" style={{ color: 'var(--accent)' }}>
                      <Quote className="h-3.5 w-3.5" />
                      Live Citation Generator
                    </span>
                    <div className="flex gap-1">
                      {['APA', 'MLA', 'Chicago', 'BibTeX'].map((fmt) => (
                        <button
                          key={fmt}
                          type="button"
                          onClick={() => setCitationFormat(fmt)}
                          className="rounded-md px-2.5 py-1 font-mono text-[10px] font-semibold cursor-pointer"
                          style={{
                            backgroundColor: citationFormat === fmt ? 'var(--accent)' : 'var(--surface)',
                            color: citationFormat === fmt ? 'var(--accent-contrast)' : 'var(--ink)',
                          }}
                        >
                          {fmt}
                        </button>
                      ))}
                    </div>
                  </div>
                  <pre className="whitespace-pre-wrap break-words font-mono text-xs leading-relaxed p-3 rounded-xl border mb-3" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
                    {currentCite}
                  </pre>
                  <button
                    type="button"
                    onClick={() => copyText(currentCite, `${citationFormat} citation`)}
                    className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold cursor-pointer"
                    style={{ backgroundColor: 'var(--accent)', color: 'var(--accent-contrast)' }}
                  >
                    <Copy className="h-3.5 w-3.5" />
                    Copy {citationFormat} Citation
                  </button>
                </div>
              );
            })()}

            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t" style={{ borderColor: 'var(--border)' }}>
              <div className="flex flex-wrap gap-1.5">
                {(activeWorkModal.domains || []).map((d) => (
                  <span
                    key={d}
                    className="rounded-full px-2.5 py-1 font-mono text-[10px]"
                    style={{ backgroundColor: 'var(--surface-2)', color: 'var(--muted)' }}
                  >
                    {d}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleEndorse(activeWorkModal.id)}
                  className="inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold cursor-pointer"
                  style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}
                >
                  <Heart className="h-3.5 w-3.5" />
                  Endorse ({endorsements[activeWorkModal.id] || 0})
                </button>
                {activeWorkModal.url && (
                  <a
                    href={activeWorkModal.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold"
                    style={{ backgroundColor: 'var(--accent)', color: 'var(--accent-contrast)' }}
                  >
                    Read Full Text
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ====================================================================
          MODAL 2: GALLERY LIGHTBOX
          ==================================================================== */}
      {lightboxItem && (
        <div
          className="fixed inset-0 z-[140] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
          onClick={() => setLightboxItem(null)}
        >
          <div
            className="relative w-full max-w-3xl overflow-hidden rounded-3xl border shadow-2xl"
            style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setLightboxItem(null)}
              aria-label="Close lightbox"
              className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border backdrop-blur-md cursor-pointer"
              style={{ backgroundColor: 'var(--nav-bg)', borderColor: 'var(--border)' }}
            >
              <X className="h-4 w-4" />
            </button>
            <div className="aspect-[16/10] w-full overflow-hidden">
              {lightboxItem.imageUrl ? (
                <img src={lightboxItem.imageUrl} alt={lightboxItem.title} className="h-full w-full object-cover" />
              ) : (
                <EditorialArtFrame styleType={lightboxItem.artStyle || 'keynote'} tokens={tokens} />
              )}
            </div>
            <div className="p-6">
              <div className="font-mono text-xs mb-1" style={{ color: 'var(--accent)' }}>
                {lightboxItem.category} · {lightboxItem.year}
              </div>
              <h3 className="font-serif text-2xl font-bold mb-1.5">{lightboxItem.title}</h3>
              <p className="text-sm" style={{ color: 'var(--muted)' }}>
                {lightboxItem.caption}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ====================================================================
          MODAL 3: COMMAND PALETTE (Ctrl+K / Cmd+K)
          ==================================================================== */}
      {cmdOpen && (
        <div
          className="fixed inset-0 z-[150] flex items-start justify-center bg-black/55 pt-20 px-4 backdrop-blur-xs"
          onClick={() => setCmdOpen(false)}
        >
          <div
            className="w-full max-w-xl overflow-hidden rounded-2xl border shadow-2xl"
            style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b px-4 py-3" style={{ borderColor: 'var(--border)' }}>
              <Search className="h-4 w-4" style={{ color: 'var(--accent)' }} />
              <input
                type="text"
                autoFocus
                value={cmdQuery}
                onChange={(e) => setCmdQuery(e.target.value)}
                placeholder="Jump to section, search 26+ works, switch themes..."
                className="w-full bg-transparent text-sm focus:outline-none"
                style={{ color: 'var(--ink)' }}
              />
              <button
                type="button"
                onClick={() => setCmdOpen(false)}
                className="font-mono text-[10px] rounded border px-1.5 py-0.5 cursor-pointer"
                style={{ borderColor: 'var(--border)', color: 'var(--muted)' }}
              >
                ESC
              </button>
            </div>
            <div className="max-h-80 overflow-y-auto p-2 space-y-1">
              {commandResults.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    item.action();
                    setCmdOpen(false);
                    setCmdQuery('');
                  }}
                  className="flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left text-xs transition cursor-pointer hover:bg-[var(--surface-2)]"
                >
                  <span className="font-medium truncate">{item.label}</span>
                  <span className="font-mono text-[10px] shrink-0" style={{ color: 'var(--muted)' }}>
                    {item.hint}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ====================================================================
          IN-APP TOAST NOTIFICATION
          ==================================================================== */}
      {toast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[160] inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold shadow-xl"
          style={{
            backgroundColor: 'var(--ink)',
            color: 'var(--bg)',
          }}
        >
          <Check className="h-3.5 w-3.5" />
          <span>{toast}</span>
        </div>
      )}
    </div>
  );
}
