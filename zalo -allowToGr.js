const LOCAL_KEY = void 0, _sup = { pr: (e = (() => { }), t = 100) => new Promise((o => { let s = e(); return t ? setTimeout(o, t) : o(s), s })), log: (e, t = "#fff", o = "1rem", s = "100") => console.log(`%c${e}`, `font-size:${o};color:${t};font-weight:${s};`), _do: { evt: (e = new HTMLElement) => (e || document.body).addEventListener, click: (e, t) => _sup.pr((() => ("string" == typeof e ? _sup._do.get(e) : e)?.click()), t), get: (e = "", t) => (t || document).querySelector(e), geties: (e = "", t) => (t || document).querySelectorAll(e), includes: (e = "", ...t) => (e = e.replaceAll(/\s/g, " ").toLocaleUpperCase(), t.find((t => e.includes(t.toLocaleUpperCase())))) }, _local: { get: e => { let t = "studev"; return _sup.log(curent_data, `Get data by ${t}.${e}`, "#20b7ff", void 0, "bolder"), JSON.parse(localStorage.getItem(t))?.[e] }, set: (e, t) => { _sup.log(`Data saving to ${o}.${e}`, "#20b7ff", void 0, "bolder"); let o = "studev", s = JSON.parse(localStorage.getItem(o) || "{}"), l = Object.assign(s, { [e]: t }); localStorage.setItem(o, JSON.stringify(l)), _sup.log(`The ${o}.${e} has been saved.`, "#20b7ff", void 0, "bolder") } }, clicker: async (...e) => e.forEach((async st => await _sup._do.click("string" == typeof st ? _sup._do.click(st) : _sup._do.click(st.s || st.select, st.t || st.time)))) };
; (async (

) => {
    const { _do, _local, clicker, log, pr } = _sup;
    // BEGIN CODE
    let steps = [
        '[data-id="div_MiniLabel_OpenLabelList"]',
        '[data-id="div_DetailLabelList_StrangerMessage"]',
        '[data-id="div_TabMsg_ThrdChItem"]',
        '[data-z-element-type="link"]'
    ]
    clicker(...steps);



    // END CODE
    log('SESSION CLOSED', 'ORANGE', '1.2rem', 'bolder');
})(

)