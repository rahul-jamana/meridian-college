const CLOUD = 'dbmpqbgar';
// Cache-bust version — unique per build
const V = import.meta.env.VITE_BUILD_TIME || Date.now().toString();

const heroSlides = [
  { type: 'image', cloudinaryId: 'meridian/hero/hero_01', title: 'Meridian College Campus' },
  { type: 'video', cloudinaryId: 'meridian/hero/hero_video_7', title: 'Campus Life at Meridian' },
  { type: 'image', cloudinaryId: 'meridian/hero/hero_02', title: 'Chemistry Lab Session' },
  { type: 'image', cloudinaryId: 'meridian/hero/hero_03', title: 'Classroom Learning' },
  { type: 'image', cloudinaryId: 'meridian/hero/hero_04', title: 'Student Assembly' },
  { type: 'image', cloudinaryId: 'meridian/hero/hero_05', title: 'Group Photo with Faculty' },
  { type: 'image', cloudinaryId: 'meridian/hero/hero_06', title: 'Biology Lab Practical' },
];

const notifications = [
  { date: '25 Apr 2026', text: 'Admissions Open for 2026–27 Session — Apply Now!' },
  { date: '20 Apr 2026', text: '+2 Science & +3 Science Seats Filling Fast' },
  { date: '15 Apr 2026', text: 'JEE/NEET Coaching Registrations Open for New Batch' },
  { date: '10 Apr 2026', text: 'Hostel Admissions Open for Boys & Girls' },
];

const events = [
  { date: '15 Jun 2026', text: 'New Session Begins — Orientation Programme' },
  { date: '01 Jul 2026', text: 'Science Exhibition 2026' },
  { date: '15 Aug 2026', text: 'Independence Day Celebration' },
  { date: '05 Sep 2026', text: 'Teachers Day — Faculty Felicitation' },
];

