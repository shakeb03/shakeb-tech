export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Shakebuddin Mohammed",
    "alternateName": ["Shakeb Mohammed", "Shakeb", "Shakebuddin", "Mohammed Shakebuddin"],
    "jobTitle": "Full-Stack Engineer × Creative Technologist",
    "description": "Building the future with AI-powered systems, immersive 3D experiences, and distributed architectures. Expert in React, Next.js, TypeScript, and 3D web development.",
    "url": "https://shakeb.tech",
    "image": "https://shakeb.tech/og-image.jpg",
    "sameAs": [
      "https://github.com/shakeb03",
      "https://linkedin.com/in/shakeb"
    ],
    "knowsAbout": [
      "Full Stack Development",
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Node.js",
      "Supabase",
      "Three.js",
      "WebGL",
      "3D Graphics",
      "Artificial Intelligence",
      "Machine Learning",
      "Distributed Systems",
      "Creative Technology",
      "Frontend Development",
      "Backend Development",
      "Database Design",
      "API Development",
      "Web Development",
      "Software Engineering",
      "Creative Coding",
      "Interactive Design",
      "Real-time Applications",
      "Progressive Web Apps",
      "Responsive Design",
      "Performance Optimization",
      "Cloud Computing",
      "DevOps",
      "Version Control",
      "Agile Development"
    ],
    "hasOccupation": {
      "@type": "Occupation",
      "name": "Full-Stack Engineer",
      "description": "Specializing in AI-powered systems, immersive 3D experiences, and distributed architectures. Expert in modern web technologies and creative problem-solving.",
      "occupationLocation": {
        "@type": "Place",
        "name": "Remote/Global"
      }
    },
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "Northeastern University" // Replace with your actual university
    },
    "worksFor": {
      "@type": "Organization",
      "name": "Freelance/Independent"
    },
    "award": [
      "Full-Stack Engineer",
      "Creative Technologist",
      "AI Developer",
      "3D Web Developer"
    ],
    "hasCredential": [
      "React Developer",
      "Next.js Expert",
      "TypeScript Specialist",
      "Three.js Developer",
      "Supabase Developer"
    ],
    "memberOf": [
    ],
    "seeks": "Full-time opportunities, freelance projects, consulting work, creative collaborations",
    "availableForWork": true,
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Professional",
      "url": "https://shakeb.tech/#contact"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
