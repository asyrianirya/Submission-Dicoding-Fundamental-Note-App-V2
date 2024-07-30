const notesData = [
  {
    title: 'Welcome to Notes, Dimas!',
    body: 'Welcome to Notes! This is your first note. You can archive it, delete it, or create new ones.',
  },
  {
    title: 'Meeting Agenda',
    body: 'Discuss project updates and assign tasks for the upcoming week.',
  },
  {
    title: 'Shopping List',
    body: 'Milk, eggs, bread, fruits, and vegetables.',
  },
  {
    title: 'Personal Goals',
    body: 'Read two books per month, exercise three times a week, learn a new language.',
  },
  {
    title: 'Recipe: Spaghetti Bolognese',
    body: 'Ingredients: ground beef, tomatoes, onions, garlic, pasta. Steps:...',
  },
  {
    title: 'Workout Routine',
    body: 'Monday: Cardio, Tuesday: Upper body, Wednesday: Rest, Thursday: Lower body, Friday: Cardio.',
  },
  {
    title: 'Book Recommendations',
    body: "1. 'The Alchemist' by Paulo Coelho\n2. '1984' by George Orwell\n3. 'To Kill a Mockingbird' by Harper Lee",
  },
  {
    title: 'Daily Reflections',
    body: 'Write down three positive things that happened today and one thing to improve tomorrow.',
  },
  {
    title: 'Travel Bucket List',
    body: '1. Paris, France\n2. Kyoto, Japan\n3. Santorini, Greece\n4. New York City, USA',
  },
  {
    title: 'Coding Projects',
    body: '1. Build a personal website\n2. Create a mobile app\n3. Contribute to an open-source project',
  },
  {
    title: 'Project Deadline',
    body: 'Complete project tasks by the deadline on October 1st.',
  },
  {
    title: 'Health Checkup',
    body: 'Schedule a routine health checkup with the doctor.',
  },
  {
    title: 'Financial Goals',
    body: '1. Create a monthly budget\n2. Save 20% of income\n3. Invest in a retirement fund.',
  },
  {
    title: 'Holiday Plans',
    body: 'Research and plan for the upcoming holiday destination.',
  },
  {
    title: 'Language Learning',
    body: 'Practice Spanish vocabulary for 30 minutes every day.',
  },
];

class Notes {
  static getNotes() {
    return notesData;
  }
}

export default Notes;
