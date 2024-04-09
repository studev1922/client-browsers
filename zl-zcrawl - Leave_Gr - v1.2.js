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
            txt = txt.replaceAll(/\s/g, ' ').toLocaleUpperCase();
            return args.find(arg => txt.includes(arg.toLocaleUpperCase()));
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
}; (async (agr = { groupNamed: undefined, avoidGr: [] }) => {
    const { log, clicker, pr, _do, _local } = _sup;
    const request = indexedDB.open((await indexedDB.databases()).find(e => e.name.match(/^zdb_[0-9]+$/)).name);

    // BEGIN CODE
    let steps = {
        toGroup: {
            contact: [
                '[data-id="div_Main_TabTool"]',
                '[data-translate-inner="STR_TAB_CONTACT"]',
                '[data-translate-inner="STR_CONTACT_TAB_GROUP_COMMUNITY_LIST"]'
            ],
            scroll: '#container > div.contact-pages.page-container > div.card-list-wrapper > div > div:nth-child(1) > div > div:nth-child(1) > div > div',
            inform: { geties: '.friend-info', jsTxtCompare: '.name' },
            grCounter: '[data-translate-inner="STR_GROUP_LIST_COUNTER"]',
            grCounter_agr: 'data-translate-text-arguments',
        },
        leaveGroup: {
            option: '[icon="ic_them"]',
            leave: [
                '.popover-v3>.zmenu-body>div>div>div-14',
                '[data-translate-inner="STR_COMMUNITY_LEAVEGROUP_MENU"]'
            ]
        }
    }

    let groupCounter = await (async (table) => {
        return new Promise(resolve => {
            request.onsuccess = (event) => {
                let counter;
                function step(osNamed, onsuccess = () => void 0) {
                    let get = event.target.result
                        .transaction(osNamed, 'readonly')
                        .objectStore(osNamed).getAll();
                    get.onsuccess = onsuccess;
                    get.onerror = e => console.error('Lỗi khi lấy dữ liệu:', e.target.error);
                }
                step(table, e => {
                    counter = e.target?.result.length;
                    let groups = [], data = e.target?.result;
                    data = data.filter(e => e.totalMember > 50);
                    data = Array.from(new Set(data.map(e => {
                        if (_do.includes(e.displayName, ...agr.avoidGr)) {
                            log(e.displayName, '#ffd200', '.85rem')
                        } else groups.push(e.displayName);

                        return e.memberIds;
                    }).flat()));

                    _local.set('groups', groups);
                    _local.set('uids', Object.assign(_local.get('uids'), data));
                    resolve(counter);
                });
            };
        })
    })('group');

    async function to_group(named, isConform) {
        await clicker(...steps.toGroup.contact);
        return await _do.scrollTo(steps.toGroup.inform, named, groupCounter, isConform);
    }

    async function leaveGroup(group) {
        if (!group) return;
        await _do.click(_do.get(steps.leaveGroup.option, group.parentElement), 1e2);
        await clicker(...steps.leaveGroup.leave);
        --groupCounter;
    }

    if (Array.isArray(agr.groupNamed || (agr.groupNamed = _local.get('groups')))) {
        for (let named of agr.groupNamed) {
            await pr(_ => _do.get(steps.toGroup.scroll)?.scrollIntoView(1), 1e2);
            named = await to_group(named, false)
            await leaveGroup(named)
        }
    } else await leaveGroup(await to_group(agr.groupNamed))


    // END CODE
    log('SESSION CLOSED', 'ORANGE', '1.2rem', 'bolder');
})(
    {
        // groupNamed: ''
        avoidGr: ['68', 'Ngọc nhi']
    }
)