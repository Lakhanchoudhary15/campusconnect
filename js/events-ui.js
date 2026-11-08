function Tilt({
  children,
  className,
  onClick,
  style
}) {
  const r = useRef();
  const mv = ev => {
    const b = r.current.getBoundingClientRect();
    const x = (ev.clientX - b.left) / b.width - .5,
      y = (ev.clientY - b.top) / b.height - .5;
    r.current.style.transform = `rotateY(${x * 14}deg) rotateX(${-y * 14}deg) translateZ(8px)`;
  };
  const lv = () => {
    r.current.style.transform = "";
  };
  return _jsxDEV("div", {
    ref: r,
    className: className,
    style: style,
    onMouseMove: mv,
    onMouseLeave: lv,
    onClick: onClick,
    role: "button",
    tabIndex: 0,
    onKeyDown: e => e.key === "Enter" && onClick(),
    children: children
  }, void 0, false);
}
function Card({
  e,
  mine,
  go
}) {
  const s = stat(e, mine),
    pct = Math.min(100, regs(e, mine) / e.cap * 100);
  return _jsxDEV(Tilt, {
    className: "card",
    style: {
      "--c": COL[e.cat]
    },
    onClick: () => go("event-" + e.id),
    children: [_jsxDEV("span", {
      className: "tag",
      children: e.cat
    }, void 0, false), _jsxDEV("h3", {
      children: e.name
    }, void 0, false), _jsxDEV("div", {
      className: "meta",
      children: [_jsxDEV("span", {
        children: e.club
      }, void 0, false), _jsxDEV("span", {
        children: [fd(e.date), ", ", ft(e.date)]
      }, void 0, true), _jsxDEV("span", {
        children: e.venue
      }, void 0, false)]
    }, void 0, true), _jsxDEV("div", {
      className: "meter",
      children: _jsxDEV("i", {
        style: {
          width: pct + "%"
        }
      }, void 0, false)
    }, void 0, false), _jsxDEV("div", {
      className: "st",
      children: [_jsxDEV("span", {
        children: [regs(e, mine), "/", e.cap, " registered"]
      }, void 0, true), _jsxDEV("span", {
        className: "pill " + s,
        children: s
      }, void 0, false)]
    }, void 0, true)]
  }, void 0, true);
}
function Ring({
  events,
  go
}) {
  const list = events.filter(e => !closed(e)).sort((a, b) => a.date < b.date ? -1 : 1).slice(0, 6),
    n = list.length || 1,
    r = Math.round(100 / Math.tan(Math.PI / n)) + 60;
  return _jsxDEV("div", {
    className: "stage",
    "aria-label": "Featured events",
    children: _jsxDEV("div", {
      className: "ring",
      children: list.map((e, i) => _jsxDEV("button", {
        className: "panel",
        style: {
          "--a": i * 360 / n + "deg",
          "--r": r + "px",
          "--c": COL[e.cat]
        },
        onClick: () => go("event-" + e.id),
        children: [_jsxDEV("small", {
          children: e.cat
        }, void 0, false), _jsxDEV("h3", {
          children: e.name
        }, void 0, false), _jsxDEV("small", {
          children: [fd(e.date), " · ", e.venue]
        }, void 0, true)]
      }, e.id, true))
    }, void 0, false)
  }, void 0, false);
}
