function Details({
  e,
  mine,
  reg,
  unreg,
  go,
  myReg,
  viewTicket
}) {
  if (!e) return React.createElement("div", {
    className: "wrap"
  }, React.createElement("div", {
    className: "empty",
    style: {
      marginTop: 40
    }
  }, React.createElement("h3", null, "Event not found"), React.createElement("button", {
    className: "btn",
    onClick: () => go("home")
  }, "Back to events")));
  const s = stat(e, mine),
    n = regs(e, mine),
    left = e.cap - n;
  return React.createElement("div", {
    className: "wrap"
  }, React.createElement("button", {
    className: "back",
    onClick: () => go("home")
  }, "← All events"), React.createElement("div", {
    className: "detail"
  }, React.createElement("div", {
    className: "panelbox",
    style: {
      "--c": COL[e.cat]
    }
  }, React.createElement("span", {
    className: "tag"
  }, e.cat), React.createElement("h1", null, e.name), React.createElement("p", {
    style: {
      color: "var(--mut)",
      fontSize: "1.05rem",
      maxWidth: "62ch"
    }
  }, e.desc), React.createElement("div", {
    className: "facts"
  }, React.createElement("div", null, React.createElement("span", null, "Organised by"), React.createElement("b", null, e.club)), React.createElement("div", null, React.createElement("span", null, "Venue"), React.createElement("b", null, e.venue)), React.createElement("div", null, React.createElement("span", null, "Date"), React.createElement("b", null, fd(e.date))), React.createElement("div", null, React.createElement("span", null, "Time"), React.createElement("b", null, ft(e.date))))), React.createElement("div", {
    className: "panelbox",
    style: {
      alignSelf: "start"
    }
  }, React.createElement("div", {
    className: "row",
    style: {
      justifyContent: "space-between",
      marginBottom: 12
    }
  }, React.createElement("h3", null, "Registration"), React.createElement("span", {
    className: "pill " + s
  }, s)), React.createElement("div", {
    className: "meter"
  }, React.createElement("i", {
    style: {
      width: Math.min(100, n / e.cap * 100) + "%"
    }
  })), React.createElement("p", {
    style: {
      margin: "10px 0 4px"
    }
  }, React.createElement("b", null, n), " of ", e.cap, " seats taken · ", Math.max(0, left), " left"), React.createElement("p", {
    style: {
      color: "var(--mut)",
      margin: "0 0 18px"
    }
  }, "Register by ", fdl(e.deadline)), s === "Registered" ? React.createElement(React.Fragment, null, React.createElement("p", {
    style: {
      color: "var(--ok)",
      fontWeight: 600
    }
  }, "You’re in. See you there!"), React.createElement("div", {
    className: "row"
  }, React.createElement("button", {
    className: "btn",
    onClick: () => viewTicket(myReg)
  }, "View ticket"), React.createElement("button", {
    className: "btn bad",
    onClick: () => unreg(e)
  }, "Cancel registration"))) : React.createElement("button", {
    className: "btn",
    disabled: s !== "Open",
    onClick: () => reg(e),
    style: {
      width: "100%"
    }
  }, s === "Open" ? "Register now" : s === "Full" ? "Event is full" : "Registration closed"))));
}
function Organizer({
  events,
  mine,
  club,
  setClub,
  save,
  onRegs,
  onCancel
}) {
  const [edit, setEdit] = useState(null);
  const list = events.filter(e => e.club === club).sort((a, b) => a.date < b.date ? -1 : 1);
  const total = list.reduce((a, e) => a + regs(e, mine), 0);
  return React.createElement("div", {
    className: "wrap",
    style: {
      paddingTop: 34
    }
  }, React.createElement("div", {
    className: "row",
    style: {
      justifyContent: "space-between",
      alignItems: "end",
      marginBottom: 22
    }
  }, React.createElement("div", null, React.createElement("h1", {
    style: {
      fontSize: "2.4rem"
    }
  }, "Organizer dashboard"), React.createElement("label", {
    style: {
      marginTop: 12,
      maxWidth: 300
    }
  }, "Managing as", React.createElement("select", {
    value: club,
    onChange: e => setClub(e.target.value)
  }, CLUBS.map(c => React.createElement("option", {
    key: c
  }, c))))), React.createElement("button", {
    className: "btn",
    onClick: () => setEdit("new")
  }, "+ Create event")), React.createElement("div", {
    className: "stats",
    style: {
      marginBottom: 18
    }
  }, React.createElement("span", null, React.createElement("b", null, list.length), "events"), React.createElement("span", null, React.createElement("b", null, total), "total registrations"), React.createElement("span", null, React.createElement("b", null, list.filter(e => !closed(e)).length), "upcoming")), list.length ? React.createElement("div", {
    className: "panelbox",
    style: {
      padding: 0
    }
  }, list.map(e => {
    const st = closed(e) ? "Closed" : regs(e, mine) >= e.cap ? "Full" : "Open";
    return React.createElement("div", {
      className: "orgrow",
      key: e.id
    }, React.createElement("div", null, React.createElement("b", null, e.name), React.createElement("div", {
      className: "meta"
    }, fd(e.date), ", ", ft(e.date), " · ", e.venue), React.createElement("span", {
      className: "tag",
      style: {
        "--c": COL[e.cat],
        marginTop: 6,
        display: "inline-block"
      }
    }, e.cat)), React.createElement("span", {
      className: "pill " + st,
      style: {
        justifySelf: "start"
      }
    }, st), React.createElement("div", null, React.createElement("div", {
      className: "meter"
    }, React.createElement("i", {
      style: {
        width: Math.min(100, regs(e, mine) / e.cap * 100) + "%"
      }
    })), React.createElement("small", {
      style: {
        color: "var(--mut)"
      }
    }, regs(e, mine), " of ", e.cap, " registered · deadline ", fdl(e.deadline))), React.createElement("div", {
      className: "acts"
    }, React.createElement("button", {
      className: "btn ghost",
      onClick: () => onRegs(e)
    }, "Registrants"), React.createElement("button", {
      className: "btn ghost",
      onClick: () => setEdit(e)
    }, "Edit"), React.createElement("button", {
      className: "btn bad",
      onClick: () => onCancel(e)
    }, "Cancel event")));
  })) : React.createElement("div", {
    className: "empty"
  }, React.createElement("h3", null, "No events for this club yet"), React.createElement("p", null, "Create the first one and students will see it right away."), React.createElement("button", {
    className: "btn",
    onClick: () => setEdit("new")
  }, "Create event")), edit && React.createElement(Form, {
    init: edit === "new" ? null : edit,
    club: club,
    minCap: edit === "new" ? 0 : regs(edit, mine),
    onClose: () => setEdit(null),
    onSave: f => {
      save(f, edit === "new" ? null : edit.id);
      setEdit(null);
    }
  }));
}
