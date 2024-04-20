// AUTO BOT ON ZALO WEB
const _sup = {
    _pr: (fun = () => void 0, time_out = 1e2) => new Promise(rs => { let data = fun(); time_out ? setTimeout(rs, time_out) : rs(data); return data; }),
    _log: (txt, color = '#fff', size = '1rem', weight = '100') => console.log(`%c${txt}`, `font-size:${size};color:${color};font-weight:${weight};`),
    local: {
        get: (key) => {
            let localKey = LOCAL_KEY || 'studev';
            _sup._log(curent_data, `Get data by ${localKey}.${key}`, '#20b7ff', undefined, 'bolder');
            return JSON.parse(localStorage.getItem(localKey))?.[key];
        },
        set: (key, curent_data) => {
            _sup._log(`Data saving to ${localKey}.${key}`, '#20b7ff', undefined, 'bolder');
            let localKey = LOCAL_KEY || 'studev';
            let pre_data = JSON.parse(localStorage.getItem(localKey) || '{}');
            let data = Object.assign(pre_data, { [key]: curent_data });
            localStorage.setItem(localKey, JSON.stringify(data));
            _sup._log(`The ${localKey}.${key} has been saved.`, '#20b7ff', undefined, 'bolder');
        }
    },
    _do: {
        evt: (e = new HTMLElement) => (e || document.body).addEventListener,
        click: (element, time_out) => _sup._pr(() => element?.click(), time_out),
        get: (select = '', element) => (element || document).querySelector(select),
        geties: (select = '', element) => (element || document).querySelectorAll(select),
        includes: (txt = '', ...args) => {
            txt = txt.replaceAll(/\s/g, ' ').toLocaleUpperCase();
            return args.find(arg => txt.includes(arg.toLocaleUpperCase()));
        }
    }
};

; (async (lastMem) => {
    const { _log, _pr, _do, local } = _sup;
    // BEGIN CODE


    var lastElement; lastMem;
    function checkActive(i) {
        let enties = _do.geties('[data-id="div_AddMem_FrdItem"]');
        for (let e of enties) {
            if (i >= 50) break;
            else if (
                !e.firstChild?.className.includes('--active')
                && e.innerText != lastMem
            ) _do.click(e, 5, ++i);
        }
        (lastElement = enties[enties.length - 1])?.scrollIntoView(1);
        lastMem = lastElement?.innerText;
        return i;
    }

    function scrollToMem(isRun) {
        let e2, enties = _do.geties('[data-id="div_AddMem_FrdItem"]');
        for (let e of enties) {
            (e2 = e).scrollIntoView(1);
            if (e.innerText === lastMem) return isRun = false;
        }
        console.log(e2?.innerText);
        return isRun;
    }

    async function bolt() {
        await _do.click(_do.get('[data-translate-title="STR_COMMUNITY_ADD_FRIEND_TO_GROUP"]'), 3e2);
        if (lastMem) {
            let isRun = true;
            while (isRun) await _pr(_ => { isRun = scrollToMem(isRun) }, 30);
        }
        let i = 0; do await _pr(_ => { i = checkActive(i) }, 5e2); while (i < 50);
        await _do.click(_do.get('[data-translate-inner="STR_CONFIRM"]'), 1e3);
        console.log(lastMem);
    }

    while(true) await bolt(); 

    // END CODE
    _log('SESSION CLOSED', 'ORANGE', '1.2rem', 'bolder');
})()