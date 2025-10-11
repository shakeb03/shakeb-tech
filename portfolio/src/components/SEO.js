import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title = 'Shakeb Ahmed - AI/ML Engineer & Full Stack Developer',
  description = 'Portfolio of Shakeb Ahmed - Specializing in AI/ML, Full Stack Development, and cutting-edge technology solutions.',
  keywords = 'AI, Machine Learning, Full Stack Developer, React, Python, Portfolio',
  author = 'Shakeb Ahmed',
  image = '/logo512.png',
  url = 'https://shakeb-tech.com'
}) => {
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Additional Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#000000" />
      <link rel="canonical" href={url} />
    </Helmet>
  );
};

export default SEO;

