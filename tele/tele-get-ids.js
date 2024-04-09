// AUTO BOT ON TELE WEB https://web.telegram.org/k
// SHOW DATA: _sup.local.get('ids')[this.location.href.substring(this.location.href.lastIndexOf('#'))]
const LOCAL_KEY = 'teleAutoClick';
const _sup = {
  _pr: (fun = () => void 0, time_out = 1e2) => new Promise(rs => { let data = fun(); time_out ? setTimeout(rs, time_out) : rs(data); return data; }),
  _log: (txt, color = '#fff', size = '1rem', weight = '100') => console.log(`%c${txt}`, `font-size:${size};color:${color};font-weight:${weight};`),
  local: {
    get: (key) => {
      let localKey = LOCAL_KEY || 'studev';
      _sup._log(`Get data by ${localKey}.${key}`, '#20b7ff', undefined, 'bolder');
      return JSON.parse(localStorage.getItem(localKey))?.[key];
    },
    set: (key, curent_data) => {
      let localKey = LOCAL_KEY || 'studev';
      _sup._log(`Data saving to ${localKey}.${key}`, '#20b7ff', undefined, 'bolder');
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
    },
    create: (e = 'div', attrs = {}) => {
      let element = document.createElement(e);
      let keys = Object.keys(attrs);
      for (const key of keys) element.setAttribute(key, attrs[key]);
      return element;
    }
  }
};

; (async (agr = { from: undefined, to: undefined }, call_stacks) => {
  const { _log, _pr, _do, local } = _sup;
  // BEGIN CODE
  let { from, to } = agr;
  let local_key = {
    ids: 'ids',
    group_key: from.substring(from.lastIndexOf('#'))
  }
  let st = {
    peerId_attr: 'data-peer-id',
    peerId_title: '#column-center .peer-title',
    groupPerson: '#column-center .person',
    listPerson: '#column-right .chatlist a',
  }

  let chatGroupElem;
  function create_action_on_group() {
    // Tạo NODE thay cho DOM ảo của React
    let idChatGroup = _do.get(st.peerId_title)?.getAttribute(st.peerId_attr);
    return chatGroupElem = _do.create('a', { [st.peerId_attr]: idChatGroup, href: `#${idChatGroup}` });
  }

  async function get_list_id(maxium_slot = call_stacks || 4500) {
    let isRuning = true, lastElem, data = [];
    async function pushIds() {
      let ids, elements = Array.from(_do.geties(st.listPerson));
      isRuning = lastElem != elements[elements.length - 1];

      if (!isRuning) return; // BREAK;

      lastElem = elements[elements.length - 1];
      ids = elements.map(e => e.getAttribute(st.peerId_attr));
      data.push(...ids);
      await _pr(() => lastElem.scrollIntoView(1), 100);
      await _pr(void 0, 2.5e2);
    }

    do {
      await pushIds();
      if (!--maxium_slot) break;
    } while (isRuning);

    return Array.from(new Set(data));
  }

  if (this.location.href != from) {
    confirm(`Trang cần chạy: "${from}"\nChuyển tới trang: "${this.location.href}"?`);
    this.location.href = from;
    _log('URL đã được thay đổi, chạy lại code lần nữa', 'aqua', '1.2rem', 'bolder');
    await _do.click(create_action_on_group(), 100);
  } else {
    create_action_on_group();
    await _do.click(chatGroupElem, 100); console.log('On group: ', chatGroupElem);
    await _do.click(_do.get(st.groupPerson), 100);
    let data = await get_list_id(call_stacks);
    local.set(local_key.ids, { [local_key.group_key]: data });
    console.log(data);
  }


  // END CODE
  _log('SESSION CLOSED', 'ORANGE', '1.2rem', 'bolder');
})(
  {
    from: 'https://web.telegram.org/k/#@OSpay008members',
  },
  10 // CALL-STACKs
)
