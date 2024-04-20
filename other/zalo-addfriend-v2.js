const state = {
    recordSet: { name: undefined, role: undefined, at: 0 }
}; (async (at = 0, count = 50, avoid_users = []) => {
    // UTILS
    const _pr = (fun = () => void 0, time_out = 1e2) => new Promise((rs, rj) => { let data = fun(); time_out ? setTimeout(rs, time_out) : rs(data); return data; });
    const _do = {
        evt: (e = new HTMLElement) => (e || document.body).addEventListener,
        click: (element, time_out) => _pr(() => element?.click(), time_out),
        get: (select = '', element) => (element || document).querySelector(select),
        geties: (select = '', element) => (element || document).querySelectorAll(select),
        includes: (txt = '', ...args) => {
            txt = txt.replaceAll(/\s/g, ' ').toLocaleUpperCase();
            return args.find(arg => txt.includes(arg.toLocaleUpperCase()));
        }
    }; const lc = {
        getData: (key) => JSON.parse(localStorage.getItem(key) || '{}'),
        saveData(key, data) { // { [group]: state.recordSet }
            let newObj = Object.assign(lc.getData(key), data);
            localStorage.setItem(key, JSON.stringify(newObj));
            console.warn(`"${key}" has been saved.`, data);
        }
    };
    const log = (txt, color = '#fff', size = '1rem', weight = '100') => console.log(`%c${txt}`, `font-size:${size};color:${color};font-weight:${weight};`);

    const st = {
        LC_KEY: '68Fruits_add_friends',
        gr_named: '#header div-b18',
        af: {
            mems: '[data-id="div_MemList_MemItem"]',
            role: 'span',
            name: '.truncate',
            btnAF: '[data-id="div_MemItem_AddFrd"]',
            btnAFAdd: '[data-id="btn_AddFrd_Add"]',
        }
    };

    // FIRST CHECK AND REQUIRED
    var group; (() => {
        group = _do.get(st.gr_named)?.innerText.replaceAll(/\s/g, ' ');
        if (group) {
            let rcs = lc.getData(st.LC_KEY)[group];
            if (rcs && (state.recordSet = rcs) && confirm(`NHÓM: "${group}"\nLần trước đó:\n\t- Thời gian:\t${new Date(rcs.time).toLocaleString('vi')}\n\t- Thành viên: ${rcs.name}\n\t- Vị trí: ${rcs.at}`)) {
                log(`TIẾP TỤC VỚI: (${state.recordSet.at = rcs.at}) : "${group}"`, 'orange', '1.5rem', 'bolder');
            } else log(`CHẠY LẦN ĐẦU VỚI: (${state.recordSet.at = at}) : "${group}"`, 'orange', '1.5rem', 'bolder');
        } else {
            confirm('Không tìm thấy nhóm!\n\t s1: chọn nhóm cần lấy thành viên\n\t s2: mở danh sách thành viên nhóm\n\t s3: chạy lại đoạn script.')
            this.location.reload();
        }
    })();

    // ADD FRIENDS FUNCTION
    const add_friend = async () => {
        let name, role, doit = _do.geties(st.af.mems)[1]; // USER
        const condition = () => (role = doit.querySelector(st.af.role)?.innerText)?.length // ISN'T OWNER || ADMIN
            || _do.includes(name = doit.querySelector(st.af.name).innerText, ...avoid_users);

        if (doit && !condition()) {
            doit.scrollIntoView(1)
            await _do.click(_do.get(st.af.btnAF, doit), 50); // KẾT BẠN
            await _do.click(_do.get(st.af.btnAFAdd), 50); // GỬI KẾT BẠN
            console.info(state.recordSet = { name, role }, --count);
        } else await _pr(void 0, 10);
    };
    do await add_friend(); while (count);

    // LƯU DỮ LIỆU
    log('ĐANG THỰC HIỆN LƯU DỮ LIỆU', 'orange', '1.2rem', 900);
    if (group) {
        state.recordSet.time = Date.now();
        lc.saveData(st.LC_KEY, { [group]: state.recordSet });
    } else confirm('Không tìm thấy tên nhóm!, không lưu được 😥')
})(
    3 // VỊ TRÍ BẮT ĐẦU
    , 68 // THÊM 50 NGƯỜI
    , ['fruit', 'food', 'bán', 'ăn vặt', 'trái cây'] // TRÁNH NGƯỜI
);