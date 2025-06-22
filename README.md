# Personal Blog Site

A modern personal blog site built with Next.js, Redux Toolkit, Material-UI, and MongoDB.

## Features

- ✨ Create, read, update, and delete blog posts
- 🎨 Modern and responsive UI with Material-UI
- 📱 Mobile-friendly design
- 🔍 Filter posts by published/draft status
- 📄 Pagination support
- 🏷️ Tag system for blog posts
- 📸 Featured image support
- ⚡ Fast performance with Next.js
- 🗄️ MongoDB database with Mongoose ODM

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **State Management**: Redux Toolkit
- **UI Framework**: Material-UI (MUI)
- **Form Handling**: React Hook Form with Yup validation
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Mongoose
- **Styling**: MUI System + CSS-in-JS

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   └── blogs/         # Blog API endpoints
│   ├── blog/              # Blog detail pages
│   ├── create/            # Create blog page
│   ├── edit/              # Edit blog pages
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── Blog/              # Blog-related components
│   └── Layout/            # Layout components
├── lib/                   # Utility libraries
│   └── mongodb.ts         # MongoDB connection
├── models/                # Database models
│   └── Blog.ts            # Blog model
├── store/                 # Redux store
│   ├── api/               # API services
│   ├── slices/            # Redux slices
│   ├── hooks.ts           # Redux hooks
│   └── store.ts           # Store configuration
└── theme/                 # MUI theme configuration
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- MongoDB (local or cloud)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd blogSite
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory:
```env
MONGODB_URI=mongodb://localhost:27017/blogSite
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Endpoints

### Blogs
- `GET /api/blogs` - Get all blogs (with optional filters)
- `POST /api/blogs` - Create a new blog
- `GET /api/blogs/[id]` - Get a specific blog
- `PUT /api/blogs/[id]` - Update a blog
- `DELETE /api/blogs/[id]` - Delete a blog

### Query Parameters
- `author` - Filter by author
- `published` - Filter by published status (true/false)
- `page` - Page number for pagination
- `limit` - Number of items per page

## Usage

### Creating a Blog Post
1. Click "New Post" in the header
2. Fill in the title, excerpt, author, and content
3. Add tags (optional)
4. Upload a featured image URL (optional)
5. Choose to publish immediately or save as draft
6. Click "Create Blog"

### Editing a Blog Post
1. Click "Edit" on any blog card or blog detail page
2. Modify the content as needed
3. Click "Update Blog"

### Deleting a Blog Post
1. Click "Delete" on any blog card or blog detail page
2. Confirm the deletion

### Filtering Posts
Use the filter dropdown on the home page to view:
- All posts
- Published posts only
- Draft posts only

## Database Schema

### Blog Model
```typescript
{
  title: string (required, max 100 chars)
  content: string (required)
  excerpt: string (required, max 200 chars)
  author: string (required)
  tags: string[]
  published: boolean (default: false)
  featuredImage: string
  createdAt: Date
  updatedAt: Date
}
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
