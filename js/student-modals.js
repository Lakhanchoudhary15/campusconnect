function Welcome({
  onSave
}) {
  const [f, setF] = useState({
      name: "",
      roll: "",
      branch: "CSE",
      year: "1st year"
    }),
    [er, setEr] = useState({});
  const submit = ev => {
    ev.preventDefault();
    const x = checkP(f);
    setEr(x);
    if (!Object.keys(x).length) onSave(clean(f));
  };
  return React.createElement("div", {
    className: "wrap"
  }, React.createElement("form", {
    className: "panelbox welcome",
    onSubmit: submit,
    noValidate: true
  }, React.createElement("h1", null, "Welcome to CampusConnect"), React.createElement("p", null, "Create your student profile once. We use it to fill in your registrations and tickets."), React.createElement("div", {
    className: "fgrid"
  }, React.createElement(Fields, {
    f: f,
    setF: setF,
    er: er
  })), React.createElement("div", {
    className: "row"
  }, React.createElement("button", {
    className: "btn"
  }, "Continue"), React.createElement("button", {
    type: "button",
    className: "btn ghost",
    onClick: () => onSave(DEMO)
  }, "Use demo profile"))));
}
function ProfileModal({
  me,
  onSave,
  onSignOut,
  onClose
}) {
  const [f, setF] = useState(me),
    [er, setEr] = useState({});
  const submit = ev => {
    ev.preventDefault();
    const x = checkP(f);
    setEr(x);
    if (!Object.keys(x).length) onSave(clean(f));
  };
  return React.createElement("div", {
    className: "modal",
    onClick: onClose
  }, React.createElement("form", {
    onClick: e => e.stopPropagation(),
    onSubmit: submit,
    noValidate: true
  }, React.createElement("h2", null, "My profile"), React.createElement(Fields, {
    f: f,
    setF: setF,
    er: er
  }), React.createElement("div", {
    className: "full row",
    style: {
      justifyContent: "space-between"
    }
  }, React.createElement("button", {
    type: "button",
    className: "btn bad",
    onClick: onSignOut
  }, "Sign out"), React.createElement("div", {
    className: "row"
  }, React.createElement("button", {
    type: "button",
    className: "btn ghost",
    onClick: onClose
  }, "Close"), React.createElement("button", {
    className: "btn"
  }, "Save changes")))));
}
function RegForm({
  e,
  me,
  onSubmit,
  onClose
}) {
  const [f, setF] = useState({
      ...me,
      phone: ""
    }),
    [er, setEr] = useState({});
  const submit = ev => {
    ev.preventDefault();
    const x = checkP(f);
    if (f.phone && !/^\d{10}$/.test(f.phone.replace(/\s/g, ""))) x.phone = "Enter a 10-digit number";
    setEr(x);
    if (!Object.keys(x).length) onSubmit(clean(f));
  };
  return React.createElement("div", {
    className: "modal",
    onClick: onClose
  }, React.createElement("form", {
    onClick: ev => ev.stopPropagation(),
    onSubmit: submit,
    noValidate: true
  }, React.createElement("h2", null, "Register for ", e.name), React.createElement("p", {
    className: "full sub"
  }, fd(e.date), ", ", ft(e.date), " · ", e.venue), React.createElement(Fields, {
    f: f,
    setF: setF,
    er: er
  }, React.createElement("label", {
    className: "full"
  }, "Phone (optional)", React.createElement("input", {
    type: "tel",
    inputMode: "numeric",
    placeholder: "10-digit mobile number",
    value: f.phone,
    onChange: ev => setF({
      ...f,
      phone: ev.target.value
    })
  }), er.phone && React.createElement("small", null, er.phone))), React.createElement("div", {
    className: "full row end"
  }, React.createElement("button", {
    type: "button",
    className: "btn ghost",
    onClick: onClose
  }, "Not now"), React.createElement("button", {
    className: "btn"
  }, "Confirm registration"))));
}
function Ticket({
  r,
  e,
  onClose,
  go
}) {
  if (!e) return null;
  const D = (t, v) => React.createElement("div", null, React.createElement("span", null, t), React.createElement("b", null, v));
  return React.createElement("div", {
    className: "modal",
    onClick: onClose
  }, React.createElement("div", {
    className: "confirm ticket",
    role: "dialog",
    "aria-modal": "true",
    onClick: ev => ev.stopPropagation()
  }, React.createElement("div", {
    className: "tk-top"
  }, React.createElement("small", null, "You’re registered"), React.createElement("h2", null, e.name), React.createElement("span", null, e.club)), React.createElement("div", {
    className: "tk-mid"
  }, D("Date", fd(e.date)), D("Time", ft(e.date)), D("Venue", e.venue), D("Ticket ID", r.id), D("Attendee", r.name), D("Roll number", r.roll)), React.createElement("div", {
    className: "tk-act row end"
  }, React.createElement("button", {
    className: "btn ghost",
    onClick: onClose
  }, "Done"), React.createElement("button", {
    className: "btn",
    onClick: () => {
      onClose();
      go("mine");
    }
  }, "View my events"))));
}
function RegistrantsModal({
  e,
  own,
  onClose
}) {
  const list = [...own.map(r => ({
    ...r,
    you: 1
  })), ...fakeRegs(e)];
  return React.createElement("div", {
    className: "modal",
    onClick: onClose
  }, React.createElement("div", {
    className: "confirm wide",
    role: "dialog",
    "aria-modal": "true",
    onClick: ev => ev.stopPropagation()
  }, React.createElement("h2", null, e.name, ": registrants"), React.createElement("p", null, list.length, " of ", e.cap, " seats taken"), React.createElement("div", {
    className: "reglist"
  }, list.length ? list.map((r, i) => React.createElement("div", {
    className: "regrow",
    key: i
  }, React.createElement("span", null, i + 1, ". ", r.name, r.you && React.createElement("b", {
    className: "you"
  }, "You")), React.createElement("span", null, r.roll), React.createElement("span", null, r.branch, ", ", r.year))) : React.createElement("div", {
    className: "empty"
  }, "No one has registered yet.")), React.createElement("div", {
    className: "row end"
  }, React.createElement("button", {
    className: "btn ghost",
    onClick: onClose
  }, "Close"))));
}
