! function (x, e, F, T) {
    "use strict";
    e = void 0 !== e && e.Math == Math ? e : "undefined" != typeof self && self.Math == Math ? self : Function("return this")(), x.fn.dimmer = function (p) {
        var b, v = x(this),
            h = (new Date).getTime(),
            y = [],
            C = p,
            w = "string" == typeof C,
            S = [].slice.call(arguments, 1);
        return v.each(function () {
            var a, i, s, r = x.isPlainObject(p) ? x.extend(!0, {}, x.fn.dimmer.settings, p) : x.extend({}, x.fn.dimmer.settings),
                n = r.selector,
                e = r.namespace,
                t = r.className,
                m = r.error,
                o = "." + e,
                d = "module-" + e,
                c = v.selector || "",
                l = "ontouchstart" in F.documentElement ? "touchstart" : "click",
                u = x(this),
                f = this,
                g = u.data(d);
            (s = {
                preinitialize: function () {
                    a = s.is.dimmer() ? (i = u.parent(), u) : (i = u, s.has.dimmer() ? r.dimmerName ? i.find(n.dimmer).filter("." + r.dimmerName) : i.find(n.dimmer) : s.create())
                },
                initialize: function () {
                    s.debug("Initializing dimmer", r), s.bind.events(), s.set.dimmable(), s.instantiate()
                },
                instantiate: function () {
                    s.verbose("Storing instance of module", s), g = s, u.data(d, g)
                },
                destroy: function () {
                    s.verbose("Destroying previous module", a), s.unbind.events(), s.remove.variation(), i.off(o)
                },
                bind: {
                    events: function () {
                        "hover" == r.on ? i.on("mouseenter" + o, s.show).on("mouseleave" + o, s.hide) : "click" == r.on && i.on(l + o, s.toggle), s.is.page() && (s.debug("Setting as a page dimmer", i), s.set.pageDimmer()), s.is.closable() && (s.verbose("Adding dimmer close event", a), i.on(l + o, n.dimmer, s.event.click))
                    }
                },
                unbind: {
                    events: function () {
                        u.removeData(d), i.off(o)
                    }
                },
                event: {
                    click: function (e) {
                        s.verbose("Determining if event occured on dimmer", e), (0 === a.find(e.target).length || x(e.target).is(n.content)) && (s.hide(), e.stopImmediatePropagation())
                    }
                },
                addContent: function (e) {
                    var i = x(e);
                    s.debug("Add content to dimmer", i), i.parent()[0] !== a[0] && i.detach().appendTo(a)
                },
                create: function () {
                    var e = x(r.template.dimmer());
                    return r.dimmerName && (s.debug("Creating named dimmer", r.dimmerName), e.addClass(r.dimmerName)), e.appendTo(i), e
                },
                show: function (e) {
                    e = x.isFunction(e) ? e : function () {}, s.debug("Showing dimmer", a, r), s.set.variation(), s.is.dimmed() && !s.is.animating() || !s.is.enabled() ? s.debug("Dimmer is already shown or disabled") : (s.animate.show(e), r.onShow.call(f), r.onChange.call(f))
                },
                hide: function (e) {
                    e = x.isFunction(e) ? e : function () {}, s.is.dimmed() || s.is.animating() ? (s.debug("Hiding dimmer", a), s.animate.hide(e), r.onHide.call(f), r.onChange.call(f)) : s.debug("Dimmer is not visible")
                },
                toggle: function () {
                    s.verbose("Toggling dimmer visibility", a), s.is.dimmed() ? s.hide() : s.show()
                },
                animate: {
                    show: function (e) {
                        e = x.isFunction(e) ? e : function () {}, r.useCSS && x.fn.transition !== T && a.transition("is supported") ? (r.useFlex ? (s.debug("Using flex dimmer"), s.remove.legacy()) : (s.debug("Using legacy non-flex dimmer"), s.set.legacy()), "auto" !== r.opacity && s.set.opacity(), a.transition({
                            displayType: r.useFlex ? "flex" : "block",
                            animation: r.transition + " in",
                            queue: !1,
                            duration: s.get.duration(),
                            useFailSafe: !0,
                            onStart: function () {
                                s.set.dimmed()
                            },
                            onComplete: function () {
                                s.set.active(), e()
                            }
                        })) : (s.verbose("Showing dimmer animation with javascript"), s.set.dimmed(), "auto" == r.opacity && (r.opacity = .8), a.stop().css({
                            opacity: 0,
                            width: "100%",
                            height: "100%"
                        }).fadeTo(s.get.duration(), r.opacity, function () {
                            a.removeAttr("style"), s.set.active(), e()
                        }))
                    },
                    hide: function (e) {
                        e = x.isFunction(e) ? e : function () {}, r.useCSS && x.fn.transition !== T && a.transition("is supported") ? (s.verbose("Hiding dimmer with css"), a.transition({
                            displayType: r.useFlex ? "flex" : "block",
                            animation: r.transition + " out",
                            queue: !1,
                            duration: s.get.duration(),
                            useFailSafe: !0,
                            onStart: function () {
                                s.remove.dimmed()
                            },
                            onComplete: function () {
                                s.remove.variation(), s.remove.active(), e()
                            }
                        })) : (s.verbose("Hiding dimmer with javascript"), s.remove.dimmed(), a.stop().fadeOut(s.get.duration(), function () {
                            s.remove.active(), a.removeAttr("style"), e()
                        }))
                    }
                },
                get: {
                    dimmer: function () {
                        return a
                    },
                    duration: function () {
                        return "object" == typeof r.duration ? s.is.active() ? r.duration.hide : r.duration.show : r.duration
                    }
                },
                has: {
                    dimmer: function () {
                        return r.dimmerName ? 0 < u.find(n.dimmer).filter("." + r.dimmerName).length : 0 < u.find(n.dimmer).length
                    }
                },
                is: {
                    active: function () {
                        return a.hasClass(t.active)
                    },
                    animating: function () {
                        return a.is(":animated") || a.hasClass(t.animating)
                    },
                    closable: function () {
                        return "auto" == r.closable ? "hover" != r.on : r.closable
                    },
                    dimmer: function () {
                        return u.hasClass(t.dimmer)
                    },
                    dimmable: function () {
                        return u.hasClass(t.dimmable)
                    },
                    dimmed: function () {
                        return i.hasClass(t.dimmed)
                    },
                    disabled: function () {
                        return i.hasClass(t.disabled)
                    },
                    enabled: function () {
                        return !s.is.disabled()
                    },
                    page: function () {
                        return i.is("body")
                    },
                    pageDimmer: function () {
                        return a.hasClass(t.pageDimmer)
                    }
                },
                can: {
                    show: function () {
                        return !a.hasClass(t.disabled)
                    }
                },
                set: {
                    opacity: function (e) {
                        var i = a.css("background-color"),
                            n = i.split(","),
                            t = n && 3 == n.length,
                            o = n && 4 == n.length;
                        e = 0 === r.opacity ? 0 : r.opacity || e, i = t || o ? (n[3] = e + ")", n.join(",")) : "rgba(0, 0, 0, " + e + ")", s.debug("Setting opacity to", e), a.css("background-color", i)
                    },
                    legacy: function () {
                        a.addClass(t.legacy)
                    },
                    active: function () {
                        a.addClass(t.active)
                    },
                    dimmable: function () {
                        i.addClass(t.dimmable)
                    },
                    dimmed: function () {
                        i.addClass(t.dimmed)
                    },
                    pageDimmer: function () {
                        a.addClass(t.pageDimmer)
                    },
                    disabled: function () {
                        a.addClass(t.disabled)
                    },
                    variation: function (e) {
                        (e = e || r.variation) && a.addClass(e)
                    }
                },
                remove: {
                    active: function () {
                        a.removeClass(t.active)
                    },
                    legacy: function () {
                        a.removeClass(t.legacy)
                    },
                    dimmed: function () {
                        i.removeClass(t.dimmed)
                    },
                    disabled: function () {
                        a.removeClass(t.disabled)
                    },
                    variation: function (e) {
                        (e = e || r.variation) && a.removeClass(e)
                    }
                },
                setting: function (e, i) {
                    if (s.debug("Changing setting", e, i), x.isPlainObject(e)) x.extend(!0, r, e);
                    else {
                        if (i === T) return r[e];
                        x.isPlainObject(r[e]) ? x.extend(!0, r[e], i) : r[e] = i
                    }
                },
                internal: function (e, i) {
                    if (x.isPlainObject(e)) x.extend(!0, s, e);
                    else {
                        if (i === T) return s[e];
                        s[e] = i
                    }
                },
                debug: function () {
                    !r.silent && r.debug && (r.performance ? s.performance.log(arguments) : (s.debug = Function.prototype.bind.call(console.info, console, r.name + ":"), s.debug.apply(console, arguments)))
                },
                verbose: function () {
                    !r.silent && r.verbose && r.debug && (r.performance ? s.performance.log(arguments) : (s.verbose = Function.prototype.bind.call(console.info, console, r.name + ":"), s.verbose.apply(console, arguments)))
                },
                error: function () {
                    r.silent || (s.error = Function.prototype.bind.call(console.error, console, r.name + ":"), s.error.apply(console, arguments))
                },
                performance: {
                    log: function (e) {
                        var i, n;
                        r.performance && (n = (i = (new Date).getTime()) - (h || i), h = i, y.push({
                            Name: e[0],
                            Arguments: [].slice.call(e, 1) || "",
                            Element: f,
                            "Execution Time": n
                        })), clearTimeout(s.performance.timer), s.performance.timer = setTimeout(s.performance.display, 500)
                    },
                    display: function () {
                        var e = r.name + ":",
                            n = 0;
                        h = !1, clearTimeout(s.performance.timer), x.each(y, function (e, i) {
                            n += i["Execution Time"]
                        }), e += " " + n + "ms", c && (e += " '" + c + "'"), 1 < v.length && (e += " (" + v.length + ")"), (console.group !== T || console.table !== T) && 0 < y.length && (console.groupCollapsed(e), console.table ? console.table(y) : x.each(y, function (e, i) {
                            console.log(i.Name + ": " + i["Execution Time"] + "ms")
                        }), console.groupEnd()), y = []
                    }
                },
                invoke: function (t, e, i) {
                    var o, a, n, r = g;
                    return e = e || S, i = f || i, "string" == typeof t && r !== T && (t = t.split(/[\. ]/), o = t.length - 1, x.each(t, function (e, i) {
                        var n = e != o ? i + t[e + 1].charAt(0).toUpperCase() + t[e + 1].slice(1) : t;
                        if (x.isPlainObject(r[n]) && e != o) r = r[n];
                        else {
                            if (r[n] !== T) return a = r[n], !1;
                            if (!x.isPlainObject(r[i]) || e == o) return r[i] !== T ? a = r[i] : s.error(m.method, t), !1;
                            r = r[i]
                        }
                    })), x.isFunction(a) ? n = a.apply(i, e) : a !== T && (n = a), x.isArray(b) ? b.push(n) : b !== T ? b = [b, n] : n !== T && (b = n), a
                }
            }).preinitialize(), w ? (g === T && s.initialize(), s.invoke(C)) : (g !== T && g.invoke("destroy"), s.initialize())
        }), b !== T ? b : this
    }, x.fn.dimmer.settings = {
        name: "Dimmer",
        namespace: "dimmer",
        silent: !1,
        debug: !1,
        verbose: !1,
        performance: !0,
        useFlex: !0,
        dimmerName: !1,
        variation: !1,
        closable: "auto",
        useCSS: !0,
        transition: "fade",
        on: !1,
        opacity: "auto",
        duration: {
            show: 500,
            hide: 500
        },
        onChange: function () {},
        onShow: function () {},
        onHide: function () {},
        error: {
            method: "The method you called is not defined."
        },
        className: {
            active: "active",
            animating: "animating",
            dimmable: "dimmable",
            dimmed: "dimmed",
            dimmer: "dimmer",
            disabled: "disabled",
            hide: "hide",
            legacy: "legacy",
            pageDimmer: "page",
            show: "show"
        },
        selector: {
            dimmer: "> .ui.dimmer",
            content: ".ui.dimmer > .content, .ui.dimmer > .content > .center"
        },
        template: {
            dimmer: function () {
                return x("<div />").attr("class", "ui dimmer")
            }
        }
    }
}(jQuery, window, document);
! function (E, e, P, T) {
    "use strict";
    void 0 !== (e = void 0 !== e && e.Math == Math ? e : "undefined" != typeof self && self.Math == Math ? self : Function("return this")()) && e.Math == Math || ("undefined" != typeof self && self.Math == Math ? self : Function("return this")());
    E.fn.progress = function (m) {
        var b, e = E(this),
            h = e.selector || "",
            x = (new Date).getTime(),
            w = [],
            y = m,
            V = "string" == typeof y,
            C = [].slice.call(arguments, 1);
        return e.each(function () {
            var s, r = E.isPlainObject(m) ? E.extend(!0, {}, E.fn.progress.settings, m) : E.extend({}, E.fn.progress.settings),
                t = r.className,
                n = r.metadata,
                e = r.namespace,
                a = r.selector,
                l = r.error,
                o = "." + e,
                i = "module-" + e,
                c = E(this),
                u = E(this).find(a.bar),
                d = E(this).find(a.progress),
                g = E(this).find(a.label),
                v = this,
                p = c.data(i),
                f = !1;
            s = {
                initialize: function () {
                    s.debug("Initializing progress bar", r), s.set.duration(), s.set.transitionEvent(), s.read.metadata(), s.read.settings(), s.instantiate()
                },
                instantiate: function () {
                    s.verbose("Storing instance of progress", s), p = s, c.data(i, s)
                },
                destroy: function () {
                    s.verbose("Destroying previous progress for", c), clearInterval(p.interval), s.remove.state(), c.removeData(i), p = T
                },
                reset: function () {
                    s.remove.nextValue(), s.update.progress(0)
                },
                complete: function () {
                    (s.percent === T || s.percent < 100) && (s.remove.progressPoll(), s.set.percent(100))
                },
                read: {
                    metadata: function () {
                        var e = {
                            percent: c.data(n.percent),
                            total: c.data(n.total),
                            value: c.data(n.value)
                        };
                        e.percent && (s.debug("Current percent value set from metadata", e.percent), s.set.percent(e.percent)), e.total && (s.debug("Total value set from metadata", e.total), s.set.total(e.total)), e.value && (s.debug("Current value set from metadata", e.value), s.set.value(e.value), s.set.progress(e.value))
                    },
                    settings: function () {
                        !1 !== r.total && (s.debug("Current total set in settings", r.total), s.set.total(r.total)), !1 !== r.value && (s.debug("Current value set in settings", r.value), s.set.value(r.value), s.set.progress(s.value)), !1 !== r.percent && (s.debug("Current percent set in settings", r.percent), s.set.percent(r.percent))
                    }
                },
                bind: {
                    transitionEnd: function (t) {
                        var e = s.get.transitionEnd();
                        u.one(e + o, function (e) {
                            clearTimeout(s.failSafeTimer), t.call(this, e)
                        }), s.failSafeTimer = setTimeout(function () {
                            u.triggerHandler(e)
                        }, r.duration + r.failSafeDelay), s.verbose("Adding fail safe timer", s.timer)
                    }
                },
                increment: function (e) {
                    var t, n;
                    s.has.total() ? n = (t = s.get.value()) + (e = e || 1) : (n = (t = s.get.percent()) + (e = e || s.get.randomValue()), 100, s.debug("Incrementing percentage by", t, n)), n = s.get.normalizedValue(n), s.set.progress(n)
                },
                decrement: function (e) {
                    var t, n;
                    s.get.total() ? (n = (t = s.get.value()) - (e = e || 1), s.debug("Decrementing value by", e, t)) : (n = (t = s.get.percent()) - (e = e || s.get.randomValue()), s.debug("Decrementing percentage by", e, t)), n = s.get.normalizedValue(n), s.set.progress(n)
                },
                has: {
                    progressPoll: function () {
                        return s.progressPoll
                    },
                    total: function () {
                        return !1 !== s.get.total()
                    }
                },
                get: {
                    text: function (e) {
                        var t = s.value || 0,
                            n = s.total || 0,
                            r = f ? s.get.displayPercent() : s.percent || 0,
                            a = 0 < s.total ? n - t : 100 - r;
                        return e = (e = e || "").replace("{value}", t).replace("{total}", n).replace("{left}", a).replace("{percent}", r), s.verbose("Adding variables to progress bar text", e), e
                    },
                    normalizedValue: function (e) {
                        if (e < 0) return s.debug("Value cannot decrement below 0"), 0;
                        if (s.has.total()) {
                            if (e > s.total) return s.debug("Value cannot increment above total", s.total), s.total
                        } else if (100 < e) return s.debug("Value cannot increment above 100 percent"), 100;
                        return e
                    },
                    updateInterval: function () {
                        return "auto" == r.updateInterval ? r.duration : r.updateInterval
                    },
                    randomValue: function () {
                        return s.debug("Generating random increment percentage"), Math.floor(Math.random() * r.random.max + r.random.min)
                    },
                    numericValue: function (e) {
                        return "string" == typeof e ? "" !== e.replace(/[^\d.]/g, "") && +e.replace(/[^\d.]/g, "") : e
                    },
                    transitionEnd: function () {
                        var e, t = P.createElement("element"),
                            n = {
                                transition: "transitionend",
                                OTransition: "oTransitionEnd",
                                MozTransition: "transitionend",
                                WebkitTransition: "webkitTransitionEnd"
                            };
                        for (e in n)
                            if (t.style[e] !== T) return n[e]
                    },
                    displayPercent: function () {
                        var e = u.width(),
                            t = c.width(),
                            n = parseInt(u.css("min-width"), 10) < e ? e / t * 100 : s.percent;
                        return 0 < r.precision ? Math.round(n * (10 * r.precision)) / (10 * r.precision) : Math.round(n)
                    },
                    percent: function () {
                        return s.percent || 0
                    },
                    value: function () {
                        return s.nextValue || s.value || 0
                    },
                    total: function () {
                        return s.total || !1
                    }
                },
                create: {
                    progressPoll: function () {
                        s.progressPoll = setTimeout(function () {
                            s.update.toNextValue(), s.remove.progressPoll()
                        }, s.get.updateInterval())
                    }
                },
                is: {
                    complete: function () {
                        return s.is.success() || s.is.warning() || s.is.error()
                    },
                    success: function () {
                        return c.hasClass(t.success)
                    },
                    warning: function () {
                        return c.hasClass(t.warning)
                    },
                    error: function () {
                        return c.hasClass(t.error)
                    },
                    active: function () {
                        return c.hasClass(t.active)
                    },
                    visible: function () {
                        return c.is(":visible")
                    }
                },
                remove: {
                    progressPoll: function () {
                        s.verbose("Removing progress poll timer"), s.progressPoll && (clearTimeout(s.progressPoll), delete s.progressPoll)
                    },
                    nextValue: function () {
                        s.verbose("Removing progress value stored for next update"), delete s.nextValue
                    },
                    state: function () {
                        s.verbose("Removing stored state"), delete s.total, delete s.percent, delete s.value
                    },
                    active: function () {
                        s.verbose("Removing active state"), c.removeClass(t.active)
                    },
                    success: function () {
                        s.verbose("Removing success state"), c.removeClass(t.success)
                    },
                    warning: function () {
                        s.verbose("Removing warning state"), c.removeClass(t.warning)
                    },
                    error: function () {
                        s.verbose("Removing error state"), c.removeClass(t.error)
                    }
                },
                set: {
                    barWidth: function (e) {
                        100 < e ? s.error(l.tooHigh, e) : e < 0 ? s.error(l.tooLow, e) : (u.css("width", e + "%"), c.attr("data-percent", parseInt(e, 10)))
                    },
                    duration: function (e) {
                        e = "number" == typeof (e = e || r.duration) ? e + "ms" : e, s.verbose("Setting progress bar transition duration", e), u.css({
                            "transition-duration": e
                        })
                    },
                    percent: function (e) {
                        e = "string" == typeof e ? +e.replace("%", "") : e, e = 0 < r.precision ? Math.round(e * (10 * r.precision)) / (10 * r.precision) : Math.round(e), s.percent = e, s.has.total() || (s.value = 0 < r.precision ? Math.round(e / 100 * s.total * (10 * r.precision)) / (10 * r.precision) : Math.round(e / 100 * s.total * 10) / 10, r.limitValues && (s.value = 100 < s.value ? 100 : s.value < 0 ? 0 : s.value)), s.set.barWidth(e), s.set.labelInterval(), s.set.labels(), r.onChange.call(v, e, s.value, s.total)
                    },
                    labelInterval: function () {
                        clearInterval(s.interval), s.bind.transitionEnd(function () {
                            s.verbose("Bar finished animating, removing continuous label updates"), clearInterval(s.interval), f = !1, s.set.labels()
                        }), f = !0, s.interval = setInterval(function () {
                            E.contains(P.documentElement, v) || (clearInterval(s.interval), f = !1), s.set.labels()
                        }, r.framerate)
                    },
                    labels: function () {
                        s.verbose("Setting both bar progress and outer label text"), s.set.barLabel(), s.set.state()
                    },
                    label: function (e) {
                        (e = e || "") && (e = s.get.text(e), s.verbose("Setting label to text", e), g.text(e))
                    },
                    state: function (e) {
                        100 === (e = e !== T ? e : s.percent) ? r.autoSuccess && !(s.is.warning() || s.is.error() || s.is.success()) ? (s.set.success(), s.debug("Automatically triggering success at 100%")) : (s.verbose("Reached 100% removing active state"), s.remove.active(), s.remove.progressPoll()) : 0 < e ? (s.verbose("Adjusting active progress bar label", e), s.set.active()) : (s.remove.active(), s.set.label(r.text.active))
                    },
                    barLabel: function (e) {
                        e !== T ? d.text(s.get.text(e)) : "ratio" == r.label && s.total ? (s.verbose("Adding ratio to bar label"), d.text(s.get.text(r.text.ratio))) : "percent" == r.label && (s.verbose("Adding percentage to bar label"), d.text(s.get.text(r.text.percent)))
                    },
                    active: function (e) {
                        e = e || r.text.active, s.debug("Setting active state"), r.showActivity && !s.is.active() && c.addClass(t.active), s.remove.warning(), s.remove.error(), s.remove.success(), (e = r.onLabelUpdate("active", e, s.value, s.total)) && s.set.label(e), s.bind.transitionEnd(function () {
                            r.onActive.call(v, s.value, s.total)
                        })
                    },
                    success: function (e) {
                        e = e || r.text.success || r.text.active, s.debug("Setting success state"), c.addClass(t.success), s.remove.active(), s.remove.warning(), s.remove.error(), s.complete(), e = r.text.success ? r.onLabelUpdate("success", e, s.value, s.total) : r.onLabelUpdate("active", e, s.value, s.total), s.set.label(e), s.bind.transitionEnd(function () {
                            r.onSuccess.call(v, s.total)
                        })
                    },
                    warning: function (e) {
                        e = e || r.text.warning, s.debug("Setting warning state"), c.addClass(t.warning), s.remove.active(), s.remove.success(), s.remove.error(), s.complete(), (e = r.onLabelUpdate("warning", e, s.value, s.total)) && s.set.label(e), s.bind.transitionEnd(function () {
                            r.onWarning.call(v, s.value, s.total)
                        })
                    },
                    error: function (e) {
                        e = e || r.text.error, s.debug("Setting error state"), c.addClass(t.error), s.remove.active(), s.remove.success(), s.remove.warning(), s.complete(), (e = r.onLabelUpdate("error", e, s.value, s.total)) && s.set.label(e), s.bind.transitionEnd(function () {
                            r.onError.call(v, s.value, s.total)
                        })
                    },
                    transitionEvent: function () {
                        s.get.transitionEnd()
                    },
                    total: function (e) {
                        s.total = e
                    },
                    value: function (e) {
                        s.value = e
                    },
                    progress: function (e) {
                        s.has.progressPoll() ? (s.debug("Updated within interval, setting next update to use new value", e), s.set.nextValue(e)) : (s.debug("First update in progress update interval, immediately updating", e), s.update.progress(e), s.create.progressPoll())
                    },
                    nextValue: function (e) {
                        s.nextValue = e
                    }
                },
                update: {
                    toNextValue: function () {
                        var e = s.nextValue;
                        e && (s.debug("Update interval complete using last updated value", e), s.update.progress(e), s.remove.nextValue())
                    },
                    progress: function (e) {
                        var t;
                        !1 === (e = s.get.numericValue(e)) && s.error(l.nonNumeric, e), e = s.get.normalizedValue(e), s.has.total() ? (s.set.value(e), t = e / s.total * 100, s.debug("Calculating percent complete from total", t)) : (t = e, s.debug("Setting value to exact percentage value", t)), s.set.percent(t)
                    }
                },
                setting: function (e, t) {
                    if (s.debug("Changing setting", e, t), E.isPlainObject(e)) E.extend(!0, r, e);
                    else {
                        if (t === T) return r[e];
                        E.isPlainObject(r[e]) ? E.extend(!0, r[e], t) : r[e] = t
                    }
                },
                internal: function (e, t) {
                    if (E.isPlainObject(e)) E.extend(!0, s, e);
                    else {
                        if (t === T) return s[e];
                        s[e] = t
                    }
                },
                debug: function () {
                    !r.silent && r.debug && (r.performance ? s.performance.log(arguments) : (s.debug = Function.prototype.bind.call(console.info, console, r.name + ":"), s.debug.apply(console, arguments)))
                },
                verbose: function () {
                    !r.silent && r.verbose && r.debug && (r.performance ? s.performance.log(arguments) : (s.verbose = Function.prototype.bind.call(console.info, console, r.name + ":"), s.verbose.apply(console, arguments)))
                },
                error: function () {
                    r.silent || (s.error = Function.prototype.bind.call(console.error, console, r.name + ":"), s.error.apply(console, arguments))
                },
                performance: {
                    log: function (e) {
                        var t, n;
                        r.performance && (n = (t = (new Date).getTime()) - (x || t), x = t, w.push({
                            Name: e[0],
                            Arguments: [].slice.call(e, 1) || "",
                            Element: v,
                            "Execution Time": n
                        })), clearTimeout(s.performance.timer), s.performance.timer = setTimeout(s.performance.display, 500)
                    },
                    display: function () {
                        var e = r.name + ":",
                            n = 0;
                        x = !1, clearTimeout(s.performance.timer), E.each(w, function (e, t) {
                            n += t["Execution Time"]
                        }), e += " " + n + "ms", h && (e += " '" + h + "'"), (console.group !== T || console.table !== T) && 0 < w.length && (console.groupCollapsed(e), console.table ? console.table(w) : E.each(w, function (e, t) {
                            console.log(t.Name + ": " + t["Execution Time"] + "ms")
                        }), console.groupEnd()), w = []
                    }
                },
                invoke: function (r, e, t) {
                    var a, o, n, i = p;
                    return e = e || C, t = v || t, "string" == typeof r && i !== T && (r = r.split(/[\. ]/), a = r.length - 1, E.each(r, function (e, t) {
                        var n = e != a ? t + r[e + 1].charAt(0).toUpperCase() + r[e + 1].slice(1) : r;
                        if (E.isPlainObject(i[n]) && e != a) i = i[n];
                        else {
                            if (i[n] !== T) return o = i[n], !1;
                            if (!E.isPlainObject(i[t]) || e == a) return i[t] !== T ? o = i[t] : s.error(l.method, r), !1;
                            i = i[t]
                        }
                    })), E.isFunction(o) ? n = o.apply(t, e) : o !== T && (n = o), E.isArray(b) ? b.push(n) : b !== T ? b = [b, n] : n !== T && (b = n), o
                }
            }, V ? (p === T && s.initialize(), s.invoke(y)) : (p !== T && p.invoke("destroy"), s.initialize())
        }), b !== T ? b : this
    }, E.fn.progress.settings = {
        name: "Progress",
        namespace: "progress",
        silent: !1,
        debug: !1,
        verbose: !1,
        performance: !0,
        random: {
            min: 2,
            max: 5
        },
        duration: 300,
        updateInterval: "auto",
        autoSuccess: !0,
        showActivity: !0,
        limitValues: !0,
        label: "percent",
        precision: 0,
        framerate: 1e3 / 30,
        percent: !1,
        total: !1,
        value: !1,
        failSafeDelay: 100,
        onLabelUpdate: function (e, t, n, r) {
            return t
        },
        onChange: function (e, t, n) {},
        onSuccess: function (e) {},
        onActive: function (e, t) {},
        onError: function (e, t) {},
        onWarning: function (e, t) {},
        error: {
            method: "The method you called is not defined.",
            nonNumeric: "Progress value is non numeric",
            tooHigh: "Value specified is above 100%",
            tooLow: "Value specified is below 0%"
        },
        regExp: {
            variable: /\{\$*[A-z0-9]+\}/g
        },
        metadata: {
            percent: "percent",
            total: "total",
            value: "value"
        },
        selector: {
            bar: "> .bar",
            label: "> .label",
            progress: ".bar > .progress"
        },
        text: {
            active: !1,
            error: !1,
            success: !1,
            warning: !1,
            percent: "{percent}%",
            ratio: "{value} of {total}"
        },
        className: {
            active: "active",
            error: "error",
            success: "success",
            warning: "warning"
        }
    }
}(jQuery, window, document);
