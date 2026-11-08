function Dashboard({
  events,
  mine,
  go,
  me
}) {
  const [q, setQ] = useState(""),
    [cat, setCat] = useState("All");
  const list = events.filter(e => (cat === "All" || e.cat === cat) && e.name.toLowerCase().includes(q.trim().toLowerCase())).sort((a, b) => a.date < b.date ? -1 : 1);
  const my = events.filter(e => mine.includes(e.id));
  const open = events.filter(e => stat(e, mine) === "Open").length;
  return _jsxDEV("div", {
    className: "wrap",
    children: [_jsxDEV("div", {
      className: "hero",
      children: [_jsxDEV("div", {
        children: [_jsxDEV("h1", {
          children: "Hi " + me.name.split(" ")[0] + ", what’s happening on campus?"
        }, void 0, false), _jsxDEV("p", {
          children: "Every workshop, contest and show at IIIT Manipur in one place. Pick an event and register in a tap."
        }, void 0, false), _jsxDEV("div", {
          className: "stats",
          children: [_jsxDEV("span", {
            children: [_jsxDEV("b", {
              children: open
            }, void 0, false), "open for registration"]
          }, void 0, true), _jsxDEV("span", {
            children: [_jsxDEV("b", {
              children: my.length
            }, void 0, false), "you’re registered"]
          }, void 0, true)]
        }, void 0, true)]
      }, void 0, true), _jsxDEV(Ring, {
        events: events,
        go: go
      }, void 0, false)]
    }, void 0, true), _jsxDEV("div", {
      className: "bar",
      children: [_jsxDEV("input", {
        className: "search",
        "aria-label": "Search events",
        placeholder: "Search events by name",
        value: q,
        onChange: e => setQ(e.target.value)
      }, void 0, false), _jsxDEV("div", {
        className: "chips",
        children: ["All", ...CATS].map(c => _jsxDEV("button", {
          className: "chip" + (cat === c ? " on" : ""),
          onClick: () => setCat(c),
          children: c
        }, c, false))
      }, void 0, false)]
    }, void 0, true), _jsxDEV("h2", {
      className: "sec",
      children: ["All events ", _jsxDEV("span", {
        style: {
          font: "500 .95rem Figtree",
          color: "var(--mut)"
        },
        children: [list.length, " found"]
      }, void 0, true)]
    }, void 0, true), list.length ? _jsxDEV("div", {
      className: "grid",
      children: list.map(e => _jsxDEV(Card, {
        e: e,
        mine: mine,
        go: go
      }, e.id, false))
    }, void 0, false) : _jsxDEV("div", {
      className: "empty",
      children: [_jsxDEV("h3", {
        children: "No events match"
      }, void 0, false), _jsxDEV("p", {
        children: "Try a different name or clear the category filter."
      }, void 0, false), _jsxDEV("button", {
        className: "btn",
        onClick: () => {
          setQ("");
          setCat("All");
        },
        children: "Clear filters"
      }, void 0, false)]
    }, void 0, true), _jsxDEV("h2", {
      className: "sec",
      children: ["Your registrations ", _jsxDEV("button", {
        onClick: () => go("mine"),
        children: "See all"
      }, void 0, false)]
    }, void 0, true), my.length ? _jsxDEV("div", {
      className: "grid",
      children: my.slice(0, 3).map(e => _jsxDEV(Card, {
        e: e,
        mine: mine,
        go: go
      }, e.id, false))
    }, void 0, false) : _jsxDEV("div", {
      className: "empty",
      children: [_jsxDEV("h3", {
        children: "Nothing registered yet"
      }, void 0, false), _jsxDEV("p", {
        children: "Open an event above and tap Register. It will show up here."
      }, void 0, false)]
    }, void 0, true)]
  }, void 0, true);
}
function Mine({
  events,
  mine,
  go
}) {
  const my = events.filter(e => mine.includes(e.id));
  return _jsxDEV("div", {
    className: "wrap",
    style: {
      paddingTop: 34
    },
    children: [_jsxDEV("h1", {
      style: {
        fontSize: "2.4rem",
        marginBottom: 20
      },
      children: "My events"
    }, void 0, false), my.length ? _jsxDEV("div", {
      className: "grid",
      children: my.map(e => _jsxDEV(Card, {
        e: e,
        mine: mine,
        go: go
      }, e.id, false))
    }, void 0, false) : _jsxDEV("div", {
      className: "empty",
      children: [_jsxDEV("h3", {
        children: "You haven’t registered for anything"
      }, void 0, false), _jsxDEV("p", {
        children: "Find something fun and join in."
      }, void 0, false), _jsxDEV("button", {
        className: "btn",
        onClick: () => go("home"),
        children: "Browse events"
      }, void 0, false)]
    }, void 0, true)]
  }, void 0, true);
}
