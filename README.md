# PrintZplus - Blockchain-Based Printing Service Platform

A decentralized platform that connects customers with 3D printing services using blockchain technology for secure transactions and smart contracts.

## 🏗️ Project Structure

This project is organized as a monorepo with separate frontend and backend applications:

```
PrintZplus/
├── frontend/                 # React + TypeScript + Vite frontend
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Application pages
│   │   ├── context/        # React context providers
│   │   ├── hooks/          # Custom React hooks
│   │   └── ...
│   ├── package.json
│   └── ...
├── backend/                 # Node.js + Express backend
│   ├── src/
│   │   ├── controllers/    # Request handlers
│   │   ├── models/         # Database models
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic
│   │   ├── utils/          # Utility functions
│   │   └── server.js       # Main server file
│   ├── package.json
│   └── ...
├── package.json            # Root package.json for monorepo
├── pnpm-workspace.yaml     # PNPM workspace configuration
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (>= 18.0.0)
- npm (>= 8.0.0) or pnpm
- MongoDB (for backend)
- Git

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd PrintZplus
   ```

2. **Install dependencies for all packages:**
   ```bash
   npm run install:all
   ```

   Or install individually:
   ```bash
   # Install root dependencies
   npm install
   
   # Install frontend dependencies
   npm run install:frontend
   
   # Install backend dependencies
   npm run install:backend
   ```

3. **Set up environment variables:**
   ```bash
   # Copy backend environment template
   cp backend/env.example backend/.env
   
   # Edit backend/.env with your configuration
   ```

### Development

**Start both frontend and backend in development mode:**
```bash
npm run dev
```

**Start individually:**
```bash
# Frontend only (runs on http://localhost:5173)
npm run dev:frontend

# Backend only (runs on http://localhost:5000)
npm run dev:backend
```

### Building for Production

**Build both applications:**
```bash
npm run build
```

**Build individually:**
```bash
npm run build:frontend
npm run build:backend
```

### Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start both frontend and backend in development mode |
| `npm run build` | Build both applications for production |
| `npm run start` | Start both applications in production mode |
| `npm run lint` | Run linting for both applications |
| `npm run clean` | Clean node_modules and build artifacts |

## 🛠️ Technology Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **React Router** - Client-side routing
- **Framer Motion** - Animations
- **React Hot Toast** - Notifications

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **Web3/Ethers** - Blockchain integration
- **Multer** - File upload handling

## 📁 Key Features

### Frontend Features
- 🏠 **Home Page** - Landing page with service overview
- 👤 **Customer Interface** - Browse and order printing services
- 🏪 **Shop Dashboard** - Manage printing services and orders
- 💳 **Payment Page** - Secure payment processing
- 🔗 **Blockchain Explorer** - View blockchain transactions
- ⚙️ **Admin Panel** - Platform administration

### Backend Features
- 🔐 **Authentication** - User registration, login, and JWT tokens
- 📋 **Print Job Management** - Create, update, and track print jobs
- 🔗 **Blockchain Integration** - Smart contract interactions
- 💰 **Payment Processing** - Secure payment handling
- 📊 **API Endpoints** - RESTful API for all operations

## 🔧 Configuration

### Frontend Configuration
- Vite configuration: `frontend/vite.config.ts`
- TypeScript config: `frontend/tsconfig.json`
- Tailwind config: `frontend/tailwind.config.js`
- ESLint config: `frontend/eslint.config.js`

### Backend Configuration
- Environment variables: `backend/.env`
- Server configuration: `backend/src/server.js`
- Database models: `backend/src/models/`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/your-repo/issues) page
2. Create a new issue with detailed information
3. Contact the development team

## 🔮 Roadmap

- [ ] Smart contract deployment
- [ ] Advanced payment integration
- [ ] Real-time notifications
- [ ] Mobile app development
- [ ] Advanced analytics dashboard
- [ ] Multi-language support

---

**PrintZplus Team** - Building the future of decentralized printing services.
