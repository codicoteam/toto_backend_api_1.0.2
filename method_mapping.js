// This shows what methods each controller actually has
module.exports = {
  admin: {
    getAll: 'getAllAdmins',
    getById: 'getAdminById',
    create: 'createAdmin',
    update: 'updateAdmin',
    delete: 'deleteAdmin'
  },
  student: {
    getAll: 'getAllStudents',
    getById: 'getStudentById',
    create: 'createStudent',
    update: 'updateStudent',
    delete: 'deleteStudent'
  },
  teacher: {
    getAll: 'getAllTeachers',
    getById: 'getTeacherById',
    create: 'createTeacher',
    update: 'updateTeacher',
    delete: 'deleteTeacher'
  },
  subject: {
    getAll: 'getAllSubjects',
    getById: 'getSubjectById',
    create: 'createSubject',
    update: 'updateSubject',
    delete: 'deleteSubject'
  },
  exam: {
    getAll: 'getAllExams',
    getById: 'getExamById',
    create: 'createExam',
    update: 'updateExam',
    delete: 'deleteExam'
  },
  payment: {
    getAll: 'getAllPayments',
    getById: 'getPaymentById',
    create: 'createPayment',
    update: 'updatePayment',
    delete: 'deletePayment'
  },
  topic: {
    getAll: 'getAllTopics',
    getById: 'getTopicById',
    create: 'createTopic',
    update: 'updateTopic',
    delete: 'deleteTopic'
  },
  community: {
    getAll: 'getAllCommunitys',
    getById: 'getCommunityById',
    create: 'createCommunity',
    update: 'updateCommunity',
    delete: 'deleteCommunity'
  },
  content_system: {
    getAll: 'getAllContent_systems',
    getById: 'getContent_systemById',
    create: 'createContent_system',
    update: 'updateContent_system',
    delete: 'deleteContent_system'
  }
};
