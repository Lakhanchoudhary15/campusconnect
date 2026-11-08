const blank = club => ({
  name: "",
  desc: "",
  club,
  date: "",
  venue: "",
  cat: "Technical",
  deadline: "",
  cap: 50
});
function Form({
  init,
  club,
  onSave,
  onClose,
  minCap
}) {
  const [f, setF] = useState(init || blank(club)),
    [er, setEr] = useState({});
  const set = k => e => setF({
    ...f,
    [k]: e.target.value
  });
  const submit = ev => {
    ev.preventDefault();
    const x = {};
    if (!f.name.trim()) x.name = "Enter an event name";
    if (!f.desc.trim()) x.desc = "Add a short description";
    if (!f.venue.trim()) x.venue = "Enter a venue";
    if (!f.date) x.date = "Pick a date and time";
    if (!f.deadline) x.deadline = "Pick a deadline";else if (f.date && f.deadline > f.date.slice(0, 10)) x.deadline = "Deadline must be on or before the event date";
    if (!(+f.cap >= 1)) x.cap = "Capacity must be at least 1";else if (+f.cap < minCap) x.cap = "Already " + minCap + " registered";
    setEr(x);
    if (!Object.keys(x).length) onSave({
      ...f,
      name: f.name.trim(),
      desc: f.desc.trim(),
      venue: f.venue.trim(),
      cap: +f.cap
    });
  };
  const L = (k, t, inp) => _jsxDEV("label", {
    children: [t, inp, er[k] && _jsxDEV("small", {
      children: er[k]
    }, void 0, false)]
  }, void 0, true);
  return _jsxDEV("div", {
    className: "modal",
    onClick: onClose,
    children: _jsxDEV("form", {
      onClick: e => e.stopPropagation(),
      onSubmit: submit,
      noValidate: true,
      children: [_jsxDEV("h2", {
        children: init ? "Edit event" : "Create event"
      }, void 0, false), _jsxDEV("div", {
        className: "full",
        children: L("name", "Event name", _jsxDEV("input", {
          value: f.name,
          onChange: set("name")
        }, void 0, false))
      }, void 0, false), _jsxDEV("div", {
        className: "full",
        children: L("desc", "Description", _jsxDEV("textarea", {
          rows: "3",
          value: f.desc,
          onChange: set("desc")
        }, void 0, false))
      }, void 0, false), L("club", "Organising club", _jsxDEV("select", {
        value: f.club,
        onChange: set("club"),
        children: CLUBS.map(c => _jsxDEV("option", {
          children: c
        }, c, false))
      }, void 0, false)), L("cat", "Category", _jsxDEV("select", {
        value: f.cat,
        onChange: set("cat"),
        children: CATS.map(c => _jsxDEV("option", {
          children: c
        }, c, false))
      }, void 0, false)), L("date", "Date and time", _jsxDEV("input", {
        type: "datetime-local",
        value: f.date,
        onChange: set("date")
      }, void 0, false)), L("venue", "Venue", _jsxDEV("input", {
        value: f.venue,
        onChange: set("venue")
      }, void 0, false)), L("deadline", "Registration deadline", _jsxDEV("input", {
        type: "date",
        value: f.deadline,
        onChange: set("deadline")
      }, void 0, false)), L("cap", "Maximum participants", _jsxDEV("input", {
        type: "number",
        min: "1",
        value: f.cap,
        onChange: set("cap")
      }, void 0, false)), _jsxDEV("div", {
        className: "full row",
        style: {
          justifyContent: "flex-end"
        },
        children: [_jsxDEV("button", {
          type: "button",
          className: "btn ghost",
          onClick: onClose,
          children: "Discard"
        }, void 0, false), _jsxDEV("button", {
          className: "btn",
          children: init ? "Save changes" : "Publish event"
        }, void 0, false)]
      }, void 0, true)]
    }, void 0, true)
  }, void 0, false);
}
