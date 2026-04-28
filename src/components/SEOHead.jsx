import React from 'react'
import { Helmet } from 'react-helmet-async'

/*
 * SEOHead — Reusable SEO component for every page.
 * Sets title, meta description, keywords, Open Graph, Twitter Card,
 * canonical URL, and optional JSON-LD structured data.
 *
 * TARGET KEYWORDS for Meridian College (Bhubaneswar):
 *   - top colleges in Odisha
 *   - best private colleges in Bhubaneswar
 *   - top 10 colleges in Odisha
 *   - best science college in Bhubaneswar
 *   - +2 science college Bhubaneswar
 *   - +3 science college Bhubaneswar
 *   - best college for PCM PCB in Odisha
 *   - Meridian College Bhubaneswar
 *   - college admission 2026 Odisha
 *   - CHSE affiliated colleges Odisha
 *   - Utkal University affiliated colleges
 *   - top private college BBSR
 *   - best college near Bhubaneswar
 */

const SITE_URL = 'https://meridiancollege.ac.in'
const SITE_NAME = 'Meridian College Bhubaneswar'
const DEFAULT_IMAGE = 'https://res.cloudinary.com/dbmpqbgar/image/upload/v1/meridian/og-image.jpg'

export default function SEOHead({
  title,
  description,
  keywords = '',
  path = '/',
  ogImage = DEFAULT_IMAGE,
  ogType = 'website',
  jsonLd = null,
  noIndex = false,
}) {
  const fullTitle = title.includes('Meridian') ? title : `${title} | ${SITE_NAME}`
  const canonicalUrl = `${SITE_URL}${path}`

  // Base keywords that should appear on every page
  const baseKeywords = 'Meridian College, Meridian College Bhubaneswar, top colleges in Odisha, best private colleges in Bhubaneswar, top 10 colleges in Odisha, best science college Bhubaneswar, +2 science college Bhubaneswar, +3 science college Bhubaneswar, CHSE affiliated colleges Odisha, Utkal University affiliated colleges, college admission 2026 Odisha, best college near Bhubaneswar, top private college BBSR, science college Odisha, best PCM PCB college Odisha, Meridian College BBSR, top college Gangapada Bhubaneswar, private science college Odisha'
  const fullKeywords = keywords ? `${keywords}, ${baseKeywords}` : baseKeywords

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={fullKeywords} />
      <meta name="author" content="Meridian College Bhubaneswar" />
      <meta name="robots" content={noIndex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Geo Meta Tags — Important for local SEO */}
      <meta name="geo.region" content="IN-OR" />
      <meta name="geo.placename" content="Bhubaneswar, Odisha" />
      <meta name="geo.position" content="20.2961;85.8245" />
      <meta name="ICBM" content="20.2961, 85.8245" />

      {/* Language */}
      <meta httpEquiv="content-language" content="en-IN" />
      <html lang="en" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* JSON-LD Structured Data */}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  )
}

/*
 * ============================================================
 *  PRE-BUILT JSON-LD SCHEMAS FOR DIFFERENT PAGE TYPES
 * ============================================================
 */

