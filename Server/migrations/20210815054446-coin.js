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
  await db.runSql(`CREATE TABLE coins (
                      id int NOT NULL AUTO_INCREMENT,
                      total_coins int NOT NULL DEFAULT '100',
                      PRIMARY KEY (id)
                    ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
`);

  await db.runSql(`INSERT INTO vendingmachine.coins
                  (
                    id,
                    total_coins
                  )
                  VALUES
                    ('1', '100');`);
};

exports.down = function (db) {
  return null;
};

exports._meta = {
  "version": 1
};
