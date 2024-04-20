// https://www.facebook.com/me/friends
; (async (txt = 'Unfollow', continues = []) => {
    const _pr = (fun = () => { }, time_out = 5e2) => new Promise(rs => { fun(); setTimeout(rs, time_out) });
    const _do = {
        get: (select, e) => (e || document).querySelector(select),
        gets: (selects, e) => (e || document).querySelectorAll(selects),
        evt: (e = new HTMLElement()) => (e || document.body).addEventListener,
        click: async (e, time_out) => time_out ? await _pr(() => e?.click(), time_out) : e?.click(),
        includes: (txt = '', ...agrs) => {
            const pattern = new RegExp(`(${agrs.join('|')})`, 'i');
            txt = txt.replaceAll('&nbsp;', ' ').toUpperCase();

            for (const agr of agrs) {
                if (pattern.test(txt)) return txt.match(pattern)[1];
            }
        },
        e_includes: (es, txt) => {
            for (let i = 0; i < es.length; i++) {
                const e = es[i];
                if (_do.includes(e.innerText, txt)) return e;
            }
        }
    };
    if (!this.location.href.lastIndexOf('friends') > 0) {
        alert('Cần mở danh sách bạn bè.\n Tải trang bạn bè >>> ...')
        this.location.href = 'https://www.facebook.com/me/friends'
    }

    let list = [...document.querySelector('.x78zum5.x1q0g3np.x1a02dak.x1qughib').children];
    list.forEach(async element => {
        let [img, inf, option] = element.children;
        let name = _do.get('a[role="link"] span', inf)?.innerText;
        let e;

        if (_do.includes(name, ...continues)) console.warn(name, _do.get('[href]').href);
        else if (
            await _do.click(_do.get('[role] i', option), 250)
            && !(e = e_includes(_do.get('[role="menu"] div div div div div div').children, txt))
        ) {
            await _do.click(e, 250);
            await _pr(void 0, 1.5e3);
            let confirm = _do.get('[aria-label="Confirm"]');
            console.log(`${confirm?.innerText} ${txt} ${name}`); // Confirm unfriend ...

            _do.click(_do.get('.__fb-dark-mode [role="dialog"] [aria-label="Close"]'), 250)
        }

    });
})(
    'Unfriend'
    , [
        "nguyen tran ngoc anh", 'Đặng Ngọc Hà', 'Đỗ Thị Thu Thủy', 'Ngô', 'Rosa', 'Duong'
    ]
)