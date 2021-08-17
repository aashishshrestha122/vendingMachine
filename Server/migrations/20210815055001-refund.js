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
  await db.runSql(`CREATE TABLE refund (
                      refund_id INT NOT NULL AUTO_INCREMENT,
                      billing_id INT DEFAULT NULL,
                      item_id INT DEFAULT NULL,
                      item_price INT DEFAULT NULL,
                      refund_qty INT DEFAULT NULL,
                      refund_total INT DEFAULT NULL,
                      created_by INT DEFAULT NULL,
                      created_on DATETIME DEFAULT NULL,
                      updated_by INT DEFAULT NULL,
                      updated_on DATETIME DEFAULT NULL,
                      PRIMARY KEY (refund_id),
                      UNIQUE KEY billing_id_UNIQUE (billing_id)
                  )  ENGINE=INNODB AUTO_INCREMENT=1 DEFAULT CHARSET=UTF8MB4 COLLATE = UTF8MB4_0900_AI_CI;`)
};

exports.down = function (db) {
  return null;
};

exports._meta = {
  "version": 1
};
