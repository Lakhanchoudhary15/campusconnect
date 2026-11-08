const SUN = '<svg class="ic ic-sun" viewBox="0 0 512 512" width="22" height="22" aria-hidden="true"><circle cx="256" cy="256" r="97" fill="currentColor"/><g stroke="currentColor" stroke-width="40" stroke-linecap="round"><path d="M256 65v42M256 405v42M65 256h42M405 256h42M119 119l30 30M363 363l30 30M393 119l-30 30M149 363l-30 30"/></g></svg>';
const MOON = '<svg class="ic ic-moon" viewBox="0 0 512 512" width="22" height="22" aria-hidden="true"><path d="M322 3A258 258 0 1 0 497 368A205 205 0 0 1 322 3Z" fill="currentColor"/></svg>';
const DEMO = {
  name: "Lakhan Choudhary",
  roll: "2024CSE001",
  branch: "CSE",
  year: "2nd year"
};
const BRANCHES = ["CSE", "ECE", "ME", "Other"];
const YEARS = ["1st year", "2nd year", "3rd year", "4th year"];
const FN = ["Aarav", "Ngangbam", "Priya", "Rohan", "Ibomcha", "Sneha", "Karan", "Meera", "Thoiba", "Anjali", "Vikram", "Pooja", "Joseph", "Riya", "Sanjay", "Lamnunthem", "Aditya", "Nisha", "Bijoy", "Kavya"];
const LN = ["Singh", "Devi", "Sharma", "Meitei", "Khan", "Kumar", "Thokchom", "Gupta", "Yumnam", "Das", "Nongmaithem", "Rao"];
const hashN = s => {
  let x = 0;
  for (const c of s) x = x * 31 + c.charCodeAt(0) >>> 0;
  return x;
};
const fakeRegs = e => {
  const b = hashN(e.id);
  return Array.from({
    length: e.seed
  }, (_, i) => {
    const n = b + i * 7919,
      br = BRANCHES[n % 3];
    return {
      name: FN[n % FN.length] + " " + LN[(n >> 3) % LN.length],
      roll: 2022 + i % 4 + br + String((i * 7 + 3) % 150 + 1).padStart(3, "0"),
      branch: br,
      year: YEARS[i % 4]
    };
  });
};
const checkP = f => {
  const x = {};
  if (f.name.trim().length < 2) x.name = "Enter your full name";
  if (f.roll.trim().length < 4) x.roll = "Enter your roll number";
  return x;
};
const clean = f => ({
  ...f,
  name: f.name.trim(),
  roll: f.roll.trim().toUpperCase()
});
function Fields({
  f,
  setF,
  er,
  children
}) {
  const set = k => e => setF({
    ...f,
    [k]: e.target.value
  });
  const L = (k, t, inp) => React.createElement("label", null, t, inp, er[k] && React.createElement("small", null, er[k]));
  return React.createElement(React.Fragment, null, React.createElement("div", {
    className: "full"
  }, L("name", "Full name", React.createElement("input", {
    value: f.name,
    onChange: set("name"),
    autoComplete: "name"
  }))), L("roll", "Roll number", React.createElement("input", {
    value: f.roll,
    onChange: set("roll"),
    placeholder: "e.g. 2024CSE001"
  })), L("branch", "Branch", React.createElement("select", {
    value: f.branch,
    onChange: set("branch")
  }, BRANCHES.map(b => React.createElement("option", {
    key: b
  }, b)))), L("year", "Year", React.createElement("select", {
    value: f.year,
    onChange: set("year")
  }, YEARS.map(b => React.createElement("option", {
    key: b
  }, b)))), children);
}