// Organization Schema — used on HomePage
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "CollegeOrUniversity",
  "name": "Meridian College",
  "alternateName": ["Meridian College Bhubaneswar", "Meridian College BBSR", "Meridian College Odisha", "Meridian College Gangapada"],
  "url": SITE_URL,
  "logo": "https://res.cloudinary.com/dbmpqbgar/image/upload/v1/meridian/logo.png",
  "image": DEFAULT_IMAGE,
  "description": "Meridian College Bhubaneswar is one of the top private science colleges in Odisha, offering +2 Science (PCM & PCB) and +3 Science Honours programmes affiliated to CHSE Odisha & Utkal University. Established in 2011, it is among the best colleges in Bhubaneswar with experienced faculty, smart classrooms, hostels, and JEE/NEET coaching.",
  "foundingDate": "2011",
  "founder": {
    "@type": "Person",
    "name": "Er. Alok Ranjan Mallick",
    "jobTitle": "Chairman"
  },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Bhatkhuri, Gangapada",
    "addressLocality": "Bhubaneswar",
    "addressRegion": "Odisha",
    "postalCode": "752054",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "20.2961",
    "longitude": "85.8245"
  },
  "telephone": ["+91-9437044215", "+91-9777736396", "+91-9040799627"],
  "email": "principalmeridiancollege@gmail.com",
  "sameAs": [
    "https://www.instagram.com/meridian_college_bhubaneswar",
    "https://youtube.com/@meridiancollegebhubaneswar"
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Academic Programmes",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "EducationalOccupationalProgram",
          "name": "+2 Science (PCM)",
          "educationalCredentialAwarded": "Higher Secondary Certificate",
          "timeToComplete": "P2Y",
          "provider": { "@type": "CollegeOrUniversity", "name": "Meridian College Bhubaneswar" }
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "EducationalOccupationalProgram",
          "name": "+2 Science (PCB)",
          "educationalCredentialAwarded": "Higher Secondary Certificate",
          "timeToComplete": "P2Y",
          "provider": { "@type": "CollegeOrUniversity", "name": "Meridian College Bhubaneswar" }
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "EducationalOccupationalProgram",
          "name": "B.Sc. Physics Honours",
          "educationalCredentialAwarded": "Bachelor of Science",
          "timeToComplete": "P3Y",
          "provider": { "@type": "CollegeOrUniversity", "name": "Meridian College Bhubaneswar" }
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "EducationalOccupationalProgram",
          "name": "B.Sc. Chemistry Honours",
          "educationalCredentialAwarded": "Bachelor of Science",
          "timeToComplete": "P3Y",
          "provider": { "@type": "CollegeOrUniversity", "name": "Meridian College Bhubaneswar" }
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "EducationalOccupationalProgram",
          "name": "B.Sc. Mathematics Honours",
          "educationalCredentialAwarded": "Bachelor of Science",
          "timeToComplete": "P3Y",
          "provider": { "@type": "CollegeOrUniversity", "name": "Meridian College Bhubaneswar" }
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "EducationalOccupationalProgram",
          "name": "B.Sc. Computer Science Honours",
          "educationalCredentialAwarded": "Bachelor of Science",
          "timeToComplete": "P3Y",
          "provider": { "@type": "CollegeOrUniversity", "name": "Meridian College Bhubaneswar" }
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "EducationalOccupationalProgram",
          "name": "B.Sc. Botany Honours",
          "educationalCredentialAwarded": "Bachelor of Science",
          "timeToComplete": "P3Y",
          "provider": { "@type": "CollegeOrUniversity", "name": "Meridian College Bhubaneswar" }
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "EducationalOccupationalProgram",
          "name": "B.Sc. Zoology Honours",
          "educationalCredentialAwarded": "Bachelor of Science",
          "timeToComplete": "P3Y",
          "provider": { "@type": "CollegeOrUniversity", "name": "Meridian College Bhubaneswar" }
        }
      }
    ]
  },
  "areaServed": [
    { "@type": "City", "name": "Bhubaneswar" },
    { "@type": "State", "name": "Odisha" }
  ],
  "memberOf": [
    { "@type": "Organization", "name": "Council of Higher Secondary Education (CHSE), Odisha" },
    { "@type": "Organization", "name": "Utkal University, Bhubaneswar" }
  ]
}

