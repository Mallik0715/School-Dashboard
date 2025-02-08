import React, { useState, useEffect } from 'react';
import { Line, Pie, Doughnut, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

const App = () => {
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [filterGrade, setFilterGrade] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');

  useEffect(() => {

    fetch("/schoolData.json")
      .then((response) => response.json())
      .then((data) => {
        setStudents(data.students || []);
        setTeachers(data.teachers || []);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);


  const filteredStudents = students.filter((student) => {
    return (
      (filterGrade === 'All' || student.grade === filterGrade) &&
      (filterStatus === 'All' || student.status === filterStatus)
    );
  });

  const totalFeesDue = filteredStudents.reduce((sum, student) => sum + student.feesDue, 0);


  const feeStatusData = {
    labels: ["Paid", "Unpaid"],
    datasets: [
      {
        data: [
          filteredStudents.filter((student) => student.feesDue === 0).length,
          filteredStudents.filter((student) => student.feesDue > 0).length,
        ],
        backgroundColor: ["#4CAF50", "#FF5722"],
      },
    ],
  };

  const performanceData = {
    labels: filteredStudents.map((student) => student.name),
    datasets: [
      {
        label: "Academic Performance",
        data: filteredStudents.map((student) => student.performance),
        fill: false,
        borderColor: '#4CAF50',
        tension: 0.1,
      },
    ],
  };

  const teacherSalaryData = {
    labels: teachers.map((teacher) => teacher.name),
    datasets: [
      {
        label: "Salary",
        data: teachers.map((teacher) => teacher.salary),
        backgroundColor: ['#2196F3', '#FFC107', '#4CAF50', '#FF5722'],
        borderWidth: 1,
      },
    ],
  };


  const gradePerformanceData = {
    labels: ['A', 'B', 'C'],
    datasets: [
      {
        label: "Average Performance",
        data: [
          students.filter((student) => student.grade === 'A').reduce((sum, student) => sum + student.performance, 0) /
            students.filter((student) => student.grade === 'A').length || 0,
          students.filter((student) => student.grade === 'B').reduce((sum, student) => sum + student.performance, 0) /
            students.filter((student) => student.grade === 'B').length || 0,
          students.filter((student) => student.grade === 'C').reduce((sum, student) => sum + student.performance, 0) /
            students.filter((student) => student.grade === 'C').length || 0,
        ],
        backgroundColor: '#FFC107',
        borderColor: '#FF5722',
        borderWidth: 1,
      },
    ],
  };

  const handleStudentClick = (studentId) => {
    const student = students.find((st) => st.id === studentId);
    setSelectedStudent(student);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex flex-wrap">
        <div className="w-full md:w-1/4 bg-blue-600 text-white p-6">
          <h2 className="text-2xl font-semibold mb-8">School Dashboard</h2>

          <div className="mb-6">
            <h3 className="text-xl mb-4">Total Students</h3>
            <div className="bg-white text-blue-600 p-4 rounded shadow">
              <p className="text-3xl">{filteredStudents.length}</p>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-xl mb-4">Total Fees Due</h3>
            <div className="bg-white text-blue-600 p-4 rounded shadow">
              <p className="text-3xl">${totalFeesDue}</p>
            </div>
          </div>

       
          <div className="mb-6">
            <h3 className="text-xl mb-4">Filters</h3>
            <div className="space-y-4">
              <div>
                <label className="block mb-2">Grade</label>
                <select
                  className="w-full p-2 rounded text-black"
                  value={filterGrade}
                  onChange={(e) => setFilterGrade(e.target.value)}
                >
                  <option value="All">All</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                </select>
              </div>
              <div>
                <label className="block mb-2">Status</label>
                <select
                  className="w-full p-2 rounded text-black"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="All">All</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
          </div>
        </div>

      
        <div className="flex-1 p-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           
            <div className="bg-white p-4 rounded shadow">
              <h3 className="text-xl font-semibold mb-4">Fee Status</h3>
              <Pie data={feeStatusData} options={{ responsive: true }} />
            </div>

            
            <div className="bg-white p-4 rounded shadow">
              <h3 className="text-xl font-semibold mb-4">Student Performance</h3>
              <Line data={performanceData} options={{ responsive: true }} />
            </div>

           
            <div className="bg-white p-4 rounded shadow">
              <h3 className="text-xl font-semibold mb-4">Teacher Salary</h3>
              <Doughnut data={teacherSalaryData} options={{ responsive: true }} />
            </div>

           
            <div className="bg-white p-4 rounded shadow">
              <h3 className="text-xl font-semibold mb-4">Grade Comparison</h3>
              <Bar data={gradePerformanceData} options={{ responsive: true }} />
            </div>
          </div>

         
          <div className="my-8">
            <h3 className="text-2xl font-semibold mb-4">Students</h3>
            <table className="min-w-full bg-white rounded-lg shadow">
              <thead>
                <tr>
                  <th className="py-3 px-4">ID</th>
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4">Grade</th>
                  <th className="py-3 px-4">Performance</th>
                  <th className="py-3 px-4">Fees Due</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => (
                  <tr key={student.id} className="border-b">
                    <td className="py-3 px-4">{student.id}</td>
                    <td className="py-3 px-4">{student.name}</td>
                    <td className="py-3 px-4">{student.grade}</td>
                    <td className="py-3 px-4">{student.performance}</td>
                    <td className="py-3 px-4">${student.feesDue}</td>
                    <td className="py-3 px-4">{student.status}</td>
                    <td className="py-3 px-4">
                      <button
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        onClick={() => handleStudentClick(student.id)}
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {selectedStudent && (
            <div className="my-8">
              <h3 className="text-2xl font-semibold mb-4">Student Details: {selectedStudent.name}</h3>
              <div className="bg-white p-6 rounded-lg shadow">
                <p><strong>Grade:</strong> {selectedStudent.grade}</p>
                <p><strong>Performance:</strong> {selectedStudent.performance}</p>
                <p><strong>Fees Due:</strong> ${selectedStudent.feesDue}</p>
                <p><strong>Attendance:</strong> {selectedStudent.attendance}%</p>
                <p><strong>Parent Name:</strong> {selectedStudent.parentName}</p>
                <p><strong>Parent Contact:</strong> {selectedStudent.parentContact}</p>
                <p><strong>Status:</strong> {selectedStudent.status}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;