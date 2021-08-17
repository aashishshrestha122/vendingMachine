'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = async function (db) {
  await db.runSql(`CREATE TABLE item_inventory
                  (
                    item_inventory_id int NOT NULL AUTO_INCREMENT,
                    item_id int DEFAULT NULL,
                    item_price int DEFAULT NULL,
                    item_quantity int DEFAULT NULL,
                    created_by int DEFAULT NULL,
                    created_on datetime DEFAULT NULL,
                    updated_by int DEFAULT NULL,
                    updated_on datetime DEFAULT NULL,
                    PRIMARY KEY (item_inventory_id)
                  ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
`);

  await db.runSql(`INSERT INTO vendingmachine.item_inventory
                    (
                      item_inventory_id,
                      item_id,
                      item_price,
                      item_quantity,
                      created_by,
                      created_on,
                      updated_by,
                      updated_on
                    )
                    VALUES
                      ('1', '1', '20', '10', '1', '2021-08-13 14:40:16', '1', '2021-08-13 14:40:16'),
                      ('2', '2', '25', '10', '1', '2021-08-13 14:40:16', '1', '2021-08-13 14:40:16'),
                      ('3', '3', '30', '10', '1', '2021-08-13 14:40:16', '1', '2021-08-13 14:40:16');`
  )
};

exports.down = function (db) {
  return null;
};

exports._meta = {
  "version": 1
};
