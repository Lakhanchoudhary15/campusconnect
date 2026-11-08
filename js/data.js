const _Fragment=React.Fragment;
const _jsxDEV=(t,p,k,s)=>{const {children,...r}=p;if(k!==undefined)r.key=k;
return children===undefined?React.createElement(t,r):(s&&Array.isArray(children))?React.createElement(t,r,...children):React.createElement(t,r,children)};
const {
  useState,
  useEffect,
  useMemo,
  useRef
} = React;
const CATS = ["Technical", "Cultural", "Workshop", "Competition", "Seminar"];
const COL = {
  Technical: "#0ea5c9",
  Cultural: "#e0559b",
  Workshop: "#e9930c",
  Competition: "#d9503f",
  Seminar: "#7c5ce0"
};
const CLUBS = ["Web & Android Dev Club", "Robotics Society", "Cultural Committee", "Coding Club", "Literary Society"];
const p2 = n => String(n).padStart(2, "0");
const iso = d => `${d.getFullYear()}-${p2(d.getMonth() + 1)}-${p2(d.getDate())}T${p2(d.getHours())}:${p2(d.getMinutes())}`;
const day = (n, h = 10) => {
  const d = new Date();
  d.setDate(d.getDate() + n);
  d.setHours(h, 0, 0, 0);
  return iso(d);
};
const seed = () => [["Hack the Campus", "Technical", "Web & Android Dev Club", "Lab 2, CSE Block", 4, 10, 3, 60, 41, "A 6-hour build sprint where teams ship a working app for a real campus problem. Mentors from final year will review every demo."], ["Intro to Android with Kotlin", "Workshop", "Web & Android Dev Club", "Seminar Hall", 6, 14, 5, 40, 29, "Hands-on session: build and run your first Android app. Bring a laptop with Android Studio installed."], ["Line Follower Showdown", "Competition", "Robotics Society", "Open Arena", 9, 11, 7, 24, 17, "Teams race autonomous bots on a timed track. Bring your own bot; track and batteries are provided."], ["Loktak Nights", "Cultural", "Cultural Committee", "Main Auditorium", 12, 18, 10, 300, 188, "An evening of music, dance and storytelling from across the Northeast, performed by students."], ["Open Source 101", "Seminar", "Coding Club", "Room 105", 5, 16, 4, 80, 80, "How to find a first issue, send a pull request and work with maintainers. Q&A with an open-source contributor."], ["Poetry Under the Stars", "Cultural", "Literary Society", "Central Lawn", 7, 19, 6, 60, 12, "Open mic for poems in English, Hindi and Meiteilon. Sign up to read or just come and listen."], ["DSA Bootcamp", "Workshop", "Coding Club", "Lab 1, CSE Block", 3, 15, 2, 50, 33, "Two hours of pattern-based problem solving for placement season, with a take-home problem set."], ["Quiz Rush", "Competition", "Literary Society", "Room 201", 1, 17, 0, 40, 22, "Fast-paced general knowledge quiz for teams of two. Quick registration closes today."]].map((a, i) => ({
  id: "e" + (i + 1),
  name: a[0],
  cat: a[1],
  club: a[2],
  venue: a[3],
  date: day(a[4], a[5]),
  deadline: day(a[6]).slice(0, 10),
  cap: a[7],
  seed: a[8],
  desc: a[9]
}));
const ld = (k, f) => {
  try {
    const v = localStorage.getItem(k);
    return v ? JSON.parse(v) : f;
  } catch (e) {
    return f;
  }
};
const sv = (k, v) => {
  try {
    localStorage.setItem(k, JSON.stringify(v));
  } catch (e) {}
};
const fd = s => new Date(s).toLocaleDateString("en-IN", {
  weekday: "short",
  day: "numeric",
  month: "short"
});
const ft = s => new Date(s).toLocaleTimeString("en-IN", {
  hour: "numeric",
  minute: "2-digit"
});
const fdl = s => new Date(s + "T12:00").toLocaleDateString("en-IN", {
  day: "numeric",
  month: "short",
  year: "numeric"
});
const regs = (e, mine) => e.seed + (mine.includes(e.id) ? 1 : 0);
const closed = e => new Date(e.deadline + "T23:59:59") < new Date() || new Date(e.date) < new Date();
const stat = (e, mine) => mine.includes(e.id) ? "Registered" : closed(e) ? "Closed" : regs(e, mine) >= e.cap ? "Full" : "Open";
