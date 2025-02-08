School Dashboard
This is a school dashboard built using React.js and Chart.js. It’s designed to give school administrators a clear view of student performance, fee status, faculty salaries, and other important data, all visualized through interactive charts and tables.

Features
Student Overview: View the total number of students.
Fee Status: Visualize fee payments with a pie chart (Paid vs. Unpaid).
Student Performance: View student academic performance in a line chart.
Faculty Salary: See the average faculty salary in a doughnut chart.
Grade Comparison: Compare students' grades in a bar chart.
Student Details: Click on a student to view detailed information like grade, performance, attendance, and fees due.
Technologies Used
React.js: For building the frontend UI.
Vite: A fast build tool that makes development quicker.
Chart.js: For displaying interactive charts.
Tailwind CSS: For styling the dashboard with utility-first CSS.
Getting Started
Here’s how you can run this project locally:

1. Clone the Repo
bash
Copy
Edit
git clone https://github.com/Mallik0715/School-Dashboard.git
2. Navigate to the Project Folder
bash
Copy
Edit
cd School-Dashboard
3. Install Dependencies
Make sure you have Node.js installed. Then, run the following:

bash
Copy
Edit
npm install
4. Start the Development Server
Once everything is installed, you can start the app by running:

bash
Copy
Edit
npm run dev
Visit http://localhost:5173 in your browser to see the app running locally.

Project Structure
plaintext
Copy
Edit
/school-dashboard
│
├── /public
│   ├── index.html
│   └── schoolData.json
│
├── /src
│   ├── App.js
│   ├── index.js
│   └── /components (for any reusable components)
│
├── /node_modules
│
├── package.json
└── README.md

What You’ll See
Sidebar: Displays the total number of students and the total fees collected.
Charts:
Fee Status: A pie chart showing how many students have paid fees and how many haven't.
Student Performance: A line chart showing each student's academic performance.
Faculty Salary: A doughnut chart showing the average salary of faculty.
Grade Comparison: A bar chart comparing students' grades.
Student List: A table showing all students. You can click on any student’s name to see their detailed information like grade, performance, attendance, and fees due.
