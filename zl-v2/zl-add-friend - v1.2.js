// AUTO BOT ON-CLICK
const LOCAL_KEY = undefined;
const _sup = {
    pr: (fun = () => void 0, time_out = 1e2) => new Promise(rs => { let data = fun(); time_out ? setTimeout(rs, time_out) : rs(data); return data; }),
    log: (txt, color = '#fff' || '#20b7ff', size = '1rem', weight = '100', agrs) => console.log(`%c${txt}`, `font-size:${size};color:${color};font-weight:${weight};${agrs}`),
    _do: {
        evt: (e = new HTMLElement) => (e || document.body).addEventListener,
        click: (element, time_out) => _sup.pr(() => (typeof element === 'string' ? _sup._do.get(element) : element)?.click(), time_out),
        get: (select = '', element) => (element || document).querySelector(select),
        geties: (select = '', element) => (element || document).querySelectorAll(select),
        attr: {
            get: (element, attr = '') => element.getAttribute(attr),
            set: (element, attrs = {}) => {
                let keys = Object.keys(attrs);
                for (const key of keys) element.setAttribute(key, attrs[key]);
                return element;
            },
            create: (e = 'div', attrs = {}) => {
                let element = document.createElement(e);
                return _sup._do.setAttr(element, attrs);
            }
        },
        includes: (txt = '', ...args) => {
            txt = txt.replaceAll(/\s/g, ' ').toUpperCase();
            return args.find(arg => txt.includes(arg.toUpperCase()));
        },
        scrollTo: async (to = { geties: '', jsTxtCompare: '' }, txtValue, grCount = 5, isConform = true) => {
            let elem, inTxt;
            async function session() {
                let elems = _sup._do.geties(to.geties);
                return new Promise(async res => {
                    for (elem of elems) {
                        inTxt = _sup._do.get(to.jsTxtCompare, elem)?.innerText;
                        if (_sup._do.includes(inTxt, txtValue)) {
                            _sup.log(`FOUND: ${inTxt}`, '#20b7ff', '1.2rem', 'bolder');
                            await _sup.pr(_ => elem.scrollIntoView(1));
                            res(elem); return;
                        };
                    }
                    _sup.log(inTxt, '#ff0000', '.7rem', undefined, 'text-decoration:line-through;');
                    await _sup.pr(_ => elem.scrollIntoView(1));
                    res(elems.length);
                })
            }

            let grCursor = 0, onSession;
            do {
                onSession = await session();
                if (isNaN(onSession)) return onSession;
                else grCursor += onSession || 1;
            } while (grCursor < grCount);

            if (isConform) confirm(`ĐÃ TÌM TỚI:\n - "${inTxt}"\nKHÔNG THẤY:\n - "${txtValue}"!\nTẢI LẠI TRANG?`)
                ? this.location.reload() : console.log('Continues...');
        }
    },
    _local: {
        get: (key) => {
            let localKey = LOCAL_KEY || 'studev';
            _sup.log(`Get data by ${localKey}.${key}`, '', undefined, 'bolder');
            return JSON.parse(localStorage.getItem(localKey))?.[key];
        },
        set: (key, curent_data) => {
            let localKey = LOCAL_KEY || 'studev';
            _sup.log(`Data saving to ${localKey}.${key}`, '#20b7ff', undefined, 'bolder');
            let pre_data = JSON.parse(localStorage.getItem(localKey) || '{}');
            let data = Object.assign(pre_data, { [key]: curent_data });
            localStorage.setItem(localKey, JSON.stringify(data));
            _sup.log(`The ${localKey}.${key} has been saved.`, '#20b7ff', undefined, 'bolder');
        }
    },
    clicker: async (...steps) => { for (const st of steps) await _sup._do.click(typeof st === 'string' ? st : st.s || st.select, st.t || st.time || 1e2) }
}; (async (isSaveData, agr = { groupNamed: undefined, avoidGr: [] }) => {
    const { log, clicker, pr, _do, _local } = _sup;

    for (let elem, parent, i = 0; i < 79;) {
        elem = _do.get('[data-id="div_MemItem_AddFrd"]');
        parent = elem?.parentElement.parentElement;
        await _do.click(elem);

        if (elem = _do.get('[data-translate-inner="STR_UNDO_REQUEST"]')) {
            log(`${parent?.getAttribute('title')} has been sent!`, 'yellow', '1rem');
        } else {
            await _do.click(elem = _do.get('[data-id="btn_AddFrd_Add"]'), 100);
            if (elem) console.log(++i, elem);
            else elem = undefined;
            pr(_ => parent?.scrollIntoView(1), 1.5e2);
        }
    }

    // END CODE
    log('SESSION CLOSED', 'ORANGE', '1.2rem', 'bolder');
})(
    false, // SAVE DATA TO LOCAL_STORE
    {
        groupNamed: undefined,
        avoidGr: ['68', 'Ngọc nhi']
    }
)