let $ = sel => document.querySelector(sel)
let h = tag => document.createElement(tag)

let items = {}
let count = 1

$('.create.btn').onclick = () => {
  let name = $('.name_input').value
  let price = $('.price_input').value
  let stock = $('.stock_input').value
  
  addRow(name, price, stock)
}


$('.clear.btn').onclick = () => {
  clearForm()
}

function clearForm() {
  // reset() is a built-in method that restories form fields to their 
  // initial/default values.
  $('.inventory_form').reset()
}

function addRow(name, price, stock) {
  let id = count++
  items[id] = {
    'name': name,
    'price': price,
    'stock': stock
  }

  let row = h('tr')
  // FIX: Destructuring assignment requires an iterable(array, string, maps,- 
  // -sets, nodelists).
  // let name_cell, price_cell, stock_cell = h('td')
  
  // BUG: Uncaught TypeError: Cannot set properties of undefined- 
  // -(setting 'textContent').

  let name_cell = h('td')
  let price_cell = h('td')
  let stock_cell = h('td')
  let action_cell = h('td')

  name_cell.textContent = name
  price_cell.textContent = price
  stock_cell.textContent = stock

  let read_btn = h('button')
  read_btn.textContent = 'read'
  read_btn.classList.add('read', 'btn')
  let update_btn = h('button')
  update_btn.textContent = 'update'
  update_btn.classList.add('update', 'btn')
  let delete_btn = h('button')
  delete_btn.textContent = 'delete'
  delete_btn.classList.add('delete', 'btn')

  let action_buttons = h('div')
  action_buttons.classList.add('action_buttons')
  action_buttons.append(read_btn, update_btn, delete_btn)

  action_cell.append(action_buttons)

  row.append(name_cell, price_cell, stock_cell, action_cell)
  // FIX: data-id is for html, it's dataset.id in js.
  row.dataset.id = id

  $('.inventory_table').append(row)
  clearForm()
}

$('.save.btn').onclick = () => {
  let id = $('.save.btn').dataset.id

  items[id].name = $('.name_input').value
  items[id].price = $('.price_input').value
  items[id].stock = $('.stock_input').value

  let tr = $(`.inventory_table tr[data-id="${id}"`)
  tr.children[0].textContent = items[id].name
  tr.children[1].textContent = items[id].price
  tr.children[2].textContent = items[id].stock

  clearForm()
  $('.save.btn').style.display = 'none'
  $('.create.btn').style.display = 'inline'
}

$('.inventory_table').onclick = (event) => {
  // event = click
  // target = the element that was clicked
  // closest = the closest selector to that element
  let btn = event.target.closest('button')
  // This cancel the function if a button wasn't clicked, to stop an error.
  if (!btn) return
  // FIX: Its not data-id, that is the html attribute. The attribute read in 
  // js is .dataset.id
  let id = btn.closest('tr').dataset.id
  let item = items[id]

  if (btn.matches('.read.btn')) {
    // FIX: Forgot the class selector prefix '.' required for querySelector.
    $('.name_span').textContent = item.name
    $('.price_span').textContent = item.price
    $('.stock_span').textContent = item.stock
  }

  if (btn.matches('.update.btn')) {
    $('.name_input').value = item.name
    $('.price_input').value = item.price
    $('.stock_input').value = item.stock
    $('.save.btn').style.display = 'inline'
    // I was blanking on how to get the id to the form. Just save it as a
    // data attribute.
    $('.save.btn').dataset.id = id
    $('.create.btn').style.display = 'none'
    
    saveItem(id)
  }
}