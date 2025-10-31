import React, { useEffect, useState } from "react";

const CALENDAR_BASE_URL = "https://calendar.google.com/calendar/embed?src=nickbinmoredancing%40gmail.com&ctz=Europe/London";

function getCalendarSrc(isMobile: boolean) {
  return isMobile
    ? `${CALENDAR_BASE_URL}&mode=AGENDA`
    : `${CALENDAR_BASE_URL}&mode=MONTH`;
}

export default function CalendarEmbed() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check on mount and on resize
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const src = getCalendarSrc(isMobile);

  return (
    <div className="w-full flex justify-center py-4">
      <iframe
        title="Google Calendar"
        src={src}
        style={{ border: 0 }}
        width="100%"
        height={isMobile ? 600 : 800}
        className="rounded-lg shadow-md bg-white"
        allowFullScreen
      ></iframe>
    </div>
  );
}
