const ticketFormat = (id, title, description, tried, category, status, student, helper) => {
  const format = {
    "type": "section",
    "text": {
      "type": "mrkdwn",
      "text": "*ID*: "+ id
    },
    "fields": [
      {
        "type": "mrkdwn",
        "text": "*Title*: " + title
      },
      {
        "type": "mrkdwn",
        "text": "*Status*: " + status
      },
      {
        "type": "mrkdwn",
        "text": "*Description*: " + description
      },
      {
        "type": "mrkdwn",
        "text": "*What I've tried*: "+ tried
      },
      {
        "type": "mrkdwn",
        "text": "*Student*: " + student
      },
      {
        "type": "mrkdwn",
        "text": "*Category*: " + category
      }
    ]
  }
  if (helper) {
    format.fields.push(
      {
        "type": "mrkdwn",
        "text": "*Helper*: " + helper
      }
    )
  }
  return format
}


const tickets = tickets => {
  const base = {
    "blocks": []
  };
  tickets.forEach(ticket => {
    if (base.blocks.length > 0) {
      base.blocks.push(
        {
          "type": "divider"
        }
      )
    }
    base.blocks.push(
      ticketFormat(ticket.id, 
        ticket.title, 
        ticket.description, 
        ticket.tried, 
        ticket.category, 
        ticket.status, 
        ticket.student, 
        ticket.helper || null)
    )
  })
  return base
}

module.exports = tickets