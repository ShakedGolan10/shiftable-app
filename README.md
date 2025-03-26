# Welcome to Shiftable App

**Developer:** Shaked Golan

## Description
Shiftable is a powerful application designed for efficient shift management and scheduling. It enables organizations and teams to manage their shifts seamlessly, offering features for creating, updating, and viewing shift allocations. The app is built with modern web technologies and a strong focus on scalability, performance, and user experience.  

## Technologies Used
* Next.js 14 (based on React 18)
* TailwindCSS
* NextUI as the design library
* JWT tokens using the `jose` library
* Redux
* Next-themes
* Firebase & Firestore
* TypeScript

## Production URL
The app is live and accessible at: [https://shiftable-app.onrender.com/](https://shiftable-app.onrender.com/)

## Developer Note
This project began approximately a year ago as a personal initiative I worked on between jobs and other development projects. Over time, I have revisited and revamped the structure and technologies used in the app, reflecting my growth as a full-stack developer. You can observe this evolution through the commit history, showcasing the progression of my skills, techniques, and approaches to solving complex problems.

## Node Setup
Run the project with npm run dev

## Docker Setup
To run the project using Docker, follow these commands:
Compose the docker env:
   ```bash
   docker compose up -d 
   ```
   
To stop the docker:
   ```bash
   docker-compose down --rmi all
   ```

** Pay attention - that configuration works best on linux system,
** If youre using wsl, make sure to move the folder to the wsl file system in order for the bind-mount to work
The application will be available at `http://localhost:3000`




