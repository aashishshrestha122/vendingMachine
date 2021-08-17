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
  await db.runSql(`CREATE TABLE items (
                    item_id int NOT NULL AUTO_INCREMENT,
                    item_name varchar(45) DEFAULT NULL,
                    item_type varchar(45) DEFAULT NULL,
                    created_by int DEFAULT NULL,
                    created_on datetime DEFAULT NULL,
                    updated_by int DEFAULT NULL,
                    updated_on datetime DEFAULT NULL,
                    PRIMARY KEY (item_id)
                  ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
`)
  await db.runSql(`
                    INSERT INTO items
                    (
                      item_id,
                      item_name,
                      item_type,
                      created_by,
                      created_on,
                      updated_by,
                      updated_on
                    )
                    VALUES
                      ('1', 'Coke', 'Drink', '1', '2021-08-13 14:34:10', '1', '2021-08-13 14:34:10'),
                      ('2', 'Pepsi', 'Drink', '1', '2021-08-13 14:34:10', '1', '2021-08-13 14:34:10'),
                      ('3', 'Dew', 'Drink', '1', '2021-08-13 14:34:10', '1', '2021-08-13 14:34:10');`
  )
};

exports.down = function (db) {
  return null;
};

exports._meta = {
  "version": 1
};
