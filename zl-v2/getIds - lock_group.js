(async () => {
    const dbName = (await indexedDB.databases()).find(e => e.name.match(/^zdb_[0-9]+$/)).name;
    const request = indexedDB.open(dbName);

    request.onsuccess = (event) => {
        function step(table = 'group', onsuccess = () => void 0) {
            const db = event.target.result;
            let get = db.transaction(table, 'readonly').objectStore(table).getAll();

            get.onsuccess = onsuccess;
            get.onerror = e => console.error('Lỗi khi lấy dữ liệu:', e.target.error);
        }

        step('group_info', e => {
            let ids = e.target.result.filter(result => result.setting.lockViewMember === 0);
            ids = ids.map(d => d.userId)

            step('group', e => {
                let rs = e.target.result.filter(result => ids.includes(result.userId));
                rs = rs.map(d => ({ n: d.displayName, t: d.totalMember }))
                rs.forEach(e => {
                    console.log(e.n, e.t);
                });
            })
        })
    };
})()
