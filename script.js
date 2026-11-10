const lab3 = (() => {
  const courses = [
    {
      id: 101,
      title: "Лабораторія цікавості",
      author: "Анна Бойко",
      teachers: ["Анна Бойко", "Олег Марченко"],
      taskType: "Експерименти",
      readersDay1: 84,
      readersDay2: 96,
      hours: 2,
      minutes: 30,
    },
    {
      id: 102,
      title: "Майстерня кольору",
      author: "Ірина Коваль",
      teachers: ["Ірина Коваль"],
      taskType: "Творчі завдання",
      readersDay1: 72,
      readersDay2: 81,
      hours: 3,
      minutes: 15,
    },
    {
      id: 103,
      title: "Клуб винахідників",
      author: "Максим Данилюк",
      teachers: ["Максим Данилюк", "Софія Левченко"],
      taskType: "Головоломки",
      readersDay1: 91,
      readersDay2: 88,
      hours: 4,
      minutes: 0,
    },
    {
      id: 104,
      title: "Історії, що оживають",
      author: "Наталія Романюк",
      teachers: ["Наталія Романюк"],
      taskType: "Сторітелінг",
      readersDay1: 63,
      readersDay2: 70,
      hours: 1,
      minutes: 45,
    },
    {
      id: 105,
      title: "Таємниці води",
      author: "Віктор Гнатюк",
      teachers: ["Віктор Гнатюк"],
      taskType: "Дослідження",
      readersDay1: 77,
      readersDay2: 69,
      hours: 2,
      minutes: 10,
    },
    {
      id: 106,
      title: "Музична пригода",
      author: "Олена Ткаченко",
      teachers: ["Олена Ткаченко", "Павло Шевчук"],
      taskType: "Музичні вправи",
      readersDay1: 55,
      readersDay2: 61,
      hours: 2,
      minutes: 50,
    },
    {
      id: 107,
      title: "Математика навколо нас",
      author: "Ганна Мельник",
      teachers: ["Ганна Мельник"],
      taskType: "Задачі",
      readersDay1: 86,
      readersDay2: 93,
      hours: 3,
      minutes: 40,
    },
    {
      id: 108,
      title: "Маленькі програмісти",
      author: "Дмитро Савчук",
      teachers: ["Дмитро Савчук"],
      taskType: "Алгоритмічні вправи",
      readersDay1: 68,
      readersDay2: 74,
      hours: 4,
      minutes: 20,
    },
    {
      id: 109,
      title: "Екологічний квест",
      author: "Марія Бондар",
      teachers: ["Марія Бондар", "Андрій Козак"],
      taskType: "Командні завдання",
      readersDay1: 79,
      readersDay2: 85,
      hours: 2,
      minutes: 5,
    },
    {
      id: 110,
      title: "Космічна подорож",
      author: "Сергій Литвин",
      teachers: ["Сергій Литвин"],
      taskType: "Пізнавальні вправи",
      readersDay1: 60,
      readersDay2: 57,
      hours: 3,
      minutes: 5,
    },
  ].map((course) => ({
    ...course,
    durationMinutes: course.hours * 60 + course.minutes,
  }));

  const average = (values) =>
    values.reduce((total, value) => total + value, 0) / values.length;

  const sortCoursesByDuration = (items) =>
    [...items].sort((first, second) => first.durationMinutes - second.durationMinutes);

  const getAverageInterest = (items) =>
    average(items.map((course) => average([course.readersDay1, course.readersDay2])));

  const getCourseWithMinimumDayTwoReaders = (items) =>
    items.reduce((minimum, course) =>
      course.readersDay2 < minimum.readersDay2 ? course : minimum
    );

  const hasCompleteCourseInfo = (course) =>
    Boolean(
      course &&
        course.id &&
        course.title &&
        course.author &&
        Array.isArray(course.teachers) &&
        course.teachers.length &&
        course.taskType &&
        Number.isFinite(course.readersDay1) &&
        Number.isFinite(course.readersDay2) &&
        Number.isFinite(course.hours) &&
        Number.isFinite(course.minutes)
    );

  const addCourse = (items, course) => {
    const newCourse = {
      ...course,
      durationMinutes: (course.hours || 0) * 60 + (course.minutes || 0),
    };

    if (!hasCompleteCourseInfo(course)) {
      return [newCourse, ...items];
    }

    const result = [...items].sort((first, second) =>
      first.author.localeCompare(second.author, "uk")
    );
    const position = result.findIndex(
      (item) => item.author.localeCompare(newCourse.author, "uk") > 0
    );
    result.splice(position === -1 ? result.length : position, 0, newCourse);
    return result;
  };

  const calculateStudyDuration = (selectedCourses) => {
    const multiplier = selectedCourses.length > 3 ? 1.5 : 1;
    const durations = selectedCourses.map((course) => ({
      id: course.id,
      title: course.title,
      minutes: Math.round(course.durationMinutes * multiplier),
    }));

    return {
      multiplier,
      durations,
      totalMinutes: durations.reduce((total, course) => total + course.minutes, 0),
    };
  };

  class Child {
    constructor(lastName, firstName, age, email, feedbackPurpose, contactedAt) {
      this.lastName = lastName;
      this.firstName = firstName;
      this.age = age;
      this.email = email;
      this.feedbackPurpose = feedbackPurpose;
      this.contactedAt = new Date(contactedAt);
    }

    get fullName() {
      return `${this.lastName} ${this.firstName}`;
    }

    get ageGroup() {
      if (this.age <= 3) return "ранній";
      if (this.age <= 5) return "середній";
      if (this.age <= 7) return "дошкільний";
      return "шкільний";
    }
  }

  const children = [
    new Child("Бондар", "Аліса", 7, "alisa.bondar@example.com", "пропозиція", "2026-09-04T09:15:00"),
    new Child("Вовк", "Максим", 10, "maksym.vovk@example.com", "наявність помилки", "2026-09-12T14:20:00"),
    new Child("Гнатюк", "Софія", 5, "sofia.hnatiuk@example.com", "пропозиція", "2026-09-18T16:45:00"),
    new Child("Данилюк", "Олексій", 12, "oleksii.danyliuk@example.com", "скарга на контент", "2026-10-02T08:30:00"),
    new Child("Коваль", "Марія", 3, "maria.koval@example.com", "співпраця", "2026-10-08T10:00:00"),
    new Child("Левченко", "Іван", 8, "ivan.levchenko@example.com", "пропозиція", "2026-10-11T12:10:00"),
    new Child("Мельник", "Дарина", 6, "daryna.melnyk@example.com", "наявність помилки", "2026-10-17T15:40:00"),
    new Child("Романюк", "Павло", 2, "pavlo.romaniuk@example.com", "пропозиція", "2026-10-23T11:25:00"),
    new Child("Савчук", "Катерина", 9, "kateryna.savchuk@example.com", "скарга на контент", "2026-10-29T17:05:00"),
    new Child("Ткаченко", "Артем", 4, "artem.tkachenko@example.com", "наявність помилки", "2026-11-03T13:35:00"),
  ];

  const getChildrenByMonthAndTime = (items, month, time) => {
    const [hours, minutes] = time.split(":").map(Number);
    const timeLimit = hours * 60 + minutes;

    return items.filter((child) => {
      const date = child.contactedAt;
      const childTime = date.getHours() * 60 + date.getMinutes();
      return date.getMonth() + 1 === month && childTime <= timeLimit;
    });
  };

  const getYoungestChild = (items) =>
    items.reduce((youngest, child) => (child.age < youngest.age ? child : youngest));

  const countChildrenByAgeGroup = (items) =>
    items.reduce(
      (groups, child) => ({
        ...groups,
        [child.ageGroup]: groups[child.ageGroup] + 1,
      }),
      { ранній: 0, середній: 0, дошкільний: 0, шкільний: 0 }
    );

  const sortChildrenByEmail = (items) =>
    [...items]
      .sort((first, second) => first.email.localeCompare(second.email))
      .map((child) => ({
        email: child.email,
        feedbackPurpose: child.feedbackPurpose,
      }));

  const sortedCourses = sortCoursesByDuration(courses);
  const leastPopularCourse = getCourseWithMinimumDayTwoReaders(courses);
  const incompleteCourse = {
    id: 111,
    title: "Новий курс",
    author: "",
    teachers: [],
    taskType: "",
    readersDay1: 0,
    readersDay2: 0,
    hours: 1,
    minutes: 30,
  };
  const completeCourse = {
    id: 112,
    title: "Світ винаходів",
    author: "Богдан Яремчук",
    teachers: ["Богдан Яремчук"],
    taskType: "Проєктні завдання",
    readersDay1: 65,
    readersDay2: 71,
    hours: 2,
    minutes: 20,
  };
  const studyDuration = calculateStudyDuration(courses.slice(0, 4));
  const octoberChildren = getChildrenByMonthAndTime(children, 10, "16:00");
  const youngestChild = getYoungestChild(children);

  console.group("Лабораторна робота №3 — варіант 4");
  console.group("1. Робота з масивом курсів");
  console.table(sortedCourses);
  console.log("Середня кількість зацікавлених користувачів:", getAverageInterest(courses));
  console.log("ID курсу з мінімальною кількістю читачів за добу 2:", leastPopularCourse.id);
  console.log("Неповний курс додається на початок:", addCourse(courses, incompleteCourse)[0]);
  console.log(
    "Повний курс додається в алфавітно впорядкований список:",
    addCourse(courses, completeCourse).map((course) => course.author)
  );
  console.log("Тривалість одночасного вивчення 4 курсів:", studyDuration);
  console.groupEnd();

  console.group("2. Об'єктно-орієнтована робота з дітьми");
  console.table(octoberChildren.map((child) => ({
    name: child.fullName,
    email: child.email,
    contactedAt: child.contactedAt.toLocaleString("uk-UA"),
  })));
  console.log("Наймолодша дитина:", {
    age: youngestChild.age,
    email: youngestChild.email,
    contactedAt: youngestChild.contactedAt.toLocaleDateString("uk-UA"),
  });
  console.log("Кількість дітей за віковими категоріями:", countChildrenByAgeGroup(children));
  console.table(sortChildrenByEmail(children));
  console.groupEnd();
  console.groupEnd();

  return {
    courses,
    children,
    sortCoursesByDuration,
    getAverageInterest,
    getCourseWithMinimumDayTwoReaders,
    addCourse,
    calculateStudyDuration,
    getChildrenByMonthAndTime,
    getYoungestChild,
    countChildrenByAgeGroup,
    sortChildrenByEmail,
  };
})();

if (typeof module !== "undefined" && module.exports) {
  module.exports = lab3;
}
