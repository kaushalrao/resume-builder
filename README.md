# Resume Builder

A modern, interactive resume builder built with React, Vite, and Tailwind CSS. Create professional resumes with multiple templates, customizable colors, and export to PDF functionality.

![Resume Builder](https://img.shields.io/badge/React-18.2.0-blue)
![Vite](https://img.shields.io/badge/Vite-4.4.5-646CFF)
![Tailwind](https://img.shields.io/badge/Tailwind-3.3.3-38B2AC)

## ✨ Features

- 🎨 **Multiple Templates**: Choose from various professional resume templates
- 🌈 **Color Customization**: Customize primary, secondary, and accent colors
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- 💾 **Auto-save**: Automatically saves your progress to local storage
- 📄 **PDF Export**: Export your resume as a high-quality PDF
- 🖼️ **Profile Image**: Add and display profile pictures
- 📋 **Comprehensive Sections**: 
  - Personal Information
  - Work Experience
  - Education
  - Skills
  - Projects
  - Certifications
- 👀 **Live Preview**: Real-time preview of your resume as you edit
- 🎭 **Preview Mode**: Full-screen preview mode for final review

## 🛠️ Tech Stack

- **Frontend**: React 18.2.0
- **Build Tool**: Vite 4.4.5
- **Styling**: Tailwind CSS 3.3.3
- **UI Components**: Radix UI primitives
- **Animations**: Framer Motion
- **PDF Generation**: jsPDF + html2canvas
- **Icons**: Lucide React

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd resume-builder
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 📖 Usage

1. **Fill in your information**: Start by entering your personal details, work experience, education, and skills
2. **Choose a template**: Select from available professional templates
3. **Customize colors**: Pick your preferred color scheme
4. **Preview**: Use the preview mode to see how your resume looks
5. **Export**: Download your resume as a PDF when you're satisfied

## 🎨 Templates

Currently available templates:
- Modern Template (default)
- Additional templates can be easily added

## 🔧 Configuration

### Environment Setup

The project uses Vite for development and building. Configuration files:

- `vite.config.js` - Vite configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `postcss.config.js` - PostCSS configuration

### Customization

- **Templates**: Add new templates in the components directory
- **Colors**: Modify the color picker component to add more color options
- **Sections**: Extend the resume data structure to include additional sections

## 📁 Project Structure

```
resume-builder/
├── public/
├── src/
│   ├── components/
│   │   ├── ui/           # Reusable UI components
│   │   ├── Header.jsx    # Application header
│   │   ├── ResumeEditor.jsx
│   │   ├── ResumePreview.jsx
│   │   ├── TemplateSelector.jsx
│   │   └── ColorPicker.jsx
│   ├── App.jsx           # Main application component
│   ├── main.jsx         # Application entry point
│   └── index.css        # Global styles
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🐛 Known Issues

- PDF export quality may vary depending on browser
- Large profile images might affect PDF generation performance

## 🔮 Future Enhancements

- [ ] More resume templates
- [ ] Cloud storage integration
- [ ] Resume sharing functionality
- [ ] ATS (Applicant Tracking System) optimization
- [ ] Multiple export formats (Word, etc.)
- [ ] Resume analytics

## 📞 Support

If you encounter any issues or have questions, please [create an issue](../../issues) on this repository.

---

**Built with ❤️ using React and modern web technologies**
