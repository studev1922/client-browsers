// AUTO BOT ON-CLICK
const LOCAL_KEY = undefined;
const _sup = {
    pr: (fun = () => void 0, time_out = 1e2) => new Promise(rs => { let data = fun(); time_out ? setTimeout(rs, time_out) : rs(data); return data; }),
    log: (txt, color = '#fff' || '#20b7ff', size = '1rem', weight = '100') => console.log(`%c${txt}`, `font-size:${size};color:${color};font-weight:${weight};`),
    _do: {
        evt: (e = new HTMLElement) => (e || document.body).addEventListener,
        click: (element, time_out) => _sup._pr(() => (typeof element === 'string' ? _sup._do.get(element) : element)?.click(), time_out),
        get: (select = '', element) => (element || document).querySelector(select),
        geties: (select = '', element) => (element || document).querySelectorAll(select),
        includes: (txt = '', ...args) => {
            txt = txt.replaceAll(/\s/g, ' ').toLocaleUpperCase();
            return args.find(arg => txt.includes(arg.toLocaleUpperCase()));
        }
    },
    _local: {
        get: (key) => {
            let localKey = LOCAL_KEY || 'studev';
            _sup.log(curent_data, `Get data by ${localKey}.${key}`, '', undefined, 'bolder');
            return JSON.parse(localStorage.getItem(localKey))?.[key];
        },
        set: (key, curent_data) => {
            _sup.log(`Data saving to ${localKey}.${key}`, '#20b7ff', undefined, 'bolder');
            let localKey = LOCAL_KEY || 'studev';
            let pre_data = JSON.parse(localStorage.getItem(localKey) || '{}');
            let data = Object.assign(pre_data, { [key]: curent_data });
            localStorage.setItem(localKey, JSON.stringify(data));
            _sup.log(`The ${localKey}.${key} has been saved.`, '#20b7ff', undefined, 'bolder');
        }
    },
    clicker: async (...steps) => steps.forEach(async _ => await _sup._do.click(typeof st === 'string' ? _sup._do.click(st) : _sup._do.click(st.s || st.select, st.t || st.time || 1e2))),
}; (async () => {
    const { log, clicker, pr, _do, _local } = _sup;
    // BEGIN CODE
    let steps = [

    ]

    // END CODE
    log('SESSION CLOSED', 'ORANGE', '1.2rem', 'bolder');
})(

)