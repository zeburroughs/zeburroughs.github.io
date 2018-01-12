let data = {}

function Item (obj) {
  self = {}
  self.table = obj.table
  self.size = obj.size
  self.row = obj.row
  self.group = obj.group
  self.name = obj.name
  if (!data[self.table]) data[self.table] = {}
  if (!data[self.table][self.row]) data[self.table][self.row] = []

  data[self.table][self.row].push(self)
  return self
}


Item({
  table: 'IEEE',
  size: 6,
  row: 1,
  group: '802.3 MAC',
  name: 'destination addr'
})

Item({
  table: 'IEEE',
  size: 6,
  row: 1,
  group: '802.3 MAC',
  name: 'source addr'
})

Item({
  table: 'IEEE',
  size: 2,
  row: 1,
  group: '802.3 MAC',
  name: 'length'
})


console.log(data)
