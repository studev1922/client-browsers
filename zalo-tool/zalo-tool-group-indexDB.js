// Access the database (asynchronous operation)
indexedDB.open('zdb_409656126511270434')
    .onsuccess = e => {
        const db = e.target.result;

        let update = (table) => {
            // Start a transaction for reading and writing
            let transaction = db.transaction(table, 'readwrite');
            let objectStore = transaction.objectStore(table);

            // Open cursor to find and update the record
            objectStore.openCursor('g7695391071671501126').onsuccess = function (event) {
                const cursor = event.target.result;

                if (cursor) {
                    const record = cursor.value;
                    record.visibility = 0;
                    record.setting.lockViewMember = 0
                    cursor.update(record); // Update the record
                    console.info("Record updated successfully!");
                } else {
                    console.warn("Record not found with the given key.");
                }
            };

            // Handle potential errors
            transaction.onerror = function (event) {
                console.error("Error occurred during transaction:", event.target.error);
            };

        }
        update('group_info');
    };

// Handle database opening errors
indexedDB.onerror = function (event) {
    console.error("Error opening database:", event.target.errorCode);
};
