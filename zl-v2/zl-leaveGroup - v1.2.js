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
                        console.log(`${inTxt}\n${txtValue}\n\n`, inTxt === txtValue);
                        if (_sup._do.includes(inTxt, txtValue)) {
                            _sup.log(`FOUND: ${inTxt}`, '#20b7ff', '1.2rem', 'bolder');
                            await _sup.pr(_ => elem.scrollIntoView(1));
                            res(elem); return;
                        };
                    }
                    _sup.log(inTxt, '#ff0000', '.7rem', undefined, 'text-decoration:line-through;');
                    await _sup.pr(_ => elem?.scrollIntoView(1));
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
    clicker: async (...steps) => {
        for (const st of steps)
            if (!st) continue;
            else typeof st === HTMLElement
                ? await _sup._do.click(st, 1e2)
                : await _sup._do.click(
                    typeof st === 'string' ? st : st.s || st.select,
                    st.t || st.time || 1e2
                );
    }
}; (async (isSaveData, agr = { groupNamed: undefined, avoidGr: [] }) => {
    const { log, clicker, pr, _do, _local } = _sup;
    const request = indexedDB.open((await indexedDB.databases()).find(e => e.name.match(/^zdb_[0-9]+$/)).name);

    // BEGIN CODE
    let steps = {
        toGroup: {
            contact: {
                main: '[data-id="div_Main_TabTool"]',
                strTab: '[data-translate-inner="STR_TAB_CONTACT"]',
                community: '[data-translate-inner="STR_CONTACT_TAB_GROUP_COMMUNITY_LIST"]'
            },
            scroll: '#container > div.contact-pages.page-container > div.card-list-wrapper > div > div:nth-child(1) > div > div:nth-child(1) > div > div',
            inform: { geties: '.friend-info', jsTxtCompare: '.name' },
        },
        leaveGroup: {
            option: '[icon="ic_them"]',
            leaveGr: '.popover-v3>.zmenu-body>div>div>div-14',
            leaveConf: '[data-translate-inner="STR_COMMUNITY_LEAVEGROUP_MENU"]'
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
                            agr.avoidGr.push(e.displayName);
                        } else groups.push(e.displayName);
                        return e.memberIds;
                    }).flat()));

                    if (isSaveData || !_local.get('groups'))
                        _local.set('groups', Object.assign(groups, _local.get('groups')));
                    if (isSaveData || !_local.get('uids'))
                        _local.set('uids', Object.assign(data, _local.get('uids')));
                    resolve(counter);
                });
            };
        })
    })('group');

    async function to_group(named, isConform) {
        if (!named) return;
        let { contact, inform } = steps.toGroup;

        if (!_do.get(contact.strTab)) await _do.click(contact.main, 1e2)
        await clicker(contact.strTab, contact.community);
        return await _do.scrollTo(inform, named, groupCounter, isConform);
    }

    async function leaveGroup(group) {
        if (!group) return;
        let conf, { option, leaveGr, leaveConf } = steps.leaveGroup;
        await _do.click(_do.get(option, group.parentElement), 1e2);
        await _do.click(_do.get(leaveGr), 1e2);
        await _do.click(conf = _do.get(leaveConf), 1e2);
        --groupCounter; return conf;
    }

    async function doLeave(named, isLeaved = true) {
        if (isLeaved) await pr(_ => _do.get(steps.toGroup.scroll)?.scrollIntoView(1), 1e2);
        return await leaveGroup(await to_group(named, false));
    }

    if (Array.isArray(agr.groupNamed || (agr.groupNamed = _local.get('groups')))) {
        let leaved = false;
        for (let named of agr.groupNamed) leaved = await doLeave(named, leaved);
    } else await doLeave(agr.groupNamed);

    // END CODE
    log('SESSION CLOSED', 'ORANGE', '1.2rem', 'bolder');
})(
    true, // SAVE DATA TO LOCAL_STORE
    {
        groupNamed: undefined,
        avoidGr: [
            '68', 'Ngọc nhi'
        ]
    }
) // _sup._local.set('groups', {})