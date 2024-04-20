; (async (lastTime = 0, avoid_users = []) => {
    const _pr = (fun = () => { }, time_out = 5e2) => new Promise(rs => { fun(); setTimeout(rs, time_out) });
    const _do = {
        evt: (e = new HTMLElement) => (e || document.body).addEventListener,
        click: (element, time_out) => _pr(() => element?.click(), time_out),
        get: (select = '', element) => (element || document).querySelector(select),
        geties: (select = '', element) => (element || document).querySelectorAll(select),
        includes: (txt = '', ...args) => {
            txt = txt.replaceAll(/\s/g, ' ').toLocaleUpperCase();
            return args.find(arg => txt.includes(arg.toLocaleUpperCase()));
        }
    };
    /**
     * Default is the previos date.
     * EX: 1 === '1 ngày', '1 giờ', '20/1/2024'
     * 
     * @param {String || Number} time '_ ngày' | '_ giờ' | _
     * @returns {Date}
     */
    function toDate(time = new Date().toLocaleDateString('vi')) {
        let temp = time;
        let isStr = typeof time === 'string';
        let [d, m, y] = isStr ? time.split('/') : [];
        let now = Date.now();

        if (!time) return new Date();

        if (isStr) {
            if (d && m && y) return new Date(y, Number(m) - 1, d);
            else if (time.includes('giờ')) return new Date(now - Number(temp.split(' ')[0]) * 36e5);
            else if (time === 'Hôm qua' || time === 'Một ngày') return new Date(now - 864e5);
            else if (time.includes('ngày')) return new Date(now - Number(time.split(' ')[0]) * 864e5);
        }

        if (typeof time === 'number') return new Date(now - time * 864e5);
        return new Date(now - Number(temp.split(' ')[0]) * 36e5);
    }

    // CHẠY CÁI NÀY NẾU CHƯA LOAD DANH SÁCH CHỜ ĐỢI
    ; (async () => {
        if (!document.querySelector('.card-invitation-list')) {
            await _do.click(_do.get('[data-translate-title="STR_TAB_CONTACT"]'), 150); // Contact
            await _do.click(_do.get('#ContactTabV2 .menu-item:nth-child(3)'), 1e3); // Request
        }
        await _do.click(_do.get('.card-list-view-more .view-more__btn'), 350); // View more requested
    })();

    // ANONYMOUS FUNCTION NÀY CUỘN TỚI NGÀY CẦN CHẠY
    ; (async () => {
        let list, j = lastTime + 3, extra, oT = Number.isNaN(Number(lastTime)); // is locale date string
        oT = oT ? toDate(lastTime) : new Date(Date.now() - 864e5 * lastTime);

        do {
            await _pr(void 0, 1e3);
            list = _do.geties('.sent--friend');
            list.forEach(card => extra = _do.get('.card-name .extra', card)?.innerText);
            list[list.length - 1].scrollIntoView(1);
            console.log('Scroll into view ', _do.get('.sent--friend .card-name .extra').innerText);
        } while (toDate(extra) > oT && --j);
        list[0].scrollIntoView(1);
        console.log('Scroll into view ', _do.get('.sent--friend .card-name').innerText);
    })();



    const lT = toDate(lastTime);
    async function unSentFriend(card) {
        if (!card) return true;
        card.scrollIntoView(1);

        let [inf, unSent, _sms] = card.children;
        let [name, extra] = _do.get('.card-name', inf).children;
        let _name = name?.innerText || '', _extra = extra?.innerText || '';

        if (_do.includes(_name || '', ...avoid_users) || toDate(_extra) < lT) {
            await _do.click(_do.get('div', unSent), 300); // btnUnsent
            await _do.click(_do.get('.zl-modal__dialog .btn-danger'), 250); // btnConfirm
            console.warn(_extra, `\t:\tUnsent ${_name}!`);
            await _do.click(_do.get('.fa-close.f16'), 250); // btnClose modal
            return true;
        } else console.info(_extra, `${_name}'s next.`);
    }

    // do {
    //     await _pr(void 0, 1.5e3);
    //     let cards = _do.geties('.sent--friend');
    //     for (let card of cards) {
    //         await unSentFriend(card);
    //         await _pr(void 0, 200);
    //     }
    // } while (true);

    await _pr(void 0, 1.5e3);
    do {
        await unSentFriend(_do.get('.sent--friend'));
        _do.get("#container .grid > div > div:nth-child(1) > div > div:nth-child(1) > div > div").scrollIntoView(0);
        await _pr(void 0, 200);
    } while (true);
})(
    /**
     * 0 ('1 giờ' | '2 giờ' | '3 giờ'): hôm nay
     * 1 || '1 ngày': hôm qua
     * 2 || '2 ngày': 2 ngày trước
     * 'dd/MM/yyyy'
     */
    7
    , ['fruit', 'food', 'bán', 'ăn vặt', 'trái cây', 'hoa quả'] // HỦY KẾT BẠN VỚI
);