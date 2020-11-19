const events = require('../../events');

// TODO: Change this to a Map<guildId, dispatcher>
let dispatchers = [];

function add(d) {
  dispatchers = [...dispatchers, d];
  d.on('end', () => remove(d));
}
function remove(d) {
  dispatchers = dispatchers.filter((v) => v !== d);
}
function get() {
  return [...dispatchers];
}
function end(d) {
  const toEnd = dispatchers.find((e) => e === d);
  if (toEnd) {
    toEnd.end();
    remove(toEnd);
  }
}
function endAll() {
  dispatchers.forEach(end);
  dispatchers = [];
}

events.on('kill', () => endAll());

module.exports = { add, remove, get, end, endAll };
