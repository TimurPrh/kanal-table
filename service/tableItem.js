const db = require("./db");

// CREATE TABLE items (
//   id serial primary key,
//   date date NOT NULL,
//   name varchar(255) NOT NULL,
//   quantity int NOT NULL,
//   distance real NOT NULL
// );
// date format yyyy-mm-dd

async function getItems(limit, offset, orderBy, orderDirection, filterBy, filterCondition, filterText) {
  let whereStr = ``
  // filterBy = '' || 'date' || 'name' || 'quantity' || 'distance'
  // filterCondition = '=' || 'like' || '>' || '<'
  // filterText = 'qwe' || ''
  if (filterBy !== '' && filterText !== '') {
    if (filterCondition === 'like') {
      whereStr = `WHERE ${filterBy}::text LIKE '%${filterText}%'`
    } else {
      whereStr = `WHERE ${filterBy} ${filterCondition} '${filterText}'`
    }
  }

  const res = await db.query(
    `SELECT 
      * 
    FROM 
      items 
    ${whereStr}
    ORDER BY 
      ${orderBy} ${orderDirection}
    limit ${limit} offset ${offset};
    `
  );

  return {
    res
  };
}

async function getItemsCount(filterBy, filterCondition, filterText) {
  let whereStr = ``
  // filterBy = '' || 'date' || 'name' || 'quantity' || 'distance'
  // filterCondition = '=' || 'like' || '>' || '<'
  // filterText = 'qwe' || ''
  if (filterBy !== '' && filterText !== '') {
    if (filterCondition === 'like') {
      whereStr = `WHERE ${filterBy}::text LIKE '%${filterText}%'`
    } else {
      whereStr = `WHERE ${filterBy} ${filterCondition} '${filterText}'`
    }
  }

  const res = await db.query(
    `SELECT 
      COUNT(*) 
    FROM 
      items
    ${whereStr};
    `
  );

  return {
    res
  };
}

async function createItem(item) {
  const result = await db.query(
    `INSERT INTO items 
      (date, name, quantity, distance) 
    VALUES 
      ('${item.date}', '${item.name}', ${item.quantity}, ${item.distance});`
  );

  let message = "Error in creating item";

  if (result.rowCount) {
    message = "Item created successfully";
  }

  return { message };
}

async function removeItem(id) {
  const result = await db.query(
    `DELETE FROM items WHERE id=${id}`
  );

  let message = "Error in deleting menu item";

  if (result.rowCount) {
    message = "Menu item deleted successfully";
  }

  return { message };
}

module.exports = {
  getItems,
  getItemsCount,
  createItem,
  removeItem
};