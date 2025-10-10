"use client";

export default function Footer() {
  // Replace these with actual social media URLs
  const socialLinks = {
    instagram: "https://instagram.com/castleschoolofdancing",
    facebook: "https://facebook.com/castleschoolofdancing",
    youtube: "https://youtube.com/@castleschoolofdancing",
  };

  return (
    <footer className="footer text-center md:text-left">
      <div className="container flex flex-col md:flex-row justify-between items-center gap-4">
        <p>
          © 2025 Castle School of Dancing • Inclusive, friendly lessons for all
          levels.
        </p>
        <div className="flex gap-4 text-caption">
          <a
            href={socialLinks.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
          >
            Instagram
          </a>
          <a
            href={socialLinks.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
          >
            Facebook
          </a>
          <a
            href={socialLinks.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
          >
            YouTube
          </a>
        </div>
      </div>
    </footer>
  );
}
