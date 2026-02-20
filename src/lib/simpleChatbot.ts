// Simple FAQ-based chatbot that works without backend
export const getSimpleResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();

    // Projects
    if (message.includes('project') || message.includes('work')) {
        return "Safir has worked on several impressive projects:\n\n**Campus Security System** - YOLO-based car number plate detection and theft detection\n\n**Neural Style Transfer** - Artistic image transformation using deep learning\n\n**Steganography System** - Secure data hiding in images\n\nWould you like to know more about any specific project?";
    }

    // Skills
    if (message.includes('skill') || message.includes('technology') || message.includes('tech stack')) {
        return "Safir's technical expertise includes:\n\n**AI/ML:** YOLOv8, TensorFlow, PyTorch, Computer Vision\n\n**Backend:** Python, FastAPI, Node.js\n\n**Frontend:** React, Next.js, TypeScript\n\n**Tools:** Docker, Git, OpenCV\n\nHe specializes in AI automation and computer vision applications.";
    }

    // YOLO
    if (message.includes('yolo') || message.includes('detection') || message.includes('computer vision')) {
        return "Safir has extensive experience with **YOLO (You Only Look Once)** object detection:\n\n- Built a Campus Security System with car plate recognition\n- Real-time object detection and tracking\n- Theft detection using YOLOv8\n- Optimized for performance and accuracy\n\nHe can implement custom detection solutions for various use cases.";
    }

    // Experience
    if (message.includes('experience') || message.includes('background')) {
        return "Safir is a **Software Engineer** specializing in:\n\n- AI Automation Development\n- Computer Vision Engineering\n- LLM Integration\n\nHe builds high-performance AI systems and automation tools. Check out his projects section to see his work!";
    }

    // Contact
    if (message.includes('contact') || message.includes('email') || message.includes('reach') || message.includes('hire')) {
        return "You can reach Safir through:\n\n📧 **Email:** safir.inbox@gmail.com\n\n💼 **LinkedIn:** [linkedin.com/in/safir-a73666338](https://www.linkedin.com/in/safir-a73666338)\n\n🐙 **GitHub:** [github.com/Safirroshan](https://github.com/Safirroshan)\n\nFeel free to reach out for collaborations, job opportunities, or project inquiries!";
    }

    // Neural Style Transfer
    if (message.includes('neural style') || message.includes('style transfer') || message.includes('artistic')) {
        return "The **Neural Style Transfer** project uses deep learning to transform images into artistic styles:\n\n- Built with TensorFlow and VGG19\n- Combines content and style representations\n- Creates unique artistic renditions\n- Real-time processing capabilities\n\nIt's a great example of creative AI applications!";
    }

    // Steganography
    if (message.includes('steganography') || message.includes('security') || message.includes('encryption')) {
        return "The **Steganography System** provides secure data hiding:\n\n- LSB (Least Significant Bit) implementation\n- Encryption layer for added security\n- Embeds data in images without detection\n- Maintains visual quality\n\nPerfect for covert communication and data protection.";
    }

    // Campus Security
    if (message.includes('campus') || message.includes('security') || message.includes('plate')) {
        return "The **Campus Security System** is a comprehensive solution:\n\n- **ANPR:** Automatic Number Plate Recognition\n- **Theft Detection:** Real-time suspicious activity alerts\n- **YOLOv8 powered:** High accuracy detection\n- **FastAPI backend:** Scalable and fast\n\nContact Safir for a live demo!";
    }

    // Why hire
    if (message.includes('why') && (message.includes('hire') || message.includes('choose'))) {
        return "Here's why you should work with Safir:\n\n✅ **Proven expertise** in AI and Computer Vision\n✅ **Real-world projects** with measurable results\n✅ **Full-stack capabilities** from ML models to deployment\n✅ **Problem solver** who delivers practical solutions\n✅ **Fast learner** who stays updated with latest tech\n\nHe's passionate about building AI systems that solve real problems!";
    }

    // Default response
    return "I can help you learn more about Safir! Try asking about:\n\n- His **projects** (Campus Security, Neural Style Transfer, Steganography)\n- His **skills** and tech stack\n- His **experience** in AI and Computer Vision\n- How to **contact** him\n\nWhat would you like to know?";
};
