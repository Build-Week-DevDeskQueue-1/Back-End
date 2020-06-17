Endpoints:
| URL  | Method | Description | Required properties | Example data/request |
| --- | --- | --- | --- | --- |
| /auth/register | POST | Registration | `username`, `password`, `is_student`:`true` and/or `is_helper`:`true` | `{username: "bob", password: "bob1", is_student: true}`
| /auth/login | POST | Login |`username`, `password` | `{username: "bob", password: "bob1"}`|
| /auth/logout | POST | Logout | None | No data returned or submitted |
| /tickets | POST | Create ticket |`title`, `description`, `tried`, `category` | `{title: "help", description: "wont work", tried: "nothing", category: "tech support"}`|
| /tickets | GET | Get tickets | None | `[{ "id": 1, "title": "ticket1", "description": "tried doing this thing but doesnt work", "tried": "everything", "category": "tech support", "status": "open", "student": "student1", "helper": null }]`|
| /tickets | GET | Get ticket by id | `id` | Same as above, but the single specified ticket|
| /tickets/assign | PUT | Helper assigning to ticket | `id`(of ticket) | `{id: 1}`|
| /tickets/status | PUT | Change ticket status | `id`(of ticket) `action`:`resolve` or `reopen` | `{id: 1, action: resolve}`|

`id` fields are ints, `is_student`/`is_helper` fields are true/false, all else are strings

@ me on slack for any questions or clarifications
