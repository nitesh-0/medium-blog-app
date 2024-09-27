# Medium: A Blog App

A web application inspired by Medium, where users can create, edit, and view blogs. The app allows authenticated users to write and manage their blogs, while providing a clean, responsive interface for viewing content.

## Features

- **Signup & Signin**: Secure authentication system using JWT for users.
- **Create Blog**: Write new blogs and save them to the database.
- **Edit Blog**: Modify existing blog content.
- **Get Blogs**: Retrieve and display all available blogs.
- **Read Particular Blog**: Click on a blog to read its detailed content.

## Technologies Used

- **Frontend**: React, Tailwind CSS
- **Backend**: Node.js, Hono Framework, Prisma ORM, ZOD for validation, JWT for authentication
- **Database**: PostgreSQL
- **Language**: TypeScript
- **Backend Deployment**: Cloudflare Workers

## Prerequisites

- Node.js v16+ installed
- PostgreSQL database (local or cloud-based like [Neon.tech](https://neon.tech/))
- Docker (optional, for running PostgreSQL locally)

## Getting Started

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/nitesh-0/medium-blog-app.git
   cd medium-blog-app
