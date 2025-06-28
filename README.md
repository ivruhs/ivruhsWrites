# Ivruhs::Writes() ✍️

> A modern, AI-powered blog application with a clean admin interface and seamless content management.

## Live on **Vercel** 🚀 : LINK: (https://ivruhs-writes-fqqr.vercel.app/)

![Blog App](https://img.shields.io/badge/Blog-App-blue?style=for-the-badge)
![MERN Stack](https://img.shields.io/badge/MERN-Stack-green?style=for-the-badge)
![AI Powered](https://img.shields.io/badge/AI-Powered-purple?style=for-the-badge)

## 🌟 Features

### 📝 Content Management

- **Smart Blog Creation** - Create and manage blog posts with ease
- **Category Organization** - Organize blogs by categories for better navigation
- **AI-Powered Content Generation** - Generate blog content using DeepSeek AI model (using OpenRouter API Key)
- **Rich Media Support** - Upload and manage images seamlessly with ImageKit

### 👨‍💼 Admin Dashboard

- **Secure Admin Login** - Protected admin access with authentication (JWT)
- **Comprehensive Dashboard** - Overview of all blog posts and activities
- **Publish/Unpublish Control** - Manage blog visibility with one click
- **Comment Moderation** - Approve or reject comments before they go live

### 🎨 User Experience

- **Clean UI Design** - Modern interface inspired by Vercel v0
- **Responsive Design** - Perfect experience across all devices
- **Fast Performance** - Optimized for speed and user experience

## 🛠️ Tech Stack

### Frontend 🎨

- **React.js** - Dynamic user interface
- **Tailwind CSS** - Utility-first styling
- **Responsive Design** - Mobile-first approach

### Backend ⚙️

- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database for flexible data storage

### AI Integration 🤖

- **OpenRouter API** - AI model access
- **DeepSeek R1 (Qwen3-8B)** - Free AI model for content generation
- **Smart Content Creation** - Generate blog text based on title and subtitle

### Media Management 📸

- **ImageKit** - Image upload and optimization
- **CDN Integration** - Fast image delivery worldwide

### Deployment 🚀

- **Vercel** - Frontend and backend hosting
- **Environment Variables** - Secure API key management

## 🚀 Getting Started

### Prerequisites 📋

- Node.js (v14 or higher)
- MongoDB database
- OpenRouter API key
- ImageKit account

### Installation 💻

1. **Clone the repository**

   ```bash
   git clone https://github.com/ivruhs/ivruhsWrites
   cd ivruhsWrites
   ```

2. **Install dependencies**

   ```bash
   # Install backend dependencies
   cd server
   npm install

   # Install frontend dependencies
   cd client
   npm install
   cd ..
   ```

3. **Environment Setup** 🔐
   Create a `.env` file in the server directory:

   ```env
   # Database
   MONGODB_URI=your_mongodb_connection_string

   # Authentication
   JWT_SECRET=your_jwt_secret

   # AI Integration
   OPENROUTER_API_KEY=your_openrouter_api_key

   # Image Management
   IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
   IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
   IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint

    #Admin Credentials
    ADMIN_EMAIL=your_admin_email
    ADMIN_PASSWORD=your_admin_password

   # Application
   PORT=8000
   NODE_ENV=development
   ```

   Create a `.env` file in the client directory:

   ```env
   VITE_BASE_URL=your_backend_url
   ```

4. **Run the application** 🏃‍♂️

   ```bash
   # Development mode (runs both frontend and backend)
   npm run dev

   # Production build
   npm run build
   npm start
   ```

## 🎯 Key Features Explained

### AI Content Generation 🧠

The app integrates with OpenRouter API using the DeepSeek R1 model to generate blog content:

- Input title and subtitle
- AI generates relevant, engaging blog content
- One-click content creation for faster blogging

### Image Management 📷

ImageKit integration provides:

- Direct image uploads from the admin panel
- Automatic image optimization
- CDN delivery for fast loading
- Responsive image serving

### Admin Dashboard 📊

Comprehensive admin interface featuring:

- Blog post management
- Comment moderation
- Publishing controls
- Recent blogs overview

## 🌐 Deployment

The application is deployed on Vercel with:

- **Frontend**: Static site deployment
- **Backend**: Serverless functions
- **Database**: MongoDB Atlas
- **CDN**: ImageKit for media files

### Environment Variables on Vercel 🔧

Make sure to set all environment variables in your Vercel dashboard for production deployment.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 👨‍💻 Author

**Ivruhs** - [Your GitHub Profile](https://github.com/ivruhs)

## 🙏 Acknowledgments

- **Vercel v0** for UI inspiration
- **OpenRouter** for AI API access
- **ImageKit** for media management
- **MongoDB** for database solutions
- **Vercel** for hosting platform

---

**🚀 Built with ❤️ using the MERN stack**

[Live Demo](https://ivruhs-writes-fqqr.vercel.app/)