const galleryImages = [
  { cloudinaryId: 'meridian/photo_008', title: 'Campus Building View', category: 'Campus' },
  { cloudinaryId: 'meridian/photo_009', title: 'Campus Courtyard', category: 'Campus' },
  { cloudinaryId: 'meridian/photo_010', title: 'College Building', category: 'Campus' },
  { cloudinaryId: 'meridian/photo_011', title: 'Campus Walkway', category: 'Campus' },
  { cloudinaryId: 'meridian/photo_001', title: 'Cricket Team', category: 'Sports' },
  { cloudinaryId: 'meridian/photo_002', title: 'Cricket Team Photo', category: 'Sports' },
  { cloudinaryId: 'meridian/photo_003', title: 'Volleyball Match', category: 'Sports' },
  { cloudinaryId: 'meridian/photo_004', title: 'Sports Team', category: 'Sports' },
  { cloudinaryId: 'meridian/photo_005', title: 'Thunder Warriors Team', category: 'Sports' },
  { cloudinaryId: 'meridian/photo_006', title: 'Golden Bulls Team', category: 'Sports' },
  { cloudinaryId: 'meridian/photo_007', title: 'Sports Day Celebration', category: 'Sports' },
  { cloudinaryId: 'meridian/photo_012', title: 'Students at Admission Desk', category: 'Students' },
  { cloudinaryId: 'meridian/photo_045', title: 'Students & Faculty Group', category: 'Students' },
  { cloudinaryId: 'meridian/photo_050', title: 'Student Group Photo', category: 'Students' },
  { cloudinaryId: 'meridian/photo_051', title: 'Students Together', category: 'Students' },
  { cloudinaryId: 'meridian/photo_053', title: 'Student Life', category: 'Students' },
  { cloudinaryId: 'meridian/photo_054', title: 'Students at Campus', category: 'Students' },
  { cloudinaryId: 'meridian/photo_056', title: 'Students in Uniform', category: 'Students' },
  { cloudinaryId: 'meridian/photo_057', title: 'Student Gathering', category: 'Students' },
  { cloudinaryId: 'meridian/photo_058', title: 'Student Assembly', category: 'Students' },
  { cloudinaryId: 'meridian/photo_059', title: 'Student Life at Meridian', category: 'Students' },
  { cloudinaryId: 'meridian/photo_066', title: 'All Students Group Photo', category: 'Students' },
  { cloudinaryId: 'meridian/photo_067', title: 'Student Body', category: 'Students' },
  { cloudinaryId: 'meridian/photo_068', title: 'Students Standing', category: 'Students' },
  { cloudinaryId: 'meridian/photo_069', title: 'Batch Photo', category: 'Students' },
  { cloudinaryId: 'meridian/photo_013', title: 'Faculty & Students', category: 'Faculty' },
  { cloudinaryId: 'meridian/photo_014', title: 'Faculty Group Photo', category: 'Faculty' },
  { cloudinaryId: 'meridian/photo_015', title: 'Staff Meeting', category: 'Faculty' },
  { cloudinaryId: 'meridian/photo_070', title: 'Faculty Members', category: 'Faculty' },
  { cloudinaryId: 'meridian/photo_071', title: 'Faculty & Staff', category: 'Faculty' },
  { cloudinaryId: 'meridian/photo_072', title: 'Team Meridian', category: 'Faculty' },
  { cloudinaryId: 'meridian/photo_075', title: 'Teaching Session', category: 'Faculty' },
  { cloudinaryId: 'meridian/photo_016', title: 'Chemistry Lab', category: 'Lab' },
  { cloudinaryId: 'meridian/photo_017', title: 'Lab Practical Session', category: 'Lab' },
  { cloudinaryId: 'meridian/photo_018', title: 'Physics Lab', category: 'Lab' },
  { cloudinaryId: 'meridian/photo_019', title: 'Students in Lab', category: 'Lab' },
  { cloudinaryId: 'meridian/photo_020', title: 'Lab Equipment', category: 'Lab' },
  { cloudinaryId: 'meridian/photo_021', title: 'Practical Class', category: 'Lab' },
  { cloudinaryId: 'meridian/photo_022', title: 'Science Experiment', category: 'Lab' },
  { cloudinaryId: 'meridian/photo_023', title: 'Classroom Session', category: 'Classroom' },
  { cloudinaryId: 'meridian/photo_024', title: 'Lecture in Progress', category: 'Classroom' },
  { cloudinaryId: 'meridian/photo_025', title: 'Teaching Moment', category: 'Classroom' },
  { cloudinaryId: 'meridian/photo_026', title: 'Students in Classroom', category: 'Classroom' },
  { cloudinaryId: 'meridian/photo_027', title: 'Whiteboard Teaching', category: 'Classroom' },
  { cloudinaryId: 'meridian/photo_028', title: 'Interactive Session', category: 'Classroom' },
  { cloudinaryId: 'meridian/photo_029', title: 'Study Environment', category: 'Classroom' },
  { cloudinaryId: 'meridian/photo_030', title: 'Exam Preparation', category: 'Classroom' },
  { cloudinaryId: 'meridian/photo_060', title: 'Biology Teaching', category: 'Classroom' },
  { cloudinaryId: 'meridian/photo_009', title: 'Campus Courtyard', category: 'Campus' },
  { cloudinaryId: 'meridian/photo_031', title: 'Cultural Program', category: 'Cultural' },
  { cloudinaryId: 'meridian/photo_032', title: 'Event Celebration', category: 'Cultural' },
  { cloudinaryId: 'meridian/photo_033', title: 'Campus Festival', category: 'Cultural' },
  { cloudinaryId: 'meridian/photo_034', title: 'Cultural Activity', category: 'Cultural' },
  { cloudinaryId: 'meridian/photo_035', title: 'Annual Function', category: 'Cultural' },
  { cloudinaryId: 'meridian/photo_036', title: 'Stage Program', category: 'Cultural' },
  { cloudinaryId: 'meridian/photo_037', title: 'Student Performance', category: 'Cultural' },
  { cloudinaryId: 'meridian/photo_038', title: 'Spiritual Corner', category: 'Cultural' },
  { cloudinaryId: 'meridian/photo_039', title: 'Cultural Day', category: 'Cultural' },
  { cloudinaryId: 'meridian/photo_040', title: 'Prize Distribution', category: 'Cultural' },
  { cloudinaryId: 'meridian/photo_041', title: 'Event Moment', category: 'Cultural' },
  { cloudinaryId: 'meridian/photo_042', title: 'College Celebration', category: 'Cultural' },
  { cloudinaryId: 'meridian/photo_043', title: 'Function Day', category: 'Cultural' },
  { cloudinaryId: 'meridian/photo_044', title: 'Festive Moment', category: 'Cultural' },
  { cloudinaryId: 'meridian/photo_046', title: 'Event Photo', category: 'Cultural' },
  { cloudinaryId: 'meridian/photo_047', title: 'Group Activity', category: 'Cultural' },
  { cloudinaryId: 'meridian/photo_048', title: 'College Event', category: 'Cultural' },
  { cloudinaryId: 'meridian/photo_049', title: 'Celebration Moment', category: 'Cultural' },
  { cloudinaryId: 'meridian/photo_052', title: 'Event Gathering', category: 'Cultural' },
  { cloudinaryId: 'meridian/photo_055', title: 'Campus Moment', category: 'Cultural' },
  { cloudinaryId: 'meridian/photo_061', title: 'College Program', category: 'Cultural' },
  { cloudinaryId: 'meridian/photo_062', title: 'Annual Day', category: 'Cultural' },
  { cloudinaryId: 'meridian/photo_063', title: 'Farewell Day', category: 'Cultural' },
  { cloudinaryId: 'meridian/photo_064', title: 'Special Program', category: 'Cultural' },
  { cloudinaryId: 'meridian/photo_065', title: 'Ceremony', category: 'Cultural' },
  { cloudinaryId: 'meridian/photo_073', title: 'College Gathering', category: 'Cultural' },
  { cloudinaryId: 'meridian/photo_074', title: 'Event Day', category: 'Cultural' },
  { cloudinaryId: 'meridian/photo_076', title: 'Assembly', category: 'Cultural' },
  { cloudinaryId: 'meridian/photo_077', title: 'Special Occasion', category: 'Cultural' },
  { cloudinaryId: 'meridian/photo_078', title: 'Function at Campus', category: 'Cultural' },
  { cloudinaryId: 'meridian/photo_079', title: 'Event Photo', category: 'Cultural' },
  { cloudinaryId: 'meridian/photo_081', title: 'Campus Event', category: 'Cultural' },
  { cloudinaryId: 'meridian/photo_082', title: 'College Moment', category: 'Cultural' }
];

