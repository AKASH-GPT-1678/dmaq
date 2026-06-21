# DMACQ Full Stack Internship Assignment

## Tech Stack

### Frontend

* Next.js
* React
* Tailwind CSS

### Backend

* Node.js
* Express.js

### Database

* MongoDB

### Real-Time Communication

* Socket.IO

### Deployment

* Frontend: Vercel
* Backend: Railway

## Features

* Simple username-based authentication
* Activity creation and listing
* Real-time activity updates using Socket.IO
* Multi-tenant activity isolation using `tenantId`
* Cursor-based pagination for efficient activity feed loading
* MongoDB indexing for optimized queries

## Database Design

Each activity contains:

* `tenantId`
* `createdAt`
* Activity details

Indexes are created on frequently queried fields to improve performance, particularly for activity feed retrieval and cursor-based pagination.

## Cursor-Based Pagination

Instead of offset-based pagination, the application uses cursor-based pagination with the `createdAt` field. This approach provides better performance and consistency when new activities are added in real time. Using mongoDB `skip` will make query very slow when database grows larger because even for getting page 40 and limit 20 it have to surf all records better approch is simply index combination of `tenantId` + `createdAt` which will make it directly jump into index 

## Real-Time Updates

Socket.IO is used to broadcast newly created activities to connected clients. When an activity is created successfully, the server emits an event and all users belonging to the same tenant receive the update instantly.

## Optimistic UI Update

New activities are displayed immediately in the UI to provide instant feedback to the user. Once the server confirms creation, the activity remains synchronized across all connected clients through Socket.IO.
