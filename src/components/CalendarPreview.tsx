import calendarImage from "@/assets/calendar-preview.png";

const CalendarPreview = () => {
  return (
    <section className="py-12 px-6">
      <div className="container max-w-4xl mx-auto">
        <div className="rounded-3xl overflow-hidden shadow-card w-3/4 mx-auto">
          <img 
            src={calendarImage} 
            alt="Calendar preview showing October 2025 with emoji tracking for special moments"
            className="w-full h-auto"
          />
        </div>
      </div>
    </section>
  );
};

export default CalendarPreview;
