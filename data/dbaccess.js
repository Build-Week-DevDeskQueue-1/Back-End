const db = require('./dbconfig')

const register = user => {
  return db('users').insert({ 
    ...user,
    is_student: user.is_student || false,
    is_helper: user.is_helper || false 
  })
}

const user = user => {
  return db('users').where({ username: user.username }).first()
}

const tickets = id => {
  if (id) {
    return db('tickets').where({ 'tickets.id':id })
    .join('users as student', { 'tickets.student_id': 'student.id' })
    .leftJoin('users as helper', { 'tickets.helper_id': 'helper.id' })
    .select(
      'tickets.id', 
      'title', 
      'description', 
      'tried', 
      'category', 
      'is_open', 
      'student.username as student', 
      'helper.username as helper'
    )
  } else {
    return db('tickets')
    .join('users as student', { 'tickets.student_id': 'student.id' })
    .leftJoin('users as helper', { 'tickets.helper_id': 'helper.id' })
    .select(
      'tickets.id', 
      'title', 
      'description', 
      'tried', 
      'category', 
      'is_open', 
      'student.username as student', 
      'helper.username as helper'
    )
  }
}

const assignTicket = (ticketId, helperId) => {
  return db('tickets').where({ 'tickets.id': ticketId }).update({ helper_id: helperId })
}

module.exports = {
  register,
  user,
  tickets,
  assignTicket
}