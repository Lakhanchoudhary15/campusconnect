function App() {
  const [events, setEvents] = useState(() => ld("cc_ev", null) || seed());
  const [regList, setRegList] = useState(() => ld("cc_regs", []));
  const [me, setMe] = useState(() => ld("cc_me", null));
  const [club, setClub] = useState(() => ld("cc_club", CLUBS[0]));
  const [h, setH] = useState(() => location.hash.slice(1) || "home");
  const [toast, setToast] = useState(null),
    [ask, setAsk] = useState(null),
    [ticket, setTicket] = useState(null),
    [prof, setProf] = useState(false),
    [rv, setRv] = useState(null);
  const [theme, setTheme] = useState(() => ld("cc_theme", null) || (window.matchMedia && matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"));
  const mine = regList.map(r => r.eid);
  useEffect(() => sv("cc_ev", events), [events]);
  useEffect(() => sv("cc_regs", regList), [regList]);
  useEffect(() => sv("cc_me", me), [me]);
  useEffect(() => sv("cc_club", club), [club]);
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    sv("cc_theme", theme);
  }, [theme]);
  useEffect(() => {
    const f = () => {
      setH(location.hash.slice(1) || "home");
      window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", f);
    return () => window.removeEventListener("hashchange", f);
  }, []);
  const go = r => {
    location.hash = r;
  };
  const say = (msg, err) => {
    setToast({
      msg,
      err
    });
    clearTimeout(say.t);
    say.t = setTimeout(() => setToast(null), 2800);
  };
  const reg = e => setAsk({
      t: "reg",
      e
    }),
    unreg = e => setAsk({
      t: "unreg",
      e
    }),
    cancelEv = e => setAsk({
      t: "cancelEv",
      e
    });
  const submitReg = f => {
    const e = ask.e;
    if (mine.includes(e.id)) return say("You’re already registered for this event", 1);
    if (stat(e, mine) !== "Open") return say("Registration isn’t available", 1);
    const rec = {
      id: "CC-" + Date.now().toString(36).toUpperCase().slice(-5),
      eid: e.id,
      name: f.name,
      roll: f.roll,
      branch: f.branch,
      year: f.year,
      phone: f.phone || ""
    };
    setRegList([...regList, rec]);
    setMe({
      name: f.name,
      roll: f.roll,
      branch: f.branch,
      year: f.year
    });
    setAsk(null);
    setTicket(rec);
    say("Registered for " + e.name);
  };
  const confirm = () => {
    const a = ask;
    setAsk(null);
    if (a.t === "unreg") {
      setRegList(regList.filter(r => r.eid !== a.e.id));
      say("Registration cancelled for " + a.e.name);
    } else {
      setEvents(events.filter(x => x.id !== a.e.id));
      setRegList(regList.filter(r => r.eid !== a.e.id));
      say("Event cancelled: " + a.e.name);
    }
  };
  const save = (f, id) => {
    if (id) {
      setEvents(events.map(e => e.id === id ? {
        ...e,
        ...f
      } : e));
      say("Event updated");
    } else {
      setEvents([...events, {
        ...f,
        id: "e" + Date.now(),
        seed: 0
      }]);
      say("Event created and live for students");
    }
  };
  const org = h === "org",
    ev = h.startsWith("event-") ? events.find(e => e.id === h.slice(6)) : null;
  const first = me ? me.name.split(" ")[0] : "",
    ini = me ? me.name.split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase() : "";
  const copy = {
    unreg: ["Cancel your registration?", a => "You’ll lose your seat at " + a.name + ". You can register again if seats are left.", "Keep my seat", "Yes, cancel registration"],
    cancelEv: ["Cancel this event?", a => "“" + a.name + "” will be removed for everyone and its registrations will be deleted.", "Keep event", "Yes, cancel event"]
  };
  const cp = ask && ask.t !== "reg" ? copy[ask.t] : null;
  let page;
  if (org) page = React.createElement(Organizer, {
    events: events,
    mine: mine,
    club: club,
    setClub: setClub,
    save: save,
    onRegs: e => setRv(e.id),
    onCancel: cancelEv
  });else if (!me) page = React.createElement(Welcome, {
    onSave: setMe
  });else if (h === "mine") page = React.createElement(Mine, {
    events: events,
    mine: mine,
    go: go
  });else if (h.startsWith("event-")) page = React.createElement(Details, {
    e: ev,
    mine: mine,
    reg: reg,
    unreg: unreg,
    go: go,
    myReg: ev && regList.find(r => r.eid === ev.id),
    viewTicket: setTicket
  });else page = React.createElement(Dashboard, {
    events: events,
    mine: mine,
    go: go,
    me: me
  });
  const rvE = rv && events.find(e => e.id === rv);
  return React.createElement(React.Fragment, null, React.createElement("nav", null, React.createElement("div", {
    className: "wrap nav"
  }, React.createElement("button", {
    className: "logo",
    onClick: () => go("home")
  }, React.createElement("i", null), React.createElement("span", null, "CampusConnect")), React.createElement("div", {
    className: "links"
  }, !org && me && React.createElement(React.Fragment, null, React.createElement("button", {
    className: h === "home" ? "on" : "",
    onClick: () => go("home")
  }, "Discover"), React.createElement("button", {
    className: h === "mine" ? "on" : "",
    onClick: () => go("mine")
  }, "My events", mine.length > 0 && React.createElement("span", {
    className: "badge"
  }, mine.length)))), React.createElement("div", {
    className: "seg",
    role: "group",
    "aria-label": "Portal"
  }, React.createElement("button", {
    className: !org ? "on" : "",
    onClick: () => go("home")
  }, "Student"), React.createElement("button", {
    className: org ? "on" : "",
    onClick: () => go("org")
  }, "Organizer")), React.createElement("button", {
    className: "themebtn",
    "aria-label": theme === "dark" ? "Switch to light mode" : "Switch to dark mode",
    title: theme === "dark" ? "Light mode" : "Dark mode",
    onClick: () => setTheme(theme === "dark" ? "light" : "dark"),
    dangerouslySetInnerHTML: {
      __html: theme === "dark" ? SUN : MOON
    }
  }), me && !org && React.createElement("button", {
    className: "me",
    "aria-label": "My profile",
    onClick: () => setProf(true)
  }, React.createElement("i", null, ini), React.createElement("span", null, first)))), page, React.createElement("footer", null, "CampusConnect · Web Design Sprint 2026 · IIIT Manipur"), ask && ask.t === "reg" && React.createElement(RegForm, {
    e: ask.e,
    me: me,
    onSubmit: submitReg,
    onClose: () => setAsk(null)
  }), cp && React.createElement("div", {
    className: "modal",
    onClick: () => setAsk(null)
  }, React.createElement("div", {
    className: "confirm",
    role: "alertdialog",
    "aria-modal": "true",
    onClick: e => e.stopPropagation()
  }, React.createElement("h2", null, cp[0]), React.createElement("p", null, cp[1](ask.e)), React.createElement("div", {
    className: "row end"
  }, React.createElement("button", {
    className: "btn ghost",
    autoFocus: true,
    onClick: () => setAsk(null)
  }, cp[2]), React.createElement("button", {
    className: "btn bad",
    onClick: confirm
  }, cp[3])))), ticket && React.createElement(Ticket, {
    r: ticket,
    e: events.find(e => e.id === ticket.eid),
    onClose: () => setTicket(null),
    go: go
  }), prof && me && React.createElement(ProfileModal, {
    me: me,
    onSave: f => {
      setMe(f);
      setProf(false);
      say("Profile saved");
    },
    onSignOut: () => {
      setProf(false);
      setMe(null);
      go("home");
    },
    onClose: () => setProf(false)
  }), rvE && React.createElement(RegistrantsModal, {
    e: rvE,
    own: regList.filter(r => r.eid === rvE.id),
    onClose: () => setRv(null)
  }), toast && React.createElement("div", {
    className: "toast" + (toast.err ? " err" : ""),
    role: "status"
  }, toast.msg));
}
ReactDOM.createRoot(document.getElementById("root")).render(_jsxDEV(App, {}, void 0, false));