export const DEFAULT_HERO_MEDIA = heroSlides.map((i, idx) => ({
  id: `h${idx}`,
  url: i.type === "video" ?
    `https://res.cloudinary.com/${CLOUD}/video/upload/q_auto/v${V}/${i.cloudinaryId}` :
    `https://res.cloudinary.com/${CLOUD}/image/upload/f_auto,q_auto,w_1920,c_fill,g_auto/v${V}/${i.cloudinaryId}`,
  title: i.title,
  type: i.type || 'image'
}));

export const DEFAULT_GALLERY = galleryImages.map((i, idx) => ({
  id: `g${idx}`,
  url: `https://res.cloudinary.com/${CLOUD}/image/upload/f_auto,q_auto,w_1920,c_fill,g_auto/v${V}/${i.cloudinaryId}`,
  title: i.title,
  category: i.category,
  type: 'image'
}));

export const DEFAULT_NEWS = notifications.map((n, idx) => ({ id: `n${idx}`, date: n.date, text: n.text }));
export const DEFAULT_EVENTS = events.map((e, idx) => ({ id: `e${idx}`, date: e.date, text: e.text }));

export const DEFAULT_ACHIEVERS = [
  { 
    id: '1', 
    name: 'Rahul Sharma', 
    title: 'Top Scorer - Science (98%)', 
    description: 'Rahul achieved the highest aggregate score in the state board examinations, setting a new benchmark in Physics and Mathematics. He has been awarded a full scholarship for higher studies.',
    url: '/achievers/achiever_1.png' 
  },
  { 
    id: '2', 
    name: 'Priya Das', 
    title: 'National Level Debater', 
    description: 'Priya secured the first position at the National Inter-College Debate Championship. Her exceptional oratory skills have brought immense pride to Meridian College.',
    url: '/achievers/achiever_2.png' 
  },
  { 
    id: '3', 
    name: 'Amit Kumar', 
    title: 'Best Science Project', 
    description: 'Amit won the gold medal at the National Science Fair for his innovative project on renewable energy solutions, demonstrating exceptional practical skills in the lab.',
    url: '/achievers/achiever_3.png' 
  },
  { 
    id: '4', 
    name: 'Sneha Patel', 
    title: 'State Athletics Champion', 
    description: 'Sneha clinched two gold medals in the 100m and 200m sprints at the State University Games, proving her dedication and discipline both on and off the track.',
    url: '/achievers/achiever_4.png' 
  },
  { 
    id: '5', 
    name: 'Vikram Singh', 
    title: 'Student Council President', 
    description: 'Vikram demonstrated outstanding leadership by organizing three major national-level symposiums at Meridian College, fostering an incredible community spirit.',
    url: '/achievers/achiever_5.png' 
  },
];

