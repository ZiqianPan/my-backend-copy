// const studentsDataV2 = require('../../data/v2/studentsDataV2.json');
const db = require('../../db');

const { getGradesByStudentIdV2 } = require('./gradesQueriesV2');

const getAllStudentsV2 = async () => {
  const students = await db.any('SELECT * FROM students');
  return students;
};

const getAllStudentsWithGradesV2 = async () => {

  // get all students
  const students = await getAllStudentsV2();
  // for each student...
  for (const student of students) {
    // get the student's id
    const { id } = student;
    // call getGradesByStudentId to get that student's grades
    const grades = await getGradesByStudentIdV2(id);
    // copy the student and then add its grades (no mutating) to the copy
    student.grades = grades;

  }

  // return results
  return students;
};

const getStudentByIdV2 = async (id) => {
  const student = await db.oneOrNone('SELECT * FROM students WHERE id=$1', [id])
  return student;
};

module.exports = {
  getAllStudentsV2,
  getStudentByIdV2,
  getAllStudentsWithGradesV2,
};