// FAQ Schema — for homepage (helps with "People Also Ask" and rich snippets)
export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Is Meridian College one of the top colleges in Odisha?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, Meridian College Bhubaneswar is recognized as one of the top private science colleges in Odisha. Established in 2011, it offers +2 Science (PCM & PCB) and +3 Science Honours programmes affiliated to CHSE Odisha and Utkal University. The college features experienced faculty, smart classrooms, science labs, hostels, and dedicated JEE/NEET coaching."
      }
    },
    {
      "@type": "Question",
      "name": "What courses are offered at Meridian College Bhubaneswar?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Meridian College offers +2 Science (PCM - Physics, Chemistry, Mathematics and PCB - Physics, Chemistry, Biology) affiliated to CHSE Odisha, and +3 Science Honours (B.Sc.) in Physics, Chemistry, Mathematics, Botany, Zoology, and Computer Science affiliated to Utkal University."
      }
    },
    {
      "@type": "Question",
      "name": "Is Meridian College affiliated to any university?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, Meridian College's +2 Science programmes are affiliated to the Council of Higher Secondary Education (CHSE), Odisha, and +3 Science Honours programmes are affiliated to Utkal University, Bhubaneswar — one of the oldest and most prestigious universities in Odisha."
      }
    },
    {
      "@type": "Question",
      "name": "Does Meridian College provide hostel facility?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, Meridian College provides separate hostel facilities for boys and girls. The hostels offer comfortable accommodation, nutritious meals, Wi-Fi, study rooms, and 24/7 security. Students from outside Bhubaneswar can stay in the campus hostels."
      }
    },
    {
      "@type": "Question",
      "name": "How to apply for admission in Meridian College 2026-27?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "To apply for admission in Meridian College for the session 2026-27, you can visit the college campus at Bhatkhuri, Gangapada, Bhubaneswar, or call the admission helpdesk at 9437044215 or 9777736396. You can also fill the online enquiry form on the college website."
      }
    },
    {
      "@type": "Question",
      "name": "Does Meridian College provide JEE and NEET coaching?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, Meridian College offers dedicated JEE coaching for PCM students and NEET coaching for PCB students. The coaching includes regular mock tests, doubt-clearing sessions, study material, and performance analysis by experienced faculty."
      }
    },
    {
      "@type": "Question",
      "name": "Where is Meridian College located in Bhubaneswar?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Meridian College is located at Bhatkhuri, Gangapada, Bhubaneswar – 752054, Odisha. The college is well-connected by road and easily accessible from all parts of Bhubaneswar."
      }
    },
    {
      "@type": "Question",
      "name": "What is the fee structure of Meridian College?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Meridian College offers affordable and transparent fee structures for all its programmes. For detailed fee information for +2 Science and +3 Science Honours courses, please visit the Fee Structure page on the website or contact the admission office at 9437044215."
      }
    },
    {
      "@type": "Question",
      "name": "Is Meridian College a good college for science in Bhubaneswar?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, Meridian College is one of the best science colleges in Bhubaneswar. With 14+ years of excellence, experienced faculty, modern infrastructure, dedicated JEE/NEET coaching, and a strong focus on academic mentoring, it has established itself as a top choice for science education in Odisha."
      }
    },
    {
      "@type": "Question",
      "name": "What are the top 10 private colleges in Bhubaneswar for science?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Meridian College Bhubaneswar is ranked among the top private colleges in Bhubaneswar for science education. It stands out for its dedicated faculty, JEE/NEET coaching, smart classrooms, science labs, hostel facilities, and holistic approach to student development. Affiliations to CHSE Odisha and Utkal University further validate its academic excellence."
      }
    }
  ]
}

// BreadcrumbList helper
export function breadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "name": item.name,
      "item": `${SITE_URL}${item.path}`
    }))
  }
}

// WebPage schema helper
export function webPageSchema({ name, description, path }) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": name,
    "description": description,
    "url": `${SITE_URL}${path}`,
    "isPartOf": {
      "@type": "WebSite",
      "name": SITE_NAME,
      "url": SITE_URL
    },
    "about": {
      "@type": "CollegeOrUniversity",
      "name": "Meridian College Bhubaneswar"
    }
  }
}

// Course (EducationalOccupationalProgram) schema helper
export function courseSchema(course) {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOccupationalProgram",
    "name": course.title,
    "description": course.description,
    "provider": {
      "@type": "CollegeOrUniversity",
      "name": "Meridian College Bhubaneswar",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Bhatkhuri, Gangapada",
        "addressLocality": "Bhubaneswar",
        "addressRegion": "Odisha",
        "postalCode": "752054",
        "addressCountry": "IN"
      }
    },
    "timeToComplete": course.duration.includes('3') ? 'P3Y' : 'P2Y',
    "educationalCredentialAwarded": course.programme.includes('+2') ? 'Higher Secondary Certificate' : 'Bachelor of Science (B.Sc.)',
    "programPrerequisites": course.eligibility,
    "occupationalCategory": course.careerPaths?.join(', '),
    "numberOfCredits": course.seats + ' seats',
    "offers": {
      "@type": "Offer",
      "category": "Tuition",
      "availability": "https://schema.org/InStock",
      "availableAtOrFrom": {
        "@type": "Place",
        "name": "Meridian College Bhubaneswar"
      }
    }
  }
}