export const DEFAULT_VISION_MISSION = {
  hero: {
    label: "Our Core Philosophy",
    title: "Vision & Mission",
    tagline: "We don't just teach syllabus; we build careers, shape character, and transform young minds into confident future leaders.",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2000&auto=format&fit=crop"
  },
  treatment: {
    label: "Personalized Mentorship",
    title: "How We Treat Our Students",
    content: "At Meridian College, every student is treated as a unique individual with immense potential. We move beyond traditional rote learning to provide a nurturing environment where students feel valued, heard, and deeply supported.",
    image: "/vision/mentorship.png",
    points: [
      "One-on-one doubt clearing sessions with expert faculty.",
      "Psychological and academic counseling to reduce exam stress.",
      "Treating students as young adults, fostering mutual respect.",
      "Identifying unique strengths and tailoring guidance accordingly."
    ]
  },
  expectations: {
    title: "What We Expect From You",
    content: "Excellence is a two-way street. While we provide the absolute best facilities, renowned faculty, and cutting-edge resources, we expect our students to bring their dedication to the table.",
    items: [
      {
        title: "Utmost Dedication",
        desc: "A strong commitment to attending classes regularly, completing assignments, and putting in the hard work required for competitive exams like JEE & NEET."
      },
      {
        title: "Strict Discipline",
        desc: "Maintaining decorum, respecting peers and faculty, and adhering to the ethical standards that define a Meridian College student."
      },
      {
        title: "Curiosity to Learn",
        desc: "Asking questions, participating in lab experiments enthusiastically, and never settling for just memorizing the textbook."
      }
    ]
  },
  transformation: {
    title: "The Complete Transformation",
    content1: "When a student walks through our doors after their 10th boards, they are often uncertain about the future. By the time they graduate from Meridian College, they are entirely transformed.",
    content2: "We bridge the critical gap between school education and professional success. Our integrated CHSE + Entrance coaching ensures that our students don't just pass exams—they conquer national level competitive tests with top ranks.",
    image: `https://res.cloudinary.com/${CLOUD}/image/upload/f_auto,q_auto,w_800/v${V}/meridian/photo_024`,
    card1: {
      title: "From Doubt to Confidence",
      desc: "We build intellectual independence, transforming hesitant teenagers into decisive, sharp, and highly capable young adults ready for top-tier universities."
    },
    card2: {
      title: "From Rote Learning to Deep Concept",
      desc: "Our cutting-edge laboratories and digital classrooms shift the focus from memorization to practical, analytical, and applied scientific thinking."
    }
  }
};

export const DEFAULT_FEES = [
  {
    id: 'f1',
    course: '+2 Science',
    details: 'Comprehensive integrated package including academic tuition and residential facilities.',
    structure: [
      { year: 'Annual Fee', amount: '₹90,000', note: 'Includes Tuition + Hostel' }
    ],
    features: ['Integrated Entrance Coaching', 'Smart Classrooms', 'AC/Non-AC Hostel Options', '24/7 Academic Support']
  },
  {
    id: 'f2',
    course: '+3 Science (Honours)',
    details: 'Quality higher education with affordable tuition fees across all four years.',
    structure: [
      { year: '1st Year', amount: '₹30,000', note: 'Tuition Fee' },
      { year: '2nd Year', amount: '₹20,000', note: 'Tuition Fee' },
      { year: '3rd Year', amount: '₹20,000', note: 'Tuition Fee' },
      { year: '4th Year', amount: '₹20,000', note: 'Tuition Fee' }
    ],
    features: ['Expert Faculty', 'Modern Labs', 'Industrial Visits', 'Career Placement Cell']
  }
];
