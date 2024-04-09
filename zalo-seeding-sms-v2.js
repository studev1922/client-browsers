// AUTO BOT ON ZALO WEB https://chat.zalo.me
const state = {
    is_alive: false, count_err: 5, c_down: 0,
    recordSet: { lcAt: undefined, lcMem: undefined, lcTime: undefined },
}
const _pr = (fun = () => void 0, time_out = 1e2) => new Promise((rs, rj) => { let data = fun(); time_out ? setTimeout(rs, time_out) : rs(data); return data; });
const _do = {
    evt: (e = new HTMLElement) => (e || document.body).addEventListener,
    click: (element, time_out) => _pr(() => element?.click(), time_out),
    get: (select = '', element) => (element || document).querySelector(select),
    geties: (select = '', element) => (element || document).querySelectorAll(select),
    includes: (txt = '', ...args) => {
        txt = txt.replaceAll(/\s/g, ' ').toLocaleUpperCase();
        return args.find(arg => txt.match(arg.toLocaleUpperCase()));
    }
}; (async (at = 0, times = 10, s_time = 1e3 * 60 * 3, group = '', avoid_sms = '', avoid_users = []) => {
    const st = {
        LC_KEY: '68Fruits',
        group: {
            wrapper: '#container .contact-item-v2-wrapper',
            name: '.name', label: '.label'
        },
        mem: {
            item: '[data-id="div_MemList_MemItem"]',
            name: 'span', role: '.truncate',
            viewMes: '#messageViewScroll',
            sms1: '.pi-primary-action-section>div:nth-child(2)',
            sms2: '.pi-primary-action-section>div:nth-child(1)',
            counter: '[data-translate-inner="STR_CONTACT_TAB_MEMBER_COUNTER_PLURAL"]',
            sts_mem: '[data-translate-inner="STR_MEMBER_V2"]',
        },
        sms: {
            quick: '#QR_ChatBar-Btn',
            btn: '[data-id="div_QuickMsg_QMList"] div div',
            input: '[data-translate-title="STR_SEND"]',
        },
        contact: {
            tab: '[data-translate-title="STR_TAB_CONTACT"]',
            tool: '[data-id="div_Main_TabTool"]',
            clickbal: '.rel.more-pop-item.clickable',
            icon: '[icon="icon-solid-left"]',
            tabv2: '#ContactTabV2 > div > div:nth-child(2)'
        },
    }
    const log = (txt, color = '#fff', size = '1rem', weight = '100') => console.log(`%c${txt}`, `font-size:${size};color:${color};font-weight:${weight};`);

    state.c_down = times;
    async function gr_filter(_gre, gr_name, gr_label, count = 3) {
        const gr_es = _do.geties(st.group.wrapper);
        for (const gr_e of gr_es) {
            gr_name = _do.get(st.group.name, gr_e)?.innerText;
            gr_label = _do.get(st.group.label, gr_e)?.innerText;
            if (_do.includes(gr_name, group)) { _gre = gr_e; break; }
        };

        if (_gre) {
            console.log(`${gr_label}\t:\t${gr_name}`);
            return _gre;
        } else if (!count) {
            confirm(`"${group}" không tồn tại!\nĐã tìm tới nhóm cuối: "${gr_name}"`)
            this.location.reload(); // tải lại trang
        } else {
            await _pr(() => gr_es[gr_es.length - 1].scrollIntoView(1), 50);
            return await gr_filter(_gre, gr_name, gr_label, --count);
        }
    };

    async function sms_user() {
        let name, role, doit = _do.geties(st.mem.item)[++at];
        const condition1 = () => (role = _do.get(st.mem.name, doit)?.innerText)?.length // ISN'T OWNER || ADMIN
            || _do.includes(state.recordSet.lcMem = name = _do.get(st.mem.role, doit).innerText, ...avoid_users);
        const condition2 = () => _do.get(st.mem.viewMes)?.innerText.includes(avoid_sms);

        // LƯU LẠI BẢN GHI
        state.recordSet.lcAt = at;
        state.recordSet.lcTime = Date.now();

        // KIỂM TRA TÊN VÀ QUYỀN HỢP LỆ [4]
        if (condition1()) {
            console.warn('CONDITION', name, role);
            return;
        }
        // [5] CHỌN NGƯỜI DÙNG
        await _do.click(doit, 1e3);
        // [6] GỬI TIN NHẮN || [data-id="btn_UserProfile_SendMsg"]
        await _do.click(_do.get(st.mem.sms1) || _do.get(st.mem.sms2), 200);
        // KIỂM TRA TIN NHẮN HỢP LỆ [7]
        if (condition2()) {
            console.warn("AVOID SMS: ", avoid_sms);
            return;
        }
        // [8] TIN NHẮN NHANH
        await _do.click(_do.get(st.sms.quick), 200);
        // [9] CHỌN TIN NHẮN ĐẦU TIÊN
        await _do.click(_do.get(st.sms.btn), 200);
        // [10] GỬI TIN NHẮN
        await _do.click(_do.get(st.sms.input), .5e3);

        console.info('SENT TO: ', name, at);
        return true;
    };

    async function mem_in_group(gr_t_loading = 1.5e3) { // chờ 1.5s để tải thành viên
        let gr_e, gr_mems;
        if (gr_e = await gr_filter(gr_e, undefined, undefined, 5)) { // [3] LỌC NHÓM THEO TÊN
            gr_mems = _do.get(st.mem.counter, gr_e);
            await _do.click(gr_mems, gr_t_loading) // [3] DANH SÁCH THÀNH VIÊN
        }
    }

    async function load_contact_sms() {
        let contact = _do.get(st.contact.tab);
        if (contact) {
            await _do.click(contact, 200); // DANH BẠ   
        } else {
            await _do.click(_do.get(st.contact.tool), 100); // TAB THANH ĐIỀU HƯỚNG
            await _do.click(_do.get(st.contact.clickbal), 100) // DANH SÁCH NHÓM
            await _do.click(_do.get(st.contact.icon), 100); // Back to the menu-items
        }
        await _do.click(_do.get(st.contact.tabv2), 200); // DANH SÁCH NHÓM
        await mem_in_group(1e3); // [2] CHỜ TẢI DS THÀNH VIÊN
    }

    function saveData() {
        let pre_data = JSON.parse(localStorage.getItem(st.LC_KEY) || '{}');
        let newObj = Object.assign(pre_data, { [group]: state.recordSet });
        localStorage.setItem(st.LC_KEY, JSON.stringify(newObj));
    }

    state.is_alive = true; // ON START
    ; (async () => {
        await new Promise(() => {
            let data = JSON.parse(localStorage.getItem(st.LC_KEY) || '{}');
            if (!data) return;

            if (data[group] && data[group].lcAt) {
                let { lcAt, lcMem, lcTime } = data[group];
                if (confirm(`Lần thực hiện trước: nhóm "${group}"\n\tThời gian: ${new Date(lcTime).toLocaleString('vi')}\n\tThành viên: ${lcMem}\n\tTại vị trí (${lcAt})`)) at = lcAt;
                console.warn(`Bắt đầu từ vị trí (${at}) nhóm ${group}`);
            }
        });

        log('KIỂM TRA TRẠNG THÁI...', 'cornflowerblue', '2rem', 'bolder');
        await load_contact_sms();
        let cMems, cMemRlt, e = _do.get(st.mem.sts_mem)?.parentNode.innerText;

        if (e && (cMems = Number(e.substring(e.indexOf('(') + 1, e.indexOf(')'))))
            > (cMemRlt = _do.geties(st.mem.item).length)) {
            confirm(`Có ${cMems} người trong nhóm "${group}"\nNhưng chỉ tìm được ${cMemRlt} thành viên`)
            location.reload();
        }
    })();

    do try {
        await load_contact_sms(); // [1] VÀO NHÓM CHỈ ĐỊNH
        if (await sms_user() && --state.c_down < 1) {
            log(`ĐÃ HẾT PHIÊN GỬI, CHỜ ${s_time / 1e3}s.`, '#20b7ff', '1.2rem', 'bolder');
            saveData(); await _pr(void 0, s_time);
            state.c_down = times;
        } // CHỜ PHIÊN TIẾP THEO
    } catch (error) {
        console.error(error);
        log(`%c SCRIPT-ERROR(${state.count_err})`, 'red', '1.2rem', 'bolder');
        if (!--state.count_err) {
            if (confirm(`Lỗi: ${error.message}\nTải lại trang?`)) this.location.reload();
            state.is_alive = false; break;
        }
    } while (state.is_alive);

    log('CLOSED', 'ORANGE', '1.2rem', 'bolder');
    saveData();
})(
    5 // VỊ TRÍ
    , 15 // SỐ LẦN GỬI SAU ĐÓ CHỜ
    , 1e3 * 60 * 12 // THỜI GIAN CHỜ
    , 'hàng tạp hóa' // NHÓM CẦN TƯƠNG TÁC
    , `https://zalo.me/g` // TRÁNH TIN NHẮN
    , ['fruit', 'food', 'trái cây', 'bị khóa', 'ngừng hoạt động'] // BỎ QUA NHỮNG NGƯỜI CÓ TÊN
)