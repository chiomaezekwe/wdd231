
// Set current year in the footer
document.getElementById('year').textContent = new Date().getFullYear();

// Set last modified date
document.getElementById('last-modified').textContent = `Last Modified: ${document.lastModified}`;


const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will provide students with an introduction to programming, covering the fundamental concepts of programming languages such as variables, conditionals, calculations, loops, arrays, and input/output. These concepts will be applied to solve real-world problems.',
        language: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and careers in website design and development. It offers a hands-on approach, with students actively engaging in basic web design and programming. By the end of the course, students are expected to gain a solid understanding of web design and development and have a clearer idea of whether they wish to pursue this field as a potential major.',
        language: [
            'HTML',
            'CSS'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'In CSE 111, students enhance their skills as organized, efficient, and effective computer programmers by learning how to research and utilize functions created by others, as well as write, call, debug, and test their own functions. They also learn to manage errors within functions. Throughout the course, students write programs that use functions to solve problems across various fields, including business, physical sciences, human performance, and the humanities.',
        language: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the concepts of classes and objects, along with the concept of abstraction. It will also explore encapsulation at a conceptual level, and cover key principles like inheritance and polymorphism',
        language: [
            'C#'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'Building on previous knowledge of Web Fundamentals and programming, this course teaches students how to create dynamic websites that utilize JavaScript to respond to events, update content, and deliver responsive user experiences.',
        language: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'Building on previous experience with Dynamic Web Fundamentals and programming, this course focuses on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        language: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    }
]

function displayCourses(filteredCourses) {
    const courseList = document.getElementById('course-list');
    courseList.innerHTML = "";

    filteredCourses.forEach(course => {
        const courseCard = document.createElement("div");
        courseCard.classList.add("course-card");

        if (course.completed) {
            courseCard.classList.add("completed");
        }

        courseCard.innerHTML = `
            <h3>${course.subject} ${course.number}: ${course.title}</h3>
            <p><strong>Credits:</strong> ${course.credits}</p>
            <p><strong>Certificate:</strong> ${course.certificate}</p>
            <p><strong>Description:</strong> ${course.description}</p>
            <p><strong>Language:</strong> ${course.language.join(", ")}</>
        `;

        courseList.appendChild(courseCard);
    });

    updateTotalCredits(filteredCourses);
}

function updateTotalCredits(filteredCourses) {
    const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
    document.getElementById("total-credits").textContent = totalCredits;
}

document.getElementById("all-courses").addEventListener("click", () => {
    displayCourses(courses);
});

document.getElementById("wdd-courses").addEventListener("click", () => {
    const wddCourses = courses.filter(course => course.subject === "WDD");
    displayCourses(wddCourses);
});

document.getElementById("cse-courses").addEventListener("click", () => {
    const cseCourses = courses.filter(course => course.subject === "CSE");
    displayCourses(cseCourses);
});



const menuBtn = document.getElementById("menu-toggle");
const menu = document.querySelector("nav");
const overlay = document.querySelector(".overlay");
const body = document.body;
const closeBtn = document.getElementById("close-menu");



menuBtn.addEventListener("click", () => {
    menu.classList.toggle("active");
    overlay.classList.toggle("active");
    body.classList.toggle("no-scroll");

    if (menu.classList.contains("active")) {
        menuBtn.textContent = "✖";
    } else {
        menuBtn.textContent = "☰";
    }
});

closeBtn.addEventListener("click", () => {
    menu.classList.remove("active");
    overlay.classList.remove("active");
    body.classList.remove("no-scroll");
    menuBtn.textContent = "☰";
});


overlay.addEventListener("click", () => {
    menu.classList.remove("active");
    overlay.classList.remove("active");
    body.classList.remove("no-scroll");
    menuBtn.textContent = "☰";
});

