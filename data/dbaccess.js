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
      'status', 
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
      'status', 
      'student.username as student', 
      'helper.username as helper'
    )
  }
}

const createTicket = (ticket, studentId) => {
  return db('tickets').insert({ ...ticket, student_id: studentId })
}

const assignTicket = (ticketId, helperId) => {
  return db('tickets').where({ 'tickets.id': ticketId }).update({ status: "closed", helper_id: helperId })
}

const resolveOrReopen = (ticketId, action) => {
  if (action === "resolve") {
    return db('tickets').where({ 'tickets.id': ticketId }).update({ status: "resolved" })
  } else
  if (action === "reopen") {
    return db('tickets').where({ 'tickets.id': ticketId }).update({ status: "open", helper_id: null })
  }
}

module.exports = {
  register,
  user,
  tickets,
  createTicket,
  assignTicket,
  resolveOrReopen
}